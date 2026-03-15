/**
 * sync-vehicles — Supabase Edge Function
 *
 * US-market focused sync using NHTSA vPIC GetModelsForMakeYear endpoint.
 *
 * Strategy:
 *   - Queries each make for model years startYear–endYear (default 2005–current).
 *   - All years for a make are fetched in parallel → fast, within timeout.
 *   - Models are deduplicated by NHTSA Model_ID; last_seen_year tracks the
 *     most recent model year a model appeared in.
 *   - GetModelsForMakeYear only returns models that received a NHTSA vehicle
 *     certification for that year, which is inherently US-market data.
 *   - Manual seed models (source='manual') are never touched.
 *   - Discontinued makes use an explicit endYear so we skip empty year queries.
 *
 * Auth:     Authorization: Bearer <anon_key> or <service_role_key>
 * Deploy:   supabase functions deploy sync-vehicles --no-verify-jwt
 * Invoke:   supabase functions invoke sync-vehicles --project-ref <ref>
 * Schedule: Dashboard → Edge Functions → sync-vehicles → Schedule → "0 2 * * 0"
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { fetchModelsForMakeYear, type NHTSAModel } from './nhtsa.ts';
import { MAKES_CONFIG, CURRENT_YEAR } from './makes-config.ts';
import { toModelSlug, toNormalized } from './slug-utils.ts';

const DEFAULT_START_YEAR = 2005;

interface ModelEntry {
  model: NHTSAModel;
  lastSeenYear: number;
}

interface MakeSyncResult {
  years_queried: number;
  models_synced: number;
  models_deactivated: number;
  error?: string;
}

Deno.serve(async (req: Request) => {
  const authHeader = req.headers.get('Authorization') ?? '';
  if (!authHeader.startsWith('Bearer ')) {
    return new Response('Unauthorized', { status: 401 });
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const db = createClient(supabaseUrl, serviceKey);
  const syncedAt = new Date().toISOString();

  const results: Record<string, MakeSyncResult> = {};
  let totalModels = 0;
  let totalDeactivated = 0;

  for (const make of MAKES_CONFIG) {
    const result: MakeSyncResult = {
      years_queried: 0,
      models_synced: 0,
      models_deactivated: 0,
    };

    try {
      const startYear = make.startYear ?? DEFAULT_START_YEAR;
      const endYear = make.endYear ?? CURRENT_YEAR;

      // ── 1. Upsert the make row ───────────────────────────────────
      const { data: makeRow, error: makeErr } = await db
        .from('vehicle_makes')
        .upsert(
          {
            slug: make.slug,
            name: make.displayName,
            source: 'nhtsa',
            last_synced_at: syncedAt,
            is_active: true,
          },
          { onConflict: 'slug', ignoreDuplicates: false },
        )
        .select('id')
        .single();

      if (makeErr || !makeRow) {
        result.error = makeErr?.message ?? 'Failed to upsert make';
        results[make.slug] = result;
        continue;
      }

      // ── 2. Fetch all years in parallel ───────────────────────────
      const years: number[] = [];
      for (let y = startYear; y <= endYear; y++) years.push(y);
      result.years_queried = years.length;

      const yearResults = await Promise.allSettled(
        years.map((y) => fetchModelsForMakeYear(make.nhtsaName, y)),
      );

      // ── 3. Union models across years, tracking last_seen_year ────
      // Key: NHTSA Model_ID (stable across years)
      const bySourceId = new Map<string, ModelEntry>();

      for (let i = 0; i < years.length; i++) {
        const res = yearResults[i];
        if (res.status !== 'fulfilled') continue;
        for (const m of res.value) {
          const id = String(m.Model_ID);
          const existing = bySourceId.get(id);
          if (!existing || years[i] > existing.lastSeenYear) {
            bySourceId.set(id, { model: m, lastSeenYear: years[i] });
          }
        }
      }

      if (bySourceId.size === 0) {
        // All years returned empty — API error or truly no data.
        // Do NOT deactivate existing models (could be transient outage).
        console.warn(`${make.slug}: 0 models across ${years.length} years — skipping deactivation`);
        results[make.slug] = result;
        continue;
      }

      // ── 4. Fetch currently-tracked NHTSA models for this make ────
      const { data: existingModels } = await db
        .from('vehicle_models')
        .select('id, source_model_id')
        .eq('make_id', makeRow.id)
        .eq('source', 'nhtsa');

      const existingBySourceId = new Map(
        (existingModels ?? [])
          .filter((m) => m.source_model_id)
          .map((m) => [m.source_model_id! as string, m.id as string]),
      );

      const returnedSourceIds = new Set(bySourceId.keys());

      // ── 5. Upsert each model ─────────────────────────────────────
      for (const [sourceId, { model, lastSeenYear }] of bySourceId) {
        await db.from('vehicle_models').upsert(
          {
            make_id: makeRow.id,
            name: model.Model_Name,
            slug: toModelSlug(make.slug, model.Model_Name),
            normalized_name: toNormalized(model.Model_Name),
            source: 'nhtsa',
            source_model_id: sourceId,
            last_synced_at: syncedAt,
            last_seen_year: lastSeenYear,
            is_active: true,
          },
          { onConflict: 'slug', ignoreDuplicates: false },
        );
      }

      result.models_synced = bySourceId.size;

      // ── 6. Deactivate NHTSA models not seen in any queried year ──
      // These are models NHTSA no longer associates with this make in
      // our year range — safe to mark inactive (won't delete communities).
      const toDeactivate = [...existingBySourceId.entries()]
        .filter(([srcId]) => !returnedSourceIds.has(srcId))
        .map(([, dbId]) => dbId);

      if (toDeactivate.length > 0) {
        await db
          .from('vehicle_models')
          .update({ is_active: false })
          .in('id', toDeactivate);
        result.models_deactivated = toDeactivate.length;
      }

      totalModels += result.models_synced;
      totalDeactivated += result.models_deactivated;
    } catch (err: unknown) {
      result.error = err instanceof Error ? err.message : String(err);
    }

    results[make.slug] = result;

    // Brief pause between makes — NHTSA is a free public API
    await new Promise((r) => setTimeout(r, 200));
  }

  const summary = {
    ok: true,
    synced_at: syncedAt,
    makes_attempted: MAKES_CONFIG.length,
    total_models_synced: totalModels,
    total_models_deactivated: totalDeactivated,
    errors: Object.entries(results)
      .filter(([, r]) => r.error)
      .map(([slug, r]) => ({ slug, error: r.error })),
    per_make: results,
  };

  return new Response(JSON.stringify(summary, null, 2), {
    headers: { 'Content-Type': 'application/json' },
  });
});

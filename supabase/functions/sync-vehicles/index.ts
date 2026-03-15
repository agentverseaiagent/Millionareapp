/**
 * sync-vehicles — Supabase Edge Function
 *
 * Syncs vehicle makes and models from the NHTSA vPIC API into the Garagetwits database.
 *
 * Auth: accepts Authorization: Bearer <anon_key> or <service_role_key>.
 * The Supabase Edge Function scheduler sends the anon key automatically.
 *
 * Deploy:   supabase functions deploy sync-vehicles --no-verify-jwt
 * Invoke:   supabase functions invoke sync-vehicles --project-ref <ref>
 * Schedule: Dashboard → Edge Functions → sync-vehicles → Schedule → "0 2 * * 0"
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { fetchModelsForMake } from './nhtsa.ts';
import { MAKES_CONFIG } from './makes-config.ts';
import { toModelSlug, toNormalized } from './slug-utils.ts';

interface MakeSyncResult {
  models_synced: number;
  models_deactivated: number;
  error?: string;
}

Deno.serve(async (req: Request) => {
  // Auth: require any valid bearer token (scheduler sends anon key; manual sends service key)
  const authHeader = req.headers.get('Authorization') ?? '';
  if (!authHeader.startsWith('Bearer ')) {
    return new Response('Unauthorized', { status: 401 });
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

  // Always write with service role regardless of caller's key
  const db = createClient(supabaseUrl, serviceKey);
  const syncedAt = new Date().toISOString();

  const results: Record<string, MakeSyncResult> = {};
  let totalModels = 0;
  let totalDeactivated = 0;

  for (const make of MAKES_CONFIG) {
    const result: MakeSyncResult = { models_synced: 0, models_deactivated: 0 };

    try {
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

      // ── 2. Fetch models from NHTSA ───────────────────────────────
      const nhtsaModels = await fetchModelsForMake(make.nhtsaName);

      if (nhtsaModels.length === 0) {
        // Unknown make or API outage — do NOT deactivate existing models
        console.warn(`NHTSA returned 0 models for ${make.slug} — skipping`);
        results[make.slug] = result;
        continue;
      }

      // ── 3. Fetch currently-active NHTSA models in our DB ────────
      const { data: existingModels } = await db
        .from('vehicle_models')
        .select('id, source_model_id')
        .eq('make_id', makeRow.id)
        .eq('source', 'nhtsa')
        .eq('is_active', true);

      const existingBySourceId = new Map(
        (existingModels ?? [])
          .filter((m) => m.source_model_id)
          .map((m) => [m.source_model_id!, m.id as string]),
      );

      const returnedSourceIds = new Set<string>();

      // ── 4. Upsert each model ─────────────────────────────────────
      for (const m of nhtsaModels) {
        const sourceModelId = String(m.Model_ID);
        returnedSourceIds.add(sourceModelId);

        const modelSlug = toModelSlug(make.slug, m.Model_Name);
        const normalized = toNormalized(m.Model_Name);

        await db.from('vehicle_models').upsert(
          {
            make_id: makeRow.id,
            name: m.Model_Name,
            slug: modelSlug,
            normalized_name: normalized,
            source: 'nhtsa',
            source_model_id: sourceModelId,
            last_synced_at: syncedAt,
            is_active: true,
          },
          { onConflict: 'slug', ignoreDuplicates: false },
        );
      }

      result.models_synced = nhtsaModels.length;

      // ── 5. Deactivate NHTSA models not returned this sync ────────
      const toDeactivateIds = [...existingBySourceId.entries()]
        .filter(([sourceId]) => !returnedSourceIds.has(sourceId))
        .map(([, id]) => id);

      if (toDeactivateIds.length > 0) {
        await db
          .from('vehicle_models')
          .update({ is_active: false })
          .in('id', toDeactivateIds);

        result.models_deactivated = toDeactivateIds.length;
      }

      totalModels += result.models_synced;
      totalDeactivated += result.models_deactivated;
    } catch (err: unknown) {
      result.error = err instanceof Error ? err.message : String(err);
    }

    results[make.slug] = result;

    // Small delay to avoid hammering NHTSA
    await new Promise((r) => setTimeout(r, 120));
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

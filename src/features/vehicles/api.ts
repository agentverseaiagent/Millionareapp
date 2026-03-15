import { supabase } from '../../lib/supabase';
import { normalizeQuery } from './utils';
import type { VehicleModel, VehicleSearchResult, VehicleTrim } from './types';

const MODEL_SELECT = 'id, name, slug, is_active, vehicle_makes!inner(id, name)';

/**
 * Full make+model+alias search.
 *
 * Priority order:
 *   1. Alias exact match — active and discontinued
 *   2. Make exact/prefix match — active models first, then discontinued
 *   3. Split-query make+model (e.g. "honda crv") — active and discontinued
 *   4. Model name partial match — active models
 *   5. Model name partial match — discontinued (only for non-make queries)
 */
export async function searchVehicles(rawQuery: string): Promise<VehicleSearchResult[]> {
  const trimmed = rawQuery.trim();
  if (!trimmed) return [];

  const normalized = normalizeQuery(trimmed);
  if (!normalized) return [];

  const seen = new Set<string>();
  const results: VehicleSearchResult[] = [];

  function addModel(row: any) {
    if (!row || seen.has(row.id)) return;
    seen.add(row.id);
    const makeName = row.vehicle_makes?.name ?? '';
    const makeId = row.vehicle_makes?.id ?? '';
    results.push({
      id: row.id,
      name: row.name,
      slug: row.slug,
      make_name: makeName,
      make_id: makeId,
      display_name: `${makeName} ${row.name}`.trim(),
      is_discontinued: row.is_active === false,
    });
  }

  // 1. Alias exact match — active and discontinued
  const { data: aliasMatches } = await supabase
    .from('vehicle_aliases')
    .select(`vehicle_models!inner(${MODEL_SELECT})`)
    .eq('normalized_alias', normalized)
    .limit(5);

  for (const row of (aliasMatches ?? []) as any[]) {
    addModel(row.vehicle_models);
  }

  // 2. Fetch all active makes for make-matching
  const { data: allMakes } = await supabase
    .from('vehicle_makes')
    .select('id, name, slug')
    .eq('is_active', true);

  const words = trimmed.toLowerCase().split(/\s+/);
  const firstWordNorm = normalizeQuery(words[0]);
  const restNorm = words.length > 1 ? normalizeQuery(words.slice(1).join(' ')) : null;

  // Full query matches a make name or slug — exact or prefix (handles "mercedes" → Mercedes-Benz)
  const fullMakeMatch = (allMakes ?? []).find(m => {
    const ns = normalizeQuery(m.slug);
    const nn = normalizeQuery(m.name);
    return ns === normalized || nn === normalized ||
      (normalized.length >= 3 && (ns.startsWith(normalized) || nn.startsWith(normalized)));
  });

  // First word matches a make (for "honda crv", "toyota rav4", etc.)
  const prefixMakeMatch = restNorm
    ? (allMakes ?? []).find(
        m =>
          normalizeQuery(m.slug) === firstWordNorm ||
          normalizeQuery(m.name) === firstWordNorm,
      )
    : null;

  if (fullMakeMatch) {
    // Prepend a make-level result so users can attach to a make without picking a model
    results.unshift({
      id: fullMakeMatch.id,
      name: fullMakeMatch.name,
      slug: fullMakeMatch.slug,
      make_name: fullMakeMatch.name,
      make_id: fullMakeMatch.id,
      display_name: fullMakeMatch.name,
      is_make_result: true,
    });

    // Active models for this make first
    const { data: activeModels } = await supabase
      .from('vehicle_models')
      .select(MODEL_SELECT)
      .eq('make_id', fullMakeMatch.id)
      .eq('is_active', true)
      .order('name')
      .limit(20);
    for (const row of (activeModels ?? []) as any[]) addModel(row);

    // Discontinued models for this make appended after active
    const { data: disconModels } = await supabase
      .from('vehicle_models')
      .select(MODEL_SELECT)
      .eq('make_id', fullMakeMatch.id)
      .eq('is_active', false)
      .order('name')
      .limit(10);
    for (const row of (disconModels ?? []) as any[]) addModel(row);
  } else if (prefixMakeMatch && restNorm) {
    // "honda crv" → search Honda models matching "crv" (active and discontinued)
    const { data: makeModels } = await supabase
      .from('vehicle_models')
      .select(MODEL_SELECT)
      .eq('make_id', prefixMakeMatch.id)
      .ilike('normalized_name', `%${restNorm}%`)
      .order('name')
      .limit(10);
    for (const row of (makeModels ?? []) as any[]) addModel(row);
  }

  // 3. Active model name partial match (always runs — catches "rogue", "cx5", etc.)
  const { data: activeNameMatches } = await supabase
    .from('vehicle_models')
    .select(MODEL_SELECT)
    .ilike('normalized_name', `%${normalized}%`)
    .eq('is_active', true)
    .order('name')
    .limit(10);
  for (const row of (activeNameMatches ?? []) as any[]) addModel(row);

  // 4. Discontinued model name match — only for specific model queries, not pure make searches
  if (!fullMakeMatch) {
    const { data: disconNameMatches } = await supabase
      .from('vehicle_models')
      .select(MODEL_SELECT)
      .ilike('normalized_name', `%${normalized}%`)
      .eq('is_active', false)
      .order('name')
      .limit(5);
    for (const row of (disconNameMatches ?? []) as any[]) addModel(row);
  }

  return results.slice(0, 25);
}

/** @deprecated Use searchVehicles instead */
export const searchVehicleModels = searchVehicles;

export async function getVehicleModelBySlug(slug: string): Promise<VehicleModel | null> {
  const { data, error } = await supabase
    .from('vehicle_models')
    .select('*, make:vehicle_makes(id, name, slug)')
    .eq('slug', slug)
    .single();
  if (error) return null;
  return data as VehicleModel;
}

export async function followMake(vehicleMakeId: string): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');
  const { error } = await supabase
    .from('user_make_follows')
    .insert({ user_id: user.id, vehicle_make_id: vehicleMakeId });
  if (error) throw error;
}

export async function unfollowMake(vehicleMakeId: string): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');
  const { error } = await supabase
    .from('user_make_follows')
    .delete()
    .eq('vehicle_make_id', vehicleMakeId)
    .eq('user_id', user.id);
  if (error) throw error;
}

export async function isFollowingMake(vehicleMakeId: string): Promise<boolean> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;
  const { data } = await supabase
    .from('user_make_follows')
    .select('vehicle_make_id')
    .eq('vehicle_make_id', vehicleMakeId)
    .eq('user_id', user.id)
    .maybeSingle();
  return !!data;
}

export async function getFollowedMakes(): Promise<VehicleSearchResult[]> {
  const { data, error } = await supabase
    .from('user_make_follows')
    .select('vehicle_make_id, vehicle_makes!inner(id, name, slug)');
  if (error) throw error;
  return (data || []).map((row: any) => ({
    id: row.vehicle_makes.id,
    name: row.vehicle_makes.name,
    slug: row.vehicle_makes.slug,
    make_name: row.vehicle_makes.name,
    make_id: row.vehicle_makes.id,
    display_name: row.vehicle_makes.name,
    is_make_result: true,
  }));
}

export async function followModel(vehicleModelId: string): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');
  const { error } = await supabase
    .from('user_model_follows')
    .insert({ user_id: user.id, vehicle_model_id: vehicleModelId });
  if (error) throw error;
}

export async function unfollowModel(vehicleModelId: string): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');
  const { error } = await supabase
    .from('user_model_follows')
    .delete()
    .eq('vehicle_model_id', vehicleModelId)
    .eq('user_id', user.id);
  if (error) throw error;
}

export async function isFollowingModel(vehicleModelId: string): Promise<boolean> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;
  const { data } = await supabase
    .from('user_model_follows')
    .select('vehicle_model_id')
    .eq('vehicle_model_id', vehicleModelId)
    .eq('user_id', user.id)
    .maybeSingle();
  return !!data;
}

export async function getFollowedModels(): Promise<VehicleSearchResult[]> {
  const { data, error } = await supabase
    .from('user_model_follows')
    .select(`
      vehicle_model_id,
      vehicle_models!inner(
        id, name, slug, is_active,
        vehicle_makes!inner(id, name)
      )
    `);
  if (error) throw error;
  return (data || []).map((row: any) => ({
    id: row.vehicle_models.id,
    name: row.vehicle_models.name,
    slug: row.vehicle_models.slug,
    make_name: row.vehicle_models.vehicle_makes.name,
    make_id: row.vehicle_models.vehicle_makes.id,
    display_name: `${row.vehicle_models.vehicle_makes.name} ${row.vehicle_models.name}`,
    is_discontinued: row.vehicle_models.is_active === false,
  }));
}

export async function getTrimsForModel(modelId: string): Promise<VehicleTrim[]> {
  const { data, error } = await supabase
    .from('vehicle_trims')
    .select('id, model_id, name, normalized_name, source, is_active, created_at')
    .eq('model_id', modelId)
    .eq('is_active', true)
    .order('name');
  if (error) return [];
  return data as VehicleTrim[];
}

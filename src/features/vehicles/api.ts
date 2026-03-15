import { supabase } from '../../lib/supabase';
import { normalizeQuery } from './utils';
import type { VehicleModel, VehicleSearchResult } from './types';

/**
 * Full make+model+alias search.
 *
 * Priority order:
 *   1. Alias exact match (e.g. "crv" → Honda CR-V)
 *   2. Make exact match (e.g. "honda" → top Honda models)
 *   3. Split-query make+model (e.g. "honda crv" → Honda models matching "crv")
 *   4. Model normalized-name partial match (e.g. "rogue", "tacoma")
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
    results.push({
      id: row.id,
      name: row.name,
      slug: row.slug,
      make_name: makeName,
      display_name: `${makeName} ${row.name}`.trim(),
    });
  }

  // 1. Alias exact match
  const { data: aliasMatches } = await supabase
    .from('vehicle_aliases')
    .select('vehicle_models!inner(id, name, slug, is_active, vehicle_makes!inner(name))')
    .eq('normalized_alias', normalized)
    .limit(5);

  for (const row of (aliasMatches ?? []) as any[]) {
    if (row.vehicle_models?.is_active !== false) addModel(row.vehicle_models);
  }

  // 2. Fetch all makes (small set ~44) for make-matching
  const { data: allMakes } = await supabase
    .from('vehicle_makes')
    .select('id, name, slug')
    .eq('is_active', true);

  const words = trimmed.toLowerCase().split(/\s+/);
  const firstWordNorm = normalizeQuery(words[0]);
  const restNorm = words.length > 1 ? normalizeQuery(words.slice(1).join(' ')) : null;

  // Full query matches a make name or slug exactly
  const fullMakeMatch = (allMakes ?? []).find(
    m => normalizeQuery(m.slug) === normalized || normalizeQuery(m.name) === normalized,
  );

  // First word matches a make (for "honda crv", "toyota rav4", etc.)
  const prefixMakeMatch = restNorm
    ? (allMakes ?? []).find(
        m =>
          normalizeQuery(m.slug) === firstWordNorm ||
          normalizeQuery(m.name) === firstWordNorm,
      )
    : null;

  if (fullMakeMatch) {
    // Return top models for this make sorted by name
    const { data: makeModels } = await supabase
      .from('vehicle_models')
      .select('id, name, slug, vehicle_makes!inner(name)')
      .eq('make_id', fullMakeMatch.id)
      .eq('is_active', true)
      .order('name')
      .limit(20);
    for (const row of (makeModels ?? []) as any[]) addModel(row);
  } else if (prefixMakeMatch && restNorm) {
    // "honda crv" → search Honda models matching "crv"
    const { data: makeModels } = await supabase
      .from('vehicle_models')
      .select('id, name, slug, vehicle_makes!inner(name)')
      .eq('make_id', prefixMakeMatch.id)
      .ilike('normalized_name', `%${restNorm}%`)
      .eq('is_active', true)
      .order('name')
      .limit(10);
    for (const row of (makeModels ?? []) as any[]) addModel(row);
  }

  // 3. Model normalized-name partial match (always runs — catches "rogue", "cx5", etc.)
  const { data: nameMatches } = await supabase
    .from('vehicle_models')
    .select('id, name, slug, vehicle_makes!inner(name)')
    .ilike('normalized_name', `%${normalized}%`)
    .eq('is_active', true)
    .order('name')
    .limit(10);
  for (const row of (nameMatches ?? []) as any[]) addModel(row);

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
        id, name, slug,
        vehicle_makes!inner(name)
      )
    `);
  if (error) throw error;
  return (data || []).map((row: any) => ({
    id: row.vehicle_models.id,
    name: row.vehicle_models.name,
    slug: row.vehicle_models.slug,
    make_name: row.vehicle_models.vehicle_makes.name,
    display_name: `${row.vehicle_models.vehicle_makes.name} ${row.vehicle_models.name}`,
  }));
}

import { supabase } from '../../lib/supabase';
import { normalizeQuery } from './utils';
import type { VehicleModel, VehicleSearchResult } from './types';

export async function searchVehicleModels(query: string): Promise<VehicleSearchResult[]> {
  if (!query.trim()) return [];

  const normalized = normalizeQuery(query);
  const seen = new Set<string>();
  const results: VehicleSearchResult[] = [];

  // 1. Exact alias lookup
  const { data: aliasMatches } = await supabase
    .from('vehicle_aliases')
    .select(`
      vehicle_model_id,
      vehicle_models!inner(
        id, name, slug,
        vehicle_makes!inner(name)
      )
    `)
    .eq('normalized_alias', normalized)
    .limit(5);

  if (aliasMatches) {
    for (const row of aliasMatches as any[]) {
      const m = row.vehicle_models;
      if (!seen.has(m.id)) {
        seen.add(m.id);
        results.push({
          id: m.id,
          name: m.name,
          slug: m.slug,
          make_name: m.vehicle_makes.name,
          display_name: `${m.vehicle_makes.name} ${m.name}`,
        });
      }
    }
  }

  // 2. Normalized name partial match
  const { data: nameMatches } = await supabase
    .from('vehicle_models')
    .select(`
      id, name, slug,
      vehicle_makes!inner(name)
    `)
    .ilike('normalized_name', `%${normalized}%`)
    .limit(10);

  if (nameMatches) {
    for (const row of nameMatches as any[]) {
      if (!seen.has(row.id)) {
        seen.add(row.id);
        results.push({
          id: row.id,
          name: row.name,
          slug: row.slug,
          make_name: row.vehicle_makes.name,
          display_name: `${row.vehicle_makes.name} ${row.name}`,
        });
      }
    }
  }

  return results;
}

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

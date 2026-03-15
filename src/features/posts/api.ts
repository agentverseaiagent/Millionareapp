import { supabase } from '../../lib/supabase';
import type { Post, CreatePostInput } from './types';

const POST_SELECT = `
  id, author_id, vehicle_model_id, body, category, created_at,
  vehicle_model:vehicle_models(
    id, name, slug,
    vehicle_makes(name)
  )
`;

export async function getGlobalFeed(limit = 30, offset = 0): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select(POST_SELECT)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);
  if (error) throw error;
  return (data || []) as Post[];
}

export async function getModelFeed(vehicleModelId: string, limit = 30, offset = 0): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select(POST_SELECT)
    .eq('vehicle_model_id', vehicleModelId)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);
  if (error) throw error;
  return (data || []) as Post[];
}

export async function createPost(input: CreatePostInput): Promise<Post> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');
  const { data, error } = await supabase
    .from('posts')
    .insert({
      author_id: user.id,
      body: input.body.trim(),
      vehicle_model_id: input.vehicle_model_id ?? null,
      category: input.category ?? null,
    })
    .select(POST_SELECT)
    .single();
  if (error) throw error;
  return data as Post;
}

import { supabase } from '../../lib/supabase';
import type { Post, CreatePostInput, PostComment } from './types';

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
  return (data || []) as unknown as Post[];
}

export async function getFollowingFeed(limit = 30, offset = 0): Promise<Post[]> {
  const { data: follows } = await supabase
    .from('user_model_follows')
    .select('vehicle_model_id');

  const modelIds = (follows ?? [])
    .map((f: any) => f.vehicle_model_id)
    .filter(Boolean);

  if (modelIds.length === 0) return [];

  const { data, error } = await supabase
    .from('posts')
    .select(POST_SELECT)
    .in('vehicle_model_id', modelIds)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);
  if (error) throw error;
  return (data || []) as unknown as Post[];
}

export async function getModelFeed(vehicleModelId: string, limit = 30, offset = 0): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select(POST_SELECT)
    .eq('vehicle_model_id', vehicleModelId)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);
  if (error) throw error;
  return (data || []) as unknown as Post[];
}

export async function getPostById(id: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from('posts')
    .select(POST_SELECT)
    .eq('id', id)
    .single();
  if (error) return null;
  return data as unknown as Post;
}

export async function getPostComments(postId: string): Promise<PostComment[]> {
  const { data, error } = await supabase
    .from('post_comments')
    .select('id, post_id, author_id, body, created_at')
    .eq('post_id', postId)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return (data || []) as PostComment[];
}

export async function createComment(postId: string, body: string): Promise<PostComment> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');
  const { data, error } = await supabase
    .from('post_comments')
    .insert({ post_id: postId, author_id: user.id, body: body.trim() })
    .select('id, post_id, author_id, body, created_at')
    .single();
  if (error) throw error;
  return data as PostComment;
}

export async function deletePost(postId: string): Promise<void> {
  const { error } = await supabase.from('posts').delete().eq('id', postId);
  if (error) throw error;
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
      category: input.category ?? 'general',
    })
    .select(POST_SELECT)
    .single();
  if (error) throw error;
  return data as unknown as Post;
}

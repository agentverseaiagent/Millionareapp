import { supabase } from '../../lib/supabase';

export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: 'garagetwits://',
    },
  });
  if (error) throw error;
  return data;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
}

export async function requestPasswordReset(email: string) {
  // No redirectTo here — Supabase opens its hosted reset page in the browser.
  // Custom scheme deep links (garagetwits://reset-password) only work in
  // standalone/production builds, not Expo Go. When you ship a production
  // build, set redirectTo: 'garagetwits://reset-password' to use the in-app flow.
  const { error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) throw error;
}

export async function updatePassword(newPassword: string) {
  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) throw error;
}

export async function getUserProfile(): Promise<{ id: string; username: string | null } | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data } = await supabase
    .from('profiles')
    .select('id, username')
    .eq('id', user.id)
    .single();
  return data ?? null;
}

export async function updateUsername(username: string): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');
  const { error } = await supabase
    .from('profiles')
    .update({ username: username.trim() || null })
    .eq('id', user.id);
  if (error) throw error;
}

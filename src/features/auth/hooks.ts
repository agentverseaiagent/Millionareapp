import { useEffect, useState, useCallback } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../../lib/supabase';
import { getUserProfile } from './api';
import type { AuthState } from './types';

export function useSession(): AuthState {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { session, loading };
}

export function useProfile() {
  const [profile, setProfile] = useState<{ id: string; username: string | null } | null>(null);
  const [loading, setLoading] = useState(true);

  const refetch = useCallback(async () => {
    try { setProfile(await getUserProfile()); } catch {}
  }, []);

  useEffect(() => {
    getUserProfile()
      .then(p => setProfile(p))
      .finally(() => setLoading(false));
  }, []);

  return { profile, loading, refetch };
}

export function hasValidUsername(username: string | null | undefined): boolean {
  return !!username && username.trim().length > 0;
}

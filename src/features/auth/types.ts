import { Session, User } from '@supabase/supabase-js';

export type { Session, User };

export interface AuthState {
  session: Session | null;
  loading: boolean;
}

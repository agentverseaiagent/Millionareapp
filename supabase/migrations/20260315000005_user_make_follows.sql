-- Make-level follows, parallel to the existing user_model_follows table.
-- A user can follow a make (e.g. Honda) independently of following any specific model.

CREATE TABLE IF NOT EXISTS user_make_follows (
  user_id          UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  vehicle_make_id  UUID        NOT NULL REFERENCES vehicle_makes(id) ON DELETE CASCADE,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, vehicle_make_id)
);

ALTER TABLE user_make_follows ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own make follows"
  ON user_make_follows FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can follow makes"
  ON user_make_follows FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can unfollow makes"
  ON user_make_follows FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_user_make_follows_user_id ON user_make_follows(user_id);

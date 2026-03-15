-- ============================================================
-- Garagetwits schema
-- All tables, indexes, RLS policies, and triggers.
-- No seed data — see 20260315000002_catalog.sql
-- ============================================================

-- ── Profiles (auto-created on signup) ───────────────────────
CREATE TABLE IF NOT EXISTS profiles (
  id         UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username   TEXT        UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Profiles are viewable by everyone"
  ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id) VALUES (NEW.id) ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ── Vehicle makes ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS vehicle_makes (
  id             UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name           TEXT        NOT NULL,
  slug           TEXT        NOT NULL UNIQUE,
  source         TEXT        NOT NULL DEFAULT 'manual',
  source_make_id TEXT,
  last_synced_at TIMESTAMPTZ,
  is_active      BOOLEAN     NOT NULL DEFAULT true,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE vehicle_makes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Vehicle makes are public" ON vehicle_makes FOR SELECT USING (true);

CREATE UNIQUE INDEX IF NOT EXISTS idx_vehicle_makes_source_id
  ON vehicle_makes(source, source_make_id) WHERE source_make_id IS NOT NULL;

-- ── Vehicle models ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS vehicle_models (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  make_id         UUID        NOT NULL REFERENCES vehicle_makes(id) ON DELETE CASCADE,
  name            TEXT        NOT NULL,
  slug            TEXT        NOT NULL UNIQUE,
  normalized_name TEXT        NOT NULL,
  source          TEXT        NOT NULL DEFAULT 'manual',
  source_model_id TEXT,
  last_synced_at  TIMESTAMPTZ,
  last_seen_year  INTEGER,
  is_active       BOOLEAN     NOT NULL DEFAULT true,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(make_id, name)
);

ALTER TABLE vehicle_models ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Vehicle models are public" ON vehicle_models FOR SELECT USING (true);

CREATE INDEX IF NOT EXISTS idx_vehicle_models_normalized_name ON vehicle_models(normalized_name);
CREATE INDEX IF NOT EXISTS idx_vehicle_models_make_id        ON vehicle_models(make_id);
CREATE INDEX IF NOT EXISTS idx_vehicle_models_is_active      ON vehicle_models(is_active);
CREATE UNIQUE INDEX IF NOT EXISTS idx_vehicle_models_source_id
  ON vehicle_models(source, source_model_id) WHERE source_model_id IS NOT NULL;

-- ── Vehicle aliases ──────────────────────────────────────────
-- Manual lookup layer. alias = human-readable, normalized_alias = stripped lookup key.
-- Must match normalizeQuery() in src/features/vehicles/utils.ts
CREATE TABLE IF NOT EXISTS vehicle_aliases (
  id               UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_model_id UUID    NOT NULL REFERENCES vehicle_models(id) ON DELETE CASCADE,
  alias            TEXT    NOT NULL,
  normalized_alias TEXT    NOT NULL UNIQUE,
  is_manual        BOOLEAN NOT NULL DEFAULT true,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE vehicle_aliases ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Vehicle aliases are public" ON vehicle_aliases FOR SELECT USING (true);

CREATE INDEX IF NOT EXISTS idx_vehicle_aliases_normalized_alias ON vehicle_aliases(normalized_alias);

-- ── Posts ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS posts (
  id               UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id        UUID    NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  vehicle_model_id UUID    REFERENCES vehicle_models(id) ON DELETE SET NULL,
  body             TEXT    NOT NULL
    CHECK (char_length(body) >= 1 AND char_length(body) <= 500),
  category         TEXT    NOT NULL DEFAULT 'question'
    CHECK (category IN ('price_paid','lease_finance','issue','maintenance','review','question')),
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Posts are viewable by authenticated users"
  ON posts FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can create own posts"
  ON posts FOR INSERT TO authenticated WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Users can delete own posts"
  ON posts FOR DELETE TO authenticated USING (auth.uid() = author_id);

CREATE INDEX IF NOT EXISTS idx_posts_created_at       ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_vehicle_model_id ON posts(vehicle_model_id);
CREATE INDEX IF NOT EXISTS idx_posts_author_id        ON posts(author_id);

-- ── User model follows ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS user_model_follows (
  user_id          UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  vehicle_model_id UUID NOT NULL REFERENCES vehicle_models(id) ON DELETE CASCADE,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, vehicle_model_id)
);

ALTER TABLE user_model_follows ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own follows"
  ON user_model_follows FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can follow models"
  ON user_model_follows FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can unfollow models"
  ON user_model_follows FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_user_model_follows_user_id ON user_model_follows(user_id);

-- ── Post comments ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS post_comments (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id    UUID        NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  author_id  UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  body       TEXT        NOT NULL CHECK (char_length(body) >= 1 AND char_length(body) <= 500),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE post_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "comments_select"
  ON post_comments FOR SELECT TO authenticated USING (true);
CREATE POLICY "comments_insert"
  ON post_comments FOR INSERT TO authenticated WITH CHECK (auth.uid() = author_id);
CREATE POLICY "comments_delete"
  ON post_comments FOR DELETE TO authenticated USING (auth.uid() = author_id);

CREATE INDEX IF NOT EXISTS idx_post_comments_post_id ON post_comments(post_id);

-- ============================================================
-- Garagetwits initial schema
-- Run this in Supabase: Dashboard → SQL Editor → New Query
-- ============================================================

-- ============================================================
-- PROFILES (auto-created on signup)
-- ============================================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Trigger: auto-create profile row on new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (NEW.id)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- VEHICLE MAKES
-- ============================================================
CREATE TABLE IF NOT EXISTS vehicle_makes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE vehicle_makes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Vehicle makes are public" ON vehicle_makes FOR SELECT USING (true);

-- ============================================================
-- VEHICLE MODELS
-- ============================================================
CREATE TABLE IF NOT EXISTS vehicle_models (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  make_id UUID NOT NULL REFERENCES vehicle_makes(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  normalized_name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(make_id, name)
);

ALTER TABLE vehicle_models ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Vehicle models are public" ON vehicle_models FOR SELECT USING (true);

CREATE INDEX IF NOT EXISTS idx_vehicle_models_normalized_name ON vehicle_models(normalized_name);
CREATE INDEX IF NOT EXISTS idx_vehicle_models_make_id ON vehicle_models(make_id);

-- ============================================================
-- VEHICLE ALIASES
-- ============================================================
CREATE TABLE IF NOT EXISTS vehicle_aliases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_model_id UUID NOT NULL REFERENCES vehicle_models(id) ON DELETE CASCADE,
  alias TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE vehicle_aliases ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Vehicle aliases are public" ON vehicle_aliases FOR SELECT USING (true);

CREATE INDEX IF NOT EXISTS idx_vehicle_aliases_alias ON vehicle_aliases(alias);

-- ============================================================
-- POSTS
-- ============================================================
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  vehicle_model_id UUID REFERENCES vehicle_models(id) ON DELETE SET NULL,
  body TEXT NOT NULL CHECK (char_length(body) >= 1 AND char_length(body) <= 500),
  category TEXT CHECK (category IN ('price_paid', 'lease_finance', 'issue', 'maintenance', 'review', 'question')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Posts are viewable by authenticated users" ON posts FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can create own posts" ON posts FOR INSERT TO authenticated WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Users can delete own posts" ON posts FOR DELETE TO authenticated USING (auth.uid() = author_id);

CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_vehicle_model_id ON posts(vehicle_model_id);
CREATE INDEX IF NOT EXISTS idx_posts_author_id ON posts(author_id);

-- ============================================================
-- USER MODEL FOLLOWS
-- ============================================================
CREATE TABLE IF NOT EXISTS user_model_follows (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  vehicle_model_id UUID NOT NULL REFERENCES vehicle_models(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, vehicle_model_id)
);

ALTER TABLE user_model_follows ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own follows" ON user_model_follows FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can follow models" ON user_model_follows FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can unfollow models" ON user_model_follows FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_user_model_follows_user_id ON user_model_follows(user_id);

-- ============================================================
-- SEED: VEHICLE MAKES
-- ============================================================
INSERT INTO vehicle_makes (name, slug) VALUES
  ('Honda', 'honda'),
  ('Toyota', 'toyota'),
  ('Ford', 'ford'),
  ('Chevrolet', 'chevrolet'),
  ('BMW', 'bmw'),
  ('Mercedes-Benz', 'mercedes-benz'),
  ('Audi', 'audi'),
  ('Volkswagen', 'volkswagen'),
  ('Subaru', 'subaru'),
  ('Mazda', 'mazda'),
  ('Nissan', 'nissan'),
  ('Hyundai', 'hyundai'),
  ('Kia', 'kia'),
  ('Tesla', 'tesla'),
  ('Jeep', 'jeep'),
  ('Ram', 'ram'),
  ('GMC', 'gmc'),
  ('Lexus', 'lexus'),
  ('Acura', 'acura'),
  ('Infiniti', 'infiniti')
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- SEED: VEHICLE MODELS
-- ============================================================
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'CR-V', 'honda-cr-v', 'crv' FROM vehicle_makes WHERE slug = 'honda' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Civic', 'honda-civic', 'civic' FROM vehicle_makes WHERE slug = 'honda' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Accord', 'honda-accord', 'accord' FROM vehicle_makes WHERE slug = 'honda' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Pilot', 'honda-pilot', 'pilot' FROM vehicle_makes WHERE slug = 'honda' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Passport', 'honda-passport', 'passport' FROM vehicle_makes WHERE slug = 'honda' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'RAV4', 'toyota-rav4', 'rav4' FROM vehicle_makes WHERE slug = 'toyota' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Camry', 'toyota-camry', 'camry' FROM vehicle_makes WHERE slug = 'toyota' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Corolla', 'toyota-corolla', 'corolla' FROM vehicle_makes WHERE slug = 'toyota' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Tacoma', 'toyota-tacoma', 'tacoma' FROM vehicle_makes WHERE slug = 'toyota' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Highlander', 'toyota-highlander', 'highlander' FROM vehicle_makes WHERE slug = 'toyota' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, '4Runner', 'toyota-4runner', '4runner' FROM vehicle_makes WHERE slug = 'toyota' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Prius', 'toyota-prius', 'prius' FROM vehicle_makes WHERE slug = 'toyota' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'F-150', 'ford-f150', 'f150' FROM vehicle_makes WHERE slug = 'ford' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Mustang', 'ford-mustang', 'mustang' FROM vehicle_makes WHERE slug = 'ford' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Explorer', 'ford-explorer', 'explorer' FROM vehicle_makes WHERE slug = 'ford' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Bronco', 'ford-bronco', 'bronco' FROM vehicle_makes WHERE slug = 'ford' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Escape', 'ford-escape', 'escape' FROM vehicle_makes WHERE slug = 'ford' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Silverado', 'chevrolet-silverado', 'silverado' FROM vehicle_makes WHERE slug = 'chevrolet' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Equinox', 'chevrolet-equinox', 'equinox' FROM vehicle_makes WHERE slug = 'chevrolet' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Traverse', 'chevrolet-traverse', 'traverse' FROM vehicle_makes WHERE slug = 'chevrolet' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, '3 Series', 'bmw-3-series', '3series' FROM vehicle_makes WHERE slug = 'bmw' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, '5 Series', 'bmw-5-series', '5series' FROM vehicle_makes WHERE slug = 'bmw' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'X3', 'bmw-x3', 'x3' FROM vehicle_makes WHERE slug = 'bmw' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'X5', 'bmw-x5', 'x5' FROM vehicle_makes WHERE slug = 'bmw' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Model 3', 'tesla-model-3', 'model3' FROM vehicle_makes WHERE slug = 'tesla' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Model Y', 'tesla-model-y', 'modely' FROM vehicle_makes WHERE slug = 'tesla' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Model S', 'tesla-model-s', 'models' FROM vehicle_makes WHERE slug = 'tesla' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Outback', 'subaru-outback', 'outback' FROM vehicle_makes WHERE slug = 'subaru' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Forester', 'subaru-forester', 'forester' FROM vehicle_makes WHERE slug = 'subaru' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Crosstrek', 'subaru-crosstrek', 'crosstrek' FROM vehicle_makes WHERE slug = 'subaru' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Wrangler', 'jeep-wrangler', 'wrangler' FROM vehicle_makes WHERE slug = 'jeep' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Grand Cherokee', 'jeep-grand-cherokee', 'grandcherokee' FROM vehicle_makes WHERE slug = 'jeep' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Gladiator', 'jeep-gladiator', 'gladiator' FROM vehicle_makes WHERE slug = 'jeep' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Altima', 'nissan-altima', 'altima' FROM vehicle_makes WHERE slug = 'nissan' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Rogue', 'nissan-rogue', 'rogue' FROM vehicle_makes WHERE slug = 'nissan' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Tucson', 'hyundai-tucson', 'tucson' FROM vehicle_makes WHERE slug = 'hyundai' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Santa Fe', 'hyundai-santa-fe', 'santafe' FROM vehicle_makes WHERE slug = 'hyundai' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Telluride', 'kia-telluride', 'telluride' FROM vehicle_makes WHERE slug = 'kia' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Sorento', 'kia-sorento', 'sorento' FROM vehicle_makes WHERE slug = 'kia' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Sportage', 'kia-sportage', 'sportage' FROM vehicle_makes WHERE slug = 'kia' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, '1500', 'ram-1500', 'ram1500' FROM vehicle_makes WHERE slug = 'ram' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Sierra', 'gmc-sierra', 'sierra' FROM vehicle_makes WHERE slug = 'gmc' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'RX', 'lexus-rx', 'rx' FROM vehicle_makes WHERE slug = 'lexus' ON CONFLICT DO NOTHING;

-- ============================================================
-- SEED: VEHICLE ALIASES
-- Maps common user-typed variants to canonical models
-- ============================================================
INSERT INTO vehicle_aliases (vehicle_model_id, alias)
SELECT id, 'crv' FROM vehicle_models WHERE slug = 'honda-cr-v' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_aliases (vehicle_model_id, alias)
SELECT id, 'hondacrv' FROM vehicle_models WHERE slug = 'honda-cr-v' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_aliases (vehicle_model_id, alias)
SELECT id, 'hondacrvhybrid' FROM vehicle_models WHERE slug = 'honda-cr-v' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_aliases (vehicle_model_id, alias)
SELECT id, 'rav4' FROM vehicle_models WHERE slug = 'toyota-rav4' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_aliases (vehicle_model_id, alias)
SELECT id, 'toyotarav4' FROM vehicle_models WHERE slug = 'toyota-rav4' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_aliases (vehicle_model_id, alias)
SELECT id, 'f150' FROM vehicle_models WHERE slug = 'ford-f150' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_aliases (vehicle_model_id, alias)
SELECT id, 'fordf150' FROM vehicle_models WHERE slug = 'ford-f150' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_aliases (vehicle_model_id, alias)
SELECT id, 'f1504x4' FROM vehicle_models WHERE slug = 'ford-f150' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_aliases (vehicle_model_id, alias)
SELECT id, 'model3' FROM vehicle_models WHERE slug = 'tesla-model-3' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_aliases (vehicle_model_id, alias)
SELECT id, 'teslamodel3' FROM vehicle_models WHERE slug = 'tesla-model-3' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_aliases (vehicle_model_id, alias)
SELECT id, 'modely' FROM vehicle_models WHERE slug = 'tesla-model-y' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_aliases (vehicle_model_id, alias)
SELECT id, 'teslamodely' FROM vehicle_models WHERE slug = 'tesla-model-y' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_aliases (vehicle_model_id, alias)
SELECT id, '3series' FROM vehicle_models WHERE slug = 'bmw-3-series' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_aliases (vehicle_model_id, alias)
SELECT id, 'bmw3' FROM vehicle_models WHERE slug = 'bmw-3-series' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_aliases (vehicle_model_id, alias)
SELECT id, 'bmw3series' FROM vehicle_models WHERE slug = 'bmw-3-series' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_aliases (vehicle_model_id, alias)
SELECT id, '5series' FROM vehicle_models WHERE slug = 'bmw-5-series' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_aliases (vehicle_model_id, alias)
SELECT id, 'bmw5series' FROM vehicle_models WHERE slug = 'bmw-5-series' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_aliases (vehicle_model_id, alias)
SELECT id, 'grandcherokee' FROM vehicle_models WHERE slug = 'jeep-grand-cherokee' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_aliases (vehicle_model_id, alias)
SELECT id, 'jeepgrandcherokee' FROM vehicle_models WHERE slug = 'jeep-grand-cherokee' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_aliases (vehicle_model_id, alias)
SELECT id, 'jgc' FROM vehicle_models WHERE slug = 'jeep-grand-cherokee' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_aliases (vehicle_model_id, alias)
SELECT id, '4runner' FROM vehicle_models WHERE slug = 'toyota-4runner' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_aliases (vehicle_model_id, alias)
SELECT id, 'toyota4runner' FROM vehicle_models WHERE slug = 'toyota-4runner' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_aliases (vehicle_model_id, alias)
SELECT id, 'santafe' FROM vehicle_models WHERE slug = 'hyundai-santa-fe' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_aliases (vehicle_model_id, alias)
SELECT id, 'hyundaisantafe' FROM vehicle_models WHERE slug = 'hyundai-santa-fe' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_aliases (vehicle_model_id, alias)
SELECT id, 'telluride' FROM vehicle_models WHERE slug = 'kia-telluride' ON CONFLICT DO NOTHING;

INSERT INTO vehicle_aliases (vehicle_model_id, alias)
SELECT id, 'kiatelluride' FROM vehicle_models WHERE slug = 'kia-telluride' ON CONFLICT DO NOTHING;

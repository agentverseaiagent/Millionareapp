-- ============================================================
-- Garagetwits initial schema v2
-- Run this in Supabase: Dashboard → SQL Editor → New Query
--
-- Changes from v1:
--   - vehicle_makes/models: added source, source_make_id/model_id,
--     last_synced_at, is_active (for NHTSA sync pipeline)
--   - vehicle_aliases: added normalized_alias (lookup key) + is_manual flag;
--     alias column is now human-readable display text
--   - posts.category: NOT NULL DEFAULT 'question'
--   - F-150 seed slug fixed to 'ford-f-150' (matches slug algorithm)
--   - Added Mazda models, more Acura/Infiniti/Audi/VW models
--   - All alias seeds restructured with normalized_alias
-- ============================================================

-- ============================================================
-- PROFILES (auto-created on signup)
-- ============================================================
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
  id             UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name           TEXT        NOT NULL,
  slug           TEXT        NOT NULL UNIQUE,
  -- sync tracking
  source         TEXT        NOT NULL DEFAULT 'manual',  -- 'manual' | 'nhtsa'
  source_make_id TEXT,                                   -- NHTSA Make_ID (as text)
  last_synced_at TIMESTAMPTZ,
  is_active      BOOLEAN     NOT NULL DEFAULT true,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE vehicle_makes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Vehicle makes are public"
  ON vehicle_makes FOR SELECT USING (true);

CREATE UNIQUE INDEX IF NOT EXISTS idx_vehicle_makes_source_id
  ON vehicle_makes(source, source_make_id)
  WHERE source_make_id IS NOT NULL;

-- ============================================================
-- VEHICLE MODELS
-- ============================================================
CREATE TABLE IF NOT EXISTS vehicle_models (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  make_id         UUID        NOT NULL REFERENCES vehicle_makes(id) ON DELETE CASCADE,
  name            TEXT        NOT NULL,
  slug            TEXT        NOT NULL UNIQUE,
  normalized_name TEXT        NOT NULL,  -- stripped lowercase: "CR-V" → "crv"
  -- sync tracking
  source          TEXT        NOT NULL DEFAULT 'manual',
  source_model_id TEXT,                  -- NHTSA Model_ID (as text)
  last_synced_at  TIMESTAMPTZ,
  last_seen_year  INTEGER,               -- most recent model year returned by NHTSA
  is_active       BOOLEAN     NOT NULL DEFAULT true,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(make_id, name)
);

ALTER TABLE vehicle_models ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Vehicle models are public"
  ON vehicle_models FOR SELECT USING (true);

CREATE INDEX IF NOT EXISTS idx_vehicle_models_normalized_name
  ON vehicle_models(normalized_name);
CREATE INDEX IF NOT EXISTS idx_vehicle_models_make_id
  ON vehicle_models(make_id);
CREATE INDEX IF NOT EXISTS idx_vehicle_models_is_active
  ON vehicle_models(is_active);
CREATE UNIQUE INDEX IF NOT EXISTS idx_vehicle_models_source_id
  ON vehicle_models(source, source_model_id)
  WHERE source_model_id IS NOT NULL;

-- ============================================================
-- VEHICLE ALIASES
-- Manual app-controlled layer — never modified by the sync pipeline.
--
-- alias            — human-readable form  (e.g. "Honda CRV", "CR-V")
-- normalized_alias — stripped lookup key  (e.g. "hondacrv", "crv")
--                    must match normalizeQuery() output in the app
-- is_manual        — true for all admin/seed rows; false reserved for
--                    future auto-generated aliases
--
-- normalized matching examples:
--   user types "cr-v"    → normalizes "crv"      → hits honda-cr-v normalized_name
--   user types "honda crv" → normalizes "hondacrv" → hits alias
--   user types "cx-5"    → normalizes "cx5"      → hits mazda-cx-5 normalized_name
--   user types "mazda cx5" → normalizes "mazdacx5" → hits alias
--   user types "f-150"   → normalizes "f150"     → hits ford-f-150 normalized_name
--   user types "ford f150" → normalizes "fordf150" → hits alias
-- ============================================================
CREATE TABLE IF NOT EXISTS vehicle_aliases (
  id               UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_model_id UUID    NOT NULL REFERENCES vehicle_models(id) ON DELETE CASCADE,
  alias            TEXT    NOT NULL,               -- human-readable: "CR-V"
  normalized_alias TEXT    NOT NULL UNIQUE,        -- lookup key:     "crv"
  is_manual        BOOLEAN NOT NULL DEFAULT true,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE vehicle_aliases ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Vehicle aliases are public"
  ON vehicle_aliases FOR SELECT USING (true);

CREATE INDEX IF NOT EXISTS idx_vehicle_aliases_normalized_alias
  ON vehicle_aliases(normalized_alias);

-- ============================================================
-- POSTS
-- ============================================================
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

CREATE INDEX IF NOT EXISTS idx_posts_created_at
  ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_vehicle_model_id
  ON posts(vehicle_model_id);
CREATE INDEX IF NOT EXISTS idx_posts_author_id
  ON posts(author_id);

-- ============================================================
-- USER MODEL FOLLOWS
-- ============================================================
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

CREATE INDEX IF NOT EXISTS idx_user_model_follows_user_id
  ON user_model_follows(user_id);

-- ============================================================
-- SEED: VEHICLE MAKES (bootstrap — sync will keep these current)
-- ============================================================
INSERT INTO vehicle_makes (name, slug) VALUES
  ('Honda',         'honda'),
  ('Toyota',        'toyota'),
  ('Ford',          'ford'),
  ('Chevrolet',     'chevrolet'),
  ('BMW',           'bmw'),
  ('Mercedes-Benz', 'mercedes-benz'),
  ('Audi',          'audi'),
  ('Volkswagen',    'volkswagen'),
  ('Subaru',        'subaru'),
  ('Mazda',         'mazda'),
  ('Nissan',        'nissan'),
  ('Hyundai',       'hyundai'),
  ('Kia',           'kia'),
  ('Tesla',         'tesla'),
  ('Jeep',          'jeep'),
  ('Ram',           'ram'),
  ('GMC',           'gmc'),
  ('Lexus',         'lexus'),
  ('Acura',         'acura'),
  ('Infiniti',      'infiniti')
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- SEED: VEHICLE MODELS
-- Slugs use the same algorithm as toModelSlug() in the Edge Function:
--   makeSlug + '-' + modelName.lower().replace(/[^a-z0-9]+/g, '-').trim('-')
-- ============================================================

-- Honda
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'CR-V',     'honda-cr-v',     'crv'      FROM vehicle_makes WHERE slug = 'honda' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Civic',    'honda-civic',    'civic'    FROM vehicle_makes WHERE slug = 'honda' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Accord',   'honda-accord',   'accord'   FROM vehicle_makes WHERE slug = 'honda' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Pilot',    'honda-pilot',    'pilot'    FROM vehicle_makes WHERE slug = 'honda' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Passport', 'honda-passport', 'passport' FROM vehicle_makes WHERE slug = 'honda' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Ridgeline','honda-ridgeline','ridgeline' FROM vehicle_makes WHERE slug = 'honda' ON CONFLICT DO NOTHING;

-- Toyota
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'RAV4',       'toyota-rav4',       'rav4'       FROM vehicle_makes WHERE slug = 'toyota' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Camry',      'toyota-camry',      'camry'      FROM vehicle_makes WHERE slug = 'toyota' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Corolla',    'toyota-corolla',    'corolla'    FROM vehicle_makes WHERE slug = 'toyota' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Tacoma',     'toyota-tacoma',     'tacoma'     FROM vehicle_makes WHERE slug = 'toyota' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Highlander', 'toyota-highlander', 'highlander' FROM vehicle_makes WHERE slug = 'toyota' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, '4Runner',    'toyota-4runner',    '4runner'    FROM vehicle_makes WHERE slug = 'toyota' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Prius',      'toyota-prius',      'prius'      FROM vehicle_makes WHERE slug = 'toyota' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Tundra',     'toyota-tundra',     'tundra'     FROM vehicle_makes WHERE slug = 'toyota' ON CONFLICT DO NOTHING;

-- Ford  (F-150 slug = 'ford-f-150' to match toSlug("F-150") → "f-150")
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'F-150',   'ford-f-150',   'f150'    FROM vehicle_makes WHERE slug = 'ford' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Mustang', 'ford-mustang', 'mustang' FROM vehicle_makes WHERE slug = 'ford' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Explorer','ford-explorer','explorer' FROM vehicle_makes WHERE slug = 'ford' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Bronco',  'ford-bronco',  'bronco'  FROM vehicle_makes WHERE slug = 'ford' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Escape',  'ford-escape',  'escape'  FROM vehicle_makes WHERE slug = 'ford' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Maverick','ford-maverick','maverick' FROM vehicle_makes WHERE slug = 'ford' ON CONFLICT DO NOTHING;

-- Chevrolet
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Silverado','chevrolet-silverado','silverado' FROM vehicle_makes WHERE slug = 'chevrolet' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Equinox',  'chevrolet-equinox',  'equinox'  FROM vehicle_makes WHERE slug = 'chevrolet' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Traverse', 'chevrolet-traverse', 'traverse' FROM vehicle_makes WHERE slug = 'chevrolet' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Colorado', 'chevrolet-colorado', 'colorado' FROM vehicle_makes WHERE slug = 'chevrolet' ON CONFLICT DO NOTHING;

-- BMW
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, '3 Series','bmw-3-series','3series' FROM vehicle_makes WHERE slug = 'bmw' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, '5 Series','bmw-5-series','5series' FROM vehicle_makes WHERE slug = 'bmw' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'X3',      'bmw-x3',     'x3'      FROM vehicle_makes WHERE slug = 'bmw' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'X5',      'bmw-x5',     'x5'      FROM vehicle_makes WHERE slug = 'bmw' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'M3',      'bmw-m3',     'm3'      FROM vehicle_makes WHERE slug = 'bmw' ON CONFLICT DO NOTHING;

-- Tesla
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Model 3',    'tesla-model-3',    'model3'     FROM vehicle_makes WHERE slug = 'tesla' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Model Y',    'tesla-model-y',    'modely'     FROM vehicle_makes WHERE slug = 'tesla' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Model S',    'tesla-model-s',    'models'     FROM vehicle_makes WHERE slug = 'tesla' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Model X',    'tesla-model-x',    'modelx'     FROM vehicle_makes WHERE slug = 'tesla' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Cybertruck', 'tesla-cybertruck', 'cybertruck' FROM vehicle_makes WHERE slug = 'tesla' ON CONFLICT DO NOTHING;

-- Subaru
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Outback',   'subaru-outback',   'outback'   FROM vehicle_makes WHERE slug = 'subaru' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Forester',  'subaru-forester',  'forester'  FROM vehicle_makes WHERE slug = 'subaru' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Crosstrek', 'subaru-crosstrek', 'crosstrek' FROM vehicle_makes WHERE slug = 'subaru' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'WRX',       'subaru-wrx',       'wrx'       FROM vehicle_makes WHERE slug = 'subaru' ON CONFLICT DO NOTHING;

-- Mazda
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'CX-5',   'mazda-cx-5',   'cx5'    FROM vehicle_makes WHERE slug = 'mazda' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'CX-50',  'mazda-cx-50',  'cx50'   FROM vehicle_makes WHERE slug = 'mazda' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Mazda3', 'mazda-mazda3', 'mazda3' FROM vehicle_makes WHERE slug = 'mazda' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Mazda6', 'mazda-mazda6', 'mazda6' FROM vehicle_makes WHERE slug = 'mazda' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'CX-9',   'mazda-cx-9',   'cx9'    FROM vehicle_makes WHERE slug = 'mazda' ON CONFLICT DO NOTHING;

-- Jeep
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Wrangler',       'jeep-wrangler',       'wrangler'      FROM vehicle_makes WHERE slug = 'jeep' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Grand Cherokee', 'jeep-grand-cherokee', 'grandcherokee' FROM vehicle_makes WHERE slug = 'jeep' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Gladiator',      'jeep-gladiator',      'gladiator'     FROM vehicle_makes WHERE slug = 'jeep' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Cherokee',       'jeep-cherokee',       'cherokee'      FROM vehicle_makes WHERE slug = 'jeep' ON CONFLICT DO NOTHING;

-- Nissan
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Altima',  'nissan-altima',  'altima'  FROM vehicle_makes WHERE slug = 'nissan' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Rogue',   'nissan-rogue',   'rogue'   FROM vehicle_makes WHERE slug = 'nissan' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Frontier','nissan-frontier','frontier' FROM vehicle_makes WHERE slug = 'nissan' ON CONFLICT DO NOTHING;

-- Hyundai
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Tucson',   'hyundai-tucson',   'tucson'  FROM vehicle_makes WHERE slug = 'hyundai' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Santa Fe', 'hyundai-santa-fe', 'santafe' FROM vehicle_makes WHERE slug = 'hyundai' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Sonata',   'hyundai-sonata',   'sonata'  FROM vehicle_makes WHERE slug = 'hyundai' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Elantra',  'hyundai-elantra',  'elantra' FROM vehicle_makes WHERE slug = 'hyundai' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Ioniq 5',  'hyundai-ioniq-5',  'ioniq5'  FROM vehicle_makes WHERE slug = 'hyundai' ON CONFLICT DO NOTHING;

-- Kia
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Telluride','kia-telluride','telluride' FROM vehicle_makes WHERE slug = 'kia' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Sorento',  'kia-sorento',  'sorento'   FROM vehicle_makes WHERE slug = 'kia' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Sportage', 'kia-sportage', 'sportage'  FROM vehicle_makes WHERE slug = 'kia' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'EV6',      'kia-ev6',      'ev6'       FROM vehicle_makes WHERE slug = 'kia' ON CONFLICT DO NOTHING;

-- Ram
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, '1500', 'ram-1500', '1500' FROM vehicle_makes WHERE slug = 'ram' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, '2500', 'ram-2500', '2500' FROM vehicle_makes WHERE slug = 'ram' ON CONFLICT DO NOTHING;

-- GMC
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Sierra',  'gmc-sierra',  'sierra'  FROM vehicle_makes WHERE slug = 'gmc' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Terrain', 'gmc-terrain', 'terrain' FROM vehicle_makes WHERE slug = 'gmc' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Yukon',   'gmc-yukon',   'yukon'   FROM vehicle_makes WHERE slug = 'gmc' ON CONFLICT DO NOTHING;

-- Lexus
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'RX', 'lexus-rx', 'rx' FROM vehicle_makes WHERE slug = 'lexus' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'GX', 'lexus-gx', 'gx' FROM vehicle_makes WHERE slug = 'lexus' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'IS', 'lexus-is', 'is' FROM vehicle_makes WHERE slug = 'lexus' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'LX', 'lexus-lx', 'lx' FROM vehicle_makes WHERE slug = 'lexus' ON CONFLICT DO NOTHING;

-- Acura
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'MDX',    'acura-mdx',    'mdx'    FROM vehicle_makes WHERE slug = 'acura' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'TLX',    'acura-tlx',    'tlx'    FROM vehicle_makes WHERE slug = 'acura' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'RDX',    'acura-rdx',    'rdx'    FROM vehicle_makes WHERE slug = 'acura' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Integra','acura-integra','integra' FROM vehicle_makes WHERE slug = 'acura' ON CONFLICT DO NOTHING;

-- Infiniti
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'QX60', 'infiniti-qx60', 'qx60' FROM vehicle_makes WHERE slug = 'infiniti' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Q50',  'infiniti-q50',  'q50'  FROM vehicle_makes WHERE slug = 'infiniti' ON CONFLICT DO NOTHING;

-- Audi
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Q5',    'audi-q5',    'q5'    FROM vehicle_makes WHERE slug = 'audi' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'A4',    'audi-a4',    'a4'    FROM vehicle_makes WHERE slug = 'audi' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Q7',    'audi-q7',    'q7'    FROM vehicle_makes WHERE slug = 'audi' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'e-tron','audi-e-tron','etron'  FROM vehicle_makes WHERE slug = 'audi' ON CONFLICT DO NOTHING;

-- Volkswagen
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Tiguan','volkswagen-tiguan','tiguan' FROM vehicle_makes WHERE slug = 'volkswagen' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'GTI',   'volkswagen-gti',   'gti'   FROM vehicle_makes WHERE slug = 'volkswagen' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Jetta', 'volkswagen-jetta', 'jetta' FROM vehicle_makes WHERE slug = 'volkswagen' ON CONFLICT DO NOTHING;

-- ============================================================
-- SEED: VEHICLE ALIASES
-- All seed aliases have is_manual = true and are never modified
-- by the sync pipeline.
--
-- alias            = human-readable display form
-- normalized_alias = stripped lowercase lookup key (must equal
--                    normalizeQuery(alias) from src/features/vehicles/utils.ts)
-- ============================================================

-- Honda CR-V
-- Note: "cr-v", "crv", "CR-V" all normalize → "crv" and already hit
-- vehicle_models.normalized_name. Aliases cover make+model compound terms.
INSERT INTO vehicle_aliases (vehicle_model_id, alias, normalized_alias, is_manual)
SELECT id, 'Honda CRV',        'hondacrv',       true FROM vehicle_models WHERE slug = 'honda-cr-v' ON CONFLICT (normalized_alias) DO NOTHING;
INSERT INTO vehicle_aliases (vehicle_model_id, alias, normalized_alias, is_manual)
SELECT id, 'Honda CRV Hybrid', 'hondacrvhybrid', true FROM vehicle_models WHERE slug = 'honda-cr-v' ON CONFLICT (normalized_alias) DO NOTHING;

-- Toyota RAV4
INSERT INTO vehicle_aliases (vehicle_model_id, alias, normalized_alias, is_manual)
SELECT id, 'Toyota RAV4', 'toyotarav4', true FROM vehicle_models WHERE slug = 'toyota-rav4' ON CONFLICT (normalized_alias) DO NOTHING;

-- Toyota 4Runner
INSERT INTO vehicle_aliases (vehicle_model_id, alias, normalized_alias, is_manual)
SELECT id, 'Toyota 4Runner', 'toyota4runner', true FROM vehicle_models WHERE slug = 'toyota-4runner' ON CONFLICT (normalized_alias) DO NOTHING;

-- Ford F-150 ("f150" and "f-150" both normalize → "f150" → hit normalized_name)
INSERT INTO vehicle_aliases (vehicle_model_id, alias, normalized_alias, is_manual)
SELECT id, 'Ford F-150',   'fordf150', true FROM vehicle_models WHERE slug = 'ford-f-150' ON CONFLICT (normalized_alias) DO NOTHING;
INSERT INTO vehicle_aliases (vehicle_model_id, alias, normalized_alias, is_manual)
SELECT id, 'F-150 4x4',    'f1504x4',  true FROM vehicle_models WHERE slug = 'ford-f-150' ON CONFLICT (normalized_alias) DO NOTHING;

-- Tesla Model 3
INSERT INTO vehicle_aliases (vehicle_model_id, alias, normalized_alias, is_manual)
SELECT id, 'Tesla Model 3', 'teslamodel3', true FROM vehicle_models WHERE slug = 'tesla-model-3' ON CONFLICT (normalized_alias) DO NOTHING;

-- Tesla Model Y
INSERT INTO vehicle_aliases (vehicle_model_id, alias, normalized_alias, is_manual)
SELECT id, 'Tesla Model Y', 'teslamodely', true FROM vehicle_models WHERE slug = 'tesla-model-y' ON CONFLICT (normalized_alias) DO NOTHING;

-- BMW 3 Series ("3series" hits normalized_name; aliases cover "bmw3" and "bmw3series")
INSERT INTO vehicle_aliases (vehicle_model_id, alias, normalized_alias, is_manual)
SELECT id, 'BMW 3',        'bmw3',       true FROM vehicle_models WHERE slug = 'bmw-3-series' ON CONFLICT (normalized_alias) DO NOTHING;
INSERT INTO vehicle_aliases (vehicle_model_id, alias, normalized_alias, is_manual)
SELECT id, 'BMW 3 Series', 'bmw3series', true FROM vehicle_models WHERE slug = 'bmw-3-series' ON CONFLICT (normalized_alias) DO NOTHING;

-- BMW 5 Series
INSERT INTO vehicle_aliases (vehicle_model_id, alias, normalized_alias, is_manual)
SELECT id, 'BMW 5 Series', 'bmw5series', true FROM vehicle_models WHERE slug = 'bmw-5-series' ON CONFLICT (normalized_alias) DO NOTHING;

-- Jeep Grand Cherokee
INSERT INTO vehicle_aliases (vehicle_model_id, alias, normalized_alias, is_manual)
SELECT id, 'Jeep Grand Cherokee', 'jeepgrandcherokee', true FROM vehicle_models WHERE slug = 'jeep-grand-cherokee' ON CONFLICT (normalized_alias) DO NOTHING;
INSERT INTO vehicle_aliases (vehicle_model_id, alias, normalized_alias, is_manual)
SELECT id, 'JGC',                  'jgc',               true FROM vehicle_models WHERE slug = 'jeep-grand-cherokee' ON CONFLICT (normalized_alias) DO NOTHING;

-- Hyundai Santa Fe
INSERT INTO vehicle_aliases (vehicle_model_id, alias, normalized_alias, is_manual)
SELECT id, 'Hyundai Santa Fe', 'hyundaisantafe', true FROM vehicle_models WHERE slug = 'hyundai-santa-fe' ON CONFLICT (normalized_alias) DO NOTHING;

-- Kia Telluride
INSERT INTO vehicle_aliases (vehicle_model_id, alias, normalized_alias, is_manual)
SELECT id, 'Kia Telluride', 'kiatelluride', true FROM vehicle_models WHERE slug = 'kia-telluride' ON CONFLICT (normalized_alias) DO NOTHING;

-- Ram 1500
INSERT INTO vehicle_aliases (vehicle_model_id, alias, normalized_alias, is_manual)
SELECT id, 'Ram 1500',  'ram1500',  true FROM vehicle_models WHERE slug = 'ram-1500' ON CONFLICT (normalized_alias) DO NOTHING;
INSERT INTO vehicle_aliases (vehicle_model_id, alias, normalized_alias, is_manual)
SELECT id, 'Ram Truck', 'ramtruck', true FROM vehicle_models WHERE slug = 'ram-1500' ON CONFLICT (normalized_alias) DO NOTHING;

-- Mazda CX-5 ("cx5" and "cx-5" normalize → "cx5" → hit normalized_name)
INSERT INTO vehicle_aliases (vehicle_model_id, alias, normalized_alias, is_manual)
SELECT id, 'Mazda CX-5', 'mazdacx5', true FROM vehicle_models WHERE slug = 'mazda-cx-5' ON CONFLICT (normalized_alias) DO NOTHING;

-- Subaru WRX
INSERT INTO vehicle_aliases (vehicle_model_id, alias, normalized_alias, is_manual)
SELECT id, 'Subaru WRX', 'subaruwrx', true FROM vehicle_models WHERE slug = 'subaru-wrx' ON CONFLICT (normalized_alias) DO NOTHING;

-- Hyundai Ioniq 5
INSERT INTO vehicle_aliases (vehicle_model_id, alias, normalized_alias, is_manual)
SELECT id, 'Hyundai Ioniq', 'hyundaiioniq', true FROM vehicle_models WHERE slug = 'hyundai-ioniq-5' ON CONFLICT (normalized_alias) DO NOTHING;

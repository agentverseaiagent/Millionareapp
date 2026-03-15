-- Phase 1: vehicle_trims table
CREATE TABLE IF NOT EXISTS vehicle_trims (
  id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  model_id         UUID        NOT NULL REFERENCES vehicle_models(id) ON DELETE CASCADE,
  name             TEXT        NOT NULL,
  normalized_name  TEXT        NOT NULL,
  source           TEXT        NOT NULL DEFAULT 'manual',
  is_active        BOOLEAN     NOT NULL DEFAULT true,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(model_id, name)
);

ALTER TABLE vehicle_trims ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Vehicle trims are public"
  ON vehicle_trims FOR SELECT USING (true);

CREATE INDEX IF NOT EXISTS idx_vehicle_trims_model_id
  ON vehicle_trims(model_id);

CREATE INDEX IF NOT EXISTS idx_vehicle_trims_normalized_name
  ON vehicle_trims(normalized_name);

-- Phase 2: Extend posts with make / trim / year attachment columns
ALTER TABLE posts
  ADD COLUMN IF NOT EXISTS vehicle_make_id UUID
    REFERENCES vehicle_makes(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS vehicle_trim_id UUID
    REFERENCES vehicle_trims(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS vehicle_year SMALLINT
    CHECK (vehicle_year BETWEEN 1900 AND 2030);

CREATE INDEX IF NOT EXISTS idx_posts_vehicle_make_id ON posts(vehicle_make_id);
CREATE INDEX IF NOT EXISTS idx_posts_vehicle_trim_id ON posts(vehicle_trim_id);

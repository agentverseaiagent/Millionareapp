-- Support multiple categories and multiple vehicle attachments per post.
--
-- Strategy:
--   - Add categories TEXT[] (replaces single category TEXT)
--   - Add vehicle_attachments JSONB[] (replaces single make/model/trim/year FKs)
--   - Keep old FK columns intact so existing feed queries continue to work;
--     they are populated from the first vehicle in vehicle_attachments.
--   - Backfill both new columns from existing data.

-- ── New columns ─────────────────────────────────────────────────────────────

ALTER TABLE posts
  ADD COLUMN IF NOT EXISTS categories TEXT[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS vehicle_attachments JSONB NOT NULL DEFAULT '[]';

-- ── Backfill categories ──────────────────────────────────────────────────────

UPDATE posts
SET categories = ARRAY[category]
WHERE category IS NOT NULL AND category != '';

-- ── Backfill vehicle_attachments ─────────────────────────────────────────────
-- Embeds display names by joining makes/models so PostCard can render without
-- extra queries even for old posts.

UPDATE posts
SET vehicle_attachments = (
  SELECT jsonb_build_array(
    jsonb_strip_nulls(jsonb_build_object(
      'make_id',    vehicle_make_id::text,
      'make_name',  (SELECT name FROM vehicle_makes  WHERE id = vehicle_make_id),
      'model_id',   vehicle_model_id::text,
      'model_name', (SELECT name FROM vehicle_models WHERE id = vehicle_model_id),
      'model_slug', (SELECT slug FROM vehicle_models WHERE id = vehicle_model_id),
      'trim_id',    vehicle_trim_id::text,
      'trim_name',  (SELECT name FROM vehicle_trims  WHERE id = vehicle_trim_id),
      'year',       vehicle_year
    ))
  )
)
WHERE vehicle_make_id IS NOT NULL OR vehicle_model_id IS NOT NULL;

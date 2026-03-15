-- Add 'general' as a valid category and make it the default
ALTER TABLE posts
  DROP CONSTRAINT IF EXISTS posts_category_check;

ALTER TABLE posts
  ADD CONSTRAINT posts_category_check
  CHECK (category IN ('general','price_paid','lease_finance','issue','maintenance','review','question'));

ALTER TABLE posts
  ALTER COLUMN category SET DEFAULT 'general';

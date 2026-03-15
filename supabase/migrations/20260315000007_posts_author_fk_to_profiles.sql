-- Re-target posts.author_id FK from auth.users → profiles
-- so that PostgREST can auto-join author:profiles(id, username).
--
-- profiles.id already references auth.users(id) ON DELETE CASCADE,
-- so referential integrity is preserved end-to-end.

ALTER TABLE posts
  DROP CONSTRAINT IF EXISTS posts_author_id_fkey;

ALTER TABLE posts
  ADD CONSTRAINT posts_author_id_fkey
  FOREIGN KEY (author_id) REFERENCES profiles(id) ON DELETE CASCADE;

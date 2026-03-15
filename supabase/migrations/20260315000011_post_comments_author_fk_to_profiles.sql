-- Re-target post_comments.author_id FK from auth.users → profiles
-- so that PostgREST can auto-join author:profiles(username) on comments,
-- matching the same pattern already applied to posts.author_id in migration 000007.
--
-- Safe because profiles.id REFERENCES auth.users(id) ON DELETE CASCADE,
-- meaning every UUID stored in post_comments.author_id already exists in profiles.id.

ALTER TABLE post_comments
  DROP CONSTRAINT IF EXISTS post_comments_author_id_fkey;

ALTER TABLE post_comments
  ADD CONSTRAINT post_comments_author_id_fkey
  FOREIGN KEY (author_id) REFERENCES profiles(id) ON DELETE CASCADE;

-- Post comments
-- Run in: Supabase Dashboard → SQL Editor

CREATE TABLE IF NOT EXISTS post_comments (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id    UUID        NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  author_id  UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  body       TEXT        NOT NULL CHECK (char_length(body) >= 1 AND char_length(body) <= 500),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_post_comments_post_id ON post_comments(post_id);

ALTER TABLE post_comments ENABLE ROW LEVEL SECURITY;

-- Anyone authenticated can read comments
CREATE POLICY "comments_select"
  ON post_comments FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated users can insert their own comments
CREATE POLICY "comments_insert"
  ON post_comments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

-- Authors can delete their own comments
CREATE POLICY "comments_delete"
  ON post_comments FOR DELETE
  TO authenticated
  USING (auth.uid() = author_id);

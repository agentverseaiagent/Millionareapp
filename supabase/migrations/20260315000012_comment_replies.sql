-- Add parent_comment_id to support one-level nested replies on post comments.
-- NULL = top-level comment on a post
-- Non-null = reply to a comment (UI enforces max one level deep)
--
-- ON DELETE CASCADE: if a parent comment is deleted, its replies are also deleted.

ALTER TABLE post_comments
  ADD COLUMN IF NOT EXISTS parent_comment_id UUID
    REFERENCES post_comments(id) ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS idx_post_comments_parent_id
  ON post_comments(parent_comment_id)
  WHERE parent_comment_id IS NOT NULL;

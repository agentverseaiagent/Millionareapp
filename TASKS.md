# Roadmap

Ordered list of upcoming work. Update this file as tasks are completed or priorities change.

## Completed

- [x] App shell and route structure
- [x] Environment and Supabase foundation
- [x] Authentication foundation (sign up, sign in, sign out, session persistence, protected routing)
- [x] Auth stability fixes (loading state, flicker prevention, deep link handler)
- [x] Email verification deep link flow
- [x] Vehicle data foundation (schema, types, utils, alias normalization, api)
- [x] Vehicle search and autocomplete
- [x] Post creation flow (with vehicle selection and category)
- [x] Global feed
- [x] Model-specific feed
- [x] Follow/unfollow vehicle model
- [x] Profile screen (followed models, sign out)

## Next

1. [ ] Run Supabase migration (see supabase/migrations/20260315000001_initial_schema.sql)
2. [ ] Import more vehicle makes and models (bulk import)
3. [ ] Show author username instead of truncated user ID in posts
4. [ ] Allow users to set a username (profile edit)
5. [ ] Pagination for feeds (load more)
6. [ ] Post detail screen (app/post/[id].tsx)
7. [ ] Notifications tab (likes, replies — not scoped yet)
8. [ ] Verified email check before posting

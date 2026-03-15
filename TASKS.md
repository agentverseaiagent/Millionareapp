# Roadmap

Ordered list of upcoming work. Update this file as tasks are completed or priorities change.

## Completed

- [x] App shell and route structure
- [x] Supabase environment foundation and auth
- [x] Auth stability (loading state, flicker prevention, deep link email confirmation)
- [x] Vehicle data foundation (schema, types, utils, alias normalization, API, hooks)
- [x] Vehicle search and autocomplete
- [x] Post creation flow (body, vehicle selection, category chips)
- [x] Global feed with pull-to-refresh
- [x] Following feed with toggle
- [x] Model-specific community feed
- [x] Follow/unfollow vehicle model
- [x] Profile screen (followed models, sign out)
- [x] Post detail screen with reply thread
- [x] Vehicle catalog migration (NHTSA/vPIC sourced, consolidated migrations)
- [x] Delete own post with confirmation
- [x] Pull-to-refresh layout and gesture fix
- [x] Search keyboard UX fix
- [x] Auth screens branding and subtitle
- [x] Feed loading state separation (isRefreshing vs initial load)
- [x] Shared utilities (relativeTime, CATEGORY_STYLE, CATEGORY_ACCENT centralized)
- [x] Discontinued model display (search results, model page header, informational banner)
- [x] Search surfaces discontinued models for model-specific queries
- [x] createPost API null category fix (defaults to 'general' at API layer)
- [x] Model-page posting flow passes pre-selected model to create screen
- [x] Reply error handling (inline error message instead of silent failure)
- [x] category 'general' added to all styling surfaces

---

## Active Workstreams

### 1. Rework app shell, navigation, and feed UX
- [ ] Audit all back/cancel navigation paths for correctness
- [ ] Fix follow/unfollow state not updating immediately in profile and following feed
- [ ] Review feed header identity and rhythm
- [ ] Show author username in posts (requires profile username feature)
- [ ] Pagination for feeds (load more as user scrolls)

### 2. Rework search and vehicle-catalog discovery
- [ ] Audit alias table for coverage gaps (common nicknames not resolving)
- [ ] Support make-level discovery in search (return make page, not just models)
- [ ] Validate discontinued model coverage in catalog
- [ ] Add make alias support (e.g., "chevy" → Chevrolet)

### 3. Vehicle attachment — make / model / trim / year
This is the next major feature.
- [ ] Schema migration: add `vehicle_make_id`, `vehicle_trim_id`, `vehicle_year` to posts
- [ ] Add `vehicle_trims` table
- [ ] Update TypeScript types for new post shape
- [ ] Update post creation UI: cascading make → model → trim → year picker
- [ ] Update search and API to support make-level queries returning a make page
- [ ] Source trim data (EPA fueleconomy.gov API preferred for U.S. trims)
- [ ] Update feed/post display to show make-only or trim/year-qualified vehicle attachment

### 4. User profile and identity
- [ ] Allow users to set a display username
- [ ] Show username in posts instead of user ID
- [ ] Profile editing screen

### 5. Polish and quality (ongoing)
- [ ] Notifications tab design (likes, replies — scope TBD)
- [ ] Verify email confirmation before first post
- [ ] Web layout review

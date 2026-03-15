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
- [x] Pull-to-refresh layout fix (FlatList as primary scroll container)
- [x] Search keyboard UX fix
- [x] Auth screens subtitle and branding
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
The current product has a scaffold feel. Navigation needs to feel intentional.
- [ ] Review all back/cancel navigation paths for correctness
- [ ] Improve feed header and tab identity
- [ ] Show author username in posts (requires profile username feature)
- [ ] Pagination for feeds (load more as user scrolls)

### 2. Rework search and vehicle-catalog discovery
Search must feel natural for all query patterns.
- [ ] Audit alias table for coverage gaps (common nicknames not resolving)
- [ ] Improve make alias support (e.g., "chevy" → Chevrolet)
- [ ] Validate discontinued model coverage in catalog

### 3. Verify and maintain the vehicle catalog pipeline
- [ ] Audit active/inactive model distribution in database
- [ ] Define process for adding missing models
- [ ] Trim/variant support deferred — document scope for when it arrives

### 4. User profile and identity
- [ ] Allow users to set a display username
- [ ] Show username in posts instead of user ID
- [ ] Profile editing screen

### 5. Improve reply and create-post flows
- [ ] Verify create-post pre-selection works correctly from vehicle pages
- [ ] Post character count visibility on post detail screen

### 6. Polish and quality pass (ongoing)
- [ ] Notifications tab design (likes, replies — scope TBD)
- [ ] Verify email confirmation before first post
- [ ] Web layout review

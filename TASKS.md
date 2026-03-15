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
- [x] Vehicle attachment schema: vehicle_trims table, vehicle_make_id / vehicle_trim_id / vehicle_year on posts
- [x] Vehicle attachment types: VehicleTrim, make_id + is_make_result on VehicleSearchResult, full Post shape
- [x] Posts API: fetches and persists make / trim / year fields
- [x] Search: prepends make-level result when query matches a make exactly
- [x] Create screen: cascading vehicle picker (make-only or model), trim chips, year input
- [x] Post display: vehicle label shows make · model · trim · year

---

## Active Workstreams

Work must proceed in this order. Core product feel must be correct before feature expansion.

### 1. App shell, navigation, and feed UX
- [ ] Audit all back/cancel navigation paths for correctness
- [ ] Fix follow/unfollow state not updating immediately in profile and following feed
- [ ] Review feed header identity and rhythm
- [ ] Show author username in posts (requires profile username feature)
- [ ] Pagination for feeds (load more as user scrolls)

### 2. Search and vehicle-catalog discovery
- [ ] Add make alias support (e.g. "chevy" → Chevrolet)
- [ ] Audit alias table for coverage gaps
- [ ] Dedicated make-level browse/community page (currently only a search result, not a real page)
- [ ] Validate discontinued model coverage in catalog

### 3. Vehicle attachment — remaining work
- [ ] Seed trim data (source to be determined — EPA fueleconomy.gov is a candidate)
- [ ] Make-level community page with posts filtered by make

### 4. User profile and identity
- [ ] Allow users to set a display username
- [ ] Show username in posts instead of user ID
- [ ] Profile editing screen

### 5. Polish and quality (ongoing)
- [ ] Notifications tab design (likes, replies — scope TBD)
- [ ] Verify email confirmation before first post
- [ ] Web layout review

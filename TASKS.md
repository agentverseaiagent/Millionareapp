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
- [x] Make-level follows (follow Honda without picking a model)
- [x] Discontinued model visibility (migration + query tiers + UI labels)
- [x] Follow/unfollow immediate refresh in profile and following feed (useFocusEffect)
- [x] Username: set/edit @username in profile; @username shown in PostCard
- [x] Pagination: useGlobalFeed + useFollowingFeed support loadMore/hasMore (PAGE_SIZE=20)
- [x] Home feed: infinite scroll via onEndReached
- [x] Create post: step-by-step vehicle selection (make → model → trim → year, stop at any level)
- [x] Search: Cancel button in header when query active; tapping make navigates to /make/[slug]
- [x] Make page (/make/[slug]): feed of all posts for that make, Follow button, post prompt
- [x] Profile: My Posts tab + Following tab; username edit inline
- [x] Notifications: proper coming-soon placeholder
- [x] posts.author_id FK re-targeted to profiles for PostgREST join

---

## Active Workstreams

### 1. Auth and email
- [ ] Wire up Resend as SMTP provider in Supabase (confirmation + magic-link emails)
- [ ] Test email confirmation flow end-to-end (sign up → confirm → first post)

### 2. Catalog and search
- [ ] Add make alias support (e.g. "chevy" → Chevrolet, "vw" → Volkswagen)
- [ ] Audit alias table for coverage gaps
- [ ] Seed trim data (EPA fueleconomy.gov candidate)

### 3. Community and feeds
- [ ] Notifications tab: likes and reply alerts (scope TBD)

### 4. Polish
- [ ] Web layout review — audit key screens for broken layout on wider viewports

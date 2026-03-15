# Work Log

Reverse-chronological log of completed stable work units.

---

## 2026-03-15 (session 8 — make page, create/profile rework, UX polish)

- Make page: added `app/make/[slug].tsx` — feed filtered by `vehicle_make_id`, Follow/Unfollow, post prompt
- Make feed API: `getMakeFeed(makeId)` in posts/api.ts — queries `vehicle_make_id` (catches both make-only and model posts since model posts store make_id too)
- Make lookup: `getVehicleMakeBySlug(slug)` in vehicles/api.ts
- `useMakeFeed` hook in posts/hooks.ts
- Search: `handleSelect` now navigates to `/make/[slug]` for make results (previously just scoped search)
- Create post rework: step-by-step flow — initial search → make selected + "Add model" prompt → model + trim chips + year; "Change" and "Cancel" at each level; bottom submit button; category above vehicle
- Profile rework: tab switcher (My Posts | Following); My Posts calls `getPostsByAuthor`; identity row merged with username edit pencil
- `getPostsByAuthor` added to posts/api.ts
- Migration 000007 applied: `posts.author_id` FK re-targeted to `profiles.id` enabling PostgREST `author:profiles(id, username)` join
- Post type: added `author?: { id, username }` field
- POST_SELECT: includes `author:profiles!author_id(id, username)`
- PostCard: shows `@username` above post body when set
- Feed hooks: pagination added (`loadMore`, `hasMore`, `loadingMore`, `offsetRef`) with PAGE_SIZE=20
- Home feed: `onEndReached` + footer spinner for infinite scroll
- auth/api: added `getUserProfile()` and `updateUsername()`
- Profile: username editing inline (edit pencil → text input → Save/✕)
- Search: Cancel header button via `navigation.setOptions` when query is active
- Notifications: replaced bare `<Text>` with proper coming-soon screen (icon + title + body)
- All changes committed and pushed across two commits

---

## 2026-03-15 (session 6 — vehicle attachment implementation)

- Schema migration applied: `vehicle_trims` table created with RLS; `vehicle_make_id`, `vehicle_trim_id`, `vehicle_year` added to posts
- Updated `src/features/vehicles/types.ts`: added `VehicleTrim` interface, added `make_id` and `is_make_result` to `VehicleSearchResult`
- Updated `src/features/posts/types.ts`: added `vehicle_make_id`, `vehicle_trim_id`, `vehicle_year` to `Post`; added same to `CreatePostInput`
- Updated `src/features/vehicles/api.ts`: include make id in all model queries, prepend make-level result in search when query matches a make, added `getTrimsForModel()`
- Updated `src/features/posts/api.ts`: expanded `POST_SELECT` with make/trim/year joins, `createPost` now persists all four attachment fields
- Rewrote `app/(tabs)/create.tsx`: cascading vehicle picker — search returns make-level and model-level results, selecting a model loads trim chips, year is an optional text input, all fields passed to API
- Updated `src/components/PostCard.tsx`: vehicle label now composes make · model · trim · year; make-only posts show non-tappable tag
- Updated `app/post/[id].tsx`: same vehicle label logic as PostCard
- Updated `app/vehicle/[slug].tsx`: passes `preMakeId` when navigating to create screen
- Updated all five context files

Supabase access token stored in memory — migrations can now be pushed without manual steps.

---

## 2026-03-15 (session 5 — product direction update)

- Updated CLAUDE.md: added vehicle attachment hierarchy (make/model/trim/year), clarified navigation UX rules, removed temporary notes
- Updated PROJECT_CONTEXT.md: added vehicle attachment direction, noted model-only posting is being reconsidered, added known product issues
- Updated DECISIONS.md: added vehicle attachment decisions (make-only allowed, trim/year are metadata not communities), trim data source direction, planned schema shape
- Updated TASKS.md: added vehicle attachment workstream as next major feature
- Updated WORKLOG.md

Known issues at time of this session (not yet fixed):
- Follow/unfollow state does not update immediately in profile/following views
- Back navigation behavior needs audit in several flows
- Search did not return a make-level result for pure make queries
- Vehicle attachment structure being redesigned from model-only to make/model/trim/year

---

## 2026-03-15 (session 4 — cleanup pass)

- Created `src/utils/postUtils.ts` — centralized `relativeTime`, `CATEGORY_STYLE`, `CATEGORY_ACCENT`
- Removed duplicate `relativeTime` and `CATEGORY_STYLE` from `PostCard.tsx` and `post/[id].tsx`
- Fixed `CATEGORY_ACCENT` missing `'general'` key in create screen
- Fixed `createPost` API: `category ?? null` → `category ?? 'general'` at API layer
- Fixed pre-existing Supabase join cast TypeScript errors in `posts/api.ts`
- Fixed double `unfollowModel` call in `vehicle/[slug].tsx`
- Added `is_active` to `VehicleModel` type, `is_discontinued` to `VehicleSearchResult`
- Search now surfaces discontinued models (alias, make, and model-name tiers)
- Removed duplicate `.eq('is_active', true)` in vehicles API make query
- `VehicleModelItem` and `create.tsx` model results show inline "Discontinued" label
- `vehicle/[slug].tsx` shows "(Discontinued)" in header and an informational banner
- Post prompt on vehicle page now passes model context to create screen
- `create.tsx` pre-populates selected model from route params
- Reply failures show inline error message (tappable to retry)
- Updated all five context files

---

## 2026-03-15 (session 3 — UX pass)

- Fixed pull-to-refresh dead zone: added `flexGrow: 1` to FlatList content container
- Replaced root `TouchableOpacity` in PostCard with `Pressable`
- Added `isRefreshing` state separate from initial load state
- Added "Swipe down to refresh" hint row below feed toggle tabs
- Added `alwaysBounceVertical` and `overScrollMode="always"` to feed FlatList
- Fixed reply composer: safe area insets, disabled button color, general category badge

---

## 2026-03-15 (session 2)

- Fixed auth loading state and deep link handler
- Created Supabase migration for all schema tables with RLS policies
- Built vehicle foundation: types, utils, API, hooks
- Built posts foundation: types, API, hooks
- Built shared components: PostCard, VehicleModelItem
- Built search screen, create post screen, global feed, model feed, profile screen
- Discovered email rate limit friction during testing
- Discovered search/discovery issues (make queries, discontinued visibility)
- Discovered weak navigation and scaffold feel — rework/polish phase initiated

---

## 2026-03-15 (session 1)

- Initialized project: Expo Router scaffold, route structure, src folder layout
- Auth foundation: Supabase client, session persistence, protected routing, sign-in/sign-up screens
- Branding applied: Garagetwits name, auth screen copy
- Created context system: PROJECT_CONTEXT.md, DECISIONS.md, TASKS.md, WORKLOG.md

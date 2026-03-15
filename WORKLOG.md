# Work Log

Reverse-chronological log of completed stable work units.

---

## 2026-03-15 (session 4 — cleanup pass)

- Created `src/utils/postUtils.ts` — centralized `relativeTime`, `CATEGORY_STYLE`, `CATEGORY_ACCENT`
- Removed duplicate `relativeTime` and `CATEGORY_STYLE` from `PostCard.tsx` and `post/[id].tsx`
- Fixed `CATEGORY_ACCENT` missing `'general'` key in create screen
- Fixed `createPost` API: `category ?? null` → `category ?? 'general'` at API layer
- Fixed pre-existing Supabase join cast TypeScript errors in `posts/api.ts`
- Fixed double `unfollowModel` call in `vehicle/[slug].tsx`
- Added `is_active` to `VehicleModel` type, `is_discontinued` to `VehicleSearchResult`
- Search now surfaces discontinued models: alias matches include discontinued, make queries append discontinued after active, model-name queries include a discontinued tier
- Removed duplicate `.eq('is_active', true)` in vehicles API make query
- `VehicleModelItem` shows inline "Discontinued" label in search results
- `create.tsx` model search results show "Discontinued" label inline
- `vehicle/[slug].tsx` header title appends "(Discontinued)" for inactive models
- `vehicle/[slug].tsx` shows informational banner for discontinued model pages
- `vehicle/[slug].tsx` post prompt now passes model context params to create screen
- `create.tsx` reads `preModelId/Name/Slug/MakeName` params and pre-populates selected model
- Reply failures now show inline error message (tappable to retry) in post detail screen
- Updated CLAUDE.md, PROJECT_CONTEXT.md, DECISIONS.md, TASKS.md, WORKLOG.md

---

## 2026-03-15 (session 3 — UX pass)

- Fixed pull-to-refresh dead zone: added `flexGrow: 1` to `listContent` style
- Replaced root `TouchableOpacity` in PostCard with `Pressable` (better scroll gesture cooperation)
- Added `isRefreshing` state separate from initial load state — RefreshControl no longer shows on mount
- Added "Swipe down to refresh" hint row below the feed toggle tabs
- Added `alwaysBounceVertical` and `overScrollMode="always"` to feed FlatList
- Fixed reply composer: safe area insets, disabled button color, general category badge
- Fixed `replyBtnDisabled` color from dark `#2A2A2A` to light `#CCCCCC`

---

## 2026-03-15 (session 2)

- Fixed auth: added loading state to root layout to prevent redirect flicker
- Added deep link handler in root layout for email confirmation token exchange
- Created Supabase migration: profiles, vehicle_makes, vehicle_models, vehicle_aliases, posts, user_model_follows — with RLS policies, indexes
- Built vehicle foundation: types, utils, API, hooks
- Built posts foundation: types (PostCategory), API, hooks
- Built shared components: PostCard, VehicleModelItem
- Built search screen with alias-tolerant vehicle model search
- Built create post screen: body input, vehicle model picker, category chips
- Built global feed (Home tab): FlatList with pull-to-refresh
- Built model feed (vehicle/[slug]): model header, follow button, feed, post prompt
- Built profile screen: email display, sign out, followed models list
- Updated tabs layout with Ionicons tab bar icons
- Discovered email rate limit friction during testing
- Discovered search/discovery issues (make queries, prefix matching, discontinued visibility)
- Discovered product feel was too generic — rework/polish phase initiated

---

## 2026-03-15 (session 1)

- Updated CLAUDE.md with project goal, product purpose, core constraints, and UX direction
- Fixed Expo Go compatibility by downgrading from SDK 55 to SDK 54
- Built authentication foundation: Supabase auth module, session persistence, protected routing
- Created Supabase environment foundation
- Created app shell: Expo Router scaffold, route structure, src folder layout
- Added Garagetwits branding to auth screens
- Created project context system: PROJECT_CONTEXT.md, DECISIONS.md, TASKS.md, WORKLOG.md
- Renamed app to Garagetwits in app.json

# Work Log

Reverse-chronological log of completed stable work units.

---

## 2026-03-15 (session 2)

- Fixed auth: added loading state to root layout to prevent redirect flicker
- Added deep link handler in root layout for email confirmation token exchange
- Updated `emailRedirectTo` to `garagetwits://` for reliable deep link opening
- Created Supabase migration: profiles, vehicle_makes, vehicle_models, vehicle_aliases, posts, user_model_follows — with RLS policies, indexes, seed data (20+ makes, 40+ models, aliases)
- Built vehicle foundation: types, utils (normalizeQuery), api (search, getBySlug, follow, unfollow, isFollowing, getFollowed), hooks (useVehicleSearch)
- Built posts foundation: types (PostCategory), api (getGlobalFeed, getModelFeed, createPost), hooks (useGlobalFeed, useModelFeed)
- Built shared components: PostCard, VehicleModelItem
- Built search screen: alias-tolerant vehicle model search with results list
- Built create post screen: body input, vehicle model picker (inline search), category chips
- Built global feed (Home tab): FlatList with pull-to-refresh, empty and error states
- Built model feed (vehicle/[slug]): model header, follow button, feed, post prompt
- Built profile screen: email display, sign out, followed models list
- Updated tabs layout with Ionicons tab bar icons
- Updated TASKS.md and WORKLOG.md

---

## 2026-03-15 (session 1)

- Updated CLAUDE.md with project goal, product purpose, core constraints, and UX direction
- Fixed Expo Go compatibility by downgrading from SDK 55 to SDK 54
- Built authentication foundation: Supabase auth module, session persistence, protected routing, sign-in and sign-up screens
- Created Supabase environment foundation: env validation, Supabase client, `.env` setup
- Created app shell: Expo Router scaffold, route structure, src folder layout
- Added Garagetwits branding to auth screens
- Created project context system: PROJECT_CONTEXT.md, DECISIONS.md, TASKS.md, WORKLOG.md
- Renamed app to Garagetwits in app.json

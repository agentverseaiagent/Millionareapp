# Locked Decisions

These decisions are final and should not be revisited without explicit instruction.

## Stack
- **Frontend:** Expo + React Native + Expo Router + TypeScript
- **Backend:** Supabase (auth, database, API)
- **Target platforms:** iOS, Android, web (all three must work)

## Vehicle Catalog
- The catalog is U.S.-focused
- NHTSA/vPIC is the preferred upstream base source for makes and models
- Supabase stores the canonical catalog (vehicle_makes, vehicle_models, vehicle_aliases)
- Aliases are app-controlled — they are not auto-generated from upstream data
- Active U.S.-relevant models are prioritized in all search results
- Discontinued models must not be deleted — they remain in the catalog with `is_active = false`
- Missing or discontinued upstream models should be marked inactive, not removed
- Trim and variant support is deferred to a future phase

## Data Model
- Vehicle communities are based on canonical `vehicle_model_id` records — not free text
- User-entered aliases ("crv", "cr-v", "honda crv") must be normalized to one canonical vehicle model
- Community fragmentation must be avoided — one model, one community

## Post Categories
- `general` is the default fallback post category
- A post must never be inserted with a null category — default at both UI and API layer
- Valid categories: general, price_paid, lease_finance, issue, maintenance, review, question

## User Actions
- Delete own post is an expected and supported action
- Edit post is lower priority — not currently implemented
- Reply to post is supported

## Architecture
- Route files must stay thin — compose screens and call hooks only
- All Supabase queries live in `src/features/**/api.ts`
- Shared types live in `src/features/**/types.ts`
- Reusable UI lives in `src/components`
- Shared utility functions (relativeTime, CATEGORY_STYLE, CATEGORY_ACCENT) live in `src/utils/`
- No duplicate logic across files

## Current Phase
Rework and polish of core product feel — not blind feature expansion.
New features should not be added until search, feed, and navigation feel correct.

## Quality
- Clean architecture, minimal redundancy
- Strong safety — no partial or broken commits
- Low-bug implementation — inspect existing patterns before editing
- One feature at a time, PR-sized changes

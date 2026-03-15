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
- Discontinued models must not be deleted — they remain with `is_active = false` and can be surfaced where relevant

## Vehicle Attachment on Posts
- A post may be attached at any level in the vehicle hierarchy, or not at all
- **Make-only attachment is allowed** — a post about "Honda in general" is valid
- **Model is optional** — a post can be attached to a make without specifying a model
- **Trim is optional** — a post can be attached to a model without specifying a trim
- **Year is optional** — a post can include a model year at any attachment level
- Hierarchy constraint: model requires make; trim requires model
- Trim and year are structured metadata layers — they do not automatically create separate top-level communities
- Clean hierarchy matters more than over-fragmentation

## Community Structure
- The canonical community is the vehicle model — one model, one community
- Make-level pages may exist for browsing and broad discussion, but the primary community anchor is the model
- Trims and years do not get their own separate community feeds — they are filter/annotation layers
- Community fragmentation must be avoided

## Data Model
- Vehicle communities are based on canonical `vehicle_model_id` records — not free text
- User-entered aliases ("crv", "cr-v", "honda crv") must be normalized to one canonical make or model
- Posts carry: `vehicle_make_id`, `vehicle_model_id` (nullable), `vehicle_trim_id` (nullable), `vehicle_year` (nullable SMALLINT)

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
- Shared utility functions live in `src/utils/`
- No duplicate logic across files

## Trims and Year Data
- Trims are stored in `vehicle_trims`, keyed to `vehicle_models` — schema is implemented
- Year is a SMALLINT on the post — no separate year table
- Trim data must come from a reliable, structured U.S. source — exact source is not locked

## Current Phase
Rework and polish of core product feel — not blind feature expansion.
New features should not be added until search, feed, and navigation feel correct.

## Quality
- Clean architecture, minimal redundancy
- Strong safety — no partial or broken commits
- Low-bug implementation — inspect existing patterns before editing
- One feature at a time, PR-sized changes

# Locked Decisions

These decisions are final and should not be revisited without explicit instruction.

## Stack
- **Frontend:** Expo + React Native + Expo Router + TypeScript
- **Backend:** Supabase (auth, database, API)
- **Target platforms:** iOS, Android, web (all three must work)

## Data Model
- Vehicle communities are based on canonical `vehicle_model_id` records — not free text
- User-entered aliases ("crv", "cr-v", "honda crv") must be normalized to one canonical vehicle model
- Community fragmentation must be avoided — one model, one community

## Architecture
- Route files must stay thin — compose screens and call hooks only
- All Supabase queries live in `src/features/**/api.ts`
- Shared types live in `src/features/**/types.ts`
- Reusable UI lives in `src/components`
- No duplicate vehicle model logic across files

## Quality
- Clean architecture, minimal redundancy
- Strong safety — no partial or broken commits
- Low-bug implementation — inspect existing patterns before editing
- One feature at a time, PR-sized changes

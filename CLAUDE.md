# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Git & GitHub

This project uses GitHub for version control. This is a strict requirement:
- Commit after every complete, stable, meaningful unit of work (new feature, bug fix, config change, etc.)
- Push immediately after each such commit — never leave work only local
- Write clean, descriptive commit messages that explain what changed and why
- Do not batch unrelated changes into one commit
- Do not commit partial, broken, or half-finished work unless explicitly instructed

Repository: https://github.com/agentverseaiagent/Millionareapp

## App Identity

- **Name:** Garagetwits
- **Focus:** U.S. car market
- **Inspiration:** Stocktwits, but for car owners — not a clone
- **Core concept:** Canonical vehicle model communities (one model, one community)

## Product Purpose

Garagetwits helps U.S. car shoppers and owners exchange model-specific intelligence.

Primary value:
- Price paid discussion
- Lease and finance discussion
- Ownership issues and maintenance experiences
- Buying advice and reviews

This is not a generic social network, marketplace, or dealer CRM.

## Vehicle Search and Discovery

Search must support all of these query types:
- Make discovery: `honda`, `bmw`, `toyota`
- Model discovery: `crv`, `rogue`, `cx5`
- Make + model queries: `honda crv`, `toyota rav4`
- Alias normalization: `cr-v`, `crv`, `CR-V` → same canonical model

Active U.S.-relevant models should be prioritized in results.

Discontinued models must not be deleted blindly. Owners of discontinued models are part of the community and their models should remain surfaceable in search and model pages where relevant.

## Core Product Constraints

- Vehicle communities must be based on canonical `vehicle_model_id` records — not free text
- User-entered aliases must normalize to one canonical vehicle model
- Community fragmentation must be avoided — one model, one community
- Keep route files thin — compose screens and call hooks only
- Keep Supabase access inside `src/features/**/api.ts` files
- Shared types go in `src/features/**/types.ts`
- Reusable UI goes in `src/components`
- Shared utility functions (e.g., relativeTime, CATEGORY_STYLE) go in `src/utils/`
- The app must work on iOS, Android, and web

## UX Direction

Fast, clean, low-friction, mobile-first, feed-first. Web-compatible but not web-optimized.

Priority UX traits:
- Low friction entry to all primary actions
- Clear navigation with reliable back behavior
- Obvious primary actions at every screen
- Useful, dense information without clutter
- No unnecessary complexity

Current development priority: product quality, clean architecture, low redundancy, strong safety, low-bug implementation.

## Context Files

Before implementing any feature, read these files:
- `CLAUDE.md` — workflow rules, architecture rules, UX direction
- `PROJECT_CONTEXT.md` — what the app is, who it's for, what it does
- `DECISIONS.md` — locked technical and product decisions
- `TASKS.md` — current ordered roadmap

After each completed stable unit of work:
- Update `TASKS.md` to reflect current priorities
- Update `WORKLOG.md` with a brief factual entry

## Project Rules

- Tech stack: Expo, React Native, Expo Router, TypeScript, Supabase
- Never change database schema unless explicitly asked
- Never mix route files with database logic
- Before editing, inspect existing patterns and extend them
- Prefer modifying existing modules over introducing new abstractions
- Never create duplicate logic across files — centralize in utils or feature modules
- For car models, always map user-entered tags to canonical `vehicle_model_id`
- After changes, list every file modified and why

## Environment

- Platform: Windows 11
- Shell: Git Bash (bash syntax, forward slashes)
- GitHub CLI (`gh`) is installed and authenticated as `agentverseaiagent`
- Git remote: `origin` → `https://github.com/agentverseaiagent/Millionareapp`

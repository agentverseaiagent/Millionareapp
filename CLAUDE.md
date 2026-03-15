# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Git & GitHub

This project uses GitHub for version control. This is a strict requirement:
- Commit after every complete, stable, meaningful unit of work
- Push immediately after each such commit — never leave work only local
- Write clean, descriptive commit messages that explain what changed and why
- Do not batch unrelated changes into one commit
- Do not commit partial, broken, or half-finished work unless explicitly instructed

Repository: https://github.com/agentverseaiagent/Millionareapp

## App Identity

- **Name:** Garagetwits
- **Focus:** U.S. car market
- **Inspiration:** Stocktwits-style feed rhythm applied to car ownership — not a clone
- **Core concept:** Model-centric communities with optional structured vehicle attachment

## Product Purpose

Garagetwits helps U.S. car shoppers and owners exchange vehicle-specific intelligence.

Primary value:
- Price paid and deal discussion
- Lease and finance discussion
- Ownership issues and maintenance experiences
- Buying advice and model-specific reviews

This is not a generic social network, marketplace, or dealer CRM.

## Vehicle Attachment

Posts support optional structured vehicle attachment in the following hierarchy:
- Make (e.g. Honda)
- Make + Model (e.g. Honda CR-V)
- Make + Model + Trim (e.g. Honda CR-V EX-L)
- Make + Model + Trim + Year (e.g. 2025 Honda CR-V EX-L)

Rules:
- Make can be attached without a model
- Model requires a make
- Trim requires a model
- Year can be added at any level but is most meaningful with trim
- Trim and year are structured metadata — they do not automatically create separate top-level communities

## Vehicle Search and Discovery

Search must support all of these:
- Make discovery: `honda`, `bmw`, `toyota`
- Model discovery: `crv`, `rogue`, `cx5`
- Make + model queries: `honda crv`, `toyota rav4`
- Alias normalization: `cr-v`, `crv`, `CR-V` → same canonical model

Active U.S.-relevant models are prioritized. Discontinued models must not be deleted blindly — owners of discontinued models are part of the community.

## Core Product Constraints

- Vehicle communities are anchored on canonical `vehicle_model_id` records — not free text
- User-entered aliases must normalize to one canonical vehicle model
- Community fragmentation must be avoided — one model, one community
- Trims and years are annotation layers — they do not splinter the community
- Keep route files thin — compose screens and call hooks only
- All Supabase queries must live in `src/features/**/api.ts`
- Shared types go in `src/features/**/types.ts`
- Reusable UI goes in `src/components`
- Shared utility functions go in `src/utils/`
- The app must work on iOS, Android, and web

## UX Direction

Fast, clean, low-friction, mobile-first, feed-first. Web-compatible but not web-optimized.

Priority UX traits:
- Navigation should be clear and predictable at every step
- Important user actions must feel immediate and reliable
- Back behavior must work correctly everywhere
- Low friction entry to all primary actions
- Obvious primary actions at every screen

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
- After changes, list every file modified and why

## Environment

- Platform: Windows 11
- Shell: Git Bash (bash syntax, forward slashes)
- GitHub CLI (`gh`) is installed and authenticated as `agentverseaiagent`
- Git remote: `origin` → `https://github.com/agentverseaiagent/Millionareapp`

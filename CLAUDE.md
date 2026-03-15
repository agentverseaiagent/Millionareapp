# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Git & GitHub

This project uses GitHub for version control. This is a strict requirement:
- Commit after every complete, stable, meaningful unit of work (new feature, bug fix, config change, etc.)
- Push immediately after each such commit to the current working branch so work is not left only local
- Write clean, descriptive commit messages that explain what changed and why
- Do not batch unrelated changes into one commit
- Do not commit partial, broken, or half-finished work unless explicitly instructed
- This ensures the project can always be reverted to a known good state

Repository: https://github.com/agentverseaiagent/Millionareapp

## Project Goal

This project is a universal Expo app for iOS, Android, and web.

The app name is **Garagetwits**.

Garagetwits is a Stocktwits-inspired car community app, but centered on canonical vehicle model communities instead of stock symbols.

Users should be able to:
- Search for a car model
- Enter that model's community feed
- Read useful short posts
- Create posts tied to a canonical vehicle model
- Follow vehicle models

## Product Purpose

Garagetwits helps car shoppers and owners exchange model-specific intelligence in one place.

Primary value:
- Price paid discussion
- Lease and finance discussion
- Ownership issues
- Maintenance experiences
- Buying advice

This is not a generic social network.
This is not a marketplace.
This is not a dealer CRM.

## Core Product Constraints

- Vehicle communities must be based on canonical `vehicle_model_id` records
- User-entered aliases like "crv", "cr-v", and "honda crv" must map to one canonical vehicle model
- Avoid fragmentation of communities
- Keep route files thin
- Keep Supabase access inside feature modules
- Keep the app compatible with iOS, Android, and web

## UX Direction

The app should feel fast, clean, simple, nice-looking, and user-friendly.
It should be feed-first and mobile-first, while remaining web-compatible.

Priority UX traits:
- Low friction
- Clear navigation
- Minimal clutter
- Obvious primary actions
- Useful dense information
- No unnecessary complexity
- Clean architecture
- Minimal redundancy
- Strong safety
- Low-bug implementation

## Context Files

Before implementing any feature, read these files:
- `CLAUDE.md` — workflow rules, architecture rules, UX direction
- `PROJECT_CONTEXT.md` — what the app is, who it's for, what it does
- `DECISIONS.md` — locked technical and product decisions
- `TASKS.md` — current ordered roadmap

After each completed stable unit of work:
- Update `TASKS.md` to mark completed items or adjust priorities
- Update `WORKLOG.md` with a brief entry describing what was done

## Project Rules

- Tech stack: Expo, React Native, Expo Router, TypeScript, Supabase.
- This app must work on iOS, Android, and web.
- Never change database schema unless explicitly asked.
- Never mix route files with database logic.
- Route files should only compose screens and call feature hooks.
- All Supabase queries must live in `src/features/**/api.ts` files.
- Shared types go in `src/features/**/types.ts`.
- Reusable UI goes in `src/components`.
- Never create duplicate vehicle model logic in multiple files.
- Before editing, inspect existing patterns and extend them.
- Prefer modifying existing modules over introducing new abstractions.
- For car models, always map user-entered tags to canonical `vehicle_model_id`.
- Do not introduce free-text model communities without alias normalization.
- Keep PR-sized changes. One feature at a time.
- After changes, list every file modified and why.

## Environment

- Platform: Windows 11
- Shell: Git Bash (bash syntax, forward slashes)
- GitHub CLI (`gh`) is installed and authenticated as `agentverseaiagent`
- Git remote: `origin` → `https://github.com/agentverseaiagent/Millionareapp`

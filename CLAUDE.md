# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Git & GitHub

This project uses GitHub for version control. **This is a strict requirement:**
- Commit after every meaningful unit of work (new feature, bug fix, config change, etc.)
- Always push to `origin/master` immediately after committing — never leave work only local
- Write clean, descriptive commit messages that explain what changed and why
- Do not batch up many unrelated changes into one commit — keep commits focused
- This ensures the project can always be reverted to a known good state

Repository: https://github.com/agentverseaiagent/Millionareapp

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

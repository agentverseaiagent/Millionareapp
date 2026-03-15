# Project Context

## App Name
Garagetwits

## What It Is
A universal Expo app for iOS, Android, and web.

Garagetwits takes the Stocktwits-style feed rhythm and applies it to car ownership and research. It is U.S.-focused. It is not a Stocktwits clone — the product identity is centered on vehicle intelligence, not financial speculation.

The canonical organizing unit is the vehicle model. Each model has its own community feed. Posts can be attached to any specificity level the user chooses: make, model, trim, and year.

## What Users Can Do
- Search for a car make or model
- Enter that model's community feed
- Read short, useful posts from other owners and shoppers
- Create posts with optional vehicle attachment (make / model / trim / year)
- Follow vehicle models to build a personalized feed
- Reply to posts

## Vehicle Attachment
Posts no longer require a model. A post can be attached at any level:
- Make only (broad discussion, e.g. "Honda in general")
- Make + Model (model-specific discussion, e.g. Honda CR-V)
- Make + Model + Trim (trim-specific insight, e.g. CR-V EX-L)
- Make + Model + Trim + Year (year-specific notes, e.g. 2025 CR-V EX-L)

Or no attachment at all (general community post).

Trim and year are structured metadata layers — they do not create new top-level communities by themselves.

## Primary Value
- Price paid and deal discussion
- Lease and finance discussion
- Ownership issues and maintenance experiences
- Buying advice and model-specific reviews

## What It Is Not
- Not a generic social network
- Not a marketplace
- Not a dealer CRM
- Not a trim-level review aggregator (that may emerge, but is not the core now)

## Current State and Direction
The product is in an active rework/polish phase. Known issues being addressed:
- Search and discovery behavior was incorrect for make queries and discontinued models
- Navigation and back behavior was weak in several flows
- Model-only posting was the initial structure — this is being reconsidered in favor of make/model/trim/year hierarchy
- Follow/unfollow state was not always updating immediately in profile and feed views
- App had a scaffold feel — not yet matching the intended product identity

The current priority is: get the core product feel right before expanding features.

## Discontinued Models
Discontinued models remain relevant for current owners and community history. They are not deleted. They can be surfaced in search and model pages with appropriate labeling. Active models are always prioritized.

## Seeded Demo Content
Demo posts may be seeded for UI preview purposes. They should be clearly removable and not treated as permanent content.

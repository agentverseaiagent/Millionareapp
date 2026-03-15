# Project Context

## App Name
Garagetwits

## What It Is
A universal Expo app for iOS, Android, and web.

Garagetwits is a Stocktwits-inspired car community app centered on canonical vehicle model communities instead of stock symbols. Each vehicle model has its own community feed where users exchange model-specific intelligence. It is not a Stocktwits clone — it takes the feed-first rhythm and applies it to car ownership.

The app is U.S.-focused. The vehicle catalog is sourced primarily from NHTSA/vPIC data and covers the U.S. market. Discontinued models remain in the catalog for community continuity.

## What Users Can Do
- Search for a car make or model
- Enter that model's community feed
- Read short, useful posts from other owners and shoppers
- Create posts tied to a canonical vehicle model
- Follow vehicle models to build a personalized feed
- Reply to posts

## Primary Value
- Price paid discussion
- Lease and finance discussion
- Ownership issues and maintenance experiences
- Buying advice and model-specific reviews

## What It Is Not
- Not a generic social network
- Not a marketplace
- Not a dealer CRM

## Product Direction
Current focus is on getting the core product feel right:
- **Feed feel:** The main feed should feel alive, fast, and worth checking
- **Navigation quality:** Back behavior, create flow, model-to-post flow must feel intentional
- **Search and discovery quality:** Make search, model search, and alias resolution must work without surprises
- **Overall product identity:** It should feel like a real product, not a scaffold

Known issues discovered during testing:
- The app had a generic scaffold feel in early builds — not yet matching Stocktwits-style rhythm
- Search and discovery were not behaving correctly for make queries and discontinued models
- Navigation lacked intentionality, especially the post creation flow from model pages
- Several duplicate logic blocks existed across files

These are the active areas of improvement.

## Discontinued Models
Discontinued models are still relevant for current owners and community history. They are not deleted from the catalog. They can be surfaced in search and model pages, with appropriate labeling. Active models are always prioritized.

## Seeded Demo Content
Demo posts may be seeded for UI preview purposes. They should be clearly removable and not treated as permanent content.

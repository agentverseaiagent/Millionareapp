-- ============================================================
-- DEMO POSTS — UI preview content only
--
-- These are seeded test records to preview the feed UI with
-- realistic content. They are NOT real user data.
--
-- To remove all demo content:
--   DELETE FROM posts WHERE author_id = '00000000-0000-0000-0000-000000000099';
--   DELETE FROM auth.users WHERE id = '00000000-0000-0000-0000-000000000099';
--
-- Requires: migration 20260315000001 must be run first.
-- Run in: Supabase Dashboard → SQL Editor (runs as postgres).
-- ============================================================

DO $$
DECLARE
  demo_uid  uuid := '00000000-0000-0000-0000-000000000099'::uuid;
  crv_id    uuid;
  rogue_id  uuid;
  rav4_id   uuid;
  cx5_id    uuid;
  modely_id uuid;
BEGIN

  -- ── Create demo user ────────────────────────────────────────────
  -- Uses a clearly fake email and an invalid password hash so the
  -- account cannot actually be signed into.
  INSERT INTO auth.users (
    id, instance_id, aud, role, email,
    encrypted_password, email_confirmed_at,
    created_at, updated_at,
    confirmation_token, email_change, email_change_token_new, recovery_token
  ) VALUES (
    demo_uid,
    '00000000-0000-0000-0000-000000000000',
    'authenticated', 'authenticated',
    'demo@garagetwits.local',
    'DEMO_ACCOUNT_NO_LOGIN',
    now(), now(), now(),
    '', '', '', ''
  ) ON CONFLICT (id) DO NOTHING;

  -- ── Look up model IDs by slug ────────────────────────────────────
  SELECT id INTO crv_id    FROM vehicle_models WHERE slug = 'honda-cr-v';
  SELECT id INTO rogue_id  FROM vehicle_models WHERE slug = 'nissan-rogue';
  SELECT id INTO rav4_id   FROM vehicle_models WHERE slug = 'toyota-rav4';
  SELECT id INTO cx5_id    FROM vehicle_models WHERE slug = 'mazda-cx-5';
  SELECT id INTO modely_id FROM vehicle_models WHERE slug = 'tesla-model-y';

  -- ── Honda CR-V (5 posts) ─────────────────────────────────────────
  IF crv_id IS NOT NULL THEN
    INSERT INTO posts (author_id, vehicle_model_id, body, category, created_at) VALUES

    (demo_uid, crv_id,
     'Picked up a 2024 CR-V EX-L last month. Paid $34,200 OTD in NorCal. Dealer came down $1,800 from sticker after some back and forth. Really happy with the deal overall — the hybrid efficiency is already exceeding expectations.',
     'price_paid', now() - interval '18 hours'),

    (demo_uid, crv_id,
     'Anyone else notice a hesitation when accelerating from a stop on the 2023? Happens mainly in Sport mode, under 15 mph. Dealer says it''s normal software behavior but it''s reproducible and annoying. Looking for confirmation before I push harder.',
     'issue', now() - interval '2 days'),

    (demo_uid, crv_id,
     'First oil change at 7,500 miles. Honda dealer charged $79 for full synthetic 0W-20. Quick in and out, also topped off the AdBlue and did a complimentary tire rotation. Easy experience.',
     'maintenance', now() - interval '3 days'),

    (demo_uid, crv_id,
     'Six months in with the CR-V Hybrid. Averaging 38 MPG in mixed driving — roughly 60% highway, 40% city. The back seat legroom is genuinely impressive for this class. Only gripe is the infotainment took some getting used to.',
     'review', now() - interval '4 days'),

    (demo_uid, crv_id,
     'Thinking about the CR-V PHEV. Anyone have real-world electric range numbers? EPA says 40 miles but very curious about cold weather performance, I''m in Minnesota.',
     'question', now() - interval '5 days');
  END IF;

  -- ── Nissan Rogue (4 posts) ───────────────────────────────────────
  IF rogue_id IS NOT NULL THEN
    INSERT INTO posts (author_id, vehicle_model_id, body, category, created_at) VALUES

    (demo_uid, rogue_id,
     'Just signed a 36/10k lease on a 2024 Rogue SV. $299/mo with $2,500 due at signing in the Midwest. Residual was 55%, money factor .00175. Dealer had very little room to move on MF but I negotiated selling price down about $1,200.',
     'lease_finance', now() - interval '1 day'),

    (demo_uid, rogue_id,
     'Eight months with the Rogue. ProPilot Assist is genuinely useful on my 45-mile highway commute — I''d say it handles 80% of the driving on the expressway. The 1.5T has enough punch for daily use, just don''t expect sportiness.',
     'review', now() - interval '3 days'),

    (demo_uid, rogue_id,
     'The panoramic roof seal is leaking on my 2023 Rogue after heavy rain. Water intrusion near the rear of the headliner. Dealer visit is scheduled — curious if anyone has dealt with this and whether it''s a one-shot fix or recurring.',
     'issue', now() - interval '4 days'),

    (demo_uid, rogue_id,
     'Bought a leftover 2023 Rogue Platinum at $29,500 OTD. Huge discount vs 2024 pricing. Feature set is basically identical — I saved almost $5k for a car that''s 3 months ''old''. Worth considering if inventory is still around you.',
     'price_paid', now() - interval '6 days');
  END IF;

  -- ── Toyota RAV4 (5 posts) ────────────────────────────────────────
  IF rav4_id IS NOT NULL THEN
    INSERT INTO posts (author_id, vehicle_model_id, body, category, created_at) VALUES

    (demo_uid, rav4_id,
     'RAV4 XLE Premium 2024, paid $35,800 OTD in Texas. Market adjustment was $0 after I walked twice. First dealer wanted $2k markup, third dealer honored MSRP day one. Patience pays off with Toyota right now.',
     'price_paid', now() - interval '10 hours'),

    (demo_uid, rav4_id,
     'Two years with the RAV4 Hybrid. Best fuel economy of any SUV I''ve owned — consistently hitting 40 MPG around town, 36 on highway. Reliability has been flawless and resale is going to hold up really well when I eventually trade.',
     'review', now() - interval '2 days'),

    (demo_uid, rav4_id,
     'Is the RAV4 Prime worth the extra $8k over the regular hybrid right now? I drive mostly short trips under 30 miles — I could probably run almost entirely on electric. Curious what people who made that jump actually think in hindsight.',
     'question', now() - interval '4 days'),

    (demo_uid, rav4_id,
     '55k mile service done at Toyota dealer: $320 total for full fluid changes, new cabin and engine filters, plus brake inspection and tire rotation. Reasonably priced for the amount of work. No surprises.',
     'maintenance', now() - interval '5 days'),

    (demo_uid, rav4_id,
     'RAV4 Prime charging cable stopped responding after a recent firmware update. The indicator light comes on but charge never initiates. Toyota confirmed there''s a known issue and to bring it in. First real problem at 18k miles.',
     'issue', now() - interval '7 days');
  END IF;

  -- ── Mazda CX-5 (4 posts) ─────────────────────────────────────────
  IF cx5_id IS NOT NULL THEN
    INSERT INTO posts (author_id, vehicle_model_id, body, category, created_at) VALUES

    (demo_uid, cx5_id,
     'CX-5 Turbo Premium Plus is the best driving compact SUV in this price range — full stop. The steering feel, interior material quality, and turbo power delivery are all genuinely a cut above Honda, Toyota, and Nissan at the same price point.',
     'review', now() - interval '6 hours'),

    (demo_uid, cx5_id,
     '2024 CX-5 Carbon Edition, $36,400 OTD in the Southeast. Zero markup anywhere I looked — Mazda dealers seem much more reasonable than Toyota or Honda right now. Took about 2 hours total at the dealership.',
     'price_paid', now() - interval '3 days'),

    (demo_uid, cx5_id,
     'The only real complaint I have with the CX-5 is the infotainment boot lag. Takes almost 20 seconds to fully load after a cold start. Mazda really needs an OTA update path — everything else about this car is excellent.',
     'issue', now() - interval '5 days'),

    (demo_uid, cx5_id,
     'Leased a 2024 CX-5 Select at $289/mo, 36/12k, $1,200 due at signing in the PNW. Mazda Financial had solid numbers this month — better than Honda or Toyota lease programs by a meaningful margin. Worth checking if you''re in the market.',
     'lease_finance', now() - interval '8 days');
  END IF;

  -- ── Tesla Model Y (5 posts) ──────────────────────────────────────
  IF modely_id IS NOT NULL THEN
    INSERT INTO posts (author_id, vehicle_model_id, body, category, created_at) VALUES

    (demo_uid, modely_id,
     'Model Y Long Range AWD, ordered at $48,990 before the $7,500 federal tax credit. Effective out-of-pocket was $41,490 after the credit applied at purchase. The EV tax credit really does close the gap with comparable gas SUVs.',
     'price_paid', now() - interval '14 hours'),

    (demo_uid, modely_id,
     'Phantom braking on my 2023 MY is still happening after 4+ software updates. Mostly triggers on highway ramps with overhead structures or shadows. Tesla service says hardware is fine. Anyone else still seeing this after the recent updates?',
     'issue', now() - interval '2 days'),

    (demo_uid, modely_id,
     '18 months in. The Supercharger network is the actual killer advantage over other EVs — 200+ kW charging makes road trips viable in a way ChargePoint and EVgo still can''t match. My home charging cost works out to about $3/day.',
     'review', now() - interval '4 days'),

    (demo_uid, modely_id,
     'Standard Range vs Long Range debate — I drive 40 miles/day with occasional 200+ mile trips and live in a cold climate (Minnesota). Is the LR worth the $8k premium? Cold weather range loss on SR has me nervous.',
     'question', now() - interval '6 days'),

    (demo_uid, modely_id,
     'Tesla mobile service came to my driveway to rotate tires at 12k miles. Took about 45 minutes, cost $60. Scheduling was done in the app and the tech showed up exactly on time. The mobile service genuinely removes a lot of EV ownership friction.',
     'maintenance', now() - interval '9 days');
  END IF;

END $$;

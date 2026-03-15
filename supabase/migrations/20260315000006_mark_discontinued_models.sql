-- Mark known-discontinued vehicle models as is_active = false.
--
-- Strategy:
--   1. All models belonging to discontinued makes (Pontiac, Saturn, Scion, Hummer)
--   2. Specific discontinued models within otherwise-active makes
--
-- Makes are left is_active = true so make-level search still works.
-- Models with is_active = false surface in search after active models,
-- with a "(Discontinued)" label in the UI.

-- ── Entire discontinued makes: all their models → is_active = false ────────

-- Pontiac (discontinued 2010)
UPDATE vehicle_models SET is_active = false
WHERE make_id = 'b0372c97-a955-4f25-9cb6-aac580641424';

-- Saturn (discontinued 2010)
UPDATE vehicle_models SET is_active = false
WHERE make_id = '41876e08-8866-4c42-9880-68c5e61ec534';

-- Scion (discontinued 2016)
UPDATE vehicle_models SET is_active = false
WHERE make_id = '72c98fce-b8e1-4d2e-8738-774585cc50db';

-- Hummer (original line discontinued 2010; GMC Hummer EV is a different brand)
UPDATE vehicle_models SET is_active = false
WHERE make_id = '1aea2d48-545e-4410-af0c-190a7d34c966';

-- ── Specific discontinued models within active makes ────────────────────────

-- Honda Fit (discontinued in US after 2020)
UPDATE vehicle_models SET is_active = false WHERE slug = 'honda-fit';

-- Mazda6 (discontinued after 2023)
UPDATE vehicle_models SET is_active = false WHERE slug = 'mazda-mazda6';

-- Mazda CX-9 (discontinued; replaced by CX-90)
UPDATE vehicle_models SET is_active = false WHERE slug = 'mazda-cx-9';

-- Chevrolet Malibu (discontinued after 2024)
UPDATE vehicle_models SET is_active = false WHERE slug = 'chevrolet-malibu';

-- Chevrolet Camaro (discontinued after 2024)
UPDATE vehicle_models SET is_active = false WHERE slug = 'chevrolet-camaro';

-- Dodge Dart (discontinued after 2016)
UPDATE vehicle_models SET is_active = false WHERE slug = 'dodge-dart';

-- Dodge Grand Caravan (discontinued after 2020)
UPDATE vehicle_models SET is_active = false WHERE slug = 'dodge-grand-caravan';

-- Ford EcoSport (discontinued in US after 2022)
UPDATE vehicle_models SET is_active = false WHERE slug = 'ford-ecosport';

-- Ford Edge (discontinued after 2023)
UPDATE vehicle_models SET is_active = false WHERE slug = 'ford-edge';

-- Ford Transit Connect (discontinued after 2023)
UPDATE vehicle_models SET is_active = false WHERE slug = 'ford-transit-connect';

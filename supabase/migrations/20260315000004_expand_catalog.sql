-- ============================================================
-- EXPAND VEHICLE CATALOG
--
-- Adds the 24 makes missing from migration 000001 and expands
-- models for all makes — especially Mercedes-Benz (which had
-- zero models), and thin makes like Nissan, Infiniti, etc.
--
-- Safe to re-run: all inserts use ON CONFLICT DO NOTHING.
-- The sync-vehicles Edge Function will keep this current once
-- deployed and scheduled.
--
-- Slug algorithm (must match toModelSlug in Edge Function):
--   makeSlug + '-' + modelName.toLowerCase()
--                              .replace(/[^a-z0-9]+/g, '-')
--                              .replace(/^-+|-+$/g, '')
-- normalized_name = modelName.toLowerCase().replace(/[^a-z0-9]/g, '')
-- ============================================================

-- ── Add missing makes ────────────────────────────────────────
INSERT INTO vehicle_makes (name, slug) VALUES
  ('Dodge',       'dodge'),
  ('Lincoln',     'lincoln'),
  ('Cadillac',    'cadillac'),
  ('Buick',       'buick'),
  ('Chrysler',    'chrysler'),
  ('Mitsubishi',  'mitsubishi'),
  ('Genesis',     'genesis'),
  ('Porsche',     'porsche'),
  ('MINI',        'mini'),
  ('Volvo',       'volvo'),
  ('Land Rover',  'land-rover'),
  ('Jaguar',      'jaguar'),
  ('Alfa Romeo',  'alfa-romeo'),
  ('Fiat',        'fiat'),
  ('Ferrari',     'ferrari'),
  ('Lamborghini', 'lamborghini'),
  ('Maserati',    'maserati'),
  ('Rivian',      'rivian'),
  ('Lucid',       'lucid'),
  ('Polestar',    'polestar'),
  ('Pontiac',     'pontiac'),
  ('Saturn',      'saturn'),
  ('Scion',       'scion'),
  ('Hummer',      'hummer')
ON CONFLICT (slug) DO NOTHING;

-- ── Mercedes-Benz (was missing all models) ───────────────────
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'C-Class',   'mercedes-benz-c-class',   'cclass'   FROM vehicle_makes WHERE slug = 'mercedes-benz' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'E-Class',   'mercedes-benz-e-class',   'eclass'   FROM vehicle_makes WHERE slug = 'mercedes-benz' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'S-Class',   'mercedes-benz-s-class',   'sclass'   FROM vehicle_makes WHERE slug = 'mercedes-benz' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'GLE',       'mercedes-benz-gle',       'gle'      FROM vehicle_makes WHERE slug = 'mercedes-benz' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'GLC',       'mercedes-benz-glc',       'glc'      FROM vehicle_makes WHERE slug = 'mercedes-benz' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'GLS',       'mercedes-benz-gls',       'gls'      FROM vehicle_makes WHERE slug = 'mercedes-benz' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'GLA',       'mercedes-benz-gla',       'gla'      FROM vehicle_makes WHERE slug = 'mercedes-benz' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'GLB',       'mercedes-benz-glb',       'glb'      FROM vehicle_makes WHERE slug = 'mercedes-benz' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'A-Class',   'mercedes-benz-a-class',   'aclass'   FROM vehicle_makes WHERE slug = 'mercedes-benz' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'AMG GT',    'mercedes-benz-amg-gt',    'amggt'    FROM vehicle_makes WHERE slug = 'mercedes-benz' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'EQS',       'mercedes-benz-eqs',       'eqs'      FROM vehicle_makes WHERE slug = 'mercedes-benz' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'EQE',       'mercedes-benz-eqe',       'eqe'      FROM vehicle_makes WHERE slug = 'mercedes-benz' ON CONFLICT DO NOTHING;

-- ── BMW (additional models) ──────────────────────────────────
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'X1',      'bmw-x1',      'x1'      FROM vehicle_makes WHERE slug = 'bmw' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'X7',      'bmw-x7',      'x7'      FROM vehicle_makes WHERE slug = 'bmw' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'M5',      'bmw-m5',      'm5'      FROM vehicle_makes WHERE slug = 'bmw' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'i4',      'bmw-i4',      'i4'      FROM vehicle_makes WHERE slug = 'bmw' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'iX',      'bmw-ix',      'ix'      FROM vehicle_makes WHERE slug = 'bmw' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, '7 Series','bmw-7-series','7series' FROM vehicle_makes WHERE slug = 'bmw' ON CONFLICT DO NOTHING;

-- ── Honda (additional models) ────────────────────────────────
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Odyssey', 'honda-odyssey', 'odyssey' FROM vehicle_makes WHERE slug = 'honda' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'HR-V',    'honda-hr-v',    'hrv'     FROM vehicle_makes WHERE slug = 'honda' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Fit',     'honda-fit',     'fit'     FROM vehicle_makes WHERE slug = 'honda' ON CONFLICT DO NOTHING;

-- ── Toyota (additional models) ───────────────────────────────
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Sienna',       'toyota-sienna',        'sienna'      FROM vehicle_makes WHERE slug = 'toyota' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Sequoia',      'toyota-sequoia',       'sequoia'     FROM vehicle_makes WHERE slug = 'toyota' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Venza',        'toyota-venza',         'venza'       FROM vehicle_makes WHERE slug = 'toyota' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'GR86',         'toyota-gr86',          'gr86'        FROM vehicle_makes WHERE slug = 'toyota' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'bZ4X',         'toyota-bz4x',          'bz4x'        FROM vehicle_makes WHERE slug = 'toyota' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Land Cruiser', 'toyota-land-cruiser',  'landcruiser' FROM vehicle_makes WHERE slug = 'toyota' ON CONFLICT DO NOTHING;

-- ── Ford (additional models) ─────────────────────────────────
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Ranger',      'ford-ranger',      'ranger'    FROM vehicle_makes WHERE slug = 'ford' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Edge',        'ford-edge',        'edge'      FROM vehicle_makes WHERE slug = 'ford' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Expedition',  'ford-expedition',  'expedition' FROM vehicle_makes WHERE slug = 'ford' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'F-150 Lightning', 'ford-f-150-lightning', 'f150lightning' FROM vehicle_makes WHERE slug = 'ford' ON CONFLICT DO NOTHING;

-- ── Chevrolet (additional models) ───────────────────────────
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Tahoe',    'chevrolet-tahoe',    'tahoe'    FROM vehicle_makes WHERE slug = 'chevrolet' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Suburban', 'chevrolet-suburban', 'suburban' FROM vehicle_makes WHERE slug = 'chevrolet' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Blazer',   'chevrolet-blazer',   'blazer'   FROM vehicle_makes WHERE slug = 'chevrolet' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Trax',     'chevrolet-trax',     'trax'     FROM vehicle_makes WHERE slug = 'chevrolet' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Bolt',     'chevrolet-bolt',     'bolt'     FROM vehicle_makes WHERE slug = 'chevrolet' ON CONFLICT DO NOTHING;

-- ── Nissan (additional models) ───────────────────────────────
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Pathfinder', 'nissan-pathfinder', 'pathfinder' FROM vehicle_makes WHERE slug = 'nissan' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Murano',     'nissan-murano',     'murano'     FROM vehicle_makes WHERE slug = 'nissan' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Armada',     'nissan-armada',     'armada'     FROM vehicle_makes WHERE slug = 'nissan' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Sentra',     'nissan-sentra',     'sentra'     FROM vehicle_makes WHERE slug = 'nissan' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Maxima',     'nissan-maxima',     'maxima'     FROM vehicle_makes WHERE slug = 'nissan' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Kicks',      'nissan-kicks',      'kicks'      FROM vehicle_makes WHERE slug = 'nissan' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Titan',      'nissan-titan',      'titan'      FROM vehicle_makes WHERE slug = 'nissan' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'LEAF',       'nissan-leaf',       'leaf'       FROM vehicle_makes WHERE slug = 'nissan' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Ariya',      'nissan-ariya',      'ariya'      FROM vehicle_makes WHERE slug = 'nissan' ON CONFLICT DO NOTHING;

-- ── Subaru (additional models) ───────────────────────────────
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Ascent',   'subaru-ascent',   'ascent'   FROM vehicle_makes WHERE slug = 'subaru' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Impreza',  'subaru-impreza',  'impreza'  FROM vehicle_makes WHERE slug = 'subaru' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Legacy',   'subaru-legacy',   'legacy'   FROM vehicle_makes WHERE slug = 'subaru' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'BRZ',      'subaru-brz',      'brz'      FROM vehicle_makes WHERE slug = 'subaru' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Solterra', 'subaru-solterra', 'solterra' FROM vehicle_makes WHERE slug = 'subaru' ON CONFLICT DO NOTHING;

-- ── Mazda (additional models) ────────────────────────────────
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'CX-90',  'mazda-cx-90',  'cx90'   FROM vehicle_makes WHERE slug = 'mazda' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'MX-5',   'mazda-mx-5',   'mx5'    FROM vehicle_makes WHERE slug = 'mazda' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'CX-30',  'mazda-cx-30',  'cx30'   FROM vehicle_makes WHERE slug = 'mazda' ON CONFLICT DO NOTHING;

-- ── Hyundai (additional models) ──────────────────────────────
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Palisade', 'hyundai-palisade', 'palisade' FROM vehicle_makes WHERE slug = 'hyundai' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Kona',     'hyundai-kona',     'kona'     FROM vehicle_makes WHERE slug = 'hyundai' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'IONIQ 6',  'hyundai-ioniq-6',  'ioniq6'   FROM vehicle_makes WHERE slug = 'hyundai' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Venue',    'hyundai-venue',    'venue'    FROM vehicle_makes WHERE slug = 'hyundai' ON CONFLICT DO NOTHING;

-- ── Kia (additional models) ──────────────────────────────────
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Carnival', 'kia-carnival', 'carnival' FROM vehicle_makes WHERE slug = 'kia' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Stinger',  'kia-stinger',  'stinger'  FROM vehicle_makes WHERE slug = 'kia' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Forte',    'kia-forte',    'forte'    FROM vehicle_makes WHERE slug = 'kia' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Niro',     'kia-niro',     'niro'     FROM vehicle_makes WHERE slug = 'kia' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'EV9',      'kia-ev9',      'ev9'      FROM vehicle_makes WHERE slug = 'kia' ON CONFLICT DO NOTHING;

-- ── GMC (additional models) ──────────────────────────────────
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Canyon',    'gmc-canyon',    'canyon'    FROM vehicle_makes WHERE slug = 'gmc' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Acadia',    'gmc-acadia',    'acadia'    FROM vehicle_makes WHERE slug = 'gmc' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Hummer EV', 'gmc-hummer-ev', 'hummerev' FROM vehicle_makes WHERE slug = 'gmc' ON CONFLICT DO NOTHING;

-- ── Lexus (additional models) ────────────────────────────────
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'NX', 'lexus-nx', 'nx' FROM vehicle_makes WHERE slug = 'lexus' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'UX', 'lexus-ux', 'ux' FROM vehicle_makes WHERE slug = 'lexus' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'LC', 'lexus-lc', 'lc' FROM vehicle_makes WHERE slug = 'lexus' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'ES', 'lexus-es', 'es' FROM vehicle_makes WHERE slug = 'lexus' ON CONFLICT DO NOTHING;

-- ── Acura (additional models) ────────────────────────────────
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'ZDX', 'acura-zdx', 'zdx' FROM vehicle_makes WHERE slug = 'acura' ON CONFLICT DO NOTHING;

-- ── Infiniti (additional models) ─────────────────────────────
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'QX50', 'infiniti-qx50', 'qx50' FROM vehicle_makes WHERE slug = 'infiniti' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'QX55', 'infiniti-qx55', 'qx55' FROM vehicle_makes WHERE slug = 'infiniti' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'QX80', 'infiniti-qx80', 'qx80' FROM vehicle_makes WHERE slug = 'infiniti' ON CONFLICT DO NOTHING;

-- ── Audi (additional models) ─────────────────────────────────
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'A3',      'audi-a3',      'a3'      FROM vehicle_makes WHERE slug = 'audi' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'A6',      'audi-a6',      'a6'      FROM vehicle_makes WHERE slug = 'audi' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Q3',      'audi-q3',      'q3'      FROM vehicle_makes WHERE slug = 'audi' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Q8',      'audi-q8',      'q8'      FROM vehicle_makes WHERE slug = 'audi' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'e-tron GT','audi-e-tron-gt','etrongt' FROM vehicle_makes WHERE slug = 'audi' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'TT',      'audi-tt',      'tt'      FROM vehicle_makes WHERE slug = 'audi' ON CONFLICT DO NOTHING;

-- ── Volkswagen (additional models) ───────────────────────────
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Atlas',  'volkswagen-atlas',  'atlas'  FROM vehicle_makes WHERE slug = 'volkswagen' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'ID.4',   'volkswagen-id-4',   'id4'    FROM vehicle_makes WHERE slug = 'volkswagen' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Passat', 'volkswagen-passat', 'passat' FROM vehicle_makes WHERE slug = 'volkswagen' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Golf',   'volkswagen-golf',   'golf'   FROM vehicle_makes WHERE slug = 'volkswagen' ON CONFLICT DO NOTHING;

-- ── Jeep (additional models) ─────────────────────────────────
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Compass',   'jeep-compass',   'compass'   FROM vehicle_makes WHERE slug = 'jeep' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Renegade',  'jeep-renegade',  'renegade'  FROM vehicle_makes WHERE slug = 'jeep' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Wagoneer',  'jeep-wagoneer',  'wagoneer'  FROM vehicle_makes WHERE slug = 'jeep' ON CONFLICT DO NOTHING;

-- ── Dodge ────────────────────────────────────────────────────
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Challenger',   'dodge-challenger',   'challenger'   FROM vehicle_makes WHERE slug = 'dodge' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Charger',      'dodge-charger',      'charger'      FROM vehicle_makes WHERE slug = 'dodge' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Durango',      'dodge-durango',      'durango'      FROM vehicle_makes WHERE slug = 'dodge' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Grand Caravan','dodge-grand-caravan', 'grandcaravan' FROM vehicle_makes WHERE slug = 'dodge' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Dart',         'dodge-dart',         'dart'         FROM vehicle_makes WHERE slug = 'dodge' ON CONFLICT DO NOTHING;

-- ── Lincoln ──────────────────────────────────────────────────
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Navigator', 'lincoln-navigator', 'navigator' FROM vehicle_makes WHERE slug = 'lincoln' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Corsair',   'lincoln-corsair',   'corsair'   FROM vehicle_makes WHERE slug = 'lincoln' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Aviator',   'lincoln-aviator',   'aviator'   FROM vehicle_makes WHERE slug = 'lincoln' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Nautilus',  'lincoln-nautilus',  'nautilus'  FROM vehicle_makes WHERE slug = 'lincoln' ON CONFLICT DO NOTHING;

-- ── Cadillac ─────────────────────────────────────────────────
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Escalade', 'cadillac-escalade', 'escalade' FROM vehicle_makes WHERE slug = 'cadillac' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'XT5',      'cadillac-xt5',      'xt5'      FROM vehicle_makes WHERE slug = 'cadillac' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'XT4',      'cadillac-xt4',      'xt4'      FROM vehicle_makes WHERE slug = 'cadillac' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'CT5',      'cadillac-ct5',      'ct5'      FROM vehicle_makes WHERE slug = 'cadillac' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Lyriq',    'cadillac-lyriq',    'lyriq'    FROM vehicle_makes WHERE slug = 'cadillac' ON CONFLICT DO NOTHING;

-- ── Buick ────────────────────────────────────────────────────
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Enclave',  'buick-enclave',  'enclave'  FROM vehicle_makes WHERE slug = 'buick' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Envision', 'buick-envision', 'envision' FROM vehicle_makes WHERE slug = 'buick' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Encore',   'buick-encore',   'encore'   FROM vehicle_makes WHERE slug = 'buick' ON CONFLICT DO NOTHING;

-- ── Chrysler ─────────────────────────────────────────────────
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Pacifica',         'chrysler-pacifica',          'pacifica'        FROM vehicle_makes WHERE slug = 'chrysler' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Pacifica Hybrid',  'chrysler-pacifica-hybrid',   'pacificahybrid'  FROM vehicle_makes WHERE slug = 'chrysler' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, '300',              'chrysler-300',               '300'             FROM vehicle_makes WHERE slug = 'chrysler' ON CONFLICT DO NOTHING;

-- ── Mitsubishi ───────────────────────────────────────────────
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Outlander',      'mitsubishi-outlander',       'outlander'      FROM vehicle_makes WHERE slug = 'mitsubishi' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Eclipse Cross',  'mitsubishi-eclipse-cross',   'eclipsecross'   FROM vehicle_makes WHERE slug = 'mitsubishi' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Outlander PHEV', 'mitsubishi-outlander-phev',  'outlanderphev'  FROM vehicle_makes WHERE slug = 'mitsubishi' ON CONFLICT DO NOTHING;

-- ── Genesis ──────────────────────────────────────────────────
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'GV80', 'genesis-gv80', 'gv80' FROM vehicle_makes WHERE slug = 'genesis' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'GV70', 'genesis-gv70', 'gv70' FROM vehicle_makes WHERE slug = 'genesis' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'G80',  'genesis-g80',  'g80'  FROM vehicle_makes WHERE slug = 'genesis' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'G70',  'genesis-g70',  'g70'  FROM vehicle_makes WHERE slug = 'genesis' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'GV60', 'genesis-gv60', 'gv60' FROM vehicle_makes WHERE slug = 'genesis' ON CONFLICT DO NOTHING;

-- ── Porsche ──────────────────────────────────────────────────
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Cayenne',  'porsche-cayenne',  'cayenne'  FROM vehicle_makes WHERE slug = 'porsche' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Macan',    'porsche-macan',    'macan'    FROM vehicle_makes WHERE slug = 'porsche' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, '911',      'porsche-911',      '911'      FROM vehicle_makes WHERE slug = 'porsche' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Panamera', 'porsche-panamera', 'panamera' FROM vehicle_makes WHERE slug = 'porsche' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Taycan',   'porsche-taycan',   'taycan'   FROM vehicle_makes WHERE slug = 'porsche' ON CONFLICT DO NOTHING;

-- ── MINI ─────────────────────────────────────────────────────
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Cooper',      'mini-cooper',      'cooper'      FROM vehicle_makes WHERE slug = 'mini' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Countryman',  'mini-countryman',  'countryman'  FROM vehicle_makes WHERE slug = 'mini' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Clubman',     'mini-clubman',     'clubman'     FROM vehicle_makes WHERE slug = 'mini' ON CONFLICT DO NOTHING;

-- ── Volvo ────────────────────────────────────────────────────
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'XC90',  'volvo-xc90',  'xc90'  FROM vehicle_makes WHERE slug = 'volvo' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'XC60',  'volvo-xc60',  'xc60'  FROM vehicle_makes WHERE slug = 'volvo' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'XC40',  'volvo-xc40',  'xc40'  FROM vehicle_makes WHERE slug = 'volvo' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'S60',   'volvo-s60',   's60'   FROM vehicle_makes WHERE slug = 'volvo' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'V60',   'volvo-v60',   'v60'   FROM vehicle_makes WHERE slug = 'volvo' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'EX90',  'volvo-ex90',  'ex90'  FROM vehicle_makes WHERE slug = 'volvo' ON CONFLICT DO NOTHING;

-- ── Land Rover ───────────────────────────────────────────────
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Defender',          'land-rover-defender',            'defender'         FROM vehicle_makes WHERE slug = 'land-rover' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Discovery',         'land-rover-discovery',           'discovery'        FROM vehicle_makes WHERE slug = 'land-rover' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Range Rover',       'land-rover-range-rover',         'rangerover'       FROM vehicle_makes WHERE slug = 'land-rover' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Range Rover Sport', 'land-rover-range-rover-sport',   'rangeroversport'  FROM vehicle_makes WHERE slug = 'land-rover' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Discovery Sport',   'land-rover-discovery-sport',     'discoverysport'   FROM vehicle_makes WHERE slug = 'land-rover' ON CONFLICT DO NOTHING;

-- ── Jaguar ───────────────────────────────────────────────────
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'F-Pace', 'jaguar-f-pace', 'fpace' FROM vehicle_makes WHERE slug = 'jaguar' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'XF',     'jaguar-xf',     'xf'    FROM vehicle_makes WHERE slug = 'jaguar' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'F-Type', 'jaguar-f-type', 'ftype' FROM vehicle_makes WHERE slug = 'jaguar' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'I-Pace', 'jaguar-i-pace', 'ipace' FROM vehicle_makes WHERE slug = 'jaguar' ON CONFLICT DO NOTHING;

-- ── Alfa Romeo ───────────────────────────────────────────────
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Giulia',   'alfa-romeo-giulia',   'giulia'   FROM vehicle_makes WHERE slug = 'alfa-romeo' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Stelvio',  'alfa-romeo-stelvio',  'stelvio'  FROM vehicle_makes WHERE slug = 'alfa-romeo' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Tonale',   'alfa-romeo-tonale',   'tonale'   FROM vehicle_makes WHERE slug = 'alfa-romeo' ON CONFLICT DO NOTHING;

-- ── Fiat ─────────────────────────────────────────────────────
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, '500X', 'fiat-500x', '500x' FROM vehicle_makes WHERE slug = 'fiat' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, '500',  'fiat-500',  '500'  FROM vehicle_makes WHERE slug = 'fiat' ON CONFLICT DO NOTHING;

-- ── Ferrari ──────────────────────────────────────────────────
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Roma',    'ferrari-roma',    'roma'    FROM vehicle_makes WHERE slug = 'ferrari' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'SF90',    'ferrari-sf90',    'sf90'    FROM vehicle_makes WHERE slug = 'ferrari' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Purosangue','ferrari-purosangue','purosangue' FROM vehicle_makes WHERE slug = 'ferrari' ON CONFLICT DO NOTHING;

-- ── Lamborghini ──────────────────────────────────────────────
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Urus',     'lamborghini-urus',     'urus'     FROM vehicle_makes WHERE slug = 'lamborghini' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Huracan',  'lamborghini-huracan',  'huracan'  FROM vehicle_makes WHERE slug = 'lamborghini' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Revuelto', 'lamborghini-revuelto', 'revuelto' FROM vehicle_makes WHERE slug = 'lamborghini' ON CONFLICT DO NOTHING;

-- ── Maserati ─────────────────────────────────────────────────
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Ghibli',       'maserati-ghibli',       'ghibli'       FROM vehicle_makes WHERE slug = 'maserati' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Levante',      'maserati-levante',      'levante'      FROM vehicle_makes WHERE slug = 'maserati' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Quattroporte', 'maserati-quattroporte', 'quattroporte' FROM vehicle_makes WHERE slug = 'maserati' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Grecale',      'maserati-grecale',      'grecale'      FROM vehicle_makes WHERE slug = 'maserati' ON CONFLICT DO NOTHING;

-- ── Rivian ───────────────────────────────────────────────────
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'R1T', 'rivian-r1t', 'r1t' FROM vehicle_makes WHERE slug = 'rivian' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'R1S', 'rivian-r1s', 'r1s' FROM vehicle_makes WHERE slug = 'rivian' ON CONFLICT DO NOTHING;

-- ── Lucid ────────────────────────────────────────────────────
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Air',     'lucid-air',     'air'     FROM vehicle_makes WHERE slug = 'lucid' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Gravity', 'lucid-gravity', 'gravity' FROM vehicle_makes WHERE slug = 'lucid' ON CONFLICT DO NOTHING;

-- ── Polestar ─────────────────────────────────────────────────
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Polestar 2', 'polestar-polestar-2', 'polestar2' FROM vehicle_makes WHERE slug = 'polestar' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Polestar 3', 'polestar-polestar-3', 'polestar3' FROM vehicle_makes WHERE slug = 'polestar' ON CONFLICT DO NOTHING;

-- ── Pontiac (discontinued, active owner community) ───────────
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'G6',        'pontiac-g6',        'g6'        FROM vehicle_makes WHERE slug = 'pontiac' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'G8',        'pontiac-g8',        'g8'        FROM vehicle_makes WHERE slug = 'pontiac' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Solstice',  'pontiac-solstice',  'solstice'  FROM vehicle_makes WHERE slug = 'pontiac' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Grand Prix','pontiac-grand-prix','grandprix'  FROM vehicle_makes WHERE slug = 'pontiac' ON CONFLICT DO NOTHING;

-- ── Saturn ───────────────────────────────────────────────────
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Vue',    'saturn-vue',    'vue'    FROM vehicle_makes WHERE slug = 'saturn' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Ion',    'saturn-ion',    'ion'    FROM vehicle_makes WHERE slug = 'saturn' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'Aura',   'saturn-aura',   'aura'   FROM vehicle_makes WHERE slug = 'saturn' ON CONFLICT DO NOTHING;

-- ── Scion ────────────────────────────────────────────────────
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'tC',    'scion-tc',    'tc'    FROM vehicle_makes WHERE slug = 'scion' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'FR-S',  'scion-fr-s',  'frs'   FROM vehicle_makes WHERE slug = 'scion' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'xB',    'scion-xb',    'xb'    FROM vehicle_makes WHERE slug = 'scion' ON CONFLICT DO NOTHING;

-- ── Hummer ───────────────────────────────────────────────────
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'H3',   'hummer-h3',  'h3'  FROM vehicle_makes WHERE slug = 'hummer' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name)
SELECT id, 'H2',   'hummer-h2',  'h2'  FROM vehicle_makes WHERE slug = 'hummer' ON CONFLICT DO NOTHING;

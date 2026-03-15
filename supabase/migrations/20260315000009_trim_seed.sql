-- ============================================================
-- Garagetwits vehicle trim seed
-- Covers real trims for high-interest models in the catalog.
-- Root cause: vehicle_trims table was created (migration 004)
-- but never populated. This migration seeds it.
-- Safe to re-run: all inserts use ON CONFLICT DO NOTHING.
-- ============================================================

-- ── Dodge Challenger ─────────────────────────────────────────
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'SXT',                          'sxt',                        'seed' FROM vehicle_models WHERE slug = 'dodge-challenger' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'GT',                           'gt',                         'seed' FROM vehicle_models WHERE slug = 'dodge-challenger' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'R/T',                          'rt',                         'seed' FROM vehicle_models WHERE slug = 'dodge-challenger' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'R/T Scat Pack',                'rtscatpack',                 'seed' FROM vehicle_models WHERE slug = 'dodge-challenger' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'R/T Scat Pack Widebody',       'rtscatpackwidebody',         'seed' FROM vehicle_models WHERE slug = 'dodge-challenger' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'SRT 392',                      'srt392',                     'seed' FROM vehicle_models WHERE slug = 'dodge-challenger' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'SRT 392 Widebody',             'srt392widebody',             'seed' FROM vehicle_models WHERE slug = 'dodge-challenger' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'SRT Hellcat',                  'srthellcat',                 'seed' FROM vehicle_models WHERE slug = 'dodge-challenger' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'SRT Hellcat Widebody',         'srthellcatwidebody',         'seed' FROM vehicle_models WHERE slug = 'dodge-challenger' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'SRT Hellcat Redeye',           'srthellcatredeye',           'seed' FROM vehicle_models WHERE slug = 'dodge-challenger' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'SRT Hellcat Redeye Widebody',  'srthellcatredeyewidebody',   'seed' FROM vehicle_models WHERE slug = 'dodge-challenger' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'SRT Super Stock',              'srtsuperstock',              'seed' FROM vehicle_models WHERE slug = 'dodge-challenger' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'SRT Demon',                    'srtdemon',                   'seed' FROM vehicle_models WHERE slug = 'dodge-challenger' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'SRT Demon 170',                'srtdemon170',                'seed' FROM vehicle_models WHERE slug = 'dodge-challenger' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Black Ghost',                  'blackghost',                 'seed' FROM vehicle_models WHERE slug = 'dodge-challenger' ON CONFLICT DO NOTHING;

-- ── Dodge Charger ────────────────────────────────────────────
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'SXT',                          'sxt',                        'seed' FROM vehicle_models WHERE slug = 'dodge-charger' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'GT',                           'gt',                         'seed' FROM vehicle_models WHERE slug = 'dodge-charger' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'R/T',                          'rt',                         'seed' FROM vehicle_models WHERE slug = 'dodge-charger' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'R/T Scat Pack',                'rtscatpack',                 'seed' FROM vehicle_models WHERE slug = 'dodge-charger' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'R/T Scat Pack Widebody',       'rtscatpackwidebody',         'seed' FROM vehicle_models WHERE slug = 'dodge-charger' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'SRT 392',                      'srt392',                     'seed' FROM vehicle_models WHERE slug = 'dodge-charger' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'SRT Hellcat',                  'srthellcat',                 'seed' FROM vehicle_models WHERE slug = 'dodge-charger' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'SRT Hellcat Widebody',         'srthellcatwidebody',         'seed' FROM vehicle_models WHERE slug = 'dodge-charger' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'SRT Hellcat Redeye',           'srthellcatredeye',           'seed' FROM vehicle_models WHERE slug = 'dodge-charger' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'SRT Hellcat Redeye Widebody',  'srthellcatredeyewidebody',   'seed' FROM vehicle_models WHERE slug = 'dodge-charger' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'SRT Jailbreak',                'srtjailbreak',               'seed' FROM vehicle_models WHERE slug = 'dodge-charger' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'SRT King Daytona',             'srtkingdaytona',             'seed' FROM vehicle_models WHERE slug = 'dodge-charger' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Daytona',                      'daytona',                    'seed' FROM vehicle_models WHERE slug = 'dodge-charger' ON CONFLICT DO NOTHING;

-- ── Dodge Durango ────────────────────────────────────────────
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'SXT',           'sxt',          'seed' FROM vehicle_models WHERE slug = 'dodge-durango' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'GT',            'gt',           'seed' FROM vehicle_models WHERE slug = 'dodge-durango' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'R/T',           'rt',           'seed' FROM vehicle_models WHERE slug = 'dodge-durango' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Citadel',       'citadel',      'seed' FROM vehicle_models WHERE slug = 'dodge-durango' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'SRT 392',       'srt392',       'seed' FROM vehicle_models WHERE slug = 'dodge-durango' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'SRT Hellcat',   'srthellcat',   'seed' FROM vehicle_models WHERE slug = 'dodge-durango' ON CONFLICT DO NOTHING;

-- ── Ford Mustang ─────────────────────────────────────────────
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'EcoBoost',                     'ecoboost',                   'seed' FROM vehicle_models WHERE slug = 'ford-mustang' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'EcoBoost Premium',             'ecoboostpremium',            'seed' FROM vehicle_models WHERE slug = 'ford-mustang' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'GT',                           'gt',                         'seed' FROM vehicle_models WHERE slug = 'ford-mustang' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'GT Premium',                   'gtpremium',                  'seed' FROM vehicle_models WHERE slug = 'ford-mustang' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Mach 1',                       'mach1',                      'seed' FROM vehicle_models WHERE slug = 'ford-mustang' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Mach 1 Premium',               'mach1premium',               'seed' FROM vehicle_models WHERE slug = 'ford-mustang' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Shelby GT350',                 'shelbygt350',                'seed' FROM vehicle_models WHERE slug = 'ford-mustang' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Shelby GT350R',                'shelbygt350r',               'seed' FROM vehicle_models WHERE slug = 'ford-mustang' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Shelby GT500',                 'shelbygt500',                'seed' FROM vehicle_models WHERE slug = 'ford-mustang' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Dark Horse',                   'darkhorse',                  'seed' FROM vehicle_models WHERE slug = 'ford-mustang' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Dark Horse Premium',           'darkhorsepremium',           'seed' FROM vehicle_models WHERE slug = 'ford-mustang' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Rally',                        'rally',                      'seed' FROM vehicle_models WHERE slug = 'ford-mustang' ON CONFLICT DO NOTHING;

-- ── Ford F-150 ───────────────────────────────────────────────
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'XL',            'xl',           'seed' FROM vehicle_models WHERE slug = 'ford-f-150' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'XLT',           'xlt',          'seed' FROM vehicle_models WHERE slug = 'ford-f-150' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Lariat',        'lariat',       'seed' FROM vehicle_models WHERE slug = 'ford-f-150' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'King Ranch',    'kingranch',    'seed' FROM vehicle_models WHERE slug = 'ford-f-150' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Platinum',      'platinum',     'seed' FROM vehicle_models WHERE slug = 'ford-f-150' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Limited',       'limited',      'seed' FROM vehicle_models WHERE slug = 'ford-f-150' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Raptor',        'raptor',       'seed' FROM vehicle_models WHERE slug = 'ford-f-150' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Raptor R',      'raptorr',      'seed' FROM vehicle_models WHERE slug = 'ford-f-150' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Tremor',        'tremor',       'seed' FROM vehicle_models WHERE slug = 'ford-f-150' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Lightning XLT', 'lightningxlt', 'seed' FROM vehicle_models WHERE slug = 'ford-f-150' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Lightning Lariat','lightninglariat','seed' FROM vehicle_models WHERE slug = 'ford-f-150' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Lightning Platinum','lightningplatinum','seed' FROM vehicle_models WHERE slug = 'ford-f-150' ON CONFLICT DO NOTHING;

-- ── Ford Bronco ──────────────────────────────────────────────
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Base',              'base',            'seed' FROM vehicle_models WHERE slug = 'ford-bronco' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Big Bend',          'bigbend',         'seed' FROM vehicle_models WHERE slug = 'ford-bronco' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Black Diamond',     'blackdiamond',    'seed' FROM vehicle_models WHERE slug = 'ford-bronco' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Outer Banks',       'outerbanks',      'seed' FROM vehicle_models WHERE slug = 'ford-bronco' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Badlands',          'badlands',        'seed' FROM vehicle_models WHERE slug = 'ford-bronco' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Wildtrak',          'wildtrak',        'seed' FROM vehicle_models WHERE slug = 'ford-bronco' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Everglades',        'everglades',      'seed' FROM vehicle_models WHERE slug = 'ford-bronco' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Raptor',            'raptor',          'seed' FROM vehicle_models WHERE slug = 'ford-bronco' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Heritage',          'heritage',        'seed' FROM vehicle_models WHERE slug = 'ford-bronco' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Heritage Limited',  'heritagelimited', 'seed' FROM vehicle_models WHERE slug = 'ford-bronco' ON CONFLICT DO NOTHING;

-- ── Chevrolet Camaro ─────────────────────────────────────────
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'LS',        'ls',       'seed' FROM vehicle_models WHERE slug = 'chevrolet-camaro' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'LT',        'lt',       'seed' FROM vehicle_models WHERE slug = 'chevrolet-camaro' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'LT RS',     'ltrs',     'seed' FROM vehicle_models WHERE slug = 'chevrolet-camaro' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'LT1',       'lt1',      'seed' FROM vehicle_models WHERE slug = 'chevrolet-camaro' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, '1SS',       '1ss',      'seed' FROM vehicle_models WHERE slug = 'chevrolet-camaro' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, '2SS',       '2ss',      'seed' FROM vehicle_models WHERE slug = 'chevrolet-camaro' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'SS 1LE',    'ss1le',    'seed' FROM vehicle_models WHERE slug = 'chevrolet-camaro' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'ZL1',       'zl1',      'seed' FROM vehicle_models WHERE slug = 'chevrolet-camaro' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'ZL1 1LE',   'zl11le',   'seed' FROM vehicle_models WHERE slug = 'chevrolet-camaro' ON CONFLICT DO NOTHING;

-- ── Chevrolet Corvette ───────────────────────────────────────
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Stingray',       'stingray',      'seed' FROM vehicle_models WHERE slug = 'chevrolet-corvette' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Stingray Z51',   'stingrayz51',   'seed' FROM vehicle_models WHERE slug = 'chevrolet-corvette' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Grand Sport',    'grandsport',    'seed' FROM vehicle_models WHERE slug = 'chevrolet-corvette' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Z06',            'z06',           'seed' FROM vehicle_models WHERE slug = 'chevrolet-corvette' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Z06 Z07',        'z06z07',        'seed' FROM vehicle_models WHERE slug = 'chevrolet-corvette' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'E-Ray',          'eray',          'seed' FROM vehicle_models WHERE slug = 'chevrolet-corvette' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'ZR1',            'zr1',           'seed' FROM vehicle_models WHERE slug = 'chevrolet-corvette' ON CONFLICT DO NOTHING;

-- ── Chevrolet Silverado ──────────────────────────────────────
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Work Truck',      'worktruck',     'seed' FROM vehicle_models WHERE slug = 'chevrolet-silverado' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Custom',          'custom',        'seed' FROM vehicle_models WHERE slug = 'chevrolet-silverado' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Custom Trail Boss','customtrailboss','seed' FROM vehicle_models WHERE slug = 'chevrolet-silverado' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'LS',              'ls',            'seed' FROM vehicle_models WHERE slug = 'chevrolet-silverado' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'LT',              'lt',            'seed' FROM vehicle_models WHERE slug = 'chevrolet-silverado' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'LT Trail Boss',   'lttrailboss',   'seed' FROM vehicle_models WHERE slug = 'chevrolet-silverado' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'RST',             'rst',           'seed' FROM vehicle_models WHERE slug = 'chevrolet-silverado' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'LTZ',             'ltz',           'seed' FROM vehicle_models WHERE slug = 'chevrolet-silverado' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'High Country',    'highcountry',   'seed' FROM vehicle_models WHERE slug = 'chevrolet-silverado' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'ZR2',             'zr2',           'seed' FROM vehicle_models WHERE slug = 'chevrolet-silverado' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'ZR2 Bison',       'zr2bison',      'seed' FROM vehicle_models WHERE slug = 'chevrolet-silverado' ON CONFLICT DO NOTHING;

-- ── Honda Civic ──────────────────────────────────────────────
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'LX',            'lx',           'seed' FROM vehicle_models WHERE slug = 'honda-civic' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Sport',         'sport',        'seed' FROM vehicle_models WHERE slug = 'honda-civic' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'EX',            'ex',           'seed' FROM vehicle_models WHERE slug = 'honda-civic' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'EX-L',          'exl',          'seed' FROM vehicle_models WHERE slug = 'honda-civic' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Sport Touring', 'sporttouring', 'seed' FROM vehicle_models WHERE slug = 'honda-civic' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Touring',       'touring',      'seed' FROM vehicle_models WHERE slug = 'honda-civic' ON CONFLICT DO NOTHING;

-- ── Honda Accord ─────────────────────────────────────────────
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'LX',            'lx',           'seed' FROM vehicle_models WHERE slug = 'honda-accord' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Sport',         'sport',        'seed' FROM vehicle_models WHERE slug = 'honda-accord' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'EX',            'ex',           'seed' FROM vehicle_models WHERE slug = 'honda-accord' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'EX-L',          'exl',          'seed' FROM vehicle_models WHERE slug = 'honda-accord' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Sport-L',       'sportl',       'seed' FROM vehicle_models WHERE slug = 'honda-accord' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Touring',       'touring',      'seed' FROM vehicle_models WHERE slug = 'honda-accord' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Sport Hybrid',  'sporthybrid',  'seed' FROM vehicle_models WHERE slug = 'honda-accord' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Touring Hybrid','touringhybrid','seed' FROM vehicle_models WHERE slug = 'honda-accord' ON CONFLICT DO NOTHING;

-- ── Honda CR-V ───────────────────────────────────────────────
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'LX',                  'lx',               'seed' FROM vehicle_models WHERE slug = 'honda-cr-v' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'EX',                  'ex',               'seed' FROM vehicle_models WHERE slug = 'honda-cr-v' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'EX-L',                'exl',              'seed' FROM vehicle_models WHERE slug = 'honda-cr-v' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Sport',               'sport',            'seed' FROM vehicle_models WHERE slug = 'honda-cr-v' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Sport-L',             'sportl',           'seed' FROM vehicle_models WHERE slug = 'honda-cr-v' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Sport Touring',       'sporttouring',     'seed' FROM vehicle_models WHERE slug = 'honda-cr-v' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Touring',             'touring',          'seed' FROM vehicle_models WHERE slug = 'honda-cr-v' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Hybrid Sport',        'hybridsport',      'seed' FROM vehicle_models WHERE slug = 'honda-cr-v' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Hybrid Sport Touring','hybridsporttouring','seed' FROM vehicle_models WHERE slug = 'honda-cr-v' ON CONFLICT DO NOTHING;

-- ── Toyota Camry ─────────────────────────────────────────────
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'LE',           'le',          'seed' FROM vehicle_models WHERE slug = 'toyota-camry' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'SE',           'se',          'seed' FROM vehicle_models WHERE slug = 'toyota-camry' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'XSE',          'xse',         'seed' FROM vehicle_models WHERE slug = 'toyota-camry' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'XLE',          'xle',         'seed' FROM vehicle_models WHERE slug = 'toyota-camry' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'TRD',          'trd',         'seed' FROM vehicle_models WHERE slug = 'toyota-camry' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'LE Hybrid',    'lehybrid',    'seed' FROM vehicle_models WHERE slug = 'toyota-camry' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'SE Hybrid',    'sehybrid',    'seed' FROM vehicle_models WHERE slug = 'toyota-camry' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'XSE Hybrid',   'xsehybrid',   'seed' FROM vehicle_models WHERE slug = 'toyota-camry' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'XLE Hybrid',   'xlehybrid',   'seed' FROM vehicle_models WHERE slug = 'toyota-camry' ON CONFLICT DO NOTHING;

-- ── Toyota RAV4 ──────────────────────────────────────────────
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'LE',               'le',           'seed' FROM vehicle_models WHERE slug = 'toyota-rav4' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'XLE',              'xle',          'seed' FROM vehicle_models WHERE slug = 'toyota-rav4' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'XLE Premium',      'xlepremium',   'seed' FROM vehicle_models WHERE slug = 'toyota-rav4' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'TRD Off-Road',     'trdoffroad',   'seed' FROM vehicle_models WHERE slug = 'toyota-rav4' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Adventure',        'adventure',    'seed' FROM vehicle_models WHERE slug = 'toyota-rav4' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Limited',          'limited',      'seed' FROM vehicle_models WHERE slug = 'toyota-rav4' ON CONFLICT DO NOTHING;

-- ── Toyota Tacoma ────────────────────────────────────────────
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'SR',           'sr',          'seed' FROM vehicle_models WHERE slug = 'toyota-tacoma' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'SR5',          'sr5',         'seed' FROM vehicle_models WHERE slug = 'toyota-tacoma' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'TRD Sport',    'trdsport',    'seed' FROM vehicle_models WHERE slug = 'toyota-tacoma' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'TRD Off-Road', 'trdoffroad',  'seed' FROM vehicle_models WHERE slug = 'toyota-tacoma' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'TRD Pro',      'trdpro',      'seed' FROM vehicle_models WHERE slug = 'toyota-tacoma' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Limited',      'limited',     'seed' FROM vehicle_models WHERE slug = 'toyota-tacoma' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Trailhunter',  'trailhunter', 'seed' FROM vehicle_models WHERE slug = 'toyota-tacoma' ON CONFLICT DO NOTHING;

-- ── Toyota 4Runner ───────────────────────────────────────────
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'SR5',          'sr5',        'seed' FROM vehicle_models WHERE slug = 'toyota-4runner' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'TRD Sport',    'trdsport',   'seed' FROM vehicle_models WHERE slug = 'toyota-4runner' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'TRD Off-Road', 'trdoffroad', 'seed' FROM vehicle_models WHERE slug = 'toyota-4runner' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'TRD Pro',      'trdpro',     'seed' FROM vehicle_models WHERE slug = 'toyota-4runner' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Limited',      'limited',    'seed' FROM vehicle_models WHERE slug = 'toyota-4runner' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Venture',      'venture',    'seed' FROM vehicle_models WHERE slug = 'toyota-4runner' ON CONFLICT DO NOTHING;

-- ── Toyota Tundra ────────────────────────────────────────────
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'SR',               'sr',           'seed' FROM vehicle_models WHERE slug = 'toyota-tundra' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'SR5',              'sr5',          'seed' FROM vehicle_models WHERE slug = 'toyota-tundra' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Limited',          'limited',      'seed' FROM vehicle_models WHERE slug = 'toyota-tundra' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Platinum',         'platinum',     'seed' FROM vehicle_models WHERE slug = 'toyota-tundra' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, '1794 Edition',     '1794edition',  'seed' FROM vehicle_models WHERE slug = 'toyota-tundra' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'TRD Pro',          'trdpro',       'seed' FROM vehicle_models WHERE slug = 'toyota-tundra' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Capstone',         'capstone',     'seed' FROM vehicle_models WHERE slug = 'toyota-tundra' ON CONFLICT DO NOTHING;

-- ── Toyota Supra ─────────────────────────────────────────────
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, '2.0',              '20',            'seed' FROM vehicle_models WHERE slug = 'toyota-supra' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, '3.0',              '30',            'seed' FROM vehicle_models WHERE slug = 'toyota-supra' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, '3.0 Premium',      '30premium',     'seed' FROM vehicle_models WHERE slug = 'toyota-supra' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'A91 Edition',       'a91edition',    'seed' FROM vehicle_models WHERE slug = 'toyota-supra' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'A91-CF Edition',    'a91cfedition',  'seed' FROM vehicle_models WHERE slug = 'toyota-supra' ON CONFLICT DO NOTHING;

-- ── Subaru WRX ───────────────────────────────────────────────
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Base',     'base',    'seed' FROM vehicle_models WHERE slug = 'subaru-wrx' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Premium',  'premium', 'seed' FROM vehicle_models WHERE slug = 'subaru-wrx' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Limited',  'limited', 'seed' FROM vehicle_models WHERE slug = 'subaru-wrx' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'GT',       'gt',      'seed' FROM vehicle_models WHERE slug = 'subaru-wrx' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'TR',       'tr',      'seed' FROM vehicle_models WHERE slug = 'subaru-wrx' ON CONFLICT DO NOTHING;

-- ── Subaru BRZ ───────────────────────────────────────────────
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Premium',  'premium', 'seed' FROM vehicle_models WHERE slug = 'subaru-brz' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Limited',  'limited', 'seed' FROM vehicle_models WHERE slug = 'subaru-brz' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'tS',       'ts',      'seed' FROM vehicle_models WHERE slug = 'subaru-brz' ON CONFLICT DO NOTHING;

-- ── Subaru Outback ───────────────────────────────────────────
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Base',         'base',        'seed' FROM vehicle_models WHERE slug = 'subaru-outback' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Premium',      'premium',     'seed' FROM vehicle_models WHERE slug = 'subaru-outback' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Onyx Edition', 'onyxedition', 'seed' FROM vehicle_models WHERE slug = 'subaru-outback' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Limited',      'limited',     'seed' FROM vehicle_models WHERE slug = 'subaru-outback' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Touring',      'touring',     'seed' FROM vehicle_models WHERE slug = 'subaru-outback' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Wilderness',   'wilderness',  'seed' FROM vehicle_models WHERE slug = 'subaru-outback' ON CONFLICT DO NOTHING;

-- ── Jeep Wrangler ────────────────────────────────────────────
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Sport',                    'sport',                  'seed' FROM vehicle_models WHERE slug = 'jeep-wrangler' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Sport S',                  'sports',                 'seed' FROM vehicle_models WHERE slug = 'jeep-wrangler' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Willys Sport',             'willyssport',            'seed' FROM vehicle_models WHERE slug = 'jeep-wrangler' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Willys',                   'willys',                 'seed' FROM vehicle_models WHERE slug = 'jeep-wrangler' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Sahara',                   'sahara',                 'seed' FROM vehicle_models WHERE slug = 'jeep-wrangler' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Sahara Altitude',          'saharaaltitude',         'seed' FROM vehicle_models WHERE slug = 'jeep-wrangler' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Rubicon',                  'rubicon',                'seed' FROM vehicle_models WHERE slug = 'jeep-wrangler' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, '4xe',                      '4xe',                    'seed' FROM vehicle_models WHERE slug = 'jeep-wrangler' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Rubicon 392',              'rubicon392',             'seed' FROM vehicle_models WHERE slug = 'jeep-wrangler' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Rubicon 392 Xtreme Recon', 'rubicon392xtremerecon',  'seed' FROM vehicle_models WHERE slug = 'jeep-wrangler' ON CONFLICT DO NOTHING;

-- ── Jeep Grand Cherokee ──────────────────────────────────────
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Laredo',         'laredo',        'seed' FROM vehicle_models WHERE slug = 'jeep-grand-cherokee' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Altitude',       'altitude',      'seed' FROM vehicle_models WHERE slug = 'jeep-grand-cherokee' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Limited',        'limited',       'seed' FROM vehicle_models WHERE slug = 'jeep-grand-cherokee' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Trailhawk',      'trailhawk',     'seed' FROM vehicle_models WHERE slug = 'jeep-grand-cherokee' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Overland',       'overland',      'seed' FROM vehicle_models WHERE slug = 'jeep-grand-cherokee' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Summit',         'summit',        'seed' FROM vehicle_models WHERE slug = 'jeep-grand-cherokee' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Summit Reserve', 'summitreserve', 'seed' FROM vehicle_models WHERE slug = 'jeep-grand-cherokee' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'SRT',            'srt',           'seed' FROM vehicle_models WHERE slug = 'jeep-grand-cherokee' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Trackhawk',      'trackhawk',     'seed' FROM vehicle_models WHERE slug = 'jeep-grand-cherokee' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, '4xe',            '4xe',           'seed' FROM vehicle_models WHERE slug = 'jeep-grand-cherokee' ON CONFLICT DO NOTHING;

-- ── Ram 1500 ─────────────────────────────────────────────────
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Tradesman',     'tradesman',    'seed' FROM vehicle_models WHERE slug = 'ram-1500' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Big Horn',      'bighorn',      'seed' FROM vehicle_models WHERE slug = 'ram-1500' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Lone Star',     'lonestar',     'seed' FROM vehicle_models WHERE slug = 'ram-1500' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Laramie',       'laramie',      'seed' FROM vehicle_models WHERE slug = 'ram-1500' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Rebel',         'rebel',        'seed' FROM vehicle_models WHERE slug = 'ram-1500' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Power Wagon',   'powerwagon',   'seed' FROM vehicle_models WHERE slug = 'ram-1500' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Limited',       'limited',      'seed' FROM vehicle_models WHERE slug = 'ram-1500' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'Warlock',       'warlock',      'seed' FROM vehicle_models WHERE slug = 'ram-1500' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'TRX',           'trx',          'seed' FROM vehicle_models WHERE slug = 'ram-1500' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_trims (model_id, name, normalized_name, source) SELECT id, 'RHO',           'rho',          'seed' FROM vehicle_models WHERE slug = 'ram-1500' ON CONFLICT DO NOTHING;

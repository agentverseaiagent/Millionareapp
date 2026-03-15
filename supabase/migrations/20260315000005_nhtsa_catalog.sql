-- ============================================================
-- NHTSA vPIC catalog: passenger cars, MPVs, trucks (2024)
-- Source: https://vpic.nhtsa.dot.gov/api/
-- All INSERTs use ON CONFLICT DO NOTHING — safe to re-run.
-- ============================================================

-- ------------------------------------------------------------
-- HONDA
-- ------------------------------------------------------------
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Accord', 'honda-accord', 'accord' FROM vehicle_makes WHERE slug = 'honda' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Civic', 'honda-civic', 'civic' FROM vehicle_makes WHERE slug = 'honda' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Civic Si', 'honda-civic-si', 'civicsi' FROM vehicle_makes WHERE slug = 'honda' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Civic Type R', 'honda-civic-type-r', 'civictyper' FROM vehicle_makes WHERE slug = 'honda' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Pilot', 'honda-pilot', 'pilot' FROM vehicle_makes WHERE slug = 'honda' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'CR-V', 'honda-cr-v', 'crv' FROM vehicle_makes WHERE slug = 'honda' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Odyssey', 'honda-odyssey', 'odyssey' FROM vehicle_makes WHERE slug = 'honda' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Passport', 'honda-passport', 'passport' FROM vehicle_makes WHERE slug = 'honda' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'HR-V', 'honda-hr-v', 'hrv' FROM vehicle_makes WHERE slug = 'honda' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Prologue', 'honda-prologue', 'prologue' FROM vehicle_makes WHERE slug = 'honda' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Ridgeline', 'honda-ridgeline', 'ridgeline' FROM vehicle_makes WHERE slug = 'honda' ON CONFLICT DO NOTHING;

-- ------------------------------------------------------------
-- TOYOTA
-- ------------------------------------------------------------
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Corolla', 'toyota-corolla', 'corolla' FROM vehicle_makes WHERE slug = 'toyota' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Prius', 'toyota-prius', 'prius' FROM vehicle_makes WHERE slug = 'toyota' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Camry', 'toyota-camry', 'camry' FROM vehicle_makes WHERE slug = 'toyota' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Mirai', 'toyota-mirai', 'mirai' FROM vehicle_makes WHERE slug = 'toyota' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Prius Prime (PHEV)', 'toyota-prius-prime-phev', 'priusprimephev' FROM vehicle_makes WHERE slug = 'toyota' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'GR86', 'toyota-gr86', 'gr86' FROM vehicle_makes WHERE slug = 'toyota' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Crown', 'toyota-crown', 'crown' FROM vehicle_makes WHERE slug = 'toyota' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'GR Corolla', 'toyota-gr-corolla', 'grcorolla' FROM vehicle_makes WHERE slug = 'toyota' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Supra', 'toyota-supra', 'supra' FROM vehicle_makes WHERE slug = 'toyota' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Land Cruiser', 'toyota-land-cruiser', 'landcruiser' FROM vehicle_makes WHERE slug = 'toyota' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Highlander', 'toyota-highlander', 'highlander' FROM vehicle_makes WHERE slug = 'toyota' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, '4Runner', 'toyota-4runner', '4runner' FROM vehicle_makes WHERE slug = 'toyota' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'RAV4', 'toyota-rav4', 'rav4' FROM vehicle_makes WHERE slug = 'toyota' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Sienna', 'toyota-sienna', 'sienna' FROM vehicle_makes WHERE slug = 'toyota' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Sequoia', 'toyota-sequoia', 'sequoia' FROM vehicle_makes WHERE slug = 'toyota' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Venza', 'toyota-venza', 'venza' FROM vehicle_makes WHERE slug = 'toyota' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'RAV4 Prime (PHEV)', 'toyota-rav4-prime-phev', 'rav4primephev' FROM vehicle_makes WHERE slug = 'toyota' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Corolla Cross', 'toyota-corolla-cross', 'corollacross' FROM vehicle_makes WHERE slug = 'toyota' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'bZ4X', 'toyota-bz4x', 'bz4x' FROM vehicle_makes WHERE slug = 'toyota' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Grand Highlander', 'toyota-grand-highlander', 'grandhighlander' FROM vehicle_makes WHERE slug = 'toyota' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Tacoma', 'toyota-tacoma', 'tacoma' FROM vehicle_makes WHERE slug = 'toyota' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Tundra', 'toyota-tundra', 'tundra' FROM vehicle_makes WHERE slug = 'toyota' ON CONFLICT DO NOTHING;

-- ------------------------------------------------------------
-- FORD
-- ------------------------------------------------------------
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Mustang', 'ford-mustang', 'mustang' FROM vehicle_makes WHERE slug = 'ford' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Edge', 'ford-edge', 'edge' FROM vehicle_makes WHERE slug = 'ford' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Escape', 'ford-escape', 'escape' FROM vehicle_makes WHERE slug = 'ford' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Expedition', 'ford-expedition', 'expedition' FROM vehicle_makes WHERE slug = 'ford' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Explorer', 'ford-explorer', 'explorer' FROM vehicle_makes WHERE slug = 'ford' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Expedition MAX', 'ford-expedition-max', 'expeditionmax' FROM vehicle_makes WHERE slug = 'ford' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Bronco', 'ford-bronco', 'bronco' FROM vehicle_makes WHERE slug = 'ford' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'EcoSport', 'ford-ecosport', 'ecosport' FROM vehicle_makes WHERE slug = 'ford' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Bronco Sport', 'ford-bronco-sport', 'broncosport' FROM vehicle_makes WHERE slug = 'ford' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Mustang Mach-E', 'ford-mustang-mach-e', 'mustangmache' FROM vehicle_makes WHERE slug = 'ford' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'F-150', 'ford-f-150', 'f150' FROM vehicle_makes WHERE slug = 'ford' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Ranger', 'ford-ranger', 'ranger' FROM vehicle_makes WHERE slug = 'ford' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'F-250', 'ford-f-250', 'f250' FROM vehicle_makes WHERE slug = 'ford' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'F-350', 'ford-f-350', 'f350' FROM vehicle_makes WHERE slug = 'ford' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'F-450', 'ford-f-450', 'f450' FROM vehicle_makes WHERE slug = 'ford' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'F-550', 'ford-f-550', 'f550' FROM vehicle_makes WHERE slug = 'ford' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Transit Connect', 'ford-transit-connect', 'transitconnect' FROM vehicle_makes WHERE slug = 'ford' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Transit', 'ford-transit', 'transit' FROM vehicle_makes WHERE slug = 'ford' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'F-600', 'ford-f-600', 'f600' FROM vehicle_makes WHERE slug = 'ford' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Maverick', 'ford-maverick', 'maverick' FROM vehicle_makes WHERE slug = 'ford' ON CONFLICT DO NOTHING;

-- ------------------------------------------------------------
-- CHEVROLET
-- ------------------------------------------------------------
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Camaro', 'chevrolet-camaro', 'camaro' FROM vehicle_makes WHERE slug = 'chevrolet' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Corvette', 'chevrolet-corvette', 'corvette' FROM vehicle_makes WHERE slug = 'chevrolet' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Malibu', 'chevrolet-malibu', 'malibu' FROM vehicle_makes WHERE slug = 'chevrolet' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Spark', 'chevrolet-spark', 'spark' FROM vehicle_makes WHERE slug = 'chevrolet' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Trax', 'chevrolet-trax', 'trax' FROM vehicle_makes WHERE slug = 'chevrolet' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Equinox', 'chevrolet-equinox', 'equinox' FROM vehicle_makes WHERE slug = 'chevrolet' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Suburban', 'chevrolet-suburban', 'suburban' FROM vehicle_makes WHERE slug = 'chevrolet' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Tahoe', 'chevrolet-tahoe', 'tahoe' FROM vehicle_makes WHERE slug = 'chevrolet' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Traverse', 'chevrolet-traverse', 'traverse' FROM vehicle_makes WHERE slug = 'chevrolet' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Trailblazer', 'chevrolet-trailblazer', 'trailblazer' FROM vehicle_makes WHERE slug = 'chevrolet' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Blazer', 'chevrolet-blazer', 'blazer' FROM vehicle_makes WHERE slug = 'chevrolet' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Traverse Limited', 'chevrolet-traverse-limited', 'traverselimited' FROM vehicle_makes WHERE slug = 'chevrolet' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Silverado', 'chevrolet-silverado', 'silverado' FROM vehicle_makes WHERE slug = 'chevrolet' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Colorado', 'chevrolet-colorado', 'colorado' FROM vehicle_makes WHERE slug = 'chevrolet' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Silverado HD', 'chevrolet-silverado-hd', 'silveradohd' FROM vehicle_makes WHERE slug = 'chevrolet' ON CONFLICT DO NOTHING;

-- ------------------------------------------------------------
-- NISSAN
-- ------------------------------------------------------------
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'GT-R', 'nissan-gt-r', 'gtr' FROM vehicle_makes WHERE slug = 'nissan' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Versa', 'nissan-versa', 'versa' FROM vehicle_makes WHERE slug = 'nissan' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Altima', 'nissan-altima', 'altima' FROM vehicle_makes WHERE slug = 'nissan' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Leaf', 'nissan-leaf', 'leaf' FROM vehicle_makes WHERE slug = 'nissan' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Sentra', 'nissan-sentra', 'sentra' FROM vehicle_makes WHERE slug = 'nissan' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Kicks', 'nissan-kicks', 'kicks' FROM vehicle_makes WHERE slug = 'nissan' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Nissan Z', 'nissan-nissan-z', 'nissanz' FROM vehicle_makes WHERE slug = 'nissan' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Ariya Hatchback', 'nissan-ariya-hatchback', 'ariyahatchback' FROM vehicle_makes WHERE slug = 'nissan' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Pathfinder', 'nissan-pathfinder', 'pathfinder' FROM vehicle_makes WHERE slug = 'nissan' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Rogue', 'nissan-rogue', 'rogue' FROM vehicle_makes WHERE slug = 'nissan' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Murano', 'nissan-murano', 'murano' FROM vehicle_makes WHERE slug = 'nissan' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Armada', 'nissan-armada', 'armada' FROM vehicle_makes WHERE slug = 'nissan' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Frontier', 'nissan-frontier', 'frontier' FROM vehicle_makes WHERE slug = 'nissan' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Titan', 'nissan-titan', 'titan' FROM vehicle_makes WHERE slug = 'nissan' ON CONFLICT DO NOTHING;

-- ------------------------------------------------------------
-- JEEP
-- ------------------------------------------------------------
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Wrangler', 'jeep-wrangler', 'wrangler' FROM vehicle_makes WHERE slug = 'jeep' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Compass', 'jeep-compass', 'compass' FROM vehicle_makes WHERE slug = 'jeep' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Grand Cherokee', 'jeep-grand-cherokee', 'grandcherokee' FROM vehicle_makes WHERE slug = 'jeep' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Renegade', 'jeep-renegade', 'renegade' FROM vehicle_makes WHERE slug = 'jeep' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Grand Wagoneer', 'jeep-grand-wagoneer', 'grandwagoneer' FROM vehicle_makes WHERE slug = 'jeep' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Wagoneer', 'jeep-wagoneer', 'wagoneer' FROM vehicle_makes WHERE slug = 'jeep' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Grand Cherokee L', 'jeep-grand-cherokee-l', 'grandcherokeel' FROM vehicle_makes WHERE slug = 'jeep' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Wagoneer L', 'jeep-wagoneer-l', 'wagoneerl' FROM vehicle_makes WHERE slug = 'jeep' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Grand Wagoneer L', 'jeep-grand-wagoneer-l', 'grandwagoneerl' FROM vehicle_makes WHERE slug = 'jeep' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Wagoneer S', 'jeep-wagoneer-s', 'wagoneers' FROM vehicle_makes WHERE slug = 'jeep' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Gladiator', 'jeep-gladiator', 'gladiator' FROM vehicle_makes WHERE slug = 'jeep' ON CONFLICT DO NOTHING;

-- ------------------------------------------------------------
-- DODGE
-- ------------------------------------------------------------
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Challenger', 'dodge-challenger', 'challenger' FROM vehicle_makes WHERE slug = 'dodge' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Charger', 'dodge-charger', 'charger' FROM vehicle_makes WHERE slug = 'dodge' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Durango', 'dodge-durango', 'durango' FROM vehicle_makes WHERE slug = 'dodge' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Hornet', 'dodge-hornet', 'hornet' FROM vehicle_makes WHERE slug = 'dodge' ON CONFLICT DO NOTHING;

-- ------------------------------------------------------------
-- RAM
-- ------------------------------------------------------------
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, '1500', 'ram-1500', '1500' FROM vehicle_makes WHERE slug = 'ram' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, '2500', 'ram-2500', '2500' FROM vehicle_makes WHERE slug = 'ram' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, '3500', 'ram-3500', '3500' FROM vehicle_makes WHERE slug = 'ram' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, '4500', 'ram-4500', '4500' FROM vehicle_makes WHERE slug = 'ram' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, '5500', 'ram-5500', '5500' FROM vehicle_makes WHERE slug = 'ram' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'ProMaster 1500', 'ram-promaster-1500', 'promaster1500' FROM vehicle_makes WHERE slug = 'ram' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'ProMaster 2500', 'ram-promaster-2500', 'promaster2500' FROM vehicle_makes WHERE slug = 'ram' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'ProMaster 3500', 'ram-promaster-3500', 'promaster3500' FROM vehicle_makes WHERE slug = 'ram' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'ProMaster City', 'ram-promaster-city', 'promastercity' FROM vehicle_makes WHERE slug = 'ram' ON CONFLICT DO NOTHING;

-- ------------------------------------------------------------
-- GMC
-- ------------------------------------------------------------
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Acadia', 'gmc-acadia', 'acadia' FROM vehicle_makes WHERE slug = 'gmc' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Terrain', 'gmc-terrain', 'terrain' FROM vehicle_makes WHERE slug = 'gmc' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Yukon', 'gmc-yukon', 'yukon' FROM vehicle_makes WHERE slug = 'gmc' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Yukon XL', 'gmc-yukon-xl', 'yukonxl' FROM vehicle_makes WHERE slug = 'gmc' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Hummer EV SUV', 'gmc-hummer-ev-suv', 'hummerevsuv' FROM vehicle_makes WHERE slug = 'gmc' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Sierra', 'gmc-sierra', 'sierra' FROM vehicle_makes WHERE slug = 'gmc' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Canyon', 'gmc-canyon', 'canyon' FROM vehicle_makes WHERE slug = 'gmc' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Sierra HD', 'gmc-sierra-hd', 'sierrahd' FROM vehicle_makes WHERE slug = 'gmc' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Hummer EV Pickup', 'gmc-hummer-ev-pickup', 'hummerevpickup' FROM vehicle_makes WHERE slug = 'gmc' ON CONFLICT DO NOTHING;

-- ------------------------------------------------------------
-- BUICK
-- ------------------------------------------------------------
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Enclave', 'buick-enclave', 'enclave' FROM vehicle_makes WHERE slug = 'buick' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Encore', 'buick-encore', 'encore' FROM vehicle_makes WHERE slug = 'buick' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Envision', 'buick-envision', 'envision' FROM vehicle_makes WHERE slug = 'buick' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Encore GX', 'buick-encore-gx', 'encoregx' FROM vehicle_makes WHERE slug = 'buick' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Envista', 'buick-envista', 'envista' FROM vehicle_makes WHERE slug = 'buick' ON CONFLICT DO NOTHING;

-- ------------------------------------------------------------
-- CADILLAC
-- ------------------------------------------------------------
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'CT4', 'cadillac-ct4', 'ct4' FROM vehicle_makes WHERE slug = 'cadillac' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'CT5', 'cadillac-ct5', 'ct5' FROM vehicle_makes WHERE slug = 'cadillac' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Escalade', 'cadillac-escalade', 'escalade' FROM vehicle_makes WHERE slug = 'cadillac' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Escalade ESV', 'cadillac-escalade-esv', 'escaladeesv' FROM vehicle_makes WHERE slug = 'cadillac' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'XT5', 'cadillac-xt5', 'xt5' FROM vehicle_makes WHERE slug = 'cadillac' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'XT4', 'cadillac-xt4', 'xt4' FROM vehicle_makes WHERE slug = 'cadillac' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'XT6', 'cadillac-xt6', 'xt6' FROM vehicle_makes WHERE slug = 'cadillac' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Lyriq', 'cadillac-lyriq', 'lyriq' FROM vehicle_makes WHERE slug = 'cadillac' ON CONFLICT DO NOTHING;

-- ------------------------------------------------------------
-- CHRYSLER
-- ------------------------------------------------------------
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, '300', 'chrysler-300', '300' FROM vehicle_makes WHERE slug = 'chrysler' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Pacifica', 'chrysler-pacifica', 'pacifica' FROM vehicle_makes WHERE slug = 'chrysler' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Voyager', 'chrysler-voyager', 'voyager' FROM vehicle_makes WHERE slug = 'chrysler' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Grand Caravan', 'chrysler-grand-caravan', 'grandcaravan' FROM vehicle_makes WHERE slug = 'chrysler' ON CONFLICT DO NOTHING;

-- ------------------------------------------------------------
-- LINCOLN
-- ------------------------------------------------------------
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Continental', 'lincoln-continental', 'continental' FROM vehicle_makes WHERE slug = 'lincoln' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Navigator', 'lincoln-navigator', 'navigator' FROM vehicle_makes WHERE slug = 'lincoln' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Aviator', 'lincoln-aviator', 'aviator' FROM vehicle_makes WHERE slug = 'lincoln' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Nautilus', 'lincoln-nautilus', 'nautilus' FROM vehicle_makes WHERE slug = 'lincoln' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Corsair', 'lincoln-corsair', 'corsair' FROM vehicle_makes WHERE slug = 'lincoln' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Navigator L', 'lincoln-navigator-l', 'navigatorl' FROM vehicle_makes WHERE slug = 'lincoln' ON CONFLICT DO NOTHING;

-- ------------------------------------------------------------
-- SUBARU
-- ------------------------------------------------------------
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Legacy', 'subaru-legacy', 'legacy' FROM vehicle_makes WHERE slug = 'subaru' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Impreza', 'subaru-impreza', 'impreza' FROM vehicle_makes WHERE slug = 'subaru' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'WRX', 'subaru-wrx', 'wrx' FROM vehicle_makes WHERE slug = 'subaru' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'BRZ', 'subaru-brz', 'brz' FROM vehicle_makes WHERE slug = 'subaru' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Outback', 'subaru-outback', 'outback' FROM vehicle_makes WHERE slug = 'subaru' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Forester', 'subaru-forester', 'forester' FROM vehicle_makes WHERE slug = 'subaru' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Crosstrek', 'subaru-crosstrek', 'crosstrek' FROM vehicle_makes WHERE slug = 'subaru' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Ascent', 'subaru-ascent', 'ascent' FROM vehicle_makes WHERE slug = 'subaru' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Solterra', 'subaru-solterra', 'solterra' FROM vehicle_makes WHERE slug = 'subaru' ON CONFLICT DO NOTHING;

-- ------------------------------------------------------------
-- MAZDA
-- ------------------------------------------------------------
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'MX-5', 'mazda-mx-5', 'mx5' FROM vehicle_makes WHERE slug = 'mazda' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Mazda3', 'mazda-mazda3', 'mazda3' FROM vehicle_makes WHERE slug = 'mazda' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'MX-30', 'mazda-mx-30', 'mx30' FROM vehicle_makes WHERE slug = 'mazda' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'CX-9', 'mazda-cx-9', 'cx9' FROM vehicle_makes WHERE slug = 'mazda' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'CX-5', 'mazda-cx-5', 'cx5' FROM vehicle_makes WHERE slug = 'mazda' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'CX-30', 'mazda-cx-30', 'cx30' FROM vehicle_makes WHERE slug = 'mazda' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'CX-50', 'mazda-cx-50', 'cx50' FROM vehicle_makes WHERE slug = 'mazda' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'CX-90', 'mazda-cx-90', 'cx90' FROM vehicle_makes WHERE slug = 'mazda' ON CONFLICT DO NOTHING;

-- ------------------------------------------------------------
-- HYUNDAI
-- ------------------------------------------------------------
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Sonata', 'hyundai-sonata', 'sonata' FROM vehicle_makes WHERE slug = 'hyundai' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Elantra', 'hyundai-elantra', 'elantra' FROM vehicle_makes WHERE slug = 'hyundai' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Accent', 'hyundai-accent', 'accent' FROM vehicle_makes WHERE slug = 'hyundai' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Venue', 'hyundai-venue', 'venue' FROM vehicle_makes WHERE slug = 'hyundai' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Elantra N', 'hyundai-elantra-n', 'elantran' FROM vehicle_makes WHERE slug = 'hyundai' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Ioniq 6', 'hyundai-ioniq-6', 'ioniq6' FROM vehicle_makes WHERE slug = 'hyundai' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Santa Fe', 'hyundai-santa-fe', 'santafe' FROM vehicle_makes WHERE slug = 'hyundai' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Tucson', 'hyundai-tucson', 'tucson' FROM vehicle_makes WHERE slug = 'hyundai' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Kona', 'hyundai-kona', 'kona' FROM vehicle_makes WHERE slug = 'hyundai' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Palisade', 'hyundai-palisade', 'palisade' FROM vehicle_makes WHERE slug = 'hyundai' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Ioniq 5', 'hyundai-ioniq-5', 'ioniq5' FROM vehicle_makes WHERE slug = 'hyundai' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Kona N', 'hyundai-kona-n', 'konan' FROM vehicle_makes WHERE slug = 'hyundai' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Santa Cruz', 'hyundai-santa-cruz', 'santacruz' FROM vehicle_makes WHERE slug = 'hyundai' ON CONFLICT DO NOTHING;

-- ------------------------------------------------------------
-- KIA
-- ------------------------------------------------------------
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Forte', 'kia-forte', 'forte' FROM vehicle_makes WHERE slug = 'kia' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'K5', 'kia-k5', 'k5' FROM vehicle_makes WHERE slug = 'kia' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Soul', 'kia-soul', 'soul' FROM vehicle_makes WHERE slug = 'kia' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Sorento', 'kia-sorento', 'sorento' FROM vehicle_makes WHERE slug = 'kia' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Sportage', 'kia-sportage', 'sportage' FROM vehicle_makes WHERE slug = 'kia' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Niro', 'kia-niro', 'niro' FROM vehicle_makes WHERE slug = 'kia' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Telluride', 'kia-telluride', 'telluride' FROM vehicle_makes WHERE slug = 'kia' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Seltos', 'kia-seltos', 'seltos' FROM vehicle_makes WHERE slug = 'kia' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Carnival', 'kia-carnival', 'carnival' FROM vehicle_makes WHERE slug = 'kia' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'EV6', 'kia-ev6', 'ev6' FROM vehicle_makes WHERE slug = 'kia' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'EV9', 'kia-ev9', 'ev9' FROM vehicle_makes WHERE slug = 'kia' ON CONFLICT DO NOTHING;

-- ------------------------------------------------------------
-- VOLKSWAGEN
-- ------------------------------------------------------------
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Jetta', 'volkswagen-jetta', 'jetta' FROM vehicle_makes WHERE slug = 'volkswagen' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Golf GTI', 'volkswagen-golf-gti', 'golfgti' FROM vehicle_makes WHERE slug = 'volkswagen' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Golf R', 'volkswagen-golf-r', 'golfr' FROM vehicle_makes WHERE slug = 'volkswagen' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Jetta GLI', 'volkswagen-jetta-gli', 'jettagli' FROM vehicle_makes WHERE slug = 'volkswagen' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Tiguan', 'volkswagen-tiguan', 'tiguan' FROM vehicle_makes WHERE slug = 'volkswagen' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Atlas', 'volkswagen-atlas', 'atlas' FROM vehicle_makes WHERE slug = 'volkswagen' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Atlas Cross Sport', 'volkswagen-atlas-cross-sport', 'atlascrosssport' FROM vehicle_makes WHERE slug = 'volkswagen' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'ID.4', 'volkswagen-id-4', 'id4' FROM vehicle_makes WHERE slug = 'volkswagen' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Taos', 'volkswagen-taos', 'taos' FROM vehicle_makes WHERE slug = 'volkswagen' ON CONFLICT DO NOTHING;

-- ------------------------------------------------------------
-- AUDI
-- ------------------------------------------------------------
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'A3', 'audi-a3', 'a3' FROM vehicle_makes WHERE slug = 'audi' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'A4', 'audi-a4', 'a4' FROM vehicle_makes WHERE slug = 'audi' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'A5', 'audi-a5', 'a5' FROM vehicle_makes WHERE slug = 'audi' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'A6', 'audi-a6', 'a6' FROM vehicle_makes WHERE slug = 'audi' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'A7', 'audi-a7', 'a7' FROM vehicle_makes WHERE slug = 'audi' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'A8 L', 'audi-a8-l', 'a8l' FROM vehicle_makes WHERE slug = 'audi' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'S3', 'audi-s3', 's3' FROM vehicle_makes WHERE slug = 'audi' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'S4', 'audi-s4', 's4' FROM vehicle_makes WHERE slug = 'audi' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'S5', 'audi-s5', 's5' FROM vehicle_makes WHERE slug = 'audi' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'S6', 'audi-s6', 's6' FROM vehicle_makes WHERE slug = 'audi' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'S7', 'audi-s7', 's7' FROM vehicle_makes WHERE slug = 'audi' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'S8', 'audi-s8', 's8' FROM vehicle_makes WHERE slug = 'audi' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'RS 3', 'audi-rs-3', 'rs3' FROM vehicle_makes WHERE slug = 'audi' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'RS 5', 'audi-rs-5', 'rs5' FROM vehicle_makes WHERE slug = 'audi' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'RS 7', 'audi-rs-7', 'rs7' FROM vehicle_makes WHERE slug = 'audi' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'RS 6 Avant', 'audi-rs-6-avant', 'rs6avant' FROM vehicle_makes WHERE slug = 'audi' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'A6 allroad', 'audi-a6-allroad', 'a6allroad' FROM vehicle_makes WHERE slug = 'audi' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'RS e-tron GT', 'audi-rs-e-tron-gt', 'rsetrongt' FROM vehicle_makes WHERE slug = 'audi' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'e-tron GT', 'audi-e-tron-gt', 'etrongt' FROM vehicle_makes WHERE slug = 'audi' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Q3', 'audi-q3', 'q3' FROM vehicle_makes WHERE slug = 'audi' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Q4', 'audi-q4', 'q4' FROM vehicle_makes WHERE slug = 'audi' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Q5', 'audi-q5', 'q5' FROM vehicle_makes WHERE slug = 'audi' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Q5 e', 'audi-q5-e', 'q5e' FROM vehicle_makes WHERE slug = 'audi' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Q7', 'audi-q7', 'q7' FROM vehicle_makes WHERE slug = 'audi' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Q8', 'audi-q8', 'q8' FROM vehicle_makes WHERE slug = 'audi' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'SQ5', 'audi-sq5', 'sq5' FROM vehicle_makes WHERE slug = 'audi' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'SQ7', 'audi-sq7', 'sq7' FROM vehicle_makes WHERE slug = 'audi' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'SQ8', 'audi-sq8', 'sq8' FROM vehicle_makes WHERE slug = 'audi' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'RS Q8', 'audi-rs-q8', 'rsq8' FROM vehicle_makes WHERE slug = 'audi' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'A4 allroad', 'audi-a4-allroad', 'a4allroad' FROM vehicle_makes WHERE slug = 'audi' ON CONFLICT DO NOTHING;

-- ------------------------------------------------------------
-- BMW
-- ------------------------------------------------------------
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, '228i', 'bmw-228i', '228i' FROM vehicle_makes WHERE slug = 'bmw' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, '230i', 'bmw-230i', '230i' FROM vehicle_makes WHERE slug = 'bmw' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'M235i', 'bmw-m235i', 'm235i' FROM vehicle_makes WHERE slug = 'bmw' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'M240i', 'bmw-m240i', 'm240i' FROM vehicle_makes WHERE slug = 'bmw' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, '330i', 'bmw-330i', '330i' FROM vehicle_makes WHERE slug = 'bmw' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, '330e', 'bmw-330e', '330e' FROM vehicle_makes WHERE slug = 'bmw' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, '340i', 'bmw-340i', '340i' FROM vehicle_makes WHERE slug = 'bmw' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'M340i', 'bmw-m340i', 'm340i' FROM vehicle_makes WHERE slug = 'bmw' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'M3', 'bmw-m3', 'm3' FROM vehicle_makes WHERE slug = 'bmw' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, '430i', 'bmw-430i', '430i' FROM vehicle_makes WHERE slug = 'bmw' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'M440i', 'bmw-m440i', 'm440i' FROM vehicle_makes WHERE slug = 'bmw' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'M4', 'bmw-m4', 'm4' FROM vehicle_makes WHERE slug = 'bmw' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, '530i', 'bmw-530i', '530i' FROM vehicle_makes WHERE slug = 'bmw' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, '540i', 'bmw-540i', '540i' FROM vehicle_makes WHERE slug = 'bmw' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, '750e', 'bmw-750e', '750e' FROM vehicle_makes WHERE slug = 'bmw' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, '740i', 'bmw-740i', '740i' FROM vehicle_makes WHERE slug = 'bmw' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, '760i', 'bmw-760i', '760i' FROM vehicle_makes WHERE slug = 'bmw' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, '840i', 'bmw-840i', '840i' FROM vehicle_makes WHERE slug = 'bmw' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'M850i', 'bmw-m850i', 'm850i' FROM vehicle_makes WHERE slug = 'bmw' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'M8', 'bmw-m8', 'm8' FROM vehicle_makes WHERE slug = 'bmw' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'M2', 'bmw-m2', 'm2' FROM vehicle_makes WHERE slug = 'bmw' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Z4', 'bmw-z4', 'z4' FROM vehicle_makes WHERE slug = 'bmw' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'i4', 'bmw-i4', 'i4' FROM vehicle_makes WHERE slug = 'bmw' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'i5', 'bmw-i5', 'i5' FROM vehicle_makes WHERE slug = 'bmw' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'i7', 'bmw-i7', 'i7' FROM vehicle_makes WHERE slug = 'bmw' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Alpina B8', 'bmw-alpina-b8', 'alpinab8' FROM vehicle_makes WHERE slug = 'bmw' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'X1', 'bmw-x1', 'x1' FROM vehicle_makes WHERE slug = 'bmw' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'X2', 'bmw-x2', 'x2' FROM vehicle_makes WHERE slug = 'bmw' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'X3', 'bmw-x3', 'x3' FROM vehicle_makes WHERE slug = 'bmw' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'X4', 'bmw-x4', 'x4' FROM vehicle_makes WHERE slug = 'bmw' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'X5', 'bmw-x5', 'x5' FROM vehicle_makes WHERE slug = 'bmw' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'X6', 'bmw-x6', 'x6' FROM vehicle_makes WHERE slug = 'bmw' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'X7', 'bmw-x7', 'x7' FROM vehicle_makes WHERE slug = 'bmw' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'iX', 'bmw-ix', 'ix' FROM vehicle_makes WHERE slug = 'bmw' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'XM', 'bmw-xm', 'xm' FROM vehicle_makes WHERE slug = 'bmw' ON CONFLICT DO NOTHING;

-- ------------------------------------------------------------
-- MERCEDES-BENZ
-- ------------------------------------------------------------
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'SL-Class', 'mercedes-benz-sl-class', 'slclass' FROM vehicle_makes WHERE slug = 'mercedes-benz' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'E-Class', 'mercedes-benz-e-class', 'eclass' FROM vehicle_makes WHERE slug = 'mercedes-benz' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'CLA-Class', 'mercedes-benz-cla-class', 'claclass' FROM vehicle_makes WHERE slug = 'mercedes-benz' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'C-Class', 'mercedes-benz-c-class', 'cclass' FROM vehicle_makes WHERE slug = 'mercedes-benz' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'S-Class', 'mercedes-benz-s-class', 'sclass' FROM vehicle_makes WHERE slug = 'mercedes-benz' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'AMG GT', 'mercedes-benz-amg-gt', 'amggt' FROM vehicle_makes WHERE slug = 'mercedes-benz' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'EQS-Class Sedan', 'mercedes-benz-eqs-class-sedan', 'eqsclasssedan' FROM vehicle_makes WHERE slug = 'mercedes-benz' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'EQE-Class Sedan', 'mercedes-benz-eqe-class-sedan', 'eqeclasssedan' FROM vehicle_makes WHERE slug = 'mercedes-benz' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'CLE', 'mercedes-benz-cle', 'cle' FROM vehicle_makes WHERE slug = 'mercedes-benz' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'GLA-Class', 'mercedes-benz-gla-class', 'glaclass' FROM vehicle_makes WHERE slug = 'mercedes-benz' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'G-Class', 'mercedes-benz-g-class', 'gclass' FROM vehicle_makes WHERE slug = 'mercedes-benz' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'GLC-Class', 'mercedes-benz-glc-class', 'glcclass' FROM vehicle_makes WHERE slug = 'mercedes-benz' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'GLE-Class', 'mercedes-benz-gle-class', 'gleclass' FROM vehicle_makes WHERE slug = 'mercedes-benz' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'GLS-Class', 'mercedes-benz-gls-class', 'glsclass' FROM vehicle_makes WHERE slug = 'mercedes-benz' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'GLB-Class', 'mercedes-benz-glb-class', 'glbclass' FROM vehicle_makes WHERE slug = 'mercedes-benz' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'EQB-Class', 'mercedes-benz-eqb-class', 'eqbclass' FROM vehicle_makes WHERE slug = 'mercedes-benz' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'EQS-Class SUV', 'mercedes-benz-eqs-class-suv', 'eqsclasssuv' FROM vehicle_makes WHERE slug = 'mercedes-benz' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'EQE-Class SUV', 'mercedes-benz-eqe-class-suv', 'eqeclasssuv' FROM vehicle_makes WHERE slug = 'mercedes-benz' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Sprinter', 'mercedes-benz-sprinter', 'sprinter' FROM vehicle_makes WHERE slug = 'mercedes-benz' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Metris', 'mercedes-benz-metris', 'metris' FROM vehicle_makes WHERE slug = 'mercedes-benz' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'eSprinter', 'mercedes-benz-esprinter', 'esprinter' FROM vehicle_makes WHERE slug = 'mercedes-benz' ON CONFLICT DO NOTHING;

-- ------------------------------------------------------------
-- LEXUS
-- ------------------------------------------------------------
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'IS', 'lexus-is', 'is' FROM vehicle_makes WHERE slug = 'lexus' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'ES', 'lexus-es', 'es' FROM vehicle_makes WHERE slug = 'lexus' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'GS', 'lexus-gs', 'gs' FROM vehicle_makes WHERE slug = 'lexus' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'LS', 'lexus-ls', 'ls' FROM vehicle_makes WHERE slug = 'lexus' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'RC', 'lexus-rc', 'rc' FROM vehicle_makes WHERE slug = 'lexus' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'LC', 'lexus-lc', 'lc' FROM vehicle_makes WHERE slug = 'lexus' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'UX', 'lexus-ux', 'ux' FROM vehicle_makes WHERE slug = 'lexus' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'LX', 'lexus-lx', 'lx' FROM vehicle_makes WHERE slug = 'lexus' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'RX', 'lexus-rx', 'rx' FROM vehicle_makes WHERE slug = 'lexus' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'GX', 'lexus-gx', 'gx' FROM vehicle_makes WHERE slug = 'lexus' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'NX', 'lexus-nx', 'nx' FROM vehicle_makes WHERE slug = 'lexus' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'RZ', 'lexus-rz', 'rz' FROM vehicle_makes WHERE slug = 'lexus' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'TX', 'lexus-tx', 'tx' FROM vehicle_makes WHERE slug = 'lexus' ON CONFLICT DO NOTHING;

-- ------------------------------------------------------------
-- ACURA
-- ------------------------------------------------------------
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Integra', 'acura-integra', 'integra' FROM vehicle_makes WHERE slug = 'acura' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'TLX', 'acura-tlx', 'tlx' FROM vehicle_makes WHERE slug = 'acura' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'ILX', 'acura-ilx', 'ilx' FROM vehicle_makes WHERE slug = 'acura' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'RLX', 'acura-rlx', 'rlx' FROM vehicle_makes WHERE slug = 'acura' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'ZDX', 'acura-zdx', 'zdx' FROM vehicle_makes WHERE slug = 'acura' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'RDX', 'acura-rdx', 'rdx' FROM vehicle_makes WHERE slug = 'acura' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'MDX', 'acura-mdx', 'mdx' FROM vehicle_makes WHERE slug = 'acura' ON CONFLICT DO NOTHING;

-- ------------------------------------------------------------
-- INFINITI
-- ------------------------------------------------------------
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Q50', 'infiniti-q50', 'q50' FROM vehicle_makes WHERE slug = 'infiniti' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'QX50', 'infiniti-qx50', 'qx50' FROM vehicle_makes WHERE slug = 'infiniti' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'QX55', 'infiniti-qx55', 'qx55' FROM vehicle_makes WHERE slug = 'infiniti' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'QX60', 'infiniti-qx60', 'qx60' FROM vehicle_makes WHERE slug = 'infiniti' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'QX80', 'infiniti-qx80', 'qx80' FROM vehicle_makes WHERE slug = 'infiniti' ON CONFLICT DO NOTHING;

-- ------------------------------------------------------------
-- GENESIS
-- ------------------------------------------------------------
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'G70', 'genesis-g70', 'g70' FROM vehicle_makes WHERE slug = 'genesis' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'G80', 'genesis-g80', 'g80' FROM vehicle_makes WHERE slug = 'genesis' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'G90', 'genesis-g90', 'g90' FROM vehicle_makes WHERE slug = 'genesis' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'GV60', 'genesis-gv60', 'gv60' FROM vehicle_makes WHERE slug = 'genesis' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'GV70', 'genesis-gv70', 'gv70' FROM vehicle_makes WHERE slug = 'genesis' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'GV80', 'genesis-gv80', 'gv80' FROM vehicle_makes WHERE slug = 'genesis' ON CONFLICT DO NOTHING;

-- ------------------------------------------------------------
-- VOLVO
-- ------------------------------------------------------------
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'S60', 'volvo-s60', 's60' FROM vehicle_makes WHERE slug = 'volvo' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'S90', 'volvo-s90', 's90' FROM vehicle_makes WHERE slug = 'volvo' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'V60', 'volvo-v60', 'v60' FROM vehicle_makes WHERE slug = 'volvo' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'XC40', 'volvo-xc40', 'xc40' FROM vehicle_makes WHERE slug = 'volvo' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'XC60', 'volvo-xc60', 'xc60' FROM vehicle_makes WHERE slug = 'volvo' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'XC90', 'volvo-xc90', 'xc90' FROM vehicle_makes WHERE slug = 'volvo' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'V60 Cross Country', 'volvo-v60-cross-country', 'v60crosscountry' FROM vehicle_makes WHERE slug = 'volvo' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'V90 Cross Country', 'volvo-v90-cross-country', 'v90crosscountry' FROM vehicle_makes WHERE slug = 'volvo' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'C40', 'volvo-c40', 'c40' FROM vehicle_makes WHERE slug = 'volvo' ON CONFLICT DO NOTHING;

-- ------------------------------------------------------------
-- MINI
-- ------------------------------------------------------------
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Clubman', 'mini-clubman', 'clubman' FROM vehicle_makes WHERE slug = 'mini' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Cooper Convertible', 'mini-cooper-convertible', 'cooperconvertible' FROM vehicle_makes WHERE slug = 'mini' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Hardtop', 'mini-hardtop', 'hardtop' FROM vehicle_makes WHERE slug = 'mini' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Countryman', 'mini-countryman', 'countryman' FROM vehicle_makes WHERE slug = 'mini' ON CONFLICT DO NOTHING;

-- ------------------------------------------------------------
-- LAND ROVER
-- ------------------------------------------------------------
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Discovery Sport', 'land-rover-discovery-sport', 'discoverysport' FROM vehicle_makes WHERE slug = 'land-rover' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Range Rover Evoque', 'land-rover-range-rover-evoque', 'rangeroverevoque' FROM vehicle_makes WHERE slug = 'land-rover' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Range Rover Sport', 'land-rover-range-rover-sport', 'rangeroversport' FROM vehicle_makes WHERE slug = 'land-rover' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Range Rover', 'land-rover-range-rover', 'rangerover' FROM vehicle_makes WHERE slug = 'land-rover' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Discovery', 'land-rover-discovery', 'discovery' FROM vehicle_makes WHERE slug = 'land-rover' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Defender', 'land-rover-defender', 'defender' FROM vehicle_makes WHERE slug = 'land-rover' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Range Rover Velar', 'land-rover-range-rover-velar', 'rangerovervelar' FROM vehicle_makes WHERE slug = 'land-rover' ON CONFLICT DO NOTHING;

-- ------------------------------------------------------------
-- JAGUAR
-- ------------------------------------------------------------
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'XF', 'jaguar-xf', 'xf' FROM vehicle_makes WHERE slug = 'jaguar' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'F-TYPE', 'jaguar-f-type', 'ftype' FROM vehicle_makes WHERE slug = 'jaguar' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'F-PACE', 'jaguar-f-pace', 'fpace' FROM vehicle_makes WHERE slug = 'jaguar' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'E-PACE', 'jaguar-e-pace', 'epace' FROM vehicle_makes WHERE slug = 'jaguar' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'I-PACE', 'jaguar-i-pace', 'ipace' FROM vehicle_makes WHERE slug = 'jaguar' ON CONFLICT DO NOTHING;

-- ------------------------------------------------------------
-- PORSCHE
-- ------------------------------------------------------------
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, '911', 'porsche-911', '911' FROM vehicle_makes WHERE slug = 'porsche' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Panamera', 'porsche-panamera', 'panamera' FROM vehicle_makes WHERE slug = 'porsche' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Taycan', 'porsche-taycan', 'taycan' FROM vehicle_makes WHERE slug = 'porsche' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, '718 Boxster', 'porsche-718-boxster', '718boxster' FROM vehicle_makes WHERE slug = 'porsche' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, '718 Spyder', 'porsche-718-spyder', '718spyder' FROM vehicle_makes WHERE slug = 'porsche' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, '718 Cayman', 'porsche-718-cayman', '718cayman' FROM vehicle_makes WHERE slug = 'porsche' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Cayenne', 'porsche-cayenne', 'cayenne' FROM vehicle_makes WHERE slug = 'porsche' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Macan', 'porsche-macan', 'macan' FROM vehicle_makes WHERE slug = 'porsche' ON CONFLICT DO NOTHING;

-- ------------------------------------------------------------
-- ALFA ROMEO
-- ------------------------------------------------------------
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Giulia (952)', 'alfa-romeo-giulia-952', 'giulia952' FROM vehicle_makes WHERE slug = 'alfa-romeo' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Tonale', 'alfa-romeo-tonale', 'tonale' FROM vehicle_makes WHERE slug = 'alfa-romeo' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Stelvio', 'alfa-romeo-stelvio', 'stelvio' FROM vehicle_makes WHERE slug = 'alfa-romeo' ON CONFLICT DO NOTHING;

-- ------------------------------------------------------------
-- MASERATI
-- ------------------------------------------------------------
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Quattroporte', 'maserati-quattroporte', 'quattroporte' FROM vehicle_makes WHERE slug = 'maserati' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Granturismo', 'maserati-granturismo', 'granturismo' FROM vehicle_makes WHERE slug = 'maserati' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Ghibli', 'maserati-ghibli', 'ghibli' FROM vehicle_makes WHERE slug = 'maserati' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'MC20', 'maserati-mc20', 'mc20' FROM vehicle_makes WHERE slug = 'maserati' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Grancabrio', 'maserati-grancabrio', 'grancabrio' FROM vehicle_makes WHERE slug = 'maserati' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Levante', 'maserati-levante', 'levante' FROM vehicle_makes WHERE slug = 'maserati' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Grecale', 'maserati-grecale', 'grecale' FROM vehicle_makes WHERE slug = 'maserati' ON CONFLICT DO NOTHING;

-- ------------------------------------------------------------
-- FERRARI
-- ------------------------------------------------------------
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, '812', 'ferrari-812', '812' FROM vehicle_makes WHERE slug = 'ferrari' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Roma', 'ferrari-roma', 'roma' FROM vehicle_makes WHERE slug = 'ferrari' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'SF90', 'ferrari-sf90', 'sf90' FROM vehicle_makes WHERE slug = 'ferrari' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Daytona SP3', 'ferrari-daytona-sp3', 'daytonasp3' FROM vehicle_makes WHERE slug = 'ferrari' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, '296', 'ferrari-296', '296' FROM vehicle_makes WHERE slug = 'ferrari' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Purosangue', 'ferrari-purosangue', 'purosangue' FROM vehicle_makes WHERE slug = 'ferrari' ON CONFLICT DO NOTHING;

-- ------------------------------------------------------------
-- LAMBORGHINI
-- ------------------------------------------------------------
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Huracan', 'lamborghini-huracan', 'huracan' FROM vehicle_makes WHERE slug = 'lamborghini' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Revuelto', 'lamborghini-revuelto', 'revuelto' FROM vehicle_makes WHERE slug = 'lamborghini' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Urus', 'lamborghini-urus', 'urus' FROM vehicle_makes WHERE slug = 'lamborghini' ON CONFLICT DO NOTHING;

-- ------------------------------------------------------------
-- FIAT
-- ------------------------------------------------------------
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, '124 Spider', 'fiat-124-spider', '124spider' FROM vehicle_makes WHERE slug = 'fiat' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, '500e', 'fiat-500e', '500e' FROM vehicle_makes WHERE slug = 'fiat' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, '500X', 'fiat-500x', '500x' FROM vehicle_makes WHERE slug = 'fiat' ON CONFLICT DO NOTHING;

-- ------------------------------------------------------------
-- MITSUBISHI
-- ------------------------------------------------------------
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Mirage', 'mitsubishi-mirage', 'mirage' FROM vehicle_makes WHERE slug = 'mitsubishi' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Mirage G4', 'mitsubishi-mirage-g4', 'mirageg4' FROM vehicle_makes WHERE slug = 'mitsubishi' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Outlander', 'mitsubishi-outlander', 'outlander' FROM vehicle_makes WHERE slug = 'mitsubishi' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Outlander Sport', 'mitsubishi-outlander-sport', 'outlandersport' FROM vehicle_makes WHERE slug = 'mitsubishi' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Eclipse Cross', 'mitsubishi-eclipse-cross', 'eclipsecross' FROM vehicle_makes WHERE slug = 'mitsubishi' ON CONFLICT DO NOTHING;

-- ------------------------------------------------------------
-- RIVIAN
-- ------------------------------------------------------------
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'R1S', 'rivian-r1s', 'r1s' FROM vehicle_makes WHERE slug = 'rivian' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'R1T', 'rivian-r1t', 'r1t' FROM vehicle_makes WHERE slug = 'rivian' ON CONFLICT DO NOTHING;

-- ------------------------------------------------------------
-- LUCID
-- ------------------------------------------------------------
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Air', 'lucid-air', 'air' FROM vehicle_makes WHERE slug = 'lucid' ON CONFLICT DO NOTHING;

-- ------------------------------------------------------------
-- POLESTAR
-- ------------------------------------------------------------
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'PS2', 'polestar-ps2', 'ps2' FROM vehicle_makes WHERE slug = 'polestar' ON CONFLICT DO NOTHING;

-- ------------------------------------------------------------
-- TESLA
-- ------------------------------------------------------------
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Model 3', 'tesla-model-3', 'model3' FROM vehicle_makes WHERE slug = 'tesla' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Model S', 'tesla-model-s', 'models' FROM vehicle_makes WHERE slug = 'tesla' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Model X', 'tesla-model-x', 'modelx' FROM vehicle_makes WHERE slug = 'tesla' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Model Y', 'tesla-model-y', 'modely' FROM vehicle_makes WHERE slug = 'tesla' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Cybertruck', 'tesla-cybertruck', 'cybertruck' FROM vehicle_makes WHERE slug = 'tesla' ON CONFLICT DO NOTHING;
INSERT INTO vehicle_models (make_id, name, slug, normalized_name) SELECT id, 'Semi', 'tesla-semi', 'semi' FROM vehicle_makes WHERE slug = 'tesla' ON CONFLICT DO NOTHING;

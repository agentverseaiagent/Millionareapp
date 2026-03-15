/**
 * US-market curated makes list for NHTSA sync.
 *
 * startYear: first model year to query (default: 2005)
 * endYear:   last model year to query (default: current year)
 *            Set explicitly for discontinued makes so we don't waste queries
 *            on years where they produced nothing.
 * discontinuedInUs: true if the make no longer sells new vehicles in the US.
 *
 * Excluded intentionally:
 *   - Isuzu (exited US passenger car market 2009; minimal active community)
 *   - Suzuki (exited US market 2013; small active community)
 *   - Fisker (bankrupt; no active production)
 *   - McLaren, Bentley, Rolls-Royce, Aston Martin, Lotus
 *     (sold in US but ultra-low volume; community too small to prioritize)
 *
 * To verify an NHTSA make name:
 *   curl "https://vpic.nhtsa.dot.gov/api/vehicles/GetAllMakes?format=json" \
 *     | grep -i "mercedes"
 */

export interface MakeConfig {
  slug: string;
  displayName: string;
  nhtsaName: string;           // exact name for NHTSA API path
  startYear?: number;          // default: 2005
  endYear?: number;            // default: current year
  discontinuedInUs?: boolean;  // true = no longer sold new in US
}

const CURRENT_YEAR = new Date().getFullYear();

export { CURRENT_YEAR };

export const MAKES_CONFIG: MakeConfig[] = [
  // ── US domestic — currently sold ─────────────────────────────────
  { slug: 'ford',         displayName: 'Ford',         nhtsaName: 'ford' },
  { slug: 'chevrolet',    displayName: 'Chevrolet',    nhtsaName: 'chevrolet' },
  { slug: 'gmc',          displayName: 'GMC',          nhtsaName: 'gmc' },
  { slug: 'ram',          displayName: 'Ram',          nhtsaName: 'ram',          startYear: 2010 },
  { slug: 'jeep',         displayName: 'Jeep',         nhtsaName: 'jeep' },
  { slug: 'dodge',        displayName: 'Dodge',        nhtsaName: 'dodge' },
  { slug: 'lincoln',      displayName: 'Lincoln',      nhtsaName: 'lincoln' },
  { slug: 'cadillac',     displayName: 'Cadillac',     nhtsaName: 'cadillac' },
  { slug: 'buick',        displayName: 'Buick',        nhtsaName: 'buick' },
  { slug: 'chrysler',     displayName: 'Chrysler',     nhtsaName: 'chrysler' },

  // ── Japanese mass-market ─────────────────────────────────────────
  { slug: 'honda',        displayName: 'Honda',        nhtsaName: 'honda' },
  { slug: 'toyota',       displayName: 'Toyota',       nhtsaName: 'toyota' },
  { slug: 'nissan',       displayName: 'Nissan',       nhtsaName: 'nissan' },
  { slug: 'mazda',        displayName: 'Mazda',        nhtsaName: 'mazda' },
  { slug: 'subaru',       displayName: 'Subaru',       nhtsaName: 'subaru' },
  { slug: 'mitsubishi',   displayName: 'Mitsubishi',   nhtsaName: 'mitsubishi' },

  // ── Japanese luxury ──────────────────────────────────────────────
  { slug: 'lexus',        displayName: 'Lexus',        nhtsaName: 'lexus' },
  { slug: 'acura',        displayName: 'Acura',        nhtsaName: 'acura' },
  { slug: 'infiniti',     displayName: 'Infiniti',     nhtsaName: 'infiniti' },

  // ── Korean ───────────────────────────────────────────────────────
  { slug: 'hyundai',      displayName: 'Hyundai',      nhtsaName: 'hyundai' },
  { slug: 'kia',          displayName: 'Kia',          nhtsaName: 'kia' },
  { slug: 'genesis',      displayName: 'Genesis',      nhtsaName: 'genesis',      startYear: 2017 },

  // ── German ───────────────────────────────────────────────────────
  { slug: 'volkswagen',   displayName: 'Volkswagen',   nhtsaName: 'volkswagen' },
  { slug: 'bmw',          displayName: 'BMW',          nhtsaName: 'bmw' },
  { slug: 'mercedes-benz',displayName: 'Mercedes-Benz',nhtsaName: 'mercedes-benz' },
  { slug: 'audi',         displayName: 'Audi',         nhtsaName: 'audi' },
  { slug: 'porsche',      displayName: 'Porsche',      nhtsaName: 'porsche' },
  { slug: 'mini',         displayName: 'MINI',         nhtsaName: 'mini',         startYear: 2002 },

  // ── Swedish ──────────────────────────────────────────────────────
  { slug: 'volvo',        displayName: 'Volvo',        nhtsaName: 'volvo' },

  // ── British (with meaningful US sales volume) ────────────────────
  { slug: 'land-rover',   displayName: 'Land Rover',   nhtsaName: 'land rover' },
  { slug: 'jaguar',       displayName: 'Jaguar',       nhtsaName: 'jaguar' },

  // ── Italian ──────────────────────────────────────────────────────
  { slug: 'alfa-romeo',   displayName: 'Alfa Romeo',   nhtsaName: 'alfa romeo',   startYear: 2015 },
  { slug: 'fiat',         displayName: 'Fiat',         nhtsaName: 'fiat',         startYear: 2012 },
  { slug: 'ferrari',      displayName: 'Ferrari',      nhtsaName: 'ferrari',      startYear: 2010 },
  { slug: 'lamborghini',  displayName: 'Lamborghini',  nhtsaName: 'lamborghini',  startYear: 2010 },
  { slug: 'maserati',     displayName: 'Maserati',     nhtsaName: 'maserati',     startYear: 2010 },

  // ── US-based EV / new entrants ───────────────────────────────────
  { slug: 'tesla',        displayName: 'Tesla',        nhtsaName: 'tesla',        startYear: 2012 },
  { slug: 'rivian',       displayName: 'Rivian',       nhtsaName: 'rivian',       startYear: 2022 },
  { slug: 'lucid',        displayName: 'Lucid',        nhtsaName: 'lucid',        startYear: 2022 },
  { slug: 'polestar',     displayName: 'Polestar',     nhtsaName: 'polestar',     startYear: 2020 },

  // ── Discontinued — kept for active US owner communities ──────────
  // Ram trucks were badged as Dodge Ram until the Ram brand split in 2010.
  // Querying Dodge back to 2005 captures that era naturally.
  { slug: 'pontiac',  displayName: 'Pontiac',  nhtsaName: 'pontiac',  startYear: 2005, endYear: 2010, discontinuedInUs: true },
  { slug: 'saturn',   displayName: 'Saturn',   nhtsaName: 'saturn',   startYear: 2005, endYear: 2010, discontinuedInUs: true },
  { slug: 'scion',    displayName: 'Scion',    nhtsaName: 'scion',    startYear: 2005, endYear: 2016, discontinuedInUs: true },
  { slug: 'hummer',   displayName: 'Hummer',   nhtsaName: 'hummer',   startYear: 2005, endYear: 2010, discontinuedInUs: true },
];

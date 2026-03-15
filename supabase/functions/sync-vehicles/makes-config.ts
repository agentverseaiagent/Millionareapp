/**
 * Curated list of ~50 consumer-facing makes to sync from NHTSA.
 * nhtsaName must match the Make_Name string returned by NHTSA's GetAllMakes endpoint
 * (case-insensitive in the URL, but must be spelled correctly).
 *
 * To verify any name:
 *   curl "https://vpic.nhtsa.dot.gov/api/vehicles/GetAllMakes?format=json" \
 *     | jq '.Results[] | select(.Make_Name | test("ram"; "i"))'
 */

export interface MakeConfig {
  slug: string;        // canonical slug in vehicle_makes table
  displayName: string; // display name in vehicle_makes.name
  nhtsaName: string;   // string passed to GetModelsForMake/{nhtsaName}
}

export const MAKES_CONFIG: MakeConfig[] = [
  // ── Domestic mass-market ──────────────────────────────────────────
  { slug: 'ford',        displayName: 'Ford',       nhtsaName: 'ford' },
  { slug: 'chevrolet',   displayName: 'Chevrolet',  nhtsaName: 'chevrolet' },
  { slug: 'gmc',         displayName: 'GMC',        nhtsaName: 'gmc' },
  { slug: 'ram',         displayName: 'Ram',        nhtsaName: 'ram' },
  { slug: 'jeep',        displayName: 'Jeep',       nhtsaName: 'jeep' },
  { slug: 'dodge',       displayName: 'Dodge',      nhtsaName: 'dodge' },
  { slug: 'chrysler',    displayName: 'Chrysler',   nhtsaName: 'chrysler' },
  { slug: 'buick',       displayName: 'Buick',      nhtsaName: 'buick' },
  { slug: 'cadillac',    displayName: 'Cadillac',   nhtsaName: 'cadillac' },
  { slug: 'lincoln',     displayName: 'Lincoln',    nhtsaName: 'lincoln' },

  // ── Japanese mass-market ──────────────────────────────────────────
  { slug: 'honda',       displayName: 'Honda',      nhtsaName: 'honda' },
  { slug: 'toyota',      displayName: 'Toyota',     nhtsaName: 'toyota' },
  { slug: 'nissan',      displayName: 'Nissan',     nhtsaName: 'nissan' },
  { slug: 'mazda',       displayName: 'Mazda',      nhtsaName: 'mazda' },
  { slug: 'subaru',      displayName: 'Subaru',     nhtsaName: 'subaru' },
  { slug: 'mitsubishi',  displayName: 'Mitsubishi', nhtsaName: 'mitsubishi' },
  { slug: 'isuzu',       displayName: 'Isuzu',      nhtsaName: 'isuzu' },
  { slug: 'suzuki',      displayName: 'Suzuki',     nhtsaName: 'suzuki' },

  // ── Japanese luxury ───────────────────────────────────────────────
  { slug: 'lexus',       displayName: 'Lexus',      nhtsaName: 'lexus' },
  { slug: 'acura',       displayName: 'Acura',      nhtsaName: 'acura' },
  { slug: 'infiniti',    displayName: 'Infiniti',   nhtsaName: 'infiniti' },

  // ── Korean ────────────────────────────────────────────────────────
  { slug: 'hyundai',     displayName: 'Hyundai',    nhtsaName: 'hyundai' },
  { slug: 'kia',         displayName: 'Kia',        nhtsaName: 'kia' },
  { slug: 'genesis',     displayName: 'Genesis',    nhtsaName: 'genesis' },

  // ── German ────────────────────────────────────────────────────────
  { slug: 'volkswagen',  displayName: 'Volkswagen', nhtsaName: 'volkswagen' },
  { slug: 'bmw',         displayName: 'BMW',        nhtsaName: 'bmw' },
  { slug: 'mercedes-benz', displayName: 'Mercedes-Benz', nhtsaName: 'mercedes-benz' },
  { slug: 'audi',        displayName: 'Audi',       nhtsaName: 'audi' },
  { slug: 'porsche',     displayName: 'Porsche',    nhtsaName: 'porsche' },
  { slug: 'mini',        displayName: 'MINI',       nhtsaName: 'mini' },

  // ── Swedish ───────────────────────────────────────────────────────
  { slug: 'volvo',       displayName: 'Volvo',      nhtsaName: 'volvo' },

  // ── British ───────────────────────────────────────────────────────
  { slug: 'land-rover',  displayName: 'Land Rover', nhtsaName: 'land rover' },
  { slug: 'jaguar',      displayName: 'Jaguar',     nhtsaName: 'jaguar' },
  { slug: 'bentley',     displayName: 'Bentley',    nhtsaName: 'bentley' },
  { slug: 'rolls-royce', displayName: 'Rolls-Royce', nhtsaName: 'rolls-royce' },
  { slug: 'mclaren',     displayName: 'McLaren',    nhtsaName: 'mclaren' },
  { slug: 'aston-martin', displayName: 'Aston Martin', nhtsaName: 'aston martin' },
  { slug: 'lotus',       displayName: 'Lotus',      nhtsaName: 'lotus' },

  // ── Italian ───────────────────────────────────────────────────────
  { slug: 'ferrari',     displayName: 'Ferrari',    nhtsaName: 'ferrari' },
  { slug: 'lamborghini', displayName: 'Lamborghini', nhtsaName: 'lamborghini' },
  { slug: 'maserati',    displayName: 'Maserati',   nhtsaName: 'maserati' },
  { slug: 'alfa-romeo',  displayName: 'Alfa Romeo', nhtsaName: 'alfa romeo' },
  { slug: 'fiat',        displayName: 'Fiat',       nhtsaName: 'fiat' },

  // ── Electric / new entrants ───────────────────────────────────────
  { slug: 'tesla',       displayName: 'Tesla',      nhtsaName: 'tesla' },
  { slug: 'rivian',      displayName: 'Rivian',     nhtsaName: 'rivian' },
  { slug: 'lucid',       displayName: 'Lucid',      nhtsaName: 'lucid' },
  { slug: 'polestar',    displayName: 'Polestar',   nhtsaName: 'polestar' },
  { slug: 'fisker',      displayName: 'Fisker',     nhtsaName: 'fisker' },

  // ── Discontinued but large active communities ─────────────────────
  { slug: 'pontiac',     displayName: 'Pontiac',    nhtsaName: 'pontiac' },
  { slug: 'scion',       displayName: 'Scion',      nhtsaName: 'scion' },
  { slug: 'saturn',      displayName: 'Saturn',     nhtsaName: 'saturn' },
];

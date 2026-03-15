/** NHTSA vPIC API client — https://vpic.nhtsa.dot.gov/api/ */

const NHTSA_BASE = 'https://vpic.nhtsa.dot.gov/api/vehicles';

export interface NHTSAModel {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
}

/**
 * Fetch all models for a specific make + model year from NHTSA vPIC.
 *
 * Uses GetModelsForMakeYear which only returns models that received a NHTSA
 * vehicle certification for that year — this is inherently US-market focused
 * because NHTSA only covers vehicles imported or manufactured for US sale.
 *
 * Returns an empty array (not an error) when the make/year combination has
 * no data (e.g. a discontinued make queried after its last production year).
 */
export async function fetchModelsForMakeYear(
  nhtsaName: string,
  year: number,
): Promise<NHTSAModel[]> {
  const encoded = encodeURIComponent(nhtsaName);
  const url = `${NHTSA_BASE}/GetModelsForMakeYear/make/${encoded}/modelyear/${year}?format=json`;

  const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
  if (!res.ok) {
    throw new Error(`NHTSA HTTP ${res.status} for ${nhtsaName}/${year}`);
  }
  const data = await res.json();
  return Array.isArray(data.Results) ? data.Results : [];
}

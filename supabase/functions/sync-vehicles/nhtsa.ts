/** NHTSA vPIC API client — https://vpic.nhtsa.dot.gov/api/ */

const NHTSA_BASE = 'https://vpic.nhtsa.dot.gov/api/vehicles';

export interface NHTSAModel {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
}

/**
 * Fetch all models for a make name from the NHTSA vPIC API.
 * Returns an empty array (not an error) when the make is unknown or has no data.
 */
export async function fetchModelsForMake(nhtsaName: string): Promise<NHTSAModel[]> {
  const url = `${NHTSA_BASE}/GetModelsForMake/${encodeURIComponent(nhtsaName)}?format=json`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`NHTSA HTTP ${res.status} for make: ${nhtsaName}`);
  }
  const data = await res.json();
  return Array.isArray(data.Results) ? data.Results : [];
}

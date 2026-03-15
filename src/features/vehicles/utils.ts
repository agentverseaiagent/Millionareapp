/**
 * Normalizes a user-entered vehicle query for alias and name matching.
 * "CR-V" → "crv", "Honda CRV" → "hondacrv", "model 3" → "model3"
 */
export function normalizeQuery(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
}

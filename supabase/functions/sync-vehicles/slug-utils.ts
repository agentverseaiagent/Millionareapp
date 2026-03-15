/**
 * Shared slug and normalization utilities.
 * Must stay in sync with src/features/vehicles/utils.ts normalizeQuery().
 */

/** "CR-V" → "cr-v", "Grand Cherokee" → "grand-cherokee", "F-150" → "f-150" */
export function toSlug(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** "CR-V" → "crv", "cx-5" → "cx5", "F-150" → "f150" (matches normalizeQuery in app) */
export function toNormalized(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

/** "honda" + "CR-V" → "honda-cr-v" */
export function toModelSlug(makeSlug: string, modelName: string): string {
  return `${makeSlug}-${toSlug(modelName)}`;
}

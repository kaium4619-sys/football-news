/**
 * Converts a string to a clean URL slug:
 * - lowercases
 * - normalises accents (é → e, ñ → n, etc.)
 * - replaces spaces / non-alphanumeric chars with hyphens
 * - collapses repeated hyphens
 * - trims leading/trailing hyphens
 *
 * Examples:
 *   "Premier League"   → "premier-league"
 *   "Copa América"     → "copa-america"
 *   "Vinícius Júnior"  → "vinicius-junior"
 *   "AFC Asian Cup"    → "afc-asian-cup"
 */
export function slugify(str: string): string {
  return str
    .normalize("NFD")                      // decompose accented characters
    .replace(/[\u0300-\u036f]/g, "")       // strip diacritic marks
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")         // remove anything that isn't letter/digit/space/hyphen
    .trim()
    .replace(/[\s]+/g, "-")               // spaces → hyphens
    .replace(/-+/g, "-");                 // collapse repeated hyphens
}

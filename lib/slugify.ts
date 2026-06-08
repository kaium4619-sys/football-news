/**
 * Converts a string to a clean URL slug:
 * - substitutes special non-decomposing characters (Ø→o, ß→ss, Æ→ae, ı→i, etc.)
 * - lowercases
 * - normalises accents (é → e, ñ → n, etc.) via NFD
 * - replaces spaces / non-alphanumeric chars with hyphens
 * - collapses repeated hyphens
 * - trims leading/trailing hyphens
 *
 * Examples:
 *   "Premier League"   → "premier-league"
 *   "Copa América"     → "copa-america"
 *   "Vinícius Júnior"  → "vinicius-junior"
 *   "Martin Ødegaard"  → "martin-odegaard"
 *   "Rasmus Højlund"   → "rasmus-hojlund"
 *   "Kenan Yıldız"     → "kenan-yildiz"
 *   "AFC Asian Cup"    → "afc-asian-cup"
 */

/**
 * Characters that NFD cannot decompose into a plain ASCII base letter.
 * These must be replaced explicitly before the NFD normalization step.
 */
const SPECIAL_CHAR_MAP: Record<string, string> = {
  // Nordic / Germanic
  Ø: "o", ø: "o",
  Æ: "ae", æ: "ae",
  Å: "a", å: "a",
  ß: "ss",
  Ð: "d", ð: "d",
  Þ: "th", þ: "th",
  // Polish
  Ł: "l", ł: "l",
  // Croatian / Bosnian / Serbian
  Đ: "d", đ: "d",
  // Turkish
  İ: "i", ı: "i",    // dotted I & dotless i
  Ş: "s", ş: "s",
  Ğ: "g", ğ: "g",
  // Other
  Œ: "oe", œ: "oe",
  Ŋ: "n", ŋ: "n",
};

const SPECIAL_CHAR_REGEX = new RegExp(
  Object.keys(SPECIAL_CHAR_MAP).join("|"),
  "g"
);

export function slugify(str: string): string {
  return str
    .replace(SPECIAL_CHAR_REGEX, (ch) => SPECIAL_CHAR_MAP[ch] ?? ch)  // explicit substitutions first
    .normalize("NFD")                      // decompose remaining accented characters
    .replace(/[\u0300-\u036f]/g, "")       // strip diacritic marks
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")         // remove anything that isn't letter/digit/space/hyphen
    .trim()
    .replace(/[\s]+/g, "-")               // spaces → hyphens
    .replace(/-+/g, "-");                 // collapse repeated hyphens
}

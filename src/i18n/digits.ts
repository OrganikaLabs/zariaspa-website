/**
 * Convert ASCII digits (0-9) inside a string to the localized digit set
 * for Arabic / Dari / Pashto. Latin digits inside URLs, emails or HTML-ish
 * tokens are left untouched.
 */
const DIGIT_MAPS: Record<string, string[]> = {
  // Eastern Arabic-Indic (used in Arabic)
  ar: ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"],
  // Extended Arabic-Indic (used in Persian/Dari + Pashto)
  fa: ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"],
  ps: ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"],
};

const SKIP_TOKEN = /(\bhttps?:\/\/\S+|\b[\w.+-]+@[\w-]+\.[\w.-]+|<[^>]+>|&#?\w+;)/g;

export function localizeDigits(input: string, lng: string): string {
  const map = DIGIT_MAPS[lng];
  if (!map || typeof input !== "string") return input;
  // Split out URLs / emails / entities so we don't transliterate them
  return input
    .split(SKIP_TOKEN)
    .map((part, i) => {
      // Odd indices are the matched skip-tokens
      if (i % 2 === 1) return part;
      return part.replace(/[0-9]/g, (d) => map[Number(d)]);
    })
    .join("");
}

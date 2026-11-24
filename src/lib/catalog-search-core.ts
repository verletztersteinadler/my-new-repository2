/**
 * Pure catalog-search matching helpers. No server or network dependencies:
 * the same search works in the statically exported ISPmanager site.
 */
export function normalizeCatalogText(input: string): string {
  return input
    .toLocaleLowerCase("ru-RU")
    .replace(/ё/g, "е")
    .replace(/[^a-zа-я0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

export function catalogMatchScore(haystack: string, rawQuery: string): number {
  const q = normalizeCatalogText(rawQuery);
  if (!q) return -1;
  const text = normalizeCatalogText(haystack);
  if (!text) return -1;
  const parts = q.split(" ");
  if (!parts.every((part) => text.includes(part))) return -1;
  if (text === q) return 100;
  if (text.startsWith(q)) return 80;
  if (text.includes(" " + q)) return 60;
  if (text.includes(q)) return 40;
  return 20;
}

/**
 * Search-only alternative spellings of manufacturer brands.
 * Canonical display names and URL slugs never change.
 */
const brandAliases: Readonly<Record<string, readonly string[]>> = {
  teplofor: ["теплофор"],
};

export function manufacturerSearchAliases(slug: string): readonly string[] {
  return brandAliases[slug] ?? [];
}

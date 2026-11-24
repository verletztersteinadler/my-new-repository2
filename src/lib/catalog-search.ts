import { displaySeriesName } from "@/lib/series-names";
import { manufacturerSearchAliases } from "@/lib/catalog-brand-aliases";
import { manufacturers } from "@/data/manufacturers";
import { publishedCatalogs } from "@/data/series-index";
import { catalogMatchScore, normalizeCatalogText } from "@/lib/catalog-search-core";

export { normalizeCatalogText } from "@/lib/catalog-search-core";

export type CatalogHit = {
  kind: "manufacturer" | "series" | "model";
  slug: string;
  title: string;
  subtitle: string;
  seriesId?: string;
  searchText: string;
};

const items: CatalogHit[] = [
  ...manufacturers.map((maker) => ({
    kind: "manufacturer" as const,
    slug: maker.slug,
    title: maker.title,
    subtitle: "Производитель",
    searchText: [maker.title, maker.name, maker.slug, maker.place, ...manufacturerSearchAliases(maker.slug)].join(" "),
  })),
  ...publishedCatalogs.flatMap((catalog) =>
    catalog.series.flatMap((series): CatalogHit[] => {
      const main: CatalogHit = {
        kind: "series",
        slug: catalog.slug,
        seriesId: series.id,
        title: displaySeriesName(catalog.title, series.name),
        subtitle: catalog.title + " · Серия",
        searchText: [catalog.title, ...manufacturerSearchAliases(catalog.slug), series.name, series.id, series.kind, ...series.aliases].join(" "),
      };
      const sizes: CatalogHit[] = series.sizes.map((size) => ({
        kind: "model",
        slug: catalog.slug,
        seriesId: series.id,
        title: size.name,
        subtitle: catalog.title + " · " + series.name + " · Типоразмер",
        searchText: [catalog.title, ...manufacturerSearchAliases(catalog.slug), series.name, series.id, size.name, size.id, ...series.aliases].join(" "),
      }));
      return [main, ...sizes];
    }),
  ),
];

function rank(hit: CatalogHit, query: string): number {
  const normalized = normalizeCatalogText(query);
  const titleScore = catalogMatchScore(hit.title, normalized);
  const allScore = catalogMatchScore(hit.searchText, normalized);
  if (allScore < 0) return -1;
  // Favor exact names and existing producer cards over loose description hits.
  const typeBonus = hit.kind === "manufacturer" ? 12 : hit.kind === "series" ? 8 : 4;
  return (titleScore < 0 ? allScore : titleScore + 24) + typeBonus;
}

export function findCatalogHits(rawQuery: string, limit = 7): CatalogHit[] {
  const query = normalizeCatalogText(rawQuery).slice(0, 80);
  if (!query) return [];
  return items
    .map((hit) => ({ hit, score: rank(hit, query) }))
    .filter((item) => item.score >= 0)
    .sort((a, b) => b.score - a.score || a.hit.title.localeCompare(b.hit.title, "ru"))
    .slice(0, Math.max(0, limit))
    .map(({ hit }) => hit);
}

/** Covers manufacturer, series names, aliases and actual model designations. */
export function matchingManufacturerSlugs(rawQuery: string): Set<string> {
  const query = normalizeCatalogText(rawQuery).slice(0, 80);
  const matches = new Set<string>();
  if (!query) return matches;
  for (const hit of items) if (rank(hit, query) >= 0) matches.add(hit.slug);
  return matches;
}

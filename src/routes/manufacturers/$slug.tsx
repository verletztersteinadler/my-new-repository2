import { createFileRoute, notFound } from "@tanstack/react-router";
import { CatalogPage } from "@/components/catalog-page";
import { manufacturerBySlug } from "@/data/manufacturers";
import { publishedSlugs } from "@/data/published-slugs";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const publishedSlugSet = new Set(publishedSlugs.map((item) => item.slug));

export type CatalogSearch = {
  type?: string;
  q?: string;
  fuel?: string;
  power?: string;
  steam?: string;
  sort?: string;
  series?: string;
  size?: string;
  ask?: string;
  accepted?: string;
};

function read(value: unknown, max = 80) {
  if (typeof value !== "string") return undefined;
  const text = value.trim().slice(0, max);
  return text || undefined;
}

export const Route = createFileRoute("/manufacturers/$slug")({
  validateSearch: (search: Record<string, unknown>): CatalogSearch => ({
    type: read(search.type, 20),
    q: read(search.q, 80),
    fuel: read(search.fuel, 20),
    power: read(search.power, 20),
    steam: read(search.steam, 20),
    sort: read(search.sort, 20),
    series: read(search.series, 40),
    size: read(search.size, 60),
    ask: read(search.ask, 4),
    accepted: read(search.accepted, 40),
  }),
  loader: ({ params }) => {
    const maker = manufacturerBySlug(params.slug);
    if (!maker) throw notFound();
    return maker;
  },
  head: ({ loaderData }) => {
    const slug = loaderData?.slug ?? "";
    const canonical = `${SITE_URL}/manufacturers/${slug}`;
    const published = publishedSlugSet.has(slug);
    const title = published
      ? `Серии ${loaderData?.title} в независимом справочнике`
      : `${loaderData?.title ?? "Производитель"} — карточка справочника`;
    const description = published
      ? "Открытые сведения о сериях. Станция не является сайтом производителя и не предлагает купить оборудование."
      : "Информация на сайте производителя не предоставлена. Карточка не назначает модели.";
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: title,
      description,
      url: canonical,
      inLanguage: "ru",
      isPartOf: { "@type": "WebSite", "@id": `${SITE_URL}/#website`, url: `${SITE_URL}/`, name: SITE_NAME },
      about: { "@type": "Organization", name: loaderData?.title ?? slug },
    };
    return {
      meta: [
        { title },
        { name: "description", content: description },
      ],
      links: [{ rel: "canonical", href: canonical }],
      scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
    };
  },
  component: ManufacturerRoute,
});

function ManufacturerRoute() {
  const maker = Route.useLoaderData();
  if (!maker) return null;
  return <CatalogPage />;
}

import { createFileRoute, notFound } from "@tanstack/react-router";
import { CatalogPage } from "@/components/catalog-page";
import { manufacturerBySlug } from "@/data/manufacturers";
import { publishedCatalogs } from "@/data/series-index";
import { manufacturerSeo } from "@/lib/seo";

export type CatalogSearch = {
  type?: string;
  q?: string;
  fuel?: string;
  power?: string;
  steam?: string;
  sort?: string;
  series?: string;
  ask?: string;
  accepted?: string;
};

function read(value: unknown, max = 80) {
  if (typeof value !== "string") return undefined;
  const valueText = value.trim().slice(0, max);
  return valueText || undefined;
}

export const Route = createFileRoute("/$slug")({
  validateSearch: (search: Record<string, unknown>): CatalogSearch => ({
    type: read(search.type, 20),
    q: read(search.q),
    fuel: read(search.fuel, 20),
    power: read(search.power, 20),
    steam: read(search.steam, 20),
    sort: read(search.sort, 20),
    series: read(search.series, 40),
    ask: read(search.ask, 4),
    accepted: read(search.accepted, 40),
  }),
  loader: ({ params }) => {
    const maker = manufacturerBySlug(params.slug);
    if (!maker) throw notFound();
    return maker;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ name: "robots", content: "noindex,follow" }] };
    const maker = loaderData;
    const seo = manufacturerSeo(
      maker,
      publishedCatalogs.some((catalog) => catalog.slug === maker.slug && catalog.series.length > 0),
    );
    return {
      meta: [
        { title: seo.title },
        { name: "description", content: seo.description },
        { name: "robots", content: "index,follow,max-image-preview:large" },
        { property: "og:title", content: seo.title },
        { property: "og:description", content: seo.description },
        { property: "og:url", content: seo.url },
        { property: "og:type", content: "website" },
        { name: "twitter:title", content: seo.title },
        { name: "twitter:description", content: seo.description },
      ],
      links: [{ rel: "canonical", href: seo.url }],
    };
  },
  component: ManufacturerRoute,
});

function ManufacturerRoute() {
  const maker = Route.useLoaderData();
  if (!maker) return null;
  return <CatalogPage />;
}

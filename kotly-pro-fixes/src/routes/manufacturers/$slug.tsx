import { createFileRoute, notFound } from "@tanstack/react-router";
import { CatalogPage } from "@/components/catalog-page";
import { SITE_ORIGIN } from "@/data/catalog";
import { manufacturerBySlug } from "@/data/manufacturers";
import { publishedCatalogs } from "@/data/series-index";

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
    ask: read(search.ask, 4),
    accepted: read(search.accepted, 40),
  }),
  loader: ({ params }) => {
    const maker = manufacturerBySlug(params.slug);
    if (!maker) throw notFound();
    return maker;
  },
  head: ({ loaderData, params }) => ({
    links: [
      { rel: "canonical", href: `${SITE_ORIGIN}/manufacturers/${params.slug}/` },
    ],
    meta: [
      {
        title: publishedCatalogs.some((item) => item.slug === loaderData?.slug)
          ? `Серии ${loaderData?.title} в независимом справочнике`
          : `${loaderData?.title ?? "Производитель"} — карточка справочника`,
      },
      {
        name: "description",
        content: publishedCatalogs.some((item) => item.slug === loaderData?.slug)
          ? "Открытые сведения о сериях. Страница не является сайтом производителя и не предлагает купить оборудование."
          : "Информация на сайте производителя не предоставлена. Карточка не назначает модели.",
      },
    ],
  }),
  component: ManufacturerRoute,
});

function ManufacturerRoute() {
  const maker = Route.useLoaderData();
  if (!maker) return null;
  return <CatalogPage />;
}

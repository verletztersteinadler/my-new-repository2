import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/home-page";

export type HomeSearch = {
  q?: string;
  region?: string;
  line?: string;
};

const regions = new Set(["ru", "cis", "tr", "eu", "us", "other"]);
const lines = new Set(["boiler", "burner", "air"]);

function read(value: unknown, max = 80) {
  if (typeof value !== "string") return undefined;
  const text = value.trim().slice(0, max);
  return text || undefined;
}

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): HomeSearch => ({
    q: read(search.q),
    region: regions.has(String(search.region)) ? String(search.region) : undefined,
    line: lines.has(String(search.line)) ? String(search.line) : undefined,
  }),
  component: HomePage,
  head: () => ({
    meta: [
      { title: "Промышленные котлы и котельное оборудование — подбор и запрос КП | kotly.pro" },
      {
        name: "description",
        content: "Подбор промышленных котлов, горелок и котельного оборудования для закупки: производители, серии, мощность, топливо, сравнение аналогов и запрос коммерческих условий.",
      },
      { name: "robots", content: "index,follow,max-image-preview:large" },
      { property: "og:title", content: "Промышленные котлы и котельное оборудование — kotly.pro" },
      { property: "og:description", content: "Сравните производителей, технические характеристики и запросите подбор оборудования для закупки." },
    ],
    links: [{ rel: "canonical", href: "https://kotly.pro/" }],
  }),
});

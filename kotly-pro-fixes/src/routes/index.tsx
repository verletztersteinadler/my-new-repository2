import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/home-page";
import { SITE_ORIGIN } from "@/data/catalog";

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
    links: [{ rel: "canonical", href: `${SITE_ORIGIN}/` }],
    meta: [
      { title: "KOTLY.SU — справочник промышленных котлов" },
      {
        name: "description",
        content: "Независимый справочник открытых серий. Не сайт производителя и не предложение о продаже.",
      },
    ],
  }),
});

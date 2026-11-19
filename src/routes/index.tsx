import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/home-page";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

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

const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "ru",
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/favicon.svg`,
    },
  ],
};


export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): HomeSearch => ({
    q: read(search.q),
    region: regions.has(String(search.region)) ? String(search.region) : undefined,
    line: lines.has(String(search.line)) ? String(search.line) : undefined,
  }),
  component: HomePage,
  head: () => ({
    meta: [
      { title: "KOTLY.SU — справочник промышленных котлов" },
      { name: "description", content: SITE_DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(homeJsonLd) }],
  }),
});

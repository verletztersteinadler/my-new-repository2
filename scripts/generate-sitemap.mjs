#!/usr/bin/env node
/**
 * Generates public/sitemap.xml from src/data/published-slugs.ts (which
 * scripts/catalog-check.mjs keeps in sync with series-index.ts).
 * Runs on `prebuild`; the generated file is committed and guarded by
 * `npm run check:catalog`, so it cannot drift from the catalog.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function readSiteUrl() {
  const text = readFileSync(join(root, "src/lib/site.ts"), "utf8");
  const match = text.match(/export const SITE_URL = "([^"]+)"/);
  if (!match) throw new Error("SITE_URL not found in src/lib/site.ts");
  return match[1];
}

function readPublishedSlugs() {
  const path = join(root, "src/data/published-slugs.ts");
  if (!existsSync(path)) throw new Error("src/data/published-slugs.ts is missing");
  const text = readFileSync(path, "utf8");
  return [...text.matchAll(/slug: "([^"]+)"/g)].map((match) => match[1]);
}

function readLastmod() {
  const text = readFileSync(join(root, "src/data/catalog.ts"), "utf8");
  const match = text.match(/export const SOURCE_CHECKED = "([^"]+)"/);
  return match ? match[1] : undefined;
}

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function buildSitemap({ siteUrl, slugs, lastmod }) {
  const entries = [
    `  <url>\n    <loc>${escapeXml(`${siteUrl}/`)}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""}\n    <priority>1.0</priority>\n  </url>`,
    ...slugs.map(
      (slug) =>
        `  <url>\n    <loc>${escapeXml(`${siteUrl}/manufacturers/${slug}`)}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""}\n    <priority>0.8</priority>\n  </url>`,
    ),
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join("\n")}\n</urlset>\n`;
}

function main() {
  const xml = buildSitemap({
    siteUrl: readSiteUrl(),
    slugs: readPublishedSlugs(),
    lastmod: readLastmod(),
  });
  writeFileSync(join(root, "public/sitemap.xml"), xml);
  console.log(`sitemap.xml: ${1 + readPublishedSlugs().length} urls written to public/sitemap.xml`);
}

if (import.meta.url === `file://${process.argv[1]}`) main();

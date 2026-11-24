import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(process.argv[2] || ".vercel/output/static");
const source = readFileSync("src/data/manufacturers.ts", "utf8");
const slugs = [...source.matchAll(/\bslug:\s*"([^"]+)"/g)].map((match) => match[1]);
const unique = [...new Set(slugs)];
if (unique.length !== slugs.length || unique.length < 250) {
  throw new Error("Manufacturer slugs are duplicated or unexpectedly missing");
}

const requiredPages = ["", "kotelnaya"];
const missing = [...requiredPages, ...unique].filter((slug) =>
  !existsSync(resolve(root, slug, "index.html")),
);
if (missing.length) {
  throw new Error("Not prerendered: " + missing.slice(0, 20).join(", ") + " (total " + missing.length + ")");
}

const origin = "https://kotly.pro";
const paths = ["", "kotelnaya", ...unique];
const entities = (path) => path.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
const xml = '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  paths.map((path) => '  <url><loc>' + entities(origin + (path ? "/" + encodeURIComponent(path) : "/")) + '</loc></url>').join("\n") +
  '\n</urlset>\n';
writeFileSync(resolve(root, "sitemap.xml"), xml);
writeFileSync(resolve(root, "robots.txt"), "User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /manufacturers/\nSitemap: https://kotly.pro/sitemap.xml\n");
console.log("SEO files created for " + unique.length + " manufacturer pages and " + requiredPages.length + " landing pages.");

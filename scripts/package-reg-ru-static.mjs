#!/usr/bin/env node
/** Package static TanStack Start output for REG.RU/ISPmanager, no Node.js on the host. */
import { cp, copyFile, mkdir, readdir, stat, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const source = resolve(root, ".output/public");
const target = resolve(root, "dist-reg-ru");

const srcStat = await stat(source).catch(() => null);
if (!srcStat?.isDirectory()) {
  throw new Error("Missing .output/public - build with npm run build:static first");
}

await mkdir(target, { recursive: true });
await cp(source, target, { recursive: true, force: true });

const shell = resolve(target, "_shell.html");
const shellStat = await stat(shell).catch(() => null);
const index = resolve(target, "index.html");
const indexStat = await stat(index).catch(() => null);

if (shellStat?.isFile()) {
  // TanStack SPA shell is the site's document for / and all client-side routes.
  await copyFile(shell, index);
} else if (!indexStat?.isFile()) {
  throw new Error("Static output has neither _shell.html nor index.html");
}

await copyFile(resolve(root, "scripts/reg-ru/.htaccess"), resolve(target, ".htaccess"));

// Keep the executable PHP receiver within the public API path.
// Private configuration and stored leads must NOT be bundled in webroot.
const phpFolder = resolve(target, "api/v1/leads");
await mkdir(phpFolder, { recursive: true });
await copyFile(resolve(root, "scripts/reg-ru/api/v1/leads/index.php"), resolve(phpFolder, "index.php"));

// Build canonical sitemap from actually prerendered pages.
// Never include API, asset endpoints, SPA query variants or noindex pump research.
const sitemapPaths = new Set();
async function discoverPages(folder, subpath = "") {
  for (const entry of await readdir(folder, { withFileTypes: true })) {
    const relative = subpath ? subpath + "/" + entry.name : entry.name;
    if (entry.isDirectory()) {
      if (["api", "__grok", "_build", "assets", "catalog", "manufacturers"].includes(entry.name)) continue;
      if (relative === "nasosy") continue; // research register is noindex
      await discoverPages(resolve(folder, entry.name), relative);
    } else if (entry.name === "index.html") {
      const pagePath = subpath === "" ? "/" : "/" + subpath + "/";
      sitemapPaths.add(pagePath);
    }
  }
}
await discoverPages(target);
if (!sitemapPaths.has("/calculators/") || !sitemapPaths.has("/configurators/")) {
  throw new Error("Cannot ship sitemap: engineering route index is missing");
}
const urlXml = [...sitemapPaths].sort().map((path) => (
  "  <url><loc>https://kotly.pro" + path.replaceAll("&", "&amp;") + "</loc></url>"
)).join("\n");
await writeFile(resolve(target, "sitemap.xml"), [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  urlXml,
  "</urlset>",
  "",
].join("\n"));
await writeFile(resolve(target, "robots.txt"), [
  "User-agent: *",
  "Allow: /",
  "Disallow: /api/",
  "Disallow: /_serverFn/",
  "Sitemap: https://kotly.pro/sitemap.xml",
  "",
].join("\n"));
console.log("SEO:", sitemapPaths.size, "canonical prerendered pages (excluding research-only /nasosy).");

const entries = await readdir(target);
if (!entries.some((item) => item === "_build" || item === "assets")) {
  throw new Error("Missing compiled client assets in static output");
}

await writeFile(resolve(root, "dist-reg-ru-manifest.json"), JSON.stringify({
  mode: "static",
  files: entries,
  source: "deploy/reg-ru-static",
  warning: "PHP receiver included but disabled until approved policy, operator and private config outside document root are configured",
}, null, 2) + "\n");

console.log("Static website ready in dist-reg-ru/. Transfer its CONTENTS into /www/kotly.pro/");
console.log("Root files:", entries.join(", "));

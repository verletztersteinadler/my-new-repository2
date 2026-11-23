import assert from "node:assert/strict";
import { test } from "node:test";
import { existsSync, readFileSync } from "node:fs";

const read = (path) => readFileSync(path, "utf8");

test("manufacturer detail route is at site root with canonical url", () => {
  assert.equal(existsSync("src/routes/$slug.tsx"), true);
  assert.equal(existsSync("src/routes/manufacturers/$slug.tsx"), false);
  const route = read("src/routes/$slug.tsx");
  assert.match(route, /createFileRoute\("\/\$slug"\)/);
  assert.match(route, /rel: "canonical"/);
  assert.match(route, /https:\/\/kotly\.pro\//);
});

test("every internal manufacturer link uses the short route", () => {
  const sources = [
    "src/components/home-page.tsx",
    "src/components/catalog-page.tsx",
    "src/components/solution-builder.tsx",
    "src/components/boiler-house-builder.tsx",
  ];
  for (const source of sources) {
    const code = read(source);
    assert.ok(code.includes('"/$slug"'), `No short link in ${source}`);
    assert.ok(!code.includes('"/manufacturers/$slug"'), `Legacy link in ${source}`);
  }
});

test("Apache permanently redirects legacy manufacturer URLs before any stale directory check", () => {
  const rules = read("scripts/reg-ru/.htaccess");
  const redirect = rules.indexOf("RewriteRule ^manufacturers/([^/]+)/?$ /$1 [R=301,L,NE]");
  const checkDir = rules.indexOf("RewriteCond %{REQUEST_FILENAME} -d");
  assert.ok(redirect > -1, "Missing permanent old-path redirect");
  assert.ok(checkDir > redirect, "Redirect must execute before checking old physical folders");
});

test("manufacturer root-level slugs do not collide with reserved site routes", () => {
  const rows = read("src/data/manufacturers.ts");
  const slugs = [...rows.matchAll(/slug: "([^"]+)"/g)].map(m => m[1]);
  assert.ok(slugs.length >= 300, "Unexpected incomplete manufacturer registry");
  assert.equal(new Set(slugs).size, slugs.length, "Duplicate manufacturer slugs");
  const reserved = new Set([
    "nasosy", "kotelnaya", "politika", "soglasie",
    "api", "_build", "assets", "catalog", "manufacturers",
    "favicon.svg", "robots.txt", "sitemap.xml", "index.html",
  ]);
  for (const slug of slugs) assert.ok(!reserved.has(slug), `Reserved route collision: ${slug}`);
});

import test from "node:test";
import assert from "node:assert/strict";
import { createServer } from "vite";
import { resolve, join } from "node:path";

test("TEPLOFOR is found in Cyrillic and Latin in header and main catalog", async () => {
  const root = resolve(process.cwd());
  const server = await createServer({
    configFile: false,
    appType: "custom",
    resolve: { alias: { "@": join(root, "src") } },
    server: { middlewareMode: true },
    logLevel: "error",
  });
  try {
    const { findCatalogHits, matchingManufacturerSlugs } = await server.ssrLoadModule("/src/lib/catalog-search.ts");
    for (const query of ["TEPLOFOR", "teplofor", "Теплофор", "теплофор", "ТЕПЛОФОР"]) {
      const hits = findCatalogHits(query);
      assert.ok(hits.length > 0, "No search results for " + query);
      assert.equal(hits[0].slug, "teplofor", "Wrong top search result for " + query);
      assert.equal(hits[0].title, "TEPLOFOR", "Canonical brand changed for " + query);
      assert.equal(hits[0].kind, "manufacturer");
      assert.ok(matchingManufacturerSlugs(query).has("teplofor"), "Main catalog missing " + query);
    }
    assert.ok(!matchingManufacturerSlugs("лаварт").has("teplofor"), "Unrelated maker must not match");
  } finally {
    await server.close();
  }
});

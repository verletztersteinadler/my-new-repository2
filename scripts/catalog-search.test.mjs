import test from "node:test";
import assert from "node:assert/strict";
import { catalogMatchScore, normalizeCatalogText } from "../src/lib/catalog-search-core.ts";

test("finds Cyrillic and Latin names without case sensitivity", () => {
  assert.equal(normalizeCatalogText("  КОТЁЛ  LAVART-1000  "), "котел lavart 1000");
  assert.ok(catalogMatchScore("LAVART Master 1000", "lavart 1000") >= 0);
  assert.ok(catalogMatchScore("Промышленный КОТЁЛ", "котел") >= 0);
});
test("allows multiword queries regardless of contiguous order", () => {
  assert.ok(catalogMatchScore("ZOTA Pellet 1000", "1000 zota") >= 0);
  assert.equal(catalogMatchScore("ZOTA Pellet", "ZOTA steam"), -1);
});
test("does not return results for empty or irrelevant queries", () => {
  assert.equal(catalogMatchScore("Series 500", ""), -1);
  assert.equal(catalogMatchScore("Series 500", "abcd"), -1);
});

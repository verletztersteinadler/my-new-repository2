import assert from "node:assert/strict";
import { test } from "node:test";
import { catalogProblems, readCatalogSources } from "./catalog-check.mjs";
import { projectRoot } from "./with-app-env.mjs";

test("пустая карточка того же названия, что и ряд, не проходит", () => {
  const problems = catalogProblems({
    manufacturers: [
      { slug: "viessmann-vitomax", title: "Viessmann (Vitomax)", name: "Viessmann (Vitomax)" },
      { slug: "vitomax", title: "Vitomax", name: "Гермес / Vitomax" },
      { slug: "brox", title: "BROX", name: "BROX Фурманов" },
      { slug: "brox-tr", title: "BROX", name: "BROX" },
    ],
    catalogs: [
      { slug: "viessmann-vitomax" },
      { slug: "brox" },
      { slug: "brox-tr" },
    ],
    pageSlugs: new Set(["viessmann-vitomax", "brox", "brox-tr"]),
  });
  assert.deepEqual(problems, ["пустой дубль «Vitomax» (vitomax): это алиас viessmann-vitomax"]);
});

test("два разных завода с рядом не считаются дублем", () => {
  const problems = catalogProblems({
    manufacturers: [
      { slug: "brox", title: "BROX", name: "Фурманов" },
      { slug: "brox-tr", title: "BROX", name: "Турция" },
    ],
    catalogs: [
      { slug: "brox" },
      { slug: "brox-tr" },
    ],
    pageSlugs: new Set(["brox", "brox-tr"]),
  });
  assert.deepEqual(problems, []);
});

test("текущий реестр проходит проверку", () => {
  const problems = catalogProblems(readCatalogSources(projectRoot()));
  assert.deepEqual(problems, []);
});

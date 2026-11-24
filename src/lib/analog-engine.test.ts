import assert from "node:assert/strict";
import test from "node:test";
import type { Series } from "../data/catalog.ts";
import { equipmentFamily, findAnalogCandidates, publishedRange } from "./analog-engine.ts";

function sample(id: string, categoryId: Series["categoryId"], options: Partial<Series> = {}): Series {
  return {
    id, name: id, categoryId, kind: categoryId === "steam" ? "Паровой котёл" : categoryId === "water" ? "Водогрейный котёл" : categoryId === "oil" ? "Термомасляный котёл" : categoryId === "air" ? "Воздухонагреватель" : categoryId === "auto" ? "Горелка" : "Котельный блок",
    image: "", summary: "", powerMinKw: 500, powerMaxKw: 2000,
    steamMinKgH: categoryId === "steam" ? 1000 : null,
    steamMaxKgH: categoryId === "steam" ? 5000 : null,
    tempMaxC: null, pressureNote: null, fuels: ["gas"],
    feature: "", extra: null, sizes: [], sizesNote: null, aliases: [],
    ...options,
  };
}
function entry(slug: string, series: Series, line: "boiler" | "burner" | "air" = "boiler") {
  return { slug, maker: slug, line, series };
}
function hits(source: Series, candidates: ReturnType<typeof entry>[], line: "boiler" | "burner" | "air" = "boiler") {
  return findAnalogCandidates(source, "source", candidates, 30, line);
}

test("Strict water-only analogs exclude steam, oil, block, air, burner, automation and pumps", () => {
  const source = sample("water", "water");
  const candidates = [
    entry("water", sample("water2", "hw115", { kind: "Водогрейный котёл" })),
    entry("steam", sample("steam", "steam")),
    entry("oil", sample("oil", "oil")),
    entry("block", sample("block", "block")),
    entry("air", sample("air", "air"), "air"),
    entry("burner", sample("burner", "auto"), "burner"),
    entry("control", sample("controller", "auto", { kind: "Шкаф управления котлами" })),
    entry("pump", sample("heat-pump", "air", { kind: "Тепловой насос", name: "Eeco-X heat pumps" }), "air"),
    entry("water-wrong-maker", sample("water3", "water"), "burner"),
    entry("water-wrong-kind", sample("wrong", "water", { kind: "Паровой котёл" })),
  ];
  assert.deepEqual(hits(source, candidates).map(x => x.slug), ["water"]);
});

test("Steam only matches steam; superheated steam does not become saturated steam analogue", () => {
  const source = sample("steam", "steam");
  const candidates = [
    entry("steam", sample("steam2", "steam")),
    entry("superheat", sample("steam3", "steam", { kind: "Паровой с пароперегревателем" })),
    entry("water", sample("water", "water", { steamMinKgH: 1000, steamMaxKgH: 5000 })),
  ];
  assert.deepEqual(hits(source, candidates).map(x=>x.slug), ["steam"]);
  const superheated = sample("sh", "steam", { kind: "Паровой с пароперегревателем" });
  assert.deepEqual(hits(superheated, candidates).map(x=>x.slug), ["superheat"]);
});

test("Burners and control cabinets never match, even though both use legacy auto category", () => {
  const burner = sample("burner", "auto", { kind: "Горелка" });
  const controller = sample("control", "auto", { kind: "Шкаф управления горелкой" });
  const candidates = [entry("burner", burner, "burner"), entry("cabinet", controller)];
  assert.deepEqual(hits(burner, candidates, "burner").map(x=>x.slug), ["burner"]);
  assert.deepEqual(hits(controller, candidates).map(x=>x.slug), ["cabinet"]);
  assert.equal(equipmentFamily(controller), "automation");
});

test("No analog if documented power or steam performance ranges do not overlap", () => {
  const source = sample("source", "water", { powerMinKw: 800, powerMaxKw: 1000 });
  assert.deepEqual(hits(source, [
    entry("small", sample("small", "water", { powerMinKw: 100, powerMaxKw: 700 })),
    entry("large", sample("large", "water", { powerMinKw: 1100, powerMaxKw: 2000 })),
    entry("fit", sample("fit", "water", { powerMinKw: 900, powerMaxKw: 1300 })),
    entry("unknown", sample("unknown", "water", { powerMinKw: null, powerMaxKw: null })),
  ]).map(x=>x.slug), ["fit"]);
  assert.deepEqual(hits(sample("steam", "steam", { steamMinKgH: 2000, steamMaxKgH: 3000 }), [
    entry("too-small", sample("s", "steam", { steamMinKgH: 100, steamMaxKgH: 500 })),
    entry("good", sample("s2", "steam", { steamMinKgH: 2500, steamMaxKgH: 4000 })),
  ]).map(x=>x.slug), ["good"]);
});

test("Fuel is a hard constraint; missing fuel is not assumed compatible", () => {
  const source = sample("gas-diesel", "water", { fuels: ["gas", "diesel"] });
  const candidates = [
    entry("gas", sample("gas", "water", { fuels: ["gas"] })),
    entry("unknown", sample("none", "water", { fuels: [] })),
    entry("both", sample("dual", "water", { fuels: ["gas", "diesel"] })),
  ];
  assert.deepEqual(hits(source, candidates).map(x=>x.slug), ["both"]);
});

test("Water design temperature requirements and high-temperature type are respected", () => {
  const source = sample("high", "hw170", { kind: "Высокотемпературный водогрейный котёл", tempMaxC: 170 });
  const candidates = [
    entry("low", sample("low", "hw115", { kind: "Водогрейный котёл", tempMaxC: 115 })),
    entry("unknown", sample("unknown", "water", { kind: "Водогрейный котёл", tempMaxC: null })),
    entry("high", sample("high", "hw170", { kind: "Водогрейный котёл", tempMaxC: 180 })),
  ];
  assert.deepEqual(hits(source, candidates).map(x=>x.slug), ["high"]);
});

test("No cross-manufacturer duplicates, placeholder entries or pump-labeled records", () => {
  const source = sample("boiler", "water");
  const candidates = [
    entry("source", sample("same-company", "water")),
    entry("other", sample("one", "water")),
    entry("other", sample("one", "water")),
    entry("placeholder", sample("placeholder", "water", { kind: "Страница" })),
    entry("pump", sample("pump", "water", { kind: "Циркуляционный насос", name: "Насос ЦНС" })),
  ];
  assert.deepEqual(hits(source, candidates).map(x=>x.slug), ["other"]);
  assert.equal(equipmentFamily(sample("hp", "air", { kind: "Тепловой насос" }), "air"), null);
});

test("Published model size can support an otherwise missing series range", () => {
  const series = sample("sizes-only", "water", {
    powerMinKw: null, powerMaxKw: null,
    sizes: [{ id: "size", name: "1200 kW", powerKw: 1200, steamKgH: null }],
  });
  assert.deepEqual(publishedRange(series, "power"), { min: 1200, max: 1200 });
  assert.equal(hits(sample("source", "water", { powerMinKw: 1000, powerMaxKw: 1300 }), [entry("valid-size", series)]).length, 1);
});

test("Null or nonpositive source capacity never means that a missing candidate capacity is confirmed", () => {
  const source = sample("source", "water", { powerMinKw: null, powerMaxKw: null });
  const candidates = [
    entry("unverified", sample("unknown", "water", { powerMinKw: null, powerMaxKw: null })),
    entry("known", sample("known", "water", { powerMinKw: 300, powerMaxKw: 500 })),
  ];
  assert.deepEqual(hits(source, candidates).map(x=>x.slug), ["known"]);
});

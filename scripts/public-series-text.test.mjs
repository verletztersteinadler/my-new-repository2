import test from "node:test";
import assert from "node:assert/strict";
import { publicSeriesKind, publicSeriesFeature, publicSeriesSummary } from "../src/lib/public-series-text.ts";

test("removes source-review instructions but keeps known equipment categories", () => {
  assert.equal(publicSeriesKind({ categoryId: "water", kind: "Цифры ряда не сняты" }), "Водогрейное оборудование");
  assert.equal(publicSeriesFeature({ feature: "Карточка не открывалась" }), "Характеристики уточняются");
  assert.equal(publicSeriesSummary({ summary: "На открытой странице числовой ряд не найден." }), "Подробные характеристики и доступные исполнения уточняются при подборе оборудования.");
});
test("preserves technical facts, rather than inventing capacities or model names", () => {
  assert.equal(publicSeriesKind({ categoryId: "water", kind: "Водогрейный" }), "Водогрейный");
  assert.equal(publicSeriesFeature({ feature: "Двухходовой, реверсивная топка" }), "Двухходовой, реверсивная топка");
  assert.equal(publicSeriesSummary({ summary: "Жаротрубный котёл с реверсивной топкой" }), "Жаротрубный котёл с реверсивной топкой");
});

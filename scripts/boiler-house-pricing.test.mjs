import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { calculateTrain } from "../src/lib/boiler-house.ts";
import { PRICE_BENCHMARKS } from "../src/data/boiler-price-benchmarks.ts";
import { estimateBoilerHouse } from "../src/lib/boiler-house-pricing.ts";

test("price references have real separate water, steam and oil benchmarks", () => {
  for (const kind of ["water", "steam", "oil"]) {
    const rows = PRICE_BENCHMARKS[kind];
    assert.ok(rows.length >= 25, "Missing benchmark coverage for " + kind);
    for (const row of rows) {
      assert.ok(row.capacityKw > 0 && row.units >= 1);
      assert.ok(row.gas > 0 && row.liquid > 0 && row.dual > 0);
      assert.ok(row.withoutModule <= 0);
    }
  }
});
test("prices standard water boiler house by installed kW, total units, fuel and placement", () => {
  const heat = calculateTrain(1500, 2, "n-plus-one");
  const modular = estimateBoilerHouse({ mode:"water", heat, steam:null, fuel:"gas", alternateFuel:"", placement:"modular" });
  const standalone = estimateBoilerHouse({ mode:"water", heat, steam:null, fuel:"gas", alternateFuel:"", placement:"standalone" });
  assert.ok(modular && standalone);
  assert.equal(modular.components[0].capacityKw, 3000);
  assert.equal(modular.components[0].count, 2);
  assert.equal(modular.baseRUB, 16800000);
  assert.equal(standalone.baseRUB, 14600000); // no modular building
  assert.ok(modular.lowRUB < modular.baseRUB && modular.highRUB > modular.baseRUB);
});
test("gas, liquid and dual-fuel choices change the estimated cost", () => {
  const heat = calculateTrain(1000, 2, "none");
  const base = { mode:"water", heat, steam:null, placement:"modular" };
  const gas = estimateBoilerHouse({ ...base, fuel:"gas", alternateFuel:"" });
  const liquid = estimateBoilerHouse({ ...base, fuel:"diesel", alternateFuel:"" });
  const dual = estimateBoilerHouse({ ...base, fuel:"gas", alternateFuel:"diesel" });
  assert.ok(gas && liquid && dual);
  assert.notEqual(gas.baseRUB, liquid.baseRUB);
  assert.ok(dual.baseRUB > gas.baseRUB);
});
test("steam pricing documents its thermal-equivalent assumption without conflating kg/h with kW", () => {
  const steam = calculateTrain(1000, 2, "n-plus-one");
  const quote = estimateBoilerHouse({ mode:"steam", heat:null, steam, fuel:"gas", alternateFuel:"", placement:"modular" });
  assert.ok(quote);
  assert.equal(quote.components[0].kind, "steam");
  assert.equal(quote.components[0].capacityKw, 2000); // 2000 kg/h x 0.7 => 1400 kW, rounded up to available 2-unit package
  assert.ok(quote.assumptions.some((a) => a.includes("0,7 кВт")));
});
test("thermal-oil quote uses its own table and never substitutes a water-boiler price", () => {
  const heat = calculateTrain(350, 1, "none");
  const oil = estimateBoilerHouse({ mode:"oil", heat, steam:null, fuel:"gas", alternateFuel:"", placement:"modular" });
  const water = estimateBoilerHouse({ mode:"water", heat, steam:null, fuel:"gas", alternateFuel:"", placement:"modular" });
  assert.ok(oil);
  assert.equal(oil.baseRUB, 7600000);
  assert.equal(oil.components[0].kind, "oil");
  assert.equal(water, null); // reference water plant has no single-boiler package
});
test("combined project needs both groups and never invents prices outside range", () => {
  const heat = calculateTrain(2000, 2, "none");
  const steam = calculateTrain(1000, 2, "none");
  assert.ok(estimateBoilerHouse({ mode:"combined", heat, steam, fuel:"gas", alternateFuel:"", placement:"modular" }));
  assert.equal(estimateBoilerHouse({ mode:"combined", heat, steam:null, fuel:"gas", alternateFuel:"", placement:"modular" }), null);
  assert.equal(estimateBoilerHouse({ mode:"water", heat:calculateTrain(35000, 2, "none"), steam:null, fuel:"gas", alternateFuel:"", placement:"modular" }), null);
  assert.equal(estimateBoilerHouse({ mode:"water", heat, steam:null, fuel:"solid", alternateFuel:"", placement:"modular" }), null);
});
test("public price code does not name a price-list supplier", () => {
  const code = readFileSync(new URL("../src/data/boiler-price-benchmarks.ts", import.meta.url), "utf8") +
    readFileSync(new URL("../src/lib/boiler-house-pricing.ts", import.meta.url), "utf8");
  assert.doesNotMatch(code, /teplofor|teploros|теплофор|теплорос/i);
});

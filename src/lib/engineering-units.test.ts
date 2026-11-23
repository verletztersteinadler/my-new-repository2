import assert from "node:assert/strict";
import test from "node:test";
import {
  formatEngineeringNumber,
  parseEngineeringNumber,
  powerToKw,
  pressureToMPa,
  rangeIntersects,
  steamKgHToKgS,
  steamToKgH,
  temperatureCToK,
  temperatureToC,
} from "./engineering-units.ts";

test("Power MW converts exactly to catalog kW", () => {
  assert.equal(powerToKw(0.75, "MW"), 750);
  assert.equal(powerToKw(1500, "kW"), 1500);
});

test("Steam mass flow converted from t/h and SI kg/s to catalog kg/h", () => {
  assert.equal(steamToKgH(1, "kg/s"), 3600);
  assert.equal(steamToKgH(1, "t/h"), 1000);
  assert.equal(steamToKgH(26.5, "kg/h"), 26.5);
  assert.ok(Math.abs(steamKgHToKgS(1000) - 1 / 3.6) < 1e-12);
});

test("Absolute temperature in kelvin and celsius", () => {
  assert.equal(temperatureToC(273.15, "K"), 0);
  assert.equal(temperatureCToK(115), 388.15);
  assert.equal(temperatureToC(115, "C"), 115);
});

test("Pressure conversion into SI megapascal", () => {
  assert.equal(pressureToMPa(10, "bar"), 1);
  assert.equal(pressureToMPa(1000, "kPa"), 1);
  assert.equal(pressureToMPa(0.6, "MPa"), 0.6);
});

test("Russian decimal comma and invalid values", () => {
  assert.equal(parseEngineeringNumber(" 1,25 "), 1.25);
  assert.equal(parseEngineeringNumber("-2"), null);
  assert.equal(parseEngineeringNumber("-2", true), -2);
  assert.equal(parseEngineeringNumber("xyz"), null);
  assert.equal(parseEngineeringNumber("1e9"), null);
  assert.equal(formatEngineeringNumber(0.007361111, 6), "0,007361");
});

test("Only intersecting known ranges count as documented matches", () => {
  assert.equal(rangeIntersects(100, 900, 500, 1200), true);
  assert.equal(rangeIntersects(100, 900, 1000, 1200), false);
  assert.equal(rangeIntersects(100, 900, 900, 1200), true);
  assert.equal(rangeIntersects(null, null, 300, null), false);
  assert.equal(rangeIntersects(null, null, null, null), true);
  assert.equal(rangeIntersects(100, 900, 800, 600), false);
});

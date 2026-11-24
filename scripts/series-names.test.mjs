import test from "node:test";
import assert from "node:assert/strict";
import { displaySeriesName } from "../src/lib/series-names.ts";

test("LAVART uses full series titles without duplicated brand", () => {
  assert.equal(displaySeriesName("LAVART", "Reverse"), "LAVART Reverse");
  assert.equal(displaySeriesName("LAVART", "LAVART Master"), "LAVART Master");
  assert.equal(displaySeriesName("LAVART", "LAVART SWD"), "LAVART SWD");
  assert.equal(displaySeriesName("LAVART", "Котловой блок LAVART"), "LAVART — Котловой блок");
});
test("Russian, punctuation-heavy and abbreviated manufacturer names remain intact", () => {
  assert.equal(displaySeriesName("АКМЗ", "АКМЗ, паровые"), "АКМЗ, паровые");
  assert.equal(displaySeriesName("АКМЗ", "ПТВМ"), "АКМЗ ПТВМ");
  assert.equal(displaySeriesName("W.E.B.", "W.E.B. Heat"), "W.E.B. Heat");
  assert.equal(displaySeriesName("AB&CO – TT BOILERS", "FTV"), "AB&CO – TT BOILERS FTV");
  assert.equal(displaySeriesName("АКМЗ", "АКМЗ"), "АКМЗ — серия не указана");
  assert.equal(displaySeriesName("METEOR Thermo", "METEOR C30"), "METEOR C30");
  assert.equal(displaySeriesName("METEOR Thermo", "LaggarTT SK"), "LaggarTT SK");
});
test("keeps original series codes and whitespace clean", () => {
  assert.equal(displaySeriesName(" LAVART ", "  SWD  "), "LAVART SWD");
  assert.equal(displaySeriesName("LAVART", "LAVART   Professional"), "LAVART Professional");
  assert.equal(displaySeriesName("", "SV"), "SV");
  assert.equal(displaySeriesName("LAVART", ""), "LAVART");
});

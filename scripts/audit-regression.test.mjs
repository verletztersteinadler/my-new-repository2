import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";

import { zotaSeries } from "../src/data/zota.ts";
import { boschindSeries } from "../src/data/boschind.ts";
import { dkmSeries } from "../src/data/dkm.ts";
import { unicalSeries } from "../src/data/unical.ts";
import { teploforSeries } from "../src/data/teplofor.ts";
import { viessmannSeries } from "../src/data/viessmann.ts";
import { formatKw, formatSteam, filterSeries } from "../src/data/catalog.ts";
import { pumpPilotCompanies } from "../src/data/pumps.ts";

const series = (list, id) => {
  const entry=list.find(s=>s.id===id);
  assert.ok(entry, "missing series: "+id);
  return entry;
};

test("ZOTA S and D variants keep different stable IDs, source-supported models and limits", () => {
  const zuma=series(zotaSeries,"zota-zuma");
  const plasma=series(zotaSeries,"zota-plasma");
  assert.deepEqual(zuma.sizes.map(s=>s.id), [
    "zota-zuma-14s","zota-zuma-18s","zota-zuma-18d","zota-zuma-24s","zota-zuma-24d",
  ]);
  assert.deepEqual(plasma.sizes.map(s=>s.id), [
    "zota-plasma-32s","zota-plasma-32d","zota-plasma-36s",
  ]);
  for(const family of [zuma,plasma]) {
    assert.equal(family.tempMaxC,80);
    assert.equal(new Set(family.sizes.map(x=>x.id)).size,family.sizes.length);
    for (const size of family.sizes) assert.equal(size.workingPressureBar,3);
  }
  assert.equal(zuma.sizes.find(s=>s.id.endsWith("18d")).execution,"D, двухконтурный");
  assert.equal(zuma.sizes.find(s=>s.id.endsWith("18s")).execution,"S, одноконтурный");
});

test("Bosch Unimat ranges and temperatures match November 2026 audit", () => {
  const cases=[
    ["bosch-utl",650,25000,110],["bosch-utm",750,19200,190],
    ["bosch-uth",820,18300,225],["bosch-uthz",13000,38000,225],
  ];
  for (const [id,lo,hi,temp] of cases) {
    const item=series(boschindSeries,id);
    assert.equal(item.powerMinKw,lo);
    assert.equal(item.powerMaxKw,hi);
    assert.equal(item.tempMaxC,temp);
    assert.match(item.sourceUrl,/^https:\/\//);
  }
});

test("Unical TRYSUHR is 15 nominal sizes, never silently equate 1400 and 1800 names with kW", () => {
  const item=series(unicalSeries,"unical-try");
  assert.equal(item.sizes.length,15);
  assert.equal(item.sizes.find(s=>s.name==="TRYSUHR 1400").powerKw,1395);
  assert.equal(item.sizes.find(s=>s.name==="TRYSUHR 1800").powerKw,1750);
  assert.ok(item.sourceRevision?.includes("2026"));
});

test("TEPLOFOR Lexender has all 12 named models, no manufacturer promotion", () => {
  const item=series(teploforSeries,"tf-lexender");
  assert.deepEqual(item.sizes.map(s=>s.powerKw),
    [400,500,600,700,800,1000,1300,1500,1700,2000,2200,2500]);
  assert.ok(item.sourceUrl?.includes("lexender-uv2-d"));
});

test("Smolensk gas evidence applies only to documented exact execution, not the entire DKM family", () => {
  const item=series(dkmSeries,"dkm-smol");
  assert.deepEqual(item.fuels,[]);
  const documented=item.sizes.find(s=>s.name==="Смоленск-4,65-95К");
  assert.deepEqual(documented.fuels,["gas"]);
  assert.equal(documented.tempMaxC,95);
  assert.equal(documented.workingPressureBar,10);
  assert.ok(item.sizes.some(s=>s!==documented && s.fuels.length===0));
  assert.ok(!filterSeries({fuel:"diesel"},[item]).length);
  assert.ok(filterSeries({fuel:"gas"},[item]).length);
  assert.deepEqual(filterSeries({fuel:"gas",power:"o15"},[item]),[],
    "The 4.65 MW gas model must not establish fuel for a different >15 MW model");
  assert.equal(filterSeries({fuel:"gas",power:"m1to5"},[item]).length,1);
});

test("Viessmann safety protection temperature is not the supply temperature", () => {
  const hw=series(viessmannSeries,"v-hw");
  assert.equal(hw.tempMaxC,null);
  assert.equal(hw.tempSafetyMaxC,210);
  assert.equal(series(viessmannSeries,"v-lw").tempMaxC,110);
});

test("Significant decimal precision remains intact", () => {
  assert.equal(formatKw(1950),"1,95 МВт");
  assert.equal(formatKw(1395),"1,395 МВт");
  assert.equal(formatSteam(1250),"1,25 т/ч");
});

test("Alternative Altai Energomash KV-GM model names resolve to the same documented size", async () => {
  const { pkaemSeries } = await import("../src/data/pkaem.ts");
  const item = series(pkaemSeries, "pkaem-kvgm");
  const four = item.sizes.find(s => s.name === "КВ-ГМ-4,65-150");
  const ten = item.sizes.find(s => s.name === "КВ-ГМ-11,63-150");
  assert.deepEqual(four?.aliases, ["КВ-ГМ-4-150"]);
  assert.deepEqual(ten?.aliases, ["КВ-ГМ-10-150"]);
  assert.equal(filterSeries({ q: "КВ-ГМ-4-150" }, [item]).length,1);
  assert.equal(filterSeries({ q: "КВ-ГМ-10-150" }, [item]).length,1);
});

test("ALLWEILER does not claim NETZSCH NEMO series", () => {
  const allweiler=pumpPilotCompanies.find(p=>p.name==="ALLWEILER");
  assert.ok(allweiler);
  assert.equal(allweiler.seriesNames,"NT, NTT");
});

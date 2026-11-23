import assert from "node:assert/strict";
import test from "node:test";
import { newPumpGroup, evaluatePumpGroup, flowToM3S, m3sToFlow, pumpGroupBrief } from "./pump-engineering.ts";
import { pumpBacklogNames, pumpPilotCompanies, pumpResearchCounts, pumpRoles } from "../data/pumps.ts";
test("Pump register imports the workbook priority split without publishing B/C",()=>{
  assert.equal(pumpPilotCompanies.length,25);
  assert.equal(pumpBacklogNames.B.length,56);
  assert.equal(pumpBacklogNames.C.length,25);
  assert.equal(pumpResearchCounts.total,106);
  assert.equal(pumpRoles.length,10);
  assert.ok(pumpPilotCompanies.every(c=>c.priority==="A" && c.catalog.startsWith("https://") && c.editorialStatus==="source-register-unverified"));
  assert.ok(!pumpBacklogNames.C.includes("SVN PUMP"));
});
test("Flow SI conversions preserve physical quantity",()=>{
  assert.ok(Math.abs(flowToM3S(3.6,"m3/h")-0.001)<1e-12);
  assert.equal(flowToM3S(1,"l/s"),0.001);
  assert.ok(Math.abs(m3sToFlow(0.001,"m3/h")-3.6)<1e-9);
});
test("Parallel pump count divides flow, not head; hydraulic output is labelled lower-bound",()=>{
  const p={...newPumpGroup("network","n1"),totalFlow:"36",headM:"25",dutyUnits:2,standbyUnits:1,densityKgM3:"1000"};
  const x=evaluatePumpGroup(p);
  assert.equal(x.issues.length,0);
  assert.ok(Math.abs((x.totalM3S??0)-0.01)<1e-9);
  assert.ok(Math.abs((x.perDutyM3S??0)-0.005)<1e-9);
  assert.equal(x.headM,25);
  assert.ok(Math.abs((x.hydraulicKw??0)-2.4516625)<1e-8);
  assert.match(pumpGroupBrief(p,"Сетевые"),/не мощность электродвигателя/);
});
test("Unknown Q/H stays unknown; no invented pump duty",()=>{
  const p=newPumpGroup("makeup","m1");
  const x=evaluatePumpGroup(p);
  assert.equal(x.totalM3S,null);
  assert.equal(x.hydraulicKw,null);
  assert.ok(x.unknowns.includes("Расход Q"));
});
test("Reject invalid characteristics and frequency independent of model selection",()=>{
  const p={...newPumpGroup("feedwater","f1"),totalFlow:"-2",headM:"0",densityKgM3:"0",tempC:"-300",dutyUnits:0};
  const x=evaluatePumpGroup(p);
  assert.ok(x.issues.length>=4);
});

import assert from "node:assert/strict";
import test from "node:test";
import { calculateTrain, calculatePlant, findBoilerCandidates, buildTechnicalBrief } from "./boiler-house.ts";

test("N+1 uses n-1 working units; installed rating includes standby", () => {
  const r = calculateTrain(6000, 4, "n-plus-one");
  assert.equal(r?.dutyUnits, 3);
  assert.equal(r?.standbyUnits, 1);
  assert.equal(r?.minimumPerDutyUnit, 2000);
  assert.equal(r?.minimumTotalInstalled, 8000);
});
test("No reserve uses all duty units", () => {
  const r = calculateTrain(6000, 3, "none");
  assert.equal(r?.minimumPerDutyUnit, 2000);
  assert.equal(r?.minimumTotalInstalled, 6000);
});
test("Invalid loads and N+1 with one unit are not sized", () => {
  assert.equal(calculateTrain(0, 2, "none"), null);
  assert.equal(calculateTrain(500, 1, "n-plus-one"), null);
  assert.equal(calculateTrain(Infinity, 3, "none"), null);
});
test("Mixed plant keeps heat in kW and steam in kg/h as separate groups", () => {
  const res=calculatePlant({mode:"combined",heatKw:4500,steamKgH:3600,heatUnitCount:3,steamUnitCount:2,heatReserve:"n-plus-one",steamReserve:"none"});
  assert.equal(res.heat?.minimumPerDutyUnit,2250);
  assert.equal(res.steam?.minimumPerDutyUnit,1800);
});
test("Catalog matches require same category, fuels, known capacity and temperature", () => {
  const base={id:"x",name:"Sample",categoryId:"hw115",kind:"",image:"",summary:"",powerMinKw:100,powerMaxKw:2000,steamMinKgH:null,steamMaxKgH:null,tempMaxC:115,pressureNote:null,fuels:["gas","diesel"],feature:"",extra:null,sizes:[{id:"x1",name:"X-1000",powerKw:1000,steamKgH:null}],sizesNote:null,aliases:[]};
  const entries=[{slug:"a",maker:"Factory A",line:"boiler",series:base}];
  assert.equal(findBoilerCandidates({entries,kind:"water",dutyPerUnit:900,mainFuel:"gas",reserveFuel:"diesel",minimumTempC:110}).length,1);
  assert.equal(findBoilerCandidates({entries,kind:"water",dutyPerUnit:2100,mainFuel:"gas",reserveFuel:"",minimumTempC:110}).length,0);
  assert.equal(findBoilerCandidates({entries,kind:"water",dutyPerUnit:900,mainFuel:"gas",reserveFuel:"solid",minimumTempC:110}).length,0);
  assert.equal(findBoilerCandidates({entries,kind:"water",dutyPerUnit:900,mainFuel:"gas",reserveFuel:"",minimumTempC:150}).length,0);
  assert.equal(findBoilerCandidates({entries,kind:"steam",dutyPerUnit:900,mainFuel:"gas",reserveFuel:""}).length,0);
});
test("Technical brief preserves distinct heat and steam demands", () => {
  const heat=calculateTrain(3000,2,"none");
  const steam=calculateTrain(3600,2,"n-plus-one");
  const brief=buildTechnicalBrief({object:"Завод",location:"Казань",mode:"combined",purpose:["Отопление","Пар для производства"],heatLoads:{heatingKw:2000,dhwKw:500,processKw:500},steamKgH:3600,waterSupplyC:95,waterReturnC:70,waterPressureMPa:0.6,steamPressureMPa:1.2,steamCondition:"насыщенный",condensateReturnPct:50,mainFuel:"газ",reserveFuel:"дизель",operation:"continuous",placement:"modular",circuit:"independent",automation:"dispatch",heatTrain:heat,steamTrain:steam,chosenSystems:["ХВО"],notes:""});
  assert.match(brief,/3000 кВт/);
  assert.match(brief,/1 кг\/с/);
  assert.match(brief,/резервных 1/);
  assert.match(brief,/не проектная документация/);
});

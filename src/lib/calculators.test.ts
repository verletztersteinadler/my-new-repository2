import assert from "node:assert/strict";
import { test } from "node:test";
import { calculatorDefinitions, calculate, initialInputs } from "./calculators.ts";

function read(id: string, updates: Record<string,string> = {}) {
  return calculate(id, { ...initialInputs(id), ...updates });
}
function value(id: string, label: string, updates: Record<string,string> = {}) {
  const row=read(id,updates).rows.find(x=>x.label===label);
  assert.ok(row,id+": missing "+label);
  return row.value;
}
function near(a:number, expected:number, tolerance:number, message?:string) {
  assert.ok(Math.abs(a-expected)<=tolerance,(message??"") + " expected "+expected+" ±"+tolerance+", got "+a);
}
test("All 52 calculators have unique permanent slugs and computable defaults", () => {
  assert.equal(calculatorDefinitions.length,52);
  assert.equal(new Set(calculatorDefinitions.map(x=>x.id)).size,16);
  for(const tool of calculatorDefinitions) {
    const result=read(tool.id);
    assert.ok(result.rows.length>=2,tool.id);
    assert.ok(tool.formula.length>10&&tool.caveat.length>20,tool.id);
  }
});
test("Pressure: 1 MPa = 10 bar = 1000 kPa; absolute and gauge are not equal", () => {
  near(value("pressure","бар"),10,1e-8);
  near(value("pressure","кПа"),1000,1e-8);
  near(value("pressure","Избыточное давление"),10-1.01325,1e-8);
  near(value("pressure","Абсолютное давление",{value:"1",unit:"bar",basis:"gauge"}),2.01325,1e-8);
  near(value("pressure","Абсолютное давление",{value:"0.9",unit:"bar",basis:"vacuum"}),0.11325,1e-8);
  assert.throws(()=>read("pressure",{value:"2",unit:"bar",basis:"vacuum"}),/отрицательным/);
});
test("Power and energy: thermochemical calorie convention and E=power*time", () => {
  near(value("power","кВт"),5000,1e-8);
  near(value("power","Вт"),5000000,1e-8);
  near(value("power","Гкал/ч"),4.30210325,0.001);
  near(value("energy","Энергия при указанной мощности и времени"),20000,1e-8);
  near(value("energy","МДж",{value:"1",unit:"kWh"}),3.6,1e-12);
});
test("Temperature intervals use ΔK=Δ°C; absolute conversion honors offset", () => {
  near(value("temperature","Кельвин"),363.15,1e-9);
  near(value("temperature","Фаренгейт"),194,1e-9);
  near(value("temperature","Кельвин",{value:"20",mode:"delta"}),20,1e-10);
  near(value("temperature","Фаренгейт",{value:"20",mode:"delta"}),36,1e-10);
  assert.throws(()=>read("temperature",{value:"-300"}),/абсолютного нуля/);
});
test("Volumetric and mass flow are dimensionally separated", () => {
  near(value("volume-flow","л/ч"),10000,1e-9);
  near(value("volume-flow","л/с"),10000/3600,1e-9);
  near(value("mass-flow","кг/с"),1000/3600,1e-9);
  near(value("mass-flow","Объёмный расход по заданной плотности"),1,1e-9);
  assert.throws(()=>read("mass-flow",{density:"0"}),/> нуля|больше нуля/);
});
test("Water: 50 m3/h at 90/70 ≈ 1163 kW; 1000kW requires ≈43 m3/h", () => {
  near(value("water-power","Тепловая мощность"),1163,0.002);
  near(value("water-flow","Необходимый объёмный расход"),1000/(1.163*20),0.01);
  assert.throws(()=>read("water-flow",{supply:"70",return:"70"}),/выше обратки/);
});
test("IF97 saturation and enthalpy: 1t/h at 10bar abs feedwater 100C ≈655kW", () => {
  near(value("steam-capacity","Полезная тепловая мощность"),655,8);
  near(value("steam-capacity","Энтальпия пара"),2777,8);
  near(value("steam-capacity","Энтальпия питательной воды"),419,6);
  near(value("steam-from-power","Паропроизводительность"),1,0.03);
  near(value("steam-saturation","Температура насыщения"),179.88,0.1);
  near(value("steam-properties","Энтальпия насыщенного пара hg"),2777,8);
  const full=read("steam-properties",{state:"wet",x:"0.8"});
  assert.ok(!full.rows.some(x=>x.label.startsWith("Теплоёмкость Cp")),"two-phase Cp must be omitted");
});
test("IF97 saturation uses absolute MPa and throws on superheated state below Tsat", () => {
  assert.throws(()=>read("steam-capacity",{state:"superheated",superheat:"100"}),/выше насыщения/);
  assert.throws(()=>read("steam-properties",{pressure:"0"}),/Насыщенное состояние|давлени/);
  near(value("steam-saturation","Абсолютное давление",{mode:"temperature",temperature:"180"}),10.027,0.1);
});
test("Natural gas and diesel fuel calculations respect user-supplied Hu and efficiency", () => {
  near(value("gas-consumption","Нормальный расход газа"),113.1861913,0.01);
  near(value("diesel-consumption","Массовый расход дизеля"),1000/(.93*11.8),0.01);
  near(value("diesel-consumption","Объёмный расход дизеля"),1000/(.93*11.8*.84),0.01);
  assert.throws(()=>read("gas-consumption",{hu:"0"}),/больше нуля/);
  assert.throws(()=>read("gas-consumption",{eff:"0"}),/диапазона/);
});
test("Pipe diameter and flow velocity match reciprocal equations", () => {
  const diameter=value("pipe-diameter","Расчётный внутренний диаметр");
  near(diameter,118.94161,0.01);
  near(value("flow-velocity","Средняя скорость жидкости",{diameter:String(diameter)}),1,1e-6);
  assert.throws(()=>read("flow-velocity",{diameter:"0"}),/больше нуля/);
});

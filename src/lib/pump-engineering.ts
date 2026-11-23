/** Pump engineering request, not a certified hydraulic selection. */
import type { PumpRoleId } from "../data/pumps.ts";

export type PumpFlowUnit = "m3/s" | "m3/h" | "l/s";
export type PumpControl = "unknown" | "fixed" | "vfd";
export type PumpFrequency = "" | "50" | "60";
export type PumpGroup = {
  id: string;
  role: PumpRoleId;
  fluid: string;
  totalFlow: string; flowUnit: PumpFlowUnit;
  headM: string;
  dutyUnits: number; standbyUnits: number;
  tempC: string; pressureMPa: string;
  densityKgM3: string; viscosityMm2S: string;
  npshaM: string;
  control: PumpControl; frequency: PumpFrequency;
  comments: string;
};
const roleFluids: Record<PumpRoleId, string> = {
  network:"вода тепловой сети", circulation:"котловая вода", makeup:"подпиточная вода",
  feedwater:"питательная вода", condensate:"конденсат",
  "thermal-oil":"термомасло", fuel:"жидкое топливо", dosing:"химический реагент",
  drainage:"дренажная вода", booster:"водопроводная вода",
};

export function newPumpGroup(role: PumpRoleId, id: string): PumpGroup {
  return {
    id, role, fluid:roleFluids[role], totalFlow:"", flowUnit:"m3/h",
    headM:"", dutyUnits:1, standbyUnits:1,
    tempC:"",pressureMPa:"",densityKgM3:"",viscosityMm2S:"",
    npshaM:"",control:"unknown",frequency:"50",comments:"",
  };
}

export function flowToM3S(value: number, unit: PumpFlowUnit): number {
  if (unit==="m3/h") return value/3600;
  if (unit==="l/s") return value/1000;
  return value;
}
export function m3sToFlow(value: number, unit: PumpFlowUnit): number {
  if (unit==="m3/h") return value*3600;
  if (unit==="l/s") return value*1000;
  return value;
}
export function parsePumpValue(raw: string, allowNegative = false): number | null {
  const normalized=raw.trim().replace(/\s/g,"").replace(",",".");
  if (!/^[+-]?\d+(?:\.\d+)?$/.test(normalized)) return null;
  const n=Number(normalized);
  return Number.isFinite(n)&& (allowNegative || n>=0) ? n:null;
}
export type PumpCalculation = {
  totalM3S: number | null;
  perDutyM3S: number | null;
  headM: number | null;
  hydraulicKw: number | null;
  issues: string[];
  unknowns: string[];
};
export function evaluatePumpGroup(p: PumpGroup): PumpCalculation {
  const issues:string[]=[];
  const unknowns:string[]=[];
  const read=(raw:string, label:string, allowNegative=false) => {
    if (!raw.trim()) { unknowns.push(label); return null; }
    const n=parsePumpValue(raw,allowNegative);
    if (n==null) issues.push(label+": некорректное значение");
    return n;
  };
  const flow=read(p.totalFlow,"Расход Q");
  const head=read(p.headM,"Напор H");
  const temp=read(p.tempC,"Температура жидкости",true);
  const pressure=read(p.pressureMPa,"Давление");
  const density=read(p.densityKgM3,"Плотность");
  const viscosity=read(p.viscosityMm2S,"Кинематическая вязкость");
  const npsha=read(p.npshaM,"NPSHa");
  if (flow!=null&&flow<=0) issues.push("Расход Q должен быть положительным");
  if (head!=null&&head<=0) issues.push("Напор H должен быть положительным");
  if (temp!=null&&temp< -273.15) issues.push("Температура ниже абсолютного нуля");
  if (density!=null&&density<=0) issues.push("Плотность должна быть положительной");
  if (viscosity!=null&&viscosity<=0) issues.push("Вязкость должна быть положительной");
  if (pressure!=null&&pressure<0) issues.push("Давление должно быть неотрицательным");
  if (npsha!=null&&npsha<0) issues.push("NPSHa должен быть неотрицательным");
  if (!Number.isInteger(p.dutyUnits)||p.dutyUnits<1||p.dutyUnits>12) issues.push("Рабочих насосов должно быть от 1 до 12");
  if (!Number.isInteger(p.standbyUnits)||p.standbyUnits<0||p.standbyUnits>12) issues.push("Резервных насосов должно быть от 0 до 12");
  const totalM3S=flow!=null&&flow>0?flowToM3S(flow,p.flowUnit):null;
  const perDutyM3S=totalM3S!=null&&p.dutyUnits>=1?totalM3S/p.dutyUnits:null;
  // Lower bound for useful hydraulic power at a specified density.
  // NOT shaft power or electric motor rating; those require pump curves/efficiency.
  const hydraulicKw=totalM3S!=null&&head!=null&&head>0&&density!=null&&density>0
    ? density*9.80665*totalM3S*head/1000 : null;
  return {totalM3S,perDutyM3S,headM:head,hydraulicKw,issues,unknowns};
}
export function pumpGroupBrief(p: PumpGroup, roleName: string): string {
  const v=evaluatePumpGroup(p);
  const fmt=(n:number|null,d=6)=>n==null?"уточнить":n.toLocaleString("ru-RU",{maximumFractionDigits:d});
  const hydraulic=v.hydraulicKw==null?"не рассчитана (нет полного набора Q/H/плотность)":
    fmt(v.hydraulicKw,4)+" кВт (гидравлическая, не мощность электродвигателя)";
  return [
    roleName+": "+p.fluid,
    "Режим: "+p.dutyUnits+" рабочих + "+p.standbyUnits+" резервных",
    "Расход группы Q: "+fmt(v.totalM3S)+" м³/с; одного рабочего насоса: "+fmt(v.perDutyM3S)+" м³/с",
    "Расчётный напор H: "+fmt(v.headM,3)+" м (не делится на число параллельных насосов)",
    "Температура: "+(p.tempC||"уточнить")+" °C; давление: "+(p.pressureMPa||"уточнить")+" МПа",
    "Плотность: "+(p.densityKgM3||"уточнить")+" кг/м³; кинематическая вязкость: "+(p.viscosityMm2S||"уточнить")+" мм²/с",
    "NPSHa: "+(p.npshaM||"уточнить")+" м; частота: "+(p.frequency||"уточнить")+" Гц",
    "Регулирование: "+({unknown:"уточнить",fixed:"без ЧРП",vfd:"ЧРП"} as const)[p.control],
    "Полезная гидравлическая мощность всей рабочей группы: "+hydraulic,
    "Дополнительные условия: "+(p.comments.trim()||"нет"),
    ...(v.issues.length?["ПРОВЕРИТЬ: "+v.issues.join("; ")]:[]),
    "Требует Q-H, КПД, NPSHr, материала и допустимого режима из паспорта модели.",
  ].join("; ");
}

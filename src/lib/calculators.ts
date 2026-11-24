/**
 * kotly.pro engineering calculators: shared, side-effect-free numeric kernel.
 *
 * Units are intentionally explicit. Never treat gauge and absolute pressure as
 * interchangeable, or power and energy as the same physical dimension.
 * Steam uses the IAPWS-IF97 package rather than a constant "kW per t/h".
 * Reference: Engineering Calculators TZ, 23 November 2026, sections 1–5, 9, 11.
 */
import { solvePT, solvePx, solveTx } from "iapws-if97";
import { secondaryDefinitions } from "./calculators-secondary-definitions.ts";
import { calculateSecondary } from "./calculators-secondary.ts";

export type CalField = {
  id: string;
  label: string;
  unit?: string;
  value: string;
  options?: { value: string; label: string }[];
  help?: string;
};
export type CalDefinition = {
  id: string;
  group: string;
  title: string;
  description: string;
  formula: string;
  example: string;
  fields: CalField[];
  caveat: string;
  equipment?: "water" | "steam" | "pump" | "fuel";
};
export type CalRow = { label: string; value: number; unit: string; digits?: number };
export type CalResult = {
  rows: CalRow[];
  notes: string[];
  selection?: { powerKw?: number; steamKgH?: number; flowM3h?: number };
};
const choose = (id: string, label: string, value: string, options: Array<[string, string]>): CalField => ({
  id, label, value, options: options.map(([v, name]) => ({ value: v, label: name })),
});
const num = (id: string, label: string, value: string, unit?: string): CalField => ({ id, label, value, unit });
const pressureUnits: Array<[string,string]> = [
  ["MPa","МПа"], ["kPa","кПа"], ["Pa","Па"], ["bar","бар"], ["mbar","мбар"],
  ["atm","физ. атм"], ["at","тех. ат"], ["kgfcm2","кгс/см²"],
  ["psi","PSI"], ["mmHg","мм рт. ст."], ["mmH2O","мм вод. ст."], ["mH2O","м вод. ст."],
];
const powerUnits: Array<[string,string]> = [
  ["W","Вт"], ["kW","кВт"], ["MW","МВт"], ["GW","ГВт"],
  ["kcalh","ккал/ч"], ["Mcalh","Мкал/ч"], ["Gcalh","Гкал/ч"],
  ["BTUh","BTU/h"], ["MMBTUh","MMBTU/h"], ["hp","л.с. мех."], ["boilerhp","boiler hp"],
];
const energyUnits: Array<[string,string]> = [
  ["J","Дж"], ["kJ","кДж"], ["MJ","МДж"], ["GJ","ГДж"],
  ["kWh","кВт·ч"], ["MWh","МВт·ч"], ["Gcal","Гкал"], ["BTU","BTU"],
];
const volumeUnits: Array<[string,string]> = [
  ["ls","л/с"],["lmin","л/мин"],["lh","л/ч"],
  ["m3s","м³/с"],["m3min","м³/мин"],["m3h","м³/ч"],["m3day","м³/сут"],
];
const massUnits: Array<[string,string]> = [
  ["kgs","кг/с"],["kgmin","кг/мин"],["kgh","кг/ч"],["th","т/ч"],["tday","т/сут"],
];
const pressureState = choose("basis","Тип давления","absolute",[
  ["absolute","Абсолютное"],["gauge","Избыточное"],["vacuum","Вакуумметрическое (положительная величина разрежения)"],
]);
const steamState = choose("basis","Давление пара","absolute",[["absolute","Абсолютное"],["gauge","Избыточное"]]);
const quality = choose("state","Состояние пара","dry",[["dry","Сухой насыщенный"],["wet","Влажный насыщенный"],["superheated","Перегретый"]]);

export const calculatorDefinitions: CalDefinition[] = [
  {id:"pressure",group:"Конвертеры",title:"Конвертер давления",description:"12 единиц; отдельно абсолютное, избыточное и вакуумметрическое давление.",
    formula:"Pабс = Pизб + Pатм; Pизб = −Pвакуум",example:"1 МПа = 10 бар = 1 000 кПа.",
    fields:[num("value","Давление","1"),choose("unit","Единица ввода","MPa",pressureUnits),pressureState,num("atm","Атмосферное давление","1.01325","бар (абс.)")],
    caveat:"Вакуумметрическое давление вводится как положительная величина разрежения; абсолютное давление не может быть отрицательным."},
  {id:"power",group:"Конвертеры",title:"Конвертер тепловой мощности",description:"Ватты, калории, BTU и обе разновидности лошадиных сил.",
    formula:"P [Вт] = Pед × коэффициент; 1 kcal_th = 4 184 Дж",example:"5 МВт = 5 000 кВт ≈ 4,302 Гкал/ч при термохимической калории.",
    fields:[num("value","Мощность","5"),choose("unit","Исходная единица","MW",powerUnits)],
    caveat:"Использована термохимическая калория: 1 kcal = 4 184 Дж; не смешивать с энергетическими единицами."},
  {id:"energy",group:"Конвертеры",title:"Конвертер энергии",description:"Перевод энергии и необязательный расчёт E = P × t.",
    formula:"1 кВт·ч = 3,6 МДж; E [кВт·ч] = P [кВт] × t [ч]",example:"2 МВт × 10 часов = 20 000 кВт·ч.",
    fields:[num("value","Тепловая энергия","1"),choose("unit","Единица ввода","MWh",energyUnits),num("power","Мощность для дополнительного расчёта","2000","кВт"),num("hours","Время работы","10","ч")],
    caveat:"Мощность и энергия — разные величины. Дополнительная выработка вычисляется только по заданному времени."},
  {id:"temperature",group:"Конвертеры",title:"Конвертер температуры",description:"°C, K, °F. Отдельный режим разности температур.",
    formula:"T[K] = t[°C] + 273,15; ΔK = Δ°C; Δ°F = 1,8×Δ°C",example:"90 °C = 363,15 K; 20 °C перепада = 20 K.",
    fields:[num("value","Температура или перепад","90"),choose("unit","Единица ввода","C",[["C","°C"],["K","K"],["F","°F"]]),choose("mode","Режим","absolute",[["absolute","Абсолютная температура"],["delta","Разность температур"]])],
    caveat:"Для перепада температур нулевая точка шкал не прибавляется. Абсолютная температура должна быть ≥ 0 K."},
  {id:"volume-flow",group:"Конвертеры",title:"Конвертер объёмного расхода",description:"Единицы объёмного расхода жидкостей от л/с до м³/сут.",
    formula:"1 м³/ч = 1 000 л/ч = 0,277778 л/с",example:"10 м³/ч = 10 000 л/ч ≈ 2,778 л/с.",
    fields:[num("value","Расход","10"),choose("unit","Единица ввода","m3h",volumeUnits)],
    caveat:"Конвертация сохраняет объёмный расход. Плотность жидкости не учитывается, пока не задан массовый расход."},
  {id:"mass-flow",group:"Конвертеры",title:"Конвертер массового расхода",description:"Перевод кг/с, кг/ч и т/ч; объёмный расход по плотности.",
    formula:"V [м³/ч] = G [кг/ч] / ρ [кг/м³]",example:"1 т/ч ≈ 0,277778 кг/с; при 1 000 кг/м³ это 1 м³/ч.",
    fields:[num("value","Массовый расход","1"),choose("unit","Единица ввода","th",massUnits),num("density","Плотность теплоносителя","1000","кг/м³")],
    caveat:"Плотность — вводимый параметр; при изменении температуры/состава жидкости необходимо пересчитать."},
  {id:"water-power",group:"Водогрейные котлы",title:"Мощность по расходу воды",description:"Полезная мощность по объёмному расходу и температурному графику.",
    formula:"Q [кВт] = V [м³/ч] × ρ [кг/м³] × Cp [кДж/(кг·К)] × ΔT / 3 600",
    example:"50 м³/ч, 90/70 °C: ≈ 1 163 кВт при ρ=1 000, Cp=4,1868.",
    fields:[num("flow","Объёмный расход","50","м³/ч"),num("supply","Температура подачи","90","°C"),num("return","Температура обратки","70","°C"),num("density","Плотность","1000","кг/м³"),num("cp","Теплоёмкость","4.1868","кДж/(кг·К)")],
    caveat:"Свойства воды заданы как явное приближение, а не вычислены при рабочей температуре. Для гликолей и масел вводите их фактические свойства.",equipment:"water"},
  {id:"water-flow",group:"Водогрейные котлы",title:"Расход воды по мощности",description:"Необходимый расход теплоносителя при известной мощности.",
    formula:"V [м³/ч] = 3 600 × Q [кВт] / (ρ × Cp × ΔT)",
    example:"1 000 кВт, 90/70 °C: ≈ 42,99 м³/ч.",
    fields:[num("power","Тепловая мощность","1000","кВт"),num("supply","Температура подачи","90","°C"),num("return","Температура обратки","70","°C"),num("density","Плотность","1000","кг/м³"),num("cp","Теплоёмкость","4.1868","кДж/(кг·К)")],
    caveat:"Используются заданные свойства теплоносителя. Проверка расходов и насосов требует гидравлического расчёта.",equipment:"pump"},
  {id:"steam-capacity",group:"Паровые котлы",title:"Паропроизводительность → мощность",description:"Тепловая мощность с IAPWS-IF97 по энтальпии пара и питательной воды.",
    formula:"Q [кВт] = G [кг/ч] × (hп − hв) / 3 600",
    example:"1 т/ч сухого насыщенного пара при 10 бар абс., питательная вода 100 °C: ≈ 655 кВт.",
    fields:[num("steam","Паропроизводительность","1","т/ч"),num("pressure","Давление пара","10","бар"),steamState,num("atm","Атмосферное давление","1.01325","бар"),quality,num("x","Степень сухости x","0.95","0…1"),num("superheat","Температура перегретого пара","200","°C"),num("feed","Температура питательной воды","100","°C")],
    caveat:"Для насыщенного пара используется IAPWS-IF97. Перегретый пар требует температуры выше температуры насыщения и отдельной проверки допустимости режима.",equipment:"steam"},
  {id:"steam-from-power",group:"Паровые котлы",title:"Мощность → паропроизводительность",description:"Обратный расчёт по IAPWS-IF97 без фиксированного коэффициента т/ч–кВт.",
    formula:"G [кг/ч] = 3 600 × Q [кВт] / (hп − hв)",
    example:"655 кВт при 10 бар абс. и питательной воде 100 °C дают около 1 т/ч.",
    fields:[num("power","Полезная мощность","655","кВт"),num("pressure","Давление пара","10","бар"),steamState,num("atm","Атмосферное давление","1.01325","бар"),quality,num("x","Степень сухости x","0.95","0…1"),num("superheat","Температура перегретого пара","200","°C"),num("feed","Температура питательной воды","100","°C")],
    caveat:"Предварительный тепловой баланс без потерь котла и без продувки. Подбор требует проверки давления и эксплуатационных требований.",equipment:"steam"},
  {id:"steam-saturation",group:"Паровые котлы",title:"Температура насыщения и давление",description:"Обратимые параметры линии насыщения по IAPWS-IF97.",
    formula:"Tsat = f(Pабс) или Psat = f(T) по Region 4 IAPWS-IF97",
    example:"При 10 бар абсолютного давления температура насыщения ≈ 179,9 °C.",
    fields:[choose("mode","Направление","pressure",[["pressure","По давлению → температура"],["temperature","По температуре → давление"]]),num("pressure","Давление пара","10","бар"),steamState,num("atm","Атмосферное давление","1.01325","бар"),num("temperature","Температура насыщения","180","°C")],
    caveat:"Для перегретого пара температура не определяется одним давлением. Давление в IAPWS рассчитывается абсолютное.",equipment:"steam"},
  {id:"steam-properties",group:"Паровые котлы",title:"Таблица свойств воды и пара",description:"Насыщенные жидкость и пар, либо перегретый пар; IAPWS-IF97.",
    formula:"h, v, s, ρ, Cp = IF97(Pабс, T или x)",
    example:"10 бар абс.: h насыщенного пара ≈ 2 777 кДж/кг.",
    fields:[num("pressure","Давление пара","10","бар"),steamState,num("atm","Атмосферное давление","1.01325","бар"),quality,num("x","Степень сухости x","0.95","0…1"),num("superheat","Температура перегретого пара","200","°C")],
    caveat:"Для смеси Cp не определяется как свойство однофазной среды. При перегреве требуется два независимых параметра.",equipment:"steam"},
  {id:"gas-consumption",group:"Топливо",title:"Расход природного газа",description:"Нормальный расход газа с КПД, загрузкой и параметрами газа.",
    formula:"Vн [норм. м³/ч] = Qполезн × z / (η × Hu)",
    example:"1 000 кВт, 93 %, Hu=9,5 кВт·ч/норм. м³: ≈ 113,2 норм. м³/ч.",
    fields:[num("power","Номинальная полезная мощность","1000","кВт"),num("eff","КПД котла","93","%"),num("hu","Низшая теплота сгорания","9.5","кВт·ч/норм. м³"),num("load","Средняя загрузка","100","%"),num("hours","Работа в сутки","24","ч"),num("days","Рабочих суток в месяце","30","сут")],
    caveat:"Hu — низшая теплота сгорания для явно заданных нормальных условий. Значение 9,5 является вводимым допущением, не паспортом газа.",equipment:"fuel"},
  {id:"diesel-consumption",group:"Топливо",title:"Расход дизельного топлива",description:"Массовый и объёмный расход с учётом КПД и плотности.",
    formula:"G [кг/ч] = Q × z / (η × Hu); V [л/ч] = G / ρ",
    example:"1 000 кВт, КПД 93 %, Hu 11,8 кВт·ч/кг, ρ 0,84 кг/л.",
    fields:[num("power","Номинальная полезная мощность","1000","кВт"),num("eff","КПД котла","93","%"),num("hu","Низшая теплота сгорания","11.8","кВт·ч/кг"),num("density","Плотность дизельного топлива","0.84","кг/л"),num("load","Средняя загрузка","100","%"),num("hours","Работа в сутки","24","ч"),num("days","Рабочих суток в месяце","30","сут")],
    caveat:"Плотность и Hu зависят от партии топлива и температуры. Значения по умолчанию — предположения, требующие проверки.",equipment:"fuel"},
  {id:"pipe-diameter",group:"Гидравлика",title:"Внутренний диаметр трубопровода",description:"Расчёт внутреннего диаметра по расходу и допустимой скорости.",
    formula:"D [м] = √(4 × V [м³/ч] / (3 600 × π × w [м/с]))",
    example:"40 м³/ч при скорости 1 м/с → внутренний диаметр ≈ 119 мм.",
    fields:[num("flow","Расход жидкости","40","м³/ч"),num("velocity","Допустимая скорость","1","м/с")],
    caveat:"Полученный D — расчётный внутренний диаметр. DN/NPS и наружный диаметр не равны автоматически этому значению.",equipment:"pump"},
  {id:"flow-velocity",group:"Гидравлика",title:"Скорость теплоносителя в трубе",description:"Средняя скорость потока в круглом трубопроводе.",
    formula:"w [м/с] = 4 × V [м³/ч] / (3 600 × π × Dвнутр² [м²])",
    example:"40 м³/ч, Dвнутр=120 мм: ≈ 0,982 м/с.",
    fields:[num("flow","Объёмный расход","40","м³/ч"),num("diameter","Внутренний диаметр","120","мм")],
    caveat:"Используйте именно внутренний, не условный или наружный диаметр. Допустимую скорость определяет проектировщик.",equipment:"pump"},
];

// 36 additional engineering estimates use the same field schema and calculation UI.
// Inputs without certified property curves are explicit, never secretly estimated.
calculatorDefinitions.push(...secondaryDefinitions);

export const calculatorById = (id: string) => calculatorDefinitions.find((def) => def.id === id);
const PRESSURE_TO_PA: Record<string, number> = {
  Pa:1,kPa:1000,MPa:1e6,bar:1e5,mbar:100,atm:101325,at:98066.5,
  kgfcm2:98066.5,psi:6894.757293168,mmHg:133.322387415,mmH2O:9.80665,mH2O:9806.65,
};
const POWER_TO_W: Record<string, number> = {
  W:1,kW:1e3,MW:1e6,GW:1e9,kcalh:4184/3600,Mcalh:4184e3/3600,
  Gcalh:4184e6/3600,BTUh:1055.05585262/3600,MMBTUh:1055.05585262e6/3600,
  hp:745.699871582,boilerhp:9809.5,
};
const ENERGY_TO_J: Record<string, number> = {
  J:1,kJ:1e3,MJ:1e6,GJ:1e9,kWh:3.6e6,MWh:3.6e9,Gcal:4184e6,BTU:1055.05585262,
};
const VOLUME_TO_M3H: Record<string,number> = {ls:3.6,lmin:0.06,lh:0.001,m3s:3600,m3min:60,m3h:1,m3day:1/24};
const MASS_TO_KGH: Record<string,number> = {kgs:3600,kgmin:60,kgh:1,th:1000,tday:1000/24};
function finite(value: number, label: string, min?: number, max?: number): number {
  if (!Number.isFinite(value) || (min != null && value < min) || (max != null && value > max)) {
    throw new Error(label + ": значение вне допустимого диапазона");
  }
  return value;
}
function get(raw: Record<string,string>, key: string, label = key, min?: number, max?: number): number {
  const value=raw[key];
  if (value == null || value.trim() === "") throw new Error("Заполните поле «" + label + "»");
  const cleaned=value.replace(/[\u00a0\u202f ]/g,"").replace(",",".");
  if (!/^[+-]?(?:\d+\.?\d*|\.\d+)$/.test(cleaned)) throw new Error("Некорректное число в поле «" + label + "»");
  return finite(Number(cleaned), label, min, max);
}
function positive(raw: Record<string,string>,key:string): number {
  const value=get(raw,key,key,0);
  if (value<=0)throw new Error("Значение «" + key + "» должно быть больше нуля");
  return value;
}
function option(raw: Record<string,string>,key:string, allowed:string[]): string {
  const value=raw[key]??"";
  if(!allowed.includes(value))throw new Error("Неподдерживаемое значение поля «" + key + "»");
  return value;
}
const r = (label:string,value:number,unit:string,digits=4): CalRow => ({label,value:finite(value,label),unit,digits});
function units(base:number, coefficients:Record<string,number>, names:Array<[string,string]>): CalRow[] {
  return names.map(([key,label])=>r(label,base/coefficients[key],label,6));
}
function absolutePressureBar(raw: Record<string,string>):number {
  const p=get(raw,"pressure","Давление пара",0);
  const atm=positive(raw,"atm");
  const basis=option(raw,"basis",["absolute","gauge"]);
  const abs=basis==="absolute"?p:p+atm;
  if(abs<=0)throw new Error("Абсолютное давление должно быть больше нуля");
  return abs;
}
function waterState(raw:Record<string,string>):{delta:number,rho:number,cp:number}{
  const supply=get(raw,"supply","Подача",-273.15);
  const back=get(raw,"return","Обратка",-273.15);
  if(supply<=back)throw new Error("Температура подачи должна быть выше обратки");
  return {delta:supply-back,rho:positive(raw,"density"),cp:positive(raw,"cp")};
}
function steamThermo(raw: Record<string,string>) {
  const absBar=absolutePressureBar(raw);
  const mp=absBar/10;
  const feed=get(raw,"feed","Температура питательной воды",0,350);
  const state=option(raw,"state",["dry","wet","superheated"]);
  if(mp<0.000611657 || mp>=22.064)throw new Error("Для расчёта по линии насыщения требуется давление от тройной до критической точки (<220,64 бар абсолютного)");
  const f=solvePx(mp,0),dry=solvePx(mp,1);
  let steam=dry;
  if(state==="wet"){
    const x=get(raw,"x","Степень сухости",0,1);
    steam=solvePx(mp,x);
  }
  if(state==="superheated"){
    const tc=get(raw,"superheat","Температура перегрева",-273.14,800);
    if(tc+273.15<=dry.temperature+0.001)throw new Error("Температура перегретого пара должна быть выше насыщения");
    steam=solvePT(mp,tc+273.15);
  }
  if(feed+273.15>=dry.temperature)throw new Error("Температура питательной воды должна быть ниже температуры насыщения при заданном давлении");
  const fw=solvePT(mp,feed+273.15);
  const dh=steam.enthalpy-fw.enthalpy;
  if(dh<=0)throw new Error("Энтальпия подаваемого пара должна превышать энтальпию питательной воды");
  return {mp,steam,dry,water:f,fw,dh};
}
function wrap(compute:()=>CalResult):CalResult {
  try{return compute()}
  catch(error){
    if(error instanceof Error)throw error;
    throw new Error("Расчёт не выполнен: параметры вне диапазона модели");
  }
}
export function calculate(id: string, raw: Record<string,string>): CalResult {
  return wrap(() => {
    const notes:string[] = [];
    switch (id) {
      case "pressure":{
        const value=get(raw,"value","Давление");
        const unit=option(raw,"unit",pressureUnits.map(x=>x[0]));
        const atm=positive(raw,"atm")*1e5;
        const basis=option(raw,"basis",["absolute","gauge","vacuum"]);
        if(basis==="vacuum"&&value<0)throw new Error("Вакуумметрическое значение вводится как неотрицательная величина разрежения");
        const pPa=value*PRESSURE_TO_PA[unit];
        const abs=basis==="absolute"?pPa:basis==="gauge"?pPa+atm:atm-pPa;
        if(abs<0)throw new Error("Абсолютное давление не может быть отрицательным");
        const gauge=abs-atm;
        return {rows:[
          ...units(basis==="absolute"?abs:basis==="gauge"?gauge:atm-abs,PRESSURE_TO_PA,pressureUnits),
          r("Абсолютное давление",abs/1e5,"бар"),r("Избыточное давление",gauge/1e5,"бар"),
          r("Вакуумметрическое разрежение",Math.max(0,-gauge)/1e5,"бар"),
        ],notes:["Все пересчитанные единицы относятся к выбранному режиму. Бар абсолютный и бар избыточный — разные величины."]};
      }
      case "power":{
        const unit=option(raw,"unit",powerUnits.map(x=>x[0])),w=get(raw,"value","Мощность",0)*POWER_TO_W[unit];
        return {rows:units(w,POWER_TO_W,powerUnits),notes:["Термохимическая калория: 1 ккал = 4 184 Дж. Международная BTU (IT)."]};
      }
      case "energy":{
        const unit=option(raw,"unit",energyUnits.map(x=>x[0])),j=get(raw,"value","Энергия",0)*ENERGY_TO_J[unit];
        const rows=units(j,ENERGY_TO_J,energyUnits);
        const p=get(raw,"power","Мощность",0),t=get(raw,"hours","Время",0);
        rows.push(r("Энергия при указанной мощности и времени",p*t,"кВт·ч"));
        return {rows,notes:["Величина энергии и производимая за период энергия — отдельные расчёты."]};
      }
      case "temperature":{
        const value=get(raw,"value","Температура"),unit=option(raw,"unit",["C","K","F"]);
        const mode=option(raw,"mode",["absolute","delta"]);
        const c=mode==="delta"?(unit==="F"?value/1.8:value):(unit==="C"?value:unit==="K"?value-273.15:(value-32)/1.8);
        if(mode==="absolute"&&c< -273.15)throw new Error("Температура ниже абсолютного нуля");
        return {rows:[r("Цельсий",c,"°C"),r("Кельвин",mode==="delta"?c:c+273.15,"K"),r("Фаренгейт",mode==="delta"?c*1.8:c*1.8+32,"°F")],
          notes:[mode==="delta"?"Разность температур: Δ°C = ΔK, и Δ°F = 1,8×Δ°C.":"Абсолютная температура: нулевые точки шкал учитываются."]};
      }
      case "volume-flow":{
        const unit=option(raw,"unit",volumeUnits.map(x=>x[0])),base=get(raw,"value","Расход",0)*VOLUME_TO_M3H[unit];
        return {rows:units(base,VOLUME_TO_M3H,volumeUnits),notes:["Единицы относятся только к объёмному расходу."]};
      }
      case "mass-flow":{
        const unit=option(raw,"unit",massUnits.map(x=>x[0])),base=get(raw,"value","Расход",0)*MASS_TO_KGH[unit];
        return {rows:[...units(base,MASS_TO_KGH,massUnits),r("Объёмный расход по заданной плотности",base/positive(raw,"density"),"м³/ч")],
          notes:["Плотность введена вручную, не рассчитана автоматически по марке и температуре."]};
      }
      case "water-power":{
        const flow=get(raw,"flow","Расход",0),{delta,rho,cp}=waterState(raw);
        const power=flow*rho*cp*delta/3600;
        return {rows:[r("Тепловая мощность",power,"кВт"),r("Тепловая мощность",power/1000,"МВт"),r("Перепад температуры",delta,"К"),r("Массовый расход",flow*rho,"кг/ч")],
          notes:["Принято: ρ = "+rho+" кг/м³; Cp = "+cp+" кДж/(кг·К)."],selection:{powerKw:power,flowM3h:flow}};
      }
      case "water-flow":{
        const power=get(raw,"power","Мощность",0),{delta,rho,cp}=waterState(raw);
        const flow=3600*power/(rho*cp*delta);
        return {rows:[r("Необходимый объёмный расход",flow,"м³/ч"),r("Массовый расход",flow*rho,"кг/ч"),r("Перепад температуры",delta,"К")],
          notes:["Расчёт по заданным значениям ρ = "+rho+" кг/м³ и Cp = "+cp+" кДж/(кг·К)."],selection:{powerKw:power,flowM3h:flow}};
      }
      case "steam-capacity":{
        const {mp,steam,dry,fw,dh}=steamThermo(raw);
        const kg=get(raw,"steam","Паропроизводительность",0)*1000;
        const power=kg*dh/3600;
        return {rows:[r("Полезная тепловая мощность",power,"кВт"),r("Полезная тепловая мощность",power/1000,"МВт"),
          r("Энтальпия пара",steam.enthalpy,"кДж/кг"),r("Энтальпия питательной воды",fw.enthalpy,"кДж/кг"),
          r("Разность энтальпий",dh,"кДж/кг"),r("Температура насыщения",dry.temperature-273.15,"°C"),r("Абсолютное давление",mp*10,"бар")],
          notes:["IAPWS-IF97. КПД котла и продувка не учтены; Q — полезная мощность передачи тепла воде/пару."],
          selection:{steamKgH:kg,powerKw:power}};
      }
      case "steam-from-power":{
        const {mp,steam,dry,fw,dh}=steamThermo(raw);
        const power=get(raw,"power","Мощность",0),kg=power*3600/dh;
        return {rows:[r("Расход пара",kg,"кг/ч"),r("Паропроизводительность",kg/1000,"т/ч"),
          r("Энтальпия пара",steam.enthalpy,"кДж/кг"),r("Энтальпия питательной воды",fw.enthalpy,"кДж/кг"),
          r("Разность энтальпий",dh,"кДж/кг"),r("Температура насыщения",dry.temperature-273.15,"°C"),r("Абсолютное давление",mp*10,"бар")],
          notes:["IAPWS-IF97. В данном расчёте указанная мощность — полезная тепловая мощность, а не расход топлива."],
          selection:{steamKgH:kg,powerKw:power}};
      }
      case "steam-saturation":{
        const mode=option(raw,"mode",["pressure","temperature"]);
        const steam=mode==="pressure"
          ? solvePx(absolutePressureBar(raw)/10,1)
          : solveTx(get(raw,"temperature","Температура насыщения",0.01,373.9)+273.15,1);
        const water=solvePx(steam.pressure,0);
        return {rows:[r("Температура насыщения",steam.temperature-273.15,"°C"),r("Абсолютное давление",steam.pressure*10,"бар"),
          r("Абсолютное давление",steam.pressure,"МПа"),r("Энтальпия насыщенного пара",steam.enthalpy,"кДж/кг"),
          r("Энтальпия насыщенной воды",water.enthalpy,"кДж/кг"),r("Удельный объём пара",steam.specificVolume,"м³/кг",6)],
          notes:["IAPWS-IF97, равновесие жидкость–пар. Перегрев по одному давлению не определяется."]};
      }
      case "steam-properties":{
        const abs=absolutePressureBar(raw);
        const rawState=option(raw,"state",["dry","wet","superheated"]);
        const mp=abs/10;
        if(mp<0.000611657||mp>=22.064)throw new Error("Насыщенное состояние не поддерживается при текущем давлении");
        const water=solvePx(mp,0),dry=solvePx(mp,1);
        const state=rawState==="wet"?solvePx(mp,get(raw,"x","Степень сухости",0,1))
          :rawState==="superheated"?solvePT(mp,get(raw,"superheat","Температура перегрева",-273.14,800)+273.15):dry;
        if(rawState==="superheated"&&state.temperature<=dry.temperature+0.001)throw new Error("Для перегретого пара нужна температура выше насыщения");
        const rows=[r("Абсолютное давление",abs,"бар"),r("Температура насыщения",dry.temperature-273.15,"°C"),
          r("Температура расчётного состояния",state.temperature-273.15,"°C"),
          r("Энтальпия насыщенной воды hf",water.enthalpy,"кДж/кг"),
          r("Энтальпия насыщенного пара hg",dry.enthalpy,"кДж/кг"),
          r("Удельная теплота парообразования hfg",dry.enthalpy-water.enthalpy,"кДж/кг"),
          r("Энтальпия выбранного состояния h",state.enthalpy,"кДж/кг"),
          r("Удельный объём v",state.specificVolume,"м³/кг",6),r("Плотность",state.density,"кг/м³",6),
          r("Удельная энтропия",state.entropy,"кДж/(кг·К)",6)];
        if(state.cp!=null)rows.push(r("Теплоёмкость Cp (однофазное состояние)",state.cp,"кДж/(кг·К)",6));
        return {rows,notes:["Свойства IAPWS-IF97; при двухфазной смеси Cp не выдаётся как однофазная теплоёмкость."]};
      }
      case "gas-consumption":{
        const power=get(raw,"power","Мощность",0),eff=get(raw,"eff","КПД",0.01,100)/100,hu=positive(raw,"hu"),
          load=get(raw,"load","Загрузка",0,100)/100,hours=get(raw,"hours","Часы",0,24),days=get(raw,"days","Сутки",0,31);
        const v=power*load/(eff*hu);
        return {rows:[r("Нормальный расход газа",v,"норм. м³/ч"),r("Расход за сутки",v*hours,"норм. м³"),
          r("Расход за месяц",v*hours*days,"норм. м³"),r("Тепловая мощность топлива",power*load/eff,"кВт"),
          r("Полезная нагрузка",power*load,"кВт")],
          notes:["Hu = "+hu+" кВт·ч/норм. м³, КПД "+(eff*100)+" %. Сопоставьте нормальные условия с паспортом/договором."],
          selection:{powerKw:power*load}};
      }
      case "diesel-consumption":{
        const power=get(raw,"power","Мощность",0),eff=get(raw,"eff","КПД",0.01,100)/100,hu=positive(raw,"hu"),
          density=positive(raw,"density"),load=get(raw,"load","Загрузка",0,100)/100,
          hours=get(raw,"hours","Часы",0,24),days=get(raw,"days","Сутки",0,31);
        const mass=power*load/(eff*hu),v=mass/density;
        return {rows:[r("Массовый расход дизеля",mass,"кг/ч"),r("Объёмный расход дизеля",v,"л/ч"),
          r("Расход за сутки",v*hours,"л"),r("Расход за месяц",v*hours*days,"л"),
          r("Полезная нагрузка",power*load,"кВт")],
          notes:["Hu = "+hu+" кВт·ч/кг, плотность "+density+" кг/л: принятые исходные данные, не паспорт топлива."],
          selection:{powerKw:power*load}};
      }
      case "pipe-diameter":{
        const flow=get(raw,"flow","Расход",0),vel=positive(raw,"velocity"),d=Math.sqrt(4*flow/(3600*Math.PI*vel));
        return {rows:[r("Расчётный внутренний диаметр",d*1000,"мм"),r("Внутренний диаметр",d,"м"),r("Расход жидкости",flow,"м³/ч"),r("Расчётная скорость",vel,"м/с")],
          notes:["Это минимальный расчётный внутренний диаметр при указанном пределе скорости. Материал и толщина стенки определяют наружный размер."],
          selection:{flowM3h:flow}};
      }
      case "flow-velocity":{
        const flow=get(raw,"flow","Расход",0),d=positive(raw,"diameter")/1000,vel=4*flow/(3600*Math.PI*d*d);
        return {rows:[r("Средняя скорость жидкости",vel,"м/с"),r("Внутренний диаметр",d*1000,"мм"),r("Объёмный расход",flow,"м³/ч")],
          notes:["Фактическая допустимость скорости зависит от материала, теплоносителя и требований проекта."],
          selection:{flowM3h:flow}};
      }
      default:return calculateSecondary(id,raw);
    }
  });
}
export function initialInputs(id: string): Record<string,string> {
  return Object.fromEntries((calculatorById(id)?.fields ?? []).map(f=>[f.id,f.value]));
}
export function formatCal(value: number, digits=4):string {
  return value.toLocaleString("ru-RU",{maximumFractionDigits:digits});
}

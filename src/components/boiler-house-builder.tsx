import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { LeadForm } from "@/components/lead-form";
import { PumpGroupsEditor, defaultPumpRoles, validPumpRoles } from "@/components/pump-groups-editor";
import { evaluatePumpGroup, newPumpGroup, type PumpGroup } from "@/lib/pump-engineering";
import { pumpRoles } from "@/data/pumps";
import { fuels, type FuelId } from "@/data/catalog";
import { manufacturers } from "@/data/manufacturers";
import { publishedCatalogs } from "@/data/series-index";
import {
  formatEngineeringNumber as fmt,
  parseEngineeringNumber as parse,
  powerToKw,
  pressureToMPa,
  steamToKgH,
  temperatureCToK,
  temperatureToC,
  type PowerUnit, type PressureUnit, type SteamUnit, type TemperatureUnit,
} from "@/lib/engineering-units";
import {
  buildTechnicalBrief, calculatePlant, findBoilerCandidates,
  type AutomationLevel, type DutyKind, type OperationMode,
  type PlantLocation, type PlantMode, type ReserveMode, type WaterCircuit,
  type TrainCalculation,
} from "@/lib/boiler-house";

const stageNames = ["Назначение и нагрузка", "Тепловой режим", "Котлоагрегаты", "Инженерные системы", "ТЗ и запрос"] as const;
const systemChoices = [
  { id: "fuel-supply", title: "Топливоподготовка и подача топлива", mode: "both", hint: "Рампы, редуцирование, хранение при необходимости" },
  { id: "circulation", title: "Сетевые и циркуляционные насосы", mode: "water", hint: "Расходы, напоры, резервирование по гидравлическому расчёту" },
  { id: "heat-exchanger", title: "Теплообменники и разделение контуров", mode: "water", hint: "Только при соответствующей гидравлической схеме" },
  { id: "makeup", title: "Подпитка, расширение и поддержание давления", mode: "water", hint: "Расширительные ёмкости, подпиточные насосы" },
  { id: "feedwater", title: "Питательные насосы и ёмкости", mode: "steam", hint: "Резервирование и регулируемое питание паровых котлов" },
  { id: "deaerator", title: "Деаэрация", mode: "steam", hint: "Тип и производительность — по водно-химическому расчёту" },
  { id: "condensate", title: "Сбор и возврат конденсата", mode: "steam", hint: "Конденсатные насосы, ёмкости, теплоутилизация" },
  { id: "blowdown", title: "Продувка и обработка стоков", mode: "steam", hint: "Теплоотбор и охлаждение — по режиму котлов" },
  { id: "treatment", title: "Химводоподготовка / водоподготовка", mode: "both", hint: "На основании анализа исходной воды" },
  { id: "economizer", title: "Экономайзер / теплоутилизатор", mode: "both", hint: "Проверка температуры газов и рисков конденсации" },
  { id: "flues", title: "Газоходы и дымовая труба", mode: "both", hint: "Аэродинамика, высота, условия рассеивания" },
  { id: "ventilation", title: "Воздух горения и вентиляция", mode: "both", hint: "Расходы воздуха, аварийные режимы" },
  { id: "electrical", title: "Электроснабжение и щиты", mode: "both", hint: "Категория надёжности, АВР по заданию" },
  { id: "automation", title: "КИПиА, автоматика и защиты", mode: "both", hint: "ПАЗ, межблокировки, режимное управление" },
  { id: "scada", title: "Диспетчеризация / SCADA", mode: "both", hint: "Удалённый мониторинг и архив сигналов" },
  { id: "metering", title: "Учёт воды, топлива и энергии", mode: "both", hint: "Коммерческий и технический по назначению" },
  { id: "environment", title: "Экологические мероприятия", mode: "both", hint: "Выбросы и очистка — по проектным расчётам" },
  { id: "reserve-power", title: "Резервное электроснабжение", mode: "both", hint: "АВР / ДГУ при наличии требований" },
  { id: "fire", title: "Пожарная безопасность", mode: "both", hint: "Состав мер определяется проектной документацией" },
] as const;
const sharedSystems = ["fuel-supply", "treatment", "flues", "ventilation", "electrical", "automation", "metering"];
const waterSystems = ["circulation", "makeup"];
const steamSystems = ["feedwater", "deaerator", "condensate", "blowdown"];
const catalogEntries = publishedCatalogs.flatMap((maker) => maker.series.map((series) => ({
  slug: maker.slug, maker: maker.title, series,
  line: manufacturers.find((v) => v.slug === maker.slug)?.line,
})));
const inputClass = "h-11 w-full min-w-0 rounded-xl border border-line bg-surface px-3 text-sm text-ink focus-visible:outline-2";
type State = {
  mode: PlantMode; object: string; location: string; purposes: string[];
  heating: string; dhw: string; process: string; powerUnit: PowerUnit;
  steam: string; steamUnit: SteamUnit; operation: OperationMode;
  supply: string; returnWater: string; tempUnit: TemperatureUnit;
  steamCondition: "unknown" | "saturated" | "superheated"; steamTemperature: string;
  condensate: string; waterPressure: string; steamPressure: string;
  pressureUnit: PressureUnit; circuit: WaterCircuit;
  heatCount: number; steamCount: number;
  heatReserve: ReserveMode; steamReserve: ReserveMode;
  mainFuel: FuelId | ""; alternateFuel: FuelId | "";
  placement: PlantLocation; automation: AutomationLevel;
  systems: string[]; notes: string;
  preferredWater: string; preferredSteam: string;
};
const initial: State = {
  mode:"water", object:"", location:"", purposes:["Отопление и вентиляция"],
  heating:"", dhw:"", process:"", powerUnit:"MW",
  steam:"", steamUnit:"t/h", operation:"continuous",
  supply:"", returnWater:"", tempUnit:"C",
  steamCondition:"unknown", steamTemperature:"", condensate:"",
  waterPressure:"", steamPressure:"", pressureUnit:"bar", circuit:"to-decide",
  heatCount:2, steamCount:2, heatReserve:"n-plus-one", steamReserve:"n-plus-one",
  mainFuel:"", alternateFuel:"", placement:"modular", automation:"to-decide",
  systems:[...sharedSystems, ...waterSystems], notes:"", preferredWater:"", preferredSteam:"",
};
const purposeChoices = ["Отопление и вентиляция", "Горячее водоснабжение", "Технологическое тепло", "Технологический пар", "Резерв существующего объекта"];
const labels = {
  mode: { water:"Водогрейная", steam:"Паровая", combined:"Комбинированная" },
  placement: { modular:"Блочно-модульная", standalone:"Отдельно стоящая", "built-in":"Встроенная / пристроенная", existing:"Реконструкция" },
  operation: { continuous:"Круглогодичный", seasonal:"Сезонный", variable:"Переменная нагрузка" },
};
function Num({ title, value, set, hint, placeholder }: {
  title: string; value: string; set: (v: string) => void; hint?: string; placeholder?: string;
}) {
  return <label className="grid min-w-0 content-start gap-1 text-sm font-semibold">{title}
    <input value={value} onChange={(e) => set(e.target.value)} inputMode="decimal" type="text"
      placeholder={placeholder ?? "Уточнить"} className={inputClass}/>
    {hint && <small className="text-xs font-normal text-muted">{hint}</small>}
  </label>;
}
function Select<T extends string>({ title, value, set, options }: {
  title: string; value: T; set:(v:T)=>void;
  options: {value:T;title:string}[];
}) {
  return <label className="grid min-w-0 content-start gap-1 text-sm font-semibold">{title}
    <select value={value} onChange={(e)=>set(e.target.value as T)} className={inputClass}>
      {options.map((o)=><option key={o.value} value={o.value}>{o.title}</option>)}
    </select>
  </label>;
}
function ToggleSet<T extends string>({ options, value, set }: {
  options: {value:T;title:string;detail?:string}[];value:T;set:(v:T)=>void;
}) {
  return <div className="grid gap-2 sm:grid-cols-3">{options.map((o)=>
    <button type="button" key={o.value} aria-pressed={value===o.value} onClick={()=>set(o.value)}
      className={(value===o.value?"bg-accent text-on-accent border-accent":"border-line bg-surface text-ink hover:bg-chip")+
        " min-h-20 rounded-2xl border-2 px-4 py-3 text-left"}>
      <span className="block text-sm font-semibold">{o.title}</span>
      {o.detail && <span className="mt-1 block text-xs opacity-75">{o.detail}</span>}
    </button>)}</div>;
}
function StepHead({ n, title, sub }: { n:number;title:string;sub:string }) {
  return <div className="mb-6">
    <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">Шаг 0{n} / 05</p>
    <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">{title}</h2>
    <p className="mt-2 text-sm leading-relaxed text-muted">{sub}</p>
  </div>;
}
function TrainBox({ name, train, unit }: { name: string; train: TrainCalculation | null;unit:string }) {
  return <div className="rounded-xl border border-line bg-bg/40 p-4">
    <p className="text-sm font-semibold">{name}</p>
    {train ? <>
      <p className="mt-2 text-2xl font-extrabold tabular-nums">{fmt(train.minimumPerDutyUnit, 5)} {unit}</p>
      <p className="text-xs text-muted">Минимальная производительность одного рабочего котла</p>
      <p className="mt-3 text-sm">{train.dutyUnits} рабочих + {train.standbyUnits} резервных</p>
      <p className="text-sm">Установленная номинальная: от {fmt(train.minimumTotalInstalled, 5)} {unit}</p>
    </> : <p className="mt-2 text-sm text-muted">Проверьте нагрузку и резервирование.</p>}
  </div>;
}
function Matches({ kind, train, mainFuel, alternateFuel, temp, selected, setSelected }: {
  kind:DutyKind; train:TrainCalculation|null;mainFuel:FuelId|"";alternateFuel:FuelId|"";temp:number|null;
  selected:string;setSelected:(id:string)=>void;
}) {
  const results=useMemo(()=>findBoilerCandidates({entries:catalogEntries,kind,dutyPerUnit:train?.minimumPerDutyUnit??0,
    mainFuel,reserveFuel:alternateFuel,minimumTempC:kind==="water"?temp:null,limit:5}),
    [kind,train?.minimumPerDutyUnit,mainFuel,alternateFuel,temp]);
  const unit=kind==="water"?"кВт":"кг/ч";
  return <div className="rounded-2xl border border-line p-4">
    <h3 className="font-semibold">{kind==="water"?"Водогрейная группа":"Паровая группа"} · предложения из каталога</h3>
    {results.length===0?<p className="mt-3 text-sm text-muted">Подтверждённых совпадений в текущих опубликованных сериях нет. Это не означает отсутствия подходящих котлов на рынке.</p>:
      <ul className="mt-3 grid gap-3">{results.map((v)=><li key={v.slug+"-"+v.series.id}
        className="rounded-xl bg-bg/50 p-3">
        <p className="text-xs font-semibold uppercase text-accent">{v.maker}</p>
        <p className="mt-1 text-sm font-bold">{v.series.name}</p>
        <p className="mt-1 text-xs text-muted">Диапазон: {fmt(v.capacityMin)}–{fmt(v.capacityMax)} {unit}</p>
        <p className="mt-1 text-xs text-muted">{v.closestPublishedSize?"Опубликованный типоразмер по производительности: "+v.closestPublishedSize.name:
          "Подтверждён только диапазон серии — модель не определена"}</p>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <Link to="/manufacturers/$slug" params={{slug:v.slug}} className="inline-block text-sm font-semibold text-accent hover:underline">
            Открыть характеристики
          </Link>
          <button type="button" aria-pressed={selected===v.slug+"/"+v.series.id}
            onClick={()=>setSelected(selected===v.slug+"/"+v.series.id?"":v.slug+"/"+v.series.id)}
            className={("rounded-xl border px-3 py-2 text-xs font-semibold "+(selected===v.slug+"/"+v.series.id
              ?"border-accent bg-accent text-on-accent":"border-line bg-surface text-ink hover:bg-chip"))}>
            {selected===v.slug+"/"+v.series.id?"Выбрано для ТЗ":"Добавить в ТЗ"}
          </button>
        </div>
      </li>)}</ul>}
    <p className="mt-3 text-xs leading-relaxed text-muted">Кандидаты подобраны только по категории, диапазону производительности, топливу и опубликованной температуре водогрейной серии. Давление, КПД, комплектация и применимость проверяются отдельно.</p>
  </div>;
}

export function BoilerHouseBuilder() {
  const [s, setS] = useState<State>(initial);
  const [step, setStep] = useState(0);
  const [furthest, setFurthest] = useState(0);
  const [copied, setCopied] = useState(false);
  const [pumpGroups, setPumpGroups] = useState<PumpGroup[]>([
    newPumpGroup("network","pump-1"),
    newPumpGroup("makeup","pump-2"),
  ]);
  const patch = (x: Partial<State>) => setS((prev)=>({...prev,...x}));
  const hasWater=s.mode!=="steam";
  const hasSteam=s.mode!=="water";
  const valid = (text:string, allowNegative=false)=>!text.trim() || parse(text,allowNegative)!=null;
  const number = (text:string)=>parse(text)??0;
  const heatItems=[s.heating,s.dhw,s.process].map((v)=>powerToKw(number(v),s.powerUnit));
  const heatKw=heatItems.reduce((sum,n)=>sum+n,0);
  const steamKgH=steamToKgH(number(s.steam),s.steamUnit);
  const waterSupplyC=s.supply.trim()?temperatureToC(parse(s.supply,true)??0,s.tempUnit):null;
  const waterReturnC=s.returnWater.trim()?temperatureToC(parse(s.returnWater,true)??0,s.tempUnit):null;
  const pWater=s.waterPressure.trim()?pressureToMPa(number(s.waterPressure),s.pressureUnit):null;
  const pSteam=s.steamPressure.trim()?pressureToMPa(number(s.steamPressure),s.pressureUnit):null;
  const condensate=s.condensate.trim()?parse(s.condensate):null;
  const plant=calculatePlant({mode:s.mode,heatKw,steamKgH,heatUnitCount:s.heatCount,steamUnitCount:s.steamCount,
    heatReserve:s.heatReserve,steamReserve:s.steamReserve});
  const availableSystems=systemChoices.filter((v)=>v.mode==="both"||(v.mode==="water"&&hasWater)||(v.mode==="steam"&&hasSteam));
  const selectedSystems=availableSystems.filter((v)=>s.systems.includes(v.id));
  const fuelName=(id:FuelId|"")=>fuels.find((v)=>v.id===id)?.title??"";
  const allowedPumpRoles = new Set(validPumpRoles(s.mode).map((p)=>p.id));
  const activePumps = pumpGroups.filter((p)=>allowedPumpRoles.has(p.role));
  const pumpInputIssues = activePumps.flatMap((p)=>evaluatePumpGroup(p).issues);
  const waterCandidates = useMemo(()=>findBoilerCandidates({entries:catalogEntries,kind:"water",
    dutyPerUnit:plant.heat?.minimumPerDutyUnit??0,mainFuel:s.mainFuel,reserveFuel:s.alternateFuel,
    minimumTempC:waterSupplyC,limit:5}),
    [plant.heat?.minimumPerDutyUnit,s.mainFuel,s.alternateFuel,waterSupplyC]);
  const steamCandidates = useMemo(()=>findBoilerCandidates({entries:catalogEntries,kind:"steam",
    dutyPerUnit:plant.steam?.minimumPerDutyUnit??0,mainFuel:s.mainFuel,reserveFuel:s.alternateFuel,
    limit:5}),[plant.steam?.minimumPerDutyUnit,s.mainFuel,s.alternateFuel]);
  const preferredEquipment = [
    ...(hasWater ? waterCandidates.filter((v)=>v.slug+"/"+v.series.id===s.preferredWater)
      .map((v)=>"Водогрейная группа: "+v.maker+" — "+v.series.name) : []),
    ...(hasSteam ? steamCandidates.filter((v)=>v.slug+"/"+v.series.id===s.preferredSteam)
      .map((v)=>"Паровая группа: "+v.maker+" — "+v.series.name) : []),
  ];
  const errs=[
    (hasWater&&(!valid(s.heating)||!valid(s.dhw)||!valid(s.process)||heatKw<=0))||
    (hasSteam&&(!valid(s.steam)||steamKgH<=0))?"Задайте положительную расчётную нагрузку для каждой выбранной группы. Допустимы числа с запятой.":null,
    (hasWater&&(!valid(s.supply,true)||!valid(s.returnWater,true)||!valid(s.waterPressure)
      ||(Boolean(s.supply.trim())!==Boolean(s.returnWater.trim()))
      ||(waterSupplyC!=null&&waterSupplyC< -273.15)||(waterReturnC!=null&&waterReturnC< -273.15)))
      ||(hasSteam&&(!valid(s.steamPressure)||!valid(s.condensate)
      ||(condensate!=null&&condensate>100)||!valid(s.steamTemperature,true)))
      ? "Проверьте температуры, давление и возврат конденсата (0–100 %). Для воды укажите обе температуры или ни одной.":
      hasWater&&waterSupplyC!=null&&waterReturnC!=null&&waterSupplyC<=waterReturnC?"Температура подачи должна быть выше температуры обратной линии.":null,
    (hasWater&&!plant.heat)||(hasSteam&&!plant.steam)?"При резервировании N+1 требуется минимум два котлоагрегата.":null,
    pumpInputIssues.length ? "Проверьте параметры насосных групп: "+pumpInputIssues.join("; ") : null,
    null,
  ];
  const allValid=errs.every((e)=>!e);
  const togglePurpose=(v:string)=>patch({purposes:s.purposes.includes(v)?s.purposes.filter((x)=>x!==v):[...s.purposes,v]});
  const changeMode=(v:PlantMode)=>{
    if(v===s.mode)return;
    patch({mode:v,systems:[...new Set([
      ...s.systems.filter((id)=>systemChoices.find((x)=>x.id===id)?.mode==="both"),
      ...(v!=="steam"?waterSystems:[]),...(v!=="water"?steamSystems:[])])]});
    setPumpGroups((previous)=>{
      const available=new Set(validPumpRoles(v).map((role)=>role.id));
      const kept=previous.filter((group)=>available.has(group.role));
      const present=new Set(kept.map((group)=>group.role));
      const start=Math.max(0,...previous.map((group)=>Number(group.id.replace(/^pump-/,""))||0))+1;
      const extra=defaultPumpRoles(v).filter((role)=>!present.has(role))
        .map((role,index)=>newPumpGroup(role,"pump-"+(start+index)));
      return [...kept,...extra];
    });
  };
  const changeUnit=(which:"powerUnit"|"steamUnit"|"tempUnit"|"pressureUnit",newUnit:string)=>{
    const convert=(raw:string,fn:(n:number)=>number)=>{
      const n=parse(raw,true);
      return n==null?raw:fmt(fn(n),10);
    };
    if(which==="powerUnit"){
      const factor=s.powerUnit==="MW"?1000:1;
      const div=newUnit==="MW"?1000:1;
      patch({powerUnit:newUnit as PowerUnit,heating:convert(s.heating,(v)=>v*factor/div),
        dhw:convert(s.dhw,(v)=>v*factor/div),process:convert(s.process,(v)=>v*factor/div)});
    }else if(which==="steamUnit"){
      const change=(v:string)=>convert(v,(n)=>{
        const kgh=steamToKgH(n,s.steamUnit);
        return newUnit==="kg/s"?kgh/3600:newUnit==="t/h"?kgh/1000:kgh;
      });
      patch({steamUnit:newUnit as SteamUnit,steam:change(s.steam)});
    }else if(which==="tempUnit"){
      const change=(v:string)=>convert(v,(n)=>{
        const c=temperatureToC(n,s.tempUnit);return newUnit==="K"?temperatureCToK(c):c;
      });
      patch({tempUnit:newUnit as TemperatureUnit,supply:change(s.supply),
        returnWater:change(s.returnWater),steamTemperature:change(s.steamTemperature)});
    }else{
      const change=(v:string)=>convert(v,(n)=>{
        const mpa=pressureToMPa(n,s.pressureUnit);
        return newUnit==="bar"?mpa*10:newUnit==="kPa"?mpa*1000:mpa;
      });
      patch({pressureUnit:newUnit as PressureUnit,waterPressure:change(s.waterPressure),steamPressure:change(s.steamPressure)});
    }
  };
  const brief=buildTechnicalBrief({
    object:s.object,location:s.location,mode:s.mode,purpose:s.purposes,
    heatLoads:{heatingKw:heatItems[0]??0,dhwKw:heatItems[1]??0,processKw:heatItems[2]??0},steamKgH,
    waterSupplyC,waterReturnC,waterPressureMPa:pWater,steamPressureMPa:pSteam,
    steamCondition:s.steamCondition==="unknown"?"уточнить":s.steamCondition==="saturated"?"насыщенный":
      "перегретый, "+(s.steamTemperature.trim()?s.steamTemperature+" "+(s.tempUnit==="K"?"K":"°C"):"температуру уточнить"),
    condensateReturnPct:condensate,mainFuel:fuelName(s.mainFuel),reserveFuel:fuelName(s.alternateFuel),
    operation:s.operation,placement:s.placement,circuit:s.circuit,automation:s.automation,
    heatTrain:plant.heat,steamTrain:plant.steam,chosenSystems:selectedSystems.map((v)=>v.title),
    preferredEquipment,pumpGroups:activePumps,notes:s.notes,
  });
  const toNext=()=>{if(errs[step])return;setStep((v)=>Math.min(v+1,4));setFurthest((v)=>Math.max(v,step+1));setCopied(false);};

  return <div className="min-h-dvh bg-bg text-ink">
    <header className="border-b border-line bg-surface">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4">
        <Link to="/" className="font-display text-xl font-extrabold">Котлы<span className="text-accent">.pro</span></Link>
        <Link to="/" className="text-sm font-semibold hover:text-accent">← К каталогу</Link>
      </div>
    </header>
    <main className="mx-auto max-w-6xl px-4 py-8">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Инженерный конструктор · Котельная под ключ</p>
      <h1 className="mt-3 max-w-4xl font-display text-3xl font-extrabold leading-tight sm:text-5xl">Сформировать конфигурацию котельной</h1>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">Пять этапов: нагрузка, параметры, котлоагрегаты, инженерные системы, техническое задание. Предварительная конфигурация не заменяет проектирование и экспертизу.</p>
      <nav aria-label="Этапы конструктора" className="mt-7 grid grid-cols-5 gap-0.5 rounded-2xl border border-line bg-surface p-2">
        {stageNames.map((n,i)=><button key={n} type="button" disabled={i>furthest}
          aria-current={step===i?"step":undefined} onClick={()=>setStep(i)}
          className={(step===i?"bg-accent text-on-accent":i<=furthest?"text-ink hover:bg-chip":"text-muted/40")+
            " min-h-16 min-w-0 rounded-xl px-0.5 py-2 text-center text-[10px] font-bold leading-tight sm:px-1 sm:text-xs disabled:cursor-not-allowed"}>
          <span className="block">{i+1}</span><span className="mt-1 hidden sm:block">{n}</span><span className="mt-1 block sm:hidden">{["Нагрузка","Режим","Котлы","Системы","ТЗ"][i]}</span>
        </button>)}
      </nav>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-chip"><div className="h-full bg-accent" style={{width:String((step+1)*20)+"%"}} /></div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1.65fr)_minmax(250px,0.7fr)]">
        <section className="min-w-0 rounded-3xl border border-line bg-surface p-4 sm:p-6">
          {step===0&&<>
            <StepHead n={1} title="Назначение и исходные нагрузки" sub="Данные вводятся пользователем. Мы не выводим мощность по площади, расходу топлива или условным коэффициентам."/>
            <ToggleSet value={s.mode} set={changeMode} options={[
              {value:"water",title:"Водогрейная",detail:"Отопление, ГВС, технологическое тепло"},
              {value:"steam",title:"Паровая",detail:"Пар для технологии"},
              {value:"combined",title:"Комбинированная",detail:"Две независимые группы котлов"},
            ]}/>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <label className="grid gap-1 text-sm font-semibold">Объект
                <input className={inputClass} maxLength={100} value={s.object} onChange={(e)=>patch({object:e.target.value})} placeholder="Предприятие / объект" />
              </label>
              <label className="grid gap-1 text-sm font-semibold">Город / регион
                <input className={inputClass} maxLength={100} value={s.location} onChange={(e)=>patch({location:e.target.value})} placeholder="Местоположение" />
              </label>
            </div>
            <fieldset className="mt-6"><legend className="text-sm font-semibold">Потребители</legend>
              <div className="mt-2 flex flex-wrap gap-2">{purposeChoices.map((p)=><button key={p} type="button" aria-pressed={s.purposes.includes(p)}
                onClick={()=>togglePurpose(p)} className={(s.purposes.includes(p)?"bg-accent text-on-accent":"bg-chip text-ink")+
                " rounded-xl px-3 py-2 text-sm"}>{p}</button>)}</div>
            </fieldset>
            {hasWater&&<div className="mt-6 rounded-2xl border border-line p-4">
              <div className="flex items-end justify-between gap-3">
                <h3 className="font-semibold">Расчётные тепловые нагрузки</h3>
                <Select title="Ед." value={s.powerUnit} set={(v)=>changeUnit("powerUnit",v)}
                  options={[{value:"MW",title:"МВт"},{value:"kW",title:"кВт"}]}/>
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                <Num title="Отопление и вентиляция" value={s.heating} set={(v)=>patch({heating:v})} placeholder="2,5"/>
                <Num title="ГВС" value={s.dhw} set={(v)=>patch({dhw:v})} placeholder="0,5"/>
                <Num title="Технологическое тепло" value={s.process} set={(v)=>patch({process:v})} placeholder="1,0"/>
              </div>
              <p className="mt-3 text-sm font-bold">Итого: {fmt(heatKw)} кВт ({fmt(heatKw/1000)} МВт)</p>
              <p className="mt-1 text-xs text-muted">Сумма без коэффициента одновременности, потерь и произвольного резерва.</p>
            </div>}
            {hasSteam&&<div className="mt-5 rounded-2xl border border-line p-4">
              <h3 className="font-semibold">Требуемая паропроизводительность</h3>
              <div className="mt-2 grid grid-cols-[minmax(0,1fr)_auto] gap-2">
                <Num title="Пиковый расход" value={s.steam} set={(v)=>patch({steam:v})} placeholder="5,0"/>
                <Select title="Ед." value={s.steamUnit} set={(v)=>changeUnit("steamUnit",v)}
                  options={[{value:"kg/s",title:"кг/с"},{value:"t/h",title:"т/ч"},{value:"kg/h",title:"кг/ч"}]}/>
              </div>
              <p className="mt-2 text-sm font-bold">{fmt(steamKgH/3600,6)} кг/с · {fmt(steamKgH)} кг/ч</p>
              <p className="mt-1 text-xs text-muted">Паровой расход не переводится в тепловую мощность без данных об энтальпиях.</p>
            </div>}
            <div className="mt-5"><Select title="Режим работы" value={s.operation} set={(v)=>patch({operation:v})}
              options={[{value:"continuous",title:"Круглогодично"},{value:"seasonal",title:"Сезонно"},{value:"variable",title:"Переменная / пиковая нагрузка"}]}/></div>
          </>}
          {step===1&&<>
            <StepHead n={2} title="Параметры теплоносителя" sub="Точные значения фиксируются в техническом задании. Давление пока не отбирает серии: в каталоге оно часто указано только текстом."/>
            {hasWater&&<div className="rounded-2xl border border-line p-4">
              <h3 className="font-semibold">Температурный график воды</h3>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]">
                <Num title="Подача" value={s.supply} set={(v)=>patch({supply:v})} placeholder="95"/>
                <Num title="Обратная" value={s.returnWater} set={(v)=>patch({returnWater:v})} placeholder="70"/>
                <Select title="Ед." value={s.tempUnit} set={(v)=>changeUnit("tempUnit",v)}
                  options={[{value:"C",title:"°C"},{value:"K",title:"K"}]}/>
              </div>
              <p className="mt-2 text-xs text-muted">В СИ: {waterSupplyC==null?"—":fmt(temperatureCToK(waterSupplyC),3)+" K"} / {waterReturnC==null?"—":fmt(temperatureCToK(waterReturnC),3)+" K"}.</p>
              <div className="mt-4"><Select title="Гидравлическая схема" value={s.circuit} set={(v)=>patch({circuit:v})}
                options={[{value:"to-decide",title:"Определить проектом"},{value:"direct",title:"Зависимое присоединение"},{value:"independent",title:"Независимое через теплообменники"}]}/></div>
            </div>}
            {hasSteam&&<div className="mt-4 rounded-2xl border border-line p-4">
              <h3 className="font-semibold">Состояние пара</h3>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <Select title="Тип" value={s.steamCondition} set={(v)=>patch({steamCondition:v})}
                  options={[{value:"unknown",title:"Уточнить"},{value:"saturated",title:"Насыщенный"},{value:"superheated",title:"Перегретый"}]}/>
                {s.steamCondition==="superheated"&&
                  <Num title={"Температура пара, "+(s.tempUnit==="K"?"K":"°C")} value={s.steamTemperature} set={(v)=>patch({steamTemperature:v})} placeholder="250"/>}
                <Num title="Доля возврата конденсата, %" value={s.condensate} set={(v)=>patch({condensate:v})} placeholder="70"/>
              </div>
            </div>}
            <div className="mt-4 rounded-2xl border border-line p-4">
              <h3 className="font-semibold">Рабочее давление</h3>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {hasWater&&<Num title="Водяной контур" value={s.waterPressure} set={(v)=>patch({waterPressure:v})} placeholder="6"/>}
                {hasSteam&&<Num title="Пар" value={s.steamPressure} set={(v)=>patch({steamPressure:v})} placeholder="13"/>}
              </div>
              <div className="mt-3 flex flex-wrap items-end gap-3">
                <Select title="Единицы" value={s.pressureUnit} set={(v)=>changeUnit("pressureUnit",v)}
                  options={[{value:"bar",title:"бар"},{value:"MPa",title:"МПа"},{value:"kPa",title:"кПа"}]}/>
                <p className="text-xs text-muted">{hasWater&&"Вода: "+(pWater==null?"—":fmt(pWater)+" МПа")+"; "}{hasSteam&&"Пар: "+(pSteam==null?"—":fmt(pSteam)+" МПа")}</p>
              </div>
              <p className="mt-2 text-xs text-muted">1 бар = 0,1 МПа. Абсолютное или избыточное давление — уточняется отдельно.</p>
            </div>
          </>}
          {step===2&&<>
            <StepHead n={3} title="Котлоагрегаты и резервирование" sub="Число рабочих и резервных агрегатов задаёте вы. Для N+1 один из общего количества выделяется как резервный."/>
            {hasWater&&<div className="mb-4 rounded-2xl border border-line p-4">
              <h3 className="font-semibold">Водогрейная группа</h3>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <Select title="Всего котлов" value={String(s.heatCount)} set={(v)=>patch({heatCount:Number(v)})}
                  options={Array.from({length:12},(_,i)=>({value:String(i+1),title:String(i+1)+" шт."}))}/>
                <Select title="Резервирование" value={s.heatReserve} set={(v)=>patch({heatReserve:v})}
                  options={[{value:"none",title:"Без выделенного резерва"},{value:"n-plus-one",title:"N+1 (один резервный)"}]}/>
              </div>
              <div className="mt-4"><TrainBox name="Предварительный расчёт" train={plant.heat} unit="кВт"/></div>
            </div>}
            {hasSteam&&<div className="mb-4 rounded-2xl border border-line p-4">
              <h3 className="font-semibold">Паровая группа</h3>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <Select title="Всего котлов" value={String(s.steamCount)} set={(v)=>patch({steamCount:Number(v)})}
                  options={Array.from({length:12},(_,i)=>({value:String(i+1),title:String(i+1)+" шт."}))}/>
                <Select title="Резервирование" value={s.steamReserve} set={(v)=>patch({steamReserve:v})}
                  options={[{value:"none",title:"Без выделенного резерва"},{value:"n-plus-one",title:"N+1 (один резервный)"}]}/>
              </div>
              <div className="mt-4"><TrainBox name="Предварительный расчёт" train={plant.steam} unit="кг/ч"/></div>
            </div>}
            <div className="grid gap-3 sm:grid-cols-2">
              <Select title="Основное топливо" value={s.mainFuel} set={(v)=>patch({mainFuel:v,alternateFuel:v===s.alternateFuel?"":s.alternateFuel})}
                options={[{value:"",title:"Определить позже"},...fuels.map((f)=>({value:f.id,title:f.title}))]}/>
              <Select title="Резервное топливо" value={s.alternateFuel} set={(v)=>patch({alternateFuel:v})}
                options={[{value:"",title:"Не задано"},...fuels.filter((v)=>v.id!==s.mainFuel).map((v)=>({value:v.id,title:v.title}))]}/>
              <Select title="Исполнение котельной" value={s.placement} set={(v)=>patch({placement:v})}
                options={[{value:"modular",title:"Блочно-модульная"},{value:"standalone",title:"Отдельно стоящая"},
                  {value:"built-in",title:"Встроенная / пристроенная"},{value:"existing",title:"Реконструкция"}]}/>
              <Select title="Автоматизация" value={s.automation} set={(v)=>patch({automation:v})}
                options={[{value:"to-decide",title:"По проекту"},{value:"local",title:"Местная автоматика"},
                  {value:"dispatch",title:"Диспетчеризация / SCADA"}]}/>
            </div>
            <p className="mt-4 text-xs text-muted">Это минимальные номинальные показатели при равномерном распределении нагрузки; окончательная мощность и рабочий резерв определяются инженерным проектом.</p>
          </>}
          {step===3&&<>
            <StepHead n={4} title="Инженерные системы" sub="Выберите системы для комплексной поставки и проектирования. Отметка — пожелание в запросе, а не расчёт и не подтверждение обязательного состава."/>
            <p className="mb-3 text-sm font-semibold">Выбрано систем: {selectedSystems.length} / {availableSystems.length}</p>
            <div className="grid gap-2">{availableSystems.map((v)=><label key={v.id} className="flex cursor-pointer items-start gap-3 rounded-xl border border-line p-3 hover:bg-chip">
              <input type="checkbox" className="mt-1 size-5 shrink-0 accent-accent" checked={s.systems.includes(v.id)}
                onChange={()=>patch({systems:s.systems.includes(v.id)?s.systems.filter((x)=>x!==v.id):[...s.systems,v.id]})}/>
              <span><strong className="block text-sm">{v.title}</strong><span className="mt-1 block text-xs text-muted">{v.hint}</span></span>
            </label>)}</div>
            <PumpGroupsEditor mode={s.mode} groups={activePumps} onChange={setPumpGroups}/>
            <label className="mt-5 grid gap-2 text-sm font-semibold">Дополнительные исходные данные
              <textarea className="min-h-28 w-full rounded-xl border border-line bg-surface px-3 py-2 text-sm font-normal"
                maxLength={800} rows={4} value={s.notes} onChange={(e)=>patch({notes:e.target.value})}
                placeholder="Ограничения площадки, коммуникации, выбросы, качество воды, сроки, существующее оборудование…" />
            </label>
          </>}
          {step===4&&<>
            <StepHead n={5} title="Сводная конфигурация и запрос" sub="Предварительное техническое задание можно скопировать для обсуждения с проектировщиком. Затем — общая форма обращения."/>
            {!allValid?<p role="alert" className="rounded-xl border border-accent p-4 text-sm">Проверьте ошибки на предыдущих шагах — окончательное ТЗ пока не готово.</p>:<>
              <div className="grid gap-3 sm:grid-cols-2">
                {hasWater&&<TrainBox name="Водогрейная группа" train={plant.heat} unit="кВт"/>}
                {hasSteam&&<TrainBox name="Паровая группа" train={plant.steam} unit="кг/ч"/>}
              </div>
              <div className="mt-4 grid gap-3">
                {hasWater&&<Matches kind="water" train={plant.heat} mainFuel={s.mainFuel} alternateFuel={s.alternateFuel}
                  temp={waterSupplyC} selected={s.preferredWater} setSelected={(v)=>patch({preferredWater:v})}/>}
                {hasSteam&&<Matches kind="steam" train={plant.steam} mainFuel={s.mainFuel} alternateFuel={s.alternateFuel}
                  temp={null} selected={s.preferredSteam} setSelected={(v)=>patch({preferredSteam:v})}/>}
              </div>
              <section className="mt-5 rounded-2xl border border-line p-4">
                <h3 className="font-semibold">Насосные группы к инженерной проверке</h3>
                {activePumps.length===0 ? <p className="mt-2 text-sm text-muted">Насосные группы не заданы.</p> :
                <ul className="mt-3 grid gap-2">{activePumps.map((g)=>{
                  const role=pumpRoles.find((r)=>r.id===g.role);
                  const calc=evaluatePumpGroup(g);
                  return <li key={g.id} className="rounded-xl bg-chip p-3 text-sm">
                    <strong>{role?.name??"Насосная группа"}</strong>
                    <p className="mt-1 text-xs text-muted">{g.dutyUnits} рабочих + {g.standbyUnits} резервных;
                      Q = {calc.totalM3S==null?"уточнить":fmt(calc.totalM3S,8)+" м³/с"};
                      H = {calc.headM==null?"уточнить":fmt(calc.headM)+" м"}.</p>
                    {calc.unknowns.length>0&&<p className="mt-1 text-xs text-muted">
                      Не хватает данных: {calc.unknowns.join(", ")}.</p>}
                  </li>;
                })}</ul>}
                <p className="mt-3 text-xs text-muted">Насосные модели не назначаются без достоверных кривых Q–H, КПД и NPSHr.</p>
              </section>
              <label className="mt-6 grid gap-2 text-sm font-bold">Предварительное ТЗ
                <textarea readOnly rows={16} value={brief} className="w-full rounded-xl border border-line bg-bg/40 p-3 text-xs font-normal leading-relaxed"/>
              </label>
              <div className="mt-3 flex flex-wrap gap-2">
                <button type="button" className="h-11 rounded-xl border border-line px-5 text-sm font-semibold"
                  onClick={async()=>{try{await navigator.clipboard.writeText(brief);setCopied(true);}catch{setCopied(false);}}}>
                  {copied?"ТЗ скопировано":"Скопировать ТЗ"}
                </button>
                <button type="button" className="h-11 rounded-xl bg-ink px-5 text-sm font-semibold text-bg"
                  onClick={()=>{
                    const blob=new Blob(["\uFEFF"+brief],{type:"text/plain;charset=utf-8"});
                    const url=URL.createObjectURL(blob);
                    const link=document.createElement("a");
                    link.href=url; link.download="tehnicheskoe-zadanie-kotelnaya.txt";
                    document.body.appendChild(link); link.click(); link.remove();
                    URL.revokeObjectURL(url);
                  }}>
                  Скачать полное ТЗ (.txt)
                </button>
              </div>
              <div className="mt-7 rounded-2xl border border-line p-4">
                <h3 className="text-xl font-bold">Отправить инженерный запрос</h3>
                <p className="mt-2 text-sm text-muted">Та же форма, что в подборщике котлов. К запросу прилагаются введённые характеристики и выбранные системы.</p>
                {import.meta.env.VITE_STATIC_EXPORT==="1"&&
                  <p className="mt-3 rounded-lg bg-chip p-3 text-sm">Для REG.RU форма пока не подключена к безопасному обработчику заявок. Полное ТЗ можно скопировать; персональные данные не отправляются.</p>}
                {brief.length>2900&&<p className="mt-2 text-xs text-muted">В форму помещаются первые 2 900 символов; скопируйте полное ТЗ отдельно.</p>}
                <div className="mt-4"><LeadForm key={brief.slice(0,2900)} context={{intent:"pick"}}
                  initialComment={brief.slice(0,2900)} submitLabel="Запросить котельную под ключ"/></div>
              </div>
            </>}
          </>}
          {errs[step]&&<p className="mt-5 rounded-xl border border-accent bg-bg/40 p-3 text-sm text-accent" role="alert">{errs[step]}</p>}
          <div className="mt-7 flex justify-between gap-3 border-t border-line pt-5">
            <button type="button" disabled={step===0} onClick={()=>setStep((v)=>Math.max(0,v-1))}
              className="min-h-11 rounded-xl border border-line px-4 text-sm font-semibold disabled:opacity-40">← Назад</button>
            {step<4?<button type="button" disabled={Boolean(errs[step])} onClick={toNext}
              className="h-11 rounded-xl bg-accent px-6 text-sm font-semibold text-on-accent disabled:opacity-40">Далее →</button>:
              <Link to="/" className="self-center text-sm font-semibold text-muted hover:text-ink">К каталогу</Link>}
          </div>
        </section>
        <aside className="h-max rounded-3xl bg-ink p-5 text-white lg:sticky lg:top-5">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#f0c4cc]">Паспорт конфигурации</p>
          <h2 className="mt-2 text-2xl font-extrabold">{labels.mode[s.mode]}</h2>
          <p className="mt-1 text-xs text-white/65">{s.location||"Регион не указан"}</p>
          <div className="mt-4 space-y-3 border-t border-white/20 pt-4">
            {hasWater&&<p><span className="block text-xs text-white/60">Тепловая нагрузка</span><strong className="text-lg">{fmt(heatKw)} кВт</strong></p>}
            {hasSteam&&<p><span className="block text-xs text-white/60">Паропроизводительность</span><strong className="text-lg">{fmt(steamKgH/3600,6)} кг/с</strong></p>}
            {hasWater&&<p className="text-sm">Водогрейных: {s.heatCount}, резерв {s.heatReserve==="n-plus-one"?"1":"нет"}</p>}
            {hasSteam&&<p className="text-sm">Паровых: {s.steamCount}, резерв {s.steamReserve==="n-plus-one"?"1":"нет"}</p>}
            <p className="text-sm">Топливо: {fuelName(s.mainFuel)||"уточняется"}</p>
            <p className="text-sm">Размещение: {labels.placement[s.placement]}</p>
            <p className="text-sm">Режим: {labels.operation[s.operation]}</p>
            <p className="text-sm">Систем в запросе: {selectedSystems.length}</p>
            <p className="text-sm">Насосных групп: {activePumps.length}</p>
          </div>
          <p className="mt-5 border-t border-white/20 pt-4 text-xs leading-relaxed text-white/65">
            Не выполняет теплогидравлический расчёт, расчёт выбросов, определение категории надёжности и проверку требований безопасности.
          </p>
        </aside>
      </div>
    </main>
  </div>;
}

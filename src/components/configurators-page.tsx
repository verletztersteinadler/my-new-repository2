import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/logo";
import { BoilerHouseBuilder } from "@/components/boiler-house-builder";
import { calculate, formatCal, initialInputs, type CalResult } from "@/lib/calculators";

type Mode="water"|"steam"|"oil"|"modular";
type Field={id:string;label:string;value:string;unit:string};
const presets:Record<Exclude<Mode,"modular">,{title:string;desc:string;fields:Field[];warnings:string}> = {
  water:{
    title:"Конфигуратор водогрейного котла",
    desc:"Единая связка расхода воды, топлива, трубопровода, насосной группы и резервирования.",
    fields:[
      {id:"power",label:"Полезная мощность",value:"1000",unit:"кВт"},
      {id:"supply",label:"Подача",value:"90",unit:"°C"},
      {id:"return",label:"Обратка",value:"70",unit:"°C"},
      {id:"rho",label:"Плотность теплоносителя",value:"1000",unit:"кг/м³"},
      {id:"cp",label:"Теплоёмкость",value:"4.1868",unit:"кДж/(кг·K)"},
      {id:"eff",label:"КПД",value:"93",unit:"%"},
      {id:"hu",label:"НТС газа",value:"9.5",unit:"кВт·ч/норм. м³"},
      {id:"speed",label:"Скорость в трубопроводе",value:"1.5",unit:"м/с"},
      {id:"head",label:"Напор насосной группы",value:"20",unit:"м"},
      {id:"unit",label:"Мощность одного котла",value:"500",unit:"кВт"},
      {id:"maxLoad",label:"Допустимая нагрузка котла",value:"90",unit:"%"},
    ],
    warnings:"Принятые плотность и Cp относятся только к введённым условиям. Проверку температуры, давления, режимов горелки, насосных кривых и NPSH выполняют по документации.",
  },
  steam:{
    title:"Конфигуратор парового котла",
    desc:"Энтальпия IAPWS-IF97, паропроизводительность, питательная вода, продувка и предварительный паропровод.",
    fields:[
      {id:"steam",label:"Паропроизводительность",value:"1",unit:"т/ч"},
      {id:"pressure",label:"Давление пара абсолютное",value:"10",unit:"бар"},
      {id:"feed",label:"Питательная вода",value:"100",unit:"°C"},
      {id:"eff",label:"КПД котла",value:"93",unit:"%"},
      {id:"hu",label:"НТС газа",value:"9.5",unit:"кВт·ч/норм. м³"},
      {id:"blowdown",label:"Продувка от питательной воды",value:"5",unit:"%"},
      {id:"speed",label:"Допустимая скорость паропровода",value:"25",unit:"м/с"},
      {id:"unit",label:"Производительность одного котла",value:"0.5",unit:"т/ч"},
      {id:"maxLoad",label:"Допустимая нагрузка котла",value:"90",unit:"%"},
    ],
    warnings:"Насыщенный сухой пар; перегрев, деаэрация, конденсатная система и определение водно-химического режима требуют дополнительной проверки.",
  },
  oil:{
    title:"Конфигуратор термомасляного котла",
    desc:"Расход и расширение масла, предварительный трубопровод и насос на основе паспортных свойств теплоносителя.",
    fields:[
      {id:"power",label:"Полезная мощность",value:"500",unit:"кВт"},
      {id:"supply",label:"Температура подачи",value:"250",unit:"°C"},
      {id:"return",label:"Температура обратки",value:"200",unit:"°C"},
      {id:"rho",label:"Плотность масла при рабочих условиях",value:"820",unit:"кг/м³"},
      {id:"cp",label:"Теплоёмкость масла",value:"2.2",unit:"кДж/(кг·K)"},
      {id:"volume",label:"Объём масла в системе",value:"10",unit:"м³"},
      {id:"rho0",label:"Плотность масла при холодном пуске",value:"850",unit:"кг/м³"},
      {id:"rho1",label:"Плотность масла при работе",value:"760",unit:"кг/м³"},
      {id:"speed",label:"Допустимая скорость в трубопроводе",value:"1.5",unit:"м/с"},
      {id:"head",label:"Напор насоса",value:"25",unit:"м"},
      {id:"eff",label:"КПД котла",value:"90",unit:"%"},
      {id:"hu",label:"НТС газа",value:"9.5",unit:"кВт·ч/норм. м³"},
    ],
    warnings:"Необходимо подтвердить марку масла, кривые ρ(T), Cp(T), μ(T), пределы плёночной температуры и холодный пуск. Без них невозможно выдать окончательную спецификацию насоса.",
  },
};
const initial=(mode:Exclude<Mode,"modular">)=>Object.fromEntries(presets[mode].fields.map(field=>[field.id,field.value]));
function compute(mode:Exclude<Mode,"modular">,v:Record<string,string>){
  const call=(id:string,update:Record<string,string>):CalResult=>calculate(id,{...initialInputs(id),...update});
  const positive=(name:string)=>{
    const n=Number((v[name]??"").replace(",","."));
    if(!Number.isFinite(n)||n<=0)throw new Error("Нужно указать положительное значение: "+name);
    return n;
  };
  if(mode==="water"){
    const flow=call("water-flow",{power:v.power,supply:v.supply,return:v.return,density:v.rho,cp:v.cp});
    const q=flow.selection?.flowM3h??0;
    const boiler=call("boiler-count",{load:v.power,unit:v.unit,maxLoad:v.maxLoad,reserve:"n+1"});
    return [
      ["Теплоноситель",flow],
      ["Расход газа",call("gas-consumption",{power:v.power,eff:v.eff,hu:v.hu,load:"100"})],
      ["Внутренний диаметр трубопровода",call("pipe-diameter",{flow:String(q),velocity:v.speed})],
      ["Насосная группа",call("pump-power",{flow:String(q),head:v.head,rho:v.rho,eff:"70"})],
      ["Котлы и резервирование N+1",boiler],
    ] as Array<[string,CalResult]>;
  }
  if(mode==="steam"){
    const steam=call("steam-capacity",{steam:v.steam,pressure:v.pressure,feed:v.feed,basis:"absolute",state:"dry"});
    const power=steam.selection?.powerKw??0;
    return [
      ["Тепловой баланс пара IAPWS-IF97",steam],
      ["Предварительный расход газа",call("gas-consumption",{power:String(power),eff:v.eff,hu:v.hu})],
      ["Питательная вода и продувка",call("blowdown",{steam:String(positive("steam")*1000),percent:v.blowdown})],
      ["Предварительный паропровод",call("steam-pipe",{steam:v.steam,pressure:v.pressure,speed:v.speed})],
      ["Котлы и резервирование N+1",call("boiler-count",{
        load:String(positive("steam")*1000),unit:String(positive("unit")*1000),
        maxLoad:v.maxLoad,reserve:"n+1",
      })],
    ] as Array<[string,CalResult]>;
  }
  const oil=call("oil-flow",{power:v.power,supply:v.supply,return:v.return,rho:v.rho,cp:v.cp});
  const q=oil.selection?.flowM3h??0;
  return [
    ["Расход термомасла",oil],
    ["Тепловое расширение",call("oil-expansion",{volume:v.volume,rho0:v.rho0,rho1:v.rho1})],
    ["Предварительный внутренний диаметр",call("pipe-diameter",{flow:String(q),velocity:v.speed})],
    ["Расчётная мощность насоса",call("pump-power",{flow:String(q),head:v.head,rho:v.rho,eff:"65"})],
    ["Расход газа",call("gas-consumption",{power:v.power,eff:v.eff,hu:v.hu})],
  ] as Array<[string,CalResult]>;
}
export const configuratorOptions=[
  {id:"water" as const,title:"Водогрейный котёл",summary:"Температурный график, насосы, расход топлива, N+1"},
  {id:"steam" as const,title:"Паровой котёл",summary:"IAPWS-IF97, питательная вода, продувка, паропровод"},
  {id:"oil" as const,title:"Термомасляный котёл",summary:"Теплоноситель по паспорту, расширение, гидравлика"},
  {id:"modular" as const,title:"Блочно-модульная котельная",summary:"Существующий 5-этапный конструктор котельной и техническое задание"},
];
export function ConfiguratorIndex(){
  return <div className="min-h-dvh">
    <header className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4"><Logo/><Link to="/calculators" className="font-semibold text-accent">Все калькуляторы</Link></header>
    <main className="mx-auto max-w-6xl px-4 py-10">
      <p className="text-xs font-bold uppercase tracking-widest text-accent">kotly.pro / Инженерное проектирование</p>
      <h1 className="mt-3 font-display text-3xl font-extrabold sm:text-5xl">Конфигураторы оборудования</h1>
      <p className="mt-4 max-w-2xl text-muted">Четыре связанных инженерных сценария. Первые три объединяют несколько расчётных моделей; четвёртый открывает существующий пятиэтапный конструктор котельной.</p>
      <div className="mt-9 grid gap-4 sm:grid-cols-2">
        {configuratorOptions.map((option,index)=>
          <Link key={option.id} to="/configurators/$kind" params={{kind:option.id}}
            className="rounded-2xl border border-line bg-surface p-6 hover:border-accent hover:bg-chip">
            <p className="text-xs font-bold uppercase tracking-widest text-accent">0{index+1} / Конфигуратор</p>
            <h2 className="mt-3 text-xl font-bold">{option.title}</h2>
            <p className="mt-2 text-sm text-muted">{option.summary}</p>
            <span className="mt-5 inline-block font-bold text-accent">Открыть →</span>
          </Link>)}
      </div>
    </main>
  </div>;
}
export function ConfiguratorDetail({kind}:{kind:Mode}){
  if(kind==="modular")return <BoilerHouseBuilder/>;
  return <ConfiguratorForm key={kind} kind={kind}/>;
}
function ConfiguratorForm({kind}:{kind:Exclude<Mode,"modular">}){
  const def=presets[kind];
  const [v,setV]=useState<Record<string,string>>(()=>initial(kind));
  const [copied,setCopied]=useState(false);
  const outcome=useMemo(()=>{
    try{return {sets:compute(kind,v),error:null as string|null}}
    catch(e){return {sets:null as Array<[string,CalResult]>|null,error:e instanceof Error?e.message:"Некорректные параметры"}}
  },[kind,v]);
  const brief=[
    "kotly.pro — "+def.title,
    "",
    ...def.fields.map(f=>f.label+": "+(v[f.id]??"")+" "+f.unit),
    "",
    ...(outcome.sets??[]).flatMap(([name,res])=>[name,...res.rows.map(row=>row.label+": "+formatCal(row.value,row.digits)+" "+row.unit)]),
    "",
    "Ограничения: "+def.warnings,
    "Расчёт предварительный. Установку оборудования по нему без инженерной проверки не производить.",
  ].join("\n");
  const mainPower=kind==="steam"?(outcome.sets?.[0]?.[1].selection?.powerKw??0):Number(v.power);
  const steamKgH=kind==="steam"?Number(v.steam)*1000:0;
  const transfer=new URLSearchParams({calculator:"configurator-"+kind});
  if(kind!=="oil"){
    if(steamKgH>0)transfer.set("calcSteamKgH",String(steamKgH));
    else if(mainPower>0)transfer.set("calcPowerKw",String(mainPower));
  }
  return <div className="min-h-dvh">
    <header className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4"><Logo/><Link to="/configurators" className="text-sm font-semibold text-accent">← Конфигураторы</Link></header>
    <main className="mx-auto max-w-6xl px-4 pb-20 pt-7">
      <p className="text-xs font-bold uppercase tracking-widest text-accent">Инженерный конфигуратор / Предварительный режим</p>
      <h1 className="mt-3 font-display text-3xl font-extrabold leading-tight sm:text-4xl">{def.title}</h1>
      <p className="mt-3 max-w-3xl text-muted">{def.desc}</p>
      <div className="mt-7 grid items-start gap-6 lg:grid-cols-2">
        <section className="rounded-3xl border border-line bg-surface p-5 sm:p-6">
          <h2 className="text-xl font-bold">Исходные параметры</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">{def.fields.map(f=>
            <label key={f.id} className="grid gap-2 text-sm font-semibold">
              <span>{f.label} <span className="font-normal text-muted">({f.unit})</span></span>
              <input type="text" inputMode="decimal" value={v[f.id]??""} autoComplete="off"
                onChange={e=>{setV(old=>({...old,[f.id]:e.target.value}));setCopied(false);}}
                className="h-12 rounded-xl border border-line bg-bg px-3 text-base font-normal tabular-nums"/>
            </label>)}</div>
          <button type="button" onClick={()=>setV(initial(kind))} className="mt-5 min-h-10 rounded-xl border border-line px-5 text-sm font-bold hover:bg-chip">Сбросить</button>
        </section>
        <section aria-live="polite" className="rounded-3xl border border-line bg-chip p-5 sm:p-6">
          <h2 className="text-xl font-bold">Результат инженерного подбора</h2>
          {outcome.error?<p role="alert" className="mt-4 rounded-xl border border-accent bg-surface p-4 text-sm">{outcome.error}</p>:null}
          {outcome.sets?.map(([name,res])=><div key={name} className="mt-6">
            <h3 className="font-bold">{name}</h3>
            <div className="mt-2">{res.rows.slice(0,5).map((row,i)=><div key={i} className="flex flex-wrap justify-between gap-2 border-b border-line py-2 text-sm">
              <span className="text-muted">{row.label}</span>
              <strong>{formatCal(row.value,row.digits)} {row.unit}</strong>
            </div>)}</div>
          </div>)}
          <p className="mt-6 text-xs leading-relaxed text-muted">{def.warnings}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <button type="button" disabled={!outcome.sets} className="min-h-11 rounded-xl bg-accent px-4 text-sm font-bold text-on-accent disabled:opacity-40"
              onClick={()=>{void navigator.clipboard.writeText(brief).then(()=>setCopied(true)).catch(()=>setCopied(false));}}>
              {copied?"ТЗ скопировано":"Скопировать предварительное ТЗ"}
            </button>
            <button type="button" disabled={!outcome.sets} className="min-h-11 rounded-xl border border-line px-4 text-sm font-bold disabled:opacity-40"
              onClick={()=>window.print()}>Печать / PDF</button>
          </div>
        </section>
      </div>
      <div className="mt-7 flex flex-wrap gap-3">
        {kind!=="oil"?<button type="button" onClick={()=>window.location.assign("/kotelnaya?"+transfer.toString())}
          className="min-h-12 rounded-xl bg-accent px-5 text-sm font-bold text-on-accent">
          Передать нагрузку в конструктор котельной →
        </button>:<p className="rounded-xl border border-line bg-chip p-4 text-sm">Для термомасла используется отдельный расчёт; существующий конструктор котельной пока не формирует паспортный подбор термомасляных моделей.</p>}
        <Link to="/calculators" className="inline-flex min-h-12 items-center rounded-xl border border-line px-5 text-sm font-bold hover:bg-chip">Калькуляторы</Link>
        <Link to="/nasosy" className="inline-flex min-h-12 items-center rounded-xl border border-line px-5 text-sm font-bold hover:bg-chip">Насосы</Link>
        <Link to="/" className="inline-flex min-h-12 items-center rounded-xl border border-line px-5 text-sm font-bold hover:bg-chip">Производители</Link>
      </div>
    </main>
  </div>;
}

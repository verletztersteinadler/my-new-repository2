import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/logo";
import { calculatorDefinitions, calculatorById, calculate, formatCal, initialInputs, type CalDefinition, type CalResult } from "@/lib/calculators";

const groups = ["Конвертеры", "Водогрейные котлы", "Паровые котлы", "Топливо", "Гидравлика", "Термомасляные системы", "Дополнительные расчёты"];
const toolClass = "rounded-2xl border border-line bg-surface p-5 transition hover:border-accent hover:bg-chip";
const labelClass = "grid content-start gap-2 text-sm font-semibold";
const inputClass = "h-12 w-full rounded-xl border border-line bg-surface px-3 text-base font-normal tabular-nums text-ink outline-offset-2 focus-visible:outline-2 focus-visible:outline-accent";

export function CalculatorsLayout({children}:{children:React.ReactNode}) {
  return <div className="min-h-dvh bg-bg text-ink">
    <header className="sticky top-0 z-30 border-b border-line bg-surface">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4">
        <Logo/>
        <nav aria-label="Навигация" className="ml-auto flex flex-wrap items-center gap-3 text-xs font-semibold sm:gap-5 sm:text-sm">
          <Link to="/calculators" className="text-accent hover:underline">Калькуляторы</Link>
          <Link to="/kotelnaya" className="text-muted hover:text-ink">Котельная</Link>
          <Link to="/nasosy" className="hidden text-muted hover:text-ink sm:block">Насосы</Link>
          <Link to="/" className="text-muted hover:text-ink">Каталог</Link>
        </nav>
      </div>
    </header>
    {children}
  </div>;
}

const topicDescriptions: Record<string, string> = {
  "Конвертеры": "Давление, мощность, энергия, температура, массовый и объёмный расход, теплота сгорания и размеры труб.",
  "Водогрейные котлы": "Тепловая мощность, расход воды, нагрузка ГВС и здания, смешение потоков и время нагрева.",
  "Паровые котлы": "Паропроизводительность, энтальпия и температура насыщения по IAPWS-IF97, паропроводы, продувка и себестоимость пара.",
  "Топливо": "Природный газ, дизельное топливо, СУГ, стоимость тепла, объём газа и сезонный расход.",
  "Гидравлика": "Скорость и диаметр трубопровода, потери давления, напор и мощность насоса, Kv/Cv и теплообменник.",
  "Термомасляные системы": "Расход, мощность, расширение, гидравлика и нагрев масла с вводом свойств конкретного теплоносителя.",
  "Дополнительные расчёты": "Резервирование N+1, теплопотери изолированных труб, КПД котла, горелки и системы КИП.",
};
const topicIds: Record<string, string> = {
  "Конвертеры": "konvertery",
  "Водогрейные котлы": "vodogreynye-kotly",
  "Паровые котлы": "parovye-kotly",
  "Топливо": "toplivo",
  "Гидравлика": "gidravlika",
  "Термомасляные системы": "termomaslo",
  "Дополнительные расчёты": "dopolnitelnye-raschety",
};
const popularTools = [
  { id: "water-power", title: "Мощность котла", detail: "Расход воды и температурный график" },
  { id: "steam-capacity", title: "Расчёт пара", detail: "Паропроизводительность и энтальпия IF97" },
  { id: "gas-consumption", title: "Расход газа", detail: "Мощность, КПД, теплота сгорания" },
  { id: "pipe-loss", title: "Гидравлический расчёт", detail: "Потери давления в трубопроводе" },
] as const;

export function CalculatorsIndex() {
  const [query, setQuery] = useState("");
  const search = query.trim().toLocaleLowerCase("ru");
  const visible = useMemo(
    () => calculatorDefinitions.filter((item) =>
      !search || [item.title, item.description, item.group, item.formula, item.example]
        .join(" ").toLocaleLowerCase("ru").includes(search)),
    [search],
  );

  return <CalculatorsLayout>
    <main className="mx-auto max-w-6xl px-4 pb-20 pt-10" id="engineering-calculators">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">kotly.pro · Инженерный центр</p>
      <h1 className="mt-3 max-w-5xl font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
        Инженерные калькуляторы онлайн — расчёты для котельных и промышленного оборудования
      </h1>
      <p className="mt-5 max-w-4xl text-base leading-relaxed text-muted">
        <strong className="font-semibold text-ink">52 бесплатных инженерных калькулятора</strong> для предварительного
        расчёта тепловой мощности котла, паропроизводительности, расхода газа и топлива, насосов,
        трубопроводов и теплообменников. Переводите технические единицы измерения,
        проверяйте формулы и передавайте рассчитанные параметры в конфигуратор котельной.
        Все расчёты выполняются в браузере без отправки введённых значений на сервер.
      </p>
      <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Популярные инженерные расчёты">
        {popularTools.map(item=><Link key={item.id} to="/calculators/$tool" params={{tool:item.id}}
          className="rounded-xl border border-line bg-surface p-4 transition hover:border-accent hover:bg-chip">
          <span className="font-bold text-ink">{item.title}</span>
          <span className="mt-1 block text-xs text-muted">{item.detail}</span>
          <span className="mt-3 inline-block text-sm font-bold text-accent">Рассчитать →</span>
        </Link>)}
      </div>
      <div className="mt-7 flex flex-wrap gap-3 text-sm">
        <Link to="/kotelnaya" className="inline-flex min-h-11 items-center rounded-xl bg-accent px-5 font-bold text-on-accent hover:bg-accent-hover">
          Конфигуратор котельной →
        </Link>
        <Link to="/configurators" className="inline-flex min-h-11 items-center rounded-xl border border-line px-5 font-bold hover:bg-chip">
          4 конфигуратора оборудования
        </Link>
        <Link to="/" className="inline-flex min-h-11 items-center rounded-xl border border-line px-5 font-bold hover:bg-chip">
          Каталог промышленных котлов
        </Link>
      </div>

      <section aria-labelledby="calculator-navigation" className="mt-12 rounded-2xl border border-line bg-surface p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="calculator-navigation" className="text-lg font-extrabold">Найти нужный инженерный расчёт</h2>
          <span className="text-xs text-muted">{visible.length} из {calculatorDefinitions.length} инструментов</span>
        </div>
        <label htmlFor="calculator-search" className="mt-4 block text-sm font-semibold">Поиск по инструментам</label>
        <input id="calculator-search" type="search" value={query} onChange={(event)=>setQuery(event.target.value)}
          placeholder="Например: мощность котла, пар, расход газа, насос, давление"
          className="mt-2 h-12 w-full rounded-xl border border-line bg-bg px-4 text-sm text-ink outline-offset-2 focus-visible:outline-2 focus-visible:outline-accent"
        />
        <nav aria-label="Разделы инженерных калькуляторов" className="mt-5 flex flex-wrap gap-2">
          {groups.map(group=><a key={group} href={"#"+topicIds[group]}
            className="inline-flex min-h-10 items-center rounded-lg border border-line bg-chip px-3 text-xs font-semibold text-ink hover:border-accent">
            {group}
          </a>)}
        </nav>
      </section>

      {visible.length===0?<p className="mt-8 rounded-xl border border-line bg-surface p-5 text-sm">
        По такому запросу инструменты не найдены. <button type="button" onClick={()=>setQuery("")} className="font-bold text-accent underline">Показать все калькуляторы</button>.
      </p>:null}

      {groups.map(group=>{
        const tools=visible.filter(x=>x.group===group);
        if(!tools.length)return null;
        return <section key={group} id={topicIds[group]} className="mt-12 scroll-mt-24" aria-labelledby={"h-"+topicIds[group]}>
          <div className="mb-5 border-b border-line pb-4">
            <div className="flex items-baseline justify-between gap-3">
              <h2 id={"h-"+topicIds[group]} className="font-display text-xl font-extrabold sm:text-2xl">{group}</h2>
              <span className="text-sm tabular-nums text-muted">{tools.length} инструментов</span>
            </div>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">{topicDescriptions[group]}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tools.map((def,i)=><Link key={def.id} to="/calculators/$tool" params={{tool:def.id}} className={toolClass}>
              <p className="text-xs font-bold uppercase tracking-widest text-accent">{String(i+1).padStart(2,"0")} / онлайн-расчёт</p>
              <h3 className="mt-3 text-lg font-bold leading-snug">{def.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{def.description}</p>
              <span className="mt-5 inline-flex font-semibold text-accent">Открыть калькулятор →</span>
            </Link>)}
          </div>
        </section>;
      })}

      <section aria-labelledby="how-to-calculate" className="mt-14 grid gap-6 rounded-2xl border border-line bg-chip p-6 md:grid-cols-2">
        <div>
          <h2 id="how-to-calculate" className="text-xl font-extrabold">Как пользоваться инженерными калькуляторами</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Выберите вид расчёта, введите исходные данные и проверьте единицы измерения.
            Результат обновляется при каждом изменении полей. На странице инструмента показаны
            расчётная формула, исходные допущения и пример. Расчёт можно скопировать
            или распечатать в PDF.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-extrabold">От калькулятора к подбору оборудования</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Рассчитанные тепловую нагрузку, паропроизводительность или объёмный расход
            можно передать в <Link to="/kotelnaya" className="font-semibold text-accent underline">конструктор котельной</Link>.
            Это предварительный инженерный подбор, а не сертифицированный проект или подтверждённая
            спецификация производителя.
          </p>
        </div>
      </section>

      <section aria-labelledby="calculator-faq" className="mt-12">
        <h2 id="calculator-faq" className="text-xl font-extrabold">Вопросы об инженерных расчётах онлайн</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-line bg-surface p-5">
            <h3 className="font-bold">Как рассчитать мощность водогрейного котла?</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              По расходу теплоносителя, его плотности, теплоёмкости и разности температур.
              Откройте <Link to="/calculators/$tool" params={{tool:"water-power"}} className="font-semibold text-accent underline">расчёт мощности по расходу воды</Link>.
            </p>
          </div>
          <div className="rounded-xl border border-line bg-surface p-5">
            <h3 className="font-bold">Как перевести паропроизводительность в кВт?</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Нужны абсолютное давление пара, его состояние и температура питательной воды.
              <Link to="/calculators/$tool" params={{tool:"steam-capacity"}} className="font-semibold text-accent underline">Калькулятор пара</Link> применяет IAPWS-IF97.
            </p>
          </div>
          <div className="rounded-xl border border-line bg-surface p-5">
            <h3 className="font-bold">Как определить расход природного газа?</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Введите полезную мощность котла, КПД и низшую теплоту сгорания газа.
              Для этого есть <Link to="/calculators/$tool" params={{tool:"gas-consumption"}} className="font-semibold text-accent underline">калькулятор расхода газа</Link>.
            </p>
          </div>
          <div className="rounded-xl border border-line bg-surface p-5">
            <h3 className="font-bold">Можно ли использовать результат в проекте?</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Калькуляторы подходят для предварительной оценки и сверки исходных данных.
              Безопасность, окончательный выбор оборудования, нормативные требования
              и паспортные характеристики необходимо проверять отдельно.
            </p>
          </div>
        </div>
      </section>
    </main>
  </CalculatorsLayout>;
}

function errorText(e:unknown) {
  return e instanceof Error ? e.message : "Расчёт не может быть выполнен для заданных условий";
}

function prefill(def:CalDefinition) {
  const defaults=initialInputs(def.id);
  if(typeof window==="undefined") return defaults;
  const query=new URLSearchParams(window.location.search);
  for(const field of def.fields) {
    const supplied=query.get("v_"+field.id);
    if(supplied!=null&&supplied.length<90&&field.options?.some(x=>x.value===supplied))defaults[field.id]=supplied;
    else if(supplied!=null&&!field.options&&/^[+-]?\d{1,12}(?:[.,]\d{1,9})?$/.test(supplied))defaults[field.id]=supplied;
  }
  return defaults;
}
function transferLink(def:CalDefinition, result:CalResult | null) {
  const search=new URLSearchParams();
  if(result?.selection?.powerKw!=null && Number.isFinite(result.selection.powerKw)) search.set("calcPowerKw",String(result.selection.powerKw));
  if(result?.selection?.steamKgH!=null && Number.isFinite(result.selection.steamKgH)) search.set("calcSteamKgH",String(result.selection.steamKgH));
  if(result?.selection?.flowM3h!=null && Number.isFinite(result.selection.flowM3h)) search.set("calcFlowM3h",String(result.selection.flowM3h));
  search.set("calculator",def.id);
  return "/kotelnaya?"+search.toString();
}
function linkedCalc(id:string, name:string, values:Record<string,string>) {
  const search=new URLSearchParams();
  for(const [key,value] of Object.entries(values)) {
    if(value.trim())search.set("v_"+key,value);
  }
  return <button type="button" onClick={()=>window.location.assign("/calculators/"+encodeURIComponent(id)+"?"+search.toString())}
    className="inline-flex min-h-10 items-center rounded-lg border border-line px-4 text-sm font-semibold text-ink hover:bg-chip">{name} ↗</button>;
}
export function CalculatorDetail({tool}:{tool:string}) {
  const def=calculatorById(tool);
  if(!def) return <CalculatorsLayout><main className="mx-auto max-w-3xl px-4 py-16">
    <h1 className="text-3xl font-bold">Инструмент не найден</h1>
    <Link to="/calculators" className="mt-5 inline-block font-semibold text-accent underline">Все калькуляторы</Link>
  </main></CalculatorsLayout>;
  return <CalculatorContent key={tool} def={def}/>;
}
function CalculatorContent({def}:{def:CalDefinition}) {
  const [values,setValues]=useState<Record<string,string>>(()=>initialInputs(def.id));
  const [copied,setCopied]=useState(false);
  useEffect(()=>{ setValues(prefill(def)); },[def]);
  const calculated=useMemo(()=>{
    try{return {result:calculate(def.id,values),error:null as string|null}}
    catch(e){return {result:null as CalResult|null,error:errorText(e)}}
  },[def.id,values]);
  const {result,error}=calculated;
  const printReady=!!result&&result.rows.length>0;
  const exportText=[
    "kotly.pro / "+def.title,
    "Источник методики: ТЗ «Инженерные калькуляторы», 23.11.2026",
    "",
    "Исходные данные:",
    ...def.fields.map(field=>field.label+": "+(field.options?.find(x=>x.value===values[field.id])?.label??values[field.id]??"")+
      (field.unit?" "+field.unit:"")),
    "",
    "Результаты:",
    ...(result?.rows.map(row=>row.label+": "+formatCal(row.value,row.digits)+" "+row.unit)??[]),
    "",
    "Формула: "+def.formula,
    ...(result?.notes??[]),
    "Внимание: "+def.caveat,
    "Расчёт предварительный. Требуется проектная проверка.",
  ].join("\n");
  const relate=def.id==="water-power"
    ? linkedCalc("water-flow","Расход воды по мощности",{power:result?.selection?.powerKw?.toString()??values.flow,supply:values.supply,return:values.return,density:values.density,cp:values.cp})
    :def.id==="water-flow"
    ? linkedCalc("gas-consumption","Расход газа",{power:values.power})
    :["steam-capacity","steam-from-power"].includes(def.id)
    ? linkedCalc(def.id==="steam-capacity"?"steam-from-power":"steam-capacity",def.id==="steam-capacity"?"Мощность → пар":"Пар → мощность",{
      pressure:values.pressure,basis:values.basis,atm:values.atm,state:values.state,feed:values.feed,
      ...(def.id==="steam-capacity"?{power:String(result?.selection?.powerKw??"")}:{steam:String((result?.selection?.steamKgH??0)/1000)}),
    })
    :def.id==="pipe-diameter"
    ?linkedCalc("flow-velocity","Скорость по диаметру",{flow:values.flow,diameter:String((result?.rows[0]?.value??0))})
    :def.id==="flow-velocity"
    ?linkedCalc("pipe-diameter","Диаметр по скорости",{flow:values.flow,velocity:String(result?.rows[0]?.value??"1")})
    :null;

  return <CalculatorsLayout>
    <main className="mx-auto max-w-6xl px-4 pb-20 pt-7">
      <div className="text-xs text-muted">
        <Link to="/calculators" className="font-semibold hover:text-accent">Инженерные калькуляторы</Link>
        <span aria-hidden="true"> / </span><span>{def.group}</span>
      </div>
      <p className="mt-7 text-xs font-bold uppercase tracking-[0.16em] text-accent">kotly.pro / расчётная модель</p>
      <h1 className="mt-3 max-w-4xl font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">{def.title}</h1>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted">{def.description}</p>
      <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <section aria-label="Исходные параметры" className="rounded-3xl border border-line bg-surface p-5 sm:p-6">
          <h2 className="text-lg font-extrabold">Исходные данные</h2>
          <p className="mt-1 text-xs text-muted">Изменение любого поля запускает пересчёт автоматически.</p>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {def.fields.filter(f=>{
              if(["x","superheat"].includes(f.id)&&["steam-capacity","steam-from-power","steam-properties"].includes(def.id)){
                if(f.id==="x"&&values.state!=="wet")return false;
                if(f.id==="superheat"&&values.state!=="superheated")return false;
              }
              if(def.id==="steam-saturation"){
                if(f.id==="pressure"&&values.mode==="temperature")return false;
                if(f.id==="temperature"&&values.mode==="pressure")return false;
                if((f.id==="basis"||f.id==="atm")&&values.mode==="temperature")return false;
              }
              return true;
            }).map(field=><label key={field.id} className={labelClass}>
              <span>{field.label}{field.unit ? <span className="ml-1 text-muted">({field.unit})</span> : null}</span>
              {field.options ? <select className={inputClass} value={values[field.id]??field.value}
                onChange={e=>setValues(prev=>({...prev,[field.id]:e.target.value}))}>
                {field.options.map(option=><option key={option.value} value={option.value}>{option.label}</option>)}
              </select> : <input type="text" inputMode="decimal" autoComplete="off"
                aria-label={field.label} className={inputClass}
                value={values[field.id]??field.value}
                onChange={e=>setValues(prev=>({...prev,[field.id]:e.target.value}))}/>}
              {field.help?<span className="text-xs text-muted">{field.help}</span>:null}
            </label>)}
          </div>
          <button type="button" className="mt-6 min-h-10 rounded-xl border border-line px-4 text-sm font-semibold hover:bg-chip"
            onClick={()=>setValues(initialInputs(def.id))}>Сбросить параметры</button>
        </section>
        <section aria-live="polite" aria-label="Результаты расчёта" className="rounded-3xl border border-line bg-chip p-5 sm:p-6">
          <h2 className="text-lg font-extrabold">Результаты</h2>
          {error?<div role="alert" className="mt-5 rounded-xl border border-accent bg-surface p-4 text-sm">
            <strong>Проверьте исходные данные</strong><p className="mt-2">{error}</p>
          </div>:null}
          {result?<div className="mt-4 space-y-0">
            {result.rows.map((row,i)=><div key={i} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-line py-3">
              <span className="text-sm text-muted">{row.label}</span>
              <strong className="text-right text-base font-bold tabular-nums">{formatCal(row.value,row.digits)} <span className="text-xs font-medium text-muted">{row.unit}</span></strong>
            </div>)}
            <div className="mt-4 space-y-2">{result.notes.map((note,i)=><p key={i} className="text-xs leading-relaxed text-muted">{note}</p>)}</div>
          </div>:null}
          <div className="mt-5 flex flex-wrap gap-2">
            <button type="button" disabled={!printReady} className="inline-flex min-h-11 items-center rounded-xl bg-accent px-4 text-sm font-bold text-on-accent disabled:opacity-40"
              onClick={()=>{void navigator.clipboard.writeText(exportText).then(()=>setCopied(true)).catch(()=>setCopied(false));}}>
              {copied?"Скопировано":"Копировать расчёт"}
            </button>
            <button type="button" disabled={!printReady} className="inline-flex min-h-11 items-center rounded-xl border border-line px-4 text-sm font-bold disabled:opacity-40"
              onClick={()=>window.print()}>Печать / сохранить PDF</button>
          </div>
        </section>
      </div>
      <section className="mt-7 rounded-3xl border border-line bg-surface p-5 sm:p-6">
        <h2 className="text-xl font-extrabold">Формула и пример</h2>
        <p className="mt-4 rounded-xl bg-chip p-4 text-sm font-semibold">{def.formula}</p>
        <p className="mt-4 text-sm leading-relaxed"><strong>Контрольный пример:</strong> {def.example}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted"><strong>Допущения:</strong> {def.caveat}</p>
        <p className="mt-3 text-xs leading-relaxed text-muted">
          Методическая основа: ТЗ «Инженерные калькуляторы и конфигураторы», 23.11.2026;
          конвертеры основаны на определениях СИ, паровые состояния — IAPWS-IF97.
          Результаты не являются проектной документацией или подтверждением пригодности оборудования.
        </p>
      </section>
      <section className="mt-7 rounded-3xl bg-[#161616] p-6 text-white">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#f0c4cc]">От расчёта к инженерному решению</p>
        <h2 className="mt-2 font-display text-2xl font-extrabold">Подобрать оборудование по рассчитанным параметрам</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70">
          Полученные параметры можно перенести в конструктор котельной.
          Неподтверждённые модели не выдаются за готовую спецификацию.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <button type="button" onClick={()=>window.location.assign(transferLink(def,result))}
            className="inline-flex min-h-11 items-center rounded-xl bg-accent px-5 text-sm font-bold text-on-accent hover:bg-accent-hover">
            Передать в конструктор котельной →
          </button>
          <Link to="/" className="inline-flex min-h-11 items-center rounded-xl border border-white/30 px-5 text-sm font-bold hover:bg-white/10">Каталог котлов</Link>
          <Link to="/nasosy" className="inline-flex min-h-11 items-center rounded-xl border border-white/30 px-5 text-sm font-bold hover:bg-white/10">Насосы</Link>
        </div>
      </section>
      {relate?<section className="mt-7">
        <h2 className="text-lg font-extrabold">Продолжить расчёт</h2>
        <div className="mt-3 flex flex-wrap gap-3">{relate}</div>
      </section>:null}
      <section className="mt-8">
        <h2 className="text-xl font-extrabold">Частые вопросы</h2>
        <div className="mt-4 space-y-3">
          <details className="rounded-xl border border-line bg-surface p-4">
            <summary className="cursor-pointer text-sm font-semibold">Можно ли использовать результат для заказа или проектирования?</summary>
            <p className="mt-3 text-sm text-muted">Расчёт предварительный. Для заказа и безопасной эксплуатации требуется проверить исходные данные, нормативы и техническую документацию изготовителя.</p>
          </details>
          <details className="rounded-xl border border-line bg-surface p-4">
            <summary className="cursor-pointer text-sm font-semibold">Какая формула применяется?</summary>
            <p className="mt-3 text-sm text-muted">{def.formula} {def.caveat}</p>
          </details>
        </div>
      </section>
    </main>
    <style>{`@media print {
  header,nav,button,footer,section:has(a[href^="/kotelnaya"]),section:has(a[href="/nasosy"]) { display:none!important; }
  body { background:#fff!important; color:#000!important; }
  main { max-width:100%!important; padding:10mm!important; }
  .rounded-3xl { box-shadow:none!important; break-inside:avoid; }
}`}</style>
  </CalculatorsLayout>;
}

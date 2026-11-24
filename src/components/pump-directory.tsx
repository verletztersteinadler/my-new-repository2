import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { pumpPilotCompanies, pumpResearchCounts, pumpRoles, type PumpRoleId } from "@/data/pumps";

const rolesFilter: Record<PumpRoleId,string[]> = {
  network:["сетев"],circulation:["циркуляц","котлов"],makeup:["подпит"],
  feedwater:["питатель"],condensate:["конденсат"],"thermal-oil":["термомасл","высокотемператур"],
  fuel:["топлив","мазут","дизел"],dosing:["дозир","реагент","химвод"],
  drainage:["дренаж","кнс"],booster:["повышение давления","водоснабжение"],
};
const regionLabels=["Все страны","Россия","Германия","Италия","Другие"];
function countryMatches(country: string, region:string) {
  if(region==="Все страны")return true;
  if(region==="Другие")return !["Россия","Германия","Италия"].some(x=>country===x);
  return country===region;
}
const norm=(s:string)=>s.toLocaleLowerCase("ru-RU").replaceAll("ё","е");

export function PumpDirectoryPage() {
  const [q,setQ]=useState("");
  const [role,setRole]=useState<PumpRoleId|"all">("all");
  const [country,setCountry]=useState("Все страны");
  const [limit,setLimit]=useState(25);
  const rows=useMemo(()=>{
    const query=norm(q.trim());
    return pumpPilotCompanies.filter((x)=>{
      if (!countryMatches(x.country,country))return false;
      const text=norm([x.name,x.applications,x.seriesNames,x.entity,x.country].join(" "));
      if(query && !text.includes(query))return false;
      if(role!=="all" && !rolesFilter[role].some(w=>norm(x.applications).includes(w)))return false;
      return true;
    });
  },[q,role,country]);
  return <div className="min-h-dvh bg-bg text-ink">
    <header className="border-b border-line bg-surface">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link to="/" className="font-display text-xl font-extrabold">Котлы<span className="text-accent">.pro</span></Link>
        <nav className="mr-14 hidden gap-4 text-sm font-semibold lg:flex">
          <Link to="/" className="hover:text-accent">Котлы</Link>
          <Link to="/kotelnaya" className="hover:text-accent">Конструктор котельной</Link>
        </nav>
      </div>
    </header>
    <main className="mx-auto max-w-6xl px-4 pb-16 pt-9">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">Каталог насосов · исследовательская версия</p>
      <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight sm:text-5xl">Промышленные насосы для котельных</h1>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
        Реестр поставщиков и производственных брендов из файла от 16 ноября 2026 года.
        Показаны только {pumpResearchCounts.A} записей пилотной группы A. Технические параметры моделей и совместимость со средой ещё не проверены.
        Этот список не является предложением конкретного насоса или подтверждением изготовителя каждой серии.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-line bg-surface p-4"><p className="text-xs text-muted">Первичных записей в файле</p><p className="mt-2 text-3xl font-extrabold">{pumpResearchCounts.total}</p></div>
        <div className="rounded-2xl border border-line bg-surface p-4"><p className="text-xs text-muted">Пилот — приоритет A</p><p className="mt-2 text-3xl font-extrabold">{pumpResearchCounts.A}</p></div>
        <div className="rounded-2xl border border-line bg-surface p-4"><p className="text-xs text-muted">В редакционной очереди B/C</p><p className="mt-2 text-3xl font-extrabold">{pumpResearchCounts.B+pumpResearchCounts.C}</p></div>
      </div>

      <section className="mt-7 rounded-3xl border border-line bg-surface p-4 sm:p-6" aria-label="Фильтры производителей насосов">
        <h2 className="font-display text-xl font-extrabold">Исследовательский реестр</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]">
          <label className="grid gap-1 text-sm font-semibold">Поиск по бренду, назначению и названию серии
            <input value={q} onChange={(e)=>{setQ(e.target.value);setLimit(25);}}
              placeholder="Например, сетевые, КМ, Wilo, ХВО"
              className="h-11 w-full rounded-xl border border-line bg-surface px-3 text-sm" />
          </label>
          <label className="grid gap-1 text-sm font-semibold">Страна
            <select value={country} onChange={(e)=>{setCountry(e.target.value);setLimit(25);}}
              className="h-11 w-full min-w-0 rounded-xl border border-line bg-surface px-3 text-sm">
              {regionLabels.map((v)=><option key={v}>{v}</option>)}
            </select>
          </label>
        </div>
        <fieldset className="mt-5">
          <legend className="text-sm font-semibold">Назначение, указанное в исходном реестре</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {[{id:"all" as const,name:"Все назначения"},...pumpRoles].map((v)=>
              <button key={v.id} type="button" aria-pressed={role===v.id} onClick={()=>{setRole(v.id);setLimit(25);}}
                className={"rounded-xl border px-3 py-2 text-xs font-semibold "+(role===v.id?"border-accent bg-accent text-on-accent":"border-line bg-chip text-ink hover:bg-bg")}>
                {v.name}
              </button>)}
          </div>
          <p className="mt-2 text-xs text-muted">Категория определяется по тексту реестра, а не по паспортной пригодности конкретной модели.</p>
        </fieldset>
        <p className="mt-5 text-sm font-semibold">Найдено: {rows.length}</p>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {rows.slice(0,limit).map((maker)=><article key={maker.id} className="rounded-2xl border border-line bg-bg/40 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-accent">{maker.country} · данные на проверке</p>
            <h3 className="mt-2 font-display text-xl font-extrabold">{maker.name}</h3>
            <p className="mt-1 text-xs text-muted">{maker.entity}</p>
            <p className="mt-3 text-sm leading-relaxed">{maker.applications}</p>
            <p className="mt-2 text-xs leading-relaxed text-muted"><strong>Названия серий в реестре:</strong> {maker.seriesNames}</p>
            {maker.caveat && <p className="mt-3 border-l-2 border-accent pl-3 text-xs leading-relaxed text-muted">Проверка: {maker.caveat}</p>}
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              <a href={maker.catalog} target="_blank" rel="noopener noreferrer" className="font-semibold text-accent underline underline-offset-4">Каталог на сайте компании</a>
              <a href={maker.site} target="_blank" rel="noopener noreferrer" className="text-muted underline underline-offset-4">Сайт</a>
              {maker.reference!==maker.catalog&&<a href={maker.reference} target="_blank" rel="noopener noreferrer" className="text-muted underline underline-offset-4">Источник</a>}
            </div>
          </article>)}
        </div>
        {rows.length===0&&<p className="rounded-xl bg-bg/40 p-5 text-sm text-muted">Нет совпадений в пилотной группе. Попробуйте снять фильтр.</p>}
      </section>

      <section className="mt-7 rounded-3xl border border-line bg-surface p-5">
        <h2 className="font-display text-xl font-extrabold">Что необходимо для подбора конкретной модели</h2>
        <p className="mt-2 text-sm text-muted">Проверенная рабочая точка Q–H, характеристическая кривая при нужной частоте, допускаемые температура и давление, материал, NPSHr и режим эксплуатации. Без них насос не считается подобранным.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">{pumpRoles.map((v)=><div key={v.id} className="rounded-xl border border-line p-3">
          <h3 className="text-sm font-bold">{v.name}</h3>
          <p className="mt-1 text-xs text-muted">{v.purpose}</p>
          <p className="mt-2 text-xs"><strong>Параметры:</strong> {v.required}</p>
          <p className="mt-1 text-xs text-muted">{v.caution}</p>
        </div>)}</div>
        <Link to="/kotelnaya" className="mt-6 inline-flex min-h-12 max-w-full items-center rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-on-accent">
          Задать параметры насосных групп в конструкторе котельной →
        </Link>
      </section>
      <footer className="mt-8 text-xs text-muted">
        Источник: KOTLY_PRO_PUMP_MANUFACTURERS_2026-11-16.xlsx. Все записи являются черновыми до редакторской и инженерной проверки.
        Группы B и C не публикуются автоматически.
      </footer>
    </main>
  </div>;
}

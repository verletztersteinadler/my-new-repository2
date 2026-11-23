import { useMemo } from "react";
import { Link, getRouteApi, useNavigate } from "@tanstack/react-router";
import { Logo } from "@/components/logo";
import { SolutionBuilder } from "@/components/solution-builder";
import { manufacturers, regions, lines, type RegionId, type LineId } from "@/data/manufacturers";
import { publishedCatalogs } from "@/data/series-index";

const routeApi = getRouteApi("/");

const openedSeries = new Set(publishedCatalogs.map((item) => item.slug));

export function HomePage() {
  const search = routeApi.useSearch();
  const navigate = useNavigate({ from: "/" });
  const region = regions.some((item) => item.id === search.region) ? (search.region as RegionId) : undefined;
  const line = lines.some((item) => item.id === search.line) ? (search.line as LineId) : undefined;
  const q = (search.q ?? "").trim().toLocaleLowerCase("ru");

  const rows = useMemo(() => {
    const found = manufacturers.filter((item) => {
      if (region && item.region !== region) return false;
      if (line && item.line !== line) return false;
      if (!q) return true;
      return `${item.title} ${item.name} ${item.place}`.toLocaleLowerCase("ru").includes(q);
    });
    return found.slice().sort((a, b) => Number(b.published) - Number(a.published) || a.title.localeCompare(b.title, "ru"));
  }, [q, region, line]);

  function patch(next: { q?: string; region?: string; line?: string }) {
    navigate({
      search: (prev) => {
        const merged = { ...prev, ...next };
        if (!merged.q) delete merged.q;
        if (!merged.region) delete merged.region;
        if (!merged.line) delete merged.line;
        return merged;
      },
      resetScroll: false,
      replace: true,
    });
  }

  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-30 border-b border-line bg-surface">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4">
          <Logo />
          <nav className="ml-auto hidden items-center gap-5 text-sm text-muted sm:flex" aria-label="Навигация">
            <a href="#podbor" className="hover:text-ink">
              Подбор
            </a>
            <Link to="/kotelnaya" className="font-semibold text-accent hover:text-ink">Котельная под ключ</Link>
            <Link to="/nasosy" className="hover:text-ink">Насосы</Link>
            <a href="#manufacturers" className="hover:text-ink">
              Производители
            </a>
            <Link to="/politika" className="hover:text-ink">
              О проекте
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-6xl px-4 pt-8 sm:pt-12">
          <div className="relative min-h-[22rem] overflow-hidden rounded-[2rem] sm:min-h-[26rem]">
            <img src="/catalog/hero-boiler.jpg" alt="" className="absolute inset-0 h-full w-full object-cover object-[28%_center]" />
            <div className="relative flex min-h-[22rem] items-end sm:min-h-[26rem]">
              <div className="glass-plaque z-10 w-full rounded-none! rounded-b-[2rem]! px-5 py-5 sm:px-8 sm:py-7">
                <p className="relative z-10 text-xs font-semibold uppercase tracking-[0.14em] text-white/80">Независимый справочник</p>
                <h1 className="relative z-10 mt-3 font-display text-4xl leading-[0.88] font-extrabold tracking-[-0.04em] sm:text-6xl">
                  <span className="block text-white">Промышленные</span>
                  <span className="mt-1 block text-[#f0c4cc]">котлы</span>
                </h1>
              </div>
            </div>
          </div>
          <p className="mt-6 max-w-xl text-base text-muted">
            Открытые серии можно отфильтровать и запросить консультацию, подбор оборудования или готовое инженерное решение. Это не покупка и не сайт производителя.
          </p>
        </section>

        <SolutionBuilder />

        <section className="mx-auto mt-8 max-w-6xl px-4">
          <div className="overflow-hidden rounded-3xl border border-line bg-[#161616] px-5 py-7 text-white sm:px-8 sm:py-9">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#f0c4cc]">Следующий уровень подбора</p>
            <div className="mt-3 grid items-end gap-5 md:grid-cols-[1fr_auto]">
              <div>
                <h2 className="max-w-3xl font-display text-2xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                  Собрать котельную под вашу задачу
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/75">
                  Водогрейная, паровая или комбинированная схема: расчёт нагрузки и резервирования N+1,
                  подбор серий котлоагрегатов, насосы, водоподготовка, автоматика, дымоудаление.
                  В результате — техническое задание и общая форма инженерного запроса.
                </p>
              </div>
              <Link to="/kotelnaya" className="inline-flex h-12 shrink-0 items-center justify-center rounded-xl bg-accent px-6 text-sm font-bold text-on-accent hover:bg-accent-hover">
                Конструктор котельной →
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-5 max-w-6xl px-4">
          <div className="flex flex-col justify-between gap-4 rounded-3xl border border-line bg-surface p-5 sm:flex-row sm:items-center sm:p-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-accent">Новый раздел · На проверке</p>
              <h2 className="mt-2 font-display text-2xl font-extrabold">Насосное оборудование для котельных</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                Сетевые, котловые, питательные, подпиточные, конденсатные и другие насосы.
                Пилотный реестр 25 производителей из предоставленного списка;
                параметры моделей и гидравлические характеристики ещё требуют подтверждения.
              </p>
            </div>
            <Link to="/nasosy" className="inline-flex h-12 shrink-0 items-center justify-center rounded-xl border border-line px-5 text-sm font-bold text-ink hover:bg-chip">
              Изучить насосы →
            </Link>
          </div>
        </section>

        <div id="manufacturers" className="mx-auto mt-8 flex max-w-6xl flex-col gap-3 px-4">
          <input
              value={search.q ?? ""}
              onChange={(event) => patch({ q: event.target.value })}
              placeholder="Название"
              aria-label="Поиск по производителю"
              className="h-12 w-full rounded-sm border border-line bg-surface px-5 text-sm"
            />
          <div className="flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Направление">
            {lines.map((item) => {
              const active = (item.id === "all" && !line) || item.id === line;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={active}
                  className={
                    active
                      ? "h-10 shrink-0 rounded-sm bg-accent px-4 text-sm font-semibold text-on-accent"
                      : "h-10 shrink-0 rounded-sm bg-chip px-4 text-sm text-ink"
                  }
                  onClick={() => patch({ line: item.id === "all" ? undefined : item.id })}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Регион">
            {regions.map((item) => {
              const active = (item.id === "all" && !region) || item.id === region;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={active}
                  className={
                    active
                      ? "h-10 shrink-0 rounded-sm bg-accent px-4 text-sm font-semibold text-on-accent"
                      : "h-10 shrink-0 rounded-sm bg-chip px-4 text-sm text-ink"
                  }
                  onClick={() => patch({ region: item.id === "all" ? undefined : item.id })}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {rows.length === 0 ? (
          <p className="mx-auto mt-6 max-w-6xl border border-line bg-surface px-4 py-8 text-center text-sm text-muted">
            По запросу никого нет. Сбросьте регион или измените фразу.
          </p>
        ) : (
          <ul className="mx-auto mt-4 grid max-w-6xl gap-3 px-4 sm:grid-cols-2 lg:grid-cols-3">
            {rows.map((item) => {
              const hasSeries = openedSeries.has(item.slug);
              return (
              <li key={item.slug} className="flex min-h-44 flex-col overflow-hidden rounded-3xl border border-line bg-surface">
                <div className={hasSeries ? "bg-accent px-5 py-5 text-on-accent" : "bg-ink px-5 py-5 text-bg"}>
                  <p className="text-xs font-semibold uppercase opacity-80">
                    {lines.find((entry) => entry.id === item.line)?.label}
                    {" · "}
                    {item.place}
                    {hasSeries ? " · серии открыты" : " · карточка открыта"}
                  </p>
                  <h2 className="mt-2 font-display text-3xl leading-[0.95] font-extrabold tracking-[-0.04em]">{item.title}</h2>
                </div>
                <div className="flex flex-1 flex-col px-5 pt-4 pb-5">
                  {item.title !== item.name ? <p className="line-clamp-2 text-xs leading-relaxed text-muted">{item.name}</p> : null}
                  {hasSeries ? (
                    <p className="mt-2 text-xs leading-relaxed text-muted">Взято с оф. сайта производителя</p>
                  ) : (
                    <p className="mt-2 text-sm leading-relaxed text-ink">Информация на сайте производителя не предоставлена.</p>
                  )}
                  <Link
                    to="/$slug"
                    params={{ slug: item.slug }}
                    search={hasSeries ? {} : { ask: "1" }}
                    className={
                      hasSeries
                        ? "mt-4 inline-flex h-11 items-center self-start rounded-sm bg-ink px-4 text-sm leading-none font-semibold text-bg hover:bg-ink/80"
                        : "mt-4 inline-flex h-12 items-center self-start rounded-sm bg-accent px-5 text-base leading-none font-extrabold text-on-accent ring-2 ring-ink"
                    }
                  >
                    {hasSeries ? "Смотреть серии" : "Подобрать аналоги"}
                  </Link>
                </div>
              </li>
              );
            })}
          </ul>
        )}

        <footer className="mx-auto mt-12 max-w-6xl px-4 py-8 text-xs leading-relaxed text-muted">
          <p>
            KOTLY.SU — независимый справочник. Названия производителей приведены для идентификации оборудования. Сведения о владельце и обработке данных — в правовом разделе.
          </p>
          <p className="mt-3 flex flex-wrap gap-4">
            <Link to="/politika" className="underline">
              Политика
            </Link>
            <Link to="/soglasie" className="underline">
              Согласие
            </Link>
          </p>
        </footer>
      </main>
    </div>
  );
}

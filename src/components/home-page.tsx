import { useMemo } from "react";
import { ArrowRight, Calculator, Clock3, Layers3, Settings2, ShieldCheck } from "lucide-react";
import { Link, getRouteApi, useNavigate } from "@tanstack/react-router";
import { Logo } from "@/components/logo";
import { CatalogHeaderSearch } from "@/components/catalog-header-search";
import { matchingManufacturerSlugs, normalizeCatalogText } from "@/lib/catalog-search";
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
  const q = normalizeCatalogText(search.q ?? "");
  const catalogMatches = useMemo(() => q ? matchingManufacturerSlugs(q) : null, [q]);

  const rows = useMemo(() => {
    const found = manufacturers.filter((item) => {
      if (region && item.region !== region) return false;
      if (line && item.line !== line) return false;
      if (!q) return true;
      return catalogMatches?.has(item.slug) ?? false;
    });
    return found.slice().sort((a, b) => Number(b.published) - Number(a.published) || a.title.localeCompare(b.title, "ru"));
  }, [q, region, line, catalogMatches]);

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
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0c1520] text-white">
        <div className="mx-auto flex h-16 max-w-[1536px] items-center gap-4 px-4 lg:h-20 lg:px-8">
          <Logo light />
          <nav className="ml-auto hidden items-center gap-4 text-sm font-semibold text-white/85 lg:flex xl:gap-6" aria-label="Навигация">
            <a href="#manufacturers" className="transition-colors hover:text-white">Каталог</a>
            <Link to="/kotelnaya" className="transition-colors hover:text-white">Решения</Link>
            <Link to="/nasosy" className="transition-colors hover:text-white">Насосы</Link>
            <a href="#podbor" className="transition-colors hover:text-white">Подбор</a>
            <Link to="/politika" className="transition-colors hover:text-white">О проекте</Link>
          </nav>
          <CatalogHeaderSearch className="hidden w-[min(28vw,25rem)] shrink-0 lg:block" />
        </div>
        <div className="mx-auto max-w-[1536px] px-4 pb-3 pr-[4.75rem] lg:hidden">
          <CatalogHeaderSearch compact />
        </div>
      </header>

      <main>
        <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-[#0b1520] text-white">
          <img
            src="/catalog/hero-boiler.jpg"
            alt="Промышленный котёл с трубопроводами и арматурой"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover object-[58%_center] grayscale contrast-[1.08] lg:object-[center_45%]"
          />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[#0b1520]/55 lg:bg-[linear-gradient(90deg,#0b1520_0%,rgba(11,21,32,.96)_30%,rgba(11,21,32,.75)_49%,rgba(11,21,32,.16)_78%,rgba(11,21,32,.1)_100%)]" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#0b1520] to-transparent" />

          <div className="relative mx-auto flex min-h-[40rem] max-w-[1536px] flex-col justify-between px-4 pb-10 pt-16 sm:min-h-[44rem] sm:px-8 lg:min-h-[min(52rem,calc(100svh-5rem))] lg:px-10 lg:pb-12 lg:pt-20 xl:px-16">
            <div className="max-w-[48rem]">
              <p className="flex items-center gap-3 text-[0.7rem] font-bold uppercase tracking-[0.13em] text-white/90 sm:text-xs lg:text-sm">
                <span aria-hidden="true" className="h-1 w-9 shrink-0 rounded-full bg-[#d3123b] sm:w-12" />
                Промышленные котельные решения
              </p>
              <h1 id="hero-title" className="mt-7 max-w-3xl font-display text-[clamp(2rem,5vw,3.25rem)] leading-[1.12] font-extrabold tracking-[-0.045em] text-balance sm:mt-9 lg:text-[clamp(2.65rem,3.7vw,4.25rem)]">
                Котлы и котельные для промышленности и инфраструктуры
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg lg:mt-8 lg:text-xl">
                Подбор оборудования, инженерные расчёты и технические решения под вашу задачу.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap">
                <a href="#podbor" className="inline-flex min-h-13 items-center justify-center gap-3 rounded-2xl bg-[#d3123b] px-6 py-3 text-center text-base font-extrabold text-white shadow-lg shadow-black/25 transition-colors hover:bg-[#a80f30]">
                  Подобрать решение <ArrowRight aria-hidden="true" className="size-5" />
                </a>
                <Link to="/kotelnaya" className="inline-flex min-h-13 items-center justify-center gap-3 rounded-2xl border-2 border-white/85 bg-[#0b1520]/35 px-6 py-3 text-center text-base font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/15">
                  <Calculator aria-hidden="true" className="size-5" />
                  Инженерный расчёт
                </Link>
              </div>
            </div>
            <div className="mt-16 grid grid-cols-2 gap-x-5 gap-y-8 border-t border-white/15 pt-8 sm:grid-cols-4 lg:mt-20 lg:gap-0 lg:border-t-0 lg:pt-0">
              {[
                { title: "Инженерный подход", Icon: Settings2 },
                { title: "Быстрая реализация", Icon: Clock3 },
                { title: "Надёжная эксплуатация", Icon: ShieldCheck },
                { title: "Комплексная поддержка", Icon: Layers3 },
              ].map(({ title, Icon }, index) => (
                <div key={title} className={`min-w-0 lg:flex lg:items-center lg:gap-5 lg:px-8 ${index === 0 ? "lg:pl-0" : "lg:border-l lg:border-white/20"}`}>
                  <Icon aria-hidden="true" className="mb-3 size-8 shrink-0 text-[#d3123b] sm:size-10 lg:mb-0 lg:size-11" strokeWidth={1.8} />
                  <p className="max-w-[12rem] text-sm leading-snug font-bold text-white sm:text-base lg:text-lg">{title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <p className="mx-auto max-w-6xl px-4 pt-5 text-sm leading-relaxed text-muted">
          Подберите промышленные котлы и котельное оборудование по мощности, топливу и техническим характеристикам. Запросите подбор, аналоги и коммерческие условия. Данные и применимость проверяются перед закупкой.
        </p>

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
              placeholder="Производитель, серия или обозначение модели"
              aria-label="Поиск по производителю, серии и модели"
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
            Ничего не найдено. Попробуйте название производителя, серии или обозначение модели.
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
                    {hasSeries ? "Серии и запрос КП" : "Подбор и аналоги"}
                  </Link>
                </div>
              </li>
              );
            })}
          </ul>
        )}

        <footer className="mx-auto mt-12 max-w-6xl px-4 py-8 text-xs leading-relaxed text-muted">
          <p>
            Котлы.pro — независимый справочник. Названия производителей приведены для идентификации оборудования. Сведения о владельце и обработке данных — в правовом разделе.
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

import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { LeadForm } from "@/components/lead-form";
import {
  filterSeries,
  fuels,
  powerBands,
  primarySpec,
  steamBands,
  type FuelId,
  type PowerBand,
  type Series,
  type SteamBand,
} from "@/data/catalog";

type PublishedCatalog = (typeof import("@/data/series-index"))["publishedCatalogs"][number];

type Task = "any" | "water" | "steam" | "oil" | "air" | "block";
type KitId = "burner" | "auto" | "pumps" | "economizer" | "water" | "other";

const tasks: { id: Task; label: string }[] = [
  { id: "any", label: "Любая" },
  { id: "water", label: "Водогрейный" },
  { id: "steam", label: "Паровой" },
  { id: "oil", label: "Термомасло" },
  { id: "air", label: "Воздух" },
  { id: "block", label: "Котловой блок" },
];

const kits: { id: KitId; label: string; published: boolean }[] = [
  { id: "burner", label: "Горелка", published: false },
  { id: "auto", label: "Автоматика", published: true },
  { id: "pumps", label: "Насосы", published: false },
  { id: "economizer", label: "Экономайзер", published: false },
  { id: "water", label: "Водоподготовка", published: false },
  { id: "other", label: "Прочие комплектующие", published: false },
];

function matchesTask(series: Series, task: Task) {
  if (task === "any") return true;
  if (task === "water") return series.categoryId === "hw115" || series.categoryId === "hw170" || series.categoryId === "water";
  return series.categoryId === task;
}

export function SolutionBuilder() {
  const [task, setTask] = useState<Task>("any");
  const [fuel, setFuel] = useState<FuelId | "any">("any");
  const [power, setPower] = useState<PowerBand | "any">("any");
  const [steam, setSteam] = useState<SteamBand | "any">("any");
  const [kit, setKit] = useState<KitId[]>([]);
  const [done, setDone] = useState(false);
  const [catalogs, setCatalogs] = useState<PublishedCatalog[]>([]);

  useEffect(() => {
    let alive = true;
    import("@/data/series-index").then((module) => {
      if (alive) setCatalogs(module.publishedCatalogs);
    });
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (!done) return;
    document.getElementById("konsultaciya")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [done]);

  const showSteam = task === "steam";
  const hits = useMemo(() => {
    const boilers = catalogs.flatMap((catalog) =>
      filterSeries(
        {
          fuel: fuel === "any" ? undefined : fuel,
          power: !showSteam && power !== "any" ? power : undefined,
          steam: showSteam && steam !== "any" ? steam : undefined,
        },
        catalog.series,
      )
        .filter((series) => matchesTask(series, task))
        .map((series) => ({ series, slug: catalog.slug, maker: catalog.title })),
    );
    if (!kit.includes("auto")) return boilers;
    const seen = new Set(boilers.map((item) => `${item.slug}-${item.series.id}`));
    const automation = catalogs.flatMap((catalog) =>
      catalog.series
        .filter((series) => series.categoryId === "auto")
        .map((series) => ({ series, slug: catalog.slug, maker: catalog.title })),
    );
    return [...boilers, ...automation.filter((item) => !seen.has(`${item.slug}-${item.series.id}`))];
  }, [catalogs, fuel, kit, power, showSteam, steam, task]);

  function toggleKit(id: KitId) {
    setKit((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  }

  const missingKit = kits.filter((item) => kit.includes(item.id) && !item.published).map((item) => item.label);
  const taskLabel = tasks.find((item) => item.id === task)?.label ?? "Любая";
  const fuelLabel = fuel === "any" ? "любое" : fuels.find((item) => item.id === fuel)?.title ?? "любое";
  const paramLabel = showSteam
    ? steam === "any"
      ? "не задана"
      : steamBands.find((item) => item.id === steam)?.title
    : power === "any"
      ? "не задана"
      : powerBands.find((item) => item.id === power)?.title;
  const kitLabel = kit.length ? kit.map((id) => kits.find((item) => item.id === id)?.label).filter(Boolean).join(", ") : "не выбрана";
  const comment = `Консультация по открытым сериям. Задача: ${taskLabel}. Топливо: ${fuelLabel}. Параметр: ${paramLabel}. Комплектация: ${kitLabel}. Это не заказ.`;

  return (
    <section id="podbor" className="mx-auto mt-8 max-w-6xl px-4">
      <div className="rounded-3xl border border-line bg-surface p-4 sm:p-6">
        <p className="text-xs font-semibold tracking-[0.14em] text-ink uppercase">Открытые серии</p>
        <h2 className="mt-2 font-display text-3xl leading-[0.95] font-extrabold tracking-[-0.04em]">Фильтр справочника</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          В списке только опубликованные серии. Фильтр готовит консультацию, это не заказ и не покупка.
        </p>

        <fieldset className="mt-5">
          <legend className="text-sm font-semibold">Задача</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {tasks.map((item) => (
              <Chip key={item.id} active={task === item.id} onClick={() => { setTask(item.id); }}>
                {item.label}
              </Chip>
            ))}
          </div>
        </fieldset>

        <fieldset className="mt-4">
          <legend className="text-sm font-semibold">Топливо</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            <Chip active={fuel === "any"} onClick={() => { setFuel("any"); }}>
              Любое
            </Chip>
            {fuels.map((item) => (
              <Chip key={item.id} active={fuel === item.id} onClick={() => { setFuel(item.id); }}>
                {item.title}
              </Chip>
            ))}
          </div>
        </fieldset>

        <fieldset className="mt-4">
          <legend className="text-sm font-semibold">{showSteam ? "Паропроизводительность" : "Мощность"}</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            <Chip
              active={showSteam ? steam === "any" : power === "any"}
              onClick={() => {
                if (showSteam) setSteam("any");
                else setPower("any");
              }}
            >
              Любая
            </Chip>
            {showSteam
              ? steamBands.map((item) => (
                  <Chip key={item.id} active={steam === item.id} onClick={() => { setSteam(item.id); }}>
                    {item.title}
                  </Chip>
                ))
              : powerBands.map((item) => (
                  <Chip key={item.id} active={power === item.id} onClick={() => { setPower(item.id); }}>
                    {item.title}
                  </Chip>
                ))}
          </div>
        </fieldset>

        <fieldset className="mt-4">
          <legend className="text-sm font-semibold">Комплектация</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {kits.map((item) => (
              <Chip key={item.id} active={kit.includes(item.id)} onClick={() => toggleKit(item.id)}>
                {item.label}
              </Chip>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted">Можно отметить несколько. Отдельной серии в справочнике может не быть — тогда позиция в списке не появляется.</p>
        </fieldset>

        {catalogs.length > 0 ? (
          <p className="mt-5 text-sm text-muted">По фильтрам в открытом каталоге: {hits.length}</p>
        ) : null}
        {catalogs.length > 0 && hits.length === 0 ? (
          <p className="mt-2 text-sm">Совпадений в открытых сериях нет.</p>
        ) : (
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {hits.slice(0, 8).map((item) => (
              <li key={`${item.slug}-${item.series.id}`} className="rounded-2xl border border-line px-3 py-3">
                <p className="text-xs font-semibold text-ink uppercase">{item.maker}</p>
                <p className="mt-1 font-display text-xl leading-none font-extrabold tracking-[-0.04em]">{item.series.name}</p>
                <p className="mt-2 text-sm text-muted">
                  {primarySpec(item.series).label}: {primarySpec(item.series).value}
                </p>
                <Link to="/manufacturers/$slug" params={{ slug: item.slug }} className="mt-2 inline-flex text-sm font-semibold text-ink">
                  Открыть производителя
                </Link>
              </li>
            ))}
          </ul>
        )}
        {catalogs.length > 0 && hits.length > 8 ? <p className="mt-2 text-xs text-muted">Показаны 8 из {hits.length}.</p> : null}
        {missingKit.length ? (
          <p className="mt-3 text-sm text-muted">
            {missingKit.join(", ")}: отдельных серий в опубликованном справочнике нет. Марка не подставляется.
          </p>
        ) : null}

        <button
          type="button"
          className="mt-6 flex w-full items-center justify-between gap-4 rounded-3xl bg-accent px-5 py-5 text-left text-on-accent hover:bg-accent-hover sm:px-7"
          onClick={() => setDone(true)}
        >
          <span>
            <span className="block text-xs font-semibold tracking-[0.16em] uppercase">Весь открытый каталог</span>
            <span className="mt-1 block font-display text-3xl leading-none font-extrabold tracking-[-0.04em] sm:text-4xl">
              Подобрать оборудование
            </span>
          </span>
          <span className="font-display text-4xl leading-none" aria-hidden="true">
            →
          </span>
        </button>

        {done ? (
          <div id="konsultaciya" className="mt-6 border-t border-line pt-5">
            <h3 className="font-display text-3xl leading-[0.95] font-extrabold tracking-[-0.04em]">Инженерная консультация</h3>
            <p className="mt-2 max-w-2xl text-sm text-muted">
              Оператор разберёт задачу по открытым сериям. Это не заказ, не счёт и не покупка.
            </p>
            <div className="mt-4 max-w-xl">
              <LeadForm
                key={comment}
                context={{ intent: "pick" }}
                initialComment={comment}
                submitLabel="Подобрать оборудование"
              />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function Chip({ active, children, onClick }: { active: boolean; children: string; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={active ? "h-10 rounded-sm bg-accent px-3 text-sm font-semibold text-on-accent" : "h-10 rounded-sm bg-chip px-3 text-sm text-ink"}
    >
      {children}
    </button>
  );
}

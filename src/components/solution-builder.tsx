import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { LeadForm } from "@/components/lead-form";
import { fuels, type FuelId, type Series } from "@/data/catalog";
import { manufacturers } from "@/data/manufacturers";
import { publishedCatalogs } from "@/data/series-index";
import {
  formatEngineeringNumber as fmt,
  parseEngineeringNumber,
  powerToKw,
  pressureToMPa,
  rangeIntersects,
  steamKgHToKgS,
  steamToKgH,
  temperatureCToK,
  temperatureToC,
  type PowerUnit,
  type PressureUnit,
  type SteamUnit,
  type TemperatureUnit,
} from "@/lib/engineering-units";

type Task = "any" | "water" | "steam" | "oil" | "air" | "block" | "burner" | "auto";
type KitId = "burner" | "auto" | "pumps" | "economizer" | "water" | "other";
type Sort = "catalog" | "manufacturer" | "capacity";

const tasks: { id: Task; label: string }[] = [
  { id: "any", label: "Все типы" },
  { id: "water", label: "Водогрейные котлы" },
  { id: "steam", label: "Паровые котлы" },
  { id: "oil", label: "Термомасляные котлы" },
  { id: "air", label: "Воздухонагреватели" },
  { id: "block", label: "Котельные блоки" },
  { id: "burner", label: "Горелочное оборудование" },
  { id: "auto", label: "Автоматика и управление" },
];

const kits: { id: KitId; label: string }[] = [
  { id: "burner", label: "Горелочное устройство" },
  { id: "auto", label: "Автоматика / АСУ ТП" },
  { id: "pumps", label: "Насосное оборудование" },
  { id: "economizer", label: "Экономайзер" },
  { id: "water", label: "Водоподготовка" },
  { id: "other", label: "Другое" },
];

const makerLine = new Map(manufacturers.map((maker) => [maker.slug, maker.line]));
const allEntries = publishedCatalogs.flatMap((catalog) =>
  catalog.series.map((series) => ({
    series,
    slug: catalog.slug,
    maker: catalog.title,
  })),
);
type Entry = (typeof allEntries)[number];

function matchesTask(entry: Entry, task: Task): boolean {
  const category = entry.series.categoryId;
  if (task === "any") return true;
  if (task === "burner") return makerLine.get(entry.slug) === "burner";
  if (task === "auto") return category === "auto" && makerLine.get(entry.slug) !== "burner";
  if (task === "water") return category === "hw115" || category === "hw170" || category === "water";
  return category === task;
}

function knownRange(series: Series, kind: "power" | "steam") {
  const minField = kind === "power" ? series.powerMinKw : series.steamMinKgH;
  const maxField = kind === "power" ? series.powerMaxKw : series.steamMaxKgH;
  const values = series.sizes
    .map((size) => (kind === "power" ? size.powerKw : size.steamKgH))
    .filter((value): value is number => value != null && Number.isFinite(value));
  const min = minField ?? (values.length ? Math.min(...values) : null);
  const max = maxField ?? (values.length ? Math.max(...values) : null);
  if (min == null && max == null) return null;
  // A single published nominal value is a point, not an invented 0–max range.
  const a = min ?? max!;
  const b = max ?? min!;
  return { min: Math.min(a, b), max: Math.max(a, b) };
}

function engineeringSpec(series: Series) {
  if (series.categoryId === "steam") {
    const r = knownRange(series, "steam");
    if (!r) return "Паропроизводительность: не опубликована";
    const range = r.min === r.max ? fmt(steamKgHToKgS(r.min), 6) : fmt(steamKgHToKgS(r.min), 6) + "–" + fmt(steamKgHToKgS(r.max), 6);
    return "Паропроизводительность: " + range + " кг/с";
  }
  const r = knownRange(series, "power");
  if (!r) return "Мощность: не опубликована";
  const range = r.min === r.max ? fmt(r.min, 4) : fmt(r.min, 4) + "–" + fmt(r.max, 4);
  return "Мощность по каталогу: " + range + " кВт";
}

function activeBoundsLabel(min: number | null, max: number | null, unit: string) {
  if (min == null && max == null) return "не задан";
  return (min == null ? "до " : max == null ? "от " : "") +
    (min == null ? "" : fmt(min, 6)) +
    (min != null && max != null ? "–" : "") +
    (max == null ? "" : fmt(max, 6)) +
    " " + unit;
}

export function SolutionBuilder() {
  const [task, setTask] = useState<Task>("any");
  const [fuel, setFuel] = useState<FuelId | "any">("any");
  const [powerUnit, setPowerUnit] = useState<PowerUnit>("MW");
  const [powerFrom, setPowerFrom] = useState("");
  const [powerTo, setPowerTo] = useState("");
  const [steamUnit, setSteamUnit] = useState<SteamUnit>("kg/s");
  const [steamFrom, setSteamFrom] = useState("");
  const [steamTo, setSteamTo] = useState("");
  const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnit>("C");
  const [temperature, setTemperature] = useState("");
  const [pressureUnit, setPressureUnit] = useState<PressureUnit>("bar");
  const [pressure, setPressure] = useState("");
  const [kit, setKit] = useState<KitId[]>([]);
  const [sort, setSort] = useState<Sort>("catalog");
  const [shown, setShown] = useState(8);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) document.getElementById("konsultaciya")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [done]);

  const showSteam = task === "steam";
  const isPopulated = (value: string) => value.trim().length > 0;
  const pFrom = parseEngineeringNumber(powerFrom);
  const pTo = parseEngineeringNumber(powerTo);
  const sFrom = parseEngineeringNumber(steamFrom);
  const sTo = parseEngineeringNumber(steamTo);
  const tInput = parseEngineeringNumber(temperature, true);
  const barInput = parseEngineeringNumber(pressure);
  const powerMinKw = pFrom == null ? null : powerToKw(pFrom, powerUnit);
  const powerMaxKw = pTo == null ? null : powerToKw(pTo, powerUnit);
  const steamMinKgH = sFrom == null ? null : steamToKgH(sFrom, steamUnit);
  const steamMaxKgH = sTo == null ? null : steamToKgH(sTo, steamUnit);
  const targetC = tInput == null ? null : temperatureToC(tInput, temperatureUnit);
  const targetMPa = barInput == null ? null : pressureToMPa(barInput, pressureUnit);

  const error = (
    (showSteam ? [steamFrom, steamTo].some((v) => isPopulated(v) && parseEngineeringNumber(v) == null)
      : [powerFrom, powerTo].some((v) => isPopulated(v) && parseEngineeringNumber(v) == null))
      ? "Введите неотрицательные числовые значения мощности или расхода (дробная часть — через запятую или точку)."
      : showSteam && steamMinKgH != null && steamMaxKgH != null && steamMinKgH > steamMaxKgH
        ? "Нижняя граница паропроизводительности не может быть больше верхней."
        : !showSteam && powerMinKw != null && powerMaxKw != null && powerMinKw > powerMaxKw
          ? "Нижняя граница мощности не может быть больше верхней."
          : isPopulated(temperature) && (targetC == null || targetC < -273.15)
            ? "Укажите действительную температуру не ниже абсолютного нуля."
            : null
  );

  const hits = useMemo(() => {
    if (error) return [] as Entry[];
    const matching = allEntries.filter((entry) => {
      const series = entry.series;
      if (!matchesTask(entry, task)) return false;
      if (fuel !== "any" && !series.fuels.includes(fuel)) return false;
      if (showSteam && (steamMinKgH != null || steamMaxKgH != null)) {
        const r = knownRange(series, "steam");
        if (!r || !rangeIntersects(r.min, r.max, steamMinKgH, steamMaxKgH)) return false;
      }
      if (!showSteam && (powerMinKw != null || powerMaxKw != null)) {
        const r = knownRange(series, "power");
        if (!r || !rangeIntersects(r.min, r.max, powerMinKw, powerMaxKw)) return false;
      }
      // A missing technical value must not silently pass a specified threshold.
      if (targetC != null && (series.tempMaxC == null || series.tempMaxC < targetC)) return false;
      return true;
    });
    if (sort === "manufacturer") matching.sort((a, b) => a.maker.localeCompare(b.maker, "ru") || a.series.name.localeCompare(b.series.name, "ru"));
    if (sort === "capacity" && task !== "any") {
      matching.sort((a, b) => {
        const aVal = knownRange(a.series, showSteam ? "steam" : "power")?.min ?? Infinity;
        const bVal = knownRange(b.series, showSteam ? "steam" : "power")?.min ?? Infinity;
        return aVal - bVal || a.series.name.localeCompare(b.series.name, "ru");
      });
    }
    return matching;
  }, [task, fuel, showSteam, powerMinKw, powerMaxKw, steamMinKgH, steamMaxKgH, targetC, sort, error]);

  function changeTask(next: Task) {
    setTask(next);
    setPowerFrom("");
    setPowerTo("");
    setSteamFrom("");
    setSteamTo("");
    setSort("catalog");
    setShown(8);
  }

  function changePowerUnit(next: PowerUnit) {
    if (next === powerUnit) return;
    const convert = (raw: string) => {
      const number = parseEngineeringNumber(raw);
      if (number == null) return raw;
      const kw = powerToKw(number, powerUnit);
      return fmt(next === "MW" ? kw / 1000 : kw, 10);
    };
    setPowerFrom(convert(powerFrom));
    setPowerTo(convert(powerTo));
    setPowerUnit(next);
  }

  function changeSteamUnit(next: SteamUnit) {
    if (next === steamUnit) return;
    const convert = (raw: string) => {
      const number = parseEngineeringNumber(raw);
      if (number == null) return raw;
      const kgH = steamToKgH(number, steamUnit);
      return fmt(next === "kg/s" ? kgH / 3600 : next === "t/h" ? kgH / 1000 : kgH, 10);
    };
    setSteamFrom(convert(steamFrom));
    setSteamTo(convert(steamTo));
    setSteamUnit(next);
  }

  function changeTemperatureUnit(next: TemperatureUnit) {
    if (next === temperatureUnit) return;
    const number = parseEngineeringNumber(temperature, true);
    if (number != null) {
      const c = temperatureToC(number, temperatureUnit);
      setTemperature(fmt(next === "K" ? temperatureCToK(c) : c, 8));
    }
    setTemperatureUnit(next);
  }

  function changePressureUnit(next: PressureUnit) {
    if (next === pressureUnit) return;
    const number = parseEngineeringNumber(pressure);
    if (number != null) {
      const mpa = pressureToMPa(number, pressureUnit);
      setPressure(fmt(next === "bar" ? mpa * 10 : next === "kPa" ? mpa * 1000 : mpa, 10));
    }
    setPressureUnit(next);
  }

  function toggleKit(id: KitId) {
    setKit((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]);
  }

  function reset() {
    setTask("any");
    setFuel("any");
    setPowerFrom("");
    setPowerTo("");
    setSteamFrom("");
    setSteamTo("");
    setTemperature("");
    setPressure("");
    setKit([]);
    setSort("catalog");
    setShown(8);
    setDone(false);
  }

  const quantitySpecified = showSteam ? isPopulated(steamFrom) || isPopulated(steamTo) : isPopulated(powerFrom) || isPopulated(powerTo);
  const hasNumericalFilter = quantitySpecified || isPopulated(temperature);
  const pressureIssue = isPopulated(pressure) && barInput == null;
  const taskLabel = tasks.find((item) => item.id === task)?.label ?? "Любой";
  const fuelLabel = fuel === "any" ? "не задано" : fuels.find((item) => item.id === fuel)?.title ?? "не задано";
  const quantityLabel = showSteam
    ? "Паропроизводительность: " + activeBoundsLabel(steamMinKgH == null ? null : steamKgHToKgS(steamMinKgH), steamMaxKgH == null ? null : steamKgHToKgS(steamMaxKgH), "кг/с")
    : "Мощность: " + activeBoundsLabel(powerMinKw, powerMaxKw, "кВт");
  const temperatureLabel = targetC == null ? "не задана" : fmt(targetC, 4) + " °C (" + fmt(temperatureCToK(targetC), 4) + " K)";
  const kitLabel = kit.length ? kit.map((id) => kits.find((item) => item.id === id)?.label).filter(Boolean).join(", ") : "не выбрана";
  const comment = [
    "Инженерный запрос по открытому каталогу.",
    "Оборудование: " + taskLabel + ".",
    "Топливо: " + fuelLabel + ".",
    quantityLabel + ".",
    "Требуемая максимальная температура серии: " + temperatureLabel + ".",
    "Комплектация (для уточнения, не критерий совпадения): " + kitLabel + ".",
    pressureIssue ? "Давление: значение требует уточнения." :
      targetMPa == null ? "Рабочее давление: не задано." :
      "Рабочее давление (запрос, не критерий автоматического поиска): " + fmt(targetMPa, 6) + " МПа.",
    "Совпадение диапазона серии не означает подтверждения конкретной модели. Это не заказ.",
  ].join(" ");

  return (
    <section id="podbor" className="mx-auto mt-8 max-w-6xl px-4">
      <div className="rounded-3xl border border-line bg-surface p-4 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Инженерный справочник</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold leading-[1.04] tracking-[-0.04em] sm:text-4xl">Подбор по техническим параметрам</h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">
              Отбор по подтверждённым диапазонам серий. Числа пересчитываются в единицы СИ; отсутствие характеристики не заменяется нулём.
            </p>
          </div>
          <button type="button" onClick={reset} className="h-10 rounded-xl border border-line px-4 text-sm font-semibold hover:bg-chip">Сбросить всё</button>
        </div>

        <fieldset className="mt-6">
          <legend className="text-sm font-semibold">01 / Тип оборудования</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {tasks.map((item) => (
              <Chip key={item.id} active={task === item.id} onClick={() => changeTask(item.id)}>{item.label}</Chip>
            ))}
          </div>
        </fieldset>

        <fieldset className="mt-6">
          <legend className="text-sm font-semibold">02 / Энергоноситель и топливо</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            <Chip active={fuel === "any"} onClick={() => setFuel("any")}>Не ограничивать</Chip>
            {fuels.map((item) => (
              <Chip key={item.id} active={fuel === item.id} onClick={() => setFuel(item.id)}>{item.title}</Chip>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted">Серии без опубликованного вида топлива не включаются при выборе конкретного топлива.</p>
        </fieldset>

        <div className="mt-6 rounded-2xl border border-line bg-bg/40 p-4 sm:p-5">
          <h3 className="text-sm font-semibold">03 / Расчётные характеристики</h3>
          <div className="mt-4 grid gap-5 lg:grid-cols-2">
            <fieldset>
              <legend className="text-sm font-semibold">{showSteam ? "Номинальная паропроизводительность" : "Номинальная мощность по каталогу"}</legend>
              <div className="mt-2 grid grid-cols-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] gap-2">
                <NumberField label="От" value={showSteam ? steamFrom : powerFrom} onChange={showSteam ? setSteamFrom : setPowerFrom} placeholder="0,5" />
                <NumberField label="До" value={showSteam ? steamTo : powerTo} onChange={showSteam ? setSteamTo : setPowerTo} placeholder="10" />
                <label className="grid gap-1 text-xs font-medium text-muted">
                  Ед.
                  {showSteam ? (
                    <select aria-label="Единицы паропроизводительности" value={steamUnit} onChange={(event) => changeSteamUnit(event.target.value as SteamUnit)} className="h-11 rounded-xl border border-line bg-surface px-2 text-sm text-ink">
                      <option value="kg/s">кг/с</option>
                      <option value="t/h">т/ч</option>
                      <option value="kg/h">кг/ч</option>
                    </select>
                  ) : (
                    <select aria-label="Единицы мощности" value={powerUnit} onChange={(event) => changePowerUnit(event.target.value as PowerUnit)} className="h-11 rounded-xl border border-line bg-surface px-2 text-sm text-ink">
                      <option value="MW">МВт</option>
                      <option value="kW">кВт</option>
                    </select>
                  )}
                </label>
              </div>
              <p className="mt-2 text-xs text-muted">
                {showSteam
                  ? "В СИ: " + activeBoundsLabel(steamMinKgH == null ? null : steamKgHToKgS(steamMinKgH), steamMaxKgH == null ? null : steamKgHToKgS(steamMaxKgH), "кг/с") + ". 1 т/ч = 0,277778 кг/с."
                  : "В СИ: " + activeBoundsLabel(powerMinKw, powerMaxKw, "кВт") + ". 1 МВт = 1 000 кВт."}
              </p>
            </fieldset>

            <fieldset>
              <legend className="text-sm font-semibold">Требуемая верхняя температура серии</legend>
              <div className="mt-2 grid grid-cols-[minmax(0,1fr)_auto] gap-2">
                <NumberField label="Не ниже" value={temperature} onChange={setTemperature} placeholder="115" />
                <label className="grid gap-1 text-xs font-medium text-muted">
                  Ед.
                  <select aria-label="Единицы температуры" value={temperatureUnit} onChange={(event) => changeTemperatureUnit(event.target.value as TemperatureUnit)} className="h-11 rounded-xl border border-line bg-surface px-3 text-sm text-ink">
                    <option value="C">°C</option>
                    <option value="K">K</option>
                  </select>
                </label>
              </div>
              <p className="mt-2 text-xs text-muted">
                {targetC == null ? "Применяется только к сериям с опубликованным температурным пределом." :
                  "Порог: " + fmt(targetC, 4) + " °C = " + fmt(temperatureCToK(targetC), 4) + " K."}
              </p>
            </fieldset>
          </div>

          {error ? <p role="alert" className="mt-4 rounded-xl border border-accent px-3 py-2 text-sm font-semibold text-accent">{error}</p> : null}

          <details className="mt-5 rounded-xl border border-line bg-surface p-4">
            <summary className="cursor-pointer text-sm font-semibold">Конвертер давления · МПа / бар / кПа</summary>
            <div className="mt-3 grid max-w-lg grid-cols-[minmax(0,1fr)_auto] gap-2">
              <NumberField label="Давление" value={pressure} onChange={setPressure} placeholder="10" />
              <label className="grid gap-1 text-xs font-medium text-muted">
                Ед.
                <select aria-label="Единицы давления" value={pressureUnit} onChange={(event) => changePressureUnit(event.target.value as PressureUnit)} className="h-11 rounded-xl border border-line bg-surface px-3 text-sm text-ink">
                  <option value="bar">бар</option>
                  <option value="MPa">МПа</option>
                  <option value="kPa">кПа</option>
                </select>
              </label>
            </div>
            {pressureIssue ? <p role="alert" className="mt-2 text-sm text-accent">Укажите неотрицательное число.</p> :
              <p className="mt-2 text-sm text-ink">{targetMPa == null ? "1 бар = 0,1 МПа = 100 кПа" :
                "= " + fmt(targetMPa, 6) + " МПа = " + fmt(targetMPa * 1000, 4) + " кПа = " + fmt(targetMPa * 10, 4) + " бар"}</p>}
            <p className="mt-2 text-xs leading-relaxed text-muted">
              Давление сохраняется в техническом запросе, но не отбирает серии: сейчас в исходных данных только текстовые примечания о давлении, без единого числового поля и условий измерения.
            </p>
          </details>
        </div>

        <fieldset className="mt-6">
          <legend className="text-sm font-semibold">04 / Комплектация к запросу</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {kits.map((item) => (
              <Chip key={item.id} active={kit.includes(item.id)} onClick={() => toggleKit(item.id)}>{item.label}</Chip>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted">Можно выбрать несколько. Комплектация фиксируется для консультации и не подмешивает посторонние модели в совпадения.</p>
        </fieldset>

        <div className="mt-7 flex flex-wrap items-end justify-between gap-3 border-t border-line pt-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Результат по открытым сериям</p>
            <p className="mt-1 font-display text-3xl font-extrabold tabular-nums">{hits.length} <span className="text-sm font-medium text-muted">из {allEntries.length}</span></p>
          </div>
          <label className="grid gap-1 text-xs font-medium text-muted">
            Сортировка
            <select value={sort} onChange={(event) => setSort(event.target.value as Sort)} className="h-11 rounded-xl border border-line bg-surface px-3 text-sm text-ink">
              <option value="catalog">По порядку справочника</option>
              <option value="manufacturer">По производителю</option>
              {task !== "any" ? <option value="capacity">По возрастанию параметра</option> : null}
            </select>
          </label>
        </div>

        {hasNumericalFilter ? (
          <p className="mt-2 text-xs leading-relaxed text-muted">
            Отбор показывает серии, чей опубликованный диапазон пересекается с заданным. Это не гарантия наличия отдельного типоразмера. Серии с неизвестными числовыми параметрами при активном числовом фильтре исключаются.
          </p>
        ) : null}

        {hits.length === 0 ? (
          <div className="mt-4 rounded-xl border border-line bg-bg/50 p-4 text-sm">
            Подтверждённых совпадений нет. Попробуйте снять числовое ограничение или уточнить вид оборудования.
          </div>
        ) : (
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {hits.slice(0, shown).map((item) => (
              <li key={item.slug + "-" + item.series.id} className="rounded-2xl border border-line bg-surface p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">{item.maker}</p>
                <h3 className="mt-2 font-display text-xl font-extrabold leading-tight">{item.series.name}</h3>
                <p className="mt-2 text-sm text-ink">{engineeringSpec(item.series)}</p>
                {item.series.tempMaxC != null ?
                  <p className="mt-1 text-xs text-muted">T max: {fmt(temperatureCToK(item.series.tempMaxC), 3)} K ({fmt(item.series.tempMaxC)} °C)</p> : null}
                <Link to="/$slug" params={{ slug: item.slug }} className="mt-3 inline-flex text-sm font-semibold text-accent hover:underline">
                  Открыть карточку производителя
                </Link>
              </li>
            ))}
          </ul>
        )}
        {shown < hits.length ?
          <button type="button" onClick={() => setShown((value) => value + 8)} className="mt-4 h-11 rounded-xl border border-line px-4 text-sm font-semibold hover:bg-chip">
            Показать ещё · {hits.length - shown} осталось
          </button> : null}

        <button type="button" className="mt-7 flex w-full items-center justify-between gap-4 rounded-2xl bg-accent px-5 py-5 text-left text-on-accent hover:bg-accent-hover sm:px-7" onClick={() => setDone(true)}>
          <span>
            <span className="block text-xs font-semibold uppercase tracking-[0.16em]">Инженерный запрос</span>
            <span className="mt-1 block font-display text-2xl font-extrabold leading-tight sm:text-3xl">Уточнить подбор оборудования</span>
          </span>
          <span aria-hidden="true" className="text-3xl">→</span>
        </button>
        {done ? (
          <div id="konsultaciya" className="mt-6 border-t border-line pt-5">
            <h3 className="font-display text-2xl font-extrabold">Инженерная консультация</h3>
            <p className="mt-2 max-w-2xl text-sm text-muted">
              Передайте исходные условия специалисту. Справочник не подтверждает рабочие параметры оборудования и не оформляет заказ.
            </p>
            <div className="mt-4 max-w-xl">
              <LeadForm key={comment} context={{ intent: "pick" }} initialComment={comment} submitLabel="Отправить технический запрос" />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function NumberField({ label, value, onChange, placeholder }: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <label className="grid min-w-0 gap-1 text-xs font-medium text-muted">
      {label}
      <input
        type="text"
        inputMode="decimal"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-11 w-full min-w-0 rounded-xl border border-line bg-surface px-3 text-sm text-ink placeholder:text-muted/60"
      />
    </label>
  );
}

function Chip({ active, children, onClick }: { active: boolean; children: string; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={active
        ? "min-h-10 rounded-xl bg-accent px-3 py-2 text-sm font-semibold text-on-accent transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
        : "min-h-10 rounded-xl border border-line bg-chip px-3 py-2 text-sm text-ink transition-colors hover:bg-bg focus-visible:outline-2 focus-visible:outline-offset-2"}
    >
      {children}
    </button>
  );
}

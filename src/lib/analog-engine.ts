import type { CategoryId, FuelId, Series } from "@/data/catalog";
import type { LineId } from "@/data/manufacturers";

/**
 * Equipment classes are mutually exclusive. Catalogue categoryId remains the
 * primary taxonomy, but conflicting names/kinds and manufacturer lines fail
 * closed rather than turning pumps, burners or controls into boiler analogues.
 */
export type EquipmentFamily =
  | "water"
  | "steam"
  | "oil"
  | "block"
  | "air"
  | "burner"
  | "automation";

export type AnalogEntry = {
  slug: string;
  maker: string;
  line?: LineId;
  series: Series;
};

export type AnalogHit = {
  slug: string;
  maker: string;
  series: Series;
  note: string;
};

const typeNames: Record<EquipmentFamily, string> = {
  water: "водогрейное оборудование",
  steam: "паровое оборудование",
  oil: "термомасляное оборудование",
  block: "котельный блок",
  air: "воздухонагреватель",
  burner: "горелочное оборудование",
  automation: "автоматика",
};

function descriptor(series: Series) {
  return `${series.name} ${series.kind}`.toLocaleLowerCase("ru-RU");
}

function isPump(series: Series) {
  const text = descriptor(series);
  return /насос|помп|\bpumps?\b|heat\s*pump|теплов[а-яё-]*\s+насос/iu.test(text);
}

function isPlaceholder(series: Series) {
  return /^(?:страница|нет данных|каталог не получен)$/iu.test(series.kind.trim());
}

const waterWords = /водогрей|hot[ -]?water boiler/iu;
const steamWords = /паровой|парогенератор|steam boiler/iu;
const oilWords = /термомасл|диатермическ|thermal[ -]?oil/iu;
const airWords = /воздухонагр|air[ -]?heater/iu;
const burnerWords = /горелк|\bburner\b/iu;
const controlWords = /шкаф(?:\s+|ы\s+)управлен|блок управления|система управления|контроллер|автоматик|\bcontroller\b|control cabinet|\bPLC\b/iu;

export function equipmentFamily(series: Series, makerLine?: LineId): EquipmentFamily | null {
  if (isPump(series) || isPlaceholder(series)) return null;
  const text = descriptor(series);
  const category: CategoryId = series.categoryId;

  if (category === "auto") {
    // "Горелки" and "шкафы управления" share auto in the old catalogue:
    // an explicit equipment designation overrides a broad maker line.
    if (controlWords.test(text) && !/^(?:горелк|burner)/iu.test(series.kind.trim())) return "automation";
    if (burnerWords.test(text)) return "burner";
    return makerLine === "burner" ? "burner" : "automation";
  }

  if (category === "air") {
    if (makerLine === "burner" || steamWords.test(text) || waterWords.test(text) || oilWords.test(text) || burnerWords.test(text)) return null;
    return "air";
  }

  if (category === "block") {
    if (makerLine === "burner" || makerLine === "air") return null;
    return "block";
  }

  // A burner/air-only manufacturer must never contribute a "boiler" because
  // of an erroneous category field.
  if (makerLine === "burner" || makerLine === "air") return null;

  if (category === "steam") {
    if (waterWords.test(text) || oilWords.test(text) || airWords.test(text) || burnerWords.test(text)) return null;
    return "steam";
  }
  if (category === "oil") {
    if (waterWords.test(text) || steamWords.test(text) || airWords.test(text) || burnerWords.test(text)) return null;
    return "oil";
  }
  if (category === "water" || category === "hw115" || category === "hw170") {
    if (steamWords.test(text) || oilWords.test(text) || airWords.test(text) || burnerWords.test(text)) return null;
    return "water";
  }
  return null;
}

type Range = { min: number; max: number };
type Parameter = "power" | "steam";

function positiveNumber(n: number | null | undefined): n is number {
  return n != null && Number.isFinite(n) && n > 0;
}

/** Missing range endpoint means one documented point, never an invented 0–max. */
export function publishedRange(series: Series, parameter: Parameter): Range | null {
  const minimum = parameter === "steam" ? series.steamMinKgH : series.powerMinKw;
  const maximum = parameter === "steam" ? series.steamMaxKgH : series.powerMaxKw;
  const values = series.sizes
    .map((size) => parameter === "steam" ? size.steamKgH : size.powerKw)
    .filter(positiveNumber);
  const low = positiveNumber(minimum) ? minimum : values.length ? Math.min(...values) : null;
  const high = positiveNumber(maximum) ? maximum : values.length ? Math.max(...values) : null;
  if (low === null && high === null) return null;
  const min = low ?? high!;
  const max = high ?? low!;
  return { min: Math.min(min, max), max: Math.max(min, max) };
}

function overlaps(a: Range, b: Range): boolean {
  return Math.max(a.min, b.min) <= Math.min(a.max, b.max);
}

function steamIsSuperheated(series: Series): boolean {
  return /пароперегрев|перегрет(ый|ого|ым)?\s+пар|superheat/iu.test(`${series.kind} ${series.feature} ${series.name}`);
}

function compatibleTemperature(source: Series, candidate: Series, family: EquipmentFamily): boolean {
  if (family !== "water") return true;
  // High-temperature water equipment cannot be replaced by a <=115 C boiler.
  if (source.categoryId === "hw170" && candidate.categoryId === "hw115") return false;
  if (positiveNumber(source.tempMaxC)) {
    if (!positiveNumber(candidate.tempMaxC)) return false;
    if (candidate.tempMaxC < source.tempMaxC) return false;
  } else if (source.categoryId === "hw170") {
    // With the exact temperature absent, only a documented high-temp
    // category can pass the preliminary type filter.
    if (candidate.categoryId !== "hw170") return false;
  }
  return true;
}

function matchingFuels(requested: FuelId[], offered: FuelId[]): boolean {
  // Every declared required fuel must be supported; undocumented fuel is not
  // treated as a wildcard, nor is a gas burner a gas/diesel equivalent.
  return requested.every((fuel) => offered.includes(fuel));
}

/**
 * Strict preselection, not a certificate of technical interchangeability.
 * Filters are hard constraints; ranking is applied only afterwards.
 */
export function findAnalogCandidates(
  source: Series,
  sourceSlug: string,
  entries: readonly AnalogEntry[],
  limit = 8,
  sourceLine?: LineId,
): AnalogHit[] {
  const family = equipmentFamily(source, sourceLine);
  if (!family || !Number.isFinite(limit) || limit <= 0) return [];

  const parameter: Parameter = family === "steam" ? "steam" : "power";
  const requestedRange = publishedRange(source, parameter);
  const matches: { hit: AnalogHit; score: number }[] = [];
  const seen = new Set<string>();

  for (const entry of entries) {
    const other = entry.series;
    const key = `${entry.slug}:${other.id}`;
    if (entry.slug === sourceSlug || seen.has(key)) continue;
    seen.add(key);
    if (equipmentFamily(other, entry.line) !== family) continue;
    if (family === "steam" && steamIsSuperheated(source) !== steamIsSuperheated(other)) continue;
    if (!matchingFuels(source.fuels, other.fuels)) continue;
    if (!compatibleTemperature(source, other, family)) continue;

    const offeredRange = publishedRange(other, parameter);
    // Without a proven range for a candidate, we cannot call it a technical
    // analogue. A missing source range permits type-only preliminary lookup.
    if (!offeredRange) continue;
    if (requestedRange && !overlaps(requestedRange, offeredRange)) continue;

    const comparison = requestedRange
      ? `диапазон ${family === "steam" ? "паропроизводительности" : "мощности"} пересекается`
      : "параметры исходной серии неизвестны — требуется техническая сверка";
    const note = `Тот же тип: ${typeNames[family]}; ${comparison}; ${source.fuels.length ? "заявленные виды топлива совпадают" : "топливо требует подтверждения"}. Давление, КПД и комплектацию сверить перед закупкой.`;
    const sourceMid = requestedRange ? (requestedRange.min + requestedRange.max) / 2 : null;
    const candidateMid = (offeredRange.min + offeredRange.max) / 2;
    const deviation = sourceMid === null ? offeredRange.max : Math.abs(candidateMid - sourceMid) / Math.max(sourceMid, 1);
    const width = offeredRange.max - offeredRange.min;
    matches.push({
      hit: { slug: entry.slug, maker: entry.maker, series: other, note },
      score: deviation * 100 + width / Math.max(sourceMid ?? offeredRange.max, 1),
    });
  }

  return matches
    .sort((a, b) => a.score - b.score || a.hit.maker.localeCompare(b.hit.maker, "ru") || a.hit.series.name.localeCompare(b.hit.series.name, "ru"))
    .slice(0, Math.min(Math.trunc(limit), 50))
    .map((match) => match.hit);
}

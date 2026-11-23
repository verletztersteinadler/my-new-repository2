/**
 * Preliminary boiler-house configuration logic.
 * All quantities are based on user-entered design duties (NOT inferred from area,
 * climate, consumption or generic boiler efficiencies).
 * It is a technical brief, not a hydraulic/thermal design or safety assessment.
 */
import type { FuelId, Series } from "@/data/catalog";
import { rangeIntersects } from "./engineering-units.ts";

export type PlantMode = "water" | "steam" | "combined";
export type DutyKind = "water" | "steam";
export type ReserveMode = "none" | "n-plus-one";
export type OperationMode = "continuous" | "seasonal" | "variable";
export type PlantLocation = "modular" | "standalone" | "built-in" | "existing";
export type WaterCircuit = "direct" | "independent" | "to-decide";
export type AutomationLevel = "local" | "dispatch" | "to-decide";

export type PlantDuties = {
  mode: PlantMode;
  heatKw: number;
  steamKgH: number;
  heatUnitCount: number;
  steamUnitCount: number;
  heatReserve: ReserveMode;
  steamReserve: ReserveMode;
};

export type TrainCalculation = {
  demand: number;
  totalUnits: number;
  dutyUnits: number;
  standbyUnits: number;
  minimumPerDutyUnit: number;
  minimumTotalInstalled: number;
};

export function calculateTrain(demand: number, totalUnits: number, reserve: ReserveMode): TrainCalculation | null {
  if (!Number.isFinite(demand) || demand <= 0 || !Number.isInteger(totalUnits) || totalUnits < 1 || totalUnits > 12) return null;
  const standbyUnits = reserve === "n-plus-one" ? 1 : 0;
  const dutyUnits = totalUnits - standbyUnits;
  if (dutyUnits < 1) return null;
  return {
    demand,
    totalUnits,
    dutyUnits,
    standbyUnits,
    minimumPerDutyUnit: demand / dutyUnits,
    minimumTotalInstalled: demand * totalUnits / dutyUnits,
  };
}

export function calculatePlant(input: PlantDuties) {
  return {
    heat: input.mode === "steam" ? null : calculateTrain(input.heatKw, input.heatUnitCount, input.heatReserve),
    steam: input.mode === "water" ? null : calculateTrain(input.steamKgH, input.steamUnitCount, input.steamReserve),
  };
}

export type BoilerCandidate = {
  slug: string;
  maker: string;
  series: Series;
  kind: DutyKind;
  capacityMin: number;
  capacityMax: number;
  closestPublishedSize: { name: string; value: number } | null;
  sourceLevel: "published-model" | "series-range";
};

export type CatalogEntry = { slug: string; maker: string; series: Series; line: string | undefined };

function capacityRange(series: Series, kind: DutyKind) {
  const nominal = (kind === "water" ? series.sizes.map((v) => v.powerKw) : series.sizes.map((v) => v.steamKgH))
    .filter((x): x is number => x != null && Number.isFinite(x) && x > 0);
  const minField = kind === "water" ? series.powerMinKw : series.steamMinKgH;
  const maxField = kind === "water" ? series.powerMaxKw : series.steamMaxKgH;
  const lo = minField ?? (nominal.length ? Math.min(...nominal) : null);
  const hi = maxField ?? (nominal.length ? Math.max(...nominal) : null);
  if (lo == null || hi == null || !Number.isFinite(lo) || !Number.isFinite(hi)) return null;
  return { min: Math.min(lo, hi), max: Math.max(lo, hi) };
}

export function findBoilerCandidates(args: {
  entries: CatalogEntry[];
  kind: DutyKind;
  dutyPerUnit: number;
  mainFuel: FuelId | "";
  reserveFuel: FuelId | "";
  minimumTempC?: number | null;
  limit?: number;
}): BoilerCandidate[] {
  const { entries, kind, dutyPerUnit, mainFuel, reserveFuel, minimumTempC } = args;
  if (!Number.isFinite(dutyPerUnit) || dutyPerUnit <= 0) return [];
  const result: BoilerCandidate[] = [];
  for (const entry of entries) {
    const s = entry.series;
    if (entry.line === "burner" || entry.line === "air") continue;
    if (kind === "water" && !["water", "hw115", "hw170"].includes(s.categoryId)) continue;
    if (kind === "steam" && s.categoryId !== "steam") continue;
    if (mainFuel && !s.fuels.includes(mainFuel)) continue;
    if (reserveFuel && reserveFuel !== mainFuel && !s.fuels.includes(reserveFuel)) continue;
    if (kind === "water" && minimumTempC != null && (s.tempMaxC == null || s.tempMaxC < minimumTempC)) continue;
    const range = capacityRange(s, kind);
    if (!range || !rangeIntersects(range.min, range.max, dutyPerUnit, dutyPerUnit)) continue;
    const matching = s.sizes
      .map((size) => ({
        name: size.name,
        value: kind === "water" ? size.powerKw : size.steamKgH,
      }))
      .filter((v): v is { name: string; value: number } => v.value != null && v.value >= dutyPerUnit && Number.isFinite(v.value))
      .sort((a, b) => a.value - b.value);
    result.push({
      slug: entry.slug, maker: entry.maker, series: s, kind,
      capacityMin: range.min, capacityMax: range.max,
      closestPublishedSize: matching[0] ?? null,
      sourceLevel: matching.length ? "published-model" : "series-range",
    });
  }
  result.sort((a, b) => {
    if (a.sourceLevel !== b.sourceLevel) return a.sourceLevel === "published-model" ? -1 : 1;
    const aExcess = (a.closestPublishedSize?.value ?? a.capacityMax) - dutyPerUnit;
    const bExcess = (b.closestPublishedSize?.value ?? b.capacityMax) - dutyPerUnit;
    return aExcess - bExcess || a.maker.localeCompare(b.maker, "ru");
  });
  return result.slice(0, Math.max(1, Math.min(args.limit ?? 5, 25)));
}

export type PlantDraft = {
  object: string;
  location: string;
  mode: PlantMode;
  purpose: string[];
  heatLoads: { heatingKw: number; dhwKw: number; processKw: number };
  steamKgH: number;
  waterSupplyC: number | null;
  waterReturnC: number | null;
  waterPressureMPa: number | null;
  steamPressureMPa: number | null;
  steamCondition: string;
  condensateReturnPct: number | null;
  mainFuel: string;
  reserveFuel: string;
  operation: OperationMode;
  placement: PlantLocation;
  circuit: WaterCircuit;
  automation: AutomationLevel;
  heatTrain: TrainCalculation | null;
  steamTrain: TrainCalculation | null;
  chosenSystems: string[];
  notes: string;
};

export function buildTechnicalBrief(x: PlantDraft): string {
  const fmt = (v: number, d = 4) => v.toLocaleString("ru-RU", { maximumFractionDigits: d });
  const scheme = { direct: "зависимое присоединение", independent: "независимое через теплообменники", "to-decide": "определить по проекту" } as const;
  const operation = { continuous: "круглогодичная", seasonal: "сезонная", variable: "переменная / пиковая нагрузка" } as const;
  const placement = { modular: "блочно-модульная", standalone: "отдельно стоящая", "built-in": "встроенная / пристроенная", existing: "реконструкция" } as const;
  const automation = { local: "местная", dispatch: "удалённая диспетчеризация", "to-decide": "определить по заданию" } as const;
  const lines: string[] = [
    "ПРЕДВАРИТЕЛЬНОЕ ТЕХНИЧЕСКОЕ ЗАДАНИЕ — КОТЕЛЬНАЯ",
    "Статус: инженерный запрос для уточнения, не проектная документация.",
    "Объект: " + (x.object.trim() || "не указан") + "; местоположение: " + (x.location.trim() || "не указано"),
    "Тип котельной: " + ({ water: "водогрейная", steam: "паровая", combined: "комбинированная" } as const)[x.mode],
    "Потребители: " + (x.purpose.length ? x.purpose.join(", ") : "не указаны"),
  ];
  if (x.mode !== "steam") {
    lines.push(
      "Тепловые нагрузки, кВт: отопление/вентиляция " + fmt(x.heatLoads.heatingKw)
        + "; ГВС " + fmt(x.heatLoads.dhwKw) + "; технологические нужды " + fmt(x.heatLoads.processKw)
        + ". Сумма без коэффициента неодновременности: " + fmt(x.heatLoads.heatingKw + x.heatLoads.dhwKw + x.heatLoads.processKw) + " кВт.",
      "Водяной график: " + (x.waterSupplyC == null ? "уточнить" : fmt(x.waterSupplyC) + " °C")
        + " / " + (x.waterReturnC == null ? "уточнить" : fmt(x.waterReturnC) + " °C") + ".",
      "Давление водяного контура: " + (x.waterPressureMPa == null ? "уточнить" : fmt(x.waterPressureMPa) + " МПа") + ".",
      "Схема присоединения: " + scheme[x.circuit] + ".",
    );
  }
  if (x.mode !== "water") {
    lines.push(
      "Требуемая паропроизводительность: " + fmt(x.steamKgH / 3600, 6) + " кг/с (" + fmt(x.steamKgH) + " кг/ч).",
      "Требуемое давление пара: " + (x.steamPressureMPa == null ? "уточнить" : fmt(x.steamPressureMPa) + " МПа") + ".",
      "Состояние пара: " + x.steamCondition + ".",
      "Доля возврата конденсата: " + (x.condensateReturnPct == null ? "уточнить" : fmt(x.condensateReturnPct) + " %") + ".",
    );
  }
  const unitLine = (name: string, t: TrainCalculation | null, unit: string) => {
    if (!t) return;
    lines.push(
      name + ": потребность " + fmt(t.demand) + " " + unit + "; котлоагрегатов " + t.totalUnits
      + " (рабочих " + t.dutyUnits + ", резервных " + t.standbyUnits + ");"
      + " минимальная номинальная производительность 1 рабочего агрегата " + fmt(t.minimumPerDutyUnit, 6) + " " + unit
      + "; суммарная установленная номинальная производительность не менее " + fmt(t.minimumTotalInstalled, 6) + " " + unit + ".",
    );
  };
  unitLine("Водогрейная группа", x.heatTrain, "кВт");
  unitLine("Паровая группа", x.steamTrain, "кг/ч");
  lines.push(
    "Основное топливо: " + (x.mainFuel || "уточнить") + "; резервное: " + (x.reserveFuel || "не предусмотрено / уточнить") + ".",
    "Режим работы: " + operation[x.operation] + "; размещение: " + placement[x.placement] + "; автоматика: " + automation[x.automation] + ".",
    "Вспомогательные системы, включённые в запрос: " + (x.chosenSystems.join(", ") || "не отмечены") + ".",
    "Дополнительные условия: " + (x.notes.trim() || "не указаны") + ".",
    "Важно: подбор не учитывает гидравлический расчёт, КПД, качество воды, допустимые выбросы, теплопотери здания,"
      + " надёжность электроснабжения и обязательные требования безопасности; их нужно проверить проектировщику.",
  );
  return lines.join("\n");
}

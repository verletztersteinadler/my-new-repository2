/**
 * Anonymous preliminary boiler-house cost estimator.
 * Values are rounded and apply only to reference standard packages.
 * Neither a supplier quotation nor an offer; the UI does not name a source.
 */
import { PRICE_BENCHMARKS, type PriceKind, type Benchmark } from "../data/boiler-price-benchmarks.ts";
import type { FuelId } from "../data/catalog.ts";
import type { PlantLocation, PlantMode, TrainCalculation } from "./boiler-house.ts";

export type EstimateArgs = {
  mode: PlantMode;
  heat: TrainCalculation | null;
  steam: TrainCalculation | null;
  fuel: FuelId | "";
  alternateFuel: FuelId | "";
  placement: PlantLocation;
};

export type EstimateResult = {
  lowRUB: number;
  highRUB: number;
  baseRUB: number;
  components: { kind: PriceKind; capacityKw: number; count: number; baseRUB: number }[];
  assumptions: string[];
};

function pricingFuel(main: FuelId | "", alternate: FuelId | ""): "gas" | "liquid" | "dual" | null {
  if ([main, alternate].some((id) => id === "solid")) return null;
  const liquid = (id: FuelId | "") => ["diesel", "furnace", "heavy"].includes(id);
  const gas = main === "gas" || (!main && !alternate);
  const mixed = (main === "gas" && liquid(alternate)) || (liquid(main) && alternate === "gas");
  if (mixed) return "dual";
  if (alternate && !(alternate === main || (liquid(main) && liquid(alternate)))) return null;
  return gas ? "gas" : liquid(main) ? "liquid" : null;
}

/** Source table is per whole boiler-house package, not per individual boiler. */
function referenceRow(kind: PriceKind, installedCapacityKw: number, count: number): Benchmark | null {
  if (!Number.isFinite(installedCapacityKw) || installedCapacityKw <= 0 || !Number.isInteger(count)) return null;
  return [...PRICE_BENCHMARKS[kind]]
    .filter((row) => row.units === count && row.capacityKw >= installedCapacityKw)
    .sort((a, b) => a.capacityKw - b.capacityKw)[0] ?? null;
}

export function estimateBoilerHouse(args: EstimateArgs): EstimateResult | null {
  const fuel = pricingFuel(args.fuel, args.alternateFuel);
  if (!fuel) return null;
  const requested: { kind: PriceKind; installedCapacityKw: number; count: number }[] = [];
  if (args.mode === "water" || args.mode === "combined" || args.mode === "oil") {
    if (!args.heat) return null;
    requested.push({
      kind: args.mode === "oil" ? "oil" : "water",
      installedCapacityKw: args.heat.minimumTotalInstalled,
      count: args.heat.totalUnits,
    });
  }
  if (args.mode === "steam" || args.mode === "combined") {
    if (!args.steam) return null;
    // Pricing table uses nominal thermal kW while the engineering calculator
    // inputs mass flow in kg/h. 0.7 kWh/kg is a rough assumption ONLY; actual
    // conditions (enthalpy, steam pressure, feedwater temp) require verification.
    requested.push({ kind: "steam", installedCapacityKw: args.steam.minimumTotalInstalled * 0.7, count: args.steam.totalUnits });
  }
  if (!requested.length) return null;
  const components: EstimateResult["components"] = [];
  let baseRUB = 0;
  for (const request of requested) {
    const row = referenceRow(request.kind, request.installedCapacityKw, request.count);
    if (!row) return null; // Do not invent values beyond source capacity/configurations.
    const base = row[fuel] + (args.placement === "modular" ? 0 : row.withoutModule);
    if (!Number.isFinite(base) || base <= 0) return null;
    baseRUB += base;
    components.push({ kind: request.kind, capacityKw: row.capacityKw, count: row.units, baseRUB: base });
  }
  const steamAssumption = requested.some((r) => r.kind === "steam");
  const assumptions = [
    "Стандартная комплектация; индивидуальные опции, проектирование, доставка, подключение и монтаж уточняются отдельно.",
    args.placement === "modular" ? "Блочно-модульное исполнение." : "Без стоимости модульного здания; строительные работы и размещение считаются отдельно.",
    args.fuel === "" ? "Для предварительного ориентира принято газовое топливо." : "",
    steamAssumption ? "Для оценки паровой нагрузки принят приблизительный тепловой эквивалент 0,7 кВт на 1 кг/ч; параметры пара и питательной воды уточняются." : "",
    args.mode === "combined" ? "Водогрейная и паровая группы оценены раздельно; общие системы и совместимость требуют отдельного расчёта." : "",
  ].filter(Boolean);
  const radius = steamAssumption || args.mode === "combined" ? 0.28 : 0.22;
  const round = (v: number) => Math.round(v / 100000) * 100000;
  return {
    lowRUB: Math.max(100000, round(baseRUB * (1 - radius))),
    highRUB: round(baseRUB * (1 + radius)),
    baseRUB,
    components,
    assumptions,
  };
}

export function formatRubleAmount(value: number): string {
  return new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(value) + " ₽";
}

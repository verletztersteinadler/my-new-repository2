/**
 * Engineering unit conversions. Catalog storage: power in kW, steam flow in kg/h,
 * temperature in °C. Display/inputs may use additional conventional units.
 * Pressure is conversion-only until catalogs contain normalized numeric pressure.
 */
export type PowerUnit = "kW" | "MW";
export type SteamUnit = "kg/s" | "kg/h" | "t/h";
export type TemperatureUnit = "C" | "K";
export type PressureUnit = "MPa" | "bar" | "kPa";

export function parseEngineeringNumber(value: string, allowNegative = false): number | null {
  const clean = value.trim().replace(/\s/g, "").replace(",", ".");
  if (!/^[+-]?\d+(?:\.\d+)?$/.test(clean)) return null;
  const number = Number(clean);
  if (!Number.isFinite(number) || (!allowNegative && number < 0)) return null;
  return number;
}

export function powerToKw(value: number, unit: PowerUnit): number {
  return unit === "MW" ? value * 1000 : value;
}

export function steamToKgH(value: number, unit: SteamUnit): number {
  if (unit === "kg/s") return value * 3600;
  if (unit === "t/h") return value * 1000;
  return value;
}

export function steamKgHToKgS(value: number): number {
  return value / 3600;
}

export function temperatureToC(value: number, unit: TemperatureUnit): number {
  return unit === "K" ? value - 273.15 : value;
}

export function temperatureCToK(value: number): number {
  return value + 273.15;
}

export function pressureToMPa(value: number, unit: PressureUnit): number {
  if (unit === "bar") return value / 10;
  if (unit === "kPa") return value / 1000;
  return value;
}

export function formatEngineeringNumber(value: number, digits = 5): string {
  return value.toLocaleString("ru-RU", { maximumFractionDigits: digits });
}

export function rangeIntersects(
  seriesMin: number | null,
  seriesMax: number | null,
  requestedMin: number | null,
  requestedMax: number | null,
): boolean {
  if (requestedMin == null && requestedMax == null) return true;
  if (seriesMin == null || seriesMax == null) return false;
  if (requestedMin != null && requestedMax != null && requestedMin > requestedMax) return false;
  return seriesMax >= (requestedMin ?? Number.NEGATIVE_INFINITY)
    && seriesMin <= (requestedMax ?? Number.POSITIVE_INFINITY);
}

import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Портфель polytechnik.com. Kombi Power 990–20 000 кВт — система ReGaWatt, не котёл Polytechnik, и не внесена.";

function line(id: string, name: string, min: number, max: number, feature: string): Series {
  return {
    id,
    name,
    categoryId: "water",
    kind: feature,
    image: "/catalog/solid.jpg",
    summary: `${min.toLocaleString("ru-RU")}–${max.toLocaleString("ru-RU")} кВт.`,
    powerMinKw: min,
    powerMaxKw: max,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["solid"] as FuelId[],
    feature,
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: [],
  };
}

export const polytechnikCategories: Category[] = [{ id: "water", title: "Водогрейные", param: "power" }];
export const polytechnikDocuments = [{ title: "Портфель Polytechnik" }];
export const polytechnikSeries: Series[] = [
  line("poly-main", "Polytechnik", 1000, 30000, "Один котёл до 30 МВт. Вода, воздух, пар и термомасло в одной границе"),
  line("poly-held", "Polytechnik PolyHeld", 400, 3000, "Газификация, частичная нагрузка до 25%"),
];

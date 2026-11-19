import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страница котлов lambion.de. Пример 10 т/ч при 32 бар — один котёл, не граница ряда.";

function line(id: string, name: string, cat: "steam" | "oil" | "water", min: number, max: number, pressure: string | null, temp: number | null, feature: string, image: string): Series {
  return {
    id,
    name,
    categoryId: cat,
    kind: feature,
    image,
    summary: `${min.toLocaleString("ru-RU")}–${max.toLocaleString("ru-RU")} кВт.`,
    powerMinKw: min,
    powerMaxKw: max,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: temp,
    pressureNote: pressure,
    fuels: ["solid"] as FuelId[],
    feature,
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: [],
  };
}

export const lambionCategories: Category[] = [
  { id: "steam", title: "Паровые", param: "steam" },
  { id: "oil", title: "Термомасляные", param: "power" },
  { id: "water", title: "Водогрейные", param: "power" },
];
export const lambionDocuments = [{ title: "Котлы LAMBION" }];
export const lambionSeries: Series[] = [
  line("lambion-wt", "LAMBION, водотрубный", "steam", 3500, 50000, "до 85 бар", 520, "Пар или горячая вода", "/catalog/waterpipe.jpg"),
  line("lambion-pre", "LAMBION, жаротрубный с предтопком", "steam", 500, 18000, "до 36 бар", null, "Пар или вода", "/catalog/firetube.jpg"),
  line("lambion-oil", "LAMBION, термомасло", "oil", 1000, 25000, null, null, "1 000–25 000 кВт тепловых", "/catalog/reverse.jpg"),
  line("lambion-ft", "LAMBION, жаровая труба", "water", 650, 18000, "до 16 бар", null, "Насыщенный пар или горячая вода", "/catalog/firetube.jpg"),
];

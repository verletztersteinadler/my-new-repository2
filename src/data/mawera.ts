import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страница промышленности schmid-mawera.com. Общая фраза 180 кВт–13 МВт к одной серии не приписана.";

function line(id: string, name: string, min: number, max: number, feature: string, cat: "water" | "steam"): Series {
  return {
    id,
    name,
    categoryId: cat,
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

export const maweraCategories: Category[] = [
  { id: "water", title: "Водогрейные", param: "power" },
  { id: "steam", title: "Паровые", param: "steam" },
];
export const maweraDocuments = [{ title: "Schmid Mawera" }];
export const maweraSeries: Series[] = [
  line("maw-utsk", "Mawera UTSK visio", 180, 900, "Тёплая или горячая вода", "water"),
  line("maw-utsr", "Mawera UTSR visio", 180, 8000, "Вода или пар", "steam"),
  line("maw-srt", "Mawera SRT", 1700, 13000, "Вода или пар", "steam"),
  line("maw-ffu", "Mawera FFU", 180, 850, "Вода", "water"),
];

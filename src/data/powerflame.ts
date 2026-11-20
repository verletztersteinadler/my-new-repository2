import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страница EVO на powerflame.com. Шапка 40–1 500 BHP. Другой абзац пишет 80–800 BHP. BTU/ч и BHP в киловатты не переведены.";

export const powerflameCategories: Category[] = [{ id: "auto", title: "Горелки", param: "none" }];
export const powerflameDocuments = [{ title: "EVO" }];
export const powerflameSeries: Series[] = [
  {
    id: "pf-evo",
    name: "Power Flame EVO",
    categoryId: "auto",
    kind: "Горелка",
    image: "/catalog/cabinet.jpg",
    summary: "1 670 000–42 000 000 BTU/ч. 40–1 500 BHP в шапке.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["gas", "diesel"] as FuelId[],
    feature: "40–1 500 BHP. Абзац ниже сужает до 80–800",
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: ["evo"],
  },
];

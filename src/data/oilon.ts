import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страница LN30 на oilon.com. Остальные ряды Oilon не открывались.";

export const oilonCategories: Category[] = [{ id: "auto", title: "Горелки", param: "none" }];
export const oilonDocuments = [{ title: "LN30" }];
export const oilonSeries: Series[] = [
  {
    id: "oilon-ln30",
    name: "Oilon LN30",
    categoryId: "auto",
    kind: "Газовая горелка",
    image: "/catalog/cabinet.jpg",
    summary: "260–7 020 кВт.",
    powerMinKw: 260,
    powerMaxKw: 7020,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["gas"] as FuelId[],
    feature: "Природный газ и СУГ",
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: ["ln30"],
  },
];

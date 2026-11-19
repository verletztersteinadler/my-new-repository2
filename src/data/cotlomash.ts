import type { Category, FuelId, Series, Size } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Таблица КПО на cotlomash.ru. У последней колонки в скобках стоят 600 и 800, в размер не внесены.";

const rows: [string, number, number][] = [
  ["КПО-70", 58.1, 70],
  ["КПО-100", 81.4, 100],
  ["КПО-150", 116.3, 150],
  ["КПО-250", 147.4, 250],
  ["КПО-300", 232.6, 300],
  ["КПО-500", 348.9, 500],
  ["КПО-600", 465.2, 600],
];

export const cotlomashCategories: Category[] = [{ id: "steam", title: "Паровые", param: "steam" }];
export const cotlomashDocuments = [{ title: "КПО" }];
export const cotlomashSeries: Series[] = [
  {
    id: "cotlo-kpo",
    name: "Котломаш КПО",
    categoryId: "steam",
    kind: "Газ или дизель",
    image: "/catalog/steam.jpg",
    summary: "Пар 70–600 кг/ч. Тепло 58,1–465,2 кВт.",
    powerMinKw: 58.1,
    powerMaxKw: 465.2,
    steamMinKgH: 70,
    steamMaxKgH: 600,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["gas", "diesel"] as FuelId[],
    feature: "Природный газ, СУГ или лёгкое дизельное топливо",
    extra: checked,
    sizes: rows.map(([name, powerKw, steamKgH]): Size => ({ id: `cotlo-${name}`, name, powerKw, steamKgH })),
    sizesNote: null,
    aliases: ["кпо"],
  },
];

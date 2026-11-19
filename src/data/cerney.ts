import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страницы cerneyboilers.com. Котлы проектные, именного ряда нет.";

export const cerneyCategories: Category[] = [
  { id: "steam", title: "Паровые", param: "steam" },
  { id: "water", title: "Водогрейные", param: "power" },
];

export const cerneyDocuments = [{ title: "Паровые и электрические CERNEY" }];

export const cerneySeries: Series[] = [
  {
    id: "cerney-steam",
    name: "CERNEY, жаротрубный пар",
    categoryId: "steam",
    kind: "Жаротрубный, под объект",
    image: "/catalog/firetube.jpg",
    summary: "До 38 МВт тепл. Нижняя граница и пар в т/ч не названы.",
    powerMinKw: null,
    powerMaxKw: 38000,
    powerNote: "до 38 МВт тепл.",
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["gas", "diesel"] as FuelId[],
    feature: "Жидкое или газообразное топливо, утилизация",
    extra: checked,
    sizes: [],
    sizesNote: "Завод пишет, что стандартного ряда нет.",
    aliases: ["cerney"],
  },
  {
    id: "cerney-e",
    name: "CERNEY, электрические",
    categoryId: "water",
    kind: "Электрический, пар или вода, на раме",
    image: "/catalog/cabinet.jpg",
    summary: "130–3 900 кВт, расчётное давление 13 бар.",
    powerMinKw: 130,
    powerMaxKw: 3900,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: "13 бар",
    fuels: [],
    feature: "Пар и вода",
    extra: `${checked} Гибридный котёл назван без мощности и не вынесен.`,
    sizes: [],
    sizesNote: null,
    aliases: [],
  },
];

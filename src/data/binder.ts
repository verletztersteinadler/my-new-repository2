import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страница продукции binder-gmbh.at. Диапазон общий, не по каждому теплоносителю.";

export const binderCategories: Category[] = [{ id: "water", title: "Водогрейные", param: "power" }];

export const binderDocuments = [{ title: "Биомасса BINDER" }];

export const binderSeries: Series[] = [
  {
    id: "binder-bio",
    name: "BINDER, биомасса",
    categoryId: "water",
    kind: "Биомассовый котёл",
    image: "/catalog/solid.jpg",
    summary: "4–10 000 кВт.",
    powerMinKw: 4,
    powerMaxKw: 10000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["solid"] as FuelId[],
    feature: "Тёплая вода, горячая вода, пар, нестандартное топливо, горячий воздух",
    extra: `${checked} Пять назначений перечислены без собственных киловатт. Пар и горячий воздух в фильтр воды не выделены.`,
    sizes: [],
    sizesNote: "Типоразмеров нет.",
    aliases: ["binder"],
  },
];

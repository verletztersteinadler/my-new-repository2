import type { Category, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страница электродного котла parat.no. Таблица до 60 МВт. В тексте также сказано 0–75 МВт, этот верх в ряд не внесён. 16 бар указаны для массы парового исполнения.";

export const paratCategories: Category[] = [
  { id: "water", title: "Водогрейные", param: "power" },
  { id: "steam", title: "Паровые", param: "steam" },
];
export const paratDocuments = [{ title: "Электродный котёл" }];
export const paratSeries: Series[] = [
  {
    id: "parat-hw",
    name: "PARAT, электродный водогрейный",
    categoryId: "water",
    kind: "Высоковольтный электродный",
    image: "/catalog/cabinet.jpg",
    summary: "Полосы таблицы 0–60 МВт.",
    powerMinKw: 0,
    powerMaxKw: 60000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: [],
    feature: "Электрический",
    extra: checked,
    sizes: [],
    sizesNote: "Полосы: 0–5, 5–15, 15–30, 30–45 и 45–60 МВт.",
    aliases: ["electrode"],
  },
  {
    id: "parat-st",
    name: "PARAT, электродный паровой",
    categoryId: "steam",
    kind: "Высоковольтный электродный",
    image: "/catalog/vertical.jpg",
    summary: "7,5–90 т/ч по таблице полос.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: 7500,
    steamMaxKgH: 90000,
    tempMaxC: null,
    pressureNote: "16 бар в примечании к массе",
    fuels: [],
    feature: "Электрический",
    extra: checked,
    sizes: [],
    sizesNote: "7,5 / 22,5 / 45 / 67,5 / 90 т/ч напротив полос мощности.",
    aliases: [],
  },
];

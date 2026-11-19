import type { Category, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Новость DHT об EWx. В тексте сразу 30–240 кВт для новых моделей и 30–1 200 кВт для всей линейки. Взята линейка.";

export const sussmanCategories: Category[] = [{ id: "water", title: "Водогрейные", param: "power" }];
export const sussmanDocuments = [{ title: "EWx" }];
export const sussmanSeries: Series[] = [
  {
    id: "sussman-ewx",
    name: "Sussman EWx",
    categoryId: "water",
    kind: "Электрический водогрейный",
    image: "/catalog/cabinet.jpg",
    summary: "30–1 200 кВт.",
    powerMinKw: 30,
    powerMaxKw: 1200,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: [],
    feature: "Электрический",
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: ["ewx"],
  },
];

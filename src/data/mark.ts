import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страница GS+ на markclimate.com.";

export const markCategories: Category[] = [{ id: "air", title: "Воздухонагреватели", param: "power" }];
export const markDocuments = [{ title: "GS+" }];
export const markSeries: Series[] = [
  {
    id: "mark-gs",
    name: "Mark GS+",
    categoryId: "air",
    kind: "Газовый воздухонагреватель",
    image: "/catalog/web-air.jpg",
    summary: "13,6–142,2 кВт.",
    powerMinKw: 13.6,
    powerMaxKw: 142.2,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["gas"] as FuelId[],
    feature: "Конденсационный, премикс",
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: ["gs+"],
  },
];

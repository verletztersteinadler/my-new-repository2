import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Калькулятор teplovey.ru. Модели названы как Т-45…Т-2000, мощность 45–2 500 кВт.";

export const teploveyCategories: Category[] = [{ id: "air", title: "Воздухонагреватели", param: "power" }];
export const teploveyDocuments = [{ title: "Тепловей" }];
export const teploveySeries: Series[] = [
  {
    id: "teplovey",
    name: "Тепловей Т-45…Т-2000",
    categoryId: "air",
    kind: "Рекуперативный воздухонагреватель",
    image: "/catalog/web-air.jpg",
    summary: "45–2 500 кВт.",
    powerMinKw: 45,
    powerMaxKw: 2500,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["gas", "diesel"] as FuelId[],
    feature: "Газ или дизель",
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: [],
  },
];

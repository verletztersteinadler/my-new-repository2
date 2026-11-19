import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страница ряда MAX GAS ErP на ecoflam-burners.com.";

export const ecoflamCategories: Category[] = [{ id: "auto", title: "Горелки", param: "none" }];
export const ecoflamDocuments = [{ title: "MAX GAS ErP" }];
export const ecoflamSeries: Series[] = [
  {
    id: "ecoflam-max",
    name: "Ecoflam MAX GAS ErP",
    categoryId: "auto",
    kind: "Моноблок, газ",
    image: "/catalog/cabinet.jpg",
    summary: "17–500 кВт.",
    powerMinKw: 17,
    powerMaxKw: 500,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["gas"] as FuelId[],
    feature: "17–500 кВт",
    extra: `${checked} У модели MAX GAS 120 на своей странице 60–120 кВт. Остальные модели ряда в эту поставку не разложены.`,
    sizes: [],
    sizesNote: null,
    aliases: ["max gas"],
  },
];

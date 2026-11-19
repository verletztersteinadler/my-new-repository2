import type { Category, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Одна карточка Pamir 5000, артикул 230384, на frico.net. Остальные завесы не открывались.";

export const fricoCategories: Category[] = [{ id: "air", title: "Воздухонагреватели", param: "power" }];
export const fricoDocuments = [{ title: "Pamir 5000" }];
export const fricoSeries: Series[] = [
  {
    id: "frico-pamir",
    name: "Frico Pamir 5000",
    categoryId: "air",
    kind: "Электрическая завеса",
    image: "/catalog/web-air.jpg",
    summary: "У артикула 230384 тепло 24 / 15 / 7,8 кВт.",
    powerMinKw: 7.8,
    powerMaxKw: 24,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: [],
    feature: "Электрический, длина 2 м",
    extra: checked,
    sizes: [],
    sizesNote: "Три ступени одного изделия, не три модели.",
    aliases: ["pamir"],
  },
];

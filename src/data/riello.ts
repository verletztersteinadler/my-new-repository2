import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страница RIELLO 40 F. Это один ряд, не весь каталог Riello.";

export const rielloCategories: Category[] = [{ id: "auto", title: "Горелки", param: "none" }];
export const rielloDocuments = [{ title: "40 F" }];
export const rielloSeries: Series[] = [
  {
    id: "riello-40f",
    name: "Riello 40 F",
    categoryId: "auto",
    kind: "Одноступенчатая, лёгкое масло",
    image: "/catalog/cabinet.jpg",
    summary: "30–202 кВт, три модели.",
    powerMinKw: 30,
    powerMaxKw: 202,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["diesel"] as FuelId[],
    feature: "Три модели, имена внутри диапазона не разложены",
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: ["40 f"],
  },
];

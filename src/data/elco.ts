import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Каталог ELCO Industry 2017, ряд NEXTRON. Головки KN, KM и KL и версии EF3 не разложены отдельно.";

export const elcoCategories: Category[] = [{ id: "auto", title: "Горелки", param: "none" }];
export const elcoDocuments = [{ title: "NEXTRON, каталог 2017" }];
export const elcoSeries: Series[] = [
  {
    id: "elco-oil",
    name: "ELCO NEXTRON, лёгкое масло",
    categoryId: "auto",
    kind: "Моноблок",
    image: "/catalog/cabinet.jpg",
    summary: "Прочитанные блоки: 510–4 900 кВт и 1 350–10 620 кВт.",
    powerMinKw: 510,
    powerMaxKw: 10620,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["diesel"] as FuelId[],
    feature: "510–10 620 кВт",
    extra: checked,
    sizes: [],
    sizesNote: "N6.2400 … N9.10400 L-E. Верх последней строки 10 620 кВт.",
    aliases: ["nextron"],
  },
  {
    id: "elco-gas",
    name: "ELCO NEXTRON, газ",
    categoryId: "auto",
    kind: "Моноблок",
    image: "/catalog/cabinet.jpg",
    summary: "Прочитанные блоки: 340–4 200 кВт и 740–11 200 кВт.",
    powerMinKw: 340,
    powerMaxKw: 11200,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["gas"],
    feature: "340–11 200 кВт",
    extra: checked,
    sizes: [],
    sizesNote: "Верх N9.10400 G-E — 11 200 кВт.",
    aliases: [],
  },
];

import type { Category, FuelId, Series, Size } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Карточка PDF400 на nu-way.co.uk. Шапка ряда 3,3–18 МВт. Таблица этой страницы — только 8,5–10,5 МВт.";

const models = [8.5, 8.9, 9.3, 9.6, 9.9, 10.3, 10.5];

export const nuwayCategories: Category[] = [{ id: "auto", title: "Горелки", param: "none" }];
export const nuwayDocuments = [{ title: "PDF" }];
export const nuwaySeries: Series[] = [
  {
    id: "nuway-pdf",
    name: "Nu-Way PDF",
    categoryId: "auto",
    kind: "Дутьевая горелка",
    image: "/catalog/cabinet.jpg",
    summary: "Ряд 3,3–18 МВт. Прочитанные модели PDF400: 8,5–10,5 МВт.",
    powerMinKw: 3300,
    powerMaxKw: 18000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["gas", "diesel", "heavy"] as FuelId[],
    feature: "Газ, лёгкое масло, мазут или оба",
    extra: checked,
    sizes: models.map((mw): Size => ({ id: `nuway-pdf-${String(mw).replace(".", "")}`, name: `PDF400 ${mw} МВт`, powerKw: Math.round(mw * 1000), steamKgH: null })),
    sizesNote: "Модели между 3,3 и 8,5 МВт и выше 10,5 МВт на этой странице не разложены.",
    aliases: ["pdf"],
  },
];

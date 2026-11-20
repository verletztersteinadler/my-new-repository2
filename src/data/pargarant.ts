import type { Category, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Карточка ПГЭ-1000 на pargarant.ru. Диапазон 62–1 000 кг/ч дан на этой карточке.";

export const pargarantCategories: Category[] = [{ id: "steam", title: "Паровые", param: "steam" }];
export const pargarantDocuments = [{ title: "ПГЭ" }];
export const pargarantSeries: Series[] = [
  {
    id: "pargarant-pge",
    name: "Паргарант ПГЭ",
    categoryId: "steam",
    kind: "Электродный",
    image: "/catalog/vertical.jpg",
    summary: "62–1 000 кг/ч. Потребляемая мощность не более 47–750 кВт.",
    powerMinKw: 47,
    powerMaxKw: 750,
    steamMinKgH: 62,
    steamMaxKgH: 1000,
    tempMaxC: null,
    pressureNote: "1–6 кг/см², опционально 8, 10 или 16",
    fuels: [],
    feature: "Электродный",
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: ["пгэ"],
  },
];

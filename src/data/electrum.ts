import type { Category, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Шапка electrum-spb.ru. Это граница сайта, не таблица моделей.";

export const electrumCategories: Category[] = [{ id: "steam", title: "Паровые", param: "steam" }];
export const electrumDocuments = [{ title: "Электрум" }];
export const electrumSeries: Series[] = [
  {
    id: "electrum",
    name: "Электрум",
    categoryId: "steam",
    kind: "Электрический парогенератор",
    image: "/catalog/cabinet.jpg",
    summary: "30–3 000 кВт. Пар 54–5 400 кг/ч.",
    powerMinKw: 30,
    powerMaxKw: 3000,
    steamMinKgH: 54,
    steamMaxKgH: 5400,
    tempMaxC: null,
    pressureNote: null,
    fuels: [],
    feature: "Электрический",
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: [],
  },
];

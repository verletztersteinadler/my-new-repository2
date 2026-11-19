import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страница «О компании» sibstrong.com. План до 11 МВт в ряд не внесён.";

export const sibstrongCategories: Category[] = [{ id: "auto", title: "Горелки", param: "none" }];
export const sibstrongDocuments = [{ title: "СибСтронг" }];
export const sibstrongSeries: Series[] = [
  {
    id: "sibstrong",
    name: "СибСтронг",
    categoryId: "auto",
    kind: "Дутьевая блочная горелка",
    image: "/catalog/cabinet.jpg",
    summary: "50 кВт–6,0 МВт.",
    powerMinKw: 50,
    powerMaxKw: 6000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["gas", "diesel"] as FuelId[],
    feature: "Жидкое или газообразное топливо",
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: [],
  },
];

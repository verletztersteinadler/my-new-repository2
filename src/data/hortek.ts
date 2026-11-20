import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Главная hortek.com. Каскад до 6,6 МВт — несколько котлов и в ряд не внесён.";

export const hortekCategories: Category[] = [{ id: "water", title: "Водогрейные", param: "power" }];
export const hortekDocuments = [{ title: "HL" }];
export const hortekSeries: Series[] = [
  {
    id: "hortek-hl",
    name: "HORTEK HL",
    categoryId: "water",
    kind: "Напольный конденсационный",
    image: "/catalog/floor-cond.jpg",
    summary: "190–1 100 кВт, 12 моделей.",
    powerMinKw: 190,
    powerMaxKw: 1100,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["gas"] as FuelId[],
    feature: "Премикс, сталь AISI 441",
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: ["hl"],
  },
];

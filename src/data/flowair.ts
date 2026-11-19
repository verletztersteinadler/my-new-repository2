import type { Category, Series, Size } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страница LEO на flowair.com. В размер взят верх диапазона мощности.";

const leo: [string, number][] = [
  ["LEO S2", 26.5],
  ["LEO S3", 32.7],
  ["LEO L2", 50.4],
  ["LEO L3", 65.2],
  ["LEO XL2", 94],
  ["LEO XL3", 121],
];

export const flowairCategories: Category[] = [{ id: "air", title: "Воздухонагреватели", param: "power" }];
export const flowairDocuments = [{ title: "LEO" }];
export const flowairSeries: Series[] = [
  {
    id: "flowair-leo",
    name: "FLOWAIR LEO",
    categoryId: "air",
    kind: "Водяной тепловентилятор",
    image: "/catalog/web-air.jpg",
    summary: "По таблице 1,7–121 кВт.",
    powerMinKw: 1.7,
    powerMaxKw: 121,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: [],
    feature: "Вода, не горелка",
    extra: `${checked} Шапка страницы пишет 0,7–121 кВт, таблица начинается с 1,7. В карточке таблица. LEO HD до 38,4 кВт в этот ряд не смешан.`,
    sizes: leo.map(([name, powerKw]): Size => ({ id: `flowair-${name.toLowerCase().replace(/\s+/g, "-")}`, name, powerKw, steamKgH: null })),
    sizesNote: null,
    aliases: ["leo"],
  },
];

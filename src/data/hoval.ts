import type { Category, FuelId, Series, Size } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Лист UltraGas 2, модели 1000–1550. Мощность — номинал при 50/30 °C на природном газе. Заголовок брошюры 125–1550, меньшие модели в это извлечение не попали.";

const rows: [string, number][] = [
  ["UltraGas 2 (1000)", 999],
  ["UltraGas 2 (1100)", 1112],
  ["UltraGas 2 (1300)", 1320],
  ["UltraGas 2 (1550)", 1550],
];

export const hovalCategories: Category[] = [{ id: "water", title: "Водогрейные", param: "power" }];
export const hovalDocuments = [{ title: "UltraGas 2" }];
export const hovalSeries: Series[] = [
  {
    id: "hoval-ug2",
    name: "Hoval UltraGas 2",
    categoryId: "water",
    kind: "Конденсационный, газ",
    image: "/catalog/floor-cond.jpg",
    summary: "Прочитанные модели: 999–1 550 кВт при 50/30 °C. Давление 1–6 бар, до 95 °C.",
    powerMinKw: 999,
    powerMaxKw: 1550,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: 95,
    pressureNote: "1–6 бар",
    fuels: ["gas"] as FuelId[],
    feature: "Природный газ. Пропан в той же таблице ниже",
    extra: checked,
    sizes: rows.map(([name, powerKw]): Size => ({ id: `hoval-${powerKw}`, name, powerKw, steamKgH: null })),
    sizesNote: null,
    aliases: ["ultragas"],
  },
];

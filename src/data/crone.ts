import type { Category, Series, Size } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Лист конденсатора Excellent на fhcrone.nl. Это не котёл: колонка boiler capacity — котёл, к которому его ставят.";

const rows: [string, number, number][] = [
  ["6C", 600, 62], ["12C", 1200, 117], ["18C", 1800, 241], ["24C", 2400, 258], ["30C", 3000, 293],
  ["36C", 3600, 361], ["42C", 4200, 413], ["48C", 4800, 491], ["60C", 6000, 585], ["72C", 7200, 663],
  ["84C", 8400, 757], ["96C", 9600, 843], ["108C", 10800, 1033], ["120C", 12000, 1076], ["140C", 14000, 1162],
];

export const croneCategories: Category[] = [{ id: "water", title: "Водогрейные", param: "power" }];
export const croneDocuments = [{ title: "Excellent" }];
export const croneSeries: Series[] = [
  {
    id: "crone-ex",
    name: "F&H Crone Excellent",
    categoryId: "water",
    kind: "Конденсатор дымовых газов",
    image: "/catalog/skid.jpg",
    summary: "Мощность конденсатора 62–1 162 кВт. Котёл рядом в листе — 600–14 000 кВт.",
    powerMinKw: 62,
    powerMaxKw: 1162,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: 95,
    pressureNote: "3 бар, вода",
    fuels: [],
    feature: "До 95 °C",
    extra: `${checked} Таблица предохранительных клапанов в инструкции — расчёт прохода, не ряд котлов, и не перенесена.`,
    sizes: rows.map(([name, , condenser]): Size => ({ id: `crone-${name.toLowerCase()}`, name, powerKw: condenser, steamKgH: null })),
    sizesNote: "В размере мощность конденсатора, не котла.",
    aliases: ["excellent"],
  },
];

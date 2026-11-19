import type { Category, FuelId, Series, Size } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страница технологий bwe.dk. Ещё два списка мощностей на странице есть, их заголовки в извлечение не попали и не скопированы.";

function mw(values: number[]): Size[] {
  return values.map((mw) => ({ id: `bwe-${mw}`, name: `${mw} МВт тепл.`, powerKw: mw * 1000, steamKgH: null }));
}

export const bweCategories: Category[] = [{ id: "block", title: "Котловые блоки", param: "power" }];

export const bweDocuments = [{ title: "Трёхходовой котёл BWE, солома" }];

export const bweSeries: Series[] = [
  {
    id: "bwe-straw",
    name: "BWE, солома, без промперегрева",
    categoryId: "block",
    kind: "Три хода, водоохлаждаемая виброрешётка",
    image: "/catalog/solid.jpg",
    summary: "30, 60, 90, 120 и 150 МВт тепл. Пар 110 бар абс., 540 °C.",
    powerMinKw: 30000,
    powerMaxKw: 150000,
    powerNote: "30–150 МВт тепл.",
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: 540,
    pressureNote: "110 бар абс.",
    fuels: ["solid"] as FuelId[],
    feature: "Солома и другие щелочные остатки",
    extra: checked,
    sizes: mw([30, 60, 90, 120, 150]),
    sizesNote: "Это ступени МВт тепл., не список станций.",
    aliases: ["straw"],
  },
  {
    id: "bwe-straw-rh",
    name: "BWE, солома, с промперегревом",
    categoryId: "block",
    kind: "Три хода, промперегрев",
    image: "/catalog/solid.jpg",
    summary: "120 и 150 МВт тепл. Пар 140 бар абс., 540 °C и 540 °C.",
    powerMinKw: 120000,
    powerMaxKw: 150000,
    powerNote: "120 и 150 МВт тепл.",
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: 540,
    pressureNote: "140 бар абс.",
    fuels: ["solid"],
    feature: "Промперегрев",
    extra: checked,
    sizes: mw([120, 150]).map((item) => ({ ...item, id: item.id + "-rh" })),
    sizesNote: null,
    aliases: [],
  },
];

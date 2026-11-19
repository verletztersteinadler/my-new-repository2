import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страница котлов ORC justsen.dk. Остальной каталог на этой странице не разобран.";

export const justsenCategories: Category[] = [
  { id: "oil", title: "Термомасляные", param: "power" },
  { id: "water", title: "Водогрейные", param: "power" },
];
export const justsenDocuments = [{ title: "ORC Justsen" }];
export const justsenSeries: Series[] = [
  {
    id: "justsen-oil",
    name: "Justsen, термомасло для ORC",
    categoryId: "oil",
    kind: "Древесная биомасса",
    image: "/catalog/solid.jpg",
    summary: "5–10 МВт. 220–285 °C, до 8 бар.",
    powerMinKw: 5000,
    powerMaxKw: 10000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: 285,
    pressureNote: "до 8 бар",
    fuels: ["solid"] as FuelId[],
    feature: "Древесная биомасса",
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: [],
  },
  {
    id: "justsen-hw",
    name: "Justsen, высокотемпературная вода для ORC",
    categoryId: "water",
    kind: "Биомасса",
    image: "/catalog/solid.jpg",
    summary: "2–20 МВт. 140–190 °C.",
    powerMinKw: 2000,
    powerMaxKw: 20000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: 190,
    pressureNote: "6 / 10 / 12 / 16 / 19,5 / 21 бар",
    fuels: ["solid"],
    feature: "Любая биомасса по странице",
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: [],
  },
];

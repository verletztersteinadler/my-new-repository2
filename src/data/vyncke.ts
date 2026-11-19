import type { Category, CategoryId, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страница диапазонов vyncke.com. Мегаватты тепловые. Электрические мегаватты рядом в мощность не записаны.";

const rows: [string, string, number, number, CategoryId][] = [
  ["vyn-lss-st", "VYNCKE LSS-ST", 1, 10, "steam"],
  ["vyn-lss-hw", "VYNCKE LSS-HW", 1, 10, "water"],
  ["vyn-cnsc", "VYNCKE CNS-C", 3, 20, "steam"],
  ["vyn-hg", "VYNCKE CNS-C-HG", 3, 20, "air"],
  ["vyn-cns", "VYNCKE CNS", 7, 20, "steam"],
  ["vyn-tfh1", "VYNCKE TFH-I", 2, 5, "water"],
  ["vyn-tfh2", "VYNCKE TFH-II", 3, 40, "oil"],
  ["vyn-hgg", "VYNCKE HGG-I", 10, 100, "air"],
  ["vyn-jno", "VYNCKE JNO", 3, 25, "steam"],
  ["vyn-jnos", "VYNCKE JNO-SH", 3, 25, "steam"],
  ["vyn-jnor", "VYNCKE JNO-R", 3, 25, "steam"],
  ["vyn-jnors", "VYNCKE JNO-R-SH", 3, 25, "steam"],
  ["vyn-acc", "VYNCKE ACC", 5, 20, "steam"],
  ["vyn-wtbv", "VYNCKE WTB-V", 10, 100, "steam"],
  ["vyn-wtbh", "VYNCKE WTB-H", 10, 100, "steam"],
  ["vyn-m1", "VYNCKE MMD-I", 25, 100, "steam"],
  ["vyn-m2", "VYNCKE MMD-II", 25, 100, "steam"],
  ["vyn-m3", "VYNCKE MMD-III", 25, 100, "steam"],
  ["vyn-m4", "VYNCKE MMD-IV", 25, 100, "steam"],
];

export const vynckeCategories: Category[] = [
  { id: "steam", title: "Паровые", param: "steam" },
  { id: "water", title: "Водогрейные", param: "power" },
  { id: "oil", title: "Термомасляные", param: "power" },
  { id: "air", title: "Воздухонагреватели", param: "power" },
];
export const vynckeDocuments = [{ title: "Диапазоны VYNCKE" }];
export const vynckeSeries: Series[] = rows.map(([id, name, min, max, categoryId]) => ({
  id,
  name,
  categoryId,
  kind: "Биомасса",
  image: categoryId === "oil" ? "/catalog/reverse.jpg" : "/catalog/solid.jpg",
  summary: `${min}–${max} МВт тепловых.`,
  powerMinKw: min * 1000,
  powerMaxKw: max * 1000,
  steamMinKgH: null,
  steamMaxKgH: null,
  tempMaxC: null,
  pressureNote: null,
  fuels: ["solid"] as FuelId[],
  feature: `${min}–${max} МВт`,
  extra: `${checked} Среда взята из ближайшего заголовка группы.`,
  sizes: [],
  sizesNote: null,
  aliases: [],
}));

import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Главная komkont.com. Заголовок «0,2–50 МВт» моделями не разложен и в верх рядов не записан.";

function water(id: string, name: string, min: number, max: number, feature: string): Series {
  return {
    id,
    name,
    categoryId: "water",
    kind: feature,
    image: "/catalog/solid.jpg",
    summary: `${min}–${max} МВт.`,
    powerMinKw: min * 1000,
    powerMaxKw: max * 1000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["solid"] as FuelId[],
    feature,
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: [],
  };
}

export const komkontCategories: Category[] = [
  { id: "water", title: "Водогрейные", param: "power" },
  { id: "air", title: "Воздухонагреватели", param: "power" },
  { id: "steam", title: "Паровые", param: "steam" },
];
export const komkontDocuments = [{ title: "KOMKONT" }];
export const komkontSeries: Series[] = [
  water("kom-bio", "KOMKONT, котельные на биомассе", 0.1, 12, "Граница котельной, не одного котла"),
  water("kom-pel", "KOMKONT, пеллеты", 0.2, 10, "Пеллеты"),
  water("kom-3", "KOMKONT, трёхходовые", 0.2, 12, "КПД 91% без экономайзера"),
  water("kom-sn", "KOMKONT СН Compact 2", 1.5, 12, "Жаротрубный, вода"),
  {
    id: "kom-air",
    name: "KOMKONT, теплогенераторы",
    categoryId: "air",
    kind: "Теплогенератор",
    image: "/catalog/web-air.jpg",
    summary: "1–12 МВт.",
    powerMinKw: 1000,
    powerMaxKw: 12000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["solid"],
    feature: "КПД 95%",
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: [],
  },
  {
    id: "kom-at",
    name: "KOMKONT AT",
    categoryId: "steam",
    kind: "Пар",
    image: "/catalog/solid.jpg",
    summary: "1–16 т/ч. До 22 бар.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: 1000,
    steamMaxKgH: 16000,
    tempMaxC: null,
    pressureNote: "до 22 бар",
    fuels: ["solid"],
    feature: "Древесина, биомасса и твёрдое топливо, влажность 8–60%",
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: [],
  },
];

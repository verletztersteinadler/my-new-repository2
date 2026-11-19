import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страница больших котлов heiztechnik.pl. 80 кВт–7 МВт — граница всей линейки, не одной серии.";

export const heiztechnikCategories: Category[] = [{ id: "water", title: "Водогрейные", param: "power" }];
export const heiztechnikDocuments = [{ title: "Большие котлы Heiztechnik" }];
export const heiztechnikSeries: Series[] = [
  {
    id: "ht-big",
    name: "Heiztechnik, большая мощность",
    categoryId: "water",
    kind: "Биомасса",
    image: "/catalog/solid.jpg",
    summary: "80 кВт – 7 МВт на всю промышленную линейку.",
    powerMinKw: 80,
    powerMaxKw: 7000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["solid"] as FuelId[],
    feature: "MAXPell, MAXPell GL / EVO, HT MegaBio",
    extra: `${checked} Щепа, пеллета, солома и уголь. Свой киловаттный ряд у каждого имени страница не даёт.`,
    sizes: [],
    sizesNote: null,
    aliases: ["maxpell"],
  },
];

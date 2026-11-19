import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страница C340/C640 на dedietrich-heating.com. Каскад «и больше» без цифры не записан.";

export const dedietrichCategories: Category[] = [{ id: "water", title: "Водогрейные", param: "power" }];
export const dedietrichDocuments = [{ title: "C340 и C640" }];
export const dedietrichSeries: Series[] = [
  {
    id: "dd-c340",
    name: "De Dietrich C340 / C640",
    categoryId: "water",
    kind: "Конденсационный, газ, алюминий-кремний",
    image: "/catalog/floor-cond.jpg",
    summary: "51–1 303 кВт по странице ряда. У одного C340 номинал 80/60 °C — 261–601 кВт.",
    powerMinKw: 51,
    powerMaxKw: 1303,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["gas"] as FuelId[],
    feature: "Природный газ",
    extra: checked,
    sizes: [],
    sizesNote: "C640 отдельной верхней границей страница не выделяет.",
    aliases: ["c340", "c640"],
  },
];

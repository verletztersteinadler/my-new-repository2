import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Главная istal.uz. Пар назван, его производительность нет.";

export const istalCategories: Category[] = [{ id: "water", title: "Водогрейные", param: "power" }];
export const istalDocuments = [{ title: "Водогрейные ISTAL" }];
export const istalSeries: Series[] = [
  {
    id: "istal-w",
    name: "ISTAL, водогрейные",
    categoryId: "water",
    kind: "Промышленный",
    image: "/catalog/firetube.jpg",
    summary: "0,1–4,0 МВт.",
    powerMinKw: 100,
    powerMaxKw: 4000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["gas", "diesel", "solid"] as FuelId[],
    feature: "Газ, жидкое и твёрдое топливо названы для продукции завода в целом",
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: [],
  },
];

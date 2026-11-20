import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Главная kosgeyser.ru.";

export const geyzerCategories: Category[] = [{ id: "water", title: "Водогрейные", param: "power" }];
export const geyzerDocuments = [{ title: "Гейзер" }];
export const geyzerSeries: Series[] = [
  {
    id: "geyzer-ft",
    name: "Гейзер, жаротрубные",
    categoryId: "water",
    kind: "Жаротрубный",
    image: "/catalog/firetube.jpg",
    summary: "0,25–6 МВт.",
    powerMinKw: 250,
    powerMaxKw: 6000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: [] as FuelId[],
    feature: "Топливо на этой карточке не названо",
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: [],
  },
  {
    id: "geyzer-pyr",
    name: "Гейзер, пиролизные",
    categoryId: "water",
    kind: "Пиролиз",
    image: "/catalog/solid.jpg",
    summary: "0,1–1 МВт.",
    powerMinKw: 100,
    powerMaxKw: 1000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["solid"],
    feature: "Твёрдое топливо",
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: [],
  },
];

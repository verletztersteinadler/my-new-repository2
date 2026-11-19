import type { Category, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Главная remming.co.rs. «Выше по запросу» потолком не взято.";

export const remmingCategories: Category[] = [
  { id: "steam", title: "Паровые", param: "steam" },
  { id: "water", title: "Водогрейные", param: "power" },
];
export const remmingDocuments = [{ title: "ERK Remming" }];
export const remmingSeries: Series[] = [
  {
    id: "remming-erk",
    name: "Remming ERK, пар",
    categoryId: "steam",
    kind: "Водотрубный, под заказ",
    image: "/catalog/waterpipe.jpg",
    summary: "0,4–290 т/ч. 0,8–14,1 МПа, до 540 °C.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: 400,
    steamMaxKgH: 290000,
    tempMaxC: 540,
    pressureNote: "0,8–14,1 МПа",
    fuels: [],
    feature: "Топливо страница не фиксирует одним списком",
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: ["erk"],
  },
  {
    id: "remming-w",
    name: "Remming, горячая вода",
    categoryId: "water",
    kind: "Водотрубный",
    image: "/catalog/waterpipe.jpg",
    summary: "До 175 МВт.",
    powerMinKw: null,
    powerMaxKw: 175000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: [],
    feature: "до 175 МВт",
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: [],
  },
];

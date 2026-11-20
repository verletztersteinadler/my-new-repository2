import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Главная uralkotel.ru. Низ промышленных котлов не назван. 0,2–16 МВт — модульные котельные.";

export const uralkotelCategories: Category[] = [{ id: "water", title: "Водогрейные", param: "power" }];
export const uralkotelDocuments = [{ title: "Уралкотел" }];
export const uralkotelSeries: Series[] = [
  {
    id: "uralkotel-ind",
    name: "Уралкотел, промышленные",
    categoryId: "water",
    kind: "Твёрдое топливо",
    image: "/catalog/solid.jpg",
    summary: "До 3,0 МВт.",
    powerMinKw: null,
    powerMaxKw: 3000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["solid"] as FuelId[],
    feature: "Твёрдое топливо",
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: [],
  },
  {
    id: "uralkotel-mod",
    name: "Уралкотел, модульные котельные",
    categoryId: "water",
    kind: "Модуль",
    image: "/catalog/skid.jpg",
    summary: "0,2–16,0 МВт.",
    powerMinKw: 200,
    powerMaxKw: 16000,
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

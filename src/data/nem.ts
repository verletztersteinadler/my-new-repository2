import type { Category, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страница HRSG nem-energy.com. Мегаватты относятся к газовой турбине, не к пару котла.";

export const nemCategories: Category[] = [{ id: "steam", title: "Паровые", param: "steam" }];
export const nemDocuments = [{ title: "HRSG NEM" }];
export const nemSeries: Series[] = [
  {
    id: "nem-mod",
    name: "NEM, модульный HRSG",
    categoryId: "steam",
    kind: "Котёл-утилизатор",
    image: "/catalog/skid.jpg",
    summary: "Для газовых турбин до 100 МВт. Пар не назван.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: [],
    feature: "Турбина до 100 МВт",
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: [],
  },
  {
    id: "nem-large",
    name: "NEM, большой HRSG",
    categoryId: "steam",
    kind: "Горизонтальный или вертикальный",
    image: "/catalog/waterpipe.jpg",
    summary: "Турбины от 10 МВт. Верх страница не ограничивает.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: [],
    feature: "От 10 МВт у турбины",
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: ["drumplus"],
  },
];

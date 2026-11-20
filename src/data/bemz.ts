import type { Category, FuelId, Series, Size } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Карточки bemz.pro. Это два прочитанных котла, не весь каталог.";

export const bemzCategories: Category[] = [
  { id: "water", title: "Водогрейные", param: "power" },
  { id: "steam", title: "Паровые", param: "steam" },
];
export const bemzDocuments = [{ title: "КВ-ГМ и КЕ" }];
export const bemzSeries: Series[] = [
  {
    id: "bemz-kvgm",
    name: "Барнаулэнергомаш КВ-ГМ-100-150",
    categoryId: "water",
    kind: "Водогрейный",
    image: "/catalog/waterpipe.jpg",
    summary: "116,3 МВт. 2,5 МПа, график 70–150 °C.",
    powerMinKw: 116300,
    powerMaxKw: 116300,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: 150,
    pressureNote: "2,5 МПа",
    fuels: ["gas", "heavy"] as FuelId[],
    feature: "Газ или жидкое топливо",
    extra: checked,
    sizes: [{ id: "bemz-116", name: "КВ-ГМ-100-150", powerKw: 116300, steamKgH: null }] as Size[],
    sizesNote: null,
    aliases: ["кв-гм"],
  },
  {
    id: "bemz-ke",
    name: "Барнаулэнергомаш КЕ-25-14С",
    categoryId: "steam",
    kind: "Водотрубный",
    image: "/catalog/solid.jpg",
    summary: "25 т/ч. 1,3 МПа, насыщенный пар 194 °C.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: 25000,
    steamMaxKgH: 25000,
    tempMaxC: 194,
    pressureNote: "1,3 МПа",
    fuels: ["solid"] as FuelId[],
    feature: "Каменный или бурый уголь",
    extra: checked,
    sizes: [{ id: "bemz-ke25", name: "КЕ-25-14С", powerKw: null, steamKgH: 25000 }],
    sizesNote: null,
    aliases: ["ке-25"],
  },
];

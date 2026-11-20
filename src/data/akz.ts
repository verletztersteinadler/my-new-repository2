import type { Category, FuelId, Series, Size } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Карточка КВр-1,45 на akz22.ru. Остальной каталог на этой странице не разобран.";

export const akzCategories: Category[] = [{ id: "water", title: "Водогрейные", param: "power" }];
export const akzDocuments = [{ title: "КВр-1,45" }];
export const akzSeries: Series[] = [
  {
    id: "akz-kvr",
    name: "АКЗ КВр-1,45",
    categoryId: "water",
    kind: "Уголь, колосниковая топка",
    image: "/catalog/solid.jpg",
    summary: "1,45 МВт. Вода 70/116 °C, давление 3–6 кгс/см².",
    powerMinKw: 1450,
    powerMaxKw: 1450,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: 116,
    pressureNote: "3–6 кгс/см², максимум 0,6 МПа",
    fuels: ["solid"] as FuelId[],
    feature: "Уголь",
    extra: checked,
    sizes: [{ id: "akz-145", name: "КВр-1,45", powerKw: 1450, steamKgH: null }],
    sizesNote: null,
    aliases: [],
  },
];

import type { Category, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страница электрических котельных nvsk.net. Звёздочка: максимум может быть изменён. Это котельная, не один котёл.";

export const nevskyCategories: Category[] = [{ id: "water", title: "Водогрейные", param: "power" }];
export const nevskyDocuments = [{ title: "Котельные Невский" }];
export const nevskySeries: Series[] = [
  {
    id: "nevsky",
    name: "Невский, электрическая котельная",
    categoryId: "water",
    kind: "Блок заводской сборки",
    image: "/catalog/skid.jpg",
    summary: "До 3 000 кВт.",
    powerMinKw: null,
    powerMaxKw: 3000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: [],
    feature: "Электрическая",
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: [],
  },
];

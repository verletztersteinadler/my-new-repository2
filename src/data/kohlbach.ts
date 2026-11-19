import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Главная onekohlbach.com. 400–18 000 кВт — общая граница воды, пара и когенерации. Объекты в ряд не внесены.";

export const kohlbachCategories: Category[] = [{ id: "water", title: "Водогрейные", param: "power" }];
export const kohlbachDocuments = [{ title: "Граница Kohlbach" }];
export const kohlbachSeries: Series[] = [
  {
    id: "kohlbach",
    name: "Kohlbach, биомасса",
    categoryId: "water",
    kind: "Вода, пар или когенерация",
    image: "/catalog/solid.jpg",
    summary: "400–18 000 кВт на всю линейку.",
    powerMinKw: 400,
    powerMaxKw: 18000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["solid"] as FuelId[],
    feature: "Отходы древесины и биогенные остатки",
    extra: checked,
    sizes: [],
    sizesNote: "Пар в килограммах страница не отделяет.",
    aliases: [],
  },
];

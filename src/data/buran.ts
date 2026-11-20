import type { Category, FuelId, Series, Size } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Карточка BB-2035 RD на buran.kz. Это один котёл, не весь каталог. 200 000 ккал/ч на странице совпадают с 233 кВт.";

export const buranCategories: Category[] = [{ id: "water", title: "Водогрейные", param: "power" }];
export const buranDocuments = [{ title: "BB-2035 RD" }];
export const buranSeries: Series[] = [
  {
    id: "buran-2035",
    name: "Buran BB-2035 RD",
    categoryId: "water",
    kind: "Вертикальный, жидкое топливо",
    image: "/catalog/vertical.jpg",
    summary: "233 кВт. До 85 °C и 3,5 бар.",
    powerMinKw: 233,
    powerMaxKw: 233,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: 85,
    pressureNote: "3,5 бар",
    fuels: ["diesel"] as FuelId[],
    feature: "Дизель",
    extra: checked,
    sizes: [{ id: "buran-2035", name: "BB-2035 RD", powerKw: 233, steamKgH: null }],
    sizesNote: null,
    aliases: [],
  },
];

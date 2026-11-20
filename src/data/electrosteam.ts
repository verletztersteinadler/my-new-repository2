import type { Category, Series, Size } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Сравнение LB 40–60 на electrosteam.com. Это один блок, не весь каталог.";

const rows: [string, number, number][] = [
  ["LB 40", 40, 62.6],
  ["LB 50", 50, 78.24],
  ["LB 60", 60, 93.89],
];

export const electrosteamCategories: Category[] = [{ id: "steam", title: "Паровые", param: "steam" }];
export const electrosteamDocuments = [{ title: "LB 40–60" }];
export const electrosteamSeries: Series[] = [
  {
    id: "electro-lb",
    name: "Electro-Steam LB",
    categoryId: "steam",
    kind: "Электрический",
    image: "/catalog/cabinet.jpg",
    summary: "40, 50 и 60 кВт. Пар 62,6–93,89 кг/ч.",
    powerMinKw: 40,
    powerMaxKw: 60,
    steamMinKgH: 63,
    steamMaxKgH: 94,
    tempMaxC: null,
    pressureNote: null,
    fuels: [],
    feature: "Высокое и низкое давление на одной мощности",
    extra: `${checked} Килограммы на странице: 62,6, 78,24 и 93,89. В размер округление до целого.`,
    sizes: rows.map(([name, powerKw, steam]): Size => ({ id: `electro-${name.toLowerCase().replace(/\s+/g, "-")}`, name, powerKw, steamKgH: Math.round(steam) })),
    sizesNote: null,
    aliases: ["lb"],
  },
];

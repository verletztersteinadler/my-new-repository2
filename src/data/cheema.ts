import type { Category, FuelId, Series, Size } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страницы Steam MAX и INPAC на cheemaboilers.com. Давление объектов INPAC к серии не приписано.";

const solid: FuelId[] = ["solid"];

export const cheemaCategories: Category[] = [{ id: "steam", title: "Паровые", param: "steam" }];

export const cheemaDocuments = [{ title: "Steam MAX и INPAC" }];

export const cheemaSeries: Series[] = [
  {
    id: "cheema-max",
    name: "CBL Steam MAX",
    categoryId: "steam",
    kind: "Компактный, твёрдое топливо",
    image: "/catalog/solid.jpg",
    summary: "Пять ступеней: 300, 500, 750, 1 000 и 1 500 кг/ч. До 10,54 кг/см².",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: 300,
    steamMaxKgH: 1500,
    tempMaxC: null,
    pressureNote: "до 10,54 кг/см²",
    fuels: solid,
    feature: "Уголь, дрова, брикеты",
    extra: checked,
    sizes: [300, 500, 750, 1000, 1500].map(
      (kg): Size => ({ id: `cheema-max-${kg}`, name: `Steam MAX ${kg}`, powerKw: null, steamKgH: kg }),
    ),
    sizesNote: null,
    aliases: ["steam max"],
  },
  {
    id: "cheema-inpac",
    name: "CBL INPAC",
    categoryId: "steam",
    kind: "Три хода",
    image: "/catalog/firetube.jpg",
    summary: "600 кг/ч – 5 т/ч.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: 600,
    steamMaxKgH: 5000,
    tempMaxC: null,
    pressureNote: null,
    fuels: solid,
    feature: "Дрова, уголь, агроотходы, брикеты",
    extra: checked,
    sizes: [],
    sizesNote: "Ступени внутри 600 кг/ч – 5 т/ч не названы.",
    aliases: ["inpac"],
  },
];

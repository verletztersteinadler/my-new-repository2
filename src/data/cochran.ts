import type { Category, FuelId, Series, Size } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Лист EB88 и страница ST25 на cochran.co.uk. Пар при питательной воде 100 °C.";

const eb: [string, number, number][] = [
  ["E18", 18, 29],
  ["E24", 24, 38],
  ["E36", 36, 57],
  ["E48", 48, 77],
  ["E54", 54, 86],
  ["E72", 72, 115],
  ["E100", 100, 153],
];

export const cochranCategories: Category[] = [{ id: "steam", title: "Паровые", param: "steam" }];
export const cochranDocuments = [{ title: "EB88 и ST25" }];

export const cochranSeries: Series[] = [
  {
    id: "cochran-eb88",
    name: "Cochran EB88",
    categoryId: "steam",
    kind: "Электрический, семь моделей",
    image: "/catalog/cabinet.jpg",
    summary: "29–153 кг/ч, 18–100 кВт, 10,34 бар.",
    powerMinKw: 18,
    powerMaxKw: 100,
    steamMinKgH: 29,
    steamMaxKgH: 153,
    tempMaxC: null,
    pressureNote: "10,34 бар",
    fuels: [] as FuelId[],
    feature: "Электрический",
    extra: checked,
    sizes: eb.map(([name, powerKw, steamKgH]): Size => ({ id: `cochran-${name.toLowerCase()}`, name, powerKw, steamKgH })),
    sizesNote: null,
    aliases: ["eb88"],
  },
  {
    id: "cochran-st25",
    name: "Cochran ST25",
    categoryId: "steam",
    kind: "Пакетный паровой",
    image: "/catalog/steam.jpg",
    summary: "500–6 500 кг/ч.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: 500,
    steamMaxKgH: 6500,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["gas", "diesel", "heavy"],
    feature: "Масло, газ или оба",
    extra: `${checked} Для Великобритании и ЕС страница ограничивает применение испарением ниже 1 400 кг/ч.`,
    sizes: [],
    sizesNote: null,
    aliases: ["st25"],
  },
];

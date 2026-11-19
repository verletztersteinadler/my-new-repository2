import type { Category, Series, Size } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Таблица ТЭНовых парогенераторов denkar.ru. Пар 130–160 °C.";

const rows: [string, number, number][] = [
  ["ПАР-15Т", 12, 15],
  ["ПАР-30Т", 24, 30],
  ["ПАР-50Т", 35, 50],
  ["ПАР-100Т", 75, 100],
  ["ПАР-150Т", 110, 150],
  ["ПАР-200Т", 150, 200],
  ["ПАР-250Т", 185, 250],
  ["ПАР-300Т", 220, 300],
  ["ПАР-400Т", 300, 400],
  ["ПАР-500Т", 370, 500],
];

export const denkarCategories: Category[] = [{ id: "steam", title: "Паровые", param: "steam" }];
export const denkarDocuments = [{ title: "ПАР-Т" }];
export const denkarSeries: Series[] = [
  {
    id: "denkar-par",
    name: "ДЭНКАР ПАР-Т",
    categoryId: "steam",
    kind: "Электрический, ТЭН",
    image: "/catalog/cabinet.jpg",
    summary: "15–500 кг/ч. Потребляемая мощность 12–370 кВт.",
    powerMinKw: 12,
    powerMaxKw: 370,
    steamMinKgH: 15,
    steamMaxKgH: 500,
    tempMaxC: 160,
    pressureNote: "0,35–0,55 МПа",
    fuels: [],
    feature: "Электрический",
    extra: checked,
    sizes: rows.map(([name, powerKw, steamKgH]): Size => ({ id: `denkar-${name}`, name, powerKw, steamKgH })),
    sizesNote: null,
    aliases: ["пар"],
  },
];

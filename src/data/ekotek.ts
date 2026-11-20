import type { Category, FuelId, Series, Size } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Листы Hybrid и Mega Volt на ekotekkazan.com.";

const hybrid: [string, number][] = [
  ["Hybrid SS 500", 580], ["Hybrid SS 600", 700], ["Hybrid SS 700", 800], ["Hybrid SS 800", 900],
  ["Hybrid SS 900", 1000], ["Hybrid SS 1000", 1100], ["Hybrid SS 1250", 1500], ["Hybrid SS 1500", 1750],
  ["Hybrid SS 2000", 2300], ["Hybrid SS 2500", 2900], ["Hybrid SS 3000", 3400], ["Hybrid SS 3500", 4000],
  ["Hybrid SS 4000", 4500], ["Hybrid SS 5000", 5900], ["Hybrid SS 6000", 7000], ["Hybrid SS 8000", 9300],
  ["Hybrid SS 10000", 11600],
];

const volt = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 600, 700, 800, 900, 1000, 1250, 1500, 1750];

export const ekotekCategories: Category[] = [
  { id: "water", title: "Водогрейные", param: "power" },
  { id: "steam", title: "Паровые", param: "steam" },
];
export const ekotekDocuments = [{ title: "Hybrid и Mega Volt" }];
export const ekotekSeries: Series[] = [
  {
    id: "ekotek-hybrid",
    name: "Ekotek Hybrid SS",
    categoryId: "water",
    kind: "Пять ходов, твёрдое топливо",
    image: "/catalog/solid.jpg",
    summary: "580–11 600 кВт по колонке листа.",
    powerMinKw: 580,
    powerMaxKw: 11600,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["solid"] as FuelId[],
    feature: "Уголь, пеллета, оливковые отходы, щепа",
    extra: checked,
    sizes: hybrid.map(([name, powerKw]): Size => ({ id: `ekotek-${name.toLowerCase().replace(/\s+/g, "-")}`, name, powerKw, steamKgH: null })),
    sizesNote: "Имя модели не равно киловаттам.",
    aliases: ["hybrid"],
  },
  {
    id: "ekotek-volt",
    name: "Ekotek Mega Volt",
    categoryId: "steam",
    kind: "Электрический, вертикальный",
    image: "/catalog/vertical.jpg",
    summary: "Именные модели H: 50–1 750 кг/ч. Тот же лист пишет H/HX до 28 000 кг/ч.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: 50,
    steamMaxKgH: 28000,
    tempMaxC: null,
    pressureNote: "1–60 бар у блока до 1 750 кг/ч",
    fuels: [],
    feature: "Электрический",
    extra: `${checked} Имена HX после 1 750 кг/ч в извлечении оборваны и в размеры не внесены. Верх 28 000 кг/ч взят из шапки того же листа.`,
    sizes: volt.map((kg): Size => ({ id: `ekotek-mv-${kg}`, name: `Mega Volt ${kg}`, powerKw: null, steamKgH: kg })),
    sizesNote: "Давление 1–60 бар на странице относится к блоку 50–1 750 кг/ч.",
    aliases: ["mega volt"],
  },
];

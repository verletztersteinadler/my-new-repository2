import type { Category, Series, Size } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страница EDI на jumag.com. Пар при питательной воде 15 °C. Киловатты после EDI 80 в таблице оборваны.";

const rows: [string, number | null, number][] = [
  ["EDI 20", 20, 26.5],
  ["EDI 40", 40, 53],
  ["EDI 60", 60, 80],
  ["EDI 80", 80, 106],
  ["EDI 100", null, 132.5],
  ["EDI 120", null, 160],
  ["EDI 360", null, 480],
  ["EDI 960", null, 1280],
];

export const jumagCategories: Category[] = [{ id: "steam", title: "Паровые", param: "steam" }];
export const jumagDocuments = [{ title: "EDI" }];
export const jumagSeries: Series[] = [
  {
    id: "jumag-edi",
    name: "JUMAG EDI",
    categoryId: "steam",
    kind: "Электрический",
    image: "/catalog/cabinet.jpg",
    summary: "20–960 кВт по шапке. Пар 26,5–1 280 кг/ч.",
    powerMinKw: 20,
    powerMaxKw: 960,
    steamMinKgH: 27,
    steamMaxKgH: 1280,
    tempMaxC: null,
    pressureNote: null,
    fuels: [],
    feature: "Электрический",
    extra: `${checked} Несколько котлов вместе страница считает отдельно и в размеры не вносит.`,
    sizes: rows.map(([name, powerKw, steam]): Size => ({
      id: `jumag-${name.toLowerCase().replace(/\s+/g, "-")}`,
      name,
      powerKw,
      steamKgH: Math.round(steam),
    })),
    sizesNote: "У EDI 100 и выше киловатт в размере пуст: колонка тепла оборвана.",
    aliases: ["edi"],
  },
];

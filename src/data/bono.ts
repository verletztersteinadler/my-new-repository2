import type { Category, FuelId, Series, Size } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страницы Cannon Bono SG и OMV. У OMV 1500 колонка ккал не сходится с колонкой МВт, в размер взят МВт.";

function kg(name: string, steamKgH: number): Size {
  return { id: `bono-${name.toLowerCase().replace(/\s+/g, "-")}`, name, powerKw: null, steamKgH };
}

function mw(name: string, mw: number): Size {
  return { id: `bono-${name.toLowerCase().replace(/\s+/g, "-")}`, name, powerKw: Math.round(mw * 1000), steamKgH: null };
}

export const bonoCategories: Category[] = [
  { id: "steam", title: "Паровые", param: "steam" },
  { id: "oil", title: "Термомасляные", param: "power" },
];

export const bonoDocuments = [{ title: "SG и OMV" }];

export const bonoSeries: Series[] = [
  {
    id: "bono-sg",
    name: "Cannon Bono SG",
    categoryId: "steam",
    kind: "Жаротрубный",
    image: "/catalog/firetube.jpg",
    summary: "2–30 т/ч. На шапке давление 12–25 бар, у части моделей в таблице до 30.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: 2000,
    steamMaxKgH: 30000,
    tempMaxC: null,
    pressureNote: "12–25 бар на шапке",
    fuels: ["gas", "diesel"] as FuelId[],
    feature: "Насыщенный и перегретый пар, перегретая вода",
    extra: checked,
    sizes: [200, 300, 400, 500, 600, 800, 900, 1000, 1100, 1200, 1400, 1500, 1800, 2000, 2200, 2500, 3000].map((n) =>
      kg(`SG ${n}`, n >= 1000 ? n * 10 : n * 10),
    ),
    sizesNote: "Пар в таблице — «до» указанной цифры. Имя SG 200 означает до 2 000 кг/ч, SG 1100 — до 11 000.",
    aliases: ["sg"],
  },
  {
    id: "bono-omv",
    name: "Cannon Bono OMV",
    categoryId: "oil",
    kind: "Термомасло, змеевик",
    image: "/catalog/reverse.jpg",
    summary: "0,2–5,8 МВт, до 350 °C, расчётное давление 10 бар.",
    powerMinKw: 200,
    powerMaxKw: 5800,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: 350,
    pressureNote: "10 бар",
    fuels: ["gas", "diesel"] as FuelId[],
    feature: "Горизонтальный или вертикальный",
    extra: `${checked} Модели OMV 300–1000 на странице есть, в извлечении колонок на одну больше, чем имён, и в ряд не разложены.`,
    sizes: [
      mw("OMV 1250", 1.5),
      mw("OMV 1500", 1.7),
      mw("OMV 2000", 2.3),
      mw("OMV 2500", 2.9),
      mw("OMV 3000", 3.5),
      mw("OMV 4000", 4.7),
      mw("OMV 5000", 5.8),
    ],
    sizesNote: "Электрические e-SG и e-OMV названы без цифр.",
    aliases: ["omv"],
  },
];

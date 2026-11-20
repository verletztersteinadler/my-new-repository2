import type { Category, FuelId, Series, Size } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страницы Babcock Wanson. У BWD колонка кВт для модели 15 на странице читается как 2025 при 1366 у модели 20, поэтому киловатты этой таблицы не перенесены.";

function kw(name: string, powerKw: number): Size {
  return { id: `wanson-${name.toLowerCase().replace(/\s+/g, "-")}`, name, powerKw, steamKgH: null };
}

function steam(name: string, kg: number): Size {
  return { id: `wanson-${name.toLowerCase()}`, name, powerKw: null, steamKgH: kg };
}

export const wansonCategories: Category[] = [
  { id: "steam", title: "Паровые", param: "steam" },
  { id: "oil", title: "Термомасляные", param: "power" },
];

export const wansonDocuments = [{ title: "BWD и TPC-B" }];

export const wansonSeries: Series[] = [
  {
    id: "wanson-bwd",
    name: "Babcock Wanson BWD",
    categoryId: "steam",
    kind: "Жаротрубный, три хода",
    image: "/catalog/firetube.jpg",
    summary: "1 500–8 000 кг/ч при 15 бар и питательной воде 80 °C.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: 1500,
    steamMaxKgH: 8000,
    tempMaxC: null,
    pressureNote: "таблица при 15 бар",
    fuels: ["gas", "diesel", "heavy"] as FuelId[],
    feature: "Два топлива и смесь",
    extra: checked,
    sizes: [15, 20, 25, 30, 35, 40, 50, 60, 70, 80].map((n) => steam(`BWD ${n}`, n * 100)),
    sizesNote: "Имя модели — номер, пар равен номеру × 100 кг/ч, как в таблице.",
    aliases: ["bwd"],
  },
  {
    id: "wanson-tpc",
    name: "Babcock Wanson TPC-B",
    categoryId: "oil",
    kind: "Термомасло, вертикальный",
    image: "/catalog/vertical.jpg",
    summary: "116–6 978 кВт.",
    powerMinKw: 116,
    powerMaxKw: 6978,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["gas", "diesel", "heavy"] as FuelId[],
    feature: "Жидкое или газообразное топливо",
    extra: `${checked} Таблица output kW совпадает с шапкой 100 000–6 000 000 ккал/ч.`,
    sizes: [
      kw("TPC-B 100 B", 116),
      kw("TPC-B 200 B", 232),
      kw("TPC-B 400 B", 465),
      kw("TPC-B 600 B", 698),
      kw("TPC-B 1000 B", 1163),
      kw("TPC-B 1500 B", 1745),
      kw("TPC-B 2000 B", 2326),
      kw("TPC-B 2500 SC", 2908),
      kw("TPC-B 3000 SC", 3489),
      kw("TPC-B 3000 B", 3489),
      kw("TPC-B 4000 B", 4652),
      kw("TPC-B 5000 B", 5815),
      kw("TPC-B 6000 B", 6978),
    ],
    sizesNote: "3000 SC и 3000 B на странице имеют одну мощность 3 489 кВт.",
    aliases: ["tpc"],
  },
];

import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Карточка Universal ZFR на steamboilers.co.uk. Цифры совпадают с Bosch ZFR. Объект Magic Rock — один котёл 100 HP, не ряд.";

const fuels: FuelId[] = ["gas", "diesel"];

export const cfbCategories: Category[] = [{ id: "steam", title: "Паровые", param: "steam" }];

export const cfbDocuments = [{ title: "Universal ZFR" }];

export const cfbSeries: Series[] = [
  {
    id: "cfb-zfr",
    name: "CFB Universal ZFR",
    categoryId: "steam",
    kind: "Две жаровые трубы, три хода",
    image: "/catalog/twin.jpg",
    summary: "18 000–55 000 кг/ч, до 30 бар, до 235 °C.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: 18000,
    steamMaxKgH: 55000,
    tempMaxC: 235,
    pressureNote: "до 30 бар",
    fuels,
    feature: "Насыщенный пар",
    extra: `${checked} Топлива строки: газ, масло, биогаз, биомасло, водород.`,
    sizes: [],
    sizesNote: null,
    aliases: ["zfr"],
  },
  {
    id: "cfb-zfrx",
    name: "CFB Universal ZFR-X",
    categoryId: "steam",
    kind: "Две жаровые трубы, перегретый пар",
    image: "/catalog/twin.jpg",
    summary: "До 300 °C и 30 бар. Клетка паропроизводительности в таблице пустая.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: 300,
    pressureNote: "до 30 бар",
    fuels,
    feature: "Перегретый пар",
    extra: `${checked} Абзац ниже пишет 18 000–55 000 кг/ч на весь ряд. В клетке ZFR-X стоит прочерк, поэтому пар в эту карточку не поставлен.`,
    sizes: [],
    sizesNote: null,
    aliases: ["zfr-x"],
  },
];

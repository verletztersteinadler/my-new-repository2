import type { Category, FuelId, Series, Size } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Карточка TP3 LN и обзор коммерческого ряда ferroli.com. У TP3 COND заголовок 65–3 200 кВт, текст карточки пишет 65–1 000 кВт. В карточку взят текст.";

const tp3 = [70, 92, 107, 152, 190, 240, 320, 401, 500, 600, 720, 820, 940, 1060, 1250, 1480, 1890, 2360, 2800, 3200];
const fuels: FuelId[] = ["gas", "diesel"];

function range(id: string, name: string, min: number, max: number, feature: string, extra: string): Series {
  return {
    id,
    name,
    categoryId: "water",
    kind: "Водогрейный",
    image: "/catalog/firetube.jpg",
    summary: `${min.toLocaleString("ru-RU")}–${max.toLocaleString("ru-RU")} кВт.`,
    powerMinKw: min,
    powerMaxKw: max,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels,
    feature,
    extra: `${checked} ${extra}`,
    sizes: [],
    sizesNote: null,
    aliases: [],
  };
}

export const ferroliCategories: Category[] = [{ id: "water", title: "Водогрейные", param: "power" }];
export const ferroliDocuments = [{ title: "TP3 LN и обзор" }];
export const ferroliSeries: Series[] = [
  {
    id: "ferroli-tp3",
    name: "Ferroli TP3 LN",
    categoryId: "water",
    kind: "Три хода, газ или масло",
    image: "/catalog/firetube.jpg",
    summary: "Полезная мощность 70–3 200 кВт. Расчётное давление 6 бар.",
    powerMinKw: 70,
    powerMaxKw: 3200,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: "6 бар",
    fuels,
    feature: "Имя модели совпадает с максимальной полезной мощностью",
    extra: checked,
    sizes: tp3.map((powerKw): Size => ({ id: `ferroli-tp3-${powerKw}`, name: `TP3 LN ${powerKw}`, powerKw, steamKgH: null })),
    sizesNote: "В размере максимальная полезная мощность.",
    aliases: ["tp3"],
  },
  range("ferroli-force", "Ferroli Force W", 60, 600, "Настенный конденсационный", "600 кВт — каскад, не один котёл."),
  range("ferroli-cond", "Ferroli TP3 COND", 65, 1000, "Конденсационный, три хода", "Заголовок карточки шире: 65–3 200 кВт."),
  range("ferroli-atlas", "Ferroli Atlas / GN", 32, 650, "Чугун", "Atlas A отдельно 32–95 кВт."),
  range("ferroli-rsw", "Ferroli, стальные под давлением", 92, 6000, "В обзоре назван RSW", "Модели внутри 92–6 000 кВт не разложены."),
];

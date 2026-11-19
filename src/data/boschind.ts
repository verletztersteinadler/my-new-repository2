import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Карточки UL-S и ZFR на bosch-industrial.com и таблица брошюры паровых и водогрейных. U-MB, CSB, HRSB, ELHB и ELSB в списке листов есть, их цифры в эту поставку не читались.";

const fuels: FuelId[] = ["gas", "diesel"];

function steam(id: string, name: string, min: number, max: number, temp: number, feature: string): Series {
  return {
    id,
    name,
    categoryId: "steam",
    kind: "Жаротрубный",
    image: "/catalog/steam.jpg",
    summary: `${min.toLocaleString("ru-RU")}–${max.toLocaleString("ru-RU")} кг/ч, до 30 бар, до ${temp} °C.`,
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: min,
    steamMaxKgH: max,
    tempMaxC: temp,
    pressureNote: "до 30 бар",
    fuels,
    feature,
    extra: `${checked} На карточках также названы биогаз, биомасло и водород. В фильтре топлива их нет.`,
    sizes: [],
    sizesNote: "Ряд внутри границ не разложен.",
    aliases: [],
  };
}

function water(id: string, name: string, minMw: number, maxMw: number, temp: number, bar: number): Series {
  return {
    id,
    name,
    categoryId: "water",
    kind: "Водогрейный",
    image: "/catalog/firetube.jpg",
    summary: `${minMw}–${maxMw} МВт, до ${temp} °C, до ${bar} бар.`,
    powerMinKw: minMw * 1000,
    powerMaxKw: maxMw * 1000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: temp,
    pressureNote: `до ${bar} бар`,
    fuels,
    feature: `${minMw}–${maxMw} МВт`,
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: [],
  };
}

export const boschindCategories: Category[] = [
  { id: "steam", title: "Паровые", param: "steam" },
  { id: "water", title: "Водогрейные", param: "power" },
];

export const boschindDocuments = [{ title: "UL-S, ZFR и таблица брошюры" }];

export const boschindSeries: Series[] = [
  steam("bosch-uls", "Bosch UL-S", 1250, 28000, 235, "Насыщенный пар, одна жаровая труба"),
  steam("bosch-ulsx", "Bosch UL-SX", 2600, 28000, 300, "Перегретый пар"),
  steam("bosch-zfr", "Bosch ZFR", 18000, 55000, 235, "Две жаровые трубы, насыщенный пар"),
  steam("bosch-zfrx", "Bosch ZFR-X", 18000, 55000, 300, "Две жаровые трубы, перегретый пар"),
  water("bosch-uni", "Bosch Uni Condens", 0.8, 1.2, 110, 6),
  water("bosch-utl", "Bosch UT-L", 0.6, 25, 120, 16),
  water("bosch-utm", "Bosch UT-M", 0.7, 19, 190, 16),
  water("bosch-uth", "Bosch UT-H", 0.8, 18, 210, 30),
  water("bosch-uthz", "Bosch UT-HZ", 13, 38, 210, 30),
];

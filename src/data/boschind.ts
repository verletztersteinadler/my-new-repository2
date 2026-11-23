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
  { ...water("bosch-uni", "Bosch Uni Condens 8000 F (частичный охват)", 0.8, 1.2, 110, 6),
    sourceUrl: "https://www.bosch-industrial.com/global/en/ocs/commercial-industrial/uni-condens-8000-f-800-1-200-kw-669456-p/",
    sourceChecked: "2026-11-23", sourceRevision: "Bosch Global, подлинейка 800–1200 кВт",
    sizesNote: "В этой карточке только исполнение 800–1200 кВт; диапазоны 50–115 и 145–640 кВт не включены." },
  { ...water("bosch-utl", "Bosch UT-L", 0.65, 25, 110, 16),
    sourceUrl: "https://www.bosch-industrial.com/global/en/ocs/commercial-industrial/unimat-heating-boiler-ut-l-669463-p/",
    sourceChecked: "2026-11-23", sourceRevision: "Bosch Global, текущая карточка" },
  { ...water("bosch-utm", "Bosch UT-M", 0.75, 19.2, 190, 16),
    sourceUrl: "https://www.bosch-industrial.com/global/en/ocs/commercial-industrial/unimat-hot-water-boiler-ut-m-669464-p/",
    sourceChecked: "2026-11-23", sourceRevision: "Bosch Global, текущая карточка" },
  { ...water("bosch-uth", "Bosch UT-H", 0.82, 18.3, 225, 30),
    sourceUrl: "https://www.bosch-industrial.com/global/en/ocs/commercial-industrial/unimat-hot-water-boiler-ut-h-669465-p/",
    sourceChecked: "2026-11-23", sourceRevision: "Bosch Global, текущая карточка" },
  { ...water("bosch-uthz", "Bosch UT-HZ", 13, 38, 225, 30),
    sourceUrl: "https://www.bosch-industrial.com/global/en/ocs/commercial-industrial/unimat-hot-water-boiler-ut-hz-669466-p/",
    sourceChecked: "2026-11-23", sourceRevision: "Bosch Global, текущая карточка" },
];

import type { Category, FuelId, Series, Size } from "@/data/catalog";

const checked = "Сверка 28.11.2026. Раздел «Generatori di calore di potenza» на lamborghinicalor.it; диапазоны — карточки моделей и каталоги производителя (Lamborghini Calor — бренд Ferroli S.p.A.).";

const gasOil: FuelId[] = ["gas", "diesel"];

function sz(seriesId: string, values: number[]): Size[] {
  return values.map((v) => ({ id: `${seriesId}-${v}`, name: `mod.${v}`, powerKw: v, steamKgH: null }));
}

function water(
  id: string,
  name: string,
  kind: string,
  min: number,
  max: number,
  pressureNote: string | null,
  feature: string,
  extra: string,
  sizes: Size[],
  fuels: FuelId[] = gasOil,
): Series {
  return {
    id,
    name,
    categoryId: "water",
    kind,
    image: "/catalog/firetube.jpg",
    summary: `${min.toLocaleString("ru-RU")}–${max.toLocaleString("ru-RU")} кВт.`,
    powerMinKw: min,
    powerMaxKw: max,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote,
    fuels,
    feature,
    extra: `${checked} ${extra}`,
    sizes,
    sizesNote: null,
    aliases: [],
  };
}

const megaprexSizes = [92, 107, 152, 190, 240, 300, 350, 401, 525, 600, 720, 820, 940, 1060];
const prexSizes = [65, 100, 150, 230, 370, 500, 650, 820, 1000];
const cloverSizes = [70, 125, 160, 220, 320, 450];
const titanSizes = [115, 142, 213, 284, 355, 426, 497, 568];

export const lamborghiniCategories: Category[] = [{ id: "water", title: "Водогрейные", param: "power" }];
export const lamborghiniDocuments = [{ title: "MEGAPREX N" }, { title: "PREX H 3 COND" }, { title: "CLOVER" }, { title: "TITAN" }];

export const lamborghiniSeries: Series[] = [
  water(
    "lamborghini-megaprex",
    "Lamborghini Megaprex N",
    "Стальной под давлением, реверсивная топка, 3 хода (тело под горелку)",
    92,
    1060,
    "6 бар",
    "Полностью омываемая камера сгорания, реверсивно открываемая дверца",
    "Тело котла под дутьевую горелку на жидком и/или газовом топливе; в документации также упоминается мануал mod. 1250–6000 (за пределами текущей линейки на сайте).",
    sz("lamborghini-megaprex", megaprexSizes),
  ),
  water(
    "lamborghini-prexh3cond",
    "Lamborghini Prex H 3 Cond",
    "Конденсационный стальной, 3 хода, мокрое дно",
    65,
    1000,
    "6 бар",
    "Теплообменник из стали INOX 2205 (Duplex), класс эффективности A",
    "Slug карточки «65-650», заголовок и линейка — 65–1000 (9 типоразмеров).",
    sz("lamborghini-prexh3cond", prexSizes),
  ),
  water(
    "lamborghini-clover",
    "Lamborghini CLOVER",
    "Конденсационный модуль с большим водяным объёмом, нерж. сталь AISI 316L",
    70,
    450,
    "0,8 бар мин. (по датчику)",
    "Сертификат INAIL как единый генератор, RANGE RATED",
    "Метан или ГПЛ; одиночная установка или батареи до трёх модулей с суммарной мощностью до 1 350 кВт.",
    sz("lamborghini-clover", cloverSizes),
    ["gas"] as FuelId[],
  ),
  water(
    "lamborghini-titan",
    "Lamborghini TITAN",
    "Конденсационный для установки вне помещений, алюминий-кремний",
    115,
    568,
    "0,8 бар мин. (по датчику)",
    "Модуляция мощности до 1/40, класс 6 NOx",
    "Метан или ГПЛ; 8 генераторов, каскад до восьми машин через регулятор THETA+.",
    sz("lamborghini-titan", titanSizes),
    ["gas"] as FuelId[],
  ),
];

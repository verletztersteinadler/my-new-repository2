import type { Category, FuelId, Series, Size } from "@/data/catalog";

const checked =
  "Сверка 28.11.2026. Официальная программа Buderus для коммерческого/промышленного применения (buderus.de, «Produkte für Gewerbe und Industrie»): стальные и чугунные котлы Logano до 2,5 МВт. Мощности — номинальные при 50/30 °C на газе (Planungsunterlagen Buderus 6 720 822 529, 6 720 822 555).";

const fuels: FuelId[] = ["gas", "diesel"];

export const buderusCategories: Category[] = [{ id: "water", title: "Водогрейные", param: "power" }];

export const buderusDocuments = [
  { title: "Logano plus SB325" },
  { title: "Logano plus SB625" },
  { title: "Logano plus SB745" },
  { title: "Logano plus SB825" },
];

const sb325 = [50, 70, 90, 115];
const sb745 = [800, 1000, 1200];
const sb825 = [650, 1000, 1350, 1900, 2500];

export const buderusSeries: Series[] = [
  {
    id: "buderus-sb325",
    name: "Buderus Logano plus SB325",
    categoryId: "water",
    kind: "Газовый/масляный конденсационный, чугун, 3 хода, наддувная горелка",
    image: "/catalog/firetube.jpg",
    summary: "50–115 кВт; малые и средние коммерческие объекты.",
    powerMinKw: 50,
    powerMaxKw: 115,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels,
    feature: "4 типоразмера, низкотемпературный режим до 40 % нагрузки, norm. КПД до 98 %",
    extra: `${checked} Диапазон серии SB325/SB625/SB745 вместе покрывает 50–1200 кВт.`,
    sizes: sb325.map((powerKw): Size => ({ id: `buderus-sb325-${powerKw}`, name: `SB325-${powerKw}`, powerKw, steamKgH: null })),
    sizesNote: "Модель = номинальная мощность при 50/30 °C, кВт.",
    aliases: ["sb325"],
  },
  {
    id: "buderus-sb625",
    name: "Buderus Logano plus SB625",
    categoryId: "water",
    kind: "Газовый/масляный конденсационный, чугун, 3 хода, наддувная горелка",
    image: "/catalog/firetube.jpg",
    summary: "Семь размеров, 145–640 кВт.",
    powerMinKw: 145,
    powerMaxKw: 640,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels,
    feature: "Низкосернистое масло, сера менее 50 ppm",
    extra: `${checked} В шапке листа колонка на 510 кВт подписана «500». В размер поставлена мощность 510 кВт.`,
    sizes: [145, 185, 240, 310, 400, 510, 640].map(
      (powerKw): Size => ({ id: `buderus-sb625-${powerKw}`, name: `SB625-${powerKw}`, powerKw, steamKgH: null }),
    ),
    sizesNote: "Модель = номинальная мощность при 50/30 °C, кВт.",
    aliases: ["sb625", "logano"],
  },
  {
    id: "buderus-sb745",
    name: "Buderus Logano plus SB745",
    categoryId: "water",
    kind: "Газовый/масляный конденсационный, сталь, камера дожигания с полным расходом (Durchbrand), наддувная горелка",
    image: "/catalog/firetube.jpg",
    summary: "800–1200 кВт; средние и крупные коммерческие объекты.",
    powerMinKw: 800,
    powerMaxKw: 1200,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels,
    feature: "Заводская теплоизоляция и обшивка, встроенная шумоизоляция, типоразмеры с 40 % минимальной нагрузкой",
    extra: `${checked} Максимальная высота ввода 2,05 м; серия завершает диапазон SB325/SB625 до 1200 кВт.`,
    sizes: sb745.map((powerKw): Size => ({ id: `buderus-sb745-${powerKw}`, name: `SB745-${powerKw}`, powerKw, steamKgH: null })),
    sizesNote: "Модель = номинальная мощность при 50/30 °C, кВт.",
    aliases: ["sb745"],
  },
  {
    id: "buderus-sb825",
    name: "Buderus Logano plus SB825",
    categoryId: "water",
    kind: "Специальный стальной отопительный котёл по EN 303 (аналог TRD 300) с конденсационным теплообменником, наддувная горелка",
    image: "/catalog/firetube.jpg",
    summary: "650–2500 кВт; с конденсационным теплообменником до 2705 кВт.",
    powerMinKw: 650,
    powerMaxKw: 2500,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: 110,
    pressureNote: "6 или 10 бар",
    fuels,
    feature: "Низкотемпературная горячая вода до 110 °C (EN 12828); шумоглушитель и обшивка в комплекте",
    extra: `${checked} Существует также версия без конденсационного теплообменника Logano S825L (те же типоразмеры 650–2500 кВт). С конденсационным теплообменником (BWT): 705/1085/1500/2060/2705 кВт.`,
    sizes: sb825.map((powerKw): Size => ({ id: `buderus-sb825-${powerKw}`, name: `SB825-${powerKw}`, powerKw, steamKgH: null })),
    sizesNote: "Модель = номинальная мощность котла, кВт; с конденсационным теплообменником мощность выше (см. extra).",
    aliases: ["sb825", "s825", "s825l"],
  },
];

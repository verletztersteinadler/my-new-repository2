import type { Category, FuelId, Series, Size } from "@/data/catalog";

const checked =
  "Сверка 28.11.2026. Домен turboterm.ru истёк и закрыт паркингом Руцентра; ряды и характеристики сверены по архивным копиям официального сайта (web.archive.org, срез апреля 2026) и каталогу дилера «Вистерма» (visterma.ru). Изготовитель — ООО «Компания Рэмэкс-Энерго»: завод в г. Малоярославце, головной офис в г. Черноголовке. Производство по СТО 48365320.0001-2006.";

const gasDiesel: FuelId[] = ["gas", "diesel"];
const gasDieselHeavy: FuelId[] = ["gas", "diesel", "heavy"];

function size(id: string, name: string, powerKw: number): Size {
  return { id: `turboterm-${id}`, name, powerKw, steamKgH: null };
}

export const turbotermCategories: Category[] = [
  { id: "hw115", title: "Водогрейные, до 115 °C", param: "power" },
];

export const turbotermSeries: Series[] = [
  {
    id: "turboterm-tt",
    name: "Турботерм-ТТ",
    categoryId: "hw115",
    kind: "Водогрейный, жаротрубный, реверсивная топка (2 хода)",
    image: "/catalog/reverse.jpg",
    summary:
      "Базовая универсальная серия: 9 типоразмеров от 110 до 3150 кВт с реверсивной топкой. Рекомендована для тяжёлого жидкого топлива — мазута, в том числе низкосортного, и сырой нефти.",
    powerMinKw: 110,
    powerMaxKw: 3150,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: 115,
    pressureNote: "0,6 МПа",
    fuels: gasDieselHeavy,
    feature: "Работа на мазуте и сырой нефти",
    extra: `${checked} По карточкам моделей: КПД 92 % при максимальной нагрузке, вход воды не ниже 60 °C, топка с теплонапряжением не более 0,6 МВт/м³, сейсмостойкость до 9 баллов. Топливо: природный газ, СУГ, солярка, печное бытовое, мазут. Источник: архивная копия https://www.turboterm.ru/catalog/hot_water_boilers/turboterm_tt/.`,
    sizes: [
      size("tt-110", "Турботерм-ТТ 110", 110),
      size("tt-250", "Турботерм-ТТ 250", 250),
      size("tt-500", "Турботерм-ТТ 500", 500),
      size("tt-800", "Турботерм-ТТ 800", 800),
      size("tt-1100", "Турботерм-ТТ 1100", 1100),
      size("tt-1600", "Турботерм-ТТ 1600", 1600),
      size("tt-2000", "Турботерм-ТТ 2000", 2000),
      size("tt-2500", "Турботерм-ТТ 2500", 2500),
      size("tt-3150", "Турботерм-ТТ 3150", 3150),
    ],
    sizesNote: "Ряд по официальному описанию серии: 110, 250, 500, 800, 1100, 1600, 2000, 2500, 3150 кВт.",
    aliases: ["тт", "turboterm tt", "турботерм"],
  },
  {
    id: "turboterm-tto",
    name: "Турботерм-Оптима (ТТО)",
    categoryId: "hw115",
    kind: "Водогрейный, жаротрубный, реверсивная топка (2 хода)",
    image: "/catalog/reverse.jpg",
    summary:
      "Серия, оптимизированная по весу и габаритам: 9 типоразмеров от 500 до 4000 кВт. Для стеснённых компоновок и блочно-модульных котельных, работает на природном газе и лёгком жидком топливе.",
    powerMinKw: 500,
    powerMaxKw: 4000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: 110,
    pressureNote: "0,6 МПа",
    fuels: gasDiesel,
    feature: "Облегчённая серия для БМК",
    extra: `${checked} Официальный сайт заявлял КПД от 91 до 95 % на природном газе; по карточкам дилера — 92 % при полной нагрузке. Максимальная температура теплоносителя по карточкам 110 °C (у остальных серий ТУРБОТЕРМ — 115 °C). Топливо: природный газ, дизельное, печное бытовое. Источник: архивная копия https://www.turboterm.ru/catalog/hot_water_boilers/turboterm_optima/.`,
    sizes: [
      size("tto-500", "Турботерм-Оптима 500", 500),
      size("tto-800", "Турботерм-Оптима 800", 800),
      size("tto-1000", "Турботерм-Оптима 1000", 1000),
      size("tto-1500", "Турботерм-Оптима 1500", 1500),
      size("tto-2000", "Турботерм-Оптима 2000", 2000),
      size("tto-2500", "Турботерм-Оптима 2500", 2500),
      size("tto-3000", "Турботерм-Оптима 3000", 3000),
      size("tto-3500", "Турботерм-Оптима 3500", 3500),
      size("tto-4000", "Турботерм-Оптима 4000", 4000),
    ],
    sizesNote: "Ряд по официальному описанию серии: 500, 800, 1000, 1500, 2000, 2500, 3000, 3500, 4000 кВт.",
    aliases: ["тто", "turboterm optima", "оптима"],
  },
  {
    id: "turboterm-tts",
    name: "Турботерм-Стандарт (ТТС)",
    categoryId: "hw115",
    kind: "Водогрейный, жаротрубный, трёхходовой",
    image: "/catalog/clad-3.jpg",
    summary:
      "Лёгкие и компактные трёхходовые котлы малой производительности: 5 типоразмеров от 250 до 1000 кВт, металлоёмкость 1,8–2,46 кг/кВт.",
    powerMinKw: 250,
    powerMaxKw: 1000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: 115,
    pressureNote: "0,6 МПа",
    fuels: gasDiesel,
    feature: "Компактный трёхходовой",
    extra: `${checked} По карточкам дилера: КПД 92 % при максимальной нагрузке, температура 115 °C, вход воды не ниже 60 °C. Конструкция с симметричным концентрическим расположением жаровой трубы и дымогарных труб. Источник: архивная копия https://www.turboterm.ru/catalog/hot_water_boilers/turboterm_standart/.`,
    sizes: [
      size("tts-250", "Турботерм-Стандарт 250", 250),
      size("tts-500", "Турботерм-Стандарт 500", 500),
      size("tts-650", "Турботерм-Стандарт 650", 650),
      size("tts-800", "Турботерм-Стандарт 800", 800),
      size("tts-1000", "Турботерм-Стандарт 1000", 1000),
    ],
    sizesNote: "Ряд по официальному описанию серии: 250, 500, 650, 800, 1000 кВт.",
    aliases: ["ттс", "turboterm standart", "стандарт"],
  },
  {
    id: "turboterm-ttg",
    name: "Турботерм-Гарант (ТТГ)",
    categoryId: "hw115",
    kind: "Водогрейный, жаротрубный, трёхходовой",
    image: "/catalog/clad-2.jpg",
    summary:
      "Трёхходовые котлы средней мощности с большим водяным объёмом: 7 типоразмеров от 1500 до 7000 кВт, металлоёмкость 2,3–2,6 кг/кВт. Для котельных с частыми переменными режимами.",
    powerMinKw: 1500,
    powerMaxKw: 7000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: 115,
    pressureNote: "0,6 МПа",
    fuels: gasDiesel,
    feature: "Большой водяной объём",
    extra: `${checked} По карточкам дилера: КПД 92 % при полной нагрузке, вход воды не ниже 60 °C. У типоразмера 7000 применяется волнистая жаровая труба. Тепловая инерционность водяного объёма сокращает число пусков горелки на низких нагрузках. Источник: архивная копия https://www.turboterm.ru/catalog/hot_water_boilers/turboterm_garant/.`,
    sizes: [
      size("ttg-1500", "Турботерм-Гарант 1500", 1500),
      size("ttg-2000", "Турботерм-Гарант 2000", 2000),
      size("ttg-2500", "Турботерм-Гарант 2500", 2500),
      size("ttg-3000", "Турботерм-Гарант 3000", 3000),
      size("ttg-4000", "Турботерм-Гарант 4000", 4000),
      size("ttg-5000", "Турботерм-Гарант 5000", 5000),
      size("ttg-7000", "Турботерм-Гарант 7000", 7000),
    ],
    sizesNote: "Ряд по официальному описанию серии: 1500, 2000, 2500, 3000, 4000, 5000, 7000 кВт.",
    aliases: ["ттг", "turboterm garant", "гарант"],
  },
];

export const turbotermDocuments = [
  {
    title: "Серия Турботерм-ТТ (архивная копия turboterm.ru)",
    href: "http://web.archive.org/web/20260418203119/https://www.turboterm.ru/catalog/hot_water_boilers/turboterm_tt/",
  },
  {
    title: "Серия Турботерм-Оптима (архивная копия)",
    href: "http://web.archive.org/web/20260418203119/https://www.turboterm.ru/catalog/hot_water_boilers/turboterm_optima/",
  },
  {
    title: "Серия Турботерм-Стандарт (архивная копия)",
    href: "http://web.archive.org/web/20260418203119/https://www.turboterm.ru/catalog/hot_water_boilers/turboterm_standart/",
  },
  {
    title: "Серия Турботерм-Гарант (архивная копия)",
    href: "http://web.archive.org/web/20260418203119/https://www.turboterm.ru/catalog/hot_water_boilers/turboterm_garant/",
  },
  { title: "Каталог Турботерм у дилера Вистерма", href: "https://visterma.ru/catalog/turboterm/" },
  {
    title: "Презентация котлов ТУРБОТЕРМ (PDF, архивная копия)",
    href: "http://web.archive.org/web/20260418203119/https://www.turboterm.ru/upload/Presentation_of_TURBOTERM_boilers_or_the_site.pdf",
  },
];

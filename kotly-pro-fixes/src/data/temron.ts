import type { Category, FuelId, Series, Size } from "@/data/catalog";

const checked =
  "Сверка 28.11.2026, temron.ru (ООО «ЭнергомашИнжиниринг», Барнаул). Все типоразмеры сняты с таблиц характеристик на страницах серий и карточек моделей.";

const gasDiesel: FuelId[] = ["gas", "diesel"];
const mazutNote =
  "Работа на газообразном и лёгком жидком топливе; тяжёлое жидкое топливо (мазут М-100) допускается по отдельному согласованию горелки.";

function power(values: number[]): Size[] {
  return values.map((kw) => ({
    id: `tm-wl-${kw}`,
    name: `Temron WL ${kw}`,
    powerKw: kw,
    steamKgH: null,
  }));
}

function wh(values: number[]): Size[] {
  return values.map((mw) => ({
    id: `tm-wh-${mw}`,
    name: `Temron WH ${mw}`,
    powerKw: mw * 1000,
    steamKgH: null,
  }));
}

const wmaxTable: [string, number][] = [
  ["Temron Wmax-30", 35000],
  ["Temron Wmax-50", 58200],
  ["Temron Wmax-100", 116300],
  ["Temron Wmax-120", 139600],
  ["Temron Wmax-150", 174500],
  ["Temron Wmax-180", 209300],
];

const slTable: [number, number][] = [
  [200, 160],
  [350, 275],
  [500, 390],
  [750, 580],
  [1000, 683],
  [1500, 1024],
  [2000, 1366],
  [2500, 1707],
  [3000, 2049],
];

export const temronCategories: Category[] = [
  { id: "water", title: "Водогрейные", param: "power" },
  { id: "steam", title: "Паровые", param: "steam" },
  { id: "auto", title: "Комплектующие", param: "none" },
];

export const temronSeries: Series[] = [
  {
    id: "wl",
    name: "TEMRON WL",
    categoryId: "water",
    kind: "Водогрейный, жаротрубный, 2 хода, реверсивная топка",
    image: "/catalog/firetube.jpg",
    summary:
      "Котлы низкого давления: 19 типоразмеров от 250 до 6000 кВт, 0,6 МПа, вода до 110 °C, КПД 92,2–92,5 %.",
    powerMinKw: 250,
    powerMaxKw: 6000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: 110,
    pressureNote: "0,6 МПа",
    fuels: gasDiesel,
    feature: "Спиральные турбулизаторы в дымогарных трубах",
    extra: `${checked} Таблица серии: КПД 92,2–92,5 % по типоразмерам, температура на входе не менее 60 °C, на выходе 110 °C, уходящие газы 190–200 °C (газ/жидкое топливо). Шапка страницы даёт диапазон 0,2–6,5 МВт, а таблица — 0,25–6,0 МВт; взяты табличные значения. Карточка с URL «temron-wl-950» открывается с заголовком «Temron WL 1000» — внутреннее расхождение адреса и названия. ${mazutNote} Источник: https://temron.ru/catalog/temron-wl/main-wl/.`,
    sizes: power([250, 300, 350, 400, 500, 650, 800, 1000, 1100, 1250, 1500, 1750, 2000, 2500, 3000, 3500, 4000, 5000, 6000]),
    sizesNote: null,
    aliases: ["wl", "вл", "темрон"],
  },
  {
    id: "wh",
    name: "TEMRON WH",
    categoryId: "water",
    kind: "Водогрейный, жаротрубный, 3 хода, охлаждаемая поворотная камера",
    image: "/catalog/clad-3.jpg",
    summary:
      "Котлы высокого давления: 19 типоразмеров от 1 до 16 МВт. Давления 0,6/1,0/1,3/1,6/2,0 МПа, вода до 190 °C, КПД 93 %.",
    powerMinKw: 1000,
    powerMaxKw: 16000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: 190,
    pressureNote: "0,6 / 1,0 / 1,3 / 1,6 / 2,0 МПа",
    fuels: gasDiesel,
    feature: "Температура подачи 110–190 °C по исполнению давления",
    extra: `${checked} Шапка страницы серии заявляет 1–20 МВт, но карточки опубликованы только до WH 16; взят максимум карточек. В шапке перечислены давления 0,6/1,0/1,6/2,0 МПа, в карточках моделей есть и 1,3 МПа. Температура на выходе зависит от давления: 110–140 °C (0,6 МПа) … 110–190 °C (2,0 МПа), вход не менее 60 °C, уходящие газы 180–185 °C, КПД 93 %. ${mazutNote} Источник: https://temron.ru/catalog/temron-wh/main-wh/, карточки моделей.`,
    sizes: wh([1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]),
    sizesNote: null,
    aliases: ["wh", "вх"],
  },
  {
    id: "wmax",
    name: "TEMRON Wmax",
    categoryId: "water",
    kind: "Водогрейный, водотрубный, газоплотный, потолочные горелки",
    image: "/catalog/waterpipe.jpg",
    summary:
      "Водотрубные котлы большой мощности: 6 типоразмеров от 35 до 209,3 МВт. 1,6 МПа, вода 70/150 °C, КПД 94 %, регулирование 10–100 %.",
    powerMinKw: 35000,
    powerMaxKw: 209300,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: 150,
    pressureNote: "1,6 МПа на входе (макс.), 1,0 МПа на выходе (мин., абс.)",
    fuels: ["gas", "diesel", "heavy"] as FuelId[],
    feature: "Выбросы NOx не более 90 мг/нм³, уходящие газы 120 °C",
    extra: `${checked} Обозначения типоразмеров даны в Гкал/ч (Wmax-30 … Wmax-180), теплопроизводительность в карточках — 35 / 58,2 / 116,3 / 139,6 / 174,5 / 209,3 МВт; шапка серии округляет диапазон до 35–210 МВт. Топливо: все виды газообразного и жидкого, включая мазут. U-образная двухходовая схема, конвективные пакеты из змеевиков ∅38×3 мм, наддувный режим без присосов. Источник: https://temron.ru/catalog/temron-wmax/main-wmax/ и карточки моделей.`,
    sizes: wmaxTable.map(([name, kw]) => ({
      id: `tm-wmax-${kw}`,
      name,
      powerKw: kw,
      steamKgH: null,
    })),
    sizesNote: null,
    aliases: ["wmax", "вмакс", "водотрубный темрон"],
  },
  {
    id: "sl",
    name: "TEMRON SL",
    categoryId: "steam",
    kind: "Паровой, жаротрубный, 2 хода, насыщенный пар",
    image: "/catalog/steam.jpg",
    summary:
      "Паровые котлы низкого давления: таблица серии от 200 до 3000 кг/ч, карточки опубликованы от 1000 до 3000 кг/ч. 0,28–1 МПа, пар 142–185 °C.",
    powerMinKw: 160,
    powerMaxKw: 2049,
    steamMinKgH: 1000,
    steamMaxKgH: 3000,
    tempMaxC: 185,
    pressureNote: "0,28–1 МПа",
    fuels: gasDiesel,
    feature: "Реверсивная топка с вертикальным смещением",
    extra: `${checked} Таблица характеристик на странице серии содержит 9 моделей SL 200–SL 3000 с тепловой мощностью 160–2049 кВт, но продуктовые карточки существуют только для SL 1000, 1500, 2000, 2500, 3000. Шапка серии: 1000–3000 кг/ч, 0,28–1 МПа, 142–184 °C; таблица: максимальное давление 1 МПа, максимальная температура пара 185 °C, питательная вода 105 °C. На карточке SL 1000 названы 1 МПа, 184 °C, уходящие газы 290 °C — при том, что таблица серии ограничивает уходящие 200 °C; расхождение не сведено. ${mazutNote} Источник: https://temron.ru/catalog/temron-sl/main-sl/.`,
    sizes: slTable.map(([kg, kw]) => ({
      id: `tm-sl-${kg}`,
      name: `Temron SL ${kg}`,
      powerKw: kw,
      steamKgH: kg,
    })),
    sizesNote:
      "SL 200–750 присутствуют только в таблице характеристик серии, их карточки на сайте не опубликованы.",
    aliases: ["sl", "сл"],
  },
  {
    id: "sh",
    name: "TEMRON SH",
    categoryId: "steam",
    kind: "Паровой, жаротрубный, 3 хода, насыщенный или перегретый пар",
    image: "/catalog/steam.jpg",
    summary:
      "Паровые котлы высокого давления: 7 типоразмеров от 1 до 25 т/ч. Насыщенный/перегретый пар 165/215–204/254 °C, давления 0,6/1,0/1,3/1,6 МПа.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: 1000,
    steamMaxKgH: 25000,
    tempMaxC: 254,
    pressureNote: "0,6 / 1,0 / 1,3 / 1,6 МПа (шапка серии: 0,6–2,5 МПа)",
    fuels: gasDiesel,
    feature: "Опционально одно- или двухступенчатый пароперегреватель",
    extra: `${checked} Карточки моделей: SH 1, 6, 8, 10, 12, 16, 25 т/ч; питательная вода 104 °C; насыщенный/перегретый пар 165/215 °C при 0,6 МПа до 204/254 °C при 1,6 МПа. Шапка серии заявляет 1–35 т/ч, 0,6–2,5 МПа и «до 300 °C» — карточка SH 25 не опубликована за пределами списка, верх диапазона (35 т/ч, 2,5 МПа, 300 °C) на карточках не подтверждён; выпускаются по ТУ, согласованным с заказчиком. Возможен водотрубный экономайзер. ${mazutNote} Источник: https://temron.ru/catalog/temron-sh/main-sh/ и карточки моделей.`,
    sizes: [1000, 6000, 8000, 10000, 12000, 16000, 25000].map((kg) => ({
      id: `tm-sh-${kg}`,
      name: `Temron SH ${kg / 1000}`,
      powerKw: null,
      steamKgH: kg,
    })),
    sizesNote: "Типоразмер обозначается производительностью в т/ч: SH 1 … SH 25.",
    aliases: ["sh", "сх"],
  },
  {
    id: "auto-w",
    name: "TEMRON W",
    categoryId: "auto",
    kind: "Автоматика водогрейных котлов",
    image: "/catalog/cabinet.jpg",
    summary: "Управление котлами WL и WH: розжиг горелки, давление и температура воды. Исполнения WA, WB и каскад до 8 котлов.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: [],
    feature: "WL и WH",
    extra: `${checked.split(".")[0]}. Питание 220 В, 50 Гц, температура эксплуатации +1…+40 °C. Это не котёл. Источник: https://temron.ru/catalog/automatika-wl-wh/avtomatika-wl-wh/.`,
    sizes: [],
    sizesNote: "Состав шкафа зависит от исполнения и в каталог как типоразмер котла не переносится.",
    aliases: ["автоматика", "wa", "wb"],
  },
  {
    id: "auto-s",
    name: "TEMRON S",
    categoryId: "auto",
    kind: "Автоматика паровых котлов",
    image: "/catalog/cabinet.jpg",
    summary: "Управление котлами SL и SH: розжиг, давление пара, солесодержание и уровень воды. Исполнения SA и SB.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: [],
    feature: "SL и SH",
    extra: `${checked.split(".")[0]}. Питание 220 В, 50 Гц, температура эксплуатации +1…+40 °C. Это не котёл. Источник: https://temron.ru/catalog/automatika-sl-sh/avtomatika-sl-sh/.`,
    sizes: [],
    sizesNote: "Состав шкафа зависит от исполнения и в каталог как типоразмер котла не переносится.",
    aliases: ["sa", "sb", "автоматика"],
  },
];

export const temronDocuments = [
  { title: "Серия WL", href: "https://temron.ru/catalog/temron-wl/main-wl/" },
  { title: "Серия WH", href: "https://temron.ru/catalog/temron-wh/main-wh/" },
  { title: "Серия Wmax", href: "https://temron.ru/catalog/temron-wmax/main-wmax/" },
  { title: "Серия SL", href: "https://temron.ru/catalog/temron-sl/main-sl/" },
  { title: "Серия SH", href: "https://temron.ru/catalog/temron-sh/main-sh/" },
];

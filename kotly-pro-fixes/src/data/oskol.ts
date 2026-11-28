import type { Category, Series } from "@/data/catalog";

const checked =
  "Источник: страницы продукции kotel-oskol.ru (сверка 28.11.2026, сайт открыт). Вид топлива на страницах серий не назван — котлы поставляются под подбор горелочного устройства.";

export const oskolCategories: Category[] = [
  { id: "water", title: "Водогрейные", param: "power" },
  { id: "hw170", title: "Перегретая вода", param: "power" },
  { id: "steam", title: "Паровые", param: "steam" },
];
export const oskolDocuments = [{ title: "Серии на главной" }];

export const oskolSeries: Series[] = [
  {
    id: "oskol-energy",
    name: "Oskol Energy",
    categoryId: "hw170",
    kind: "Водогрейный, жаротрубный, двухходовой",
    image: "/catalog/firetube.jpg",
    summary:
      "Стальной газотрубный двухходовой котёл горизонтального исполнения для систем водяного отопления с принудительной циркуляцией, 0,25–3,5 МВт.",
    powerMinKw: 250,
    powerMaxKw: 3500,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: 160,
    pressureNote: "5 или 6 бар",
    fuels: [],
    feature: "2 хода, турболизаторы в конвективном пучке",
    extra: `${checked} По странице серии: температура до 160 °C, давление 5 и 6 бар. Низкое аэродинамическое сопротивление упрощает подбор горелки.`,
    sizes: [],
    sizesNote:
      "Полный ряд типоразмеров на сайте не опубликован: страница серии даёт только диапазон 0,25–3,5 МВт; документация выложена как ссылки на внешний диск.",
    aliases: ["energy", "оскол энерджи"],
  },
  {
    id: "oskol-eco",
    name: "Oskol Eco",
    categoryId: "hw170",
    kind: "Водогрейный, жаротрубный, трёхходовой",
    image: "/catalog/firetube.jpg",
    summary:
      "Трёхходовой водогрейный котёл для теплоснабжения зданий и сооружений, 0,5–8 МВт.",
    powerMinKw: 500,
    powerMaxKw: 8000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: 185,
    pressureNote: "6 бар",
    fuels: [],
    feature: "3 хода, снижение NOx",
    extra: `${checked} По странице серии: температура 152–185 °C, давление 6 бар. Низкая теплонапряжённость камер сгорания, конструкция снижает образование NOx.`,
    sizes: [],
    sizesNote:
      "Полный ряд типоразмеров на сайте не опубликован: страница серии даёт только диапазон 0,5–8 МВт.",
    aliases: ["eco", "оскол эко"],
  },
  {
    id: "oskol-green",
    name: "Oskol Green",
    categoryId: "water",
    kind: "Водогрейный, жаротрубный, трёхходовой, для тепличных комплексов",
    image: "/catalog/firetube.jpg",
    summary:
      "Трёхходовой котёл, спроектированный для тепличного сектора с низким уровнем NOx, 1,5–14 МВт.",
    powerMinKw: 1500,
    powerMaxKw: 14000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: "рабочее давление 3 бар",
    fuels: [],
    feature: "Теплицы, камера сгорания большого объёма, низкий NOx",
    extra: `${checked} По странице серии: температура газов 180 °C, рабочее давление 3 бар. Подбирается горелка 3-го класса по ГОСТ Р 51383-2012 с низким уровнем NOx. Температура теплоносителя на сайте не названа.`,
    sizes: [],
    sizesNote:
      "Полный ряд типоразмеров на сайте не опубликован: страница серии даёт только диапазон 1,5–14 МВт.",
    aliases: ["green", "оскол грин"],
  },
  {
    id: "oskol-steam",
    name: "Oskol Steam",
    categoryId: "steam",
    kind: "Паровой, жаротрубный, двухходовой",
    image: "/catalog/steam.jpg",
    summary:
      "Стальные жаротрубные паровые котлы для технологического пара, 1–5 т/ч.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: 1000,
    steamMaxKgH: 5000,
    tempMaxC: 180,
    pressureNote: "1,0 МПа",
    fuels: [],
    feature: "2 хода, насыщенный пар",
    extra: `${checked} По странице серии: рабочее давление 1,0 МПа, температура пара 180 °C. Пар используется в технологических целях.`,
    sizes: [],
    sizesNote:
      "Полный ряд типоразмеров на сайте не опубликован: страница серии даёт только диапазон 1–5 т/ч.",
    aliases: ["steam", "оскол стим"],
  },
  {
    id: "oskol-st",
    name: "Oskol St",
    categoryId: "steam",
    kind: "Паровой, жаротрубный, трёхходовой",
    image: "/catalog/steam.jpg",
    summary:
      "Трёхходовой паровой котёл для технологического оборудования (сушильные камеры, пропарка ЖБИ, стерилизация), 1–8 т/ч.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: 1000,
    steamMaxKgH: 8000,
    tempMaxC: 184,
    pressureNote: "10 кгс/см²",
    fuels: [],
    feature: "3 хода, насыщенный пар",
    extra: `${checked} По странице серии: давление 10 кгс/см², температура пара 184 °C. Компенсация теплового расширения, котловая сталь.`,
    sizes: [],
    sizesNote:
      "Полный ряд типоразмеров на сайте не опубликован: страница серии даёт только диапазон 1–8 т/ч.",
    aliases: ["st", "оскол ст"],
  },
  {
    id: "oskol-naruzhnaya",
    name: "Наружная серия Oskol",
    categoryId: "water",
    kind: "Водогрейный, жаротрубный, наружного размещения",
    image: "/catalog/skid.jpg",
    summary:
      "Котлы наружного размещения — готовое решение теплоснабжения вместо блочно-модульной котельной, 0,25–2 МВт.",
    powerMinKw: 250,
    powerMaxKw: 2000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: 115,
    pressureNote: "5 или 6 бар",
    fuels: [],
    feature: "Наружное размещение, встроенная автоматика, без обслуживающего персонала",
    extra: `${checked} По странице серии: температура 95/115 °C, давление 5/6 бар. Корпус из двух соосных обечаек, дымогарные трубы с турболизаторами.`,
    sizes: [],
    sizesNote:
      "Полный ряд типоразмеров на сайте не опубликован: страница серии даёт только диапазон 0,25–2 МВт.",
    aliases: ["oskol наружная", "оскол уличный"],
  },
];

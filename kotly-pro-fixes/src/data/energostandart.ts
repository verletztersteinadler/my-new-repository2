import type { Category, Series } from "@/data/catalog";

const checked =
  "Источник: сайт производителя energo-standart.ru (сверка 28.11.2026). Реестровый домен energo-standart.com закрыт антибот-защитой (KillBot) и не открывается автоматическим запросом; продукция на обоих доменах одна и та же: NOVA, ATOM, ONIX, котельные.";

export const energostandartCategories: Category[] = [
  { id: "steam", title: "Паровые", param: "steam" },
  { id: "water", title: "Водогрейные", param: "power" },
];

export const energostandartDocuments = [
  { title: "Руководство по эксплуатации NOVA" },
  { title: "Руководство по эксплуатации ONIX 10-85" },
];

const steam = (id: string, name: string, kg: number) => ({ id, name, powerKw: null, steamKgH: kg });
const water = (id: string, name: string, kw: number) => ({ id, name, powerKw: kw, steamKgH: null });

const novaRow = [500, 1000, 1500, 2000, 2500, 3000, 4000, 5000];
const atomRow = [3000, 3500, 4000, 5000, 6000, 7000, 8000, 10000];
const onixRow: [string, number][] = [
  ["ONIX-10", 100], ["ONIX-12", 120], ["ONIX-15", 150], ["ONIX-20", 200], ["ONIX-25", 250],
  ["ONIX-30", 300], ["ONIX-35", 350], ["ONIX-40", 400], ["ONIX-50", 500], ["ONIX-60", 600],
  ["ONIX-75", 750], ["ONIX-85", 850], ["ONIX-100", 1000], ["ONIX-120", 1200], ["ONIX-130", 1300],
  ["ONIX-140", 1400], ["ONIX-160", 1600], ["ONIX-180", 1800], ["ONIX-200", 2000], ["ONIX-250", 2500],
  ["ONIX-300", 3000], ["ONIX-350", 3500], ["ONIX-400", 4000], ["ONIX-500", 5000],
];

export const energostandartSeries: Series[] = [
  {
    id: "es-nova",
    name: "NOVA",
    categoryId: "steam",
    kind: "Паровой, жаротрубный, двухходовой",
    image: "/catalog/steam.jpg",
    summary:
      "Серийные двухходовые жаротрубные паровые котлы NOVA 500–5000 кг/ч, рабочее давление 12 или 16 бар, насыщенный пар для промышленности.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: 500,
    steamMaxKgH: 5000,
    tempMaxC: null,
    pressureNote: "12 бар (рабочий диапазон 9–12) или 16 бар (рабочий диапазон 14–16)",
    fuels: ["gas", "diesel", "heavy"],
    feature: "Гофрированная топка у моделей выше 4 т/ч, экономайзер ECO-NOVA опцией, КПД до 95,9 % с ЭКО",
    extra: `${checked} Карточка NOVA-500: полезная мощность 341 кВт, КПД 91,4 % без ЭКО / 95,9 % с ЭКО, топливо природный газ/СУГ/дизель/мазут, объём воды 1120 л, вес 2290 кг (12 бар). Топки NOVA-4000 и NOVA-5000 — гофрированные. Панель PLC 10\" на базе ПР-200 OVEN, продувки COVNA, арматура ADL.`,
    sizes: novaRow.map((kg) => steam(`es-nova-${kg}`, `NOVA-${kg}`, kg)),
    sizesNote:
      "8 типоразмеров, каждый доступен в исполнениях 12 и 16 бар (рабочее давление ниже 9 бар — по запросу).",
    aliases: ["нова", "es нова", "энерго стандарт нова"],
  },
  {
    id: "es-atom",
    name: "ATOM",
    categoryId: "steam",
    kind: "Паровой, жаротрубный, трёхходовой",
    image: "/catalog/steam.jpg",
    summary:
      "Трёхходовые жаротрубные паровые котлы ATOM 3000–10 000 кг/ч, рабочее давление 12 или 16 бар, выпускаются по запросу.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: 3000,
    steamMaxKgH: 10000,
    tempMaxC: 300,
    pressureNote: "12 бар или 16 бар",
    fuels: ["gas", "diesel", "heavy"],
    feature: "Три хода газов, перегретый пар до 300 °C (исполнение ATOM-3000), ЭКО в комплекте",
    extra: `${checked} Карточка ATOM-3000: 3000 кг/ч, 12 бар, температура перегретого пара до 300 °C, с экономайзером. Трёхходовое исполнение производится по запросу (серийно — двухходовое NOVA).`,
    sizes: atomRow.map((kg) => steam(`es-atom-${kg}`, `ATOM-${kg}`, kg)),
    sizesNote:
      "8 типоразмеров, каждый доступен в исполнениях 12 и 16 бар.",
    aliases: ["атом", "es атом", "энерго стандарт атом"],
  },
  {
    id: "es-onix",
    name: "ONIX",
    categoryId: "water",
    kind: "Водогрейный, жаротрубный, двухходовой",
    image: "/catalog/firetube.jpg",
    summary:
      "Двухходовые жаротрубные водогрейные котлы ONIX 100–5000 кВт, рабочее давление 5,5 бар (расчётное 6 бар), вода 50–105 °C.",
    powerMinKw: 100,
    powerMaxKw: 5000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: 105,
    pressureNote: "5,5 бар рабочее / 6 бар расчётное",
    fuels: ["gas", "diesel", "heavy"],
    feature: "Реверсивное развитие факела, турбулизаторы, термостатная или PLC-панель управления",
    extra: `${checked} Карточка ONIX-10: 100 кВт, КПД 90,9 % при номинале / 87,2 % при нагрузке 30 %, диапазон регулирования температуры 50–105 °C, предохранительный термостат 110 °C, дымовые газы 210 °C при полной нагрузке. Топливо: природный газ, дизель, мазут. Модели до ONIX-85 руководством «ONIX 10-85», далее — опросный лист.`,
    sizes: onixRow.map(([name, kw]) => water(`es-onix-${name.toLowerCase()}`, name, kw)),
    sizesNote:
      "24 типоразмера. Текст страницы серии указывает диапазон 100–3500 кВт, а перечень моделей на карточке ONIX-10 продолжается до ONIX-500 (5000 кВт) — в карточку включён полный перечень моделей.",
    aliases: ["оникс", "onix", "энерго стандарт onix"],
  },
];

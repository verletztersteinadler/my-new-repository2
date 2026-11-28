import type { Category, Series } from "@/data/catalog";

const checked =
  "Источник: страницы оборудования thermojet.ru (ЭЛКОН, Московская область; сверка 28.11.2026, сайт открыт). Типоряды взяты из таблиц «Технические характеристики» на страницах серий.";

export const thermojetCategories: Category[] = [
  { id: "steam", title: "Паровые", param: "steam" },
  { id: "water", title: "Водогрейные", param: "power" },
  { id: "air", title: "Воздухонагреватели", param: "power" },
];

export const thermojetDocuments = [
  { title: "Характеристики моделей на страницах серий thermojet.ru" },
  { title: "Отраслевые решения: бетонные заводы, ЖБИ, деревообработка, нефтехранение" },
];

const steam = (id: string, name: string, kg: number) => ({ id, name, powerKw: null, steamKgH: kg });
const power = (id: string, name: string, kw: number) => ({ id, name, powerKw: kw, steamKgH: null });

export const thermojetSeries: Series[] = [
  {
    id: "thermojet-steam",
    name: "THERMOJET Steam",
    categoryId: "steam",
    kind: "Парогенератор низкого давления с системой водоподготовки",
    image: "/catalog/steam.jpg",
    summary:
      "Промышленные парогенераторы THERMOJET Steam 700–2000 кг/ч на газе или дизеле для ЖБИ, бетонных заводов и перекачки нефти; рабочее давление 0,07 МПа.",
    powerMinKw: 490,
    powerMaxKw: 1400,
    steamMinKgH: 700,
    steamMaxKgH: 2000,
    tempMaxC: 115,
    pressureNote: "0,07 МПа",
    fuels: ["gas", "diesel"],
    feature: "Система водоподготовки в базе, мобильные исполнения (Steam 1000/2000 на дизеле)",
    extra: `${checked} По таблице серии: газовые исполнения 490/630/700/1400 кВт при 700/900/1000/2000 кг/ч; расход газа 54–158 м³/ч или ДТ 46–130 л/ч. Мобильные исполнения отмечены звёздочкой (на шасси/раме).`,
    sizes: [700, 900, 1000, 2000].map((kg) => steam(`thermojet-steam-${kg}`, `Steam ${kg}`, kg)),
    sizesNote:
      "4 типоразмера: Steam 700/900/1000/2000 кг/ч (газовые исполнения 490–1400 кВт). Расхождение сайта: в строке дизельного Steam 700 указаны мощность 630 кВт и производительность 900 кг/ч — цифры дизельного исполнения Steam 900; в карточку взяты значения по наименованию моделей.",
    aliases: ["термоджет steam", "элкон парогенератор", "thermojet парогенератор"],
  },
  {
    id: "thermojet-hotwater",
    name: "THERMOJET HotWater",
    categoryId: "water",
    kind: "Водогрейный котёл (стальной)",
    image: "/catalog/firetube.jpg",
    summary:
      "Водогрейные котлы THERMOJET HotWater 250–1000 кВт на газе или дизеле, нагрев воды до 70 °С, для отопления и технологических нужд.",
    powerMinKw: 250,
    powerMaxKw: 1000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: 70,
    pressureNote: null,
    fuels: ["gas", "diesel"],
    feature: "Исполнения на газе и дизеле, применяются в системах HOT AIR + HOT WATER и БМК",
    extra: `${checked} По таблице серии: расход газа 45–154 м³/ч или ДТ 40–140 л/ч, потребляемая электрическая мощность 2–5 кВт. В карточках встречается обозначение двухходовых котлов КВР (THERMOJET 250–1000) — те же типоразмеры.`,
    sizes: [250, 400, 750, 1000].map((kw) => power(`thermojet-hotwater-${kw}`, `HotWater ${kw}`, kw)),
    sizesNote:
      "4 типоразмера: HotWater 250/400/750/1000 кВт, каждый в газовом и дизельном исполнении. Модель 1000 кВт опубликована в таблице серии без отдельной карточки в меню.",
    aliases: ["термоджет hotwater", "элкон водогрейный", "thermojet котёл"],
  },
  {
    id: "thermojet-hotair",
    name: "THERMOJET HotAir",
    categoryId: "air",
    kind: "Теплогенератор (воздухонагреватель)",
    image: "/catalog/web-air.jpg",
    summary:
      "Промышленные теплогенераторы THERMOJET HotAir 350–1000 кВт с нагревом воздуха до 200 °С для воздушного отопления и зимнего бетонирования.",
    powerMinKw: 350,
    powerMaxKw: 1000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: 200,
    pressureNote: "давление воздуха до 7000–8000 Па",
    fuels: ["gas", "diesel"],
    feature: "Воздух до 200 °С, производительность 6000–16 000 м³/ч, газовое и дизельное исполнение",
    extra: `${checked} По таблице серии: расход газа 67–154 м³/ч или ДТ 60–140 л/ч, потребляемая электрическая мощность 24–47 кВт.`,
    sizes: [350, 600, 1000].map((kw) => power(`thermojet-hotair-${kw}`, `HotAir ${kw}`, kw)),
    sizesNote: "3 типоразмера: HotAir 350/600/1000 кВт, каждый в газовом и дизельном исполнении.",
    aliases: ["термоджет hotair", "элкон теплогенератор", "thermojet теплогенератор"],
  },
  {
    id: "thermojet-steamairgas",
    name: "THERMOJET SteamAirGas",
    categoryId: "air",
    kind: "Парогазогенератор (генератор парогазовоздушной смеси)",
    image: "/catalog/web-air.jpg",
    summary:
      "Парогазогенераторы THERMOJET SteamAirGas 500–1500 кВт для пропарки ЖБИ и отопления бетонных заводов: парогазовоздушная смесь до 300 °С при 0,5 бар.",
    powerMinKw: 500,
    powerMaxKw: 1500,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: 300,
    pressureNote: "давление парогазовоздушной смеси 0,5 бар",
    fuels: ["gas", "diesel"],
    feature: "ПГВС до 300 °С, исполнение SteamAirGas 500 с утопленной камерой сгорания",
    extra: `${checked} По таблице серии: расход газа 54–147 м³/ч или ДТ 40–119 л/ч, потребляемая электрическая мощность 22–55 кВт. Отнесён к воздухонагревателям: продукт выдаёт парогазовоздушную смесь, а не пар под давлением.`,
    sizes: [500, 1000, 1500].map((kw) => power(`thermojet-steamairgas-${kw}`, `SteamAirGas ${kw}`, kw)),
    sizesNote: "3 типоразмера: SteamAirGas 500/1000/1500 кВт, каждый в газовом и дизельном исполнении.",
    aliases: ["термоджет steamairgas", "элкон парогазогенератор"],
  },
];

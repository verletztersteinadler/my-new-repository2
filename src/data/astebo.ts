import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страницы astebo.com. Диапазон относится ко всей линейке, не к каждой серии отдельно.";

export const asteboCategories: Category[] = [
  { id: "water", title: "Водогрейные", param: "power" },
  { id: "steam", title: "Паровые", param: "steam" },
];

export const asteboDocuments = [{ title: "Водогрейные и паровые astebo" }];

export const asteboSeries: Series[] = [
  {
    id: "astebo-hw",
    name: "astebo, водогрейные",
    categoryId: "water",
    kind: "Три хода, одна или две жаровые трубы",
    image: "/catalog/firetube.jpg",
    summary: "1–40 МВт. Давление 6, 10, 13 или 16 бар, отдельно до 40 бар.",
    powerMinKw: 1000,
    powerMaxKw: 40000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: "6, 10, 13, 16 бар; особо до 40 бар",
    fuels: ["gas", "diesel"] as FuelId[],
    feature: "aqua 3E, THW-I, THW-IZ выше 120 °C; THW-I-NTE до 120 °C",
    extra: `${checked} Топливо на странице: природный газ, отопительное масло, биогаз и водород. Биогаз и водород в фильтре топлива не выделены. Мощность каждой из четырёх серий страница не делит.`,
    sizes: [],
    sizesNote: "Четыре имени серий без собственных киловатт.",
    aliases: ["thw", "aqua 3e"],
  },
  {
    id: "astebo-steam",
    name: "astebo, паровые",
    categoryId: "steam",
    kind: "Жаротрубный",
    image: "/catalog/steam.jpg",
    summary: "1 000–60 000 кг/ч.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: 1000,
    steamMaxKgH: 60000,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["gas", "diesel"] as FuelId[],
    feature: "TND-U, THD-IZ, THD-IZ Ü, THSD-I, THSD-IE, THD-U, THD-I, THD-I-Ü",
    extra: `${checked} Объект Dunapack — четыре котла THD-IZ и 220 т/ч суммарно. Это поставка, не типоразмер, в ряд не внесена.`,
    sizes: [],
    sizesNote: "Имена серий есть, пар по каждой серии страница не даёт.",
    aliases: ["thd"],
  },
];

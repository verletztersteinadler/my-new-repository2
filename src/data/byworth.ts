import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страницы byworth.co.uk. Бывший котёл с чужого склада в ряд не внесён.";

const fuels: FuelId[] = ["gas", "diesel"];

export const byworthCategories: Category[] = [
  { id: "steam", title: "Паровые", param: "steam" },
  { id: "water", title: "Водогрейные", param: "power" },
];

export const byworthDocuments = [{ title: "Yorkshireman, M-Series и страница продукции" }];

export const byworthSeries: Series[] = [
  {
    id: "byworth-york",
    name: "Byworth Yorkshireman",
    categoryId: "steam",
    kind: "Три хода, мокрая поворотная камера",
    image: "/catalog/steam.jpg",
    summary: "1 000–19 000 кг/ч, рабочее давление до 23 бар.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: 1000,
    steamMaxKgH: 19000,
    tempMaxC: null,
    pressureNote: "до 23 бар",
    fuels,
    feature: "Горелка под топливо объекта",
    extra: checked,
    sizes: [],
    sizesNote: "Именных моделей на странице серии нет.",
    aliases: ["yorkshireman"],
  },
  {
    id: "byworth-m",
    name: "Byworth M-Series",
    categoryId: "steam",
    kind: "Горизонтальный, малый и средний пар",
    image: "/catalog/steam.jpg",
    summary: "От 250 кг/ч. Верх страницы серии не называет. До 13,8 бар.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: 250,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: "до 13,8 бар",
    fuels,
    feature: "Газ, СУГ, СПГ, биогаз, печное топливо",
    extra: `${checked} Порог NOx ниже 100 и 200 мг/м³ относится к котлам от 1 500 кг/ч.`,
    sizes: [],
    sizesNote: null,
    aliases: ["m-series"],
  },
  {
    id: "byworth-hw",
    name: "Byworth, водогрейные",
    categoryId: "water",
    kind: "Промышленный водогрейный",
    image: "/catalog/firetube.jpg",
    summary: "100–10 000 кВт. Имя серии на странице продукции не дано.",
    powerMinKw: 100,
    powerMaxKw: 10000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels,
    feature: "100–10 000 кВт",
    extra: `${checked} Общий пар завода на той же странице — 125–19 000 кг/ч. Это не нижняя граница Yorkshireman.`,
    sizes: [],
    sizesNote: "Peaksman и утилизаторы названы без цифр и не вынесены.",
    aliases: [],
  },
];

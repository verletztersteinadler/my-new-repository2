import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Aalborg Energie Technik.";

export const aetCategories: Category[] = [{ id: "block", title: "Котловые блоки", param: "power" }];

export const aetDocuments = [{ title: "Открытая страница котла AET" }];

export const aetSeries: Series[] = [
  {
    id: "aet-biomass",
    name: "AET Biomass Boiler",
    categoryId: "block",
    kind: "Биомассовый котёл для ТЭС и ТЭЦ",
    image: "/catalog/solid.jpg",
    summary: "На главной завода диапазон установок 25–170 МВт тепл. Отдельных моделей нет.",
    powerMinKw: 25000,
    powerMaxKw: 170000,
    powerNote: "25–170 МВт тепл.",
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["solid"] as FuelId[],
    feature: "Биомасса",
    extra: `${checked} Главная пишет «25 to 170 MWth» для котельных, электростанций и ТЭЦ. На странице технологии назван пример 49 МВт и топливо: древесные остатки, солома, мискантус, кукуруза. Это не список типоразмеров.`,
    sizes: [],
    sizesNote: "Типоразмеры на открытых страницах не разложены.",
    aliases: ["aet", "aalborg energie"],
  },
];

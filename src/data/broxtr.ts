import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. brox.com.tr. Это турецкий BROX, не российский BROX с broxboiler.ru.";

export const broxtrCategories: Category[] = [{ id: "auto", title: "Горелки", param: "none" }];

export const broxtrDocuments = [{ title: "Ротационная двухтопливная горелка" }];

export const broxtrSeries: Series[] = [
  {
    id: "broxtr-rotary",
    name: "BROX, ротационная двухтопливная",
    categoryId: "auto",
    kind: "Горелка, газ и мазут",
    image: "/catalog/cabinet.jpg",
    summary: "500–15 000 кВт. Температура 800–1 800 °C.",
    powerMinKw: 500,
    powerMaxKw: 15000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: 1800,
    pressureNote: null,
    fuels: ["gas", "heavy"] as FuelId[],
    feature: "500–15 000 кВт",
    extra: `${checked} Паровые, водогрейные и термомасляные котлы на главной названы без мощности и в карточки не вынесены.`,
    sizes: [],
    sizesNote: "Ряд моделей на странице не разложен.",
    aliases: ["rotary"],
  },
];

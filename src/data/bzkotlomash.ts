import type { Category, FuelId, Series, Size } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страница КВ-ГМ на bzkotlomash.ru. Имена КВГМ-30, 50, 100 и 180 есть, их мегаватты в обрыве таблицы не прочитаны.";

const rows: [string, number][] = [
  ["КВ-ГМ 1,25-115", 1250],
  ["КВ-ГМ 2,5-115", 2500],
  ["КВ-ГМ 3,5-115", 3500],
  ["КВ-ГМ 4,4-115", 4400],
  ["КВ-ГМ-4,65-150", 4650],
  ["КВ-ГМ-4,65-115", 4650],
  ["КВ-ГМ-7,56-150", 7560],
  ["КВ-ГМ-10-150", 11630],
  ["КВ-ГМ-20-150", 23260],
];

export const bzkotlomashCategories: Category[] = [{ id: "water", title: "Водогрейные", param: "power" }];
export const bzkotlomashDocuments = [{ title: "КВ-ГМ" }];
export const bzkotlomashSeries: Series[] = [
  {
    id: "bzk-kvgm",
    name: "Котломаш КВ-ГМ",
    categoryId: "water",
    kind: "Водотрубный, газ и мазут",
    image: "/catalog/waterpipe.jpg",
    summary: "Прочитанные размеры 1,25–23,26 МВт.",
    powerMinKw: 1250,
    powerMaxKw: 23260,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: 150,
    pressureNote: "1–1,56 МПа только у группы 4,65–7,56",
    fuels: ["gas", "heavy"] as FuelId[],
    feature: "Часть карточек только на 115 °C",
    extra: checked,
    sizes: rows.map(([name, powerKw]): Size => ({ id: `bzk-${name}`, name, powerKw, steamKgH: null })),
    sizesNote: "11,63 и 23,26 МВт пересчитаны со страницы из 10 и 20 Гкал/ч.",
    aliases: ["кв-гм"],
  },
];

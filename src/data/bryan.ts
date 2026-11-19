import type { Category, FuelId, Series, Size } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страница CLM на bryanboilers.com и таблица Quick Selection, пар при 15 psi на газе. Фунты/ч переведены в кг/ч.";

function steamSize(name: string, lbH: number): Size {
  return { id: `bryan-${name.toLowerCase()}`, name, powerKw: null, steamKgH: Math.round(lbH * 0.453592) };
}

export const bryanCategories: Category[] = [{ id: "steam", title: "Паровые", param: "steam" }];

export const bryanDocuments = [{ title: "CLM, AB и RV" }];

export const bryanSeries: Series[] = [
  {
    id: "bryan-clm",
    name: "Bryan CLM",
    categoryId: "steam",
    kind: "Наддув, вода или пар. Серия снята",
    image: "/catalog/firetube.jpg",
    summary: "Подвод 1 200–3 000 MBH. Выход 29–73 BHP. В кг/ч страница не переводит.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["gas", "diesel"] as FuelId[],
    feature: "Снята с производства",
    extra: `${checked} Киловатты подвода в мощность карточки не поставлены: это input, не выход.`,
    sizes: [],
    sizesNote: "Имена CLM90–CLM300 есть на странице, их фунты пара в извлечении нет.",
    aliases: ["clm"],
  },
  {
    id: "bryan-ab",
    name: "Bryan AB",
    categoryId: "steam",
    kind: "Пар 15 psi, газ",
    image: "/catalog/steam.jpg",
    summary: "Пять моделей, 341–947 кг/ч по колонке газа.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: 341,
    steamMaxKgH: 947,
    tempMaxC: null,
    pressureNote: "15 psi в заголовке таблицы",
    fuels: ["gas"],
    feature: "AB-90 … AB-250",
    extra: `${checked} Строка AB-300 в таблице не сходится: 2 460 MBH и 3 093 фунта/ч. Она не внесена.`,
    sizes: [steamSize("AB-90", 752), steamSize("AB-120", 1002), steamSize("AB-150", 1253), steamSize("AB-200", 1670), steamSize("AB-250", 2088)],
    sizesNote: "Колонка масла не копировалась.",
    aliases: ["ab"],
  },
  {
    id: "bryan-rv",
    name: "Bryan RV",
    categoryId: "steam",
    kind: "Пар 15 psi, газ",
    image: "/catalog/steam.jpg",
    summary: "Восемь моделей, 1 275–2 914 кг/ч по колонке газа.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: 1275,
    steamMaxKgH: 2914,
    tempMaxC: null,
    pressureNote: "15 psi в заголовке таблицы",
    fuels: ["gas"],
    feature: "RV-350 … RV-800",
    extra: `${checked} Другое руководство даёт иные фунты для RV350-S. В карточке оставлена таблица Quick Selection.`,
    sizes: [
      steamSize("RV-350", 2811),
      steamSize("RV-400", 3212),
      steamSize("RV-450", 3614),
      steamSize("RV-500", 4015),
      steamSize("RV-550", 4417),
      steamSize("RV-600", 4819),
      steamSize("RV-700", 5622),
      steamSize("RV-800", 6425),
    ],
    sizesNote: null,
    aliases: ["rv"],
  },
];

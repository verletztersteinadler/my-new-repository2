import type { Category, FuelId, Series, Size } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Подбор горелок cibunigas.com. В размер поставлен верх диапазона. Список обрывается на URB50: страница может идти дальше.";

const urb: [string, number, number][] = [
  ["URB5", 1167, 7000],
  ["URB10", 1700, 10200],
  ["URB-SH15", 3300, 15000],
  ["URB15", 2567, 15400],
  ["URB20", 2983, 17900],
  ["URB-SH20", 4000, 20000],
  ["URB25", 3783, 22700],
  ["URB-SH25", 5500, 25000],
  ["URB-SH30", 6600, 30000],
  ["URB30", 5050, 30300],
  ["URB32", 5333, 33200],
  ["URB-SH35", 7700, 35000],
  ["URB35", 5967, 35800],
  ["URB-SH40", 8800, 40000],
  ["URB40", 6917, 41500],
  ["URB-SH45", 10000, 45000],
  ["URB45", 7750, 46500],
  ["URB-SH50", 11100, 50000],
  ["URB50", 8500, 51000],
];

export const unigasCategories: Category[] = [{ id: "auto", title: "Горелки", param: "none" }];

export const unigasDocuments = [{ title: "URB и P61" }];

export const unigasSeries: Series[] = [
  {
    id: "unigas-urb",
    name: "CIB UNIGAS URB",
    categoryId: "auto",
    kind: "Горелка, газ и лёгкое масло",
    image: "/catalog/cabinet.jpg",
    summary: "От 1 167 до 51 000 кВт по прочитанным моделям.",
    powerMinKw: 1167,
    powerMaxKw: 51000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["gas", "diesel"] as FuelId[],
    feature: "1 167–51 000 кВт",
    extra: checked,
    sizes: urb.map(
      ([name, , max]): Size => ({ id: `unigas-${name.toLowerCase()}`, name, powerKw: max, steamKgH: null }),
    ),
    sizesNote: "В размере верх диапазона. Нижняя граница есть на странице и в подпись размера не вошла.",
    aliases: ["urb"],
  },
  {
    id: "unigas-p61",
    name: "CIB UNIGAS P61",
    categoryId: "auto",
    kind: "Горелка, газ",
    image: "/catalog/cabinet.jpg",
    summary: "160–800 кВт. Варианты отличаются рампой, не мощностью.",
    powerMinKw: 160,
    powerMaxKw: 800,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["gas"],
    feature: "160–800 кВт",
    extra: `${checked} СУГ и биогаз на странице — по запросу, в ряд не внесены.`,
    sizes: [],
    sizesNote: null,
    aliases: ["p61", "tecnopress"],
  },
];

import type { Category, FuelId, Series, Size } from "@/data/catalog";

const checked = "Сверка 16.11.2026. AB&CO, TT BOILERS, Копенгаген.";

function steam(id: string, name: string, kg: number): Size {
  return { id, name, powerKw: null, steamKgH: kg };
}

export const abcoCategories: Category[] = [{ id: "steam", title: "Паровые", param: "steam" }];

export const abcoDocuments = [{ title: "Открытые страницы TT BOILERS" }];

export const abcoSeries: Series[] = [
  {
    id: "abco-hp",
    name: "TT BOILERS, высокое давление",
    categoryId: "steam",
    kind: "Водотрубный, газ, жидкое топливо или электричество",
    image: "/catalog/waterpipe.jpg",
    summary: "70–2 000 кг/ч, рабочее давление 20–190 бар.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: 70,
    steamMaxKgH: 2000,
    tempMaxC: null,
    pressureNote: "20–190 бар",
    fuels: ["gas", "diesel", "heavy"] as FuelId[],
    feature: "DT(HP), DTM(HP), DH(HP), DH2(HP)",
    extra: `${checked} Страница высокого давления: газ, СУГ, биогаз, лёгкое и тяжёлое жидкое топливо, а также электрические DH(HP) и DH2(HP). Электрические исполнения в фильтре топлива не выделены.`,
    sizes: [],
    sizesNote: "Ряд типоразмеров на этой странице не расписан.",
    aliases: ["tt boilers", "abco"],
  },
  {
    id: "abco-compact",
    name: "TT BOILERS, компактные генераторы",
    categoryId: "steam",
    kind: "Водотрубный парогенератор",
    image: "/catalog/vertical.jpg",
    summary: "На обзорной странице 70–3 000 кг/ч и 3–190 бар. В таблице ниже только полностью прочитанные строки.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: 70,
    steamMaxKgH: 3000,
    tempMaxC: null,
    pressureNote: "3–190 бар",
    fuels: ["gas", "diesel", "heavy"] as FuelId[],
    feature: "Вертикальные до 1 500 кг/ч, горизонтальные DT и DTM",
    extra: `${checked} Таблица компактных генераторов на странице обрывается на строке DT 1500. Неполные строки в список не вошли.`,
    sizes: [
      steam("abco-dtm-125", "DTM 125", 125),
      steam("abco-dt-300-100", "DT 300/100", 100),
      steam("abco-dt-300-150", "DT 300/150", 150),
      steam("abco-dt-300-300", "DT 300/300", 300),
      steam("abco-dt-300-400", "DT 300/400", 400),
      steam("abco-dt-600-700", "DT 600/700", 700),
      steam("abco-dt-1000-800", "DT 1000/800", 800),
      steam("abco-dt-1000-1000", "DT 1000/1000", 1000),
      steam("abco-dt-1000-1200", "DT 1000/1200", 1200),
    ],
    sizesNote: "Строка DT 1500 в открытом фрагменте таблицы не закончена и не добавлена.",
    aliases: ["dt", "dtm"],
  },
  {
    id: "abco-classic",
    name: "TT BOILERS, классический жаротрубный",
    categoryId: "steam",
    kind: "Жаротрубный, три хода",
    image: "/catalog/firetube.jpg",
    summary: "Крупные — до 5 000 кг/ч при 1–20 бар. Меньшие, обратное пламя — 125–400 кг/ч.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: 125,
    steamMaxKgH: 5000,
    tempMaxC: null,
    pressureNote: "1–20 бар, на обзоре серии до 30 бар",
    fuels: ["gas", "diesel", "heavy"] as FuelId[],
    feature: "Три хода или обратное пламя",
    extra: `${checked} Обзор пишет 80–5 000 кг/ч и 0–30 бар. Ниже на той же странице крупные котлы ограничены 5 000 кг/ч и 1–20 бар, малые — 125–400 кг/ч. Нижняя граница карточки взята из малого ряда, не из строки «80».`,
    sizes: [],
    sizesNote: "Полный ряд STANDARD на странице есть, в эту карточку типоразмеры не переносились.",
    aliases: ["classic"],
  },
];

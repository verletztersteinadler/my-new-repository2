import type { Category, FuelId, Series } from "@/data/catalog";

const checked =
  "Сверка 28.11.2026, absolutaire.com (AbsolutAire, Inc., США). Промышленные воздухонагреватели прямого и непрямого нагрева для складов, производств, ангаров: H-Series (HTLV, высокотемпературный низкоскоростной обогрев), R-Series (прямой нагрев с вентиляцией), I-Series (непрямой нагрев), V-Series (приточный make-up air). AA-Series, S-Series, Fan Boxes, Door Heaters и Burner Boxes вне карточки. Модельные сетки в литературе производителя; таблицы ряда на страницах серий нет.";

export const absolutaireCategories: Category[] = [{ id: "air", title: "Воздухонагреватели", param: "power" }];

export const absolutaireDocuments = [{ title: "AbsolutAire, Inc." }];

function series(id: string, name: string, kind: string, summary: string, feature: string, extraNote: string): Series {
  return {
    id,
    name,
    categoryId: "air",
    kind,
    image: "/catalog/web-air.jpg",
    summary,
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["gas"] as FuelId[],
    feature,
    extra: checked + " " + extraNote,
    sizes: [],
    sizesNote: "Таблица типоразмеров на странице серии не опубликована.",
    aliases: [],
  };
}

export const absolutaireSeries: Series[] = [
  series(
    "absolutaire-h",
    "H-Series HTLV",
    "Газовый, HTLV space heating",
    "Расход 800–54 000 CFM, до 7 600 MBH (около 2,2 МВт).",
    "800–54 000 CFM, до 7 600 MBH",
    "H-Series: высокотемпературный низкоскоростной обогрев (HTLV) для складов, дистрибуционных центров, производств и ангаров; выравнивание температуры без холодных зон. Возможны газ, LP, а также электрический, паровой и водяной нагрев.",
  ),
  series(
    "absolutaire-r",
    "R-Series",
    "Газовый, прямого нагрева",
    "Прямой нагрев с вентиляцией (heating and ventilating).",
    "Цифры ряда не сняты",
    "R-Series: системы прямого нагрева с вентиляцией; акцент производителя на качество воздуха (IAQ) и энергоэффективность.",
  ),
  series(
    "absolutaire-i",
    "I-Series",
    "Газовый, непрямого нагрева",
    "Непрямой нагрев с вентиляцией (heat and ventilating).",
    "Цифры ряда не сняты",
    "I-Series: непрямого нагрева, теплообменник отделяет продукты сгорания от приточного воздуха.",
  ),
  series(
    "absolutaire-v",
    "V-Series",
    "Газовый, приточная установка",
    "Приточные системы прямого нагрева (make-up air).",
    "Цифры ряда не сняты",
    "V-Series: приточные установки прямого нагрева для компенсации вытяжки.",
  ),
];

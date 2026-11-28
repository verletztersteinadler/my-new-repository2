import type { Category, FuelId, Series } from "@/data/catalog";

const checked =
  "Сверка 28.11.2026, enggazprom.com (ООО «ИнжГазПром», Москва, ул. 2-я Кабельная, 2, стр. 3). Заявлено производство: газовые воздухонагреватели, теплообменные модули, горелки «Сибирь PREMIX», приточные установки. Калориферы, сушильные камеры, руфтопы и монтаж — вне карточки. Подстраницы каталога на дату сверки отдавали 404, таблицы ряда не сняты.";

export const enggazpromCategories: Category[] = [{ id: "air", title: "Воздухонагреватели", param: "power" }];

export const enggazpromDocuments = [{ title: "ООО «ИнжГазПром»" }];

function series(id: string, name: string, kind: string, feature: string, extraNote: string): Series {
  return {
    id,
    name,
    categoryId: "air",
    kind,
    image: "/catalog/web-air.jpg",
    summary: "Таблица ряда на витрине не опубликована.",
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
    sizesNote: null,
    aliases: [],
  };
}

export const enggazpromSeries: Series[] = [
  series(
    "enggazprom-vn",
    "Воздухонагреватели промышленные газовые",
    "Газовый",
    "Цифры ряда не сняты",
    "Раздел каталога с подразделами: высокотемпературные, смесительные, рекуперативные воздухонагреватели.",
  ),
  series(
    "enggazprom-teplogenerator",
    "Воздушные теплогенераторы",
    "Газовый",
    "Цифры ряда не сняты",
    "Промышленные газовые теплогенераторы и теплообменные модули.",
  ),
  series(
    "enggazprom-pvu",
    "Газовые приточные установки (ПВУ)",
    "Газовый, приточная установка",
    "Цифры ряда не сняты",
    "Приточно-вытяжные установки на газовом и дизельном топливе.",
  ),
];

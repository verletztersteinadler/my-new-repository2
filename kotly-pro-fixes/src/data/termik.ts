import type { Category, FuelId, Series } from "@/data/catalog";

const checked =
  "Сверка 28.11.2026, termik18.ru (ООО «Термик», Ижевск, ул. Новоажимова, 23В). Воздухонагреватели для воздушного отопления цехов, складов, сельскохозяйственных и коммунальных зданий. Котлы КВГ, мобильное отопление, вентиляторные модули ВМКЦ и электродвигатели вне карточки. Источники: termik18.ru/type/vozduhonagrevateli-rekuperativnye и termik18.ru/type/vozduhonagrevateli-smesitelnye.";

export const termikCategories: Category[] = [{ id: "air", title: "Воздухонагреватели", param: "power" }];

export const termikDocuments = [{ title: "ООО «Термик», Ижевск" }];

function row(id: string, name: string, powerKw: number) {
  return { id, name, powerKw, steamKgH: null };
}

export const termikSeries: Series[] = [
  {
    id: "termik-tg-rekuperativnye",
    name: "Воздухонагреватели ТГ рекуперативные",
    categoryId: "air",
    kind: "Газовый, рекуперативный",
    image: "/catalog/web-air.jpg",
    summary: "30–500 кВт, 9 типоразмеров.",
    powerMinKw: 30,
    powerMaxKw: 500,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["gas"] as FuelId[],
    feature: "Каталог завода: ТГ-30–ТГ-500",
    extra: checked,
    sizes: [
      row("termik-tg-30", "ТГ-30", 30),
      row("termik-tg-50", "ТГ-50", 50),
      row("termik-tg-100", "ТГ-100", 100),
      row("termik-tg-150", "ТГ-150", 150),
      row("termik-tg-200", "ТГ-200", 200),
      row("termik-tg-250", "ТГ-250", 250),
      row("termik-tg-300", "ТГ-300", 300),
      row("termik-tg-400", "ТГ-400", 400),
      row("termik-tg-500", "ТГ-500", 500),
    ],
    sizesNote: "Мощность принята из обозначения модели (ТГ-100 — 100 кВт); таблица ряда на витрине завода не читается парсером.",
    aliases: ["термик", "тг"],
  },
  {
    id: "termik-tg-smesitelnye",
    name: "Воздухонагреватели ТГ смесительные",
    categoryId: "air",
    kind: "Газовый, смесительный (прямого нагрева)",
    image: "/catalog/web-air.jpg",
    summary: "Раздел смесительных воздухонагревателей; таблица ряда не разделена.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["gas"] as FuelId[],
    feature: "Цифры ряда не сняты",
    extra: checked + " В разделе смесительных перечислены те же обозначения ТГ-30–ТГ-500, что и в рекуперативных; отдельной таблицы ряда нет.",
    sizes: [],
    sizesNote: "Обозначения те же ТГ-30–ТГ-500; таблица мощностей в разделе не опубликована.",
    aliases: ["смесительные"],
  },
];

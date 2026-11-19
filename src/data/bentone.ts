import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Сайт bentone.com в эту выгрузку не открылся. Цифра STG взята из карточки серии на отраслевом каталоге, не из таблицы моделей завода.";

export const bentoneCategories: Category[] = [{ id: "auto", title: "Горелки", param: "none" }];

export const bentoneDocuments = [{ title: "Карточка STG" }];

export const bentoneSeries: Series[] = [
  {
    id: "bentone-stg",
    name: "Bentone STG",
    categoryId: "auto",
    kind: "Газовая горелка",
    image: "/catalog/cabinet.jpg",
    summary: "В карточке серии — исполнения до 144 кВт.",
    powerMinKw: null,
    powerMaxKw: 144,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["gas"] as FuelId[],
    feature: "до 144 кВт",
    extra: `${checked} Диапазон BG 56–3 200 кВт встречался только у продавца и не перенесён.`,
    sizes: [],
    sizesNote: "Именных моделей в этой карточке нет.",
    aliases: ["stg"],
  },
];

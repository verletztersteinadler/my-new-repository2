import type { Category, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Главная termanik.ru. Индукционные котлы названы без киловатт и не внесены.";

export const termanikCategories: Category[] = [{ id: "water", title: "Водогрейные", param: "power" }];
export const termanikDocuments = [{ title: "ГВС Терманик" }];
export const termanikSeries: Series[] = [
  {
    id: "termanik-dhw",
    name: "Терманик, узлы ГВС",
    categoryId: "water",
    kind: "Накопительный или проточный",
    image: "/catalog/cabinet.jpg",
    summary: "10–750 кВт.",
    powerMinKw: 10,
    powerMaxKw: 750,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: [],
    feature: "Горячее водоснабжение",
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: [],
  },
];

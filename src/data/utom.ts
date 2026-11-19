import type { Category, FuelId, Series, Size } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Карточка ТВД 400 на utomprom.ru. В одной карточке выход 95 °C и отдельно «до 110».";

export const utomCategories: Category[] = [{ id: "water", title: "Водогрейные", param: "power" }];
export const utomDocuments = [{ title: "ТВД 400" }];
export const utomSeries: Series[] = [
  {
    id: "utom-400",
    name: "Ютом Пром ТВД 400",
    categoryId: "water",
    kind: "На раме",
    image: "/catalog/skid.jpg",
    summary: "400 кВт. Природный или сжиженный газ.",
    powerMinKw: 400,
    powerMaxKw: 400,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["gas"] as FuelId[],
    feature: "Выход 95 °C и отдельно до 110 °C",
    extra: checked,
    sizes: [{ id: "utom-400", name: "ТВД 400", powerKw: 400, steamKgH: null }],
    sizesNote: null,
    aliases: [],
  },
];

import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страница WM monarch на weishaupt.co.uk. Одно имя имеет разные киловатты в ULN, PLN, 3LN и 4LN, поэтому размеры не разложены.";

export const weishauptCategories: Category[] = [{ id: "auto", title: "Горелки", param: "none" }];
export const weishauptDocuments = [{ title: "WM monarch" }];
export const weishauptSeries: Series[] = [
  {
    id: "weishaupt-wm",
    name: "Weishaupt WM monarch",
    categoryId: "auto",
    kind: "Газовая горелка",
    image: "/catalog/cabinet.jpg",
    summary: "55–12 000 кВт на всю серию.",
    powerMinKw: 55,
    powerMaxKw: 12000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["gas"] as FuelId[],
    feature: "Газ. Масляные исполнения на этой странице не разобраны",
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: ["wm"],
  },
];

import type { Category, Series, Size } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Каталог Winterwarm, страница WWH. Ряд 10–80 кВт. Киловатты прочитаны только у WWH 350.";

export const winterwarmCategories: Category[] = [{ id: "air", title: "Воздухонагреватели", param: "power" }];
export const winterwarmDocuments = [{ title: "WWH" }];
export const winterwarmSeries: Series[] = [
  {
    id: "wwh",
    name: "Winterwarm WWH",
    categoryId: "air",
    kind: "Водяной воздухонагреватель",
    image: "/catalog/web-air.jpg",
    summary: "10–80 кВт, семь типоразмеров.",
    powerMinKw: 10,
    powerMaxKw: 80,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: [],
    feature: "Тепло от воды, не пар",
    extra: checked,
    sizes: [{ id: "wwh-350", name: "WWH 350", powerKw: 48.2, steamKgH: null }],
    sizesNote: "48,2 кВт при воде 90/70 °C.",
    aliases: ["wwh"],
  },
];

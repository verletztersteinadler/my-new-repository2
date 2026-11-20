import type { Category, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Лист электрических нагревателей Reznor. Это воздухонагреватели, не котлы.";

function line(id: string, name: string, min: number, max: number): Series {
  return {
    id,
    name,
    categoryId: "air",
    kind: "Электрический воздухонагреватель",
    image: "/catalog/web-air.jpg",
    summary: `${min}–${max} кВт.`,
    powerMinKw: min,
    powerMaxKw: max,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: [],
    feature: "Электрический",
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: [],
  };
}

export const reznorCategories: Category[] = [{ id: "air", title: "Воздухонагреватели", param: "power" }];
export const reznorDocuments = [{ title: "Электрические Reznor" }];
export const reznorSeries: Series[] = [
  line("reznor-egeb", "Reznor EGEB", 3, 20),
  line("reznor-eghb", "Reznor EGHB", 2, 60),
  line("reznor-exub", "Reznor EXUB", 5, 30),
  line("reznor-ewhb", "Reznor EWHB", 3, 38),
];

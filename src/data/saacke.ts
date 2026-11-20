import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Лист SAACKE. У TEMINOX колонки в извлечении не разобраны и в ряд не внесены.";

function line(id: string, name: string, min: number, max: number): Series {
  return {
    id,
    name,
    categoryId: "auto",
    kind: "Промышленная горелка",
    image: "/catalog/cabinet.jpg",
    summary: `${min}–${max} МВт.`,
    powerMinKw: min * 1000,
    powerMaxKw: max * 1000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["gas", "diesel", "heavy"] as FuelId[],
    feature: `${min}–${max} МВт`,
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: [],
  };
}

export const saackeCategories: Category[] = [{ id: "auto", title: "Горелки", param: "none" }];
export const saackeDocuments = [{ title: "ROTONOX и SSB" }];
export const saackeSeries: Series[] = [
  line("saacke-roto", "SAACKE ROTONOX", 1.5, 90),
  line("saacke-ssb", "SAACKE SSB", 3, 28),
];

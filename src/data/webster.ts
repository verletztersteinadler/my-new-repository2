import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страница HDR-RF на webstercombustion.com. BTU/ч и BHP в киловатты не переведены.";

export const websterCategories: Category[] = [{ id: "auto", title: "Горелки", param: "none" }];
export const websterDocuments = [{ title: "HDR-RF" }];
export const websterSeries: Series[] = [
  {
    id: "webster-hdr",
    name: "Webster HDR-RF",
    categoryId: "auto",
    kind: "Регистровая горелка",
    image: "/catalog/cabinet.jpg",
    summary: "До 200 000 000 BTU/ч и до 2 600 BHP.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["gas", "diesel", "heavy"] as FuelId[],
    feature: "46 040–200 000 MBH максимум у стандартного исполнения",
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: ["hdr"],
  },
];

import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Лист R1-V-L Giersch, август 2024. Это один ряд, не весь каталог.";

export const gierschCategories: Category[] = [{ id: "auto", title: "Горелки", param: "none" }];
export const gierschDocuments = [{ title: "R1" }];
export const gierschSeries: Series[] = [
  {
    id: "giersch-r1",
    name: "Giersch R1",
    categoryId: "auto",
    kind: "Жидкотопливная горелка",
    image: "/catalog/cabinet.jpg",
    summary: "R1-BHR 14–53 кВт. R1-V-BHR 12–53 кВт.",
    powerMinKw: 12,
    powerMaxKw: 53,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["diesel"] as FuelId[],
    feature: "12–53 кВт",
    extra: checked,
    sizes: [],
    sizesNote: "Таблица настройки форсунок не разложена.",
    aliases: ["r1"],
  },
];

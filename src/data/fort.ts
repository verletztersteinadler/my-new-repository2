import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Каталог ФОРТ. Ясно прочитана фраза 8–60 кВт. Числа рядом с именами моделей в извлечении не совпали с колонками и в размеры не внесены.";

export const fortCategories: Category[] = [{ id: "air", title: "Воздухонагреватели", param: "power" }];
export const fortDocuments = [{ title: "ФОРТ" }];
export const fortSeries: Series[] = [
  {
    id: "fort",
    name: "ФОРТ",
    categoryId: "air",
    kind: "Газовый",
    image: "/catalog/web-air.jpg",
    summary: "8–60 кВт.",
    powerMinKw: 8,
    powerMaxKw: 60,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["gas"] as FuelId[],
    feature: "Линейки МАКС, ЭКО, КУЛЬТО и ТЕХНО названы без отдельных киловатт",
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: [],
  },
];

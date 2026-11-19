import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страница Series J на johnstonboiler.com. Это горелка к котлу, не весь каталог котлов.";

export const johnstonCategories: Category[] = [{ id: "auto", title: "Горелки", param: "none" }];
export const johnstonDocuments = [{ title: "Series J" }];
export const johnstonSeries: Series[] = [
  {
    id: "johnston-j",
    name: "Johnston Series J",
    categoryId: "auto",
    kind: "Горелка к жаротрубному или водотрубному котлу",
    image: "/catalog/cabinet.jpg",
    summary: "50–80 HP. Пар 1 500–2 800 фунтов/ч.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: Math.round(1500 * 0.453592),
    steamMaxKgH: Math.round(2800 * 0.453592),
    tempMaxC: null,
    pressureNote: null,
    fuels: ["gas", "diesel"] as FuelId[],
    feature: "Газ, масло или оба",
    extra: checked,
    sizes: [],
    sizesNote: "Фунты/ч переведены в кг/ч.",
    aliases: [],
  },
];

import type { Category, FuelId, Series, Size } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страница GAS low NOx FGR на fbr.it. Пары TC и TL с одной мощностью сведены в один размер. Другие семейства FBR в эту поставку не разложены.";

const models: [string, number][] = [
  ["GAS XP60", 551], ["GAS P 100", 900], ["GAS P 150", 1511], ["GAS P 190", 2209], ["GAS P 250", 2694],
  ["GAS P 300", 3273], ["GAS P 350", 4070], ["GAS P 450", 5232], ["GAS P 550", 5830], ["GAS P 750", 8200],
  ["GAS P 1000", 11000], ["GAS P 1800", 17442],
];

export const fbrCategories: Category[] = [{ id: "auto", title: "Горелки", param: "none" }];
export const fbrDocuments = [{ title: "GAS low NOx FGR" }];
export const fbrSeries: Series[] = [
  {
    id: "fbr-fgr",
    name: "FBR GAS, low NOx FGR",
    categoryId: "auto",
    kind: "Газовая горелка с рециркуляцией",
    image: "/catalog/cabinet.jpg",
    summary: "Верх прочитанных моделей 551–17 442 кВт.",
    powerMinKw: 551,
    powerMaxKw: 17442,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["gas"] as FuelId[],
    feature: "NOx ниже 30 мг/кВт·ч по странице",
    extra: checked,
    sizes: models.map(([name, powerKw]): Size => ({ id: `fbr-${name.toLowerCase().replace(/\s+/g, "-")}`, name, powerKw, steamKgH: null })),
    sizesNote: "В размере верх. Нижняя граница на странице двойная и в размер не внесена.",
    aliases: ["fgr"],
  },
];

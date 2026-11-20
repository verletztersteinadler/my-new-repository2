import type { Category, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Шапка vutherm.com. Это граница сайта, не таблица моделей.";

export const vuthermCategories: Category[] = [{ id: "water", title: "Водогрейные", param: "power" }];
export const vuthermDocuments = [{ title: "Шапка VUTHERM" }];
export const vuthermSeries: Series[] = [
  {
    id: "vutherm",
    name: "VUTHERM",
    categoryId: "water",
    kind: "По шапке сайта",
    image: "/catalog/firetube.jpg",
    summary: "100–15 000 кВт. До 115 °C и 16 бар.",
    powerMinKw: 100,
    powerMaxKw: 15000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: 115,
    pressureNote: "до 16 бар",
    fuels: [],
    feature: "Топливо в шапке не названо",
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: [],
  },
];

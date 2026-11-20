import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Карточка Crest на lochinvar.com. BTU/ч — вход, в киловатты не переведены.";

export const lochinvarCategories: Category[] = [{ id: "water", title: "Водогрейные", param: "power" }];
export const lochinvarDocuments = [{ title: "Crest" }];
export const lochinvarSeries: Series[] = [
  {
    id: "lochinvar-crest",
    name: "Lochinvar Crest",
    categoryId: "water",
    kind: "Конденсационный",
    image: "/catalog/floor-cond.jpg",
    summary: "Список максимумов 750 000–6 000 000 BTU/ч. У FBN2001 вход 80 000–1 999 000 BTU/ч.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["gas"] as FuelId[],
    feature: "750 000–6 000 000 BTU/ч на входе",
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: ["crest"],
  },
];

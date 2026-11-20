import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 17.11.2026. Страница жаротрубных водогрейных bkza.ru. Давление и температура на ней не указаны. Паровой раздел в эту карточку не переносился.";

export const bkzaCategories: Category[] = [{ id: "water", title: "Водогрейные", param: "power" }];
export const bkzaDocuments = [{ title: "Жаротрубные водогрейные" }];
export const bkzaSeries: Series[] = [
  {
    id: "bkza-ft",
    name: "БКЗА, жаротрубные водогрейные",
    categoryId: "water",
    kind: "Жаротрубный",
    image: "/catalog/firetube.jpg",
    summary: "0,1–4 МВт.",
    powerMinKw: 100,
    powerMaxKw: 4000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["solid", "gas", "heavy", "diesel"] as FuelId[],
    feature: "Уголь, дрова, газ, мазут, дизель",
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: ["бкза"],
  },
];

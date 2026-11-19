import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Главная fako.pl. Экономизеры E — не котлы и не внесены.";

export const fakoCategories: Category[] = [
  { id: "water", title: "Водогрейные", param: "power" },
  { id: "steam", title: "Паровые", param: "steam" },
];
export const fakoDocuments = [{ title: "Границы FAKO" }];
export const fakoSeries: Series[] = [
  {
    id: "fako-w",
    name: "FAKO, водогрейные",
    categoryId: "water",
    kind: "Промышленный",
    image: "/catalog/firetube.jpg",
    summary: "100–15 000 кВт.",
    powerMinKw: 100,
    powerMaxKw: 15000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["solid", "gas", "diesel"] as FuelId[],
    feature: "Твёрдое и жидкое топливо",
    extra: checked,
    sizes: [],
    sizesNote: "Именного ряда нет.",
    aliases: ["fako"],
  },
  {
    id: "fako-s",
    name: "FAKO, паровые",
    categoryId: "steam",
    kind: "Промышленный",
    image: "/catalog/steam.jpg",
    summary: "120–22 000 кг/ч, рабочее давление до 35 бар.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: 120,
    steamMaxKgH: 22000,
    tempMaxC: null,
    pressureNote: "до 35 бар",
    fuels: ["solid", "gas", "diesel"],
    feature: "Твёрдое и жидкое топливо",
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: [],
  },
];

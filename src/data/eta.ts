import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Брошюры ETA на eta.co.at. Старые руководства HACK 2013–2018 в действующий ряд не внесены.";

export const etaCategories: Category[] = [{ id: "water", title: "Водогрейные", param: "power" }];
export const etaDocuments = [{ title: "eHACK и HACK VR" }];
export const etaSeries: Series[] = [
  {
    id: "eta-ehack",
    name: "ETA eHACK",
    categoryId: "water",
    kind: "Щепа или пеллеты",
    image: "/catalog/solid.jpg",
    summary: "20–240 кВт.",
    powerMinKw: 20,
    powerMaxKw: 240,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["solid"] as FuelId[],
    feature: "Щепа или пеллеты",
    extra: checked,
    sizes: [],
    sizesNote: "Руководства делят 20–50, 60–80, 100–130, 140–170 и 180–240 кВт. Это не отдельные мощности.",
    aliases: ["ehack"],
  },
  {
    id: "eta-vr",
    name: "ETA HACK VR",
    categoryId: "water",
    kind: "Щепа или пеллеты",
    image: "/catalog/solid.jpg",
    summary: "250–500 кВт.",
    powerMinKw: 250,
    powerMaxKw: 500,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["solid"],
    feature: "Щепа или пеллеты",
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: ["hack vr"],
  },
];

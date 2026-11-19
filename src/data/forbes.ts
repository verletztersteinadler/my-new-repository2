import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Карточка Marshall C на forbesmarshall.com. Поставка 2×6 т/ч в Малайзии — объект, не типоразмер.";

export const forbesCategories: Category[] = [{ id: "steam", title: "Паровые", param: "steam" }];
export const forbesDocuments = [{ title: "Marshall C" }];
export const forbesSeries: Series[] = [
  {
    id: "forbes-c",
    name: "Forbes Marshall C",
    categoryId: "steam",
    kind: "Три хода, мокрая поворотная камера",
    image: "/catalog/steam.jpg",
    summary: "6 300–25 000 кг/ч. Давление 10,5 / 14,5 / 17,5 кг/см².",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: 6300,
    steamMaxKgH: 25000,
    tempMaxC: null,
    pressureNote: "10,5 / 14,5 / 17,5 кг/см²",
    fuels: ["gas", "diesel", "heavy"] as FuelId[],
    feature: "Дизель, печное топливо, газ, СУГ",
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: ["marshall c"],
  },
];

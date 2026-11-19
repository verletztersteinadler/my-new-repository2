import type { Category, FuelId, Series, Size } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Карточка ДЕ-25-14ГМ-О на sibkotlomash.ru. Остальной каталог не разобран.";

export const sibkotlomashCategories: Category[] = [{ id: "steam", title: "Паровые", param: "steam" }];
export const sibkotlomashDocuments = [{ title: "ДЕ-25-14ГМ-О" }];
export const sibkotlomashSeries: Series[] = [
  {
    id: "sib-de25",
    name: "Сибкотломаш ДЕ-25-14ГМ-О",
    categoryId: "steam",
    kind: "Газ и жидкое топливо",
    image: "/catalog/steam.jpg",
    summary: "25 т/ч. 1,3 МПа, насыщенный пар 194 °C.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: 25000,
    steamMaxKgH: 25000,
    tempMaxC: 194,
    pressureNote: "1,3 МПа",
    fuels: ["gas", "heavy"] as FuelId[],
    feature: "Газ и жидкое топливо",
    extra: checked,
    sizes: [{ id: "sib-de25", name: "ДЕ-25-14ГМ-О", powerKw: null, steamKgH: 25000 }],
    sizesNote: null,
    aliases: ["де-25"],
  },
];

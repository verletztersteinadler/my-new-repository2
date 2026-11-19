import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Карточка TRYSUHR на unicalboiler.com. В реестре завод записан как Wiesberg.";

export const unicalCategories: Category[] = [{ id: "water", title: "Водогрейные", param: "power" }];
export const unicalDocuments = [{ title: "TRYSUHR" }];
export const unicalSeries: Series[] = [
  {
    id: "unical-try",
    name: "Unical TRYSUHR",
    categoryId: "water",
    kind: "Перегретая вода, три хода",
    image: "/catalog/firetube.jpg",
    summary: "1 200–18 000 кВт. До 10 бар, выше по запросу.",
    powerMinKw: 1200,
    powerMaxKw: 18000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: "до 10 бар",
    fuels: ["gas", "diesel"] as FuelId[],
    feature: "Жидкое или газообразное топливо",
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: ["trysuhr"],
  },
];

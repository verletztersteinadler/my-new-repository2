import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Карточка Arrowhead на superiorboiler.com. Остальные котлы Superior на этой странице не разобраны. HP в киловатты не переведены.";

export const superiorCategories: Category[] = [{ id: "steam", title: "Паровые", param: "steam" }];
export const superiorDocuments = [{ title: "Arrowhead" }];
export const superiorSeries: Series[] = [
  {
    id: "superior-arrow",
    name: "Superior Arrowhead",
    categoryId: "steam",
    kind: "Три хода, топка-бокс",
    image: "/catalog/firetube.jpg",
    summary: "10–100 HP. Пар от 15 psi, вода от 30 psi.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: "пар от 15 psi",
    fuels: ["gas", "diesel"] as FuelId[],
    feature: "10–100 HP. Водород назван отдельно",
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: ["arrowhead"],
  },
];

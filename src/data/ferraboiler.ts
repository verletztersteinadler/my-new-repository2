import type { Category, FuelId, Series, Size } from "@/data/catalog";

const checked = "Сверка 17.11.2026. Страница водогрейных ferraboiler.kz. Три типоразмера. Паровая и термомасляная серии на этой странице не открыты.";

export const ferraboilerCategories: Category[] = [{ id: "water", title: "Водогрейные", param: "power" }];
export const ferraboilerDocuments = [{ title: "Водогрейные FB" }];
export const ferraboilerSeries: Series[] = [
  {
    id: "ferra-fb",
    name: "Ferra FB",
    categoryId: "water",
    kind: "Водогрейный",
    image: "/catalog/firetube.jpg",
    summary: "0,75, 1,5 и 2,5 МВт. 0,6 МПа.",
    powerMinKw: 750,
    powerMaxKw: 2500,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: "0,6 МПа",
    fuels: ["gas", "diesel"] as FuelId[],
    feature: "Газ или дизель",
    extra: checked,
    sizes: [
      { id: "fb-750", name: "FB-750", powerKw: 750, steamKgH: null },
      { id: "fb-1500", name: "FB-1500", powerKw: 1500, steamKgH: null },
      { id: "fb-2500", name: "FB-2500", powerKw: 2500, steamKgH: null },
    ] as Size[],
    sizesNote: null,
    aliases: ["fb"],
  },
];

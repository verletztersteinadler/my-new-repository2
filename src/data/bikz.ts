import type { Category, FuelId, Series, Size } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Новость bikz.ru о котле Е-75-3,9-440ГМ. Это одна поставка, не каталог.";

export const bikzCategories: Category[] = [{ id: "steam", title: "Паровые", param: "steam" }];
export const bikzDocuments = [{ title: "Е-75" }];
export const bikzSeries: Series[] = [
  {
    id: "bikz-75",
    name: "ЭнергоСтройДеталь Е-75-3,9-440ГМ",
    categoryId: "steam",
    kind: "Водотрубный",
    image: "/catalog/waterpipe.jpg",
    summary: "75 т/ч. 3,9 МПа, 440 °C.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: 75000,
    steamMaxKgH: 75000,
    tempMaxC: 440,
    pressureNote: "3,9 МПа",
    fuels: ["gas", "heavy"] as FuelId[],
    feature: "Три горелки по 20 МВт. Газ или мазут",
    extra: checked,
    sizes: [{ id: "bikz-75", name: "Е-75-3,9-440ГМ", powerKw: null, steamKgH: 75000 }],
    sizesNote: null,
    aliases: [],
  },
];

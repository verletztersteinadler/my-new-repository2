import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Карточка TITAN M на macchiboiler.it.";

export const macchiCategories: Category[] = [{ id: "steam", title: "Паровые", param: "steam" }];
export const macchiDocuments = [{ title: "TITAN M" }];
export const macchiSeries: Series[] = [
  {
    id: "macchi-titan",
    name: "MACCHI TITAN M",
    categoryId: "steam",
    kind: "Пакетный, тип D, два барабана",
    image: "/catalog/waterpipe.jpg",
    summary: "До 270 т/ч. До 110 бар и 520 °C.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: null,
    steamMaxKgH: 270000,
    tempMaxC: 520,
    pressureNote: "до 110 бар",
    fuels: ["gas", "diesel", "heavy"] as FuelId[],
    feature: "Газ, масло, сырая нефть",
    extra: checked,
    sizes: [],
    sizesNote: "Нижняя граница не названа.",
    aliases: ["titan"],
  },
];

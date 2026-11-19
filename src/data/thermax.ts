import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Карточка AFBC на thermaxglobal.com.";

export const thermaxCategories: Category[] = [{ id: "steam", title: "Паровые", param: "steam" }];
export const thermaxDocuments = [{ title: "AFBC" }];
export const thermaxSeries: Series[] = [
  {
    id: "thermax-afbc",
    name: "Thermax AFBC",
    categoryId: "steam",
    kind: "Кипящий слой",
    image: "/catalog/waterpipe.jpg",
    summary: "До 400 т/ч. До 140 кг/см² и 560 °C.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: null,
    steamMaxKgH: 400000,
    tempMaxC: 560,
    pressureNote: "до 140 кг/см²",
    fuels: ["solid"] as FuelId[],
    feature: "Уголь, лигнит, биомасса и отходы по карточке",
    extra: checked,
    sizes: [],
    sizesNote: "Нижняя граница не названа.",
    aliases: ["afbc"],
  },
];

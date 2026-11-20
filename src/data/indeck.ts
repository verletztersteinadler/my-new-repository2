import type { Category, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Библиотека indeck.com. Это названия брошюр мобильных котельных, не таблица пара.";

export const indeckCategories: Category[] = [{ id: "steam", title: "Паровые", param: "steam" }];
export const indeckDocuments = [{ title: "Мобильные котельные" }];
export const indeckSeries: Series[] = [
  {
    id: "indeck-mobile",
    name: "Indeck, мобильные котельные",
    categoryId: "steam",
    kind: "Мобильная котельная",
    image: "/catalog/skid.jpg",
    summary: "В списке брошюр: 250, 300, 800 и 1 000 HP.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: [],
    feature: "250, 300, 800 и 1 000 HP",
    extra: checked,
    sizes: [],
    sizesNote: "Лошадиные силы не переведены в кг/ч.",
    aliases: [],
  },
];

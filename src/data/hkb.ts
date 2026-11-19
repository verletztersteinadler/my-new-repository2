import type { Category, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страница водотрубных hkbboiler.com.";

export const hkbCategories: Category[] = [{ id: "steam", title: "Паровые", param: "steam" }];
export const hkbDocuments = [{ title: "Водотрубные HKB" }];
export const hkbSeries: Series[] = [
  {
    id: "hkb-wt",
    name: "HKB, водотрубные",
    categoryId: "steam",
    kind: "Один барабан, угловые трубы",
    image: "/catalog/waterpipe.jpg",
    summary: "5–120 т/ч, 0,5–120 бар. С пароперегревателем около 500 °C.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: 5000,
    steamMaxKgH: 120000,
    tempMaxC: 500,
    pressureNote: "0,5–120 бар",
    fuels: [],
    feature: "Пар или горячая вода. Топливо страница не называет",
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: ["hkb"],
  },
];

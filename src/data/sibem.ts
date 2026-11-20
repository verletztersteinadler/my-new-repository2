import type { Category, FuelId, Series, Size } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Карточка Е-420-13,8-560ГМН на sibem-bkz.ru. Это один котёл.";

export const sibemCategories: Category[] = [{ id: "steam", title: "Паровые", param: "steam" }];
export const sibemDocuments = [{ title: "Е-420" }];
export const sibemSeries: Series[] = [
  {
    id: "sibem-420",
    name: "Сибэнергомаш Е-420-13,8-560ГМН",
    categoryId: "steam",
    kind: "Водотрубный, П-образный",
    image: "/catalog/waterpipe.jpg",
    summary: "420 т/ч. 13,8 МПа, 560 °C.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: 420000,
    steamMaxKgH: 420000,
    tempMaxC: 560,
    pressureNote: "13,8 МПа",
    fuels: ["gas", "heavy"] as FuelId[],
    feature: "Газ или мазут",
    extra: checked,
    sizes: [{ id: "sibem-420", name: "Е-420-13,8-560ГМН", powerKw: null, steamKgH: 420000 }],
    sizesNote: null,
    aliases: [],
  },
];

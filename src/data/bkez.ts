import type { Category, FuelId, Series, Size } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Карточка Е-1,0-0,9 на bkez.ru. Остальной каталог не разобран.";

export const bkezCategories: Category[] = [{ id: "steam", title: "Паровые", param: "steam" }];
export const bkezDocuments = [{ title: "Е-1,0-0,9" }];
export const bkezSeries: Series[] = [
  {
    id: "bkez-e1",
    name: "БКЗ Е-1,0-0,9",
    categoryId: "steam",
    kind: "Вертикальный, два барабана",
    image: "/catalog/solid.jpg",
    summary: "1 т/ч. 0,8 МПа, 170 °C.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: 1000,
    steamMaxKgH: 1000,
    tempMaxC: 170,
    pressureNote: "0,8 МПа",
    fuels: ["solid"] as FuelId[],
    feature: "Твёрдое топливо, ручная топка",
    extra: checked,
    sizes: [{ id: "bkez-e1", name: "Е-1,0-0,9", powerKw: null, steamKgH: 1000 }],
    sizesNote: null,
    aliases: ["е-1/9"],
  },
];

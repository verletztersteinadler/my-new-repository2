import type { Category, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страница утилизаторов rentechboilers.com. Килограммы уже даны заводом. Плюс в «182 000+» значит верх не закрыт.";

export const rentechCategories: Category[] = [{ id: "steam", title: "Паровые", param: "steam" }];
export const rentechDocuments = [{ title: "Утилизаторы RENTECH" }];
export const rentechSeries: Series[] = [
  {
    id: "rentech-whb",
    name: "RENTECH, утилизатор",
    categoryId: "steam",
    kind: "Водотрубный или жаротрубный",
    image: "/catalog/skid.jpg",
    summary: "Пар от 4 500 кг/ч. Верх написан как 182 000+ кг/ч.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: 4500,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: "14–105+ бар",
    fuels: [],
    feature: "Дымовые газы 22 000–450 000+ кг/ч",
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: [],
  },
];

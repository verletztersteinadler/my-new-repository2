import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страницы пара на газе и биомассе en.isimek.com.tr.";

export const isimekCategories: Category[] = [{ id: "steam", title: "Паровые", param: "steam" }];
export const isimekDocuments = [{ title: "Пар ISIMEK" }];
export const isimekSeries: Series[] = [
  {
    id: "isimek-gas",
    name: "ISIMEK, жидкое и газовое топливо",
    categoryId: "steam",
    kind: "Три хода",
    image: "/catalog/steam.jpg",
    summary: "До 20 000 кг/ч. Нижняя граница не названа.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: null,
    steamMaxKgH: 20000,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["gas", "diesel", "heavy"] as FuelId[],
    feature: "КПД не ниже 92%",
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: [],
  },
  {
    id: "isimek-bio",
    name: "ISIMEK, биомасса",
    categoryId: "steam",
    kind: "Жаротрубный или водотрубный",
    image: "/catalog/solid.jpg",
    summary: "500–40 000 кг/ч. Другая строка той же страницы: до 50 т/ч и выше.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: 500,
    steamMaxKgH: 40000,
    tempMaxC: null,
    pressureNote: "3–30 бар",
    fuels: ["solid"],
    feature: "Верх 40 000 кг/ч — явный диапазон. «50 т/ч и выше» потолка не задаёт",
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: [],
  },
];

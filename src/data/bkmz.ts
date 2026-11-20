import type { Category, FuelId, Series, Size } from "@/data/catalog";

const checked = "Сверка 17.11.2026. Страница промышленных водогрейных bkmz.ru. Давление на странице не указано.";
const powers = [250, 500, 630, 1000, 1500, 2000, 2500, 3000, 4000];

export const bkmzCategories: Category[] = [{ id: "water", title: "Водогрейные", param: "power" }];
export const bkmzDocuments = [{ title: "КСВа" }];
export const bkmzSeries: Series[] = [
  {
    id: "bkmz-ksva",
    name: "БКМЗ КСВа",
    categoryId: "water",
    kind: "Промышленный водогрейный",
    image: "/catalog/firetube.jpg",
    summary: "0,25–4 МВт.",
    powerMinKw: 250,
    powerMaxKw: 4000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["gas", "diesel", "furnace"] as FuelId[],
    feature: "Природный газ, сжиженный газ, дизель, печное",
    extra: checked,
    sizes: powers.map((powerKw) => ({ id: `ksva-${powerKw}`, name: `КСВа ${powerKw / 1000}`.replace(".", ","), powerKw, steamKgH: null })) as Size[],
    sizesNote: "0,25 / 0,5 / 0,63 / 1 / 1,5 / 2 / 2,5 / 3 / 4 МВт.",
    aliases: ["ксва"],
  },
];

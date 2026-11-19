import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страница соломенной установки linkaenergy.com. 160 °C и 10 бар названы примером и в давление не записаны.";

export const linkaCategories: Category[] = [{ id: "water", title: "Водогрейные", param: "power" }];
export const linkaDocuments = [{ title: "Солома Linka" }];
export const linkaSeries: Series[] = [
  {
    id: "linka-h",
    name: "Linka H, солома",
    categoryId: "water",
    kind: "Мобильная, три или пять ходов",
    image: "/catalog/skid.jpg",
    summary: "250–5 000 кВт. Стандарт: 4 бар и 110 °C.",
    powerMinKw: 250,
    powerMaxKw: 5000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: 110,
    pressureNote: "4 бар в стандарте",
    fuels: ["solid"] as FuelId[],
    feature: "Солома",
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: [],
  },
];

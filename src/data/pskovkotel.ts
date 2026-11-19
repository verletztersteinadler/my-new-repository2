import type { Category, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Главная pskovkotel.ru. Шапка «до 80 МВт». Другая фраза: от 0,25 кВт до 80 мВт. Низ ряда из-за этого не записан.";

export const pskovkotelCategories: Category[] = [{ id: "water", title: "Водогрейные", param: "power" }];
export const pskovkotelDocuments = [{ title: "ПКЗ" }];
export const pskovkotelSeries: Series[] = [
  {
    id: "pskov",
    name: "Псковский котельный завод",
    categoryId: "water",
    kind: "Водогрейный",
    image: "/catalog/waterpipe.jpg",
    summary: "До 80 МВт. Больше 70 типоразмеров.",
    powerMinKw: null,
    powerMaxKw: 80000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: [],
    feature: "КПД выше 94% по тексту страницы",
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: [],
  },
];

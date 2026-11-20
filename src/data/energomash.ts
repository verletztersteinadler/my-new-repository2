import type { Category, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страница паровых средней мощности energomash.ru. Отдельная фраза о специализации 10–160 т/ч не заменяет четыре группы выше.";

function line(id: string, name: string, min: number, max: number, pressure: string, feature: string, temp: number | null): Series {
  return {
    id,
    name,
    categoryId: "steam",
    kind: feature,
    image: "/catalog/waterpipe.jpg",
    summary: `${min}–${max} т/ч. ${pressure}.`,
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: min * 1000,
    steamMaxKgH: max * 1000,
    tempMaxC: temp,
    pressureNote: pressure,
    fuels: [],
    feature,
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: [],
  };
}

export const energomashCategories: Category[] = [{ id: "steam", title: "Паровые", param: "steam" }];
export const energomashDocuments = [{ title: "Паровые БЗЭМ" }];
export const energomashSeries: Series[] = [
  line("bem-low", "БЗЭМ, низкое давление", 0.16, 1, "0,88 МПа", "Насыщенный пар, питательная вода 50 °C", null),
  line("bem-mid", "БЗЭМ, 1,36 МПа", 2.5, 160, "1,36 МПа", "Насыщенный или слабо перегретый, вода 105 °C", null),
  line("bem-24", "БЗЭМ, 2,36 МПа", 50, 160, "2,36 МПа", "Насыщенный или слабо перегретый, вода 105 °C", null),
  line("bem-hp", "БЗЭМ, высокое давление", 220, 820, "9,8 МПа", "Перегретый пар, питательная вода 215 °C", 540),
];

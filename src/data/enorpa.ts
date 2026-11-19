import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страница водогрейных enorpa.com. ккал/ч переведены как 860 ккал/ч = 1 кВт.";

function kcal(id: string, name: string, minKcal: number, maxKcal: number, fuels: FuelId[], feature: string, pressure: string | null): Series {
  return {
    id,
    name,
    categoryId: "water",
    kind: "Водогрейный",
    image: fuels.includes("solid") ? "/catalog/solid.jpg" : "/catalog/firetube.jpg",
    summary: `${minKcal.toLocaleString("ru-RU")}–${maxKcal.toLocaleString("ru-RU")} ккал/ч.`,
    powerMinKw: Math.round(minKcal / 860),
    powerMaxKw: Math.round(maxKcal / 860),
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: pressure,
    fuels,
    feature,
    extra: checked,
    sizes: [],
    sizesNote: "Киловатты посчитаны из ккал/ч, кроме Akuamarin: там страница уже пишет кВт.",
    aliases: [],
  };
}

export const enorpaCategories: Category[] = [{ id: "water", title: "Водогрейные", param: "power" }];
export const enorpaDocuments = [{ title: "Водогрейные Enorpa" }];
export const enorpaSeries: Series[] = [
  kcal("enorpa-oniks", "Enorpa Oniks", 3_000_000, 6_000_000, ["solid"], "Уголь. На другой части страницы ещё пеллета и жмых. 3 бар", "3 бар"),
  kcal("enorpa-obs", "Enorpa Obsidyen", 1_750_000, 6_000_000, ["solid", "gas", "diesel"], "Несколько топлив", null),
  {
    ...kcal("enorpa-aku", "Enorpa Akuamarin", 75, 20_000, ["gas", "diesel"], "75–20 000 кВт, страница уже в кВт", null),
    powerMinKw: 75,
    powerMaxKw: 20000,
    summary: "75–20 000 кВт.",
    sizesNote: "Перевод из ккал не нужен.",
  },
  kcal("enorpa-ame", "Enorpa Ametist", 500_000, 5_000_000, ["solid"], "Твёрдое топливо", null),
  kcal("enorpa-tur", "Enorpa Turkuaz", 300_000, 1_750_000, ["solid"], "Твёрдое топливо", null),
  kcal("enorpa-kal", "Enorpa Kalsedon", 1_500_000, 3_500_000, ["solid"], "Твёрдое топливо", null),
];

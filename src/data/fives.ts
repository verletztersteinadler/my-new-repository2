import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страницы EcoFornax и Magna-Flame на fivesgroup.com. 1 MMBtu/ч принято как 293 кВт.";

function burner(id: string, name: string, summary: string, min: number | null, max: number | null, feature: string): Series {
  return {
    id,
    name,
    categoryId: "auto",
    kind: "Промышленная горелка",
    image: "/catalog/cabinet.jpg",
    summary,
    powerMinKw: min,
    powerMaxKw: max,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["gas"] as FuelId[],
    feature,
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: [],
  };
}

export const fivesCategories: Category[] = [{ id: "auto", title: "Горелки", param: "none" }];
export const fivesDocuments = [{ title: "EcoFornax и Magna-Flame" }];
export const fivesSeries: Series[] = [
  burner("fives-slex", "Fives EcoFornax SLEx", "0,6–18,6 MMBtu/ч.", 176, 5451, "Камера до 1 204 °C"),
  burner("fives-lex", "Fives EcoFornax LEx", "До 400 MMBtu/ч. Нижняя граница не названа.", null, 117200, "До 400 MMBtu/ч"),
  burner("fives-le", "Fives EcoFornax LE", "До 250 MMBtu/ч.", null, 73250, "До 250 MMBtu/ч"),
  burner("fives-lni", "Fives Magna-Flame LNI", "От 3 MMBtu/ч и выше 40. Верх не зафиксирован.", 879, null, "От 3 до свыше 40 MMBtu/ч"),
];

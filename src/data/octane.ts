import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страница «О предприятии» octane.su.";

function water(id: string, name: string, min: number, max: number, fuels: FuelId[], feature: string): Series {
  return {
    id,
    name,
    categoryId: "water",
    kind: feature,
    image: fuels.includes("solid") ? "/catalog/solid.jpg" : "/catalog/firetube.jpg",
    summary: `${min.toLocaleString("ru-RU")}–${max.toLocaleString("ru-RU")} кВт.`,
    powerMinKw: min,
    powerMaxKw: max,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels,
    feature,
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: [],
  };
}

export const octaneCategories: Category[] = [{ id: "water", title: "Водогрейные", param: "power" }];
export const octaneDocuments = [{ title: "КВСА и КВВ" }];
export const octaneSeries: Series[] = [
  water("octane-kvsa", "Октан КВСА", 100, 15000, ["gas", "diesel", "heavy"], "Также сырая нефть"),
  water("octane-kvzh", "Октан КВЖ", 80, 300, ["gas", "solid"], "Газ и уголь"),
  water("octane-kvv", "Октан КВВ", 600, 1000, ["gas", "solid"], "Два размера: 0,6 и 1,0 МВт"),
  water("octane-tshp", "Октан КВВ Тшп", 1000, 3000, ["solid"], "Уголь"),
];

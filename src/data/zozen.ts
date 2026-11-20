import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страница мощностей en.zozen.com. Фильтр сайта 0,7–21 МВт в ряды не внесён. Объекты не внесены.";

function steam(id: string, name: string, min: number, max: number, pressure: string | null, fuels: FuelId[], feature: string): Series {
  return {
    id,
    name,
    categoryId: "steam",
    kind: feature,
    image: feature.includes("слой") ? "/catalog/waterpipe.jpg" : "/catalog/steam.jpg",
    summary: pressure ? `${min}–${max} т/ч. ${pressure}.` : `${min}–${max} т/ч.`,
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: min * 1000,
    steamMaxKgH: max * 1000,
    tempMaxC: null,
    pressureNote: pressure,
    fuels,
    feature,
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: [],
  };
}

export const zozenCategories: Category[] = [{ id: "steam", title: "Паровые", param: "steam" }];
export const zozenDocuments = [{ title: "Ряды ZOZEN" }];
export const zozenSeries: Series[] = [
  steam("zozen-wns", "ZOZEN WNS", 1, 20, "0,7–2 МПа", ["gas", "diesel"], "Газ или масло"),
  steam("zozen-dzl", "ZOZEN DZL", 2, 20, "1–2,5 МПа", ["solid"], "Биомасса"),
  steam("zozen-szs", "ZOZEN SZS", 20, 110, "1,25–5,3 МПа", ["gas"], "Газ"),
  steam("zozen-szl", "ZOZEN SZL", 4, 35, "1–2,5 МПа", ["solid"], "Уголь"),
  steam("zozen-shx", "ZOZEN SHX", 10, 100, null, ["solid"], "Циркулирующий кипящий слой"),
];

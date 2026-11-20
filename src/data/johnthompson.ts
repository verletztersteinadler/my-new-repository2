import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страница «The Boiler and Steam Specialist» johnthompson.co.za. Утилизатор без цифры не внесён.";

function line(id: string, name: string, maxT: number, pressure: string, temp: number | null, fuels: FuelId[], feature: string): Series {
  return {
    id,
    name,
    categoryId: "steam",
    kind: feature,
    image: id.includes("ft") ? "/catalog/firetube.jpg" : "/catalog/waterpipe.jpg",
    summary: `До ${maxT} т/ч.`,
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: null,
    steamMaxKgH: maxT * 1000,
    tempMaxC: temp,
    pressureNote: pressure,
    fuels,
    feature,
    extra: checked,
    sizes: [],
    sizesNote: "Нижняя граница не названа.",
    aliases: [],
  };
}

export const johnthompsonCategories: Category[] = [{ id: "steam", title: "Паровые", param: "steam" }];
export const johnthompsonDocuments = [{ title: "Границы John Thompson" }];
export const johnthompsonSeries: Series[] = [
  line("jt-wt-f", "John Thompson, водотрубные, ископаемое топливо", 200, "110 бар", 540, ["solid", "gas", "diesel"], "Водотрубный"),
  line("jt-wt-b", "John Thompson, водотрубные, биомасса", 350, "110 бар", 540, ["solid"], "Водотрубный"),
  line("jt-ft", "John Thompson, жаротрубные", 40, "32 бар", null, ["solid", "gas", "diesel", "heavy"], "Уголь, биомасса, масло, газ, дрова"),
];

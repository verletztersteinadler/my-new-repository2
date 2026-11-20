import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Карточка GX на icicaldaie.com.";

function steam(id: string, name: string, min: number, max: number, feature: string, powerMin: number | null, powerMax: number | null): Series {
  return {
    id,
    name,
    categoryId: "steam",
    kind: "Три хода",
    image: "/catalog/steam.jpg",
    summary: `${min.toLocaleString("ru-RU")}–${max.toLocaleString("ru-RU")} кг/ч.`,
    powerMinKw: powerMin,
    powerMaxKw: powerMax,
    steamMinKgH: min,
    steamMaxKgH: max,
    tempMaxC: null,
    pressureNote: "12 или 15 бар",
    fuels: ["gas", "diesel"] as FuelId[],
    feature,
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: [],
  };
}

export const iciCategories: Category[] = [{ id: "steam", title: "Паровые", param: "steam" }];
export const iciDocuments = [{ title: "GX" }];
export const iciSeries: Series[] = [
  steam("ici-gx", "ICI GX", 1700, 32000, "1 163–17 442 кВт", 1163, 17442),
  steam("ici-gxs", "ICI GX S", 1700, 25000, "С перегревом", null, null),
  steam("ici-gxc", "ICI GX C", 1700, 25000, "Топка. Утилизация отдельно 100–5 000 кг/ч", null, null),
];

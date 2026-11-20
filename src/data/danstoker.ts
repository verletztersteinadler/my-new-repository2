import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Таблица danstoker.com, масло и газ. Точки в числах — разделители тысяч.";
const fuels: FuelId[] = ["gas", "diesel", "heavy"];

function row(id: string, name: string, cat: "steam" | "water", steamMin: number | null, steamMax: number | null, powerMin: number | null, powerMax: number | null, pressure: string, temp: number | null): Series {
  return {
    id,
    name,
    categoryId: cat,
    kind: cat === "steam" ? "Жаротрубный, масло или газ" : "Водогрейный, масло или газ",
    image: cat === "steam" ? "/catalog/steam.jpg" : "/catalog/firetube.jpg",
    summary: steamMax ? `${steamMin?.toLocaleString("ru-RU")}–${steamMax.toLocaleString("ru-RU")} кг/ч` : `${powerMin?.toLocaleString("ru-RU")}–${powerMax?.toLocaleString("ru-RU")} кВт`,
    powerMinKw: powerMin,
    powerMaxKw: powerMax,
    steamMinKgH: steamMin,
    steamMaxKgH: steamMax,
    tempMaxC: temp,
    pressureNote: pressure,
    fuels,
    feature: pressure,
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: [],
  };
}

export const danstokerCategories: Category[] = [
  { id: "steam", title: "Паровые", param: "steam" },
  { id: "water", title: "Водогрейные", param: "power" },
];
export const danstokerDocuments = [{ title: "Масло и газ Danstoker" }];
export const danstokerSeries: Series[] = [
  row("dan-tdl", "Danstoker TDL", "steam", 630, 4000, 420, 2600, "0,7–1 бар", null),
  row("dan-opti", "Danstoker OPTI", "steam", 1000, 34000, 650, 22000, "8–20 бар, до 36", null),
  row("dan-twin", "Danstoker OPTI-TWIN", "steam", 20000, 68000, 13000, 44000, "8–20 бар, до 36", null),
  row("dan-global", "Danstoker GLOBAL", "water", null, null, 1000, 10000, "4–10 бар", 110),
  row("dan-globalh", "Danstoker GLOBAL-H", "water", null, null, 1000, 10000, "4–16 бар, до 32", 240),
  row("dan-tvb", "Danstoker TVB", "water", null, null, 12000, 25000, "4–10 бар", 110),
  row("dan-tvbh", "Danstoker TVB-H", "water", null, null, 12000, 22000, "4–32 бар", 240),
  row("dan-tvbt", "Danstoker TVB-TWIN", "water", null, null, 22000, 44000, "4–32 бар", 240),
  row("dan-combo", "Danstoker COMBO", "steam", 5000, 55000, 3000, 50000, "до 40 бар", 400),
];

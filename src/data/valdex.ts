import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 17.11.2026. Раздел котлов valdex-thermotechnica.com. Давление и температура на списке серий не указаны.";
const fuel = ["gas", "diesel"] as FuelId[];

export const valdexCategories: Category[] = [
  { id: "water", title: "Водогрейные", param: "power" },
  { id: "steam", title: "Паровые", param: "steam" },
];
export const valdexDocuments = [{ title: "Серии M" }];
export const valdexSeries: Series[] = [
  row("m2n", "VALDEX M2N", "water", "0,1–2 МВт", 100, 2000, null, null),
  row("m2a", "VALDEX M2A", "water", "0,4–3 МВт", 400, 3000, null, null),
  row("m2b", "VALDEX M2B", "water", "2,3–8 МВт", 2300, 8000, null, null),
  row("m3a", "VALDEX M3A", "water", "3,5–16,5 МВт", 3500, 16500, null, null),
  row("m3b", "VALDEX M3B", "water", "8–20 МВт", 8000, 20000, null, null),
  row("m2s", "VALDEX M2S", "steam", "1–5,4 т/ч", null, null, 1000, 5400),
  row("m3s", "VALDEX M3S", "steam", "6,4–16 т/ч", null, null, 6400, 16000),
];

function row(
  id: string,
  name: string,
  kind: "water" | "steam",
  summary: string,
  powerMinKw: number | null,
  powerMaxKw: number | null,
  steamMinKgH: number | null,
  steamMaxKgH: number | null,
): Series {
  return {
    id: `valdex-${id}`,
    name,
    categoryId: kind,
    kind: kind === "steam" ? "Паровой" : "Водогрейный",
    image: kind === "steam" ? "/catalog/vertical.jpg" : "/catalog/firetube.jpg",
    summary,
    powerMinKw,
    powerMaxKw,
    steamMinKgH,
    steamMaxKgH,
    tempMaxC: null,
    pressureNote: null,
    fuels: fuel,
    feature: "Газ или дизель",
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: [id],
  };
}

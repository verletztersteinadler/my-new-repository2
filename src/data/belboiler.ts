import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Каталог belboiler.by. Серия ВА-Ц названа без киловатт и не внесена.";

function water(id: string, name: string, min: number, max: number, temp: number | null, pressure: string | null, fuels: FuelId[], feature: string): Series {
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
    tempMaxC: temp,
    pressureNote: pressure,
    fuels,
    feature,
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: [],
  };
}

export const belboilerCategories: Category[] = [
  { id: "water", title: "Водогрейные", param: "power" },
  { id: "steam", title: "Паровые", param: "steam" },
];
export const belboilerDocuments = [{ title: "Каталог Белкотломаш" }];
export const belboilerSeries: Series[] = [
  water("bb-ft", "Белкотломаш, жаротрубные до 2 МВт", 100, 1900, null, null, ["gas", "diesel"], "Газ и жидкое топливо"),
  water("bb-kvgm", "Белкотломаш КВ-ГМ", 500, 6500, 115, "0,6 и 1,0 МПа", ["gas", "diesel", "heavy"], "Выход 95 или 115 °C"),
  water("bb-kvr", "Белкотломаш КВ-Р", 300, 1000, 95, "0,6 МПа", ["solid"], "Дрова и кусковой торф"),
  {
    id: "bb-steam",
    name: "Белкотломаш, пар на твёрдом топливе",
    categoryId: "steam",
    kind: "Твёрдое топливо",
    image: "/catalog/solid.jpg",
    summary: "2,5–10 т/ч.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: 2500,
    steamMaxKgH: 10000,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["solid"],
    feature: "Твёрдое топливо",
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: [],
  },
];

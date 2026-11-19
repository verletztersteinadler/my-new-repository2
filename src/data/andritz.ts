import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страницы ANDRITZ EcoFluid и PowerFluid.";

function steamLine(id: string, name: string, minKg: number, maxKg: number, mw: string, feature: string): Series {
  return {
    id,
    name,
    categoryId: "steam",
    kind: "С кипящим или циркулирующим слоем",
    image: "/catalog/solid.jpg",
    summary: `${mw}. Пар ${(minKg / 1000).toLocaleString("ru-RU")}–${(maxKg / 1000).toLocaleString("ru-RU")} т/ч.`,
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: minKg,
    steamMaxKgH: maxKg,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["solid"] as FuelId[],
    feature,
    extra: `${checked} На странице рядом дан тепловой диапазон ${mw}. Это не список станций. Пример Kamisu на странице PowerFluid в ряд не внесён: это объект, не типоразмер.`,
    sizes: [],
    sizesNote: "Типоразмеры внутри диапазона не названы.",
    aliases: [],
  };
}

export const andritzCategories: Category[] = [{ id: "steam", title: "Паровые", param: "steam" }];

export const andritzDocuments = [{ title: "EcoFluid и PowerFluid" }];

export const andritzSeries: Series[] = [
  steamLine("andritz-eco-bio", "ANDRITZ EcoFluid Bio", 35000, 450000, "30–350 МВт", "BFB, биомасса"),
  steamLine("andritz-eco-waste", "ANDRITZ EcoFluid Waste", 15000, 140000, "10–100 МВт", "BFB, отходы и RDF"),
  steamLine("andritz-power-bio", "ANDRITZ PowerFluid Bio", 100000, 750000, "80–550 МВт", "CFB, биомасса"),
  steamLine("andritz-power-waste", "ANDRITZ PowerFluid Waste", 50000, 200000, "40–150 МВт", "CFB, отходы"),
];

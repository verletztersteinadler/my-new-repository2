import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страница котлов kalvis.lt.";

function line(id: string, name: string, min: number, max: number, feature: string, image: string): Series {
  return {
    id,
    name,
    categoryId: "water",
    kind: feature,
    image,
    summary: `${min.toLocaleString("ru-RU")}–${max.toLocaleString("ru-RU")} кВт.`,
    powerMinKw: min,
    powerMaxKw: max,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["solid"] as FuelId[],
    feature,
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: [],
  };
}

export const kalvisCategories: Category[] = [{ id: "water", title: "Водогрейные", param: "power" }];
export const kalvisDocuments = [{ title: "Ряды Kalvis" }];
export const kalvisSeries: Series[] = [
  line("kalvis-small", "Kalvis, нижнее горение", 70, 95, "Ручная загрузка", "/catalog/solid.jpg"),
  line("kalvis-man", "Kalvis 100–1250", 100, 1250, "Ручная загрузка: дрова, отходы, уголь, опилки, торф", "/catalog/solid.jpg"),
  line("kalvis-m", "Kalvis 100M–950M", 100, 950, "Шнек снизу, опилки или гранулы", "/catalog/solid.jpg"),
  line("kalvis-m1", "Kalvis M-1", 140, 2500, "Подвижный колосник, влажность до 45%", "/catalog/solid.jpg"),
  line("kalvis-m2", "Kalvis M-2", 500, 1500, "Подвижный колосник, влажность до 55%", "/catalog/solid.jpg"),
  line("kalvis-mk", "Kalvis MK", 2500, 5000, "Теплообменник к камере партнёра, не полный котёл", "/catalog/skid.jpg"),
];

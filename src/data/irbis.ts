import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страница «О заводе» irbis-bor.ru. Завод назван производителем газовых котлов.";

function line(id: string, name: string, min: number, max: number | null, feature: string, image: string): Series {
  return {
    id,
    name,
    categoryId: "water",
    kind: feature,
    image,
    summary: max ? `${min}–${max} кВт.` : `до ${min} кВт.`,
    powerMinKw: max ? min : null,
    powerMaxKw: max ?? min,
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

export const irbisCategories: Category[] = [{ id: "water", title: "Водогрейные", param: "power" }];
export const irbisDocuments = [{ title: "Ряды Ирбис" }];
export const irbisSeries: Series[] = [
  line("irbis-khoper", "Ирбис Хопер", 25, 100, "Стальной отопительный", "/catalog/firetube.jpg"),
  line("irbis-bars", "Ирбис Барс", 50, 500, "Напольный", "/catalog/firetube.jpg"),
  line("irbis-vyatich", "Ирбис Вятич", 250, 2000, "Жаротрубный", "/catalog/firetube.jpg"),
  line("irbis-zord", "Ирбис Зорд", 120, 1000, "Конденсационный", "/catalog/floor-cond.jpg"),
  line("irbis-out", "Ирбис, наружное размещение", 1000, null, "До 1 МВт, низ не назван", "/catalog/skid.jpg"),
];

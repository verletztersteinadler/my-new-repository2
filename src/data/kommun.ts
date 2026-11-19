import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страница котлов kommun.ru. На странице написано «мВт», записано как МВт. Безымянный ряд 0,5–3 не внесён.";

function line(id: string, name: string, min: number, max: number, feature: string): Series {
  return {
    id,
    name,
    categoryId: "water",
    kind: feature,
    image: "/catalog/solid.jpg",
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

export const kommunCategories: Category[] = [{ id: "water", title: "Водогрейные", param: "power" }];
export const kommunDocuments = [{ title: "Вятские котлы" }];
export const kommunSeries: Series[] = [
  line("kommun-ga", "Вятские котлы КВ-Га", 500, 2000, "Влажное топливо"),
  line("kommun-od", "Вятские котлы КВСм-ОД", 500, 2000, "Сухое топливо"),
  line("kommun-tvg", "Вятские котлы ТВг", 500, 2000, "Топливо на карточке не уточнено"),
  line("kommun-tgd", "Вятские котлы ТГД", 1000, 2000, "Влажное топливо"),
  line("kommun-tgo", "Вятские котлы ТГО-1м", 400, 400, "Одна мощность"),
  line("kommun-kvs", "Вятские котлы КВС", 500, 2000, "Сухое топливо"),
];

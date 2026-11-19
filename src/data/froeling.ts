import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страница коммерческих котлов froeling.com. Общая фраза «7–1 500 кВт» к одной серии не приписана.";

function line(id: string, name: string, min: number, max: number, feature: string): Series {
  return {
    id,
    name,
    categoryId: "water",
    kind: "Биомасса",
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

export const froelingCategories: Category[] = [{ id: "water", title: "Водогрейные", param: "power" }];
export const froelingDocuments = [{ title: "Коммерческие Fröling" }];
export const froelingSeries: Series[] = [
  line("frol-lme", "Fröling LMe", 800, 1200, "Отходы древесины и стружка"),
  line("frol-tme", "Fröling TMe", 300, 550, "Стружка и пеллеты"),
  line("frol-turbo", "Fröling Turbomat", 150, 550, "Стружка и пеллеты"),
  line("frol-lambda", "Fröling Lambdamat", 750, 1500, "Отходы древесины и стружка"),
];

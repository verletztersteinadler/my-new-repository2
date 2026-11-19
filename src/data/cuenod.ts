import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Обзор рядов cuenod.com. Модели внутри границ не разложены.";

function line(id: string, name: string, min: number, max: number, fuels: FuelId[], feature: string): Series {
  return {
    id,
    name,
    categoryId: "auto",
    kind: feature,
    image: "/catalog/cabinet.jpg",
    summary: `${min.toLocaleString("ru-RU")}–${max.toLocaleString("ru-RU")} кВт.`,
    powerMinKw: min,
    powerMaxKw: max,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels,
    feature: `${min.toLocaleString("ru-RU")}–${max.toLocaleString("ru-RU")} кВт`,
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: [],
  };
}

const light: FuelId[] = ["gas", "diesel"];
const heavy: FuelId[] = ["gas", "diesel", "heavy"];

export const cuenodCategories: Category[] = [{ id: "auto", title: "Горелки", param: "none" }];
export const cuenodDocuments = [{ title: "Обзор Cuenod" }];
export const cuenodSeries: Series[] = [
  line("cuenod-nc", "Cuenod NC PRO VIEW", 15, 2080, light, "Моноблок"),
  line("cuenod-ek", "Cuenod EK EVO", 250, 13500, light, "Моноблок"),
  line("cuenod-nex", "Cuenod NEXTRON", 250, 11200, light, "Моноблок"),
  line("cuenod-n", "Cuenod N", 1300, 22000, light, "Моноблок"),
  line("cuenod-dtron", "Cuenod D-TRON", 230, 34000, heavy, "Дуоблок"),
  line("cuenod-duo", "Cuenod EK-DUO", 600, 16000, light, "Дуоблок"),
  line("cuenod-rpd", "Cuenod RPD", 500, 80000, heavy, "Дуоблок"),
  line("cuenod-pro", "Cuenod PROTRON", 17, 550, light, "Моноблок"),
];

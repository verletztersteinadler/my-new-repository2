import type { Category, FuelId, Series, Size } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Брошюра ACV HeatMaster TC Evo / WaterMaster.";

function row(name: string, powerKw: number): Size {
  return { id: `acv-${name.toLowerCase().replace(/\s+/g, "-")}`, name: `HeatMaster ${name}`, powerKw, steamKgH: null };
}

export const acvCategories: Category[] = [{ id: "water", title: "Водогрейные", param: "power" }];

export const acvDocuments = [{ title: "Таблица HeatMaster TC Evo" }];

export const acvSeries: Series[] = [
  {
    id: "acv-hm-evo",
    name: "ACV HeatMaster TC Evo",
    categoryId: "water",
    kind: "Конденсационный, газ, со встроенным баком",
    image: "/catalog/floor-cond.jpg",
    summary: "В таблице полезной мощности 80/60 °C шесть моделей: 24,3–111,7 кВт.",
    powerMinKw: 24.3,
    powerMaxKw: 111.7,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["gas"] as FuelId[],
    feature: "25, 35, 45, 70, 85 и 120 Evo",
    extra: `${checked} Полезная мощность 80/60 °C: 24,3 / 34,1 / 44,1 / 68 / 82,9 / 111,7 кВт. В той же таблице есть 25 X, 45 X и 70 X Evo, для них полезная мощность отопления стоит прочерком и в ряд не внесена.`,
    sizes: [row("25 Evo", 24.3), row("35 Evo", 34.1), row("45 Evo", 44.1), row("70 Evo", 68), row("85 Evo", 82.9), row("120 Evo", 111.7)],
    sizesNote: "X Evo без цифры полезной мощности не добавлены.",
    aliases: ["heatmaster", "watermaster"],
  },
];

import type { Category, FuelId, Series, Size } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Брошюра Dunphy. Таблицы T и B в извлечении оборваны. Потолок 80 МВт относится к заказу, не к перечисленной модели.";

const t: [string, number][] = [
  ["T02.12", 120], ["T02.26", 250], ["T03.34", 340], ["T03.45", 450], ["T04.65", 600],
  ["T05.100", 1100], ["T2.100", 1000], ["T2.115", 1115], ["T2.155", 1550], ["T3.200", 2000],
  ["T3.220", 2200], ["T3.290", 2950], ["T4.450", 4500], ["T4.550", 5300],
];
const b: [string, number][] = [
  ["B1.50", 500], ["B1.70", 700], ["B2.100", 1000], ["B2.150", 1500], ["B3.250", 2500],
  ["B3.330", 3300], ["B4.400", 4000], ["B4.650", 6500], ["B5.800", 8000], ["B5.1100", 11000],
  ["B5.1400", 14000], ["B6.1700", 17000], ["B7.2200", 22000],
];

function sizes(prefix: string, rows: [string, number][]): Size[] {
  return rows.map(([name, powerKw]) => ({ id: `${prefix}-${name.toLowerCase()}`, name, powerKw, steamKgH: null }));
}

export const dunphyCategories: Category[] = [{ id: "auto", title: "Горелки", param: "none" }];
export const dunphyDocuments = [{ title: "Брошюра Dunphy" }];
export const dunphySeries: Series[] = [
  {
    id: "dunphy-t",
    name: "Dunphy T",
    categoryId: "auto",
    kind: "Горелка",
    image: "/catalog/cabinet.jpg",
    summary: "Прочитанные модели: верх 120–5 300 кВт.",
    powerMinKw: 120,
    powerMaxKw: 5300,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["gas", "diesel"] as FuelId[],
    feature: "Нижняя граница у каждой модели своя и в размер не внесена",
    extra: checked,
    sizes: sizes("dunphy", t),
    sizesNote: "В размере верх диапазона.",
    aliases: [],
  },
  {
    id: "dunphy-b",
    name: "Dunphy B",
    categoryId: "auto",
    kind: "Горелка",
    image: "/catalog/cabinet.jpg",
    summary: "Прочитанные модели: верх 500–22 000 кВт. Страница B пишет применения до 68 МВт.",
    powerMinKw: 500,
    powerMaxKw: 22000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["gas", "diesel"],
    feature: "До 68 МВт на странице ряда, не у последней прочитанной модели",
    extra: checked,
    sizes: sizes("dunphy", b),
    sizesNote: "Модели после B7.2200 в извлечение не попали.",
    aliases: [],
  },
];

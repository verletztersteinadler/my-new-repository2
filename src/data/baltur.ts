import type { Category, FuelId, Series, Size } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Лист TBML Baltur. Верх диапазона модели взят как мощность карточки.";

function size(name: string, powerKw: number): Size {
  return { id: `baltur-${name.toLowerCase().replace(/\s+/g, "-")}`, name, powerKw, steamKgH: null };
}

export const balturCategories: Category[] = [{ id: "auto", title: "Горелки", param: "none" }];

export const balturDocuments = [{ title: "Лист TBML" }];

export const balturSeries: Series[] = [
  {
    id: "baltur-tbml",
    name: "Baltur TBML",
    categoryId: "auto",
    kind: "Горелка, газ и лёгкое масло, по очереди",
    image: "/catalog/cabinet.jpg",
    summary: "TBML 20: 100–260 кВт. TBML 35 P: 130–400 кВт.",
    powerMinKw: 100,
    powerMaxKw: 400,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["gas", "diesel"] as FuelId[],
    feature: "100–400 кВт",
    extra: `${checked} Страница серии пишет «100 to 260 kW». Лист шире: TBML 35 P до 400 кВт. Модель TBML 150P на стороннем сайте в ряд не внесена.`,
    sizes: [size("TBML 20", 260), size("TBML 35 P", 400)],
    sizesNote: "В размере верх диапазона, не одна рабочая точка.",
    aliases: ["tbml"],
  },
];

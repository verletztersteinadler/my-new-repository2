import type { Category, FuelId, Series, Size } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Таблица steamrator.fi. Шапка «0,18–3,5 МВт» таблицей не подтверждена: тепло в таблице 300–2 000 кВт.";

const rows: [string, number, number][] = [
  ["STEAM300", 300, 300],
  ["STEAM500", 340, 500],
  ["STEAM750", 500, 750],
  ["STEAM1000", 700, 1000],
  ["STEAM1250", 830, 1250],
  ["STEAM1500", 1000, 1500],
  ["STEAM2000", 1340, 2000],
  ["STEAM3000", 2000, 3000],
];

export const steamratorCategories: Category[] = [{ id: "steam", title: "Паровые", param: "steam" }];
export const steamratorDocuments = [{ title: "Steamrator" }];
export const steamratorSeries: Series[] = [
  {
    id: "steamrator",
    name: "Steamrator",
    categoryId: "steam",
    kind: "Прямоточный водотрубный",
    image: "/catalog/waterpipe.jpg",
    summary: "Пар 300–3 000 кг/ч. Тепло по таблице 300–2 000 кВт.",
    powerMinKw: 300,
    powerMaxKw: 2000,
    steamMinKgH: 300,
    steamMaxKgH: 3000,
    tempMaxC: null,
    pressureNote: "10, 13 или 16 бар, колонка в таблице сдвинута",
    fuels: ["gas", "diesel"] as FuelId[],
    feature: "Горелки Oilon",
    extra: checked,
    sizes: rows.map(([name, powerKw, steamKgH]): Size => ({ id: `steamrator-${name.toLowerCase()}`, name, powerKw, steamKgH })),
    sizesNote: null,
    aliases: [],
  },
];

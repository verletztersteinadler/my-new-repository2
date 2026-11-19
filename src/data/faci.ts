import type { Category, FuelId, Series, Size } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Карточка модульной котельной FACI 115. 105–1 000 кВт — мощность котельной из одного или нескольких котлов.";

const named: [string, number][] = [
  ["FACI 105", 105],
  ["FACI 115", 115],
  ["FACI 130", 130],
  ["FACI 258", 258],
  ["FACI 386", 386],
  ["FACI 455", 455],
  ["FACI 645", 645],
];

export const faciCategories: Category[] = [{ id: "water", title: "Водогрейные", param: "power" }];
export const faciDocuments = [{ title: "Модульные FACI" }];
export const faciSeries: Series[] = [
  {
    id: "faci-bmk",
    name: "FACI, модульные котельные",
    categoryId: "water",
    kind: "Модуль на одном или нескольких котлах",
    image: "/catalog/skid.jpg",
    summary: "105–1 000 кВт.",
    powerMinKw: 105,
    powerMaxKw: 1000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["solid"] as FuelId[],
    feature: "Уголь, щепа, дрова, брикеты названы у FACI 115",
    extra: checked,
    sizes: named.map(([name, powerKw]): Size => ({ id: `faci-${powerKw}`, name, powerKw, steamKgH: null })),
    sizesNote: "Именной модели на 1 000 кВт на открытой странице нет.",
    aliases: [],
  },
];

import type { Category, FuelId, Series, Size } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Брошюра и страница Apen Group PK. Полезная мощность, не подводимая.";

function air(name: string, powerKw: number): Size {
  return { id: `apen-${name.toLowerCase()}`, name, powerKw, steamKgH: null };
}

export const apenCategories: Category[] = [{ id: "air", title: "Воздухонагреватели", param: "power" }];

export const apenDocuments = [{ title: "PK-K и PK-N" }];

export const apenSeries: Series[] = [
  {
    id: "apen-pk-k",
    name: "Apen PK-K",
    categoryId: "air",
    kind: "Напольный воздухонагреватель",
    image: "/catalog/web-air.jpg",
    summary: "Полезная мощность по моделям, у которых она прочитана: 105,4–1 057,7 кВт.",
    powerMinKw: 105.4,
    powerMaxKw: 1057.7,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["gas"] as FuelId[],
    feature: "Газовая горелка, класс NOx 3 или 5",
    extra: `${checked} В таблицу не вошли PKA032K и PKA060K: у них в извлечении есть подвод тепла, полезной мощности нет. PKA и PKE в брошюре названы одинаковыми по теплу.`,
    sizes: [
      air("PKA100K", 105.4),
      air("PKA140K", 140.8),
      air("PKA190K", 182.2),
      air("PKA250K", 248.9),
      air("PKA320K", 319.8),
      air("PKA420K", 419.4),
      air("PKA550K", 549.1),
      air("PKA700K", 697.2),
      air("PKA900K", 900),
      air("PKA1M2K", 1057.7),
    ],
    sizesNote: "Цифра — максимальная полезная мощность.",
    aliases: ["pk", "pka"],
  },
  {
    id: "apen-pk-n",
    name: "Apen PK-N",
    categoryId: "air",
    kind: "Напольный воздухонагреватель",
    image: "/catalog/web-air.jpg",
    summary: "Страница пишет 140–550 кВт. В таблице полезная мощность моделей 171,1–592 кВт.",
    powerMinKw: 171.1,
    powerMaxKw: 592,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["gas"] as FuelId[],
    feature: "Вертикальный и горизонтальный, зал или улица",
    extra: `${checked} В карточке максимальная полезная мощность по тепловому размеру. Варианты 10A и 20A отличаются напором, не теплом, и отдельно не внесены.`,
    sizes: [air("140N", 171.1), air("190N", 205.9), air("250N", 275), air("320N", 335.9), air("420N", 450), air("550N", 592)],
    sizesNote: "Фраза «140–550 кВт» на странице не совпадает с полезной мощностью таблицы.",
    aliases: ["pkn"],
  },
];

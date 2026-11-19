import type { Category, FuelId, Series, Size } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Каталог Arcotherm на biemmedue.com. Киловатты британского дилера не перенесены.";

function named(id: string, name: string, kind: string, fuels: FuelId[], feature: string, sizes: Size[] = []): Series {
  return {
    id,
    name,
    categoryId: "air",
    kind,
    image: "/catalog/web-air.jpg",
    summary: sizes.length ? "Четыре модели названы. Мощность на странице завода не указана." : "Линия названа. Мощность на странице завода не указана.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels,
    feature,
    extra: checked,
    sizes,
    sizesNote: sizes.length ? "Имена есть, киловатты нет." : null,
    aliases: [],
  };
}

const ec: Size[] = ["EC 22", "EC 32", "EC 55", "EC 85"].map((name) => ({
  id: `biem-${name.toLowerCase().replace(/\s+/g, "-")}`,
  name,
  powerKw: null,
  steamKgH: null,
}));

export const biemmedueCategories: Category[] = [{ id: "air", title: "Воздухонагреватели", param: "power" }];

export const biemmedueDocuments = [{ title: "Линии Arcotherm" }];

export const biemmedueSeries: Series[] = [
  named("biem-ec", "Arcotherm EC", "Непрямое сжигание, мобильный", ["diesel"], "Дизель или керосин", ec),
  named("biem-jumbo", "Arcotherm Jumbo", "Непрямое сжигание, осевой вентилятор", [], "Горелка в комплекте не описана"),
  named("biem-gp", "Arcotherm GP", "Прямое сжигание, мобильный", ["gas"], "СУГ"),
  named("biem-ek", "Arcotherm EK", "Электрический", [], "Электрический"),
];

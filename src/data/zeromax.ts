import type { Category, Series, Size } from "@/data/catalog";

const checked = "Сверка 18.11.2026. zeromax44.ru. Модульные котельные и теплицы не внесены. Киловатты взяты из названий моделей в разделах, где страница прямо задаёт диапазон.";

const step = (id: string, name: string, kw: number): Size => ({ id, name, powerKw: kw, steamKgH: null });

function line(id: string, name: string, kind: string, image: string, steps: Size[], feature: string): Series {
  const powers = steps.map((item) => item.powerKw!);
  return {
    id,
    name,
    categoryId: image.includes("air") ? "air" : "water",
    kind,
    image,
    summary: feature,
    powerMinKw: Math.min(...powers),
    powerMaxKw: Math.max(...powers),
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["solid"],
    feature,
    extra: `${checked} Температура и давление на страницах разделов не указаны.`,
    sizes: steps,
    sizesNote: null,
    aliases: ["буржуй-к"],
  };
}

export const zeromaxCategories: Category[] = [
  { id: "water", title: "Водогрейные", param: "power" },
  { id: "air", title: "Воздухогрейные", param: "power" },
];
export const zeromaxDocuments = [{ title: "Каталог zeromax44.ru" }];
export const zeromaxSeries: Series[] = [
  line("zeromax-home", "Буржуй-К, бытовые", "Водогрейный", "/catalog/solid.jpg", [
    step("t-10", "Т-10А", 10),
    step("t-12", "Т-12АН", 12),
    step("t-20", "Т-20А", 20),
    step("t-24", "Т-24АН", 24),
    step("t-30", "Т-30А", 30),
    step("t-32", "Т-32АН", 32),
  ], "10–32 кВт, пиролиз"),
  line("zeromax-prom", "Буржуй-К, промышленные", "Водогрейный", "/catalog/solid.jpg", [
    step("t-50", "Т-50A", 50),
    step("t-75", "Т-75А", 75),
    step("t-100", "Т-100А", 100),
    step("t-150", "Т-150А", 150),
    step("t-200", "Т-200", 200),
    step("t-300", "Т-300", 300),
    step("t-400", "Т-400", 400),
    step("t-500", "Т-500", 500),
    step("t-630", "Т-630", 630),
    step("t-800", "Т-800", 800),
    step("t-1000", "Т-1000", 1000),
  ], "50–1000 кВт, пиролиз"),
  line("zeromax-air", "Буржуй-К Тв", "Воздухогрейный", "/catalog/web-air.jpg", [
    step("tv-12", "Тв-12", 12),
    step("tv-24", "Тв-24", 24),
    step("tv-32", "Тв-32", 32),
    step("tv-50", "Тв-50", 50),
    step("tv-100", "Тв-100", 100),
    step("tv-150", "Тв-150", 150),
  ], "12–150 кВт"),
];

import type { Category, Series, Size } from "@/data/catalog";

const checked = "Сверка 18.11.2026. Карточки greers.ru. В строке стоит верх тепловой мощности, полный диапазон — в названии ступени. Исполнения ECM и IP54 той же мощности отдельно не заведены. Камеры смешения, дестратификаторы, завесы без нагрева и автоматика не внесены.";

function steps(pairs: [string, number, string][]): Size[] {
  return pairs.map(([id, maxKw, name]) => ({ id, name, powerKw: maxKw, steamKgH: null }));
}

function air(id: string, name: string, kind: string, sizes: Size[], minKw: number, feature: string): Series {
  const powers = sizes.map((item) => item.powerKw).filter((value): value is number => value != null);
  return {
    id,
    name,
    categoryId: "air",
    kind,
    image: "/catalog/web-air.jpg",
    summary: feature,
    powerMinKw: minKw,
    powerMaxKw: Math.max(...powers),
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: [],
    feature,
    extra: checked,
    sizes,
    sizesNote: null,
    aliases: [],
  };
}

export const greersCategories: Category[] = [{ id: "air", title: "Тепловентиляторы", param: "power" }];
export const greersDocuments = [{ title: "Каталог greers.ru" }];
export const greersSeries: Series[] = [
  air("greers-vs", "ГРЕЕРС ВС", "Водяной тепловентилятор", steps([
    ["vs-1110", 13.5, "ВС-1110 · 6,9–13,5"],
    ["vs-1220", 24.4, "ВС-1220 · 12,8–24,4"],
    ["vs-1230", 31.5, "ВС-1230 · 16,5–31,5"],
    ["vs-1320s", 24.1, "ВС-1320С · 12,5–24,1"],
    ["vs-2125", 30.7, "ВС-2125 · 16,1–30,7"],
    ["vs-2245", 51.9, "ВС-2245 · 27,3–51,9"],
    ["vs-2340s", 42.1, "ВС-2340С · 22,4–42,1"],
    ["vs-2365", 73.2, "ВС-2365 · 37,9–73,2"],
    ["vs-3275", 85.5, "ВС-3275 · 44,8–85,5"],
    ["vs-33100", 119.1, "ВС-33100 · 61,6–119,1"],
  ]), 6.9, "Вода, 6,9–119,1 кВт"),
  air("greers-es", "ГРЕЕРС ЕС", "Электрический тепловентилятор", steps([
    ["es-6", 6, "ЕС-6 · 3/6"],
    ["es-12", 12, "ЕС-12 · 6–12"],
    ["es-21", 21, "ЕС-21 · 10,5–21"],
  ]), 3, "Электричество, 3–21 кВт"),
  air("greers-zvp-v", "ГРЕЕРС ЗВП-М, вода", "Водяная завеса", steps([
    ["zvp-m1-150v", 41, "ЗВП-М1-150В · 20,7–41"],
    ["zvp-m1-200v", 60.9, "ЗВП-М1-200В · 31,2–60,9"],
    ["zvp-m2-150v", 50.5, "ЗВП-М2-150В · 26,2–50,5"],
    ["zvp-m2-200v", 74.4, "ЗВП-М2-200В · 38,5–74,4"],
    ["zvp-m3-150v", 76.6, "ЗВП-М3-150В · 40,3–76,6"],
    ["zvp-m3-200v", 112, "ЗВП-М3-200В · 58,6–112"],
    ["zvp-m4-100v", 74.8, "ЗВП-М4-100В · 37,7–74,8"],
    ["zvp-m4-200v", 170.5, "ЗВП-М4-200В · 89,7–170,5"],
  ]), 20.7, "Вода, 20,7–170,5 кВт"),
  air("greers-zvp-e", "ГРЕЕРС ЗВП-М, электричество", "Электрическая завеса", steps([
    ["zvp-m1-150e", 12, "ЗВП-М1-150Е · 6/12"],
    ["zvp-m1-200e", 18, "ЗВП-М1-200Е · 9/18"],
    ["zvp-m2-150e", 21, "ЗВП-М2-150Е · 10,5/21"],
    ["zvp-m2-200e", 31, "ЗВП-М2-200Е · 10,5/31"],
  ]), 6, "Электричество, 6–31 кВт"),
  air("greers-zvb", "ГРЕЕРС ЗВ-Б", "Компактная завеса", steps([
    ["zv-b-100e", 6.9, "ЗВ-Б2-100Е · 4,6/6,9"],
    ["zv-b-150e", 12, "ЗВ-Б2-150Е · 8/12"],
    ["zv-b-100v", 20.8, "ЗВ-Б2-100В · 10,6–20,8"],
    ["zv-b-150v", 39.1, "ЗВ-Б2-150В · 20,4–39,1"],
  ]), 4.6, "Вода или электричество, 4,6–39,1 кВт"),
];

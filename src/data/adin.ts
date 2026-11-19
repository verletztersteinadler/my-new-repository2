import type { Category, Series, Size } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страница ЭВОП-Д на adin.ru.";

const kw = [30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 360, 480];

export const adinCategories: Category[] = [{ id: "water", title: "Водогрейные", param: "power" }];
export const adinDocuments = [{ title: "ЭВОП-Д" }];
export const adinSeries: Series[] = [
  {
    id: "adin-evop",
    name: "АДИН ЭВОП-Д",
    categoryId: "water",
    kind: "Электрический, высокое давление",
    image: "/catalog/cabinet.jpg",
    summary: "30–480 кВт. 115–350 °C, 1–20 МПа.",
    powerMinKw: 30,
    powerMaxKw: 480,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: 350,
    pressureNote: "1–20 МПа",
    fuels: [],
    feature: "Электрический",
    extra: checked,
    sizes: kw.map((powerKw): Size => ({ id: `adin-${powerKw}`, name: `ЭВОП-Д${powerKw}`, powerKw, steamKgH: null })),
    sizesNote: null,
    aliases: ["эвоп"],
  },
];

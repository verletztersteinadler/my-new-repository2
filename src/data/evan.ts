import type { Category, Series, Size } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страница TITAN 300–480 на evan.ru. Остальной EVAN не разобран.";

const rows = [300, 360, 420, 480];

export const evanCategories: Category[] = [{ id: "water", title: "Водогрейные", param: "power" }];
export const evanDocuments = [{ title: "TITAN" }];
export const evanSeries: Series[] = [
  {
    id: "evan-titan",
    name: "EVAN TITAN",
    categoryId: "water",
    kind: "Электрический",
    image: "/catalog/cabinet.jpg",
    summary: "300–480 кВт.",
    powerMinKw: 300,
    powerMaxKw: 480,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: [],
    feature: "Вода или незамерзающая жидкость",
    extra: checked,
    sizes: rows.map((powerKw): Size => ({ id: `evan-${powerKw}`, name: `TITAN ${powerKw}`, powerKw, steamKgH: null })),
    sizesNote: null,
    aliases: ["titan"],
  },
];

import type { Category, FuelId, Series, Size } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Лист URAGAN Prof turbo. Прочитаны 16, 22, 28 и 34 кВт.";

const rows = [16, 22, 28, 34];

export const termokraftCategories: Category[] = [{ id: "water", title: "Водогрейные", param: "power" }];
export const termokraftDocuments = [{ title: "URAGAN Prof turbo" }];
export const termokraftSeries: Series[] = [
  {
    id: "termo-uragan",
    name: "Термокрафт URAGAN Prof turbo",
    categoryId: "water",
    kind: "Дрова и уголь",
    image: "/catalog/solid.jpg",
    summary: "16–34 кВт. До 85 °C и 2,5 бар.",
    powerMinKw: 16,
    powerMaxKw: 34,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: 85,
    pressureNote: "не более 2,5 бар",
    fuels: ["solid"] as FuelId[],
    feature: "Дрова и уголь",
    extra: checked,
    sizes: rows.map((powerKw): Size => ({ id: `uragan-${powerKw}`, name: `URAGAN ${powerKw}`, powerKw, steamKgH: null })),
    sizesNote: null,
    aliases: ["uragan"],
  },
];

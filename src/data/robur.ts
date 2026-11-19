import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Лист GAHP A Plus, сентябрь 2026. Номинал 39,2 кВт. Таблица по наружной температуре не разложена.";

export const roburCategories: Category[] = [{ id: "water", title: "Водогрейные", param: "power" }];
export const roburDocuments = [{ title: "GAHP A Plus" }];
export const roburSeries: Series[] = [
  {
    id: "robur-gahp",
    name: "Robur GAHP A Plus",
    categoryId: "water",
    kind: "Абсорбционный тепловой насос",
    image: "/catalog/web-air.jpg",
    summary: "Номинальная тепловая мощность 39,2 кВт. Вход газа 28 кВт.",
    powerMinKw: null,
    powerMaxKw: 39.2,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["gas"] as FuelId[],
    feature: "номинал 39,2 кВт",
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: ["gahp"],
  },
];

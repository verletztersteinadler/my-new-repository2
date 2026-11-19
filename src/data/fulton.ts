import type { Category, FuelId, Series, Size } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Таблица VSRT на fulton.com. Фунты/ч при F&A 212 °F переведены в кг/ч. Колонка 150 psi — это размер патрубка, не давление ряда.";

const rows: [string, number][] = [
  ["VSRT-9.5", 328], ["VSRT-10", 345], ["VSRT-15", 518], ["VSRT-20", 690], ["VSRT-30", 1035],
  ["VSRT-40", 1380], ["VSRT-50", 1725], ["VSRT-60", 2070], ["VSRT-80", 2760], ["VSRT-100", 3450],
  ["VSRT-125", 4313], ["VSRT-250", 8625],
];

export const fultonCategories: Category[] = [{ id: "steam", title: "Паровые", param: "steam" }];
export const fultonDocuments = [{ title: "VSRT" }];
export const fultonSeries: Series[] = [
  {
    id: "fulton-vsrt",
    name: "Fulton VSRT",
    categoryId: "steam",
    kind: "Вертикальный, без дымогарных труб",
    image: "/catalog/vertical.jpg",
    summary: "9,5–250 BHP. Пар 328–8 625 фунтов/ч.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: Math.round(328 * 0.453592),
    steamMaxKgH: Math.round(8625 * 0.453592),
    tempMaxC: null,
    pressureNote: null,
    fuels: ["gas"] as FuelId[],
    feature: "Газ, пропан или два топлива",
    extra: checked,
    sizes: rows.map(([name, lb]): Size => ({ id: `fulton-${name.toLowerCase()}`, name, powerKw: null, steamKgH: Math.round(lb * 0.453592) })),
    sizesNote: null,
    aliases: ["vsrt"],
  },
];

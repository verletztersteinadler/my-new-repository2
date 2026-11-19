import type { Category, FuelId, Series, Size } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страница пароперегревателей belenergomash.com. Это не котлы.";

const rows: [string, number][] = [
  ["ЦП-20", 20],
  ["ЦП-60-С-19", 40],
  ["ЦП-60-С-45", 40],
  ["ЦП-30Н", 20],
];

export const belenergomashCategories: Category[] = [{ id: "steam", title: "Паровые", param: "steam" }];
export const belenergomashDocuments = [{ title: "Пароперегреватели" }];
export const belenergomashSeries: Series[] = [
  {
    id: "bem-cp",
    name: "Белэнергомашсервис, центральные пароперегреватели",
    categoryId: "steam",
    kind: "Пароперегреватель с собственной топкой",
    image: "/catalog/skid.jpg",
    summary: "20 и 40 т/ч.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: 20000,
    steamMaxKgH: 40000,
    tempMaxC: 445,
    pressureNote: "по карточке, не одна величина",
    fuels: ["gas", "heavy"] as FuelId[],
    feature: "ЦП-20 — доменный газ, ЦП-30Н — мазут",
    extra: checked,
    sizes: rows.map(([name, t]): Size => ({ id: `bem-${name}`, name, powerKw: null, steamKgH: t * 1000 })),
    sizesNote: null,
    aliases: [],
  },
];

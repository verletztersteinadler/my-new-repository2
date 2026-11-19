import type { Category, FuelId, Series, Size } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Карточка Magno UF на hargassner.com. В размер взят nominal load, не имя модели.";

const rows: [string, number][] = [
  ["Magno-UF 300", 280],
  ["Magno-UF 350", 300],
  ["Magno-UF 500", 501],
  ["Magno-UF 550", 550],
];

export const hargassnerCategories: Category[] = [{ id: "water", title: "Водогрейные", param: "power" }];
export const hargassnerDocuments = [{ title: "Magno UF" }];
export const hargassnerSeries: Series[] = [
  {
    id: "harg-uf",
    name: "Hargassner Magno UF",
    categoryId: "water",
    kind: "Промышленный, нижняя подача",
    image: "/catalog/solid.jpg",
    summary: "Номинал 280–550 кВт. Заголовок страницы пишет 300–550 кВт.",
    powerMinKw: 280,
    powerMaxKw: 550,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: "PN 16 на патрубках",
    fuels: ["solid"] as FuelId[],
    feature: "Имя 300 соответствует номиналу 280 кВт",
    extra: checked,
    sizes: rows.map(([name, powerKw]): Size => ({ id: `harg-${name.toLowerCase().replace(/\s+/g, "-")}`, name, powerKw, steamKgH: null })),
    sizesNote: null,
    aliases: ["magno"],
  },
];

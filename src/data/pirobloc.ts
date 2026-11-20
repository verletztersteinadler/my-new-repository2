import type { Category, FuelId, Series, Size } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страница термомасла pirobloc.com. В размере верх полосы GFT, не одна точка.";

const gft: [string, number][] = [
  ["GFT-010", 175], ["GFT-020", 350], ["GFT-030", 465], ["GFT-040", 640], ["GFT-060", 990],
  ["GFT-090", 1512], ["GFT-130", 2039], ["GFT-170", 2674], ["GFT-200", 3258],
];

export const piroblocCategories: Category[] = [{ id: "oil", title: "Термомасляные", param: "power" }];
export const piroblocDocuments = [{ title: "Термомасло Pirobloc" }];
export const piroblocSeries: Series[] = [
  {
    id: "pirobloc",
    name: "Pirobloc, термомасло",
    categoryId: "oil",
    kind: "Две спирали, три хода",
    image: "/catalog/reverse.jpg",
    summary: "0,1–15 МВт. Высокоэффективное исполнение страница начинает с 1 000 кВт.",
    powerMinKw: 100,
    powerMaxKw: 15000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: 400,
    pressureNote: "рабочее до 25 бар, допустимое 40 бар",
    fuels: ["gas", "diesel", "heavy"] as FuelId[],
    feature: "Газ, СУГ, синтез-газ, дизель, мазут",
    extra: checked,
    sizes: gft.map(([name, powerKw]): Size => ({ id: `piro-${name.toLowerCase()}`, name, powerKw, steamKgH: null })),
    sizesNote: "Полосы GFT не покрывают весь заявленный верх 15 МВт.",
    aliases: [],
  },
];

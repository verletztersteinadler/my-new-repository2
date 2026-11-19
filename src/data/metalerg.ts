import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страница Ekopal RM на kotlynaslome.pl. Каскад 1,5 МВт — несколько котлов и в ряд не внесён.";

export const metalergCategories: Category[] = [{ id: "water", title: "Водогрейные", param: "power" }];
export const metalergDocuments = [{ title: "Ekopal RM" }];
export const metalergSeries: Series[] = [
  {
    id: "metalerg-rm",
    name: "MetalERG Ekopal RM",
    categoryId: "water",
    kind: "Периодическая загрузка, открытая система",
    image: "/catalog/solid.jpg",
    summary: "100–700 кВт.",
    powerMinKw: 100,
    powerMaxKw: 700,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["solid"] as FuelId[],
    feature: "Солома. Также дрова, щепа, опилки и другая биомасса",
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: ["ekopal"],
  },
];

import type { Category, FuelId, Series, Size } from "@/data/catalog";

const checked = "Сверка 28.11.2026. Сайт wiesbergboilers.com открыт; Wiesberg — зарегистрированная торговая марка Unical AG S.p.A. (дивизион Bioenergy).";

export const wiesbergCategories: Category[] = [{ id: "water", title: "Водогрейные", param: "power" }];
export const wiesbergDocuments = [{ title: "T-PET BOILER" }];

const tPetSizes: Size[] = [
  { id: "wiesberg-tpet-14", name: "T-PET BOILER 14", powerKw: 14, steamKgH: null },
  { id: "wiesberg-tpet-18", name: "T-PET BOILER 18", powerKw: 18, steamKgH: null },
  { id: "wiesberg-tpet-22", name: "T-PET BOILER 22", powerKw: 22, steamKgH: null },
  { id: "wiesberg-tpet-26", name: "T-PET BOILER 26", powerKw: 26, steamKgH: null },
  { id: "wiesberg-tpet-30", name: "T-PET BOILER 30", powerKw: 30, steamKgH: null },
];

export const wiesbergSeries: Series[] = [
  {
    id: "wiesberg-tpet",
    name: "Wiesberg T-PET BOILER",
    categoryId: "water",
    kind: "Пеллетный котёл отопления, чугунная чаша",
    image: "/catalog/solid.jpg",
    summary: "14–30 кВт (тепловая 13,8–29 кВт), класс A+.",
    powerMinKw: 14,
    powerMaxKw: 30,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["solid"] as FuelId[],
    feature: "Пеллетное топливо, модуляция мощности, 4 звезды экологии",
    extra: checked + " Промышленных котлов в текущем каталоге Wiesberg нет: бренд Unical AG специализируется на пеллетных изделиях (котлы, гидропечи, кухни).",
    sizes: tPetSizes,
    sizesNote: "Тепловая мощность модов: 13,8 / 17,5 / 21 / 25 / 29 кВт.",
    aliases: ["t-pet boiler", "tpet"],
  },
];

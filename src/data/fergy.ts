import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страница вертикальных водогрейных fergy.eu. В реестре завод записан как KOMFORTS.";

export const fergyCategories: Category[] = [{ id: "water", title: "Водогрейные", param: "power" }];
export const fergyDocuments = [{ title: "Вертикальные FERGY" }];
export const fergySeries: Series[] = [
  {
    id: "fergy-v",
    name: "FERGY, вертикальные",
    categoryId: "water",
    kind: "Два или три хода, с топкой на колоснике",
    image: "/catalog/vertical.jpg",
    summary: "750 кВт – 14 МВт на один котёл. Вода до 150 °C, давление до 16 бар.",
    powerMinKw: 750,
    powerMaxKw: 14000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: 150,
    pressureNote: "до 16 бар",
    fuels: ["solid"] as FuelId[],
    feature: "Принудительная циркуляция",
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: ["komforts"],
  },
];

import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страница биомассового термомасла innergy-global.com. В реестре завод записан как ERATIC.";

export const innergyCategories: Category[] = [{ id: "oil", title: "Термомасляные", param: "power" }];
export const innergyDocuments = [{ title: "Биомасса ERATIC" }];
export const innergySeries: Series[] = [
  {
    id: "innergy-oil",
    name: "INNERGY / ERATIC, термомасло",
    categoryId: "oil",
    kind: "Биомасса",
    image: "/catalog/solid.jpg",
    summary: "Стандарт до 25 МВт. Особый проект до 50 МВт. Температура до 350 °C.",
    powerMinKw: null,
    powerMaxKw: 25000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: 350,
    pressureNote: null,
    fuels: ["solid"] as FuelId[],
    feature: "до 25 МВт стандарт",
    extra: `${checked} 50 МВт — особое исполнение и в верх стандартного ряда не поставлено.`,
    sizes: [],
    sizesNote: null,
    aliases: ["eratic"],
  },
];

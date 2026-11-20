import type { Category, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страница SHOTS на sigmathermal.com. 600 °F записаны как 316 °C. «4 МВт или выше» верх не закрывает.";

export const sigmaCategories: Category[] = [{ id: "oil", title: "Термомасляные", param: "power" }];
export const sigmaDocuments = [{ title: "SHOTS" }];
export const sigmaSeries: Series[] = [
  {
    id: "sigma-std",
    name: "Sigma SHOTS, стандарт",
    categoryId: "oil",
    kind: "Электрический",
    image: "/catalog/reverse.jpg",
    summary: "30–800 кВт. Жидкая фаза до 600 °F.",
    powerMinKw: 30,
    powerMaxKw: 800,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: 316,
    pressureNote: null,
    fuels: [],
    feature: "Электрический",
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: ["shots"],
  },
  {
    id: "sigma-eng",
    name: "Sigma SHOTS, заказной",
    categoryId: "oil",
    kind: "Электрический",
    image: "/catalog/reverse.jpg",
    summary: "От 800 кВт до 4 МВт и выше.",
    powerMinKw: 800,
    powerMaxKw: null,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: [],
    feature: "Выше 600 °F возможно, цифра не названа",
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: [],
  },
];

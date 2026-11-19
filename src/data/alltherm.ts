import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 17.11.2026. Страница alltherm.ru/boilers. Это заказной диапазон, не список типоразмеров. Теплообменники в ряд котлов не внесены.";

export const allthermCategories: Category[] = [
  { id: "water", title: "Водогрейные", param: "power" },
  { id: "oil", title: "Термомасляные", param: "power" },
];
export const allthermDocuments = [{ title: "Котлы" }];
export const allthermSeries: Series[] = [
  {
    id: "alltherm-hw",
    name: "Аллтерм, водогрейные",
    categoryId: "water",
    kind: "Заказной водогрейный",
    image: "/catalog/firetube.jpg",
    summary: "150 кВт–10 МВт.",
    powerMinKw: 150,
    powerMaxKw: 10000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["gas", "diesel", "heavy"] as FuelId[],
    feature: "Газ, жидкое топливо",
    extra: `${checked} На странице также попутный газ и водоугольные смеси.`,
    sizes: [],
    sizesNote: "Отдельные обозначения моделей на странице не перечислены.",
    aliases: ["alltherm"],
  },
  {
    id: "alltherm-oil",
    name: "Аллтерм, диатермическое масло",
    categoryId: "oil",
    kind: "Термомасляный",
    image: "/catalog/cabinet.jpg",
    summary: "1–15 МВт.",
    powerMinKw: 1000,
    powerMaxKw: 15000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["gas"] as FuelId[],
    feature: "Газ, включая синтез-газ и ПНГ",
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: ["масло"],
  },
];

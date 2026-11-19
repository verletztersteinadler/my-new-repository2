import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страницы Alfa Laval Aalborg.";

export const alfalavalCategories: Category[] = [{ id: "steam", title: "Паровые", param: "steam" }];

export const alfalavalDocuments = [{ title: "Aalborg OC-TCi и Aalborg OL" }];

export const alfalavalSeries: Series[] = [
  {
    id: "aalborg-oc-tci",
    name: "Aalborg OC-TCi",
    categoryId: "steam",
    kind: "Судовой композитный: топка и утилизация выхлопа",
    image: "/catalog/vertical.jpg",
    summary: "На alfalaval.com топка 1 200–6 500 кг/ч, выхлоп 300–5 000 кг/ч.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: 1200,
    steamMaxKgH: 6500,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["diesel", "heavy"] as FuelId[],
    feature: "Масла, биотопливо; опция другого топлива или электрического гибрида",
    extra: `${checked} На alfalaval.com топка даёт 1200–6500 кг/ч, сторона выхлопа 300–5000 кг/ч. Страница alfalaval.sg пишет другие границы: топка 750–8000 кг/ч, выхлоп 180–5000 кг/ч, расчётное давление 9 бар. В карточке оставлен диапазон глобальной страницы. Давление из-за расхождения не поставлено. В каталоге Aalborg есть и другие котлы, в эту поставку вошли две линии.`,
    sizes: [],
    sizesNote: "Нижняя граница карточки — топка. Сторона выхлопа 300–5 000 кг/ч в типоразмеры не разложена.",
    aliases: ["oc-tci", "mission"],
  },
  {
    id: "aalborg-ol",
    name: "Aalborg OL",
    categoryId: "steam",
    kind: "Судовой, вертикальный, два барабана",
    image: "/catalog/vertical.jpg",
    summary: "12 500–55 000 кг/ч. Расчётное давление 9 или 18 бар.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: 12500,
    steamMaxKgH: 55000,
    tempMaxC: null,
    pressureNote: "9 или 18 бар",
    fuels: ["gas", "diesel", "heavy"] as FuelId[],
    feature: "Жидкое топливо или газ, верхняя топка",
    extra: `${checked} Страница Aalborg OL: capacity 12,500–55,000 kg/h, design pressure 9 or 18 bar(g). Звёздочка у диапазона на странице есть, сноска в это извлечение не попала.`,
    sizes: [],
    sizesNote: "Типоразмеры внутри диапазона не названы.",
    aliases: ["ol", "mission ol"],
  },
];

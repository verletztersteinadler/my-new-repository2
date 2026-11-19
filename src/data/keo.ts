import type { Category, Series, Size } from "@/data/catalog";

const checked = "Сверка 18.11.2026. keo.by. Котельные и системы топливоподачи не внесены.";

const mw = (id: string, name: string, value: number): Size => ({ id, name, powerKw: Math.round(value * 1000), steamKgH: null });

export const keoCategories: Category[] = [{ id: "water", title: "Водогрейные", param: "power" }];
export const keoDocuments = [{ title: "Котлы keo.by" }];
export const keoSeries: Series[] = [
  {
    id: "keo-kvp",
    name: "ГСКБ КЭО КВп",
    categoryId: "water",
    kind: "Пиролизный",
    image: "/catalog/solid.jpg",
    summary: "0,08–1 МВт. Вода до 95 °C, в таблице ещё 110 °C.",
    powerMinKw: 80,
    powerMaxKw: 1000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: 110,
    pressureNote: "0,6 МПа",
    fuels: ["solid"],
    feature: "Щепа или дрова",
    extra: `${checked} Щепа — для механизированной подачи, дрова — для ручной. Вход воды 70 °C.`,
    sizes: [0.08, 0.14, 0.3, 0.45, 0.6, 1].map((value) => mw(`kvp-${value}`, `КВп-${String(value).replace(".", ",")}`, value)),
    sizesNote: null,
    aliases: [],
  },
  {
    id: "keo-kvm",
    name: "ГСКБ КЭО КВм",
    categoryId: "water",
    kind: "Водогрейный",
    image: "/catalog/solid.jpg",
    summary: "0,06–1 МВт. Вода до 95 °C.",
    powerMinKw: 60,
    powerMaxKw: 1000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: 95,
    pressureNote: "0,25 МПа",
    fuels: ["solid"],
    feature: "Уголь и древесные пеллеты",
    extra: `${checked} Вход воды 60 °C.`,
    sizes: [0.06, 0.09, 0.14, 0.3, 0.4, 0.6, 0.8, 1].map((value) => mw(`kvm-${value}`, `КВм-${String(value).replace(".", ",")}`, value)),
    sizesNote: null,
    aliases: [],
  },
];

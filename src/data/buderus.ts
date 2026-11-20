import type { Category, FuelId, Series, Size } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Logano plus SB625, страница Buderus и польский лист. Мощность — номинальная при 50/30 °C на газе.";

const outputs = [145, 185, 240, 310, 400, 510, 640];

export const buderusCategories: Category[] = [{ id: "water", title: "Водогрейные", param: "power" }];

export const buderusDocuments = [{ title: "Logano plus SB625" }];

export const buderusSeries: Series[] = [
  {
    id: "buderus-sb625",
    name: "Buderus Logano plus SB625",
    categoryId: "water",
    kind: "Конденсационный, газ или жидкое топливо",
    image: "/catalog/floor-cond.jpg",
    summary: "Семь размеров, 145–640 кВт.",
    powerMinKw: 145,
    powerMaxKw: 640,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["gas", "diesel"] as FuelId[],
    feature: "Низкосернистое масло, сера менее 50 ppm",
    extra: `${checked} В шапке листа колонка на 510 кВт подписана «500». В размер поставлена мощность 510 кВт.`,
    sizes: outputs.map(
      (powerKw): Size => ({ id: `buderus-sb625-${powerKw}`, name: `SB625-${powerKw}`, powerKw, steamKgH: null }),
    ),
    sizesNote: null,
    aliases: ["sb625", "logano"],
  },
];

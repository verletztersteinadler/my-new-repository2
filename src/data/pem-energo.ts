import type { Category, Series, Size } from "@/data/catalog";

const checked = "Сверка 18.11.2026. В каталоге pem-energo.ru открыты четыре котла. Котельные и вспомогательное оборудование не внесены.";

export const pemCategories: Category[] = [
  { id: "steam", title: "Паровые", param: "steam" },
  { id: "water", title: "Водогрейные", param: "power" },
];
export const pemDocuments = [{ title: "Каталог pem-energo.ru" }];
export const pemSeries: Series[] = [
  {
    id: "pem-steam",
    name: "ПроЭнергоМаш, паровые",
    categoryId: "steam",
    kind: "Паровой",
    image: "/catalog/waterpipe.jpg",
    summary: "Две открытые модели: 2,5 и 6,5 т/ч, 1,3 МПа.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: 2500,
    steamMaxKgH: 6500,
    tempMaxC: null,
    pressureNote: "1,3 МПа",
    fuels: ["solid"],
    feature: "Уголь или кородревесные отходы",
    extra: `${checked} Е-2,5-1,4: уголь, насыщенный пар 175 °C. Е-6,5-1,4 КДО: кородревесные отходы, насыщенный пар 194 °C. На карточке 6,5 сказано, что возможен перегрев до 380 °C и газ на время отсутствия растительного топлива.`,
    sizes: [
      { id: "pem-e25", name: "Е-2,5-1,4", powerKw: null, steamKgH: 2500 },
      { id: "pem-e65", name: "Е-6,5-1,4 КДО", powerKw: null, steamKgH: 6500 },
    ] as Size[],
    sizesNote: null,
    aliases: [],
  },
  {
    id: "pem-water",
    name: "ПроЭнергоМаш КВм",
    categoryId: "water",
    kind: "Водогрейный",
    image: "/catalog/solid.jpg",
    summary: "2,5 и 3,5 МВт, уголь, 0,6 МПа.",
    powerMinKw: 2500,
    powerMaxKw: 3500,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: "0,6 МПа",
    fuels: ["solid"],
    feature: "Уголь",
    extra: `${checked} КВм-2,5: 2,5 МВт (2,15 Гкал), вода 70/95 °C. КВм-3,5: 3,5 МВт (3,0 Гкал), вода 70/110 °C.`,
    sizes: [
      { id: "pem-25", name: "КВм-2,5", powerKw: 2500, steamKgH: null },
      { id: "pem-35", name: "КВм-3,5", powerKw: 3500, steamKgH: null },
    ],
    sizesNote: null,
    aliases: [],
  },
];

import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страница Ariterm Bio на ariterm.fi.";

export const aritermCategories: Category[] = [{ id: "water", title: "Водогрейные", param: "power" }];

export const aritermDocuments = [{ title: "Ariterm Bio" }];

export const aritermSeries: Series[] = [
  {
    id: "ariterm-bio",
    name: "Ariterm Bio",
    categoryId: "water",
    kind: "Водогрейный, биотопливо",
    image: "/catalog/solid.jpg",
    summary: "120–4 000 кВт. Рабочее давление 4–10 бар.",
    powerMinKw: 120,
    powerMaxKw: 4000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: "4–10 бар",
    fuels: ["solid"] as FuelId[],
    feature: "Отдельно названы котлы 6 и 10 бар на 500–3 000 кВт",
    extra: `${checked} Список Bio120, Bio150 и горелок HakeJet на странице завода в этом извлечении нет. Он есть у сервисной компании и в ряд не перенесён.`,
    sizes: [],
    sizesNote: "Типоразмеры на странице завода не разложены.",
    aliases: ["bio"],
  },
];

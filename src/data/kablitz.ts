import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страница паровых kablitz.de. 120 МВт, 100 бар и 520 °C — отдельные потолки, не одна точка. Объекты не внесены.";

export const kablitzCategories: Category[] = [{ id: "steam", title: "Паровые", param: "steam" }];
export const kablitzDocuments = [{ title: "Пар Kablitz" }];
export const kablitzSeries: Series[] = [
  {
    id: "kablitz-v",
    name: "Kablitz, вертикальный водотрубный",
    categoryId: "steam",
    kind: "Биомасса",
    image: "/catalog/waterpipe.jpg",
    summary: "До примерно 120 МВт. До примерно 100 бар и 520 °C, не одновременно.",
    powerMinKw: null,
    powerMaxKw: 120000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: 520,
    pressureNote: "до примерно 100 бар, не вместе с 120 МВт",
    fuels: ["solid"] as FuelId[],
    feature: "Биомасса",
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: [],
  },
  {
    id: "kablitz-ft",
    name: "Kablitz, комбинированный жаротрубный",
    categoryId: "steam",
    kind: "Жаровая труба с водотрубным экраном",
    image: "/catalog/firetube.jpg",
    summary: "До примерно 40 т/ч и 40 бар.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: null,
    steamMaxKgH: 40000,
    tempMaxC: null,
    pressureNote: "до примерно 40 бар",
    fuels: ["solid"],
    feature: "Отходы древесины и RDF названы для горизонтальных котлов рядом",
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: [],
  },
];

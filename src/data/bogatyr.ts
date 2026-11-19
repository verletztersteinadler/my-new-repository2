import type { Category, FuelId, Series, Size } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Каталог механической загрузки kotel-bogatyr.ru. Список на странице продолжается.";

const rows: [string, number][] = [
  ["Богатырь-1,44Ка", 1440],
  ["Богатырь-1,74Ка", 1740],
  ["Богатырь-2,0Ка", 2000],
  ["Богатырь-2,5Ка", 2500],
];

export const bogatyrCategories: Category[] = [{ id: "water", title: "Водогрейные", param: "power" }];
export const bogatyrDocuments = [{ title: "Богатырь Ка" }];
export const bogatyrSeries: Series[] = [
  {
    id: "bogatyr-ka",
    name: "Богатырь, механическая загрузка",
    categoryId: "water",
    kind: "ТШП",
    image: "/catalog/solid.jpg",
    summary: "Прочитанные размеры 1,44–2,5 МВт. Режим 95–70 °C.",
    powerMinKw: 1440,
    powerMaxKw: 2500,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: 95,
    pressureNote: null,
    fuels: ["solid"] as FuelId[],
    feature: "Древесные отходы и опил в строке КПД",
    extra: checked,
    sizes: rows.map(([name, powerKw]): Size => ({ id: `bogatyr-${powerKw}`, name, powerKw, steamKgH: null })),
    sizesNote: null,
    aliases: [],
  },
];

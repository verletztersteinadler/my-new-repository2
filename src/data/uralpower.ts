import type { Category, Series, Size } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страница паровых vladivostok.ural-power.ru. Между UPE-50 и UPE-300 модели на этой странице не показаны.";

const rows: [string, number, number][] = [
  ["UPE-50", 35, 50],
  ["UPE-300", 200, 300],
  ["UPE-400", 280, 400],
  ["UPE-1000", 700, 1000],
  ["UPE-1200", 850, 1200],
];

export const uralpowerCategories: Category[] = [{ id: "steam", title: "Паровые", param: "steam" }];
export const uralpowerDocuments = [{ title: "UPE" }];
export const uralpowerSeries: Series[] = [
  {
    id: "ural-upe",
    name: "Ural-Power UPE",
    categoryId: "steam",
    kind: "Электрический",
    image: "/catalog/cabinet.jpg",
    summary: "Прочитанные размеры 50–1 200 кг/ч, 35–850 кВт. Пар 110–191 °C.",
    powerMinKw: 35,
    powerMaxKw: 850,
    steamMinKgH: 50,
    steamMaxKgH: 1200,
    tempMaxC: 191,
    pressureNote: "0,05–1,2 МПа",
    fuels: [],
    feature: "Электрический",
    extra: checked,
    sizes: rows.map(([name, powerKw, steamKgH]): Size => ({ id: `ural-${name}`, name, powerKw, steamKgH })),
    sizesNote: null,
    aliases: ["upe"],
  },
];

import type { Category, FuelId, Series, Size } from "@/data/catalog";

const checked = "Сверка 18.11.2026. Каталог vtek43.ru. Исполнения на раме, шахтной топке и со встроенной трубой одной мощности не разворачивались. Котельные и сушильные камеры не внесены. На главной написано «до 4 МВт», в открытых карточках этого потолка нет.";

function water(id: string, name: string, steps: number[], fuels: FuelId[], feature: string, extra: string): Series {
  const sizes: Size[] = steps.map((mw) => ({
    id: `${id}-${String(mw).replace(".", "-")}`,
    name: `${name.split(" ").slice(-1)[0]}-${String(mw).replace(".", ",")}`,
    powerKw: Math.round(mw * 1000),
    steamKgH: null,
  }));
  const powers = sizes.map((item) => item.powerKw!);
  return {
    id,
    name,
    categoryId: "water",
    kind: "Водогрейный",
    image: id.endsWith("kva") ? "/catalog/waterpipe.jpg" : "/catalog/solid.jpg",
    summary: feature,
    powerMinKw: Math.min(...powers),
    powerMaxKw: Math.max(...powers),
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels,
    feature,
    extra: `${checked} ${extra}`,
    sizes,
    sizesNote: "Температура и давление на карточках каталога не указаны.",
    aliases: ["садко"],
  };
}

export const vtekCategories: Category[] = [{ id: "water", title: "Водогрейные", param: "power" }];
export const vtekDocuments = [{ title: "Каталог vtek43.ru" }];
export const vtekSeries: Series[] = [
  water(
    "vtek-kvr",
    "САДКО КВр",
    [0.1, 0.15, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.8, 0.93, 1.16, 1.5, 2, 2.5],
    ["solid"],
    "0,1–2,5 МВт",
    "В карточках раздела топливо — дрова и брикет.",
  ),
  water(
    "vtek-kvm",
    "САДКО КВм",
    [0.25, 0.3, 0.4, 0.6, 0.8, 0.93, 1.16, 1.5, 2, 2.5, 3],
    ["solid"],
    "0,25–3 МВт",
    "В карточках раздела топливо — уголь, щепа и опилки, кора, лузга.",
  ),
  water(
    "vtek-kva",
    "САДКО КВа",
    [0.3, 0.4, 0.5, 0.6, 0.75, 0.8, 1, 1.1, 1.2, 1.25, 1.32, 1.5, 1.6, 1.85, 2, 2.2, 2.5, 3, 3.5],
    ["gas"],
    "0,3–3,5 МВт",
    "Одна карточка «на газе» без мощности в ряд не вошла.",
  ),
];

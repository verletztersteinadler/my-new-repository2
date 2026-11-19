import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страница применения Mingazzini. У PVR EU строка 350–4 000 кг/ч подписана «rated pressure». Это пар: следующая строка — давление до 18 бар.";

const fuels: FuelId[] = ["gas", "diesel"];

function steam(id: string, name: string, min: number, max: number, pressure: string, feature: string): Series {
  return {
    id,
    name,
    categoryId: "steam",
    kind: "Жаротрубный",
    image: "/catalog/steam.jpg",
    summary: `${min.toLocaleString("ru-RU")}–${max.toLocaleString("ru-RU")} кг/ч.`,
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: min,
    steamMaxKgH: max,
    tempMaxC: null,
    pressureNote: pressure,
    fuels,
    feature,
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: [],
  };
}

function water(id: string, name: string, min: number, max: number, pressure: string): Series {
  return {
    id,
    name,
    categoryId: "water",
    kind: "Жаротрубный",
    image: "/catalog/firetube.jpg",
    summary: `${min.toLocaleString("ru-RU")}–${max.toLocaleString("ru-RU")} кВт. Температура выше 110 °C.`,
    powerMinKw: min,
    powerMaxKw: max,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: pressure,
    fuels,
    feature: "Выше 110 °C, верх не назван",
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: [],
  };
}

export const mingazziniCategories: Category[] = [
  { id: "steam", title: "Паровые", param: "steam" },
  { id: "water", title: "Водогрейные", param: "power" },
];
export const mingazziniDocuments = [{ title: "PVR и PB" }];
export const mingazziniSeries: Series[] = [
  steam("ming-pvr", "Mingazzini PVR EU", 350, 4000, "до 18 бар", "Пар"),
  steam("ming-pb", "Mingazzini PB EU", 2000, 30000, "до 22 бар", "Пар"),
  water("ming-pvrhs", "Mingazzini PVR HS", 350, 3200, "до 18 бар"),
  water("ming-pbhs", "Mingazzini PB HS", 1400, 17000, "до 18 бар"),
  water("ming-pbhc", "Mingazzini PB HC", 3500, 17000, "до 18 бар"),
];

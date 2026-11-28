import type { Category, FuelId, Series } from "@/data/catalog";

const checked =
  "Сверка 28.11.2026, engineeredair.com (Engineered Air Ltd., Канада, Калгари). Кастомные промышленные воздухонагреватели: непрямого нагрева DJ, DG и воздухообменные DJP/DGP, а также юнит-хитеры CUH, HUH, VUH. Раздел прямого нагрева (direct fired), рекуперация, тепловые насосы, фанкойлы и другое климатическое оборудование производителя вне карточки. Каталог конфигурируется под проект, табличного ряда на витрине нет.";

export const engineeredAirCategories: Category[] = [{ id: "air", title: "Воздухонагреватели", param: "power" }];

export const engineeredAirDocuments = [{ title: "Engineered Air Ltd." }];

function series(id: string, name: string, kind: string, extraNote: string): Series {
  return {
    id,
    name,
    categoryId: "air",
    kind,
    image: "/catalog/web-air.jpg",
    summary: "Кастомная конфигурация под проект; таблицы ряда нет.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["gas"] as FuelId[],
    feature: "Цифры ряда не сняты",
    extra: checked + " " + extraNote,
    sizes: [],
    sizesNote: "Производитель конфигурирует агрегаты под проект; типоразмерной таблицы на витрине нет.",
    aliases: [],
  };
}

export const engineeredAirSeries: Series[] = [
  series(
    "engineered-air-dj-dg",
    "DJ / DG непрямого нагрева",
    "Газовый, непрямого нагрева",
    "Раздел Indirect Fired: DJ Heating Units и DG Heating Units; воздухообменные агрегаты DJP/DGP (air turnover) для перемешивания объёма.",
  ),
  series(
    "engineered-air-unit-heaters",
    "CUH / HUH / VUH юнит-хитеры",
    "Газовый, юнит-хитер",
    "Раздел Heat Transfer: юнит-хитеры CUH, HUH, VUH для локального воздушного отопления.",
  ),
];

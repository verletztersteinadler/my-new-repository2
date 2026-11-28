import type { Category, FuelId, Series } from "@/data/catalog";

const checked =
  "Сверка 28.11.2026, lbwhite.com (L.B. White Company, LLC, США, Висконсин). Переносные и стационарные тепловые пушки и приточные установки для промышленности, ангарных работ и обогрева тентов. Аграрные серии (Guardian, Classic, брудеры, инфракрасные Sentinel/Oval) вне карточки. Таблицы BTUH в спецификациях производителя; модельные ряды на витрине таблицей не опубликованы. У витрины есть русская версия.";

export const lbwhiteCategories: Category[] = [{ id: "air", title: "Воздухонагреватели", param: "power" }];

export const lbwhiteDocuments = [{ title: "L.B. White Company, LLC" }];

function series(id: string, name: string, kind: string, fuels: FuelId[], extraNote: string): Series {
  return {
    id,
    name,
    categoryId: "air",
    kind,
    image: "/catalog/web-air.jpg",
    summary: "Модельный ряд в спецификациях производителя.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: fuels as FuelId[],
    feature: "Цифры ряда не сняты",
    extra: checked + " " + extraNote,
    sizes: [],
    sizesNote: "Таблица типоразмеров на странице серии не опубликована.",
    aliases: [],
  };
}

export const lbwhiteSeries: Series[] = [
  series(
    "lbwhite-tradesman",
    "Tradesman переносные прямого нагрева",
    "Газовый, переносной, прямого нагрева",
    ["gas", "diesel"],
    "Tradesman Portable Forced Air Heater; есть керосиновое исполнение (Portable Kerosene Heater).",
  ),
  series(
    "lbwhite-boss",
    "Boss переносные прямого нагрева",
    "Газовый, переносной, прямого нагрева",
    ["gas"],
    "Boss Direct-Fired Portable Heater.",
  ),
  series(
    "lbwhite-general",
    "General непрямого нагрева",
    "Газовый, непрямого нагрева",
    ["gas"],
    "General Indirect-Fired Forced Air Heater.",
  ),
  series(
    "lbwhite-journeyman",
    "Journeyman переносные непрямого нагрева",
    "Газовый, переносной, непрямого нагрева",
    ["gas"],
    "Journeyman Indirect-Fired Portable Heater.",
  ),
  series(
    "lbwhite-foreman",
    "Foreman переносные непрямого нагрева",
    "Газовый, переносной, непрямого нагрева",
    ["gas"],
    "Foreman Indirect-Fired Portable Heater.",
  ),
  series(
    "lbwhite-commander",
    "Commander приточные (make-up air)",
    "Газовый, приточная установка",
    ["gas"],
    "Commander Make-Up Air Unit.",
  ),
];

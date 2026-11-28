import type { Category, FuelId, Series } from "@/data/catalog";

const checked =
  "Сверка 28.11.2026, cambridgeair.com (Cambridge Air Solutions, США). Промышленные газовые воздухонагреватели прямого нагрева: технология HTHV (High Temperature Heating and Ventilation) и запатентованная схема Blow-Thru со скоростной подачей воздуха. Склады, фабрики, распределительные центры. ESC-Series (испарительное охлаждение), E-Series и Spec Air (защита от замерзания) вне карточки. Модельные сетки опубликованы в литературе производителя (MBH), таблицы ряда на страницах серий нет.";

export const cambridgeCategories: Category[] = [{ id: "air", title: "Воздухонагреватели", param: "power" }];

export const cambridgeDocuments = [{ title: "Cambridge Air Solutions" }];

function series(id: string, name: string, kind: string, summary: string, extraNote: string): Series {
  return {
    id,
    name,
    categoryId: "air",
    kind,
    image: "/catalog/web-air.jpg",
    summary,
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["gas"] as FuelId[],
    feature: "Модельная сетка в спецификациях производителя",
    extra: checked + " " + extraNote,
    sizes: [],
    sizesNote: "Таблица типоразмеров на странице серии не опубликована; модельная сетка приведена в литературе производителя.",
    aliases: [],
  };
}

export const cambridgeSeries: Series[] = [
  series(
    "cambridge-s",
    "S-Series Industrial Space Heater",
    "Газовый, прямого нагрева, HTHV",
    "Высокотемпературный скоростной обогрев больших объёмов.",
    "S-Series: прямой газовый нагрев для складов и промышленных зданий; высокоскоростная подача способствует выравниванию температуры по объёму.",
  ),
  series(
    "cambridge-sa",
    "SA-Series",
    "Газовый, прямого нагрева",
    "Компактные обогреватели для объектов с невысокими теплопотребностями.",
    "SA-Series: компактная серия, позиционируется как замена юнит-хитеров; заявлено на 20–70 % меньше энергии на подогрев инфильтрации, чем у обычных систем.",
  ),
  series(
    "cambridge-m-mua",
    "M-Series Make-Up Air",
    "Газовый, приточная установка",
    "Приточные установки с газовым нагревом (make-up air).",
    "M-Series: приточный нагрев для компенсации вытяжки; меню производителя также относит M-Series к испарительному охлаждению — на дату сверки разделы пересекаются.",
  ),
];

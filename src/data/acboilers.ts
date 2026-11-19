import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. AC Boilers, бывшая Ansaldo Caldaie.";

function line(id: string, name: string, kind: string, feature: string, fuels: FuelId[], pressure: string | null, extra: string, image: string): Series {
  return {
    id,
    name,
    categoryId: "steam",
    kind,
    image,
    summary: feature,
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: pressure,
    fuels,
    feature,
    extra: `${checked} ${extra}`,
    sizes: [],
    sizesNote: "Это тип конструкции, не ряд типоразмеров. Мощности на странице нет.",
    aliases: [],
  };
}

export const acboilersCategories: Category[] = [{ id: "steam", title: "Паровые", param: "steam" }];

export const acboilersDocuments = [{ title: "Страница энергетических котлов AC Boilers" }];

export const acboilersSeries: Series[] = [
  line(
    "acb-usc",
    "AC Boilers, суперкритический Benson",
    "Прямоточный, два хода",
    "Температура пара за пароперегревателем выше 600 °C",
    ["solid", "gas", "heavy"],
    null,
    "Страница Utility Boilers: once-through Benson, два хода, низкие NOx, уголь и жидкое или газовое топливо. Паропроизводительность не названа.",
    "/catalog/waterpipe.jpg",
  ),
  line(
    "acb-sub-og",
    "AC Boilers, докритический, два хода, жидкое топливо и газ",
    "Барабанный, естественная циркуляция",
    "Встречное сжигание",
    ["gas", "heavy"],
    "до 180 бар",
    "Там же: high sub-critical pressure up to 180 bar.",
    "/catalog/waterpipe.jpg",
  ),
  line(
    "acb-sub-coal",
    "AC Boilers, докритический, два хода, уголь",
    "Барабанный, естественная циркуляция",
    "Встречное угольное сжигание",
    ["solid"],
    "до 180 бар",
    "Отдельная строка страницы для угольного двухходового котла.",
    "/catalog/solid.jpg",
  ),
  line(
    "acb-box",
    "AC Boilers, докритический, короб, жидкое топливо и газ",
    "Барабанный, естественная циркуляция",
    "Коробчатая компоновка",
    ["gas", "heavy"],
    "до 180 бар",
    "Box design на той же странице.",
    "/catalog/waterpipe.jpg",
  ),
  line(
    "acb-hrsg-h",
    "AC Boilers HRSG, горизонтальный, естественная циркуляция",
    "Котёл-утилизатор",
    "Один–три уровня давления, с промперегревом или без",
    [],
    null,
    "Описание HRSG: horizontal, natural circulation. Цифры давления и пара на странице не даны.",
    "/catalog/skid.jpg",
  ),
  line(
    "acb-hrsg-b",
    "AC Boilers HRSG, горизонтальный Benson",
    "Котёл-утилизатор, прямоточный",
    "Прямоточный испаритель высокого давления",
    [],
    null,
    "Horizontal, once-through Benson. Типоразмеры не названы.",
    "/catalog/skid.jpg",
  ),
  line(
    "acb-hrsg-v",
    "AC Boilers HRSG, вертикальный",
    "Котёл-утилизатор, принудительная циркуляция",
    "Один–три уровня давления",
    [],
    null,
    "Vertical, assisted circulation. Типоразмеры не названы.",
    "/catalog/vertical.jpg",
  ),
];

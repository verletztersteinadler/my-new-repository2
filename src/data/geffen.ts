import type { Category, Series, Size } from "@/data/catalog";

const checked = "Сверка 15.11.2026, geffen.ru. На сайте указано ООО «Геффен», производство: Тула, Щегловская засека, 31.";

function sizes(label: string, values: number[]): Size[] {
  return values.map((powerKw) => ({
    id: `geffen-${label}-${powerKw}`,
    name: `GEFFEN ${label}-${powerKw}`,
    powerKw,
    steamKgH: null,
  }));
}

export const geffenCategories: Category[] = [{ id: "water", title: "Водогрейные", param: "power" }];

export const geffenSeries: Series[] = [
  {
    id: "geffen-mb31",
    name: "GEFFEN MB 3.1",
    categoryId: "water",
    kind: "Водогрейный, конденсационный",
    image: "/catalog/floor-cond.jpg",
    summary: "Серия есть в каталоге котлов. На странице раздела 15.11.2026 модели и мощность не показаны.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: [],
    feature: "Модели на странице не показаны",
    extra: `${checked} Источник: https://geffen.ru/product/kotloagregaty_modulnye_geffen_mb/kotly_geffen_1/kotly_geffen_mv_3_1/. Цифры с других серий сюда не переносились.`,
    sizes: [],
    sizesNote: "Карточки типоразмеров на странице серии в день сверки не открылись.",
    aliases: ["mb 3.1", "мв 3.1"],
  },
  {
    id: "geffen-mb41",
    name: "GEFFEN MB 4.1",
    categoryId: "water",
    kind: "Водогрейный, конденсационный, напольный",
    image: "/catalog/floor-cond.jpg",
    summary: "Газовые конденсационные котлы. В каталоге названы 40, 60, 80 и 99 кВт. Руководство серии: от 40 до 99 кВт.",
    powerMinKw: 40,
    powerMaxKw: 99,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: 85,
    pressureNote: "3 бар на карточке MB 4.1-99",
    fuels: ["gas"],
    feature: "Конденсационный",
    extra: `${checked} Источник: https://geffen.ru/product/kotloagregaty_modulnye_geffen_mb/kotly_geffen_1/kotly_geffen_mb_4_1/. Давление 3 бар и температура 85 °C сняты с карточки 99 кВт, не с каждого типоразмера. На той же карточке указана перенастройка на СУГ.`,
    sizes: sizes("MB 4.1", [40, 60, 80, 99]),
    sizesNote: null,
    aliases: ["mb 4.1", "мв 4.1"],
  },
  {
    id: "geffen-mb51",
    name: "GEFFEN MB 5.1",
    categoryId: "water",
    kind: "Водогрейный, конденсационный, модульный",
    image: "/catalog/floor-cond.jpg",
    summary: "Модульные конденсационные котлы. В каталоге названы 101, 151, 178, 261, 268 и 392 кВт. Руководство: от 101 до 392 кВт.",
    powerMinKw: 101,
    powerMaxKw: 392,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: 95,
    pressureNote: "6 бар на карточке MB 5.1-178",
    fuels: ["gas"],
    feature: "Модульный",
    extra: `${checked} Источник: https://geffen.ru/product/kotloagregaty_modulnye_geffen_mb/kotly_geffen_1/kotly_geffen_mb_5_1/. Давление 6 бар и температура 95 °C сняты с карточки 178 кВт. Карточка говорит, что котёл собран из нескольких модулей.`,
    sizes: sizes("MB 5.1", [101, 151, 178, 261, 268, 392]),
    sizesNote: null,
    aliases: ["mb 5.1", "мв 5.1"],
  },
  {
    id: "geffen-mb71",
    name: "GEFFEN MB 7.1",
    categoryId: "water",
    kind: "Водогрейный, конденсационный, напольный",
    image: "/catalog/floor-cond.jpg",
    summary: "Конденсационные котлы с теплообменником из нержавеющей стали. В каталоге 320, 350, 400, 458 и 501 кВт. Руководство: от 320 до 501 кВт.",
    powerMinKw: 320,
    powerMaxKw: 501,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: 95,
    pressureNote: "5,5 бар на карточке MB 7.1-458",
    fuels: ["gas"],
    feature: "Нержавеющий теплообменник",
    extra: `${checked} Источник: https://geffen.ru/product/kotloagregaty_modulnye_geffen_mb/kotly_geffen_1/kotly_geffen_mb_7_1/. Давление 5,5 бар и температура воды на выходе 95 °C сняты с карточки 458 кВт. На ней же указана возможность работы на СУГ.`,
    sizes: sizes("MB 7.1", [320, 350, 400, 458, 501]),
    sizesNote: null,
    aliases: ["mb 7.1", "мв 7.1"],
  },
];

export const geffenDocuments = [
  { title: "MB 3.1", href: "https://geffen.ru/product/kotloagregaty_modulnye_geffen_mb/kotly_geffen_1/kotly_geffen_mv_3_1/" },
  { title: "MB 4.1", href: "https://geffen.ru/product/kotloagregaty_modulnye_geffen_mb/kotly_geffen_1/kotly_geffen_mb_4_1/" },
  { title: "MB 5.1", href: "https://geffen.ru/product/kotloagregaty_modulnye_geffen_mb/kotly_geffen_1/kotly_geffen_mb_5_1/" },
  { title: "MB 7.1", href: "https://geffen.ru/product/kotloagregaty_modulnye_geffen_mb/kotly_geffen_1/kotly_geffen_mb_7_1/" },
];

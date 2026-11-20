import type { Category, FuelId, Series, Size } from "@/data/catalog";

const checked = "Сверка 16.11.2026. ООО «ФНС», Краснодар.";

function sizes(prefix: string, values: number[]): Size[] {
  return values.map((powerKw) => ({
    id: `web-${prefix}-${powerKw}`,
    name: `W.E.B. ${powerKw}`,
    powerKw,
    steamKgH: null,
  }));
}

const powers = [25, 50, 100, 150, 200, 250, 300, 400];

export const webCategories: Category[] = [
  { id: "water", title: "Водогрейные", param: "power" },
  { id: "air", title: "Теплогенераторы", param: "power" },
];

export const webSeries: Series[] = [
  {
    id: "web-water",
    name: "Котлы W.E.B.",
    categoryId: "water",
    kind: "Водогрейный, под жидкотопливную и газовую горелку",
    image: "/catalog/web-boiler.jpg",
    summary: "На странице восемь мощностей, 25–400 кВт. Рабочие давление и температура не указаны.",
    powerMinKw: 25,
    powerMaxKw: 400,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["gas", "diesel", "furnace"] satisfies FuelId[],
    feature: "Газ, дизель, отработка, печное",
    extra: `${checked} Буквенного ряда нет, в каталоге только киловатты. Сталь на странице названа «О9Г2С», толщина стенки камеры 8 мм. Опрессовка 10 атмосфер — заводское испытание, не рабочее давление. На одной плашке гарантия 5 лет на прогорание камеры, на следующей — 1 год на прогорание стали. Отработка названа отдельно; в фильтре каталога для неё нет своего вида топлива. Дрова, пеллеты и мазут стоят в анкете заявки, не в описании котла. Страница паровых котлов содержит четыре карточки без названий и параметров, ряд не публикуется. Раздел импортных котлов — чужие марки, не серия W.E.B.`,
    sizes: sizes("water", powers),
    sizesNote: "Имена собраны из мощностей на странице. Отдельных обозначений моделей нет.",
    aliases: ["web", "wiseecoburner", "котлы"],
  },
  {
    id: "web-air",
    name: "Теплогенераторы W.E.B.",
    categoryId: "air",
    kind: "Воздушный теплогенератор",
    image: "/catalog/web-air.jpg",
    summary: "На странице те же восемь мощностей, 25–400 кВт. Температура и давление не указаны.",
    powerMinKw: 25,
    powerMaxKw: 400,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["diesel", "furnace", "heavy"] satisfies FuelId[],
    feature: "Жидкое и печное топливо",
    extra: `${checked} Страница пишет «любое жидкое и печное топливо» и отдельно называет трансформаторное масло, дизель и флотский мазут. Газовый розжиг относится к горелке, не к виду топлива теплогенератора. КПД назван «самым высоким» без цифры. Срок службы — более 10 лет. Иллюстрация — опубликованный шкаф без надписей.`,
    sizes: sizes("air", powers),
    sizesNote: "Имена собраны из мощностей на странице. Отдельных обозначений моделей нет.",
    aliases: ["теплогенератор", "воздушный"],
  },
];

export const webDocuments: { title: string; href: string }[] = [];

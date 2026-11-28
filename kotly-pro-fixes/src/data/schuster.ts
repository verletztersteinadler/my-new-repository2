import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 28.11.2026. Каталог schusterboilers.com (Industrial: Steam / Superheated Water / Thermal Oil / Industrial Hot Water; Professional: Commercial Steel Boilers / Steel condensation).";

const fuels: FuelId[] = ["gas", "diesel"];

function steamGen(id: string, name: string, kind: string, minKg: number, maxKg: number, minKw: number | null, maxKw: number | null, pressureNote: string, feature: string, extra: string, fuelsArg: FuelId[] = fuels): Series {
  return {
    id,
    name,
    categoryId: "steam",
    kind,
    image: "/catalog/steam.jpg",
    summary: `${minKg.toLocaleString("ru-RU")}–${maxKg.toLocaleString("ru-RU")} кг/ч.`,
    powerMinKw: minKw,
    powerMaxKw: maxKw,
    steamMinKgH: minKg,
    steamMaxKgH: maxKg,
    tempMaxC: null,
    pressureNote,
    fuels: fuelsArg,
    feature,
    extra: `${checked} ${extra}`,
    sizes: [],
    sizesNote: null,
    aliases: [],
  };
}

function powerGen(id: string, name: string, categoryId: string, kind: string, min: number, max: number, pressureNote: string | null, feature: string, extra: string, image = "/catalog/firetube.jpg"): Series {
  return {
    id,
    name,
    categoryId,
    kind,
    image,
    summary: `${min.toLocaleString("ru-RU")}–${max.toLocaleString("ru-RU")} кВт.`,
    powerMinKw: min,
    powerMaxKw: max,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote,
    fuels,
    feature,
    extra: `${checked} ${extra}`,
    sizes: [],
    sizesNote: null,
    aliases: [],
  };
}

export const schusterCategories: Category[] = [
  { id: "water", title: "Водогрейные", param: "power" },
  { id: "hw170", title: "Свыше 115 °C", param: "power" },
  { id: "steam", title: "Паровые", param: "steam" },
  { id: "oil", title: "Термомасляные", param: "power" },
];
export const schusterDocuments = [{ title: "DE" }, { title: "DE 3G" }, { title: "DE3'12" }, { title: "EL7" }, { title: "WWG" }, { title: "WWG3" }, { title: "SCHD" }, { title: "TOX" }, { title: "DDS" }, { title: "DST" }, { title: "KDE" }];

export const schusterSeries: Series[] = [
  steamGen("schuster-de12", "Schuster DE 12", "Паровой высокого давления, реверсивная топка, гладкие трубы с турбулизаторами", 300, 6000, 204, 4089, "12 бар (выше по запросу)", "Моноблок высокого давления", ""),
  steamGen("schuster-de3g", "Schuster DE 3G", "Паровой высокого давления, 3 эффективных хода, мокрое дно", 500, 4000, 341, 2728, "12 бар (выше по запросу)", "Моноблок высокого давления", ""),
  steamGen("schuster-de312", "Schuster DE3' 12", "Паровой высокого давления, 3 эффективных хода, мокрое дно", 2000, 25000, 1328, 16607, "12 бар (выше по запросу)", "Крупный моноблок высокого давления", ""),
  steamGen("schuster-de1", "Schuster DE 1", "Паровой низкого давления, реверсивная топка", 1250, 4000, 838, 2683, "0,98 бар", "Низкое давление (вне надзора в ЕС)", ""),
  steamGen("schuster-de1cb", "Schuster DE 1 CB", "Паровой низкого давления, реверсивная топка", 100, 1000, 67, 671, "0,98 бар", "Низкое давление (вне надзора в ЕС)", ""),
  {
    id: "schuster-el7",
    name: "Schuster EL7",
    categoryId: "steam",
    kind: "Электрический проточный парогенератор",
    image: "/catalog/steam.jpg",
    summary: "20–250 кг/ч (16–180 кВт).",
    powerMinKw: 16,
    powerMaxKw: 180,
    steamMinKgH: 20,
    steamMaxKgH: 250,
    tempMaxC: null,
    pressureNote: null,
    fuels: [] as FuelId[],
    feature: "Электрический, топливо не используется",
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: ["el7"],
  },
  powerGen("schuster-wwg", "Schuster WWG", "hw170", "Перегретая вода, реверсивная топка, трубы высокого КПД", 140, 2900, "5 / 10 бар", "Среднее и высокое давление", ""),
  powerGen("schuster-wwg3", "Schuster WWG3", "hw170", "Перегретая вода, 3 эффективных хода", 1200, 18000, "6 / 10 бар", "Настоящие три хода", ""),
  powerGen("schuster-schd", "Schuster SCHD", "oil", "Термомасляный, 3 хода", 116, 5815, null, "Три хода дымовых газов", ""),
  powerGen("schuster-toxd2p", "Schuster TOX D 2P", "water", "Водогрейный моноблок, 3 эффективных хода", 2000, 22000, null, "Индустриальная горячая вода", ""),
  powerGen("schuster-dds", "Schuster DDS", "water", "Водогрейный под давлением, реверсивная топка", 80, 6100, null, "Коммерческая стальная серия", ""),
  powerGen("schuster-tox", "Schuster TOX 65-1900", "water", "Водогрейный под давлением, 3 хода", 55, 1900, null, "Коммерческая стальная серия", ""),
  powerGen("schuster-dst", "Schuster DST", "water", "Водогрейный под давлением, 3 хода", 65, 3000, null, "Коммерческая стальная серия", ""),
  powerGen("schuster-kde", "Schuster KDE", "water", "Конденсационный стальной", 124, 2160, null, "Конденсационный (116 кВт — версия с камерой)", ""),
  powerGen("schuster-kde3", "Schuster KDE 3", "water", "Конденсационный стальной, 3 хода, Low NOx", 116, 3000, null, "Конденсационный, низкие NOx", ""),
  powerGen("schuster-kdeoil", "Schuster KDE oil (oil/gas)", "water", "Конденсационный с очень низкой температурой, жидкое/газовое топливо", 69, 1550, null, "Конденсационный, очень низкая температура уходящих газов", ""),
];

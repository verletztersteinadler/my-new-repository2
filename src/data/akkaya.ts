import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Английская главная Akkaya. Типоразмеры внутри диапазона на ней не расписаны.";

function steamSeries(id: string, name: string, kind: string, min: number, max: number, fuels: FuelId[], feature: string, image: string): Series {
  return {
    id,
    name,
    categoryId: "steam",
    kind,
    image,
    summary: `${min.toLocaleString("ru-RU")}–${max.toLocaleString("ru-RU")} кг/ч.`,
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: min,
    steamMaxKgH: max,
    tempMaxC: null,
    pressureNote: null,
    fuels,
    feature,
    extra: checked,
    sizes: [],
    sizesNote: "На карточке главной указан диапазон, не список моделей.",
    aliases: [],
  };
}

function heatSeries(id: string, name: string, categoryId: Series["categoryId"], kind: string, min: number, max: number, fuels: FuelId[], feature: string, image: string): Series {
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
    pressureNote: null,
    fuels,
    feature,
    extra: checked,
    sizes: [],
    sizesNote: "На карточке главной указан диапазон, не список моделей.",
    aliases: [],
  };
}

const gas: FuelId[] = ["gas", "diesel", "heavy"];
const solid: FuelId[] = ["solid"];

export const akkayaCategories: Category[] = [
  { id: "steam", title: "Паровые", param: "steam" },
  { id: "water", title: "Водогрейные", param: "power" },
  { id: "oil", title: "Термомасляные", param: "power" },
];

export const akkayaDocuments = [{ title: "Главная Akkaya, перечень серий" }];

export const akkayaSeries: Series[] = [
  steamSeries("akkaya-kbb", "Akkaya KBB", "Паровой, два хода, обратное пламя", 300, 4000, gas, "Жидкое топливо или газ", "/catalog/reverse.jpg"),
  steamSeries("akkaya-yhyb", "Akkaya YHYB", "Паровой, гибрид: экранная топка и дымогарные трубы", 500, 20000, solid, "Биомасса или уголь", "/catalog/solid.jpg"),
  steamSeries("akkaya-ysb", "Akkaya YSB", "Паровой, три хода, полуцилиндр", 150, 3750, solid, "Биомасса или уголь", "/catalog/firetube.jpg"),
  steamSeries("akkaya-sbk", "Akkaya SBK", "Паровой, три хода, шотландский", 320, 18000, gas, "Жидкое топливо или газ", "/catalog/firetube.jpg"),
  steamSeries("akkaya-ebs", "Akkaya EBS", "Паровой, блочный, биомасса", 250, 2000, solid, "Пакет для перевозки", "/catalog/skid.jpg"),
  steamSeries("akkaya-ees", "Akkaya EES", "Электрический парогенератор, блочный", 6, 2000, [], "Электрический", "/catalog/cabinet.jpg"),
  steamSeries("akkaya-psb", "Akkaya PSB", "Паровой, пакетный", 300, 4000, gas, "Рама или контейнер", "/catalog/skid.jpg"),
  steamSeries("akkaya-wtb", "Akkaya WTB", "Паровой, водотрубный, D-тип", 15000, 120000, gas, "Жидкое топливо или газ", "/catalog/waterpipe.jpg"),
  steamSeries("akkaya-tfb", "Akkaya TFB", "Паровой, три хода, две жаровые трубы", 20000, 30000, gas, "Жидкое топливо или газ", "/catalog/twin.jpg"),
  heatSeries("akkaya-ys", "Akkaya YS", "water", "Водогрейный, три хода, полуцилиндр", 70, 1744, solid, "Биомасса или уголь", "/catalog/firetube.jpg"),
  heatSeries("akkaya-skk", "Akkaya SKK", "water", "Водогрейный", 232, 14535, gas, "Жидкое топливо или газ", "/catalog/firetube.jpg"),
  heatSeries("akkaya-hwb", "Akkaya HWB", "water", "Водогрейный, гибрид", 737, 11671, solid, "Биомасса или уголь", "/catalog/solid.jpg"),
  heatSeries("akkaya-ehwb", "Akkaya EHWB", "water", "Водогрейный электрический", 25, 5000, [], "Электрический", "/catalog/cabinet.jpg"),
  heatSeries("akkaya-etoh", "Akkaya ETOH", "oil", "Термомасляный электрический", 25, 5000, [], "Электрический", "/catalog/cabinet.jpg"),
  heatSeries("akkaya-kykhlz", "Akkaya KYKHLZ", "oil", "Термомасляный, винтовой змеевик", 116, 4530, solid, "Биомасса или уголь", "/catalog/reverse.jpg"),
  heatSeries("akkaya-kykh", "Akkaya KYKH", "oil", "Термомасляный, три хода", 232, 8700, gas, "Жидкое топливо или газ", "/catalog/reverse.jpg"),
];

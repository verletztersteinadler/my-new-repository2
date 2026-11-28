import type { Category, FuelId, Series } from "@/data/catalog";

const checked =
  "Сверка 28.11.2026. Danstoker (Дания, с 1935; заводы в Хернинге и Островце, Польша), danstoker.com. Ряды — по таблицам сайта: Oil & Gas fired boilers (масло/газ), Thermal Oil Boilers, Biomass, Electrical. Точки в числах — разделители тысяч.";

const fuels: FuelId[] = ["gas", "diesel", "heavy"];

function row(id: string, name: string, cat: "steam" | "water", steamMin: number | null, steamMax: number | null, powerMin: number | null, powerMax: number | null, pressure: string, temp: number | null, kindExtra?: string): Series {
  return {
    id,
    name,
    categoryId: cat,
    kind: (kindExtra ? kindExtra : cat === "steam" ? "Жаротрубный, масло или газ" : "Водогрейный, масло или газ"),
    image: cat === "steam" ? "/catalog/steam.jpg" : "/catalog/firetube.jpg",
    summary: steamMax ? `${steamMin?.toLocaleString("ru-RU")}–${steamMax.toLocaleString("ru-RU")} кг/ч` : `${powerMin?.toLocaleString("ru-RU")}–${powerMax?.toLocaleString("ru-RU")} кВт`,
    powerMinKw: powerMin,
    powerMaxKw: powerMax,
    steamMinKgH: steamMin,
    steamMaxKgH: steamMax,
    tempMaxC: temp,
    pressureNote: pressure,
    fuels,
    feature: pressure,
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: [],
  };
}

export const danstokerCategories: Category[] = [
  { id: "steam", title: "Паровые", param: "steam" },
  { id: "water", title: "Водогрейные", param: "power" },
  { id: "oil", title: "Термомасляные", param: "power" },
];

export const danstokerDocuments = [
  { title: "Масло и газ Danstoker" },
  { title: "Термомасляные котлы Danstoker" },
  { title: "Биомасса Danstoker" },
  { title: "Электрические котлы Danstoker" },
];

export const danstokerSeries: Series[] = [
  row("dan-tdl", "Danstoker TDL", "steam", 630, 4000, 420, 2600, "0,7–1 бар", null),
  row("dan-opti", "Danstoker OPTI", "steam", 1000, 34000, 650, 22000, "8–20 бар, до 36", null),
  row("dan-twin", "Danstoker OPTI-TWIN", "steam", 20000, 68000, 13000, 44000, "8–20 бар, до 36", null),
  row("dan-global", "Danstoker GLOBAL", "water", null, null, 1000, 10000, "4–10 бар", 110),
  row("dan-globalh", "Danstoker GLOBAL-H", "water", null, null, 1000, 10000, "4–16 бар, до 32", 240),
  row("dan-tvb", "Danstoker TVB", "water", null, null, 12000, 25000, "4–10 бар", 110),
  row("dan-tvbh", "Danstoker TVB-H", "water", null, null, 12000, 22000, "4–32 бар", 240),
  row("dan-tvbt", "Danstoker TVB-TWIN", "water", null, null, 22000, 44000, "4–32 бар", 240),
  row("dan-combo", "Danstoker COMBO", "steam", 5000, 55000, 3000, 50000, "до 40 бар", 400, "Комбинированный котёл с секциями водотрубного котла, пар до 400 °C, масло или газ"),
  row(
    "dan-tob",
    "Danstoker TOB-H / TOB-V",
    "oil",
    null,
    null,
    100,
    5000,
    "до 10 бар",
    350,
    "Термомасляный котёл горизонтальный (TOB-H) или вертикальный (TOB-V), CE",
  ),
  {
    id: "dan-biomass",
    name: "Danstoker Biomass",
    categoryId: "steam",
    kind: "Котлы на биомассе: жаротрубные, со стяжками (stay bar), водотрубные; пар, высокотемпературная и обычная горячая вода",
    image: "/catalog/solid.jpg",
    summary: "Сегмент 2–50 МВт; пар до 68 000 кг/ч, теплота до 50 000 кВт.",
    powerMinKw: 2000,
    powerMaxKw: 50000,
    steamMinKgH: null,
    steamMaxKgH: 68000,
    tempMaxC: null,
    pressureNote: "индивидуальный расчёт",
    fuels: ["solid"] as FuelId[],
    feature: "Топливо: щепа, пеллеты, древесные отходы, лузга подсолнечника, багасса, солома, рисовая лузга, барда, зерно, миндальная лузга, кора; система автоматической пневмоочистки Danblast",
    extra: `${checked} Части под давлением проектируются совместно с поставщиком системы сжигания, котёл под конкретное топливо; типоразмерный ряд не публикуется.`,
    sizes: [],
    sizesNote: null,
    aliases: ["biomass"],
  },
  {
    id: "dan-electric",
    name: "Danstoker Electrical (элементный электрокотёл)",
    categoryId: "water",
    kind: "Электрический котёл (ТЭН), низковольтный: горячая вода, высокотемпературная горячая вода или пар",
    image: "/catalog/firetube.jpg",
    summary: "400–6 000 кВт; пар 600–9 000 кг/ч.",
    powerMinKw: 400,
    powerMaxKw: 6000,
    steamMinKgH: 600,
    steamMaxKgH: 9000,
    tempMaxC: null,
    pressureNote: "стандарт: 6 бар (LTHW), 10 бар (HTHW), 13 бар (пар); максимум до 28 бар",
    fuels: [] as FuelId[],
    feature: "Питание 3 x 400 В (400–4 000 кВт, пар до 6 000 кг/ч) или 3 x 690 В (400–6 000 кВт, пар до 9 000 кг/ч)",
    extra: `${checked} Различаются низковольтные (элементные) и высоковольтные котлы; на странице детальные данные опубликованы для низковольтного. Для котлов на избытке электроэнергии от солнца и ветра.`,
    sizes: [],
    sizesNote: null,
    aliases: ["electrical", "el-kedel"],
  },
];

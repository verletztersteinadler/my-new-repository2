import type { Category, FuelId, Series } from "@/data/catalog";

const checked =
  "Сверка 28.11.2026. Сайт mimsanenergy.com открыт (SSL-сертификат истёк, страница доступна). Производитель публикует только технологические диапазоны, таблиц типоразмеров нет — котлы и станции «под ключ» по проекту (см. отчёт MIMSAN-P1-OTCHET.md).";

const solid: FuelId[] = ["solid"];
const gasLiquid: FuelId[] = ["gas", "diesel"];
const none: FuelId[] = [];

export const mimsanCategories: Category[] = [
  { id: "steam", title: "Паровые", param: "steam" },
  { id: "oil", title: "Термомасляные", param: "power" },
];

export const mimsanDocuments = [
  { title: "CFB паровой (уголь)" },
  { title: "Водотрубный жидкое/газ" },
  { title: "Биомасса" },
  { title: "RDF/ТБО" },
  { title: "CFB термомасляный" },
  { title: "Утилизационные" },
];

function steamRange(
  id: string,
  name: string,
  kind: string,
  minKg: number | null,
  maxKg: number | null,
  pressureNote: string | null,
  feature: string,
  extra: string,
  fuels: FuelId[],
  image: string,
): Series {
  return {
    id,
    name,
    categoryId: "steam",
    kind,
    image,
    summary: minKg !== null && maxKg !== null ? `${minKg.toLocaleString("ru-RU")}–${maxKg.toLocaleString("ru-RU")} кг/ч.` : "Диапазон по проекту.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: minKg,
    steamMaxKgH: maxKg,
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

export const mimsanSeries: Series[] = [
  steamRange(
    "mimsan-cfb-steam",
    "Mimsan CFB паровой",
    "Паровой с циркулирующим кипящим слоем (CFB), водотрубный",
    10000,
    100000,
    null,
    "До 60 МВт тепловой мощности на единицу; КПД котла до 90 %; модуляция 20–100 %",
    "Топливо: любой лигнит 2 500–6 500 ккал/кг (в т.ч. рядовой отсев); референс — 2×35 т/ч, 10 бар (г).",
    solid,
    "/catalog/solid.jpg",
  ),
  steamRange(
    "mimsan-watertube",
    "Mimsan водотрубный (жидкое/газ)",
    "Паровой водотрубный D-типа (EN 12952), барабаны сверху/снизу, мембранные стены",
    null,
    null,
    null,
    "Высокая мощность и высокое давление, жидкое и газовое топливо",
    "Топливо: природный газ, биогаз, СПГ, жидкое топливо. Диапазон мощностей сайтом не публикуется (референс D-типа — 3×25 МВт тепл., Узбекистан).",
    gasLiquid,
    "/catalog/steam.jpg",
  ),
  steamRange(
    "mimsan-biomass",
    "Mimsan Biomass",
    "Энергоблок на биомассе: CFB или подвижная колосниковая решётка, «под ключ»",
    10000,
    100000,
    null,
    "Пар 10–100 т/ч; 12 построенных станций, суммарно 200 МВтэ (крупнейшая — 40 МВтэ)",
    "Топливо: сельскохозяйственные, лесные отходы, высушенный птичий помёт; станции производят перегретый пар высокого давления для выработки электроэнергии.",
    solid,
    "/catalog/solid.jpg",
  ),
  steamRange(
    "mimsan-wte",
    "Mimsan Waste-to-Energy",
    "Энергоблок на RDF/ТБО: высоконапорный CFB-котёл + турбина, «под ключ»",
    10000,
    100000,
    null,
    "Пар 10–100 т/ч",
    "Топливо: RDF (топливо из отходов), городские/муниципальные ТБО, осадки сточных вод.",
    solid,
    "/catalog/solid.jpg",
  ),
  {
    id: "mimsan-cfb-oil",
    name: "Mimsan CFB термомасляный",
    categoryId: "oil",
    kind: "Термомасляный с циркулирующим кипящим слоем (CFB)",
    image: "/catalog/firetube.jpg",
    summary: "До 60 000 кВт на единицу.",
    powerMinKw: null,
    powerMaxKw: 60000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: solid,
    feature: "До 60 МВт тепловой мощности на единицу; модуляция 20–100 %, система 88 %, горение 99 %",
    extra: `${checked} Топливо: пылеугольный лигнит (2 500–6 500 ккал/кг); референсы до 2×35 т/ч пара на CFB-платформе.`,
    sizes: [],
    sizesNote: null,
    aliases: [],
  },
  {
    id: "mimsan-whr",
    name: "Mimsan Atık Isı (утилизационные)",
    categoryId: "steam",
    kind: "Утилизационные котлы (водотрубные или жаротрубные) за турбинами, печами и промышленными процессами",
    image: "/catalog/steam.jpg",
    summary: "Пар, горячая вода или термомасло из тепла отходящих газов.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: none,
    feature: "Работает на тепле отходящих газов (энергоблоки, цементные и известковые заводы, электродуговые печи), топливо не используется",
    extra: `${checked} Типоразмеры не публикуются (проектное изготовление); возможно производство электроэнергии через паровые и ORC-турбины.`,
    sizes: [],
    sizesNote: null,
    aliases: ["atik isi"],
  },
];

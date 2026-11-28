import type { Category, FuelId, Series } from "@/data/catalog";

const checked =
  "Источник: карточки продукции bosch-industrial.com (Bosch Industriekessel GmbH, наследник LOOS; сверка 28.11.2026): UL-S/UL-SX, ZFR/ZFR-X, U-MB, CSB, HRSB, ELSB, ELHB, UT-L, UT-M, UT-H, UT-HZ. Значения UL-SX/ZFR-X по перегретому пару — по брошюре паровых котлов (сверка 16.11.2026).";

const fuels: FuelId[] = ["gas", "diesel"];
const noFuel: FuelId[] = [];

export const boschindCategories: Category[] = [
  { id: "steam", title: "Паровые", param: "steam" },
  { id: "water", title: "Водогрейные", param: "power" },
  { id: "hw170", title: "Перегретая вода", param: "power" },
];

export const boschindDocuments = [
  { title: "Брошюра: паровые котлы Bosch (UL-S, UL-SX, ZFR, ZFR-X)" },
  { title: "Брошюра: водогрейные котлы Bosch (UNIMAT UT-L/UT-M/UT-H/UT-HZ)" },
  { title: "Паспорта и руководства по эксплуатации на карточках продукции" },
];

function steam(id: string, name: string, min: number, max: number, temp: number, pressure: string, feature: string, fuel: FuelId[] = fuels, extraNote?: string): Series {
  return {
    id,
    name,
    categoryId: "steam",
    kind: "Жаротрубный",
    image: "/catalog/steam.jpg",
    summary: `${min.toLocaleString("ru-RU")}–${max.toLocaleString("ru-RU")} кг/ч, ${pressure}, до ${temp} °C.`,
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: min,
    steamMaxKgH: max,
    tempMaxC: temp,
    pressureNote: pressure,
    fuels: fuel,
    feature,
    extra: extraNote ? `${checked} ${extraNote}` : checked,
    sizes: [],
    sizesNote: "Полный типоразмерный ряд на карточках сайта не публикуется (только границы диапазона).",
    aliases: [],
  };
}

function water(id: string, name: string, minKw: number, maxKw: number, temp: number, pressure: string, category: "water" | "hw170", feature: string, fuel: FuelId[] = fuels, extraNote?: string): Series {
  return {
    id,
    name,
    categoryId: category,
    kind: "Водогрейный жаротрубный",
    image: "/catalog/firetube.jpg",
    summary: `${(minKw / 1000).toLocaleString("ru-RU")}–${(maxKw / 1000).toLocaleString("ru-RU")} МВт, ${pressure}, до ${temp} °C.`,
    powerMinKw: minKw,
    powerMaxKw: maxKw,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: temp,
    pressureNote: pressure,
    fuels: fuel,
    feature,
    extra: extraNote ? `${checked} ${extraNote}` : checked,
    sizes: [],
    sizesNote: "Полный типоразмерный ряд на карточках сайта не публикуется (только границы диапазона).",
    aliases: [],
  };
}

export const boschindSeries: Series[] = [
  steam("bosch-uls", "Bosch UL-S", 1250, 28000, 235, "до 30 бар", "Насыщенный пар, трёхходовой, одна жаровая труба"),
  steam(
    "bosch-ulsx",
    "Bosch UL-SX",
    2600,
    28000,
    300,
    "до 30 бар",
    "Перегретый пар, трёхходовой",
    fuels,
    "Карточка UL-S/UL-SX приводит данные насыщенного пара (до 235 °C); параметры перегретого пара (до 300 °C) — по брошюре.",
  ),
  steam("bosch-zfr", "Bosch ZFR", 18000, 55000, 235, "до 30 бар", "Две жаровые трубы, насыщенный пар, трёхходовой"),
  steam(
    "bosch-zfrx",
    "Bosch ZFR-X",
    18000,
    55000,
    300,
    "до 30 бар",
    "Две жаровые трубы, перегретый пар",
    fuels,
    "Карточка ZFR/ZFR-X приводит данные насыщенного пара (до 235 °C); параметры перегретого пара (до 300 °C) — по брошюре.",
  ),
  steam("bosch-umb", "Bosch U-MB", 200, 2000, 204, "до 16 бар", "Компактный трёхходовой паровой котёл; серия добавлена при сверке 28.11.2026"),
  steam("bosch-csb", "Bosch CSB", 300, 4800, 110, "до 0,5 бар (низкое давление)", "Пар низкого давления; топливо вплоть до 20 % водорода в смеси"),
  steam(
    "bosch-hrsb",
    "Bosch HRSB",
    400,
    4100,
    235,
    "10 и 16 бар",
    "Утилизационный паровой котёл (отходящее тепло газов ГПУ/когенерации 0,5–4 МВтэл)",
    noFuel,
    "Собственного горения нет: использует тепло отходящих газов (объём 500–23 500 кг/ч при 550 °C; источник — природный газ, другие типы по запросу).",
  ),
  steam(
    "bosch-elsb",
    "Bosch ELSB",
    350,
    8300,
    224,
    "до 24 бар",
    "Электрический паровой котёл (380/400/690 В)",
    noFuel,
    "Нагрев электроэнергией; отдельного топлива не требует.",
  ),
  water(
    "bosch-elhb",
    "Bosch ELHB",
    250,
    5500,
    190,
    "до 16 бар",
    "hw170",
    "Электрический водогрейный котёл (380/400/690 В)",
    noFuel,
    "Нагрев электроэнергией; отдельного топлива не требует.",
  ),
  water("bosch-uni", "Bosch Uni Condens", 800, 1200, 110, "до 6 бар", "water", "Конденсационный отопительный котёл (по данным сверки 16.11.2026, карточка не переоткрывалась)"),
  water("bosch-utl", "Bosch UT-L (UNIMAT)", 650, 25000, 110, "до 16 бар", "water", "Трёхходовой жаротрубный котёл низкого давления; горячая вода до 110 °C"),
  water("bosch-utm", "Bosch UT-M (UNIMAT)", 750, 19200, 190, "до 16 бар", "hw170", "Трёхходовой одножаровый котёл высокого давления; горячая вода до 190 °C"),
  water("bosch-uth", "Bosch UT-H (UNIMAT)", 820, 18300, 225, "до 30 бар", "hw170", "Трёхходовой жаротрубный котёл высокого давления; горячая вода до 225 °C"),
  water("bosch-uthz", "Bosch UT-HZ (UNIMAT)", 13000, 38000, 225, "до 30 бар", "hw170", "Трёхходовой двухжаровый котёл большого мощности; горячая вода до 225 °C"),
];

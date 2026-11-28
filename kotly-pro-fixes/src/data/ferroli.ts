import type { Category, FuelId, Series, Size } from "@/data/catalog";

const checked = "Сверка 28.11.2026. Промышленный раздел ferroli.com (Industrial solutions, int-en/uk): карточки моделей с таблицами типоразмеров.";

const fuels: FuelId[] = ["gas", "diesel"];

function sz(seriesId: string, values: number[]): Size[] {
  return values.map((v) => ({ id: `${seriesId}-${v}`, name: `mod.${v}`, powerKw: v, steamKgH: null }));
}
function szSteam(seriesId: string, values: number[]): Size[] {
  return values.map((v) => ({ id: `${seriesId}-${v}`, name: `mod.${v}`, powerKw: null, steamKgH: v }));
}

function water(
  id: string,
  name: string,
  kind: string,
  min: number,
  max: number,
  pressureNote: string,
  feature: string,
  extra: string,
  sizes: Size[],
): Series {
  return {
    id,
    name,
    categoryId: "water",
    kind,
    image: "/catalog/firetube.jpg",
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
    sizes,
    sizesNote: null,
    aliases: [],
  };
}

function steam(
  id: string,
  name: string,
  kind: string,
  minKg: number,
  maxKg: number,
  tempMaxC: number | null,
  pressureNote: string,
  feature: string,
  extra: string,
  sizes: Size[],
  fuelsArg: FuelId[] = fuels,
): Series {
  return {
    id,
    name,
    categoryId: "steam",
    kind,
    image: "/catalog/steam.jpg",
    summary: `${minKg.toLocaleString("ru-RU")}–${maxKg.toLocaleString("ru-RU")} кг/ч${tempMaxC ? `, до ${tempMaxC.toLocaleString("ru-RU")} °C` : ""}.`,
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: minKg,
    steamMaxKgH: maxKg,
    tempMaxC,
    pressureNote,
    fuels: fuelsArg,
    feature,
    extra: `${checked} ${extra}`,
    sizes,
    sizesNote: null,
    aliases: [],
  };
}

function superheated(
  id: string,
  name: string,
  kind: string,
  min: number,
  max: number,
  tempMaxC: number | null,
  pressureNote: string,
  feature: string,
  sizes: Size[],
): Series {
  return {
    id,
    name,
    categoryId: "hw170",
    kind,
    image: "/catalog/firetube.jpg",
    summary: `${min.toLocaleString("ru-RU")}–${max.toLocaleString("ru-RU")} кВт${tempMaxC ? `, до ${tempMaxC} °C` : ""}.`,
    powerMinKw: min,
    powerMaxKw: max,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC,
    pressureNote,
    fuels,
    feature,
    extra: checked,
    sizes,
    sizesNote: null,
    aliases: [],
  };
}

const tp3Sizes = [70, 92, 107, 152, 190, 240, 320, 401, 500, 600, 720, 820, 940, 1060, 1250, 1480, 1890, 2360, 2800, 3200];
const rswSizes = [92, 107, 152, 190, 240, 300, 350, 401, 525, 600, 720, 820, 940, 1060, 1250, 1480, 1600, 1890, 2360, 3000, 3600, 4000, 4500, 5000, 6000];
const rshSizes = [100, 150, 200, 250, 300, 360, 420, 500, 650, 800, 940, 1060, 1250, 1480, 1850, 2360, 3000];
const condSizes = [65, 100, 150, 230, 370, 500, 650, 820, 1000, 1250, 1450, 1700, 2200, 2600, 3200];
const t3gfSizes = [1200, 1400, 1750, 2000, 2300, 2800, 3400, 4000, 4600, 5200, 6000, 7000, 8000, 9000];
const t3gnSizes = [6000, 7000, 8000, 9000, 10000, 12000, 15000];
const prexNashSizes = [160, 280, 410, 560, 700, 1000, 1210, 1395, 1740, 2080, 2350, 2800, 3500];
const prexNaslSizes = [1210, 1395, 1740, 2080, 2350, 2800, 3500];
const prexQSizes = [160, 280, 410, 560, 700, 1000];
const lvpqSizes = [160, 250, 400, 600, 800, 1000, 1250];
const viSizes = [300, 400, 500, 600, 800, 1000, 1250, 1500, 2000, 2500, 3000, 4000];
const vp3gSizes = [1000, 1500, 2000, 2500, 3000, 4000];
const vp3gfSizes = [500, 800, 1000, 1250, 1600, 2000, 2500, 3000, 4000, 5000, 6000, 7000];
const vp3gflSizes = [500, 800, 1000, 1250, 1600, 2000, 2500, 3000, 4000, 5000];
const hvpSizes = [1500, 1750, 2000, 2500, 3000, 3500, 4000, 5000];
const hwpSizes = [700, 1400, 2100, 3200];

export const ferroliCategories: Category[] = [
  { id: "water", title: "Водогрейные", param: "power" },
  { id: "hw170", title: "Свыше 115 °C", param: "power" },
  { id: "steam", title: "Паровые", param: "steam" },
];
export const ferroliDocuments = [{ title: "TP3 LN" }, { title: "TP3 COND" }, { title: "PREXTHERM RSW N" }, { title: "PREXTHERM RSH N" }, { title: "PREXTHERM T3G" }, { title: "PREX N ASH" }, { title: "PREX N ASL" }, { title: "PREX Q ASL" }, { title: "VAPOPREX" }, { title: "VP 3G" }, { title: "VAPOR EVA" }, { title: "PREXREC" }];

export const ferroliSeries: Series[] = [
  water("ferroli-tp3", "Ferroli TP3 LN", "Водогрейный, 3 хода, низкие NOx", 70, 3200, "6 бар", "КПД до 95 %, газ или жидкое топливо", "Карточка TP3 LN подтверждает ряд 70–3 200 кВт (20 типоразмеров).", sz("ferroli-tp3", tp3Sizes)),
  water("ferroli-cond", "Ferroli TP3 COND", "Конденсационный, 3 хода", 65, 3200, "6 бар", "КПД до 106 %, 4 звезды EN 15502-1", "Ранее в карточке был взят текст 65–1 000 кВт; карточка сайта и таблица типоразмеров дают 65–3 200 кВт (15 моделей) — диапазон расширен.", sz("ferroli-cond", condSizes)),
  water("ferroli-rsw", "Ferroli PREXTHERM RSW N", "Водогрейный, 3 хода, квадратный корпус", 92, 6000, "6 бар (выше по запросу)", "КПД до 90 %, серия Square", "Объединяет карточки RSW N 92–1890 (18 моделей) и RSW N 2360–6000 (7 моделей); документация также упоминает версии RSW Quadra.", sz("ferroli-rsw", rswSizes)),
  water("ferroli-rsh", "Ferroli PREXTHERM RSH N", "Водогрейный, 3 хода, реверсивная топка", 100, 3000, "6 бар (выше по запросу)", "КПД до 90 %", "Объединяет карточки RSH N 100–1480 (14 моделей) и RSH N 1850–3000 (3 модели).", sz("ferroli-rsh", rshSizes)),
  water("ferroli-t3gf", "Ferroli PREXTHERM T3G F", "Водогрейный, 3 эффективных хода, большой дымогарный пучок", 1200, 9000, "6 бар", "КПД свыше 92 %", "Модовая линейка mod.1200–mod.9000.", sz("ferroli-t3gf", t3gfSizes)),
  water("ferroli-t3gn", "Ferroli PREXTHERM T3G N", "Водогрейный, 3 эффективных хода, большой дымогарный пучок", 6000, 15000, "6 бар", "КПД свыше 92 %", "Модовая линейка mod.6000–mod.15000.", sz("ferroli-t3gn", t3gnSizes)),
  superheated("ferroli-prexnash", "Ferroli PREX N ASH", "Перегретая вода, 3 хода, круглая камера", 160, 3500, 200, "12 бар (версия 15 бар)", "До 200 °C в версии 15 бар", sz("ferroli-prexnash", prexNashSizes)),
  superheated("ferroli-prexnasl", "Ferroli PREX N ASL", "Перегретая вода, 3 хода, круглая камера", 1210, 3500, 145, "5 бар", "7 моделей, до 145 °C", sz("ferroli-prexnasl", prexNaslSizes)),
  superheated("ferroli-prexqasl", "Ferroli PREX Q ASL", "Перегретая вода, 3 хода, квадратный корпус", 160, 1000, 145, "5 бар", "6 моделей, до 145 °C", sz("ferroli-prexqasl", prexQSizes)),
  superheated("ferroli-t3gfash", "Ferroli PREXTHERM T3G F ASH", "Перегретая вода, 3 эффективных хода", 1200, 9000, 200, "12 или 15 бар (выше по запросу)", "До 200 °C в версии 15 бар", sz("ferroli-t3gfash", t3gfSizes)),
  superheated("ferroli-t3gfasl", "Ferroli PREXTHERM T3G F ASL", "Перегретая вода, 3 эффективных хода", 1200, 9000, 175, "6 или 8 бар", "До 175 °C в версии 8 бар", sz("ferroli-t3gfasl", t3gfSizes)),
  superheated("ferroli-t3gnash", "Ferroli PREXTHERM T3G N ASH", "Перегретая вода, 3 эффективных хода", 6000, 15000, 200, "12 или 15 бар (выше по запросу)", "До 200 °C в версии 15 бар", sz("ferroli-t3gnash", t3gnSizes)),
  superheated("ferroli-t3gnasl", "Ferroli PREXTHERM T3G N ASL", "Перегретая вода, 3 эффективных хода", 6000, 15000, 175, "6 или 8 бар", "До 175 °C в версии 8 бар", sz("ferroli-t3gnasl", t3gnSizes)),
  steam("ferroli-vapoprex3gn", "Ferroli VAPOPREX 3GN", "Паровой среднего давления, 3 хода, круглая камера", 1600, 25000, 192, "12 бар (выше по запросу)", "Насыщенный пар, КПД высокого уровня", "Таблица модов на сайте приведена в тепловой мощности (мод.1000–мод.15000, тыс. ккал/ч), паропроизводительность 1 600–25 000 кг/ч.", []),
  steam("ferroli-vapoprexhvp", "Ferroli VAPOPREX HVP", "Паровой среднего давления, 3 хода, реверсивная топка", 1500, 5000, 192, "12 бар (выше по запросу)", "Насыщенный пар до 191,7 °C", "", szSteam("ferroli-vapoprexhvp", hvpSizes)),
  steam("ferroli-vapoprexhvpq", "Ferroli VAPOPREX HVPQ", "Паровой среднего давления, 3 хода, квадратный корпус", 150, 1250, 192, "12 бар (выше по запросу)", "Насыщенный пар до 191,7 °C", "", []),
  steam("ferroli-vapoprexhwp", "Ferroli VAPOPREX HWP", "Паровой среднего давления на твёрдом топливе, 3 хода", 700, 3200, 192, "12 бар (версия 14,8 бар)", "Единственная паровая модель Ferroli на твёрдом топливе", "Насыщенный пар до 191,7 °C; типоразмеры mod.700/1400/2100/3200.", szSteam("ferroli-vapoprexhwp", hwpSizes), ["solid"] as FuelId[]),
  steam("ferroli-vapoprexlvp", "Ferroli VAPOPREX LVP", "Паровой низкого давления, 3 хода, реверсивная топка", 1500, 4000, 120, "1 бар", "Низкое давление, до 120 °C", "", szSteam("ferroli-vapoprexlvp", [1500, 1750, 2000, 2500, 3000, 3500, 4000])),
  steam("ferroli-vapoprexlvpq", "Ferroli VAPOPREX LVPQ", "Паровой низкого давления, 3 хода, квадратный корпус", 150, 1250, 120, "1 бар", "Низкое давление, до 120 °C", "", szSteam("ferroli-vapoprexlvpq", lvpqSizes)),
  steam("ferroli-vapoprexvi", "Ferroli VAPOPREX VI", "Паровой с принудительной циркуляцией", 300, 4000, 192, "12 бар", "Принудительная циркуляция", "", szSteam("ferroli-vapoprexvi", viSizes)),
  steam("ferroli-vp3g", "Ferroli VP 3G", "Паровой среднего давления, 3 хода, круглая камера", 1000, 4000, 192, "12 бар (выше по запросу)", "Насыщенный пар до 191,7 °C", "", szSteam("ferroli-vp3g", vp3gSizes)),
  steam("ferroli-vp3gf", "Ferroli VP 3G F", "Паровой среднего давления, 3 хода", 500, 7000, 192, "12 бар (выше по запросу)", "Насыщенный пар до 191,7 °C", "Моды указаны в т/ч (mod.0.5–mod.7.0).", szSteam("ferroli-vp3gf", vp3gfSizes)),
  steam("ferroli-vp3gfl", "Ferroli VP 3G F L", "Паровой низкого давления, 3 хода", 500, 5000, 143, "3 бар", "Низкое давление, до 143 °C", "Моды указаны в т/ч (mod.0.5–mod.5.0).", szSteam("ferroli-vp3gfl", vp3gflSizes)),
  {
    id: "ferroli-vaporeva",
    name: "Ferroli VAPOR EVA",
    categoryId: "steam",
    kind: "Паровой непрямого нагрева, U-образный змеевик",
    image: "/catalog/steam.jpg",
    summary: "166–8 300 кг/ч, до 200 °C.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: 166,
    steamMaxKgH: 8300,
    tempMaxC: 200,
    pressureNote: "15 бар",
    fuels: [] as FuelId[],
    feature: "Непрямой парогенератор: нагрев от термомасла/перегретой воды",
    extra: checked + " Топливо не сжигается (топливо: нет), нагрев вторичным теплоносителем; типоразмеры mod.100–mod.5000.",
    sizes: [],
    sizesNote: "Типоразмеры: mod.100, 200, 320, 400, 500, 640, 800, 1000, 1300, 1600, 2000, 2500, 3000, 4000, 5000.",
    aliases: ["vapor eva"],
  },
  {
    id: "ferroli-prexrec",
    name: "Ferroli PREXREC / VAPOREC",
    categoryId: "steam",
    kind: "Утилизационные генераторы горячей воды и пара",
    image: "/catalog/steam.jpg",
    summary: "Утилизация тепла выхлопных газов двигателей.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: [] as FuelId[],
    feature: "Горячая вода или пар за счёт энергии газов",
    extra: checked + " Проектируются под конкретный источник тепла (категория Special applications); топливо не сжигается (топливо: нет).",
    sizes: [],
    sizesNote: null,
    aliases: ["prexrec", "vaporec"],
  },
  {
    id: "ferroli-force",
    name: "Ferroli Force W",
    categoryId: "water",
    kind: "Настенный конденсационный",
    image: "/catalog/firetube.jpg",
    summary: "60–600 кВт.",
    powerMinKw: 60,
    powerMaxKw: 600,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels,
    feature: "Настенный конденсационный",
    extra: checked + " 600 кВт — каскад, не один котёл. Коммерческий ряд.",
    sizes: [],
    sizesNote: null,
    aliases: [],
  },
  {
    id: "ferroli-atlas",
    name: "Ferroli Atlas / GN",
    categoryId: "water",
    kind: "Чугунный",
    image: "/catalog/firetube.jpg",
    summary: "32–650 кВт.",
    powerMinKw: 32,
    powerMaxKw: 650,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels,
    feature: "Чугунный корпус",
    extra: checked + " Atlas A отдельно 32–95 кВт. Коммерческий ряд.",
    sizes: [],
    sizesNote: null,
    aliases: [],
  },
];

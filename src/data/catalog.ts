export const MANUFACTURER_ID = "lavart";
export const BRAND = "LAVART";
export const CONSENT_VERSION = "kotly-consent-draft-2026-11-15";
export const SOURCE_CHECKED = "2026-11-15";

export type CategoryId = "hw115" | "hw170" | "water" | "steam" | "oil" | "block" | "auto" | "air";
export type FuelId = "gas" | "diesel" | "furnace" | "heavy" | "solid";
export type PowerBand = "u1" | "m1to5" | "m5to15" | "o15";
export type SteamBand = "u5" | "t5to15" | "o15";

export type Category = {
  id: CategoryId;
  title: string;
  param: "power" | "steam" | "none";
};

export type Size = {
  id: string;
  name: string;
  powerKw: number | null;
  steamKgH: number | null;
};

export type Series = {
  id: string;
  name: string;
  categoryId: CategoryId;
  kind: string;
  image: string;
  summary: string;
  powerMinKw: number | null;
  powerMaxKw: number | null;
  steamMinKgH: number | null;
  steamMaxKgH: number | null;
  tempMaxC: number | null;
  pressureNote: string | null;
  fuels: FuelId[];
  feature: string;
  extra: string | null;
  /** Shown instead of the kW range when the source uses another unit. */
  powerNote?: string | null;
  sizes: Size[];
  sizesNote: string | null;
  aliases: string[];
};

export const categories: Category[] = [
  { id: "hw115", title: "До 115 °C", param: "power" },
  { id: "hw170", title: "Свыше 115 °C", param: "power" },
  { id: "steam", title: "Паровые", param: "steam" },
  { id: "oil", title: "Термомасляные", param: "power" },
  { id: "block", title: "Котловые блоки", param: "power" },
  { id: "auto", title: "Автоматика", param: "none" },
];

export const fuels: { id: FuelId; title: string }[] = [
  { id: "gas", title: "Газ" },
  { id: "diesel", title: "Дизельное" },
  { id: "furnace", title: "Котельно-печное" },
  { id: "heavy", title: "Нефть, конденсат, мазут" },
  { id: "solid", title: "Твёрдое" },
];

export const powerBands: { id: PowerBand; title: string }[] = [
  { id: "u1", title: "до 1 МВт" },
  { id: "m1to5", title: "1–5 МВт" },
  { id: "m5to15", title: "5–15 МВт" },
  { id: "o15", title: "свыше 15 МВт" },
];

export const steamBands: { id: SteamBand; title: string }[] = [
  { id: "u5", title: "до 5 т/ч" },
  { id: "t5to15", title: "5–15 т/ч" },
  { id: "o15", title: "свыше 15 т/ч" },
];

const masterKw = [800, 1000, 1250, 1500, 1750, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000];

function powerSizes(prefix: string, label: string, values: number[]): Size[] {
  return values.map((powerKw) => ({
    id: `${prefix}-${powerKw}`,
    name: `LAVART ${powerKw} ${label}`,
    powerKw,
    steamKgH: null,
  }));
}

export const seriesList: Series[] = [
  {
    id: "reverse",
    name: "LAVART Reverse",
    categoryId: "hw115",
    kind: "Водогрейный",
    image: "/catalog/reverse.jpg",
    summary:
      "Жаротрубный котёл с реверсивной топкой для отопления и ГВС, в том числе для блочно-модульных котельных.",
    powerMinKw: 100,
    powerMaxKw: 3000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: 115,
    pressureNote: null,
    fuels: ["gas", "diesel", "furnace"],
    feature: "Двухходовой, реверсивная топка",
    extra: "В производственной программе встречается диапазон 0,1–5 МВт. Он не совпадает с карточкой 100–3000 кВт — расхождение не сведено.",
    sizes: [],
    sizesNote:
      "Полный ряд типоразмеров в открытой карточке не опубликован. Обозначения вроде 500, 600, 700 и 2500 Reverse встречаются в описаниях объектов и не составляют полный ряд, поэтому в выбор не подставлены.",
    aliases: ["реверс", "reverse", "абмк"],
  },
  {
    id: "master",
    name: "LAVART Master",
    categoryId: "hw115",
    kind: "Водогрейный",
    image: "/catalog/firetube.jpg",
    summary: "Трёхходовой жаротрубный котёл на лёгком топливе. На части типоразмеров в третьем ходе стоят турбулизаторы.",
    powerMinKw: 800,
    powerMaxKw: 15000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: 115,
    pressureNote: "До 6 бар указано в открытой карточке типоразмера 10000 Master, не как подтверждённый предел всей серии.",
    fuels: ["gas", "diesel", "furnace"],
    feature: "Лёгкое топливо, трёхходовой",
    extra: "КПД не менее 94 % на природном газе и не менее 91,5 % на жидком топливе — по открытой карточке серии, до сверки с паспортом.",
    sizes: powerSizes("master", "Master", masterKw),
    sizesNote: "Типоразмеры 6500–15000 кВт в открытой таблице указаны строкой «по запросу», без отдельных обозначений. В список они не добавлены.",
    aliases: ["мастер", "master"],
  },
  {
    id: "professional",
    name: "LAVART Professional",
    categoryId: "hw115",
    kind: "Водогрейный",
    image: "/catalog/firetube.jpg",
    summary: "Трёхходовой жаротрубный котёл с проходной топкой по центру корпуса. В каталоге заявлен диапазон 0,8–19 МВт.",
    powerMinKw: 800,
    powerMaxKw: 19000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: 115,
    pressureNote: null,
    fuels: ["gas", "diesel", "furnace"],
    feature: "Проходная топка по центру",
    extra: null,
    sizes: powerSizes("professional", "Professional", [800, 1000, 1250, 1500, 1750, 6000]),
    sizesNote:
      "В открытом каталоге подтверждены не все промежуточные обозначения между 1,75 и 6 МВт и группа 6,5–19 МВт. Неподтверждённые строки не добавлены.",
    aliases: ["professional", "профессионал"],
  },
  {
    id: "industrial",
    name: "LAVART Industrial",
    categoryId: "hw115",
    kind: "Водогрейный",
    image: "/catalog/firetube.jpg",
    summary: "Трёхходовая серия для тяжёлого топлива: сырая нефть, газовый конденсат и мазут, наряду с газом и лёгким жидким топливом.",
    powerMinKw: 1000,
    powerMaxKw: 15000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: 115,
    pressureNote: null,
    fuels: ["gas", "diesel", "furnace", "heavy"],
    feature: "Тяжёлое топливо",
    extra: null,
    sizes: [],
    sizesNote: "Отдельные типоразмеры в открытой таблице этой сборки не зафиксированы.",
    aliases: ["industrial", "индустриал"],
  },
  {
    id: "sw",
    name: "LAVART SW",
    categoryId: "hw170",
    kind: "Водогрейный, перегретая вода",
    image: "/catalog/firetube.jpg",
    summary: "Однотопочный котёл на перегретой воде. Сертификат ТР ТС 032 указан для серий SW и SWD.",
    powerMinKw: 1000,
    powerMaxKw: 20000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: 170,
    pressureNote: "В каталожной таблице масса приводится для исполнения 13 бар. Другие давления не сведены.",
    fuels: ["gas", "diesel", "furnace"],
    feature: "Однотопочный",
    extra: null,
    sizes: [],
    sizesNote: "Строки типоразмеров в открытом фрагменте каталога читаются неполно и в выбор не перенесены.",
    aliases: ["sw", "св"],
  },
  {
    id: "swd",
    name: "LAVART SWD",
    categoryId: "hw170",
    kind: "Водогрейный, перегретая вода",
    image: "/catalog/twin.jpg",
    summary: "Двухтопочный котёл на перегретую воду большей мощности, чем однотопочная серия SW.",
    powerMinKw: 20000,
    powerMaxKw: 36000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: 170,
    pressureNote: "В каталожной таблице масса приводится для исполнения 13 бар. Другие давления не сведены.",
    fuels: ["gas", "diesel", "furnace"],
    feature: "Двухтопочный",
    extra: null,
    sizes: [],
    sizesNote: "Отдельные типоразмеры внутри 20–36 МВт в эту сборку не перенесены: в открытом фрагменте нет однозначного списка обозначений.",
    aliases: ["swd", "свд"],
  },
  {
    id: "sv",
    name: "LAVART SV",
    categoryId: "steam",
    kind: "Паровой",
    image: "/catalog/steam.jpg",
    summary: "Трёхходовой жаротрубный паровой котёл. На сайте производителя серия указана как котёл с обвязкой. Есть сертификат ТР ТС 032.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: 500,
    steamMaxKgH: 30000,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["gas", "diesel", "furnace"],
    feature: "Трёхходовой, с обвязкой",
    extra: "Пример обозначения из каталога: LAVART 25 SV. Это не выбранный за посетителя типоразмер.",
    sizes: [],
    sizesNote: "Полный ряд паропроизводительности 0,5–30 т/ч в открытой карточке не разложен на типоразмеры.",
    aliases: ["sv", "пар", "св пар"],
  },
  {
    id: "ov",
    name: "LAVART OV",
    categoryId: "steam",
    kind: "Паровой с пароперегревателем",
    image: "/catalog/steam.jpg",
    summary: "Серия паровых котлов с пароперегревателем. Основание включения — сертификат в разделе лицензий производителя. Рабочие параметры в открытой карточке не приведены.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: [],
    feature: "Пароперегреватель",
    extra: "Карточка намеренно неполная: без подтверждённых параметров позиция не выдаётся за готовый опросный лист.",
    sizes: [],
    sizesNote: null,
    aliases: ["ov", "пароперегреватель"],
  },
  {
    id: "dmh",
    name: "LAVART DMH",
    categoryId: "oil",
    kind: "Термомасляный",
    image: "/catalog/firetube.jpg",
    summary: "Горизонтальный нагреватель диатермического масла. На витрине производителя серия отмечена как исполнение на лёгком топливе. Есть сертификат ТР ТС 032.",
    powerMinKw: 100,
    powerMaxKw: 10000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["gas", "diesel", "furnace"],
    feature: "Горизонтальный",
    extra: "Температура теплоносителя в открытом фрагменте не указана и не подставлена из прототипа.",
    sizes: [],
    sizesNote: "Типоразмеры внутри диапазона 0,1–10 МВт в открытой карточке не разложены.",
    aliases: ["dmh", "дмх", "термомасло"],
  },
  {
    id: "dmv",
    name: "LAVART DMV",
    categoryId: "oil",
    kind: "Термомасляный",
    image: "/catalog/vertical.jpg",
    summary: "Вертикальный нагреватель диатермического масла на лёгком топливе.",
    powerMinKw: 100,
    powerMaxKw: 10000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["gas", "diesel", "furnace"],
    feature: "Вертикальный",
    extra: "Температура теплоносителя в открытом фрагменте не указана.",
    sizes: [],
    sizesNote: "Типоразмеры внутри диапазона 0,1–10 МВт в открытой карточке не разложены.",
    aliases: ["dmv", "дмв"],
  },
  {
    id: "block",
    name: "LAVART — котловой блок",
    categoryId: "block",
    kind: "Котловой блок",
    image: "/catalog/skid.jpg",
    summary: "Модуль заводской готовности: котёл, горелка, насосы и автоматика на общей раме. Состав конкретной поставки задаётся опросом, а не этой карточкой.",
    powerMinKw: 100,
    powerMaxKw: 19000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: [],
    feature: "Комплект на раме",
    extra: "Совместимость узлов внутри блока не расшифрована по моделям.",
    sizes: [],
    sizesNote: null,
    aliases: ["блок", "котел блок"],
  },
  {
    id: "k",
    name: "LAVART K",
    categoryId: "auto",
    kind: "Шкаф управления",
    image: "/catalog/cabinet.jpg",
    summary: "Шкаф управления водогрейными котлами до 115 °C. Назначение подтверждено карточкой на витрине производителя.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: 115,
    pressureNote: null,
    fuels: [],
    feature: "Водогрейные до 115 °C",
    extra: null,
    sizes: [],
    sizesNote: null,
    aliases: ["шкаф k", "лакарт к"],
  },
  {
    id: "pult",
    name: "LAVART PULT",
    categoryId: "auto",
    kind: "Шкаф управления",
    image: "/catalog/cabinet.jpg",
    summary: "Экономичное исполнение шкафа для водогрейных котлов до 115 °C.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: 115,
    pressureNote: null,
    fuels: [],
    feature: "Экономичное решение",
    extra: null,
    sizes: [],
    sizesNote: null,
    aliases: ["пульт", "pult"],
  },
  {
    id: "kv",
    name: "LAVART KV",
    categoryId: "auto",
    kind: "Шкаф управления",
    image: "/catalog/cabinet.jpg",
    summary: "Шкаф управления паровыми котлами.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: [],
    feature: "Для паровых котлов",
    extra: null,
    sizes: [],
    sizesNote: null,
    aliases: ["kv", "кв"],
  },
];

export const documents = [
  { title: "ТР ТС 016 — водогрейные котлы до 115 °C" },
  { title: "ТР ТС 032 — серии SW и SWD" },
  { title: "ТР ТС 032 — паровые котлы SV" },
  { title: "Сертификат на серию OV с пароперегревателем" },
  { title: "ТР ТС 032 — термомасляная серия DMH" },
  { title: "Сертификат на шкафы управления и котловой блок" },
];

export function categoryById(id: string | undefined) {
  return categories.find((item) => item.id === id);
}

export function seriesById(id: string | undefined, list: Series[] = seriesList) {
  if (!id) return undefined;
  return list.find((item) => item.id === id);
}

export function sizeById(series: Series | undefined, sizeId: string | undefined) {
  if (!series || !sizeId) return undefined;
  return series.sizes.find((item) => item.id === sizeId);
}

export function fuelTitle(id: FuelId) {
  return fuels.find((item) => item.id === id)?.title ?? id;
}

function trimNum(value: number) {
  const rounded = Math.round(value * 10) / 10;
  return rounded.toLocaleString("ru-RU", { maximumFractionDigits: 1 });
}

export function formatKw(kw: number) {
  if (kw >= 1000) return `${trimNum(kw / 1000)} МВт`;
  return `${trimNum(kw)} кВт`;
}

export function formatPowerRange(min: number | null, max: number | null) {
  if (min == null && max == null) return "Уточняется";
  if (min == null && max != null) return `до ${formatKw(max)}`;
  if (min != null && max == null) return `от ${formatKw(min)}`;
  return `${formatKw(min!)} – ${formatKw(max!)}`;
}

export function formatSteam(kgH: number) {
  const tons = kgH / 1000;
  return `${trimNum(tons)} т/ч`;
}

export function formatSteamRange(min: number | null, max: number | null) {
  if (min == null || max == null) return "Уточняется";
  return `${formatSteam(min)} – ${formatSteam(max)}`;
}

export function formatTemp(value: number | null) {
  if (value == null) return "Уточняется";
  return `до ${value.toLocaleString("ru-RU")} °C`;
}

function inPowerBand(kw: number, band: PowerBand) {
  if (band === "u1") return kw <= 1000;
  if (band === "m1to5") return kw > 1000 && kw <= 5000;
  if (band === "m5to15") return kw > 5000 && kw <= 15000;
  return kw > 15000;
}

function rangeHitsPower(min: number, max: number, band: PowerBand) {
  const lo = band === "u1" ? 0 : band === "m1to5" ? 1000 : band === "m5to15" ? 5000 : 15000;
  const hi = band === "u1" ? 1000 : band === "m1to5" ? 5000 : band === "m5to15" ? 15000 : Number.POSITIVE_INFINITY;
  return max > lo && min <= hi;
}

function inSteamBand(kgH: number, band: SteamBand) {
  if (band === "u5") return kgH <= 5000;
  if (band === "t5to15") return kgH > 5000 && kgH <= 15000;
  return kgH > 15000;
}

function rangeHitsSteam(min: number, max: number, band: SteamBand) {
  const lo = band === "u5" ? 0 : band === "t5to15" ? 5000 : 15000;
  const hi = band === "u5" ? 5000 : band === "t5to15" ? 15000 : Number.POSITIVE_INFINITY;
  return max > lo && min <= hi;
}

export function norm(value: string) {
  return value.toLocaleLowerCase("ru-RU").replaceAll("ё", "е").trim();
}

export type CatalogQuery = {
  type?: CategoryId;
  q?: string;
  fuel?: FuelId;
  power?: PowerBand;
  steam?: SteamBand;
  sort?: "name" | "param";
};

export function filterSeries(query: CatalogQuery, list: Series[] = seriesList) {
  const needle = query.q ? norm(query.q) : "";
  const rows = list.filter((series) => {
    if (query.type && series.categoryId !== query.type) return false;
    if (query.fuel && !series.fuels.includes(query.fuel)) return false;
    if (needle) {
      const hay = norm(
        [series.name, series.kind, series.summary, series.feature, ...series.aliases, ...series.sizes.map((size) => size.name)].join(" "),
      );
      if (!hay.includes(needle)) return false;
    }
    if (query.power) {
      if (series.sizes.length > 0) {
        const hit = series.sizes.some((size) => size.powerKw != null && inPowerBand(size.powerKw, query.power!));
        if (!hit) return false;
      } else if (series.powerMinKw == null && series.powerMaxKw == null) {
        return false;
      } else if (series.powerMinKw == null && series.powerMaxKw != null) {
        if (!inPowerBand(series.powerMaxKw, query.power)) return false;
      } else if (series.powerMaxKw == null || series.powerMinKw == null) {
        return false;
      } else if (!rangeHitsPower(series.powerMinKw, series.powerMaxKw, query.power)) {
        return false;
      }
    }
    if (query.steam) {
      if (series.steamMinKgH == null || series.steamMaxKgH == null) return false;
      if (!rangeHitsSteam(series.steamMinKgH, series.steamMaxKgH, query.steam)) return false;
    }
    return true;
  });

  const sorted = [...rows];
  if (query.sort === "param") {
    sorted.sort((a, b) => {
      const av = a.powerMaxKw ?? a.steamMaxKgH;
      const bv = b.powerMaxKw ?? b.steamMaxKgH;
      if (av == null && bv == null) return a.name.localeCompare(b.name, "ru");
      if (av == null) return 1;
      if (bv == null) return -1;
      return av - bv || a.name.localeCompare(b.name, "ru");
    });
  } else if (query.sort === "name") {
    sorted.sort((a, b) => a.name.localeCompare(b.name, "ru"));
  }
  return sorted;
}

export function primarySpec(series: Series) {
  if (series.categoryId === "steam") {
    return { label: "Паропроизводительность", value: formatSteamRange(series.steamMinKgH, series.steamMaxKgH) };
  }
  if (series.categoryId === "auto") {
    return { label: "Назначение", value: series.feature };
  }
  return { label: "Мощность", value: series.powerNote || formatPowerRange(series.powerMinKw, series.powerMaxKw) };
}

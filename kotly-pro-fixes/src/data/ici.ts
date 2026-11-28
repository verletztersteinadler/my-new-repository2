import type { Category, FuelId, Series } from "@/data/catalog";

const checked =
  "Источник: icicaldaie.com, раздел Products → Industrial Boilers (страницы категорий с паспортными данными каждой серии; сверка 28.11.2026). Сайт открыт напрямую; версии GX S/GX C — по карточке GX (сверка 16.11.2026).";

const fuels: FuelId[] = ["gas", "diesel"];
const noFuel: FuelId[] = [];

export const iciCategories: Category[] = [
  { id: "steam", title: "Паровые", param: "steam" },
  { id: "water", title: "Водогрейные", param: "power" },
  { id: "hw170", title: "Перегретая вода", param: "power" },
  { id: "oil", title: "Термомасляные", param: "power" },
];

export const iciDocuments = [
  { title: "Каталоги и техпаспорта серий ICI Caldaie (GX, EVOSTEAM, ECOVAPOR, TReVAPOR, SIXEN N, BNX, FX N, FLASH, ISG, TNX, TNOX, ASX EN, ASGX EN, OPX, WH)" },
  { title: "Карточка GX: исполнения GX, GX S (перегретый пар), GX C (комбинированный с утилизацией)" },
];

function steam(id: string, name: string, kgMin: number, kgMax: number, powerMin: number | null, powerMax: number | null, pressure: string, efficiency: string, feature: string, note?: string): Series {
  return {
    id,
    name,
    categoryId: "steam",
    kind: "Паровой жаротрубный",
    image: "/catalog/steam.jpg",
    summary: `${kgMin.toLocaleString("ru-RU")}–${kgMax.toLocaleString("ru-RU")} кг/ч${powerMin ? ` (${powerMin.toLocaleString("ru-RU")}–${powerMax?.toLocaleString("ru-RU")} кВт)` : ""}, ${pressure}.`,
    powerMinKw: powerMin,
    powerMaxKw: powerMax,
    steamMinKgH: kgMin,
    steamMaxKgH: kgMax,
    tempMaxC: null,
    pressureNote: pressure,
    fuels,
    feature: `${feature} КПД ${efficiency}.`,
    extra: note ? `${checked} ${note}` : checked,
    sizes: [],
    sizesNote: "Типоразмерный ряд внутри диапазона на страницах категории не публикуется.",
    aliases: [],
  };
}

function gen(id: string, name: string, category: "water" | "hw170" | "oil", min: number, max: number, pressure: string, efficiency: string, feature: string, note?: string, fuel: FuelId[] = fuels): Series {
  return {
    id,
    name,
    categoryId: category,
    kind: category === "oil" ? "Термомасляный жаротрубный" : "Водогрейный жаротрубный",
    image: category === "oil" ? "/catalog/firetube.jpg" : "/catalog/firetube.jpg",
    summary: `${min.toLocaleString("ru-RU")}–${max.toLocaleString("ru-RU")} кВт, ${pressure}.`,
    powerMinKw: min,
    powerMaxKw: max,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: pressure,
    fuels: fuel,
    feature: `${feature} КПД ${efficiency}.`,
    extra: note ? `${checked} ${note}` : checked,
    sizes: [],
    sizesNote: "Типоразмерный ряд внутри диапазона на страницах категории не публикуется.",
    aliases: [],
  };
}

export const iciSeries: Series[] = [
  // ==== Паровые ====
  steam("ici-gx", "ICI GX", 1700, 32000, 1163, 17442, "12 или 15 бар", "90,0 %", "Моноблочные парогенераторы, максимальная надёжность и ресурс"),
  steam("ici-gxs", "ICI GX S", 1700, 25000, null, null, "12 или 15 бар", "90,0 %", "Исполнение GX с перегревом пара (по карточке GX)", "Диапазон GX S — по карточке GX прошлой сверки; на страницах категорий диапазоны GX S не публикуются."),
  steam("ici-gxc", "ICI GX C", 1700, 25000, null, null, "12 или 15 бар", "90,0 %", "Комбинированное исполнение GX; утилизация тепла дымовых газов отдельным модулем 100–5 000 кг/ч", "Диапазон GX C — по карточке GX прошлой сверки."),
  steam("ici-evosteam", "ICI EVOSTEAM", 1500, 10000, 1020, 6826, "12 или 15 бар", ">90 %", "Трёхходовой паровой котёл для современных промышленных нужд"),
  steam("ici-ecovapor", "ICI ECOVAPOR", 1000, 3000, 681, 2044, "12 бар", ">95,0 %", "Высокоэкономичный паровой котёл: передовые технологии горения и теплопередачи"),
  steam("ici-trevapor", "ICI TReVAPOR", 1200, 6500, 818, 4770, "12 бар", "90,5 %", "Парогенераторы повышенной эффективности с низкими выбросами"),
  steam("ici-sixen-n", "ICI SIXEN N", 350, 5000, 238, 3407, "12 или 15 бар", ">90,0 %", "Моноблочный котёл с обратной жаровой трубой, полностью мокрая поворотная камера"),
  steam("ici-bnx", "ICI BNX (низкое давление)", 100, 3000, 69.8, 2035, "0,98 или 0,5 бар", ">91,0 %", "Моноблочный котёл низкого давления с обратной жаровой трубой"),
  steam("ici-fx-n", "ICI FX N (мгновенный)", 50, 300, 31.7, 209.2, "5 бар", ">91,0 %", "Мгновенного парообразования: малое водосодержание, полностью автоматический"),
  steam("ici-flash", "ICI FLASH (мгновенный)", 20.3, 244.2, 15, 180, "4,5 бар", "—", "Компактный парогенератор для прачечных и малых нагрузок"),
  steam("ici-isg", "ICI ISG (косвенный чистый пар)", 160, 2750, 115, 2054, "6 бар", "—", "Косвенная генерация чистого пара, компоненты смонтированы на заводе"),
  // ==== Водогрейные ====
  gen("ici-tnx", "ICI TNX", "water", 3000, 20000, "6 бар", ">92,0 %", "Три хода газов, мокрая поворотная камера, автоматическое управление; для районных сетей, больниц, аэропортов"),
  gen("ici-tnox", "ICI TNOX", "water", 2500, 25000, "6 бар", "—", "Трёхходовой с мокрой камерой и низкой тепловой нагрузкой топки"),
  // ==== Перегретая вода ====
  gen("ici-asx-en", "ICI ASX EN", "hw170", 470, 3500, "5 или 12 бар", ">90,0 %", "Моноблочный с обратной жаровой трубой, перегретая вода выше 110 °C"),
  gen("ici-asgx-en", "ICI ASGX EN", "hw170", 3000, 17000, "12 бар", ">90,0 %", "Три хода газов, полностью мокрая фронтальная камера, перегретая вода выше 110 °C"),
  // ==== Термомасляные ====
  gen("ici-opx", "ICI OPX", "oil", 116, 9302, "10 бар", ">86,0 %", "Три хода газов, одинарная топка; низкие тепловые нагрузки и высокие скорости масла против крекинга"),
  // ==== Утилизационные ====
  {
    id: "ici-wh",
    name: "ICI WH (утилизационные: WHB/WHS/WHC/WHO)",
    categoryId: "steam",
    kind: "Утилизационный котёл (пар/перегретая вода/горячая вода/диатермическое масло)",
    image: "/catalog/steam.jpg",
    summary:
      "Утилизационные котлы WH на отходящих газах двигателей, турбин и печей: WHB (пар) 100–20 000 кВт (1–25 бар), WHS (перегретая вода) 233–17 000 кВт, WHC (горячая вода) 3 000–25 000 кВт, WHO (термомасло) 116–9 300 кВт.",
    powerMinKw: 100,
    powerMaxKw: 25000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: "1–25 бар (по среде)",
    fuels: noFuel,
    feature: "Собственного горения нет — энергия отходящих газов; полная комплектация арматурой и автоматикой",
    extra: `${checked} Диапазоны по карточкам WHB/WHS/WHC/WHO на странице Waste Heat Recovery Boilers.`,
    sizes: [],
    sizesNote: "Четыре семейства (пар/перегретая вода/горячая вода/масло); типоряды не публикуются.",
    aliases: ["ici whb", "ici whs", "ici утилизационный", "ici waste heat"],
  },
];

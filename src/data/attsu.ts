import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страницы и каталог ATTSU. В ряд RL вошли границы, не три примера из таблицы.";

const gas: FuelId[] = ["gas", "diesel", "heavy"];

function steam(id: string, name: string, kind: string, min: number | null, max: number | null, feature: string, pressure: string | null, extra: string, image: string): Series {
  return {
    id,
    name,
    categoryId: "steam",
    kind,
    image,
    summary: max == null ? "Серия названа. Пар на карточке не указан." : min == null ? `до ${max.toLocaleString("ru-RU")} кг/ч` : `${min.toLocaleString("ru-RU")}–${max.toLocaleString("ru-RU")} кг/ч`,
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: min,
    steamMaxKgH: max,
    tempMaxC: null,
    pressureNote: pressure,
    fuels: id === "attsu-cspm" ? (["solid"] as FuelId[]) : id === "attsu-rl" || id === "attsu-hh" ? gas : [],
    feature,
    extra: `${checked} ${extra}`,
    sizes: [],
    sizesNote: "Полный список моделей в эту карточку не переносился.",
    aliases: [],
  };
}

export const attsuCategories: Category[] = [
  { id: "steam", title: "Паровые", param: "steam" },
  { id: "oil", title: "Термомасляные", param: "power" },
];

export const attsuDocuments = [{ title: "Паровые и термомасляные ATTSU" }];

export const attsuSeries: Series[] = [
  steam("attsu-rl", "ATTSU RL", "Три хода, обратное пламя", 50, 5000, "50–5 000 кг/ч, стандарт до 16 бар", "до 16 бар", "В таблице каталога как примеры RL-50/8, RL-1000/8 и RL-5000/8. Это не полный ряд.", "/catalog/reverse.jpg"),
  steam("attsu-hh", "ATTSU HH", "Три хода, горизонтальный", null, 20000, "до 20 000 кг/ч", null, "Строка «other boilers»: steam boiler up to 20000 kg/h, series HH.", "/catalog/firetube.jpg"),
  steam("attsu-ge", "ATTSU GE / GER", "Электрический", null, 4500, "до 4 500 кг/ч", null, "Там же: electric steam boilers up to 4500 kg/h, series GE and GER. На карточке GE отдельно указано низкое напряжение 400–690 В.", "/catalog/cabinet.jpg"),
  steam("attsu-cspm", "ATTSU CSPM", "Три хода, биомасса", null, null, "Биомасса", null, "Имя и тип есть. Паропроизводительность на карточке не указана.", "/catalog/solid.jpg"),
  steam("attsu-vl", "ATTSU VL-INOX", "Чистый пар, нержавеющая сталь", null, null, "Греющий пар, перегретая вода или термомасло", null, "Производительность на карточке не указана.", "/catalog/vertical.jpg"),
  steam("attsu-bv", "ATTSU BV", "Утилизатор, когенерация", null, null, "Выхлоп двигателя или турбины", null, "Производительность на карточке не указана.", "/catalog/skid.jpg"),
  {
    id: "attsu-ft",
    name: "ATTSU FT",
    categoryId: "oil",
    kind: "Термомасло, три хода, горизонтальный",
    image: "/catalog/reverse.jpg",
    summary: "466–5 814 кВт.",
    powerMinKw: 466,
    powerMaxKw: 5814,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: gas,
    feature: "Газ, СУГ, лёгкое и тяжёлое масло, биогаз",
    extra: `${checked} Страница FT Horizontal. Отдельно написано, что бывают исполнения на 400 °C. Это не мощность.`,
    sizes: [],
    sizesNote: "Типоразмеры внутри 466–5 814 кВт не разложены.",
    aliases: ["ft"],
  },
];

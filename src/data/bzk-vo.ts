import type { Category, FuelId, Series, Size } from "@/data/catalog";

const checked = "Сверка 18.11.2026. Каталог bzk-vo.ru. В ряд взяты ступени открытых разделов. Исполнения одной ступени по давлению, перегреву и топке не разворачивались. Деаэраторы, сепараторы и МКУ не внесены.";

const kw = (id: string, name: string, mw: number): Size => ({ id, name, powerKw: Math.round(mw * 1000), steamKgH: null });
const th = (id: string, name: string, tons: number): Size => ({ id, name, powerKw: null, steamKgH: Math.round(tons * 1000) });

function water(id: string, name: string, sizes: Size[], temp: number | null, fuels: FuelId[], feature: string, extra: string): Series {
  const powers = sizes.map((item) => item.powerKw).filter((value): value is number => value != null);
  return {
    id,
    name,
    categoryId: "water",
    kind: "Водогрейный",
    image: "/catalog/waterpipe.jpg",
    summary: feature,
    powerMinKw: powers.length ? Math.min(...powers) : null,
    powerMaxKw: powers.length ? Math.max(...powers) : null,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: temp,
    pressureNote: null,
    fuels,
    feature,
    extra: `${checked} ${extra}`,
    sizes,
    sizesNote: null,
    aliases: [],
  };
}

function steam(id: string, name: string, sizes: Size[], fuels: FuelId[], feature: string, extra: string): Series {
  const tons = sizes.map((item) => item.steamKgH).filter((value): value is number => value != null);
  return {
    id,
    name,
    categoryId: "steam",
    kind: "Паровой",
    image: "/catalog/waterpipe.jpg",
    summary: feature,
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: tons.length ? Math.min(...tons) : null,
    steamMaxKgH: tons.length ? Math.max(...tons) : null,
    tempMaxC: null,
    pressureNote: null,
    fuels,
    feature,
    extra: `${checked} ${extra}`,
    sizes,
    sizesNote: "Одно давление и одна температура на серию не ставятся: у исполнений они разные.",
    aliases: [],
  };
}

const burnerNames = ["ГМГ-1,5", "ГМГ-2", "ГМГ-4", "ГМГ-5", "ГМ-2,5", "ГМ-4,5", "ГМ-7", "ГМ-10", "ГМП-16", "ГМр-20", "ГМр-30", "ГМВТ2-12", "ГМВТ2-25", "ГМВТ2-32"];

export const bzkVoCategories: Category[] = [
  { id: "water", title: "Водогрейные", param: "power" },
  { id: "steam", title: "Паровые", param: "steam" },
  { id: "auto", title: "Горелки", param: "none" },
];
export const bzkVoDocuments = [{ title: "Каталог bzk-vo.ru" }];
export const bzkVoSeries: Series[] = [
  water(
    "bzkvo-kvm",
    "БЗКиВО КВм",
    [kw("kvm-10", "КВм-1,0", 1), kw("kvm-14", "КВм-1,4", 1.4), kw("kvm-23", "КВм-2,3", 2.3), kw("kvm-30", "КВм-3,0", 3)],
    95,
    ["solid"],
    "1–3 МВт, график 70–95 °C",
    "Карточка КВм-1,0: 1 МВт и 0,86 Гкал/ч, уголь, 70–95 °C, в тексте давление до 0,6 МПа. Остальные три ступени взяты из названий того же раздела.",
  ),
  water(
    "bzkvo-kev",
    "БЗКиВО КЕВ",
    [kw("kev-174", "КЕВ-2,5", 1.74), kw("kev-28", "КЕВ-4", 2.8), kw("kev-465", "КЕВ-6,5", 4.65), kw("kev-698", "КЕВ-10", 6.98), kw("kev-1740", "КЕВ-25", 17.4)],
    115,
    ["solid"],
    "1,74–17,4 МВт",
    "МВт взяты из скобок КВ-Р на карточках раздела. Карточка КЕВ-4: 2,8 МВт, уголь, график 70–115 °C, 1,3 МПа. У КЕВ-25 в названии ещё 115(150).",
  ),
  water(
    "bzkvo-dev",
    "БЗКиВО ДЕВ",
    [kw("dev-29", "ДЕВ-4", 2.9), kw("dev-465", "ДЕВ-6,5", 4.65), kw("dev-756", "ДЕВ-10", 7.56), kw("dev-1163", "ДЕВ-16", 11.63), kw("dev-174", "ДЕВ-25", 17.4)],
    150,
    ["gas", "diesel"],
    "2,9–17,4 МВт",
    "Раздел на сайте называется КВ-ГМ, в нём стоят ДЕВ с индексом ГМ. МВт взяты из скобок КВ-ГМ. Топливо газа и жидкого подтверждено на карточке ДЕ-6,5, не на карточке ДЕВ.",
  ),
  water(
    "bzkvo-kvr",
    "БЗКиВО КВ-Р и КВ-ТС",
    [
      kw("kvr-465", "КВ-Р-4,65-150", 4.65),
      kw("kvr-756", "КВ-Р-7,56-150", 7.56),
      kw("kvr-1163", "КВ-Р-11,63-150", 11.63),
      kw("kvts-2326", "КВ-ТС-20-150", 23.26),
    ],
    150,
    [],
    "4,65–23,26 МВт",
    "МВт стоят в обозначении КВ-Р. Топливо на этих карточках в сверке не открывалось. КВ-ТСВ-10 и КВ-ТСВ-20 повторяют 11,63 и 23,26 МВт и отдельно не заведены.",
  ),
  {
    id: "bzkvo-kv-small",
    name: "БЗКиВО КВр и КВм до 3,5",
    categoryId: "water",
    kind: "Водогрейный",
    image: "/catalog/solid.jpg",
    summary: "Названы КВр 0,4–0,8 и КВм 0,4–3,5. Карточки в этой сверке не открывались, кВт не проставлены.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: [],
    feature: "кВт по карточкам не сняты",
    extra: checked,
    sizes: ["КВр-0,4", "КВр-0,6", "КВр-0,8", "КВм-0,4", "КВм-0,6", "КВм-0,8", "КВм-1,2", "КВм-1,8", "КВм-2,5", "КВм-3,5", "КВ-1,2-115", "КВЕ-0,7-115"].map((name) => ({
      id: `bzkvo-small-${name}`,
      name,
      powerKw: null,
      steamKgH: null,
    })),
    sizesNote: null,
    aliases: [],
  },
  {
    id: "bzkvo-ptvm",
    name: "БЗКиВО ПТВМ-50",
    categoryId: "water",
    kind: "Водогрейный",
    image: "/catalog/waterpipe.jpg",
    summary: "58,2 МВт. В разделе открыта одна модель.",
    powerMinKw: 58200,
    powerMaxKw: 58200,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: 150,
    pressureNote: "1,0–2,25 МПа",
    fuels: ["gas"],
    feature: "Газ, 70–150 °C",
    extra: `${checked} Карточка ПТВМ-50: 50 Гкал/ч и 58,2 МВт. Вторая строка топлива в таблице есть, вид не подписан.`,
    sizes: [kw("ptvm-50", "ПТВМ-50", 58.2)],
    sizesNote: null,
    aliases: ["птвм"],
  },
  steam("bzkvo-dse", "БЗКиВО ДСЕ", [th("dse-16", "ДСЕ-1,6", 1.6), th("dse-25", "ДСЕ-2,5", 2.5)], [], "1,6 и 2,5 т/ч", "В разделе две модели: ДСЕ-1,6-14ТР и ДСЕ-2,5-14Шп. Карточки в этой сверке не открывались."),
  steam("bzkvo-dkvr", "БЗКиВО ДКВр", [th("dkvr-25", "ДКВр-2,5", 2.5), th("dkvr-4", "ДКВр-4", 4), th("dkvr-65", "ДКВр-6,5", 6.5), th("dkvr-10", "ДКВр-10", 10), th("dkvr-20", "ДКВр-20", 20)], ["solid"], "2,5–20 т/ч", "В разделе только исполнения С. Давление в названиях 13, 23 и 39 кгс/см², перегрев до 440 °C."),
  steam("bzkvo-ke", "БЗКиВО КЕ", [th("ke-25", "КЕ-2,5", 2.5), th("ke-4", "КЕ-4", 4), th("ke-65", "КЕ-6,5", 6.5), th("ke-10", "КЕ-10", 10), th("ke-25t", "КЕ-25", 25)], ["solid"], "2,5–25 т/ч", "Карточка КЕ-2,5-14: 2,5 т/ч, каменный и бурый уголь, 1,3 МПа. В разделе давление в названиях 14 и 24 кгс/см²."),
  steam("bzkvo-de", "БЗКиВО ДЕ", [th("de-4", "ДЕ-4", 4), th("de-65", "ДЕ-6,5", 6.5), th("de-10", "ДЕ-10", 10), th("de-16", "ДЕ-16", 16), th("de-25", "ДЕ-25", 25), th("de-40", "ДЕ-40", 40), th("de-50", "ДЕ-50", 50)], ["gas", "diesel"], "4–50 т/ч", "Карточка ДЕ-6,5-14ГМ: 6,5 т/ч, газ и жидкое топливо, 1,3 МПа, насыщенный пар 194 °C. Выше по ряду есть перегрев, одно значение на серию не ставится."),
  steam("bzkvo-e", "БЗКиВО Е", [th("e-1", "Е-1,0-0,9Р", 1), th("e-50", "Е-50-1,4-250ГМ", 50)], [], "В разделе две модели: 1 и 50 т/ч", "Это не непрерывный ряд. Карточки этих двух моделей в сверке не открывались."),
  {
    id: "bzkvo-burners",
    name: "БЗКиВО, горелки",
    categoryId: "auto",
    kind: "Горелка",
    image: "/catalog/cabinet.jpg",
    summary: "Правые и левые исполнения сведены в одну модель. кВт не указаны.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: [],
    feature: "кВт не указаны",
    extra: checked,
    sizes: burnerNames.map((name) => ({ id: `bzkvo-${name}`, name, powerKw: null, steamKgH: null })),
    sizesNote: null,
    aliases: ["гмг"],
  },
];

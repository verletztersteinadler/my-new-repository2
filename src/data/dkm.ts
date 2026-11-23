import type { Category, FuelId, Series, Size } from "@/data/catalog";

const checked = "Сверка 18.11.2026. Каталог dkm.ru. Горелки сведены по трём диапазонам страницы, отдельные модели не открывались. Автоматика ДКМАТИК и энергозапчасти не внесены.";

const water = (id: string, name: string, mw: number): Size => ({ id, name, powerKw: Math.round(mw * 1000), steamKgH: null });
const steam = (id: string, name: string, th: number): Size => ({ id, name, powerKw: null, steamKgH: Math.round(th * 1000) });

function series(item: Omit<Series, "image" | "extra" | "aliases" | "sizesNote"> & { image?: string; extra?: string }): Series {
  return { image: "/catalog/firetube.jpg", extra: checked, aliases: [], sizesNote: null, ...item };
}

const dnepr = [1, 1.25, 1.5, 2, 2.5, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14.5, 16.5, 18, 20];
const dor = [50, 80, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 750, 850, 1000, 1250, 1400, 1500, 1750, 1850, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000];
const omni = [2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20, 25];

export const dkmCategories: Category[] = [
  { id: "water", title: "Водогрейные", param: "power" },
  { id: "steam", title: "Паровые", param: "steam" },
  { id: "auto", title: "Горелки", param: "power" },
];
export const dkmDocuments = [{ title: "Каталог dkm.ru" }];
export const dkmSeries: Series[] = [
  series({
    id: "dkm-dor",
    name: "Дорогобуж",
    categoryId: "water",
    kind: "Жаротрубный",
    summary: "0,05–7 МВт. Карточки 50 и 1500: индекс в кВт, вода 115 °C, 0,6 МПа, газ или дизель.",
    powerMinKw: 50,
    powerMaxKw: 7000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: 115,
    pressureNote: "0,6 МПа",
    fuels: ["gas", "diesel"],
    feature: "Газ или дизель",
    sizes: dor.map((kw) => water(`dor-${kw}`, `Дорогобуж-${kw}`, kw / 1000)),
  }),
  series({
    id: "dkm-dnepr",
    name: "Днепр",
    categoryId: "water",
    kind: "Жаротрубный",
    summary: "1–20 МВт, исполнения 115 и 150 °C.",
    powerMinKw: 1000,
    powerMaxKw: 20000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: 150,
    pressureNote: null,
    fuels: ["gas", "diesel"],
    feature: "Газ или дизель",
    extra: `${checked} Днепр-1000-115: 1 МВт, 0,6 МПа. Днепр-20000-150: 20 МВт, 1 МПа. Одно давление на ряд не ставится.`,
    sizes: dnepr.flatMap((mw) => [115, 150].map((temp) => water(`dnepr-${mw}-${temp}`, `Днепр-${mw * 1000}-${temp}`, mw))),
  }),
  series({
    id: "dkm-omni",
    name: "OMNIBOIL",
    categoryId: "steam",
    kind: "Жаротрубный паровой",
    image: "/catalog/steam.jpg",
    summary: "2–25 т/ч. L, M и H — одно паропроизводство и разное давление.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: 2000,
    steamMaxKgH: 25000,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["gas", "diesel"],
    feature: "Газ или дизель",
    extra: `${checked} SF-2L: 2 т/ч, 1,3 МВт, 0,8 МПа, 175 °C. SF-2M: 1,2 МПа, 192 °C. SF-2H: 1,6 МПа, 204 °C. SF-25L: 25 т/ч, 16,25 МВт, 0,8 МПа.`,
    sizes: omni.map((th) => steam(`omni-${th}`, `SF-${th}, L/M/H`, th)),
  }),
  series({
    id: "dkm-kvgm",
    name: "КВ-ГМ",
    categoryId: "water",
    kind: "Водотрубный",
    image: "/catalog/steam.jpg",
    summary: "11,63–139,6 МВт. Давление карточек 2,5 МПа, вода 150 °C.",
    powerMinKw: 11630,
    powerMaxKw: 139600,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: 150,
    pressureNote: "2,5 МПа",
    fuels: ["gas", "diesel", "heavy"],
    feature: "Газ, дизель или мазут",
    extra: `${checked} КВ-ГМ-10, 20 и 30 на карточках дают 11,63, 23,26 и 35 МВт и топливо газ или дизель. Модели с дробным индексом той же мощности добавляют мазут.`,
    sizes: [
      water("kv-10", "КВ-ГМ-10", 11.63),
      water("kv-20", "КВ-ГМ-20", 23.26),
      water("kv-30", "КВ-ГМ-30", 35),
      water("kv-1163", "КВ-ГМ-11,63-150", 11.63),
      water("kv-2326", "КВ-ГМ-23,26-150", 23.26),
      water("kv-35", "КВ-ГМ-35-150", 35),
      water("kv-582", "КВ-ГМ-58,2-150", 58.2),
      water("kv-116", "КВ-ГМ-116,3-150", 116.3),
      water("kv-139", "КВ-ГМ-139,6-150", 139.6),
    ],
  }),
  series({
    id: "dkm-ptvm",
    name: "ПТВМ",
    categoryId: "water",
    kind: "Водотрубный",
    image: "/catalog/steam.jpg",
    summary: "35–209 МВт. ПТВМ-30М П-образный, остальные башенные.",
    powerMinKw: 35000,
    powerMaxKw: 209000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: 150,
    pressureNote: null,
    fuels: ["gas", "diesel", "heavy"],
    feature: "Газ, мазут или дизель",
    extra: `${checked} 30М и 30МС: 35 МВт, 2,5 МПа, 150 °C, газ или мазут. 30М-115: те же 35 МВт, 1,6 МПа, 115 °C, только газ. 50 — 58,2; 60 и 60Э — 69,8; 70Э — 81,4 и только газ; 100 — 116,3; 120 и 120Э — 139,6; 180 — 209 МВт и газ или дизель.`,
    sizes: [
      water("p30", "ПТВМ-30М", 35),
      water("p30s", "ПТВМ-30МС", 35),
      water("p30-115", "ПТВМ-30М-115", 35),
      water("p50", "ПТВМ-50", 58.2),
      water("p60", "ПТВМ-60", 69.8),
      water("p60e", "ПТВМ-60Э", 69.8),
      water("p70", "ПТВМ-70Э", 81.4),
      water("p100", "ПТВМ-100", 116.3),
      water("p120", "ПТВМ-120", 139.6),
      water("p120e", "ПТВМ-120Э", 139.6),
      water("p180", "ПТВМ-180", 209),
    ],
  }),
  series({
    id: "dkm-smol",
    name: "Смоленск",
    categoryId: "water",
    kind: "Водотрубный",
    image: "/catalog/steam.jpg",
    summary: "1,16–58,2 МВт. Мегаватт и температура взяты из имени модели.",
    powerMinKw: 1160,
    powerMaxKw: 58200,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: [] as FuelId[],
    feature: "Топливо зависит от конкретного исполнения; документирован газ у Смоленск-4,65-95К",
    extra: `${checked} Официальная карточка Смоленск-4,65-95К: 4,65 МВт, 95 °C, 1 МПа, только газ. Для остальных моделей топливо, температурный режим и давление не подтверждены.`,
    sourceUrl: "https://dkm.ru/production/vodotrubnye-kotly/smolensk/kompaktnye/smolensk-4-65-95k-kv-g-4-65-95n/",
    sourceChecked: "2026-11-23",
    sizes: [
      ["4,65-95К", 4.65], ["4,65-115К", 4.65], ["7,56-95К", 7.56], ["7,56-115К", 7.56], ["14-150К", 14],
      ["1,16-95", 1.16], ["1,16-115", 1.16], ["2,32-95", 2.32], ["2,32-115", 2.32], ["3,48-95", 3.48], ["3,48-115", 3.48], ["4,65-115", 4.65], ["4,65-150", 4.65],
      ["5-115ТМ", 5], ["5,5-115ТМ", 5.5], ["6-115ТМ", 6], ["7,56-115ТМ", 7.56], ["7,56-150ТМ", 7.56], ["11,63-115ТМ", 11.63], ["11,63-150ТМ", 11.63], ["14-115ТМ", 14], ["14-150ТМ", 14], ["15-115ТМ", 15], ["15-150ТМ", 15], ["17,44-115ТМ", 17.44], ["17,44-150ТМ", 17.44], ["23,26-115ТМ", 23.26],
      ["20-115L", 20], ["20-150L", 20], ["23,26-115L", 23.26], ["23,26-150L", 23.26], ["25-115L", 25], ["25-150L", 25], ["35-115L", 35], ["35-150L", 35], ["58,2-115L", 58.2], ["58,2-150L", 58.2],
    ].map(([name, mw]) => {
      const model = water(`sm-${name}`, `Смоленск-${name}`, mw as number);
      const verified = name === "4,65-95К";
      return {
        ...model,
        // Never inherit multi-fuel series claims from unverified models.
        fuels: verified ? (["gas"] as FuelId[]) : ([] as FuelId[]),
        ...(verified ? {
          tempMaxC: 95,
          workingPressureBar: 10,
          sourceUrl: "https://dkm.ru/production/vodotrubnye-kotly/smolensk/kompaktnye/smolensk-4-65-95k-kv-g-4-65-95n/",
        } : {}),
      };
    }),
  }),
  series({
    id: "dkm-burn",
    name: "Горелки ДКМ",
    categoryId: "auto",
    kind: "Горелка",
    image: "/catalog/cabinet.jpg",
    summary: "На странице три ряда: 2,2–9,9, 6,6–13,2 и 13,2–38,5 МВт.",
    powerMinKw: 2200,
    powerMaxKw: 38500,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["gas", "diesel", "heavy"],
    feature: "Моноблок до 6,6 МВт, дальше двублочные",
    sizes: [],
  }),
];

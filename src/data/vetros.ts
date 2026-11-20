import type { Category, FuelId, Series, Size } from "@/data/catalog";

const checked =
  "Сверка 16.11.2026. ООО «ВетроСтройДеталь» / ООО «ВСД», производство в Волгодонске.";

const fuels: FuelId[] = ["gas", "diesel", "heavy"];

function sizes(prefix: string, values: number[]): Size[] {
  return values.map((powerKw) => ({
    id: `vetros-${prefix.toLowerCase()}-${powerKw}`,
    name: `VETROS ${prefix} ${powerKw}`,
    powerKw,
    steamKgH: null,
  }));
}

export const vetrosCategories: Category[] = [{ id: "water", title: "Водогрейные", param: "power" }];

export const vetrosSeries: Series[] = [
  {
    id: "vetros-dw",
    name: "VETROS DW",
    categoryId: "water",
    kind: "Водогрейный, жаротрубный, 2 хода",
    image: "/catalog/vetros-dw.jpg",
    summary: "В таблице каталога 15 моделей, 0,3–6 МВт. Давление 0,6 МПа, выход 110 °C.",
    powerMinKw: 300,
    powerMaxKw: 6000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: 110,
    pressureNote: "0,6 МПа",
    fuels,
    feature: "Два хода",
    extra: `${checked} На странице продукции в выборе модели только DW 300, 1000, 2000, 3000, 4000, 5000 и 6000. Остальные восемь типоразмеров есть в таблице каталога. Заголовок страницы и общая строка каталога пишут выход до 115 °C, таблица серии — 110 °C. На обложке каталога КПД до 95 %, в таблице DW — 92,2–92,5 %. В карточке оставлены таблица и 110 °C.`,
    sizes: sizes("DW", [300, 400, 500, 750, 800, 950, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 5000, 6000]),
    sizesNote: "Имена взяты из таблицы каталога. На странице продукции опубликован не весь ряд.",
    aliases: ["dw"],
  },
  {
    id: "vetros-tw",
    name: "VETROS TW",
    categoryId: "water",
    kind: "Водогрейный, жаротрубный, 3 хода",
    image: "/catalog/vetros-dw.jpg",
    summary: "В таблице каталога 13 моделей, 1–10 МВт. Давление 0,6 МПа, выход 115 °C.",
    powerMinKw: 1000,
    powerMaxKw: 10000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: 115,
    pressureNote: "0,6 МПа",
    fuels,
    feature: "Три хода",
    extra: `${checked} На странице продукции отдельных карточек нет, ряд взят из таблицы каталога. Верхняя граница 10 МВт относится к этой серии, не к DW. В таблице КПД указан как «до 95». Отдельного изображения трёхходового котла нет: иллюстрация повторяет опубликованный жаротрубный корпус.`,
    sizes: sizes("TW", [1000, 1500, 2000, 2500, 3000, 3500, 4000, 5000, 6000, 7000, 8000, 9000, 10000]),
    sizesNote: null,
    aliases: ["tw"],
  },
];

export const vetrosDocuments = [
  { title: "Каталог", href: "https://vetros-boiler.ru/local/assets/images/Catalog.pdf" },
  { title: "ТР ТС 016", href: "https://vetros-boiler.ru/upload/iblock/ebe/nes9hnf22oa18739cy9dz36uy3sr3yhj/TR-TS-016.pdf" },
  { title: "ТР ТС 032", href: "https://vetros-boiler.ru/upload/iblock/f04/bc3ov2rl1zgd6snv0yow1squ8fa5crv9/TR-TS-032.pdf" },
];

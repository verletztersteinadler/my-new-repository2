import type { Category, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страница продукции Ambitermo называет жаротрубные и водотрубные котлы и три теплоносителя. Какой тип на каком теплоносителе и с какой мощностью, страница не пишет. Потолок «80 бар» и «30 000 кВт» к одной серии не привязан и в цифры карточек не поставлен.";

function line(id: string, name: string, kind: string, categoryId: Series["categoryId"], image: string): Series {
  return {
    id,
    name,
    categoryId,
    kind,
    image,
    summary: "Теплоноситель назван. Мощность и ряд моделей не указаны.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: [],
    feature: "Биомасса названа среди источников завода, не у этой карточки",
    extra: checked,
    sizes: [],
    sizesNote: "Именных моделей нет.",
    aliases: [],
  };
}

export const ambitermoCategories: Category[] = [
  { id: "water", title: "Водогрейные", param: "power" },
  { id: "steam", title: "Паровые", param: "steam" },
  { id: "oil", title: "Термомасляные", param: "power" },
];

export const ambitermoDocuments = [{ title: "Страница продукции Ambitermo" }];

export const ambitermoSeries: Series[] = [
  line("amb-water", "Ambitermo, вода", "Водогрейный контур", "water", "/catalog/firetube.jpg"),
  line("amb-steam", "Ambitermo, пар", "Паровой контур", "steam", "/catalog/steam.jpg"),
  line("amb-oil", "Ambitermo, термомасло", "Термомасляный контур", "oil", "/catalog/reverse.jpg"),
];

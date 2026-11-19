import type { Category, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страница КЭП на stemi.ru. Общий пар 205–21 000 кг/ч по напряжениям не разложен.";

function line(id: string, name: string, min: number, max: number, feature: string): Series {
  return {
    id,
    name,
    categoryId: "steam",
    kind: "Электродный",
    image: "/catalog/vertical.jpg",
    summary: `${min.toLocaleString("ru-RU")}–${max.toLocaleString("ru-RU")} кВт.`,
    powerMinKw: min,
    powerMaxKw: max,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: "до 0,8 МПа",
    fuels: [],
    feature,
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: [],
  };
}

export const stemiCategories: Category[] = [{ id: "steam", title: "Паровые", param: "steam" }];
export const stemiDocuments = [{ title: "КЭП" }];
export const stemiSeries: Series[] = [
  line("stemi-04", "ЗСТЭМИ КЭП 0,4 кВ", 160, 250, "0,4 кВ"),
  line("stemi-gen", "ЗСТЭМИ, парогенераторы 0,4 кВ", 250, 630, "0,4 кВ"),
  line("stemi-hv", "ЗСТЭМИ КЭП 6–10 кВ", 2500, 16000, "6 и 10 кВ"),
];

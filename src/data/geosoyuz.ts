import type { Category, Series, Size } from "@/data/catalog";

const checked = "Сверка 18.11.2026. geosoyuz.ru. Ступени взяты из переключателя мощности на странице серии. Баннер «до 10 МВт» к этим рядам не привязан.";

function mw(id: string, steps: number[]): Size[] {
  return steps.map((kw) => ({ id: `${id}-${kw}`, name: `${kw} кВт`, powerKw: kw, steamKgH: null }));
}

function line(id: string, name: string, categoryId: "water" | "oil", steps: number[], temp: number, feature: string, extra: string, pressure: string | null): Series {
  return {
    id,
    name,
    categoryId,
    kind: categoryId === "oil" ? "Термомасляный" : "Водогрейный",
    image: "/catalog/solid.jpg",
    summary: feature,
    powerMinKw: steps[0],
    powerMaxKw: steps[steps.length - 1],
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: temp,
    pressureNote: pressure,
    fuels: ["solid"],
    feature,
    extra: `${checked} ${extra}`,
    sizes: mw(id, steps),
    sizesNote: null,
    aliases: [],
  };
}

const small = [250, 500, 750, 1000, 1250, 1500, 2000];
const layer = [500, 750, 1000, 1500, 2000, 3000, 4000, 5000, 6000];

export const soyuzCategories: Category[] = [
  { id: "water", title: "Водогрейные", param: "power" },
  { id: "oil", title: "Термомасляные", param: "power" },
];
export const soyuzDocuments = [{ title: "Каталог geosoyuz.ru" }];
export const soyuzSeries: Series[] = [
  line("soyuz-spk", "Союз УТПУ-СПК", "water", small, 115, "250–2000 кВт, вода до 115 °C", "Сухое сыпучее: пеллеты, опилки, пыль, ДСП, МДФ, лузга.", null),
  line("soyuz-b", "Союз УТПУ-Б", "water", small, 115, "250–2000 кВт, вода до 115 °C", "Влажная щепа, опилки, дрова, брикеты, кора. На странице давление сети до 8 атм.", "до 8 атм"),
  line("soyuz-mt", "Союз УТПУ-МТ", "water", layer, 115, "500–6000 кВт, вода до 115 °C", "В тексте страницы ряд назван 1–6 МВт, переключатель мощности также даёт 500 и 750 кВт. Уголь, торф, кора, щепа, пеллеты, брикеты, дрова.", null),
  line("soyuz-tmu", "Союз ТМУ-МТ", "oil", layer, 320, "500–6000 кВт, термомасло до 320 °C", "В тексте страницы ряд назван 1–6 МВт, переключатель мощности также даёт 500 и 750 кВт. Кора, торф, уголь, опилки, щепа, брикеты.", null),
];

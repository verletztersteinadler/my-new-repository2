import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страницы THERMOMAT и Elektrothermomat на gekakonus.net. Киловатт нет.";

function oil(id: string, name: string, fuels: FuelId[], feature: string): Series {
  return {
    id,
    name,
    categoryId: "oil",
    kind: "Термомасло, принудительная циркуляция",
    image: "/catalog/reverse.jpg",
    summary: "До 340 °C без давления. Выше 340 и до 400 °C — до 12 бар.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: 400,
    pressureNote: "до 12 бар только выше 340 °C",
    fuels,
    feature,
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: [],
  };
}

export const gekaCategories: Category[] = [{ id: "oil", title: "Термомасляные", param: "power" }];
export const gekaDocuments = [{ title: "THERMOMAT" }];
export const gekaSeries: Series[] = [
  oil("geka-th", "GekaKonus THERMOMAT", ["gas", "diesel", "heavy"], "Три хода, жидкое или газообразное топливо"),
  oil("geka-el", "GekaKonus Elektrothermomat", [], "Электрический"),
];

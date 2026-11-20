import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страница Riley Power на babcockpower.com. Мощностей у этих имён нет.";

function line(id: string, name: string, feature: string, fuels: FuelId[], image: string): Series {
  return {
    id,
    name,
    categoryId: "steam",
    kind: "Парогенератор",
    image,
    summary: "Линия названа. Паропроизводительность не указана.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels,
    feature,
    extra: `${checked} Горелки CCV и STS, пульверизаторы ATRITA и детали на странице есть. Это не котловые ряды и в карточки не внесены.`,
    sizes: [],
    sizesNote: "Типоразмеров нет.",
    aliases: [],
  };
}

export const rileyCategories: Category[] = [{ id: "steam", title: "Паровые", param: "steam" }];

export const rileyDocuments = [{ title: "Перечень Riley Power" }];

export const rileySeries: Series[] = [
  line("riley-fossil", "Riley Power, ископаемое топливо", "Fossil steam generators", ["solid", "gas", "heavy"], "/catalog/waterpipe.jpg"),
  line("riley-srs", "Riley Power, солнечный приёмник", "Solar receiver steam generators", [], "/catalog/vertical.jpg"),
  line("riley-bio", "Riley Power, биомасса", "Biomass steam generators", ["solid"], "/catalog/solid.jpg"),
  line("riley-wte", "Riley Power, отходы", "Waste to energy boilers", ["solid"], "/catalog/solid.jpg"),
];

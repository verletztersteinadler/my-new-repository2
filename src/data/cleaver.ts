import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Карточка CBEX на cleaverbrooks.com. Лошадиные силы в кг/ч страница не переводит. CBLE есть у дилера и не скопирован.";

function line(id: string, name: string, feature: string): Series {
  return {
    id,
    name,
    categoryId: "steam",
    kind: "Жаротрубный",
    image: "/catalog/firetube.jpg",
    summary: feature,
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: "пар до 300 psi, вода до 125 psi",
    fuels: ["gas", "diesel"] as FuelId[],
    feature,
    extra: checked,
    sizes: [],
    sizesNote: "Подвод 4 000–102 000 на странице без единицы и не переведён.",
    aliases: [],
  };
}

export const cleaverCategories: Category[] = [{ id: "steam", title: "Паровые", param: "steam" }];
export const cleaverDocuments = [{ title: "CBEX" }];
export const cleaverSeries: Series[] = [
  line("cbex-2w", "Cleaver-Brooks CBEX-2W", "100–2 500 HP, два хода"),
  line("cbex-2d", "Cleaver-Brooks CBEX-2D", "250–800 HP, два хода, сухая поворотная камера"),
  line("cbex-3w", "Cleaver-Brooks CBEX-3W", "250–800 HP, три хода"),
];

import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страница жаротрубных sellersmfg.com. Лошадиные силы и mmBTU в киловатты не переведены.";

function line(id: string, name: string, feature: string, pressure: string, fuels: FuelId[]): Series {
  return {
    id,
    name,
    categoryId: "steam",
    kind: "Один ход",
    image: "/catalog/firetube.jpg",
    summary: feature,
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: pressure,
    fuels,
    feature,
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: [],
  };
}

const gas: FuelId[] = ["gas"];

export const sellersCategories: Category[] = [{ id: "steam", title: "Паровые", param: "steam" }];
export const sellersDocuments = [{ title: "S, X и H" }];
export const sellersSeries: Series[] = [
  line("sellers-s", "Sellers S", "40–900 HP", "пар 15–300 psi", gas),
  line("sellers-x", "Sellers X", "10–900 HP", "пар 15–300 psi", gas),
  line("sellers-h", "Sellers H", "10–300 HP", "чистый пар 15 psi", gas),
];

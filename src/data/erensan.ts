import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страницы ESB, SP и SR на erensan.com.tr.";
const fuels: FuelId[] = ["gas", "diesel", "heavy"];

function steam(id: string, name: string, minT: number, maxT: number, kind: string): Series {
  return {
    id,
    name,
    categoryId: "steam",
    kind,
    image: "/catalog/steam.jpg",
    summary: `${minT}–${maxT} т/ч, 6–16 бар.`,
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: minT * 1000,
    steamMaxKgH: maxT * 1000,
    tempMaxC: null,
    pressureNote: "6–16 бар",
    fuels,
    feature: "Жидкое топливо или газ",
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: [],
  };
}

export const erensanCategories: Category[] = [{ id: "steam", title: "Паровые", param: "steam" }];
export const erensanDocuments = [{ title: "ESB, SP и SR" }];
export const erensanSeries: Series[] = [
  steam("erensan-esb", "Erensan ESB", 1, 30, "Три хода"),
  steam("erensan-sp", "Erensan SP", 0.25, 5.5, "Два хода"),
  steam("erensan-sr", "Erensan SR", 0.25, 5.5, "Мобильная котельная"),
];

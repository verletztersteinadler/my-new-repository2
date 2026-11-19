import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страница GPT на garioninaval.com.";

export const garioniCategories: Category[] = [{ id: "steam", title: "Паровые", param: "steam" }];
export const garioniDocuments = [{ title: "GPT" }];
export const garioniSeries: Series[] = [
  {
    id: "garioni-gpt",
    name: "Garioni Naval GPT",
    categoryId: "steam",
    kind: "Три хода, мокрая поворотная камера",
    image: "/catalog/steam.jpg",
    summary: "3 000–25 000 кг/ч, до 21 бар.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: 3000,
    steamMaxKgH: 25000,
    tempMaxC: null,
    pressureNote: "до 21 бар",
    fuels: ["gas", "diesel", "heavy"] as FuelId[],
    feature: "Жидкое или газообразное топливо",
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: ["gpt"],
  },
];

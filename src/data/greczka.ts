import type { Category, FuelId, Series, Size } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страница паровых greczka.pl.";

export const greczkaCategories: Category[] = [{ id: "steam", title: "Паровые", param: "steam" }];
export const greczkaDocuments = [{ title: "Три паровых Greczka" }];
export const greczkaSeries: Series[] = [
  {
    id: "greczka-s",
    name: "Greczka, паровые",
    categoryId: "steam",
    kind: "Три хода, внутренняя поворотная камера",
    image: "/catalog/steam.jpg",
    summary: "750, 1 000 и 1 500 кг/ч.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: 750,
    steamMaxKgH: 1500,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["gas", "diesel"] as FuelId[],
    feature: "Горелка Riello, масло или газ",
    extra: checked,
    sizes: [750, 1000, 1500].map((kg): Size => ({ id: `greczka-${kg}`, name: `${kg} кг/ч`, powerKw: null, steamKgH: kg })),
    sizesNote: null,
    aliases: [],
  },
];

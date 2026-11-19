import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страница Junior TC на certuss.com. Каскад до 1 600 кг/ч — это несколько котлов, не один типоразмер.";

export const certussCategories: Category[] = [{ id: "steam", title: "Паровые", param: "steam" }];

export const certussDocuments = [{ title: "Junior TC" }];

export const certussSeries: Series[] = [
  {
    id: "certuss-junior",
    name: "CERTUSS Junior TC",
    categoryId: "steam",
    kind: "Водотрубный скоростной парогенератор",
    image: "/catalog/vertical.jpg",
    summary: "80–400 кг/ч. Тепло 52–262 кВт. Давление по таблице 6/8–29 бар.",
    powerMinKw: 52,
    powerMaxKw: 262,
    steamMinKgH: 80,
    steamMaxKgH: 400,
    tempMaxC: null,
    pressureNote: "6/8–29 бар",
    fuels: ["gas", "diesel"] as FuelId[],
    feature: "Газ, СУГ или лёгкое масло",
    extra: `${checked} Три группы: 80–120, 150–200 и 250–400 кг/ч. Британская страница пишет 5,5 бар внизу, таблица завода — 6/8. В карточке оставлена таблица.`,
    sizes: [],
    sizesNote: "Внутри группы отдельные ступени страница не нумерует.",
    aliases: ["junior"],
  },
];

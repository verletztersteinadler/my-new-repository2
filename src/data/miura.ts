import type { Category, FuelId, Series, Size } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страница SU на miuraz.co.jp. Это масляный ряд, не весь каталог Miura.";

const rows = [100, 160, 200, 300, 400];

export const miuraCategories: Category[] = [{ id: "steam", title: "Паровые", param: "steam" }];
export const miuraDocuments = [{ title: "SU" }];
export const miuraSeries: Series[] = [
  {
    id: "miura-su",
    name: "MIURA SU",
    categoryId: "steam",
    kind: "Прямоточный, масло",
    image: "/catalog/vertical.jpg",
    summary: "100 кг/ч и 160–400 кг/ч.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: 100,
    steamMaxKgH: 400,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["diesel", "heavy"] as FuelId[],
    feature: "Масло",
    extra: checked,
    sizes: rows.map((kg): Size => ({ id: `miura-su-${kg}`, name: `SU-${kg}`, powerKw: null, steamKgH: kg })),
    sizesNote: null,
    aliases: ["su"],
  },
];

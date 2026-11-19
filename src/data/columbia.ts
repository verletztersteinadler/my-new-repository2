import type { Category, FuelId, Series, Size } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Лист CT компании Columbia Boiler. MPH в руководстве есть, таблица в извлечении неоднозначна и не перенесена.";

const ct: [string, number][] = [
  ["CT-6", 207],
  ["CT-10", 320],
  ["CT-15", 517],
  ["CT-20", 690],
  ["CT-25", 862],
  ["CT-35", 1207],
  ["CT-50", 1725],
];

export const columbiaCategories: Category[] = [{ id: "steam", title: "Паровые", param: "steam" }];
export const columbiaDocuments = [{ title: "CT" }];

export const columbiaSeries: Series[] = [
  {
    id: "columbia-ct",
    name: "Columbia CT",
    categoryId: "steam",
    kind: "Вертикальный, без труб, три хода",
    image: "/catalog/vertical.jpg",
    summary: "207–1 725 фунтов/ч в таблице. Давление листа 150 psi.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: Math.round(207 * 0.453592),
    steamMaxKgH: Math.round(1725 * 0.453592),
    tempMaxC: null,
    pressureNote: "150 psi, также 15 и 250 psi",
    fuels: ["gas", "diesel"] as FuelId[],
    feature: "6–50 HP на шапке. У CT-10 в таблице 9,5 HP",
    extra: checked,
    sizes: ct.map(([name, lb]): Size => ({ id: `columbia-${name.toLowerCase()}`, name, powerKw: null, steamKgH: Math.round(lb * 0.453592) })),
    sizesNote: "Фунты пара в час переведены в кг/ч.",
    aliases: ["ct"],
  },
];

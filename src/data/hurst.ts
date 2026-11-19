import type { Category, FuelId, Series, Size } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Каталог Series 400 на hurstboiler.com, пар 15 psi. Строки, где фунты/ч не сходятся с лошадиной силой, не перенесены: 200, 300, 400 и 1 200 HP.";

const ok: [number, number][] = [
  [30, 1035], [40, 1380], [50, 1725], [60, 2070], [70, 2415], [80, 2760], [100, 3450],
  [125, 4313], [150, 5175], [250, 8625], [500, 17250], [600, 20700], [700, 24150],
  [750, 25875], [800, 27600], [900, 31050], [1000, 34500], [1500, 51750],
];

export const hurstCategories: Category[] = [{ id: "steam", title: "Паровые", param: "steam" }];
export const hurstDocuments = [{ title: "Series 400, пар 15 psi" }];
export const hurstSeries: Series[] = [
  {
    id: "hurst-400",
    name: "Hurst Series 400",
    categoryId: "steam",
    kind: "Пар 15 psi",
    image: "/catalog/firetube.jpg",
    summary: "Проверенные строки: 30–1 500 HP, кроме четырёх битых.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: Math.round(1035 * 0.453592),
    steamMaxKgH: Math.round(51750 * 0.453592),
    tempMaxC: null,
    pressureNote: "15 psi в этих строках",
    fuels: ["gas", "diesel"] as FuelId[],
    feature: "На странице также вода и другие давления. Они не разобраны",
    extra: checked,
    sizes: ok.map(([hp, lb]): Size => ({ id: `hurst-400-${hp}`, name: `S400 ${hp} HP`, powerKw: null, steamKgH: Math.round(lb * 0.453592) })),
    sizesNote: "Фунты/ч переведены в кг/ч.",
    aliases: ["series 400"],
  },
];

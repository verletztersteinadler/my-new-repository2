import type { Category, FuelId, Series, Size } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страница BOSS на vulkan-rus.ru. Между 22 и 220 кВт список на странице оборван.";

const seen = [11, 16, 22, 220, 270];

export const vulkanCategories: Category[] = [{ id: "water", title: "Водогрейные", param: "power" }];
export const vulkanDocuments = [{ title: "BOSS" }];
export const vulkanSeries: Series[] = [
  {
    id: "vulkan-boss",
    name: "VULKAN BOSS",
    categoryId: "water",
    kind: "Автоматический",
    image: "/catalog/solid.jpg",
    summary: "11–330 кВт. Давление на карточках: 2,5 без единицы.",
    powerMinKw: 11,
    powerMaxKw: 330,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: "2,5, единица не подписана",
    fuels: ["solid"] as FuelId[],
    feature: "Пеллеты, уголь, эко-горошек. Резерв: уголь, дрова, брикеты",
    extra: checked,
    sizes: seen.map((powerKw): Size => ({ id: `vulkan-${powerKw}`, name: `BOSS ${powerKw}`, powerKw, steamKgH: null })),
    sizesNote: "330 кВт назван как верх ряда, отдельной карточки в извлечении нет.",
    aliases: ["boss"],
  },
];

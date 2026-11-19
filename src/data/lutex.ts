import type { Category, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Главная lutex.group. Топливо у линеек на этой странице не названо.";

function line(id: string, name: string, min: number | null, max: number, feature: string, image: string): Series {
  return {
    id,
    name,
    categoryId: "water",
    kind: feature,
    image,
    summary: min ? `${min.toLocaleString("ru-RU")}–${max.toLocaleString("ru-RU")} кВт.` : `${max.toLocaleString("ru-RU")} кВт.`,
    powerMinKw: min,
    powerMaxKw: max,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: [],
    feature,
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: [],
  };
}

export const lutexCategories: Category[] = [{ id: "water", title: "Водогрейные", param: "power" }];
export const lutexDocuments = [{ title: "Линейки LUTEX" }];
export const lutexSeries: Series[] = [
  line("lutex-ars", "LUTEX ARS", 40, 600, "40–600 кВт", "/catalog/firetube.jpg"),
  line("lutex-arh", "LUTEX ARH", 20, 1200, "Наружный блок-модуль", "/catalog/skid.jpg"),
  line("lutex-arm", "LUTEX ARM", 5000, 60000, "До 150 °C и 2,5 МПа", "/catalog/waterpipe.jpg"),
  line("lutex-ard", "LUTEX ARD", 100, 10000, "Водотрубный, внутреннее размещение", "/catalog/waterpipe.jpg"),
  line("lutex-arh4", "LUTEX ARH 4000", null, 4000, "Уличный блок на базе ARD", "/catalog/skid.jpg"),
];

import type { Category, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Руководство Chromalox по паровым котлам и страница CHSI. Пар в фунтах/ч есть не у каждой модели.";

function line(id: string, name: string, min: number, max: number, pressure: string, feature: string): Series {
  return {
    id,
    name,
    categoryId: "steam",
    kind: "Электрический",
    image: "/catalog/cabinet.jpg",
    summary: `${min.toLocaleString("ru-RU")}–${max.toLocaleString("ru-RU")} кВт. ${pressure}.`,
    powerMinKw: min,
    powerMaxKw: max,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: pressure,
    fuels: [],
    feature,
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: [],
  };
}

export const chromaloxCategories: Category[] = [{ id: "steam", title: "Паровые", param: "steam" }];

export const chromaloxDocuments = [{ title: "CES, CHS и CHSI" }];

export const chromaloxSeries: Series[] = [
  line("chrom-cmb", "Chromalox CMB", 3, 15, "0–90 psi", "Компактный"),
  line("chrom-cas", "Chromalox CAS", 16, 20, "0–90 psi", "Специальный"),
  line("chrom-ces", "Chromalox CES-B", 6, 180, "0–90 psi", "Вертикальный"),
  line("chrom-cssb", "Chromalox CSSB-A", 6, 180, "0–90 psi", "Нержавеющая сталь"),
  line("chrom-chpes", "Chromalox CHPES-A", 6, 180, "0–235 psi", "Среднее давление"),
  line("chrom-chs", "Chromalox CHS", 150, 1620, "0–135 psi", "Горизонтальный, большая мощность"),
  {
    ...line("chrom-chsi", "Chromalox CHSI", 210, 1300, null as unknown as string, "735–4 550 фунтов/ч"),
    pressureNote: null,
    steamMinKgH: Math.round(735 * 0.453592),
    steamMaxKgH: Math.round(4550 * 0.453592),
    summary: "210–1 300 кВт, 735–4 550 фунтов/ч.",
  },
];

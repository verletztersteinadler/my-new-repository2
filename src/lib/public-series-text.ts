import type { Series, CategoryId } from "@/data/catalog";

const categoryKinds: Partial<Record<CategoryId, string>> = {
  hw115: "Водогрейный котёл",
  hw170: "Высокотемпературный водогрейный котёл",
  water: "Водогрейное оборудование",
  steam: "Паровое оборудование",
  oil: "Термомасляное оборудование",
  block: "Котельный блок",
  air: "Воздухонагреватель",
  auto: "Промышленное оборудование",
};

const editorial = /цифры ряда не сняты|в открытых? (?:источник|списк|страниц)|на открытой странице|сайт не открылся|не переносил|не перенесен|в выбор|карточка не открывалась|сверк(?:а|и|е)|не проверен|проверить актуальные|из исходного реестра|редакционной проверки|чернов/i;

export function publicSeriesKind(series: Pick<Series, "kind" | "categoryId">): string {
  const kind = series.kind.trim();
  return kind && !editorial.test(kind) ? kind : (categoryKinds[series.categoryId] ?? "Оборудование");
}

export function publicSeriesFeature(series: Pick<Series, "feature">): string {
  const text = series.feature.trim();
  return text && !editorial.test(text) ? text : "Характеристики уточняются";
}

export function publicSeriesSummary(series: Pick<Series, "summary">): string {
  const text = series.summary.trim();
  return text && !editorial.test(text)
    ? text
    : "Подробные характеристики и доступные исполнения уточняются при подборе оборудования.";
}

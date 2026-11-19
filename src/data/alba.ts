import type { Category, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Alba Steam Generator. Топливо на главной не названо, кроме электрической линии.";

function steam(id: string, name: string, kind: string, min: number | null, max: number | null, feature: string, image: string, summary: string): Series {
  return {
    id,
    name,
    categoryId: "steam",
    kind,
    image,
    summary,
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: min,
    steamMaxKgH: max,
    tempMaxC: null,
    pressureNote: null,
    fuels: [],
    feature,
    extra: checked,
    sizes: [],
    sizesNote: "Список моделей на открытой карточке не приведён.",
    aliases: [],
  };
}

export const albaCategories: Category[] = [{ id: "steam", title: "Паровые", param: "steam" }];

export const albaDocuments = [{ title: "Разделы продукции Alba" }];

export const albaSeries: Series[] = [
  steam("alba-h", "Alba, горизонтальные", "Горизонтальный парогенератор", 350, 6000, "350–6 000 кг/ч", "/catalog/steam.jpg", "350–6 000 кг/ч."),
  steam("alba-v", "Alba, вертикальные", "Вертикальный парогенератор", 150, 2000, "150–2 000 кг/ч", "/catalog/vertical.jpg", "150–2 000 кг/ч."),
  steam("alba-e", "Alba, электрические", "Электрический паровой котёл", null, null, "Электрический", "/catalog/cabinet.jpg", "Линия названа. Паропроизводительность на карточке не указана."),
  steam("alba-pack", "Alba, моноблок", "Парогенератор «всё в одном»", null, null, "Пакет", "/catalog/skid.jpg", "Линия названа. Цифры на карточке не указаны."),
  steam("alba-cascade", "Alba, каскад", "Каскад парогенераторов", null, null, "Каскад", "/catalog/skid.jpg", "Линия названа. Цифры на карточке не указаны."),
  steam("alba-box", "Alba, контейнер", "Контейнерный парогенератор", null, null, "Контейнер", "/catalog/skid.jpg", "Линия названа. Цифры на карточке не указаны."),
];

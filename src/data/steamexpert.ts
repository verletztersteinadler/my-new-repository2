import type { Category, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Сертификат на kvzr.ru. Это область сертификата, не таблица моделей.";

export const steamexpertCategories: Category[] = [{ id: "steam", title: "Паровые", param: "steam" }];
export const steamexpertDocuments = [{ title: "Сертификат STEAMEXPERT" }];
export const steamexpertSeries: Series[] = [
  {
    id: "steamexpert",
    name: "STEAMEXPERT",
    categoryId: "steam",
    kind: "По сертификату",
    image: "/catalog/steam.jpg",
    summary: "0,03–6,5 т/ч. Давление до 2,6 МПа.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: 30,
    steamMaxKgH: 6500,
    tempMaxC: null,
    pressureNote: "до 2,6 МПа",
    fuels: [],
    feature: "3-я и 4-я категории ТР ТС 032",
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: [],
  },
];

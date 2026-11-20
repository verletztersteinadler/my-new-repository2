import type { Category, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страница утилизаторов fbmhudson.com. Мощностей у имён нет. Поставки по годам — не ряд.";

function line(id: string, name: string, feature: string): Series {
  return {
    id,
    name,
    categoryId: "steam",
    kind: "Утилизатор технологического газа",
    image: "/catalog/skid.jpg",
    summary: "Тип назван. Производительность не указана.",
    powerMinKw: null,
    powerMaxKw: null,
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

export const fbmCategories: Category[] = [{ id: "steam", title: "Паровые", param: "steam" }];
export const fbmDocuments = [{ title: "Типы FBM Hudson" }];
export const fbmSeries: Series[] = [
  line("fbm-rg", "FBM, риформинг-газ", "Жаротрубный горизонтальный или вертикальный, водотрубный для вторичного риформинга аммиака"),
  line("fbm-sty", "FBM, стирол", "Поезд утилизаторов"),
  line("fbm-syn", "FBM, synloop", "Жаровая труба, свой или отдельный барабан"),
];

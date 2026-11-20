import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страница водогрейных getabecboiler.com. Объект 2 500 кВт во Вьетнаме в ряд не внесён.";

function line(id: string, name: string, maxMw: number, feature: string): Series {
  return {
    id,
    name,
    categoryId: "water",
    kind: "Жаротрубный",
    image: maxMw > 20 ? "/catalog/twin.jpg" : "/catalog/firetube.jpg",
    summary: `До ${maxMw.toLocaleString("ru-RU")} МВт. Нижняя граница не названа.`,
    powerMinKw: null,
    powerMaxKw: maxMw * 1000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["gas", "diesel"] as FuelId[],
    feature,
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: [],
  };
}

export const getabecCategories: Category[] = [{ id: "water", title: "Водогрейные", param: "power" }];
export const getabecDocuments = [{ title: "HWO и HWO-D" }];
export const getabecSeries: Series[] = [
  line("getabec-hwo", "GETABEC HWO", 15.6, "Одна жаровая труба"),
  line("getabec-hwod", "GETABEC HWO-D", 32, "Две жаровые трубы"),
];

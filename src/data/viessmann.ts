import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Карточки Vitomax на viessmann.co.uk. Это прочитанные ряды, не весь Viessmann.";

const fuels: FuelId[] = ["gas", "diesel", "heavy"];

function water(id: string, name: string, min: number, max: number, feature: string): Series {
  return {
    id,
    name,
    categoryId: "water",
    kind: "Водогрейный",
    image: "/catalog/firetube.jpg",
    summary: `${min.toLocaleString("ru-RU")}–${max.toLocaleString("ru-RU")} кВт.`,
    powerMinKw: min,
    powerMaxKw: max,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels,
    feature,
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: [],
  };
}

export const viessmannCategories: Category[] = [
  { id: "water", title: "Водогрейные", param: "power" },
  { id: "steam", title: "Паровые", param: "steam" },
];
export const viessmannDocuments = [{ title: "Vitomax" }];
export const viessmannSeries: Series[] = [
  { ...water("v-lw", "Viessmann Vitomax LW", 650, 22000, "Низкое давление. Водород до 100% назван отдельно"),
    tempMaxC: 110, pressureNote: "6 / 10 / 16 бар — варианты рабочего давления, не общий предел каждого исполнения",
    sourceUrl: "https://www.viessmann.co.uk/en/products/large-boiler/vitomax-lw.html",
    sourceChecked: "2026-11-23", sourceRevision: "Vitomax LW, официальный каталог" },
  { ...water("v-hw", "Viessmann Vitomax HW", 350, 20000, "Подача выше 110 °C; рабочую температуру уточнять по конкретной конфигурации"),
    tempSafetyMaxC: 210, pressureNote: "Давление зависит от исполнения; конкретное значение не подтверждено",
    sourceUrl: "https://www.viessmann.co.uk/en/products/large-boiler/vitomax-hw.html",
    sourceChecked: "2026-11-23", sourceRevision: "Vitomax HW: 210 °C — защитный предел, НЕ температура подачи" },
  { ...water("v-m60", "Viessmann Vitomax LW M60A", 700, 1950, "Масло или газ"),
    sourceUrl: "https://www.viessmann.co.uk/en/products/large-boiler/vitomax-lw-m60a.html",
    sourceChecked: "2026-11-23", sourceRevision: "Vitomax LW M60A — 700–1950 кВт" },
  {
    id: "v-hs",
    name: "Viessmann Vitomax HS",
    categoryId: "steam",
    kind: "Высокое давление",
    image: "/catalog/steam.jpg",
    summary: "0,5–31,5 т/ч.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: 500,
    steamMaxKgH: 31500,
    tempMaxC: null,
    pressureNote: null,
    fuels,
    feature: "0,5–31,5 т/ч",
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: ["vitomax"],
  },
];

import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Аудит 23.11.2026, официальная брошюра TRYSUHR 2026, таблица на стр. 3. Бренд Unical отделён от Wiesberg.";
const models: [string, number][] = [
  ["1200",1200],["1400",1395],["1800",1750],["2300",2300],["2900",2900],
  ["3500",3500],["4000",4000],["4650",4650],["5800",5800],["7000",7000],
  ["8300",8300],["10000",10000],["12000",12000],["15000",15000],["18000",18000],
];

export const unicalCategories: Category[] = [{ id: "water", title: "Водогрейные", param: "power" }];
export const unicalDocuments = [{ title: "TRYSUHR" }];
export const unicalSeries: Series[] = [
  {
    id: "unical-try",
    name: "Unical TRYSUHR",
    categoryId: "water",
    kind: "Перегретая вода, три хода",
    image: "/catalog/firetube.jpg",
    summary: "15 номинальных обозначений; обозначение 1400 = 1 395 кВт, 1800 = 1 750 кВт. Исполнения STD/HP и 6/10 бар требуют отдельного уточнения.",
    powerMinKw: 1200,
    powerMaxKw: 18000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: "Исполнения 6 и 10 бар; рабочее давление проверяется по конкретному исполнению",
    fuels: ["gas", "diesel"] as FuelId[],
    feature: "Жидкое или газообразное топливо",
    extra: checked,
    sizes: models.map(([label, powerKw]) => ({
      id: `unical-trysuhr-${label}`,
      name: `TRYSUHR ${label}`,
      powerKw,
      steamKgH: null,
      sourceUrl: "https://www.unicalag.it/upload/blocchi/X386allegatoDEPLIANT1-2X_trysuhr_2026_en.pdf",
    })),
    sizesNote: "15 обозначений по каталогу 2026, стр. 3. STD/HP и 6/10 бар пока не сведены в однозначные исполнения; не использовать этот список как подтверждение давления.",
    sourceUrl: "https://www.unicalag.it/upload/blocchi/X386allegatoDEPLIANT1-2X_trysuhr_2026_en.pdf",
    sourceRevision: "Брошюра TRYSUHR, 2026, стр. 3",
    sourceChecked: "2026-11-23",
    aliases: ["trysuhr", "unical"],
  },
];

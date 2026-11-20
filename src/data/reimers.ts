import type { Category, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страница электрического пара reimersinc.com. У RE фунты и килограммы на странице не сходятся, взяты килограммы.";

function line(id: string, name: string, minKw: number, maxKw: number, minKg: number, maxKg: number, pressure: string): Series {
  return {
    id,
    name,
    categoryId: "steam",
    kind: "Электрический",
    image: "/catalog/cabinet.jpg",
    summary: `${minKw}–${maxKw} кВт. ${minKg}–${maxKg} кг/ч.`,
    powerMinKw: minKw,
    powerMaxKw: maxKw,
    steamMinKgH: minKg,
    steamMaxKgH: maxKg,
    tempMaxC: null,
    pressureNote: pressure,
    fuels: [],
    feature: pressure,
    extra: checked,
    sizes: [],
    sizesNote: null,
    aliases: [],
  };
}

export const reimersCategories: Category[] = [{ id: "steam", title: "Паровые", param: "steam" }];
export const reimersDocuments = [{ title: "Электрический пар Reimers" }];
export const reimersSeries: Series[] = [
  line("reimers-re", "Reimers RE", 10, 30, 15.4, 32.2, "0–85 psi"),
  line("reimers-r", "Reimers R", 36, 120, 55.7, 185, "0–85 psi"),
  line("reimers-rv", "Reimers RV", 60, 210, 93, 325, "0–85 psi"),
  line("reimers-rhp", "Reimers RHP 120–300", 120, 300, 186, 464, "0–135 psi"),
  line("reimers-rhp2", "Reimers RHP 540–750", 540, 750, 836, 1160, "0–135 psi"),
];

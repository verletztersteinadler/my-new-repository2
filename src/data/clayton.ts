import type { Category, FuelId, Series, Size } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Страница E-Series claytonindustries.com. Таблица доведена до E1204. Более крупные модели страница обещает по запросу и в ряд не ставит.";

const models: [string, number][] = [
  ["E154", 5175],
  ["E204", 6900],
  ["E254", 8625],
  ["E304", 10350],
  ["E354", 12075],
  ["E404", 13800],
  ["E504", 17250],
  ["E604", 20700],
  ["E704", 24150],
  ["E804", 27600],
  ["E1004", 34500],
  ["E1104", 37950],
  ["E1204", 41400],
];

function size(name: string, lbH: number): Size {
  return { id: `clayton-${name.toLowerCase()}`, name, powerKw: null, steamKgH: Math.round(lbH * 0.453592) };
}

export const claytonCategories: Category[] = [{ id: "steam", title: "Паровые", param: "steam" }];

export const claytonDocuments = [{ title: "E-Series и SigmaFire" }];

export const claytonSeries: Series[] = [
  {
    id: "clayton-e",
    name: "Clayton E-Series",
    categoryId: "steam",
    kind: "Прямоточный парогенератор",
    image: "/catalog/vertical.jpg",
    summary: "Опубликованный ряд E154–E1204: 5 175–41 400 фунтов/ч.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: Math.round(5175 * 0.453592),
    steamMaxKgH: Math.round(41400 * 0.453592),
    tempMaxC: null,
    pressureNote: null,
    fuels: ["gas", "diesel"] as FuelId[],
    feature: "В тексте давление до 3 000 psi, это не давление каждой модели",
    extra: checked,
    sizes: models.map(([name, lb]) => size(name, lb)),
    sizesNote: "Фунты/ч переведены в кг/ч.",
    aliases: ["e-series"],
  },
  {
    id: "clayton-sigma",
    name: "Clayton SigmaFire",
    categoryId: "steam",
    kind: "Прямоточный парогенератор",
    image: "/catalog/vertical.jpg",
    summary: "На карточке 25–200 BHP. Пар в кг/ч страница не даёт.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["gas", "diesel"] as FuelId[],
    feature: "25–200 BHP",
    extra: `${checked} Рядом на той же странице блоки «15–45 BHP» и «50–200 BHP». Из-за расхождения пар и киловатты не поставлены. Утилизаторы названы без цифр.`,
    sizes: [],
    sizesNote: null,
    aliases: ["sigmafire"],
  },
];

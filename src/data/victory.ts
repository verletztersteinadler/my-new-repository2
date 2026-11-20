import type { Category, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Список изделий victoryenergy.com. Плюс у «500 000+» верх не закрывает. Фунты и MMBTU в другие единицы не переведены. Экономайзер и аренда не внесены.";

function line(id: string, name: string, feature: string, image: string, cat: "steam" | "water" | "auto"): Series {
  return {
    id,
    name,
    categoryId: cat,
    kind: feature,
    image,
    summary: feature,
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

export const victoryCategories: Category[] = [
  { id: "steam", title: "Паровые", param: "steam" },
  { id: "water", title: "Водогрейные", param: "power" },
  { id: "auto", title: "Горелки", param: "none" },
];
export const victoryDocuments = [{ title: "Изделия Victory" }];
export const victorySeries: Series[] = [
  line("vic-o", "Victory, водотрубный тип O", "до 500 000+ фунтов пара в час", "/catalog/waterpipe.jpg", "steam"),
  line("vic-d", "Victory, водотрубный тип D", "до 500 000+ фунтов пара в час", "/catalog/waterpipe.jpg", "steam"),
  line("vic-ft", "Victory, жаротрубный", "до 2 500 HP", "/catalog/firetube.jpg", "steam"),
  line("vic-b", "Victory, горелки", "30 до более 500 MMBTU/ч", "/catalog/cabinet.jpg", "auto"),
  line("vic-hw", "Victory, высокотемпературная вода", "5–200 MMBTU/ч", "/catalog/waterpipe.jpg", "water"),
];

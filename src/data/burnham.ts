import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Карточка MPC и краткий перечень Burnham. Цифры — подвод тепла, не полезная мощность, поэтому в киловатты карточки не переведены.";

function line(id: string, name: string, summary: string, feature: string, waterOnly: boolean, extra: string, fuels: FuelId[] = ["gas", "diesel"]): Series {
  return {
    id,
    name,
    categoryId: waterOnly ? "water" : "steam",
    kind: waterOnly ? "Чугунный, только вода" : "Чугунный, вода или пар",
    image: "/catalog/firetube.jpg",
    summary,
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels,
    feature,
    extra: `${checked} ${extra}`,
    sizes: [],
    sizesNote: "Подвод в MBH. Выход в эту карточку не ставился.",
    aliases: [],
  };
}

export const burnhamCategories: Category[] = [
  { id: "water", title: "Водогрейные", param: "power" },
  { id: "steam", title: "Паровые", param: "steam" },
];

export const burnhamDocuments = [{ title: "MPC, V11, V9A и 8HE" }];

export const burnhamSeries: Series[] = [
  line("burnham-mpc", "Burnham MPC", "Подвод 500–3 657 MBH. Только вода.", "В блоке преимуществ написано 500–3 600 MBH и до 89 %. В таблице 84–87 %.", true, "В карточке оставлен подвод из таблицы."),
  line("burnham-v11", "Burnham V11", "Подвод 837–5 733 MBH. Вода или пар. 30, 50 или 80 psi.", "Брошюра пишет 5 733 MBH, перечень — 5 773 MBH.", false, "В карточке оставлена брошюра."),
  line("burnham-v9", "Burnham V9A", "Подвод 447–2 367 MBH. Вода или пар.", "Газ, жидкое топливо или оба.", false, ""),
  line("burnham-8he", "Burnham 8HE", "Подвод 239–505 MBH. Только вода.", "Природный или сжиженный газ. Атмосферная горелка.", true, "", ["gas"]),
];

import type { Category, FuelId, Series } from "@/data/catalog";

const checked = "Сверка 16.11.2026. Буклет BBS. Общий пар завода 0,1–35 т/ч к отдельной серии не приписан.";

function line(id: string, name: string, kind: string, pressure: string | null, feature: string, image: string): Series {
  return {
    id,
    name,
    categoryId: "steam",
    kind,
    image,
    summary: pressure ? `Давление ${pressure}. Пар серии не указан.` : "Серия названа. Пар и давление не указаны.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: pressure,
    fuels: (id === "bbs-edk" ? [] : ["gas", "diesel", "solid"]) as FuelId[],
    feature,
    extra: checked,
    sizes: [],
    sizesNote: "Типоразмеров в буклете нет.",
    aliases: [],
  };
}

export const bbsCategories: Category[] = [{ id: "steam", title: "Паровые", param: "steam" }];

export const bbsDocuments = [{ title: "Буклет паровых BBS" }];

export const bbsSeries: Series[] = [
  line("bbs-hdk", "BBS HDK / HDK-M", "Три хода, насыщенный или перегретый пар", "до 25 бар", "HDK-M — морское исполнение", "/catalog/firetube.jpg"),
  line("bbs-ahk", "BBS AHK-HD", "Утилизатор высокого давления", "до 50 бар", "Дымовые газы", "/catalog/skid.jpg"),
  line("bbs-wr", "BBS HDK-WR", "Водотрубный, три хода", "до 50 бар", "Насыщенный или перегретый пар", "/catalog/waterpipe.jpg"),
  line("bbs-hpb", "BBS HPB", "Три хода, естественная циркуляция", null, "Давление в извлечении строки оборвано и не поставлено", "/catalog/steam.jpg"),
  line("bbs-cbs", "BBS CBS", "Композитный, насыщенный пар", "до 25 бар", "Утилизация и топка на газе или масле", "/catalog/steam.jpg"),
  line("bbs-edk", "BBS EDK", "Электрический, насыщенный пар", null, "Электрический", "/catalog/cabinet.jpg"),
];

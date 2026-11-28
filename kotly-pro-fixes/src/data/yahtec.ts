import type { Category, FuelId, Series } from "@/data/catalog";

const checked =
  "Сверка 28.11.2026, yt-gaz.ru (Санкт-Петербург). Бренд Yahtec: газовые воздухонагреватели серий ATH (горизонтальные), ATC, ATV (вертикальные), ATCN и конденсационные CAU. Газовые воздушные завесы YAC-SP, WG и YAC-A вне карточки. Производственная площадка бренда на сайте не раскрыта. Источник: yt-gaz.ru/ATH/.";

export const yahtecCategories: Category[] = [{ id: "air", title: "Воздухонагреватели", param: "power" }];

export const yahtecDocuments = [{ title: "Yahtec / yt-gaz.ru" }];

function size(id: string, name: string) {
  return { id, name, powerKw: null, steamKgH: null };
}

function series(
  id: string,
  name: string,
  kind: string,
  feature: string,
  extraNote: string,
  sizes: { id: string; name: string; powerKw: null; steamKgH: null }[],
): Series {
  return {
    id,
    name,
    categoryId: "air",
    kind,
    image: "/catalog/web-air.jpg",
    summary: `${sizes.length} моделей; таблица мощностей на витрине не опубликована.`,
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: null,
    pressureNote: null,
    fuels: ["gas"] as FuelId[],
    feature,
    extra: checked + " " + extraNote,
    sizes,
    sizesNote: "Мощности на страницах моделей не опубликованы; киловатты не присвоены, чтобы не подменять каталог.",
    aliases: [],
  };
}

export const yahtecSeries: Series[] = [
  series(
    "yahtec-ath-h",
    "ATH горизонтальные AT16H–AT95H",
    "Газовый, настенный горизонтальный",
    "8 моделей AT16H–AT95H",
    "Настенные горизонтальные воздухонагреватели.",
    [
      size("yahtec-at16h", "AT16H"),
      size("yahtec-at20h", "AT20H"),
      size("yahtec-at28h", "AT28H"),
      size("yahtec-at35h", "AT35H"),
      size("yahtec-at45h", "AT45H"),
      size("yahtec-at55h", "AT55H"),
      size("yahtec-at75h", "AT75H"),
      size("yahtec-at95h", "AT95H"),
    ],
  ),
  series(
    "yahtec-ath-c",
    "ATC AT20C–AT95C",
    "Газовый",
    "7 моделей AT20C–AT95C",
    "Воздухонагреватели серии ATC.",
    [
      size("yahtec-at20c", "AT20C"),
      size("yahtec-at28c", "AT28C"),
      size("yahtec-at35c", "AT35C"),
      size("yahtec-at45c", "AT45C"),
      size("yahtec-at55c", "AT55C"),
      size("yahtec-at75c", "AT75C"),
      size("yahtec-at95c", "AT95C"),
    ],
  ),
  series(
    "yahtec-ath-v",
    "ATV вертикальные AT28V–AT95V",
    "Газовый, вертикальный",
    "6 моделей AT28V–AT95V",
    "Вертикальные воздухонагреватели серии ATV.",
    [
      size("yahtec-at28v", "AT28V"),
      size("yahtec-at35v", "AT35V"),
      size("yahtec-at45v", "AT45V"),
      size("yahtec-at55v", "AT55V"),
      size("yahtec-at75v", "AT75V"),
      size("yahtec-at95v", "AT95V"),
    ],
  ),
  series(
    "yahtec-ath-cn",
    "ATCN AT20CN–AT95CN",
    "Газовый",
    "7 моделей AT20CN–AT95CN",
    "Воздухонагреватели серии ATCN.",
    [
      size("yahtec-at20cn", "AT20CN"),
      size("yahtec-at28cn", "AT28CN"),
      size("yahtec-at35cn", "AT35CN"),
      size("yahtec-at45cn", "AT45CN"),
      size("yahtec-at55cn", "AT55CN"),
      size("yahtec-at75cn", "AT75CN"),
      size("yahtec-at95cn", "AT95CN"),
    ],
  ),
  series(
    "yahtec-cau",
    "CAU конденсационные CAU30–CAU70",
    "Газовый, конденсационный",
    "8 моделей CAU30H–CAU70C",
    "Конденсационные воздухонагреватели; исполнения H и C.",
    [
      size("yahtec-cau30h", "CAU30H"),
      size("yahtec-cau40h", "CAU40H"),
      size("yahtec-cau50h", "CAU50H"),
      size("yahtec-cau70h", "CAU70H"),
      size("yahtec-cau30c", "CAU30C"),
      size("yahtec-cau40c", "CAU40C"),
      size("yahtec-cau50c", "CAU50C"),
      size("yahtec-cau70c", "CAU70C"),
    ],
  ),
];

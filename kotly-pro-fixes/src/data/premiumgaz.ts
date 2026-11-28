import type { Category, Series } from "@/data/catalog";

const checked =
  "Источник: каталог завода kotelpremium.ru («Премиум Газ», Энгельс; сверка 28.11.2026, сайт открыт). Типоряды взяты из каталога и карточек моделей.";

export const premiumGazCategories: Category[] = [
  { id: "water", title: "Водогрейные", param: "power" },
  { id: "hw170", title: "Перегретая вода", param: "power" },
  { id: "steam", title: "Паровые", param: "steam" },
];

export const premiumGazDocuments = [
  { title: "Каталог водогрейных котлов (PDF)" },
  { title: "Каталог паровых котлов (PDF)" },
  { title: "Руководства по монтажу и эксплуатации, паспорта на карточках моделей" },
];

const steam = (id: string, name: string, kg: number) => ({ id, name, powerKw: null, steamKgH: kg });
const power = (id: string, name: string, kw: number) => ({ id, name, powerKw: kw, steamKgH: null });

const sRow = [500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 5000];
const cRow = [250, 500, 750, 1000, 1250, 1500, 1750, 2000, 2500, 3000, 3500, 4000, 5000, 6000];
const eRow = [2500, 3500, 4000, 5000, 6000, 7000];

export const premiumGazSeries: Series[] = [
  {
    id: "premium-s",
    name: "PREMIUM S",
    categoryId: "steam",
    kind: "Паровой котёл, стальной газотрубный двухходовый",
    image: "/catalog/steam.jpg",
    summary:
      "Паровые котлы PREMIUM S 500–5000 кг/ч; каждый типоразмер в исполнении 8 бар (пар 175 °С) или 12 бар (пар 192 °С), КПД не менее 92 %.",
    powerMinKw: null,
    powerMaxKw: null,
    steamMinKgH: 500,
    steamMaxKgH: 5000,
    tempMaxC: 192,
    pressureNote: "8 бар (0,8 МПа, 175 °С) или 12 бар (1,2 МПа, 192 °С); в опросном листе есть вариант 16 бар",
    fuels: ["gas"],
    feature: "Двухходовый, автоматика и безопасность (3 типа), предохранительные клапаны и датчики уровня в комплекте",
    extra: `${checked} По карточке S-1000 12 бар: КПД не менее 92 %, расход газа 83 м³/ч (8000 ккал/м³), температура уходящих газов до 200 °С, топка Ø700×1830 мм. Комплекты поставки: Базовая/Стандарт/Комфорт/Комфорт+.`,
    sizes: sRow.map((kg) => steam(`premium-s-${kg}`, `S-${kg}`, kg)),
    sizesNote:
      "9 типоразмеров: S-500/1000/1500/2000/2500/3000/3500/4000/5000 кг/ч, каждый в исполнениях 8 и 12 бар (18 позиций каталога).",
    aliases: ["премиум s", "премиум газ паровой"],
  },
  {
    id: "premium-c",
    name: "PREMIUM C",
    categoryId: "water",
    kind: "Водогрейный котёл, стальной газотрубный двухходовый",
    image: "/catalog/firetube.jpg",
    summary:
      "Водогрейные котлы PREMIUM C 250–6000 кВт на воду до 115 °С при рабочем давлении 0,6 МПа, КПД не менее 93 %.",
    powerMinKw: 250,
    powerMaxKw: 6000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: 115,
    pressureNote: "0,6 МПа (6 кгс/см²)",
    fuels: ["gas"],
    feature: "Двухходовый, теплоизоляционное одеяло, расход газа 110–116 м³/ч у C-1000",
    extra: `${checked} По карточке C-1000: КПД не менее 93 %, температура воды на выходе 115 °С, расход газа 116,9 м³/ч (8000 ккал/м³), температура уходящих газов 120/220 °С. Для C-3000 доступно исполнение «01 для контейнера» (контейнерная котельная).`,
    sizes: cRow.map((kw) => power(`premium-c-${kw}`, `C-${kw}`, kw)),
    sizesNote:
      "14 типоразмеров: C-250/500/750/1000/1250/1500/1750/2000/2500/3000/3500/4000/5000/6000 кВт; для C-3000 есть контейнерное исполнение (отдельной позицией не дублируется).",
    aliases: ["премиум c", "премиум газ водогрейный"],
  },
  {
    id: "premium-e",
    name: "PREMIUM E",
    categoryId: "water",
    kind: "Водогрейный котёл (горячая вода 115 °С)",
    image: "/catalog/firetube.jpg",
    summary:
      "Водогрейные котлы PREMIUM E 2500–7000 кВт большой мощности на воду до 115 °С при давлении 0,6 МПа.",
    powerMinKw: 2500,
    powerMaxKw: 7000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: 115,
    pressureNote: "0,6 МПа (6 кгс/см²)",
    fuels: ["gas"],
    feature: "Большая мощность в компактной линейке, те же решения по автоматике, что у серии C",
    extra: `${checked} По каталогу: шесть типоразмеров 2500–7000 кВт; каждая мощность выпускается также в исполнении на перегретой воде (см. отдельную серию PREMIUM E на перегретой воде).`,
    sizes: eRow.map((kw) => power(`premium-e-${kw}`, `E-${kw}`, kw)),
    sizesNote: "6 типоразмеров: E-2500/3500/4000/5000/6000/7000 кВт (вода 115 °С).",
    aliases: ["премиум e", "премиум газ e"],
  },
  {
    id: "premium-e-hot",
    name: "PREMIUM E на перегретой воде",
    categoryId: "hw170",
    kind: "Водогрейный котёл на перегретой воде",
    image: "/catalog/firetube.jpg",
    summary:
      "Котлы PREMIUM E на перегретой воде 2500–7000 кВт с температурой воды 150 °С при давлении 1 МПа.",
    powerMinKw: 2500,
    powerMaxKw: 7000,
    steamMinKgH: null,
    steamMaxKgH: null,
    tempMaxC: 150,
    pressureNote: "1 МПа (10 кгс/см²)",
    fuels: ["gas"],
    feature: "Перегретая вода до 150 °С для технологических процессов и теплосетей",
    extra: `${checked} По каталогу: те же типоразмеры, что и у PREMIUM E на горячей воде, но с параметрами 1 МПа / 150 °С; выделены в отдельный подраздел каталога «Котлы на перегретой воде PREMIUM E».`,
    sizes: eRow.map((kw) => power(`premium-e-hot-${kw}`, `E-${kw} на перегретой воде`, kw)),
    sizesNote: "6 типоразмеров: E-2500/3500/4000/5000/6000/7000 кВт (перегретая вода 150 °С, 1 МПа).",
    aliases: ["премиум e перегретая вода", "премиум газ перегретая вода"],
  },
];

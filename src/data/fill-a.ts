import type { Category, CategoryId, FuelId, Series } from "@/data/catalog";

export type Fill = {
  slug: string;
  title: string;
  name: string;
  place: string;
  note: string;
  categories: Category[];
  documents: { title: string }[];
  series: Series[];
};

const MARK = "Сверка 18.11.2026.";
const NO_NUM = "Цифры на сайте не приведены";

type Cat = "water" | "steam" | "oil" | "air" | "auto";
type Img =
  | "/catalog/firetube.jpg"
  | "/catalog/steam.jpg"
  | "/catalog/solid.jpg"
  | "/catalog/cabinet.jpg"
  | "/catalog/web-air.jpg";

const catTitle: Record<Cat, string> = {
  water: "Водогрейные",
  steam: "Паровые",
  oil: "Термомасляные",
  air: "Воздух",
  auto: "Горелки",
};

function paramOf(id: Cat): "power" | "steam" | "none" {
  if (id === "auto") return "none";
  if (id === "steam") return "steam";
  return "power";
}

function categoriesOf(ids: Cat[]): Category[] {
  const order: Cat[] = ["water", "steam", "oil", "air", "auto"];
  return order
    .filter((id) => ids.includes(id))
    .map((id) => ({ id: id as CategoryId, title: catTitle[id], param: paramOf(id) }));
}

function row(p: {
  slug: string;
  id: string;
  name: string;
  categoryId: Cat;
  kind: string;
  image: Img;
  summary: string;
  feature: string;
  page: string;
  fuels?: FuelId[];
  powerMinKw?: number | null;
  powerMaxKw?: number | null;
  steamMinKgH?: number | null;
  steamMaxKgH?: number | null;
  tempMaxC?: number | null;
  pressureNote?: string | null;
  powerNote?: string | null;
  sizesNote?: string | null;
  aliases?: string[];
}): Series {
  return {
    id: `${p.slug}-${p.id}`,
    name: p.name,
    categoryId: p.categoryId,
    kind: p.kind,
    image: p.image,
    summary: p.summary,
    powerMinKw: p.powerMinKw ?? null,
    powerMaxKw: p.powerMaxKw ?? null,
    steamMinKgH: p.steamMinKgH ?? null,
    steamMaxKgH: p.steamMaxKgH ?? null,
    tempMaxC: p.tempMaxC ?? null,
    pressureNote: p.pressureNote ?? null,
    fuels: p.fuels ?? [],
    feature: p.feature,
    extra: `${MARK} ${p.page}`,
    powerNote: p.powerNote ?? null,
    sizes: [],
    sizesNote: p.sizesNote ?? null,
    aliases: p.aliases ?? [],
  };
}

function closed(slug: string, name: string, categoryId: Cat, image: Img, page: string): Series {
  return row({
    slug,
    id: "page",
    name,
    categoryId,
    kind: "Страница",
    image,
    summary: "Сайт не открылся в сверке 18.11.2026",
    feature: NO_NUM,
    page,
  });
}

function noCatalog(slug: string, name: string, categoryId: Cat, image: Img, page: string): Series {
  return row({
    slug,
    id: "page",
    name,
    categoryId,
    kind: "Страница",
    image,
    summary: "На сайте нет каталога котлов",
    feature: NO_NUM,
    page,
  });
}

function bare(
  slug: string,
  id: string,
  name: string,
  categoryId: Cat,
  kind: string,
  image: Img,
  summary: string,
  page: string,
  fuels?: FuelId[],
  pressureNote?: string | null,
  aliases?: string[],
): Series {
  return row({
    slug,
    id,
    name,
    categoryId,
    kind,
    image,
    summary,
    feature: NO_NUM,
    page,
    fuels,
    pressureNote,
    aliases,
  });
}

const alanga = "alanga-boiler-system";
const alangaPage = "Страница https://alanga.uz/.";
const berkes = "berkes";
const carlie = "carlieuklima";
const carliePage = "Страница https://www.carlieuklima.it/.";
const compte = "compte-r";
const dieff = "dieffenbacher-energy-bertschenergy";
const dieffPage = "Страница https://dieffenbacher.com/energy.";
const eko = "eko-prom-energo";
const ekoPage = "Страница https://www.ekoprom-energo.uz/.";
const elco = "ariston-group";
const flucal = "flucal-caldeiras";
const flucalPage = "Страница https://www.flucal.pt/.";
const goktas = "g-kta-is";
const goktasPage = "Страница https://www.goktasisi.com.tr/.";
const htt = "htt-energy";
const httPage = "Страница https://www.heat11.com/.";
const astec = "astec";
const ivar = "i-var-industry-s-r-l";
const ivarPage = "Страница https://www.ivarindustry.it/en/.";
const ic = "industrial-combustion";
const icPage = "Страница https://www.industrialcombustion.com/.";
const isgec = "isgec-heavy-engineering";
const heaton = "heaton";
const heatonPage = "Страница https://www.heaton.com.tr/.";
const ham = "john-zink-hamworthy-combustion";
const kte = "kawasaki-thermal-engineering";
const krom = "kromschroder";
const lambo = "lamborghini-calor";
const lamboPage = "Страница https://www.lamborghinicalor.it/.";
const lattner = "lattner-boiler";
const lattnerPage = "Страница https://www.lattner.com/.";
const llt = "leroux-lotz-technologies";
const dan = "master-climate-solutions";
const danPage = "Страница https://www.danthermgroup.com/.";
const mimsan = "mimsan";
const mimsanPage = "Страница https://www.mimsanenergy.com/.";
const modine = "modine";
const ne = "eriksen";
const nePage = "Страница https://cicgroup.com/nooter-eriksen/.";
const pbs = "pbs-power-equipment";
const powr = "powrmatic";
const powrPage = "Страница https://www.powrmatic.co.uk/.";

export const fillA: Fill[] = [
  {
    slug: alanga,
    title: "Alanga Boiler System",
    name: "Alanga Boiler System",
    place: "Ташкент",
    note: "На главной названы разделы котлов и теплогенераторов, мощности не напечатаны.",
    categories: categoriesOf(["water", "steam", "oil", "air"]),
    documents: [],
    series: [
      bare(alanga, "water", "Водогрейные котлы", "water", "Водогрейный", "/catalog/firetube.jpg", "Раздел каталога водогрейных котлов.", alangaPage, [], null, ["водогрейные"]),
      bare(alanga, "steam", "Паровые котлы", "steam", "Паровой", "/catalog/steam.jpg", "Раздел каталога паровых котлов.", alangaPage, [], null, ["паровые"]),
      bare(alanga, "oil", "Масляные котлы", "oil", "Термомасляный", "/catalog/firetube.jpg", "Раздел каталога масляных котлов.", alangaPage, [], null, ["масляные"]),
      bare(alanga, "steamgen", "Парогенераторы", "steam", "Парогенератор", "/catalog/steam.jpg", "Раздел каталога парогенераторов.", alangaPage, [], null, ["парогенераторы"]),
      bare(alanga, "air", "Теплогенераторы", "air", "Теплогенератор", "/catalog/web-air.jpg", "Раздел каталога теплогенераторов.", alangaPage, [], null, ["теплогенераторы"]),
      bare(alanga, "heat", "Отопительные котлы", "water", "Отопительный", "/catalog/firetube.jpg", "На странице отдельной строкой названы отопительные котлы.", alangaPage, [], null, ["отопительные"]),
      bare(alanga, "electric", "Электрические котлы", "water", "Электрический", "/catalog/firetube.jpg", "Раздел каталога электрических котлов.", alangaPage, [], null, ["электрические"]),
      bare(alanga, "gas", "Газовые котлы", "water", "Газовый", "/catalog/firetube.jpg", "Раздел каталога газовых котлов.", alangaPage, ["gas"], null, ["газовые"]),
    ],
  },
  {
    slug: berkes,
    title: "Berkes",
    name: "Berkes Group",
    place: "Montevideo",
    note: "Главная описывает строительную группу и направление BWE Energía, ряда котлов нет.",
    categories: categoriesOf(["steam"]),
    documents: [{ title: "Brochure" }],
    series: [noCatalog(berkes, "Berkes", "steam", "/catalog/steam.jpg", "Страница https://www.berkesgroup.com/.")],
  },
  {
    slug: carlie,
    title: "Carlieuklima",
    name: "Carlieuklima",
    place: "Budoia",
    note: "На главной названы линейки лучистого и воздушного отопления, без кВт.",
    categories: categoriesOf(["air"]),
    documents: [],
    series: [
      bare(carlie, "eucerk", "Nastri radianti Eucerk", "air", "Лучистые ленты", "/catalog/web-air.jpg", "Лучистые ленты Eucerk в разделе воздушного отопления.", carliePage, [], null, ["eucerk"]),
      bare(carlie, "euceramic", "Lampade radianti a gas Euceramic", "air", "Газовые лучистые лампы", "/catalog/web-air.jpg", "Газовые лучистые лампы Euceramic.", carliePage, ["gas"], null, ["euceramic"]),
      bare(carlie, "euterm", "Termostrisce radianti Euterm", "air", "Лучистые полосы", "/catalog/web-air.jpg", "Лучистые полосы Euterm.", carliePage, [], null, ["euterm"]),
      bare(carlie, "eurad", "Tubi radianti Eurad", "air", "Лучистые трубы", "/catalog/web-air.jpg", "Лучистые трубы Eurad.", carliePage, [], null, ["eurad"]),
      bare(carlie, "multieurad", "Tubi radianti Multieurad", "air", "Лучистые трубы", "/catalog/web-air.jpg", "Лучистые трубы Multieurad.", carliePage, [], null, ["multieurad"]),
      bare(carlie, "rialto", "Diffusore radiante a gas Rialto", "air", "Газовый лучистый диффузор", "/catalog/web-air.jpg", "Газовый лучистый диффузор Rialto.", carliePage, ["gas"], null, ["rialto"]),
      bare(carlie, "murano", "Lampada riscaldante a gas Murano", "air", "Газовая нагревательная лампа", "/catalog/web-air.jpg", "Газовая нагревательная лампа Murano.", carliePage, ["gas"], null, ["murano"]),
      bare(carlie, "lido", "Fungo riscaldante da esterno Lido", "air", "Уличный нагреватель", "/catalog/web-air.jpg", "Уличный нагреватель Lido.", carliePage, [], null, ["lido"]),
      bare(carlie, "eugen-ht", "Scambiatori di calore Eugen HT", "air", "Теплообменник нагрева воздуха", "/catalog/web-air.jpg", "Теплообменники Eugen HT в разделе нагрева воздуха.", carliePage, [], null, ["eugen"]),
    ],
  },
  {
    slug: compte,
    title: "COMPTE.R",
    name: "COMPTE.R",
    place: "Arlanc",
    note: "На главной напечатан диапазон биомассовых котлов 150 кВт – 12 МВт.",
    categories: categoriesOf(["steam"]),
    documents: [],
    series: [
      row({
        slug: compte,
        id: "biomasse",
        name: "Chaudières biomasse",
        categoryId: "steam",
        kind: "Биомасса, древесина",
        image: "/catalog/solid.jpg",
        summary: "Котлы на биомассе и древесине, 150 кВт – 12 МВт. На странице также названы chaudières bas NOx.",
        feature: "150 кВт – 12 МВт",
        page: "Страница https://www.compte-r.com/. Диапазон напечатан дважды: 150 kW jusqu’à 12 MW.",
        fuels: ["solid"],
        powerMinKw: 150,
        powerMaxKw: 12000,
        powerNote: "150 kW – 12 MW",
        aliases: ["biomasse", "bois"],
      }),
    ],
  },
  {
    slug: dieff,
    title: "Dieffenbacher Energy",
    name: "Dieffenbacher Energy",
    place: "Eppingen",
    note: "На странице энергии названы типы электростанций, модельного ряда котлов нет.",
    categories: categoriesOf(["steam"]),
    documents: [],
    series: [
      bare(dieff, "solid", "Solid-fuel-fired power plants", "steam", "Электростанция на твёрдом топливе", "/catalog/solid.jpg", "Раздел электростанций на твёрдом топливе.", dieffPage + " Новость про объект 55 МВт в ряд не внесена.", ["solid"], null, ["solid-fuel"]),
      bare(dieff, "gas-liquid", "Gas- and liquid-fuel-fired power plants", "steam", "Электростанция на газе и жидком топливе", "/catalog/steam.jpg", "Раздел электростанций на газе и жидком топливе. Жидкое топливо на странице не разложено на дизель, печное или мазут.", dieffPage, ["gas"], null, ["gas"]),
      bare(dieff, "whr", "Industrial waste heat recovery", "steam", "Утилизация промышленного тепла", "/catalog/steam.jpg", "Раздел промышленной утилизации тепла.", dieffPage, [], null, ["waste-heat"]),
    ],
  },
  {
    slug: eko,
    title: "EKO PROM ENERGO",
    name: "EKO PROM ENERGO",
    place: "Чирчик",
    note: "На главной три карточки котлов: уголь 2–50 МВт и 4–25 т/ч, вода 2–50 МВт, пар 4–25 т/ч.",
    categories: categoriesOf(["water", "steam"]),
    documents: [],
    series: [
      row({
        slug: eko,
        id: "coal",
        name: "Угольные котлы",
        categoryId: "water",
        kind: "Уголь, твёрдое топливо",
        image: "/catalog/solid.jpg",
        summary: "Угольные котлы: 2–50 МВт и 4–25 т/ч пара. Топливо на карточке — уголь и твёрдое топливо.",
        feature: "2–50 МВт и 4–25 т/ч",
        page: ekoPage + " Карточки объектов 5, 8, 10 и 2×15 МВт в размеры не внесены.",
        fuels: ["solid"],
        powerMinKw: 2000,
        powerMaxKw: 50000,
        steamMinKgH: 4000,
        steamMaxKgH: 25000,
        powerNote: "2–50 МВт",
        aliases: ["уголь"],
      }),
      row({
        slug: eko,
        id: "water",
        name: "Водогрейные котлы",
        categoryId: "water",
        kind: "Жаротрубный, два хода",
        image: "/catalog/firetube.jpg",
        summary: "Водогрейные котлы 2–50 МВт. На карточке топливо — газ или дизель.",
        feature: "2–50 МВт, газ или дизель",
        page: ekoPage,
        fuels: ["gas", "diesel"],
        powerMinKw: 2000,
        powerMaxKw: 50000,
        powerNote: "2–50 МВт",
        aliases: ["водогрейные"],
      }),
      row({
        slug: eko,
        id: "steam",
        name: "Паровые котлы",
        categoryId: "steam",
        kind: "Паровой",
        image: "/catalog/steam.jpg",
        summary: "Паровые котлы 4–25 т/ч. На карточке топливо — газ или уголь.",
        feature: "4–25 т/ч, газ или уголь",
        page: ekoPage + " Объекты 8 и 12 т/ч в размеры не внесены.",
        fuels: ["gas", "solid"],
        steamMinKgH: 4000,
        steamMaxKgH: 25000,
        aliases: ["пар"],
      }),
    ],
  },
  {
    slug: elco,
    title: "ELCO",
    name: "ELCO",
    place: "Швейцария",
    note: "На главной назван газовый конденсационный THISION SK, кВт на этой странице нет.",
    categories: categoriesOf(["water"]),
    documents: [],
    series: [
      bare(elco, "thision-sk", "THISION SK", "water", "Газовый конденсационный", "/catalog/firetube.jpg", "На странице: latest generation of gas condensing technology THISION SK. Четыре диапазона AEROTOP SPK относятся к тепловому насосу и в ряд котлов не внесены.", "Страница https://www.elco.net/.", ["gas"], null, ["thision"]),
    ],
  },
  {
    slug: flucal,
    title: "Flucal",
    name: "Flucal",
    place: "Campo",
    note: "Меню называет типы котлов и термомасла, мощности моделей не напечатаны.",
    categories: categoriesOf(["steam", "oil", "water"]),
    documents: [{ title: "Catalog" }],
    series: [
      bare(flucal, "sat-steam", "Saturated / overheated steam", "steam", "Насыщенный и перегретый пар, биомасса", "/catalog/solid.jpg", "Раздел биомассовых котлов: насыщенный и перегретый пар.", flucalPage, ["solid"], null, ["steam"]),
      bare(flucal, "watertube", "Water tube boiler", "steam", "Водотрубный, биомасса", "/catalog/solid.jpg", "Водотрубный котёл в разделе биомассы.", flucalPage, ["solid"], null, ["water-tube"]),
      bare(flucal, "v-firetube", "Vertical firetube boilers", "steam", "Вертикальный жаротрубный, биомасса", "/catalog/solid.jpg", "Вертикальные жаротрубные котлы в разделе биомассы.", flucalPage, ["solid"], null, ["vertical"]),
      bare(flucal, "h-tube", "Horizontal water / fire tube boilers", "steam", "Горизонтальный водотрубный и жаротрубный, биомасса", "/catalog/solid.jpg", "Горизонтальные водотрубные и жаротрубные котлы в разделе биомассы.", flucalPage, ["solid"], null, ["horizontal"]),
      bare(flucal, "oil-mobile", "Thermal oil mobile power stations", "oil", "Передвижная термомасляная станция", "/catalog/firetube.jpg", "Передвижные термомасляные станции.", flucalPage, [], null, ["thermal-oil"]),
      bare(flucal, "oil-vertical", "Termal oil vertical boilers", "oil", "Вертикальный термомасляный", "/catalog/firetube.jpg", "Вертикальные термомасляные котлы. Написание Termal — как на странице.", flucalPage, [], null, ["termal"]),
      bare(flucal, "hw-vertical", "Hot water vertical boilers", "water", "Вертикальный водогрейный", "/catalog/firetube.jpg", "Вертикальные водогрейные котлы.", flucalPage, [], null, ["hot-water"]),
      bare(flucal, "hw-horizontal", "Hot water horizontal boilers", "water", "Горизонтальный водогрейный", "/catalog/firetube.jpg", "Горизонтальные водогрейные котлы.", flucalPage, [], null, ["hot-water-h"]),
      bare(flucal, "fast-vapor", "Fast vaporization boiler", "steam", "Быстрое парообразование, ископаемое топливо", "/catalog/steam.jpg", "Котёл быстрого парообразования в разделе ископаемого топлива. Вид топлива не назван.", flucalPage, [], null, ["vaporization"]),
      bare(flucal, "h-steam", "Horizontal steam boiler", "steam", "Горизонтальный паровой, ископаемое топливо", "/catalog/steam.jpg", "Горизонтальный паровой котёл в разделе ископаемого топлива. Вид топлива не назван.", flucalPage, [], null, ["horizontal-steam"]),
      bare(flucal, "electric", "Electric Boilers", "water", "Электрический", "/catalog/firetube.jpg", "Электрические котлы. Теплоноситель на странице не указан.", flucalPage, [], null, ["electric"]),
    ],
  },
  {
    slug: goktas,
    title: "Göktaş Isı",
    name: "Göktaş Isı Sanayi",
    place: "Gaziantep",
    note: "На главной названы паровые, термомасляные и котлы перегретой воды, без мощностей.",
    categories: categoriesOf(["steam", "oil", "water"]),
    documents: [{ title: "E-Katalog" }],
    series: [
      bare(goktas, "steam", "Buhar Kazanları", "steam", "Паровой", "/catalog/steam.jpg", "Паровые котлы. Баннер «Sıvı & Katı Yakıt» к ряду не привязан отдельной цифрой.", goktasPage, [], null, ["buhar"]),
      bare(goktas, "oil", "Kızgın Yağ Kazanı", "oil", "Термомасляный", "/catalog/firetube.jpg", "Котёл перегретого масла.", goktasPage, [], null, ["yag"]),
      bare(goktas, "water", "Kızgın Su Kazanı", "water", "Перегретая вода", "/catalog/firetube.jpg", "Котёл перегретой воды.", goktasPage, [], null, ["kizgin-su"]),
    ],
  },
  {
    slug: htt,
    title: "HTT energy",
    name: "heat 11",
    place: "Bielefeld",
    note: "Меню называет термомасло, электронагрев, пар и котёл-утилизатор, без кВт.",
    categories: categoriesOf(["oil", "steam"]),
    documents: [],
    series: [
      bare(htt, "electric", "Elektroerhitzer", "oil", "Электрический нагреватель термомасла", "/catalog/firetube.jpg", "Электрический нагреватель в линейке теплоносителя.", httPage, [], null, ["elektroerhitzer"]),
      bare(htt, "fired", "Befeuerte Erhitzer / Thermoölkessel", "oil", "Жаровой термомасляный котёл", "/catalog/firetube.jpg", "Жаровой нагреватель и термомасляный котёл. Топливо на странице не названо.", httPage, [], null, ["thermooel"]),
      bare(htt, "heat-cool", "Heiz-Kühlanlagen", "oil", "Установка нагрева и охлаждения", "/catalog/firetube.jpg", "Установка нагрева и охлаждения в списке продуктов.", httPage, [], null, ["heiz-kuehl"]),
      bare(htt, "steam", "Dampferzeuger", "steam", "Парогенератор", "/catalog/steam.jpg", "Парогенератор в списке продуктов.", httPage, [], null, ["dampf"]),
      bare(htt, "waste", "Abwärmekessel", "steam", "Котёл-утилизатор", "/catalog/steam.jpg", "В тексте страницы назван Abwärmekessel рядом с термомасляными установками.", httPage, [], null, ["abwaerme"]),
      bare(htt, "container", "Containeranlagen", "oil", "Контейнерная установка", "/catalog/firetube.jpg", "Контейнерные установки в списке продуктов.", httPage, [], null, ["container"]),
    ],
  },
  {
    slug: astec,
    title: "Astec",
    name: "Astec",
    place: "не указано",
    note: "Официальный URL ответил отказом, каталог не прочитан.",
    categories: categoriesOf(["steam"]),
    documents: [],
    series: [closed(astec, "Astec", "steam", "/catalog/steam.jpg", "Страница https://astecindustries.com/products/industrial-heating/.")],
  },
  {
    slug: ivar,
    title: "I.VAR. Industry",
    name: "I.VAR. Industry S.r.l.",
    place: "Trevenzuolo",
    note: "На главной четыре группы котлов, без мощностей.",
    categories: categoriesOf(["water", "steam", "oil"]),
    documents: [{ title: "Technolist" }, { title: "Technocatalogue" }],
    series: [
      bare(ivar, "hw", "Hot Water Boilers", "water", "Водогрейный под давлением, конденсационный режим", "/catalog/firetube.jpg", "Pressurized boilers for condensing heating.", ivarPage, [], null, ["hot-water"]),
      bare(ivar, "steam", "Steam Generators", "steam", "Парогенератор высокого и низкого давления", "/catalog/steam.jpg", "High and low pressure steam generators.", ivarPage, [], "high and low pressure", ["vapor"]),
      bare(ivar, "shw", "Superheated Water Boilers", "water", "Перегретая вода", "/catalog/firetube.jpg", "Pressurized boilers for superheated water.", ivarPage, [], null, ["superheated"]),
      bare(ivar, "oil", "Diathermic oil heaters", "oil", "Диатермическое масло", "/catalog/firetube.jpg", "Heating systems for industrial production processes.", ivarPage, [], null, ["diathermic"]),
    ],
  },
  {
    slug: ic,
    title: "Industrial Combustion",
    name: "Industrial Combustion",
    place: "Monroe",
    note: "На главной перечислены серии горелок, кВт нет; у SBR-30 указаны 30 ppm и резерв #2 fuel oil.",
    categories: categoriesOf(["auto"]),
    documents: [],
    series: [
      bare(ic, "e", "E Series", "auto", "Коммерческая горелка", "/catalog/cabinet.jpg", "Коммерческая серия E.", icPage, [], null, ["e-series"]),
      bare(ic, "m", "M Series", "auto", "Коммерческая горелка", "/catalog/cabinet.jpg", "Коммерческая серия M.", icPage, [], null, ["m-series"]),
      bare(ic, "v", "V Series", "auto", "Коммерческая горелка", "/catalog/cabinet.jpg", "Коммерческая серия V.", icPage, [], null, ["v-series"]),
      bare(ic, "q", "Q Series", "auto", "Коммерческая горелка", "/catalog/cabinet.jpg", "Коммерческая серия Q.", icPage, [], null, ["q-series"]),
      bare(ic, "sbr-30", "SBR-30", "auto", "Промышленная горелка", "/catalog/cabinet.jpg", "Менее 30 ppm NOx без FGR. Резервное топливо на странице — #2 fuel oil.", icPage, ["diesel"], null, ["sbr"]),
      bare(ic, "mth", "MTH Series", "auto", "Промышленная горелка", "/catalog/cabinet.jpg", "Промышленная серия MTH.", icPage, [], null, ["mth"]),
      bare(ic, "d", "D Series", "auto", "Промышленная горелка", "/catalog/cabinet.jpg", "Промышленная серия D.", icPage, [], null, ["d-series"]),
      bare(ic, "xl", "XL Series", "auto", "Промышленная горелка", "/catalog/cabinet.jpg", "Промышленная серия XL.", icPage, [], null, ["xl"]),
      bare(ic, "s1", "S1 Series", "auto", "Промышленная горелка", "/catalog/cabinet.jpg", "Промышленная серия S1.", icPage, [], null, ["s1"]),
      bare(ic, "nt", "NT Burner", "auto", "Промышленная горелка", "/catalog/cabinet.jpg", "Горелка NT.", icPage, [], null, ["nt"]),
    ],
  },
  {
    slug: isgec,
    title: "ISGEC",
    name: "ISGEC",
    place: "не указано",
    note: "Официальный URL ответил отказом, каталог не прочитан.",
    categories: categoriesOf(["steam"]),
    documents: [],
    series: [closed(isgec, "ISGEC", "steam", "/catalog/steam.jpg", "Страница https://www.isgec.com/.")],
  },
  {
    slug: heaton,
    title: "Heaton",
    name: "Heaton",
    place: "İstanbul",
    note: "На главной пять групп пара, масла, воды и сжигания, без мощностей.",
    categories: categoriesOf(["steam", "oil", "water", "auto"]),
    documents: [],
    series: [
      bare(heaton, "steamgen", "Steam Generators", "steam", "Водотрубный парогенератор", "/catalog/steam.jpg", "Fast-starting water-tube steam generators and mobile steam plants.", heatonPage, [], null, ["steam-generators"]),
      bare(heaton, "steam", "Steam Boilers", "steam", "Трёхходовой жаротрубный паровой", "/catalog/steam.jpg", "Three-pass, high-capacity fire-tube steam boilers.", heatonPage, [], null, ["steam-boilers"]),
      bare(heaton, "oil", "Thermal Oil Systems", "oil", "Термомасляный", "/catalog/firetube.jpg", "Thermal oil boilers.", heatonPage, [], null, ["thermal-oil"]),
      bare(heaton, "heating", "Heating Boilers", "water", "Водогрейный и отопительный", "/catalog/firetube.jpg", "Hot water and central-heating boilers: solid, liquid/gas-fired and mobile solutions. Жидкое топливо не разложено на отдельный вид.", heatonPage, ["solid", "gas"], null, ["heating"]),
      bare(heaton, "combustion", "Fuel & Combustion Systems", "auto", "Система сжигания", "/catalog/cabinet.jpg", "Сжигание твёрдого, жидкого и газового топлива. Жидкое топливо не разложено.", heatonPage, ["solid", "gas"], null, ["combustion"]),
    ],
  },
  {
    slug: ham,
    title: "Hamworthy Combustion",
    name: "Hamworthy Combustion",
    place: "не указано",
    note: "Официальный URL не ответил за время сверки.",
    categories: categoriesOf(["auto"]),
    documents: [],
    series: [closed(ham, "Hamworthy Combustion", "auto", "/catalog/cabinet.jpg", "Страница https://www.hamworthy-combustion.com/.")],
  },
  {
    slug: kte,
    title: "Kawasaki Thermal Engineering",
    name: "Kawasaki Thermal Engineering",
    place: "не указано",
    note: "Ответ официального URL — переход на index.php, в теле ряда котлов нет.",
    categories: categoriesOf(["steam"]),
    documents: [],
    series: [noCatalog(kte, "Kawasaki Thermal Engineering", "steam", "/catalog/steam.jpg", "Страница https://www.khi.co.jp/corp/kte/EN/.")],
  },
  {
    slug: krom,
    title: "Kromschröder",
    name: "Kromschröder",
    place: "не указано",
    note: "Официальный URL открыл сайт Honeywell, каталога горелок Kromschröder на нём нет.",
    categories: categoriesOf(["auto"]),
    documents: [],
    series: [noCatalog(krom, "Kromschröder", "auto", "/catalog/cabinet.jpg", "Страница https://www.honeywell.com/.")],
  },
  {
    slug: lambo,
    title: "Lamborghini Calor",
    name: "Lamborghini Calor",
    place: "San Bonifacio",
    note: "На главной названы горелки и котлы, без кВт; отметка 4 кВт относится к тепловым насосам.",
    categories: categoriesOf(["auto", "water"]),
    documents: [{ title: "Cataloghi, Listini e Normative" }, { title: "Foto Cataloghi" }],
    series: [
      bare(lambo, "burners", "Bruciatori", "auto", "Горелка", "/catalog/cabinet.jpg", "Горелки в разделах отопления и промышленного нагрева.", lamboPage, [], null, ["bruciatori"]),
      bare(lambo, "power", "Generatori di calore di potenza", "water", "Теплогенератор мощности", "/catalog/firetube.jpg", "Генераторы тепла мощности в меню отопления.", lamboPage, [], null, ["generatori"]),
      bare(lambo, "boilers", "Caldaie", "water", "Котёл", "/catalog/firetube.jpg", "Котлы в меню отопления.", lamboPage, [], null, ["caldaie"]),
      bare(lambo, "body", "Caldaie solo corpo per abbinam. bruciatore", "water", "Котёл без горелки", "/catalog/firetube.jpg", "Котлы только корпусом под горелку.", lamboPage, [], null, ["solo-corpo"]),
      bare(lambo, "gruppi", "Gruppi termici", "water", "Тепловой блок", "/catalog/firetube.jpg", "Тепловые блоки в меню отопления.", lamboPage, [], null, ["gruppi-termici"]),
    ],
  },
  {
    slug: lattner,
    title: "Lattner",
    name: "Lattner Boiler Manufacturing Co.",
    place: "Cedar Rapids",
    note: "На главной перечислены паровые, электрические и горелки, без мощностей.",
    categories: categoriesOf(["steam", "auto"]),
    documents: [{ title: "Brochures" }, { title: "Specifications" }, { title: "Operations Manuals" }],
    series: [
      bare(lattner, "vertical", "Fuel-Fired Vertical Tubeless Steam Boilers", "steam", "Вертикальный бездымогарный паровой", "/catalog/steam.jpg", "Топливные вертикальные паровые котлы без дымогарных труб. Топливо на странице не названо.", lattnerPage, [], null, ["vertical"]),
      bare(lattner, "horizontal", "Fuel-Fired Horizontal Firetube Steam and Hot Water Boilers", "steam", "Горизонтальный жаротрубный, пар и горячая вода", "/catalog/steam.jpg", "Одна строка страницы покрывает пар и горячую воду. Топливо не названо.", lattnerPage, [], null, ["horizontal"]),
      bare(lattner, "el-horizontal", "Electric Horizontal Steam Boilers", "steam", "Электрический горизонтальный паровой", "/catalog/steam.jpg", "Электрические горизонтальные паровые котлы.", lattnerPage, [], null, ["electric-horizontal"]),
      bare(lattner, "cabinet", "Electric Cabinet Style Steam and Hot Water Boilers", "steam", "Электрический шкафной, пар и горячая вода", "/catalog/cabinet.jpg", "Шкафные электрические котлы пара и горячей воды.", lattnerPage, [], null, ["cabinet"]),
      bare(lattner, "room", "Steam Room Boilers", "steam", "Котёл парной", "/catalog/steam.jpg", "Котлы парных.", lattnerPage, [], null, ["steam-room"]),
      bare(lattner, "lox", "Low-NOx Boilers", "steam", "Low-NOx", "/catalog/steam.jpg", "Пункт меню Low-NOx Boilers. Тип теплоносителя на странице не указан.", lattnerPage, [], null, ["low-nox"]),
      bare(lattner, "burners", "Burners", "auto", "Горелка", "/catalog/cabinet.jpg", "Горелки в меню продуктов.", lattnerPage, [], null, ["burners"]),
    ],
  },
  {
    slug: llt,
    title: "Leroux & Lotz",
    name: "Leroux & Lotz Technologies",
    place: "Nantes",
    note: "На главной указан котёл с топкой 10–120 МВт тепл. на биомассе и отходах.",
    categories: categoriesOf(["steam"]),
    documents: [],
    series: [
      row({
        slug: llt,
        id: "chaudiere",
        name: "Four / chaudière",
        categoryId: "steam",
        kind: "Топка и котёл, биомасса и отходы",
        image: "/catalog/solid.jpg",
        summary: "Топка (сжигание или газификация) и котёл 10–120 МВт тепл. Технологии на странице: grilles gradins, spreaders, lits fluidisés.",
        feature: "10–120 МВт тепл.",
        page: "Страница https://www.lerouxlotz.com/. Топливо в тексте: biomasse, bois déchet, CSR, RDF.",
        fuels: ["solid"],
        powerMinKw: 10000,
        powerMaxKw: 120000,
        powerNote: "10–120 MWth",
        aliases: ["chaudiere", "llt"],
      }),
    ],
  },
  {
    slug: dan,
    title: "Master / Dantherm",
    name: "Dantherm Group",
    place: "Дания",
    note: "На главной перечислены типы воздухонагревателей, без кВт.",
    categories: categoriesOf(["air"]),
    documents: [],
    series: [
      bare(dan, "direct-gas", "Direct gas fired air heaters", "air", "Прямой газовый воздухонагреватель", "/catalog/web-air.jpg", "Прямые газовые воздухонагреватели.", danPage, ["gas"], null, ["direct-gas"]),
      bare(dan, "direct-oil", "Direct oil fired air heaters", "air", "Прямой воздухонагреватель на жидком топливе", "/catalog/web-air.jpg", "На странице: direct oil fired. Вид жидкого топлива не назван.", danPage, [], null, ["direct-oil"]),
      bare(dan, "electric", "Electric heaters", "air", "Электрический нагреватель", "/catalog/web-air.jpg", "Электрические нагреватели.", danPage, [], null, ["electric"]),
      bare(dan, "electric-fan", "Electric fan air heaters", "air", "Электрический тепловентилятор", "/catalog/web-air.jpg", "Электрические тепловентиляторы.", danPage, [], null, ["fan"]),
      bare(dan, "hot-water", "Hot water heaters", "air", "Воздухонагреватель на горячей воде", "/catalog/web-air.jpg", "Нагреватели на горячей воде.", danPage, [], null, ["hot-water"]),
      bare(dan, "indirect-fuel", "Indirect fuel fired air heaters", "air", "Непрямой топливный воздухонагреватель", "/catalog/web-air.jpg", "Непрямые топливные воздухонагреватели. Топливо не названо.", danPage, [], null, ["indirect"]),
      bare(dan, "indirect-oil", "Indirect oil fired air heaters", "air", "Непрямой воздухонагреватель на жидком топливе", "/catalog/web-air.jpg", "На странице: indirect oil fired. Вид жидкого топлива не назван.", danPage, [], null, ["indirect-oil"]),
      bare(dan, "ir-oil", "Infrared oil fired heaters", "air", "Инфракрасный нагреватель на жидком топливе", "/catalog/web-air.jpg", "На странице: infrared oil fired. Вид жидкого топлива не назван.", danPage, [], null, ["infrared-oil"]),
      bare(dan, "ir-el", "Infrared electric heaters", "air", "Инфракрасный электрический нагреватель", "/catalog/web-air.jpg", "Инфракрасные электрические нагреватели.", danPage, [], null, ["infrared-electric"]),
      bare(dan, "tent", "Tent heaters", "air", "Нагреватель для палаток", "/catalog/web-air.jpg", "Tent heaters в списке нагревателей.", danPage, [], null, ["tent"]),
    ],
  },
  {
    slug: mimsan,
    title: "Mimsan",
    name: "Mimsan",
    place: "Malatya",
    note: "На главной CFB-пар до 60 МВт тепл. на единицу и отдельные имена котлов без своих цифр.",
    categories: categoriesOf(["steam", "oil"]),
    documents: [],
    series: [
      row({
        slug: mimsan,
        id: "cfb-steam",
        name: "Dolaşımlı tip akışkan yataklı buhar kazanı",
        categoryId: "steam",
        kind: "ЦКС, пар и перегретый пар",
        image: "/catalog/solid.jpg",
        summary: "До 60 МВт тепл. на единицу для промышленных и перегретых паровых котлов ЦКС.",
        feature: "до 60 МВт тепл.",
        page: mimsanPage + " Карточки объектов в МВтэ и 2×35 т/ч при 10 bar(g) в ряд не внесены.",
        fuels: ["solid"],
        powerMaxKw: 60000,
        powerNote: "до 60 MWth",
        aliases: ["cfb", "buhar"],
      }),
      bare(mimsan, "cfb-combi", "Dolaşımlı tip akışkan yataklı kombine kazan", "steam", "ЦКС, комбинированный", "/catalog/solid.jpg", "Комбинированный котёл ЦКС. Отдельной мощности на странице нет.", mimsanPage, ["solid"], null, ["kombine"]),
      bare(mimsan, "cfb-oil", "Dolaşımlı tip akışkan yataklı kızgın yağ kazanı", "oil", "ЦКС, перегретое масло", "/catalog/solid.jpg", "Термомасляный котёл ЦКС. Отдельной мощности на странице нет.", mimsanPage, ["solid"], null, ["kizgin-yag"]),
      bare(mimsan, "whr", "Atık ısı kazanı", "steam", "Котёл-утилизатор", "/catalog/steam.jpg", "Котёл утилизации тепла.", mimsanPage, [], null, ["atik-isi"]),
      bare(mimsan, "gas-liquid", "Sıvı ve gaz yakıtlı kazanlar", "steam", "Жидкое и газовое топливо", "/catalog/steam.jpg", "Котлы на жидком и газовом топливе. Жидкое топливо не разложено.", mimsanPage, ["gas"], null, ["gaz"]),
      bare(mimsan, "coal", "Kömür yakıtlı akışkan yataklı kazanlar", "steam", "ЦКС, уголь", "/catalog/solid.jpg", "Угольные котлы с кипящим слоем.", mimsanPage, ["solid"], null, ["komur"]),
      bare(mimsan, "biomass", "Biyokütle kazanları", "steam", "Биомасса", "/catalog/solid.jpg", "Котлы на биомассе названы в тексте рядом с ЦКС.", mimsanPage, ["solid"], null, ["biyokutle"]),
      bare(mimsan, "scotch", "Skoç kazan", "steam", "Шотландский", "/catalog/steam.jpg", "Skoç kazan назван в строке типов на странице.", mimsanPage, [], null, ["skoc"]),
    ],
  },
  {
    slug: modine,
    title: "Modine",
    name: "Modine",
    place: "не указано",
    note: "Официальный URL ответил отказом, каталог не прочитан.",
    categories: categoriesOf(["air"]),
    documents: [],
    series: [closed(modine, "Modine", "air", "/catalog/web-air.jpg", "Страница https://www.modinehvac.com/.")],
  },
  {
    slug: ne,
    title: "Nooter Eriksen",
    name: "Nooter/Eriksen",
    place: "St. Louis",
    note: "На странице названы HRSG, жаровые, WTE и парогенераторы нефтеотдачи, без мощностей.",
    categories: categoriesOf(["steam"]),
    documents: [],
    series: [
      bare(ne, "hrsg", "Heat Recovery Steam Generators", "steam", "Котёл-утилизатор", "/catalog/steam.jpg", "HRSG в списке продуктов.", nePage, [], null, ["hrsg"]),
      bare(ne, "simple", "Simple Cycle", "steam", "Простой цикл", "/catalog/steam.jpg", "Simple Cycle отдельным пунктом продуктов.", nePage, [], null, ["simple-cycle"]),
      bare(ne, "fired", "Fired Boilers", "steam", "Жаровой котёл", "/catalog/steam.jpg", "Fired Boilers. Топливо на странице не названо.", nePage, [], null, ["fired"]),
      bare(ne, "wte", "WTE and Biomass Boilers", "steam", "Отходы и биомасса", "/catalog/solid.jpg", "Котлы waste-to-energy и биомассы.", nePage, ["solid"], null, ["wte", "biomass"]),
      bare(ne, "eor", "Enhanced Oil Recovery Steam Generators", "steam", "Парогенератор для нефтеотдачи", "/catalog/steam.jpg", "Парогенераторы повышения нефтеотдачи. Слово oil здесь не топливо котла.", nePage, [], null, ["eor"]),
    ],
  },
  {
    slug: pbs,
    title: "PBS POWER EQUIPMENT",
    name: "PBS POWER EQUIPMENT",
    place: "не указано",
    note: "Официальный URL открылся пустой страницей, каталога котлов нет.",
    categories: categoriesOf(["steam"]),
    documents: [],
    series: [noCatalog(pbs, "PBS POWER EQUIPMENT", "steam", "/catalog/steam.jpg", "Страница https://www.pbspe.cz/.")],
  },
  {
    slug: powr,
    title: "Powrmatic",
    name: "Powrmatic",
    place: "Ilminster",
    note: "На главной названы LEC, Eeco-X, PVL и воздухонагреватели на газе и жидком топливе, без кВт.",
    categories: categoriesOf(["air"]),
    documents: [],
    series: [
      bare(powr, "lec", "LEC", "air", "Электрический нагрев", "/catalog/web-air.jpg", "Электрическая линейка LEC названа в тексте страницы.", powrPage, [], null, ["lec"]),
      bare(powr, "eeco-x", "Eeco-X", "air", "Тепловой насос", "/catalog/web-air.jpg", "Eeco-X heat pumps названы в тексте страницы.", powrPage, [], null, ["eeco-x"]),
      bare(powr, "pvl", "PVL", "air", "Лучистый нагреватель", "/catalog/web-air.jpg", "Powrmatic PVL назван как лучистый нагреватель.", powrPage, [], null, ["pvl"]),
      bare(powr, "warm-air", "Warm air heaters", "air", "Воздухонагреватель", "/catalog/web-air.jpg", "В тексте: oil and gas-fired warm air heaters. Жидкое топливо не разложено.", powrPage, ["gas"], null, ["warm-air"]),
    ],
  },
];

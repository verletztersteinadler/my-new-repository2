import type { Category, CategoryId, Series } from "@/data/catalog";

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

const checked = "Сверка 18.11.2026. Снято с открытой страницы завода, без догадок.";

function one(slug: string, title: string, name: string, place: string, note: string, rows: Series[]): Fill {
  const categories: Category[] = [];
  for (const row of rows) {
    if (!categories.some((item) => item.id === row.categoryId)) {
      const titles: Record<string, string> = { water: "Водогрейные", steam: "Паровые", oil: "Термомасляные", air: "Воздухонагреватели", auto: "Горелки", hw170: "Перегретая вода" };
      const params: Record<string, "power" | "steam" | "none"> = { water: "power", steam: "steam", oil: "power", air: "power", auto: "none", hw170: "power" };
      categories.push({ id: row.categoryId, title: titles[row.categoryId], param: params[row.categoryId] });
    }
  }
  return { slug, title, name, place, note, categories, documents: [{ title: "Сверка сайта" }], series: rows };
}

function row(id: string, name: string, categoryId: CategoryId, image: string, summary: string, minKw: number | null, maxKw: number | null, minSteam: number | null, maxSteam: number | null, feature: string, extra: string): Series {
  return {
    id, name, categoryId, kind: feature, image, summary,
    powerMinKw: minKw, powerMaxKw: maxKw, steamMinKgH: minSteam, steamMaxKgH: maxSteam,
    tempMaxC: null, pressureNote: null, fuels: [], feature, extra: `${checked} ${extra}`,
    sizes: [], sizesNote: "Каталог моделей не заполнен. Данные о серии/исполнении требуют паспортной проверки.", aliases: [],
    recordStatus: (minKw == null && maxKw == null && minSteam == null && maxSteam == null) ? "not-filled" : "catalogued",
  };
}

export const fills: Fill[] = [

  one("acs", "ACS", "АГУНА / ACS", "не указано", "На открытой странице числовой ряд не найден.", [
    row("acs", "ACS", "water", "/catalog/firetube.jpg", "На открытой странице числовой ряд не найден.", null, null, null, null, "Цифры ряда не сняты", "На открытой странице числовой ряд не найден."),
  ]),
  one("al-kotel", "Прогресс", "Прогресс / Алапаевский завод котельного оборудования", "не указано", "На странице назван ВК-21 КСВа-2,0. Цифра из имени не бралась.", [
    row("al-kotel", "Прогресс ВК-21", "water", "/catalog/firetube.jpg", "цифра из имени не бралась", null, null, null, null, "цифра из имени не бралась", "Карточка не открывалась."),
  ]),
  one("alanga-boiler-system", "Alanga Boiler System", "Alanga Boiler System", "не указано", "Промышленные Котлы - Alanga Boiler System", [
    row("alanga-boiler-system", "Alanga Boiler System", "water", "/catalog/firetube.jpg", "Промышленные Котлы - Alanga Boiler System", null, null, null, null, "Цифры ряда не сняты", "Промышленные Котлы - Alanga Boiler System"),
  ]),
  one("ariston-group", "Ariston Group", "ELCO / Ariston Group", "не указано", "At the core of ELCO's gas condensing boiler portfolio is the proprietary HEX³ stainless-steel heat exchanger technology.", [
    row("ariston-group", "Ariston Group", "water", "/catalog/firetube.jpg", "At the core of ELCO's gas condensing boiler portfolio is the proprietary HEX³ stainless-steel heat exchanger technology.", null, null, null, null, "Цифры ряда не сняты", "At the core of ELCO's gas condensing boiler portfolio is the proprietary HEX³ stainless-steel heat exchanger technology."),
  ]),
  one("astec", "Astec", "Heatec / Astec", "не указано", "Сайт не открылся в сверке 18.11.2026.", [
    row("astec", "Astec", "water", "/catalog/firetube.jpg", "Сайт не открылся в сверке 18.11.2026.", null, null, null, null, "Цифры ряда не сняты", "Сайт не открылся в сверке 18.11.2026."),
  ]),
  one("automaticles", "Котельный завод «Автоматик-Лес»", "Котельный завод «Автоматик-Лес»", "не указано", "Котельный завод «Автоматик-Лес» — производство и поставка котельного оборудования на биотопливе", [
    row("automaticles", "Котельный завод «Автоматик-Лес»", "water", "/catalog/firetube.jpg", "Котельный завод «Автоматик-Лес» — производство и поставка котельного оборудования на биотопливе", null, null, null, null, "Цифры ряда не сняты", "Котельный завод «Автоматик-Лес» — производство и поставка котельного оборудования на биотопливе"),
  ]),
  one("berkes", "Berkes", "Berkes", "не указано", "На открытой странице числовой ряд не найден.", [
    row("berkes", "Berkes", "water", "/catalog/firetube.jpg", "На открытой странице числовой ряд не найден.", null, null, null, null, "Цифры ряда не сняты", "На открытой странице числовой ряд не найден."),
  ]),
  one("bkstroy", "ПО «Бийский котлостроительный завод»", "ПО «Бийский котлостроительный завод» / ПО «БиКЗ»", "не указано", "На странице серии Е, ДСЕ, ДЕ, ДКВр, КЕ: 1–25 т/ч. Это база блочных котельных.", [
    row("bkstroy", "Бийский котлостроительный", "steam", "/catalog/steam.jpg", "1–25 т/ч", null, null, 1000, 25000, "1–25 т/ч", "Отдельные карточки моделей не открывались. Рядом указаны БМК на этих котлах."),
  ]),
  one("bzkeo", "ООО «Бийский завод котельно-энергетического оборудования»", "ООО «Бийский завод котельно-энергетического оборудования» / БЗКЭО", "не указано", "Открытая страница даёт теплообменники 5–40 т/ч, не ряд котлов.", [
    row("bzkeo", "БЗКЭО — модельный каталог не заполнен", "water", "/catalog/firetube.jpg", "Серия котлов не подтверждена. Данные теплообменника не относятся к паропроизводительности котла.", null, null, null, null, "Не является подтверждённой модельной серией", "Проверить официальный раздел котлов перед публикацией числовых характеристик."),
  ]),
  one("carlieuklima", "Carlieuklima", "Carlieuklima", "не указано", "На открытой странице числовой ряд не найден.", [
    row("carlieuklima", "Carlieuklima", "air", "/catalog/web-air.jpg", "На открытой странице числовой ряд не найден.", null, null, null, null, "Цифры ряда не сняты", "На открытой странице числовой ряд не найден."),
  ]),
  one("compte-r", "COMPTE.R", "COMPTE.R", "не указано", "Биомасса 150 кВт – 12 МВт.", [
    row("compte-r", "COMPTE.R", "water", "/catalog/firetube.jpg", "150 кВт – 12 МВт", 150, 12000, null, null, "150 кВт – 12 МВт", "Биомасса. Одна фраза на главной."),
  ]),
  one("dieffenbacher-energy-bertschenergy", "Dieffenbacher Energy (BERTSCHenergy)", "Dieffenbacher Energy (BERTSCHenergy)", "не указано", "На открытой странице числовой ряд не найден.", [
    row("dieffenbacher-energy-bertschenergy", "Dieffenbacher Energy (BERTSCHenergy)", "water", "/catalog/firetube.jpg", "На открытой странице числовой ряд не найден.", null, null, null, null, "Цифры ряда не сняты", "На открытой странице числовой ряд не найден."),
  ]),
  one("easco", "EASCO", "Supreme Boilers / EASCO", "не указано", "Leading Industrial Steam Boilers Manufacturer | Supreme Boilers", [
    row("easco", "EASCO — модельный каталог не заполнен", "steam", "/catalog/steam.jpg", "Производитель Supreme Boilers; линейка SM4 указана как ориентир для проверки.", null, null, null, null, "Не является серией под названием EASCO", "Нужно перенести паспортные параметры SM4 и разделить паровые и водогрейные исполнения."),
  ]),
  one("eco-par", "ECO-PAR", "КЗКЭО «Когенерация» / ECO-PAR", "не указано", "Краснодарский котельный завод", [
    row("eco-par", "ECO-PAR", "water", "/catalog/firetube.jpg", "Краснодарский котельный завод", null, null, null, null, "Цифры ряда не сняты", "Краснодарский котельный завод"),
  ]),
  one("ecoenergo", "ЭКОЭНЕРГОМАШ (Бийск)", "ЭКОЭНЕРГОМАШ (Бийск)", "не указано", "Производство и поставки специализированного котельного оборудования - Экоэнергомаш", [
    row("ecoenergo", "ЭКОЭНЕРГОМАШ (Бийск)", "water", "/catalog/firetube.jpg", "Производство и поставки специализированного котельного оборудования - Экоэнергомаш", null, null, null, null, "Цифры ряда не сняты", "Производство и поставки специализированного котельного оборудования - Экоэнергомаш"),
  ]),
  one("eko-prom-energo", "EKO PROM ENERGO", "EKO PROM ENERGO", "не указано", "Водогрейные 2–50 МВт, паровые 4–25 т/ч.", [
    row("eko-prom-energo", "ЭКО ПРОМ, водогрейные", "water", "/catalog/firetube.jpg", "2–50 МВт", 2000, 50000, null, null, "2–50 МВт", "Топливо ряда на странице не разделено."),
    row("eko-prom-energo-2-2", "ЭКО ПРОМ, паровые", "steam", "/catalog/steam.jpg", "4–25 т/ч", null, null, 4000, 25000, "4–25 т/ч", "Топливо ряда на странице не разделено."),
  ]),
  one("eriksen", "Eriksen", "Nooter/Eriksen", "не указано", "Heat Recovery Steam Generators – HRSGs", [
    row("eriksen", "Nooter/Eriksen — HRSG (проектное оборудование)", "steam", "/catalog/steam.jpg", "Парогенераторы-утилизаторы HRSG; паровые характеристики зависят от проекта.", null, null, null, null, "Парогенератор-утилизатор, не водогрейная серия", "Номер конкретной линейки и паспортные данные не опубликованы."),
  ]),
  one("flucal-caldeiras", "Flucal Caldeiras", "Flucal Caldeiras", "не указано", "Mais de 300.000.000 Kcal/h instalados provenientes de biomassa", [
    row("flucal-caldeiras", "Flucal Caldeiras", "water", "/catalog/firetube.jpg", "Mais de 300.000.000 Kcal/h instalados provenientes de biomassa", null, null, null, null, "Цифры ряда не сняты", "Mais de 300.000.000 Kcal/h instalados provenientes de biomassa"),
  ]),
  one("g-kta-is", "Göktaş Isı", "Göktaş Isı", "не указано", "На открытой странице числовой ряд не найден.", [
    row("g-kta-is", "Göktaş Isı", "water", "/catalog/firetube.jpg", "На открытой странице числовой ряд не найден.", null, null, null, null, "Цифры ряда не сняты", "На открытой странице числовой ряд не найден."),
  ]),
  one("genenergy", "GenEnergy", "СП-Систем / GenEnergy", "не указано", "СП-Систем — промышленное паровое оборудование GenEnergy", [
    row("genenergy", "GenEnergy", "water", "/catalog/firetube.jpg", "СП-Систем — промышленное паровое оборудование GenEnergy", null, null, null, null, "Цифры ряда не сняты", "СП-Систем — промышленное паровое оборудование GenEnergy"),
  ]),
  one("geotherm", "GEOTHERM", "Эко-Спектрум / GEOTHERM", "не указано", "На открытой странице числовой ряд не найден.", [
    row("geotherm", "GEOTHERM", "water", "/catalog/firetube.jpg", "На открытой странице числовой ряд не найден.", null, null, null, null, "Цифры ряда не сняты", "На открытой странице числовой ряд не найден."),
  ]),
  one("heaton", "Heaton", "İtimat Kazan / Heaton", "не указано", "Heaton — Steam and Heat Systems", [
    row("heaton", "Heaton", "water", "/catalog/firetube.jpg", "Heaton — Steam and Heat Systems", null, null, null, null, "Цифры ряда не сняты", "Heaton — Steam and Heat Systems"),
  ]),
  one("htt-energy", "HTT energy", "heat 11 / HTT energy", "не указано", "Unsere Anlagen stehen für niedrige Betriebskosten, beste Umweltstandards und höchste Rentabilität.", [
    row("htt-energy", "HTT energy", "water", "/catalog/firetube.jpg", "Unsere Anlagen stehen für niedrige Betriebskosten, beste Umweltstandards und höchste Rentabilität.", null, null, null, null, "Цифры ряда не сняты", "Unsere Anlagen stehen für niedrige Betriebskosten, beste Umweltstandards und höchste Rentabilität."),
  ]),
  one("i-var-industry-s-r-l", "I.VAR. Industry S.r.l.", "I.VAR. Industry S.r.l.", "не указано", "Три ряда: 22,5–10 560 кВт, перегретая вода 140–2 907 кВт, дрова 29–65 кВт.", [
    row("i-var-industry-s-r-l", "I.VAR, стальные", "water", "/catalog/firetube.jpg", "22,5–10 560 кВт", 22.5, 10560, null, null, "22,5–10 560 кВт", "Отдельной строкой конденсационные 110–641,3 кВт."),
    row("i-var-industry-s-r-l-2-2", "I.VAR, перегретая вода", "hw170", "/catalog/firetube.jpg", "140–2 907 кВт", 140, 2907, null, null, "140–2 907 кВт", "Топливо не указано."),
    row("i-var-industry-s-r-l-3-3", "I.VAR, дрова", "water", "/catalog/firetube.jpg", "29–65 кВт", 29, 65, null, null, "29–65 кВт", "Дрова."),
  ]),
  one("industrial-combustion", "Industrial Combustion", "Industrial Combustion", "не указано", "Introducing myBoilerRoom: Your Boiler Room's Digital Twin", [
    row("industrial-combustion", "Industrial Combustion", "auto", "/catalog/cabinet.jpg", "Introducing myBoilerRoom: Your Boiler Room's Digital Twin", null, null, null, null, "Цифры ряда не сняты", "Introducing myBoilerRoom: Your Boiler Room's Digital Twin"),
  ]),
  one("isgec-heavy-engineering", "ISGEC Heavy Engineering", "ISGEC Heavy Engineering", "не указано", "Сайт не открылся в сверке 18.11.2026.", [
    row("isgec-heavy-engineering", "ISGEC Heavy Engineering", "water", "/catalog/firetube.jpg", "Сайт не открылся в сверке 18.11.2026.", null, null, null, null, "Цифры ряда не сняты", "Сайт не открылся в сверке 18.11.2026."),
  ]),
  one("john-zink-hamworthy-combustion", "John Zink Hamworthy Combustion", "John Zink Hamworthy Combustion", "не указано", "Сайт не открылся в сверке 18.11.2026.", [
    row("john-zink-hamworthy-combustion", "John Zink Hamworthy Combustion", "auto", "/catalog/cabinet.jpg", "Сайт не открылся в сверке 18.11.2026.", null, null, null, null, "Цифры ряда не сняты", "Сайт не открылся в сверке 18.11.2026."),
  ]),
  one("kas-kad", "Каскад плюс", "Каскад плюс / Завод котельного оборудования «Каскад»", "не указано", "изготовление и монтаж котельного оборудования", [
    row("kas-kad", "Каскад плюс", "water", "/catalog/firetube.jpg", "изготовление и монтаж котельного оборудования", null, null, null, null, "Цифры ряда не сняты", "изготовление и монтаж котельного оборудования"),
  ]),
  one("kawasaki-thermal-engineering", "Kawasaki Thermal Engineering", "Kawasaki Thermal Engineering", "не указано", "На открытой странице числовой ряд не найден.", [
    row("kawasaki-thermal-engineering", "Kawasaki Thermal Engineering", "water", "/catalog/firetube.jpg", "На открытой странице числовой ряд не найден.", null, null, null, null, "Цифры ряда не сняты", "На открытой странице числовой ряд не найден."),
  ]),
  one("kazkotloservis", "Казкотлосервис", "Казкотлосервис", "не указано", "ККС-КВа: на сайте «25 кВт до 3 МВт+».", [
    row("kazkotloservis", "ККС-КВа", "water", "/catalog/firetube.jpg", "25 кВт – 3 МВт+", 25, 3000, null, null, "25 кВт – 3 МВт+", "Плюс после 3 МВт страница не раскрывает."),
  ]),
  one("kotel122", "ООО «Бийский завод энергетического оборудования»", "ООО «Бийский завод энергетического оборудования» / БзЭО", "не указано", "Сайт не открылся в сверке 18.11.2026.", [
    row("kotel122", "ООО «Бийский завод энергетического оборудования»", "water", "/catalog/firetube.jpg", "Сайт не открылся в сверке 18.11.2026.", null, null, null, null, "Цифры ряда не сняты", "Сайт не открылся в сверке 18.11.2026."),
  ]),
  one("kotlosnab", "ПромКотлоСнаб", "ПромКотлоСнаб / Группа ПКС", "не указано", "Котельные", [
    row("kotlosnab", "ПромКотлоСнаб", "water", "/catalog/firetube.jpg", "Котельные", null, null, null, null, "Цифры ряда не сняты", "Котельные"),
  ]),
  one("kromschroder", "Kromschröder", "Kromschröder / Honeywell Thermal Solutions", "не указано", "Automating Quality Infrastructure with TrackWise Digital", [
    row("kromschroder", "Kromschröder", "auto", "/catalog/cabinet.jpg", "Automating Quality Infrastructure with TrackWise Digital", null, null, null, null, "Цифры ряда не сняты", "Automating Quality Infrastructure with TrackWise Digital"),
  ]),
  one("kts-bulat", "Теплоэнергетик", "Теплоэнергетик / БУЛАТ", "не указано", "На главной несколько диапазонов без имён серий.", [
    row("kts-bulat", "Теплоэнергетик", "water", "/catalog/firetube.jpg", "12–1500 кВт", 12, 1500, null, null, "12–1500 кВт", "Полосы: 12–98, 45–65, 80–130, 80–150, 160–750, 750–1500 кВт."),
  ]),
  one("lamborghini-calor", "Lamborghini Calor", "Lamborghini Calor", "не указано", "На открытой странице числовой ряд не найден.", [
    row("lamborghini-calor", "Lamborghini Calor", "auto", "/catalog/cabinet.jpg", "На открытой странице числовой ряд не найден.", null, null, null, null, "Цифры ряда не сняты", "На открытой странице числовой ряд не найден."),
  ]),
  one("lattner-boiler", "Lattner Boiler", "Lattner Boiler", "не указано", "Два ряда в лошадиных силах: 3–20 hp и 9,5–50 hp. В кВт не переводил.", [
    row("lattner-boiler", "Lattner", "steam", "/catalog/steam.jpg", "3–20 hp и 9,5–50 hp", null, null, null, null, "3–20 hp и 9,5–50 hp", "По 8 типоразмеров. Перевод hp в кВт не делался."),
  ]),
  one("leroux-lotz-technologies", "Leroux & Lotz Technologies", "Leroux & Lotz Technologies", "не указано", "На открытой странице числовой ряд не найден.", [
    row("leroux-lotz-technologies", "Leroux & Lotz Technologies", "water", "/catalog/firetube.jpg", "На открытой странице числовой ряд не найден.", null, null, null, null, "Цифры ряда не сняты", "На открытой странице числовой ряд не найден."),
  ]),
  one("master-climate-solutions", "Master Climate Solutions", "Master Climate Solutions / Dantherm", "не указано", "На открытой странице числовой ряд не найден.", [
    row("master-climate-solutions", "Master Climate Solutions", "air", "/catalog/web-air.jpg", "На открытой странице числовой ряд не найден.", null, null, null, null, "Цифры ряда не сняты", "На открытой странице числовой ряд не найден."),
  ]),
  one("mimsan", "Mimsan", "Mimsan", "не указано", "MWe Kurulu Güç", [
    row("mimsan", "Mimsan", "water", "/catalog/firetube.jpg", "MWe Kurulu Güç", null, null, null, null, "Цифры ряда не сняты", "MWe Kurulu Güç"),
  ]),
  one("modine", "Modine", "Modine", "не указано", "Сайт не открылся в сверке 18.11.2026.", [
    row("modine", "Modine", "air", "/catalog/web-air.jpg", "Сайт не открылся в сверке 18.11.2026.", null, null, null, null, "Цифры ряда не сняты", "Сайт не открылся в сверке 18.11.2026."),
  ]),
  one("niversal-kazan", "Üniversal Kazan", "Üniversal Kazan", "не указано", "Сайт не открылся в сверке 18.11.2026.", [
    row("niversal-kazan", "Üniversal Kazan", "water", "/catalog/firetube.jpg", "Сайт не открылся в сверке 18.11.2026.", null, null, null, null, "Цифры ряда не сняты", "Сайт не открылся в сверке 18.11.2026."),
  ]),
  one("nzeo", "NZEO", "НПО «Новоалтайский завод энергетического оборудования» / NZEO", "не указано", "На странице назван ДСЕ-2,5-14 ГМ. Из имени мощность не выводилась.", [
    row("nzeo", "НЗЭО ДСЕ-2,5-14 ГМ", "steam", "/catalog/steam.jpg", "цифры из имени не брались", null, null, null, null, "цифры из имени не брались", "Карточка модели не открывалась."),
  ]),
  one("osby-parca", "Osby Parca", "VEÅ / Osby Parca", "не указано", "Пар и горячая вода, на странице потолок 30 МВт.", [
    row("osby-parca", "Osby Parca", "water", "/catalog/firetube.jpg", "до 30 МВт", null, 30000, null, null, "до 30 МВт", "Нижняя граница не указана. Страница говорит и о паре, и о горячей воде."),
  ]),
  one("pavlovskiy-kotelnyy-zavod", "Павловский котельный завод", "Павловский котельный завод / ПКЗ", "не указано", "Котлы квр водогрейные. Купить в Барнауле производства Павловского котельного завода", [
    row("pavlovskiy-kotelnyy-zavod", "Павловский котельный завод", "water", "/catalog/firetube.jpg", "Котлы квр водогрейные. Купить в Барнауле производства Павловского котельного завода", null, null, null, null, "Цифры ряда не сняты", "Котлы квр водогрейные. Купить в Барнауле производства Павловского котельного завода"),
  ]),
  one("pbs-power-equipment", "PBS POWER EQUIPMENT", "PBS POWER EQUIPMENT", "не указано", "На открытой странице числовой ряд не найден.", [
    row("pbs-power-equipment", "PBS POWER EQUIPMENT", "water", "/catalog/firetube.jpg", "На открытой странице числовой ряд не найден.", null, null, null, null, "Цифры ряда не сняты", "На открытой странице числовой ряд не найден."),
  ]),
  one("pkko", "ПО «Теплоресурс»", "ПО «Теплоресурс»", "не указано", "Котельные, ТЭЦ", [
    row("pkko", "ПО «Теплоресурс»", "water", "/catalog/firetube.jpg", "Котельные, ТЭЦ", null, null, null, null, "Цифры ряда не сняты", "Котельные, ТЭЦ"),
  ]),
  one("pkpotenzial", "Производственный комплекс «Потенциал»", "Производственный комплекс «Потенциал»", "не указано", "ПК Потенциал - производитель парогенераторов, термоупаковочных машин и спецоборудования", [
    row("pkpotenzial", "Производственный комплекс «Потенциал»", "water", "/catalog/firetube.jpg", "ПК Потенциал - производитель парогенераторов, термоупаковочных машин и спецоборудования", null, null, null, null, "Цифры ряда не сняты", "ПК Потенциал - производитель парогенераторов, термоупаковочных машин и спецоборудования"),
  ]),
  one("powrmatic", "Powrmatic", "Powrmatic", "не указано", "KW Output", [
    row("powrmatic", "Powrmatic", "air", "/catalog/web-air.jpg", "KW Output", null, null, null, null, "Цифры ряда не сняты", "KW Output"),
  ]),
  one("precision-boilers", "Precision Boilers", "Precision Boilers", "не указано", "Сайт не открылся в сверке 18.11.2026.", [
    row("precision-boilers", "Precision Boilers", "water", "/catalog/firetube.jpg", "Сайт не открылся в сверке 18.11.2026.", null, null, null, null, "Цифры ряда не сняты", "Сайт не открылся в сверке 18.11.2026."),
  ]),
  one("proboilers", "PROBOILERS", "PROBOILERS", "не указано", "PROBOILERS - Βιομηχανικοί Ατμολέβητες", [
    row("proboilers", "PROBOILERS", "water", "/catalog/firetube.jpg", "PROBOILERS - Βιομηχανικοί Ατμολέβητες", null, null, null, null, "Цифры ряда не сняты", "PROBOILERS - Βιομηχανικοί Ατμολέβητες"),
  ]),
  one("prometey54", "Сибэнерготерм", "Сибэнерготерм / Прометей", "не указано", "Завод котельного оборудования. Производство котлов ПРОМЕТЕЙ™", [
    row("prometey54", "Сибэнерготерм", "water", "/catalog/firetube.jpg", "Завод котельного оборудования. Производство котлов ПРОМЕТЕЙ™", null, null, null, null, "Цифры ряда не сняты", "Завод котельного оборудования. Производство котлов ПРОМЕТЕЙ™"),
  ]),
  one("promteplo", "ПромТепло", "ПромТепло / Железногорский завод отопительного оборудования и стальных конструкций", "не указано", "Котельный завод ПромТепло - Железногорск, Красноярск - Котлы отопления, модульные котельные, ТЭС и АТБУ", [
    row("promteplo", "ПромТепло", "water", "/catalog/firetube.jpg", "Котельный завод ПромТепло - Железногорск, Красноярск - Котлы отопления, модульные котельные, ТЭС и АТБУ", null, null, null, null, "Цифры ряда не сняты", "Котельный завод ПромТепло - Железногорск, Красноярск - Котлы отопления, модульные котельные, ТЭС и АТБУ"),
  ]),
  one("riexpo", "RIEXPO", "ООО «РИЭКСПО» / RIEXPO", "не указано", "Парогенераторы 250–1800 кВт.", [
    row("riexpo", "RIEXPO", "steam", "/catalog/steam.jpg", "250–1800 кВт", 250, 1800, null, null, "250–1800 кВт", "Фильтры сайта ещё делят до 100, 100–250, 250–500, 500–1000 и более 1000 кВт."),
  ]),
  one("rim-group", "RIM GROUP", "Теплостройпроект-С / RIM GROUP", "не указано", "RIM GROUP | Котельные и умное строительство под ключ", [
    row("rim-group", "RIM GROUP", "water", "/catalog/firetube.jpg", "RIM GROUP | Котельные и умное строительство под ключ", null, null, null, null, "Цифры ряда не сняты", "RIM GROUP | Котельные и умное строительство под ключ"),
  ]),
  one("riman", "RIMAN", "Теплогазстрой / RIMAN", "не указано", "Сайт не открылся в сверке 18.11.2026.", [
    row("riman", "RIMAN", "water", "/catalog/firetube.jpg", "Сайт не открылся в сверке 18.11.2026.", null, null, null, null, "Цифры ряда не сняты", "Сайт не открылся в сверке 18.11.2026."),
  ]),
  one("rostzip", "РОСТЗИП", "РОСТЗИП / Ростовский завод индукционных парогенераторов", "не указано", "Индукционные парогенераторы: 80–720 кВт и 240–1440 кВт.", [
    row("rostzip", "РОСТЗИП", "steam", "/catalog/steam.jpg", "80–1440 кВт", 80, 1440, null, null, "80–1440 кВт", "Два ряда на странице: 80–720 и 240–1440 кВт. Есть ещё 0,2063–1,2382 Гкал/ч."),
  ]),
  one("sarzem", "Сарэнергомаш", "Сарэнергомаш / Саратовский завод энергетического машиностроения", "не указано", "На открытой странице числовой ряд не найден.", [
    row("sarzem", "Сарэнергомаш", "water", "/catalog/firetube.jpg", "На открытой странице числовой ряд не найден.", null, null, null, null, "Цифры ряда не сняты", "На открытой странице числовой ряд не найден."),
  ]),
  one("sefako", "SEFAKO", "SEFAKO", "не указано", "На открытой странице числовой ряд не найден.", [
    row("sefako", "SEFAKO", "water", "/catalog/firetube.jpg", "На открытой странице числовой ряд не найден.", null, null, null, null, "Цифры ряда не сняты", "На открытой странице числовой ряд не найден."),
  ]),
  one("selnikel", "Selnikel", "Selnikel", "не указано", "На открытой странице числовой ряд не найден.", [
    row("selnikel", "Selnikel", "water", "/catalog/firetube.jpg", "На открытой странице числовой ряд не найден.", null, null, null, null, "Цифры ряда не сняты", "На открытой странице числовой ряд не найден."),
  ]),
  one("semm", "Элеватормельмаш", "Элеватормельмаш / АО «ЭММ» (Кропоткин)", "не указано", "Котлы паровые, водогрейные, горизонтальные, вертикальные, газовые,", [
    row("semm", "Элеватормельмаш", "water", "/catalog/firetube.jpg", "Котлы паровые, водогрейные, горизонтальные, вертикальные, газовые,", null, null, null, null, "Цифры ряда не сняты", "Котлы паровые, водогрейные, горизонтальные, вертикальные, газовые,"),
  ]),
  one("ses-tlma-e", "SES Tlmače", "SES Tlmače", "не указано", "Bocamina II, 1215 t/h, Čile", [
    row("ses-tlma-e", "SES Tlmače", "water", "/catalog/firetube.jpg", "Bocamina II, 1215 t/h, Čile", null, null, null, null, "Цифры ряда не сняты", "Bocamina II, 1215 t/h, Čile"),
  ]),
  one("sfera-zavod", "Котельный завод «Сфера»", "Котельный завод «Сфера»", "не указано", "Котельный завод СФЕРА. г.Барнаул.", [
    row("sfera-zavod", "Котельный завод «Сфера»", "water", "/catalog/firetube.jpg", "Котельный завод СФЕРА. г.Барнаул.", null, null, null, null, "Цифры ряда не сняты", "Котельный завод СФЕРА. г.Барнаул."),
  ]),
  one("sibteplomash22", "Сибтепломаш (Барнаул)", "Сибтепломаш (Барнаул)", "не указано", "На главной КВр-0,12, КВр-0,23 и КВр-0,35. Единица у индекса не подписана.", [
    row("sibteplomash22", "Сибтепломаш КВр", "water", "/catalog/firetube.jpg", "единица не подписана", null, null, null, null, "единица не подписана", "Индекс не переводился в кВт или МВт."),
  ]),
  one("sibtm", "НКЗ «Сибтепломаш» (Новосибирск)", "НКЗ «Сибтепломаш» (Новосибирск)", "не указано", "Сайт не открылся в сверке 18.11.2026.", [
    row("sibtm", "НКЗ «Сибтепломаш» (Новосибирск)", "water", "/catalog/firetube.jpg", "Сайт не открылся в сверке 18.11.2026.", null, null, null, null, "Цифры ряда не сняты", "Сайт не открылся в сверке 18.11.2026."),
  ]),
  one("sime", "SIME", "SIME", "не указано", "5802301 - QUADRO ELETTR.TRIFASE MEM 33KW", [
    row("sime", "SIME", "water", "/catalog/firetube.jpg", "5802301 - QUADRO ELETTR.TRIFASE MEM 33KW", null, null, null, null, "Цифры ряда не сняты", "5802301 - QUADRO ELETTR.TRIFASE MEM 33KW"),
  ]),
  one("sioux-corporation", "Sioux Corporation", "Sioux Corporation", "не указано", "Steam Generators", [
    row("sioux-corporation", "Sioux Corporation", "water", "/catalog/firetube.jpg", "Steam Generators", null, null, null, null, "Цифры ряда не сняты", "Steam Generators"),
  ]),
  one("standardkessel-baumgarte", "Standardkessel Baumgarte", "Standardkessel Baumgarte", "не указано", "На открытой странице числовой ряд не найден.", [
    row("standardkessel-baumgarte", "Standardkessel Baumgarte", "water", "/catalog/firetube.jpg", "На открытой странице числовой ряд не найден.", null, null, null, null, "Цифры ряда не сняты", "На открытой странице числовой ряд не найден."),
  ]),
  one("stankoterm", "Станкотерм", "Станкотерм", "не указано", "Электропарогенератор ЭЭП", [
    row("stankoterm", "Станкотерм ЭЭП — тип электрического парогенератора", "steam", "/catalog/cabinet.jpg", "Электропарогенератор ЭЭП, без списка подтверждённых исполнений.", null, null, null, null, "Электропарогенератор; типоразмеры не внесены", "Нужна таблица серии ЭЭП по официальной документации."),
  ]),
  one("steam-technologies", "Steam Technologies", "Паровые технологии / Steam Technologies", "не указано", "Компания-производитель «Steam Technologies» - газовые и дизельные парогенераторы", [
    row("steam-technologies", "Steam Technologies", "water", "/catalog/firetube.jpg", "Компания-производитель «Steam Technologies» - газовые и дизельные парогенераторы", null, null, null, null, "Цифры ряда не сняты", "Компания-производитель «Steam Technologies» - газовые и дизельные парогенераторы"),
  ]),
  one("steampressor-hybrid", "STEAMPRESSOR HYBRID", "ТЕХНОПАР / STEAMPRESSOR HYBRID", "не указано", "Завод мобильных парогенераторов ТЕХНОПАР", [
    row("steampressor-hybrid", "ТЕХНОПАР STEAMPRESSOR HYBRID", "steam", "/catalog/steam.jpg", "Мобильные парогенераторы, исполнение и параметры уточняются.", null, null, null, null, "Парогенератор, не водогрейная серия", "Конкретный типоразмер и паспорт необходимо подтвердить."),
  ]),
  one("sugimat", "Sugimat", "Sugimat", "не указано", "Potencia: De 0.35 a 30 MW", [
    row("sugimat", "Sugimat", "water", "/catalog/firetube.jpg", "Potencia: De 0.35 a 30 MW", null, null, null, null, "Цифры ряда не сняты", "Potencia: De 0.35 a 30 MW"),
  ]),
  one("sumitomo-shi-fw", "Sumitomo SHI FW", "Sumitomo SHI FW", "не указано", "Circulating fluidized bed boilers", [
    row("sumitomo-shi-fw", "Sumitomo SHI FW", "water", "/catalog/firetube.jpg", "Circulating fluidized bed boilers", null, null, null, null, "Цифры ряда не сняты", "Circulating fluidized bed boilers"),
  ]),
  one("systema", "Systema", "Systema", "не указано", "1 Nastro URHE-R da 115kW, su 39 metri di circuito radiante", [
    row("systema", "Systema", "air", "/catalog/web-air.jpg", "1 Nastro URHE-R da 115kW, su 39 metri di circuito radiante", null, null, null, null, "Цифры ряда не сняты", "1 Nastro URHE-R da 115kW, su 39 metri di circuito radiante"),
  ]),
  one("takuma", "TAKUMA", "TAKUMA", "не указано", "Municipal solid waste treatment plants, Boiler plants | TAKUMA", [
    row("takuma", "TAKUMA", "water", "/catalog/firetube.jpg", "Municipal solid waste treatment plants, Boiler plants | TAKUMA", null, null, null, null, "Цифры ряда не сняты", "Municipal solid waste treatment plants, Boiler plants | TAKUMA"),
  ]),
  one("tansu-industrial", "TANSU Industrial", "TANSU Industrial / ТАНСУ", "не указано", "Паровые и термомасляные 500–3000 кВт, без высокого давления.", [
    row("tansu-industrial", "TANSU, пар", "steam", "/catalog/steam.jpg", "500–3000 кВт", 500, 3000, null, null, "500–3000 кВт", "Один диапазон на пар и термомасло."),
    row("tansu-industrial-2-2", "TANSU, термомасло", "oil", "/catalog/steam.jpg", "500–3000 кВт", 500, 3000, null, null, "500–3000 кВт", "Давление страница называет невысоким, цифры нет."),
  ]),
  one("tecnoclima", "Tecnoclima", "Tecnoclima", "не указано", "На открытой странице числовой ряд не найден.", [
    row("tecnoclima", "Tecnoclima", "air", "/catalog/web-air.jpg", "На открытой странице числовой ряд не найден.", null, null, null, null, "Цифры ряда не сняты", "На открытой странице числовой ряд не найден."),
  ]),
  one("tehnofleym", "ТЕХНОФЛЭЙМ", "ТЕХНОФЛЭЙМ / TECHNOFLAME", "не указано", "На главной названы горелки 750, 1300, 2000, 2500, 3000, 5000, 10000 кВт и 45 МВт.", [
    row("tehnofleym", "ТЕХНОФЛЭЙМ", "auto", "/catalog/cabinet.jpg", "примеры с главной", 750, 45000, null, null, "примеры с главной", "Это не полный ряд: только мощности, которые попали на главную."),
  ]),
  one("teploelektromash", "ТЕПЛОЭЛЕКТРОМАШ", "ТЕПЛОЭЛЕКТРОМАШ", "не указано", "Модернизация котельных", [
    row("teploelektromash", "ТЕПЛОЭЛЕКТРОМАШ", "air", "/catalog/web-air.jpg", "Модернизация котельных", null, null, null, null, "Цифры ряда не сняты", "Модернизация котельных"),
  ]),
  one("teplomash", "Тепломаш", "Тепломаш", "не указано", "На открытой странице числовой ряд не найден.", [
    row("teplomash", "Тепломаш", "air", "/catalog/web-air.jpg", "На открытой странице числовой ряд не найден.", null, null, null, null, "Цифры ряда не сняты", "На открытой странице числовой ряд не найден."),
  ]),
  one("termorobot", "Тепловые машины", "Тепловые машины / Терморобот", "не указано", "Автоматические угольные отопительные котлы и модульные котельные Терморобот", [
    row("termorobot", "Тепловые машины", "water", "/catalog/firetube.jpg", "Автоматические угольные отопительные котлы и модульные котельные Терморобот", null, null, null, null, "Цифры ряда не сняты", "Автоматические угольные отопительные котлы и модульные котельные Терморобот"),
  ]),
  one("termotek", "НПП «Теплотехника» (Октябрьский)", "НПП «Теплотехника» (Октябрьский)", "не указано", "Теплотехника — парогенераторы и электроотопительное оборудование", [
    row("termotek", "НПП «Теплотехника» (Октябрьский)", "water", "/catalog/firetube.jpg", "Теплотехника — парогенераторы и электроотопительное оборудование", null, null, null, null, "Цифры ряда не сняты", "Теплотехника — парогенераторы и электроотопительное оборудование"),
  ]),
  one("termowood", "Ковровские котлы", "Ковровские котлы / Гейзер", "не указано", "Котельный завод ООО КОВРОВСКИЕ КОТЛЫ", [
    row("termowood", "Ковровские котлы", "water", "/catalog/firetube.jpg", "Котельный завод ООО КОВРОВСКИЕ КОТЛЫ", null, null, null, null, "Цифры ряда не сняты", "Котельный завод ООО КОВРОВСКИЕ КОТЛЫ"),
  ]),
  one("thermobile", "Thermobile", "Thermobile", "не указано", "Nederlandse kwaliteit sinds 1958", [
    row("thermobile", "Thermobile", "air", "/catalog/web-air.jpg", "Nederlandse kwaliteit sinds 1958", null, null, null, null, "Цифры ряда не сняты", "Nederlandse kwaliteit sinds 1958"),
  ]),
  one("thermogroup", "Thermogroup", "Thermogroup", "не указано", "Полосы до 100 кВт, до 500 кВт, 500 кВт – 1 МВт и 1–5 МВт.", [
    row("thermogroup", "Thermogroup", "water", "/catalog/firetube.jpg", "до 5 МВт", null, 5000, null, null, "до 5 МВт", "Нижняя граница всего ряда не задана. 2,5 МВт в тексте — объект, не модель."),
  ]),
  one("thermostahl-solar", "Thermostahl Solar", "Thermostahl Solar", "не указано", "На открытой странице числовой ряд не найден.", [
    row("thermostahl-solar", "Thermostahl Solar", "water", "/catalog/firetube.jpg", "На открытой странице числовой ряд не найден.", null, null, null, null, "Цифры ряда не сняты", "На открытой странице числовой ряд не найден."),
  ]),
  one("tis", "TIS", "БелКомин / TIS", "не указано", "Сайт не открылся в сверке 18.11.2026.", [
    row("tis", "TIS", "water", "/catalog/firetube.jpg", "Сайт не открылся в сверке 18.11.2026.", null, null, null, null, "Цифры ряда не сняты", "Сайт не открылся в сверке 18.11.2026."),
  ]),
  one("tkz", "ТКЗ «Красный котельщик»", "ТКЗ «Красный котельщик»", "не указано", "ТКЗ Красный котельщик", [
    row("tkz", "ТКЗ «Красный котельщик»", "water", "/catalog/firetube.jpg", "ТКЗ Красный котельщик", null, null, null, null, "Цифры ряда не сняты", "ТКЗ Красный котельщик"),
  ]),
  one("tts-boilers", "TTS boilers", "TTS eko / TTS boilers", "не указано", "Сайт не открылся в сверке 18.11.2026.", [
    row("tts-boilers", "TTS boilers", "water", "/catalog/firetube.jpg", "Сайт не открылся в сверке 18.11.2026.", null, null, null, null, "Цифры ряда не сняты", "Сайт не открылся в сверке 18.11.2026."),
  ]),
  one("tztis", "СТАЛЬТЕХ", "СТАЛЬТЕХ / Таганрогский завод теплогенерирующих индукционных систем", "не указано", "СТАЛЬТЕХ • Производство промышленных парогенераторов", [
    row("tztis", "СТАЛЬТЕХ", "water", "/catalog/firetube.jpg", "СТАЛЬТЕХ • Производство промышленных парогенераторов", null, null, null, null, "Цифры ряда не сняты", "СТАЛЬТЕХ • Производство промышленных парогенераторов"),
  ]),
  one("unilux-advanced-manufacturing", "UNILUX Advanced Manufacturing", "UNILUX Advanced Manufacturing", "не указано", "Сайт не открылся в сверке 18.11.2026.", [
    row("unilux-advanced-manufacturing", "UNILUX Advanced Manufacturing", "water", "/catalog/firetube.jpg", "Сайт не открылся в сверке 18.11.2026.", null, null, null, null, "Цифры ряда не сняты", "Сайт не открылся в сверке 18.11.2026."),
  ]),
  one("unisteam", "UNISTEAM", "Завод паровых установок ЮНИСТИМ / UNISTEAM", "не указано", "Парогенераторы 100, 200, 400 и 600 кВт.", [
    row("unisteam", "UNISTEAM", "steam", "/catalog/steam.jpg", "100–600 кВт", 100, 600, null, null, "100–600 кВт", "Ступени 100, 200, 400 и 600 кВт. Паропроизводительность в т/ч не указана."),
  ]),
  one("uralzavod-kotel", "ООО «Уральский завод»", "ООО «Уральский завод» / Нейтрон", "не указано", "Водогрейные ТВК 0,1–6 МВт.", [
    row("uralzavod-kotel", "ТВК", "water", "/catalog/firetube.jpg", "0,1–6 МВт", 100, 6000, null, null, "0,1–6 МВт", "Другие цифры на странице относятся к отгруженным котельным, не к ряду."),
  ]),
  one("urbas-maschinenfabrik", "URBAS Maschinenfabrik", "URBAS Maschinenfabrik", "не указано", "URBAS Energietechnik steht für Energie aus Biomasse. Wir realisieren Heizwerke und Heizkraftwerke zur Erzeugung von Warmwasser, Heisswasser, Prozessda", [
    row("urbas-maschinenfabrik", "URBAS Maschinenfabrik", "water", "/catalog/firetube.jpg", "URBAS Energietechnik steht für Energie aus Biomasse. Wir realisieren Heizwerke und Heizkraftwerke zur Erzeugung von Warmwasser, Heisswasser, Prozessda", null, null, null, null, "Цифры ряда не сняты", "URBAS Energietechnik steht für Energie aus Biomasse. Wir realisieren Heizwerke und Heizkraftwerke zur Erzeugung von Warmwasser, Heisswasser, Prozessda"),
  ]),
  one("valmet", "Valmet", "Valmet", "не указано", "Recovery boilers", [
    row("valmet", "Valmet", "water", "/catalog/firetube.jpg", "Recovery boilers", null, null, null, null, "Цифры ряда не сняты", "Recovery boilers"),
  ]),
  one("vapor-boilers", "Vapor Boilers", "Vapor Boilers", "не указано", "Etusivu | Vapor Boilers", [
    row("vapor-boilers", "Vapor Boilers", "water", "/catalog/firetube.jpg", "Etusivu | Vapor Boilers", null, null, null, null, "Цифры ряда не сняты", "Etusivu | Vapor Boilers"),
  ]),
  one("vapor-power", "Vapor Power", "Vapor Power", "не указано", "Сайт не открылся в сверке 18.11.2026.", [
    row("vapor-power", "Vapor Power", "water", "/catalog/firetube.jpg", "Сайт не открылся в сверке 18.11.2026.", null, null, null, null, "Цифры ряда не сняты", "Сайт не открылся в сверке 18.11.2026."),
  ]),
  one("vkk-standardkessel-k-then", "VKK STANDARDKESSEL Köthen", "VKK STANDARDKESSEL Köthen", "не указано", "Elektrokessel 8MW – Nordrhein-Westfalen", [
    row("vkk-standardkessel-k-then", "VKK STANDARDKESSEL — каталог серий не заполнен", "water", "/catalog/firetube.jpg", "Отдельный проект электрокотла 8 МВт не является модельным рядом.", null, null, null, null, "Проектная поставка — не серия", "Официальный ассортимент: https://vkkstandardkessel.de/en/our-products/"),
  ]),
  one("vkkgroup", "VKK Power (технологии KPA Unicon)", "VKK Power (технологии KPA Unicon)", "не указано", "На открытой странице числовой ряд не найден.", [
    row("vkkgroup", "VKK Power — модельный каталог не заполнен", "water", "/catalog/firetube.jpg", "Официально названы Biograte, Renefluid и Fire Tube Boilers; параметры не перенесены.", null, null, null, null, "Не считать названием компании серию", "Проверить точные параметры по https://vkkgroup.fi/en/solution/biograte/"),
  ]),
  one("vmex-turaz-group", "VMEX TURAZ GROUP", "VMEX / VMEX TURAZ GROUP", "не указано", "На главной несколько диапазонов кВт, имена серий не сняты.", [
    row("vmex-turaz-group", "VMEX", "water", "/catalog/firetube.jpg", "29–22 791 кВт", 29, 22791, null, null, "29–22 791 кВт", "Полосы со страницы: 93–5800, 93–4060, 59–1162, 326–22791, 65–3256, 93–4070, 698–14535, 1000–20000, 29–4999 кВт. К каким изделиям какая полоса — не подписано."),
  ]),
  one("vts-group", "VTS Group", "VTS Group / VOLCANO", "не указано", "На открытой странице числовой ряд не найден.", [
    row("vts-group", "VTS Group", "air", "/catalog/web-air.jpg", "На открытой странице числовой ряд не найден.", null, null, null, null, "Цифры ряда не сняты", "На открытой странице числовой ряд не найден."),
  ]),
  one("weiss-france-nergie", "Weiss France Énergie", "Weiss France Énergie", "не указано", "Compiègne : Installation d’une chaudière bois de 14 MW", [
    row("weiss-france-nergie", "Weiss France Énergie", "water", "/catalog/firetube.jpg", "Compiègne : Installation d’une chaudière bois de 14 MW", null, null, null, null, "Цифры ряда не сняты", "Compiègne : Installation d’une chaudière bois de 14 MW"),
  ]),
  one("williams-davis-boilers", "Williams & Davis Boilers", "Williams & Davis Boilers", "не указано", "WD Boilers | Firetube | Scotch Marine | Vertical Tubeless | Steam Hotwater", [
    row("williams-davis-boilers", "Williams & Davis Boilers", "water", "/catalog/firetube.jpg", "WD Boilers | Firetube | Scotch Marine | Vertical Tubeless | Steam Hotwater", null, null, null, null, "Цифры ряда не сняты", "WD Boilers | Firetube | Scotch Marine | Vertical Tubeless | Steam Hotwater"),
  ]),
  one("york-shipley-global", "York-Shipley Global", "York-Shipley Global", "не указано", "York-Shipley Boilers", [
    row("york-shipley-global", "York-Shipley Global", "water", "/catalog/firetube.jpg", "York-Shipley Boilers", null, null, null, null, "Цифры ряда не сняты", "York-Shipley Boilers"),
  ]),
  one("zander-ingestr-m", "Zander & Ingeström", "Zander & Ingeström", "не указано", "На открытой странице числовой ряд не найден.", [
    row("zander-ingestr-m", "Zander & Ingeström", "water", "/catalog/firetube.jpg", "На открытой странице числовой ряд не найден.", null, null, null, null, "Цифры ряда не сняты", "На открытой странице числовой ряд не найден."),
  ]),
  one("zaomes", "ПО «Межрегионэнергосервис»", "ПО «Межрегионэнергосервис» / МЭС", "не указано", "Паровые и водогрейные котлы", [
    row("zaomes", "ПО «Межрегионэнергосервис»", "water", "/catalog/firetube.jpg", "Паровые и водогрейные котлы", null, null, null, null, "Цифры ряда не сняты", "Паровые и водогрейные котлы"),
  ]),
  one("zeeco", "Zeeco", "Zeeco", "не указано", "Power & Steam", [
    row("zeeco", "Zeeco", "auto", "/catalog/cabinet.jpg", "Power & Steam", null, null, null, null, "Цифры ряда не сняты", "Power & Steam"),
  ]),
  one("zzbo", "ЗЗБО", "ЗЗБО / TEPLO (Златоустовский завод бетоносмесительного оборудования)", "не указано", "Общая мощность, кВт", [
    row("zzbo", "ЗЗБО", "water", "/catalog/firetube.jpg", "Общая мощность, кВт", null, null, null, null, "Цифры ряда не сняты", "Общая мощность, кВт"),
  ]),
];

export function fillBySlug(slug: string) {
  return fills.find((item) => item.slug === slug);
}

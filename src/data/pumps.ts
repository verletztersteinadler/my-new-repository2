/**
 * Research import from user-supplied "KOTLY_PRO_PUMP_MANUFACTURERS_2026-11-16.xlsx"
 * "Все насосы" and "Типы насосов и SEO" dated 2026-11-16.
 *
 * Only priority A records are displayed, explicitly as UNVERIFIED research entries.
 * B is backlog; C is reserve and MUST NOT be published automatically.
 * A series name here is a string from a source register, NOT a verified model
 * with Q-H curve, flow, head, temperature, pressure or manufacturer identity.
 * Do not infer compatibility with a boiler-house duty from these records.
 */
export type PumpRoleId =
  | "network" | "circulation" | "makeup" | "feedwater" | "condensate"
  | "thermal-oil" | "fuel" | "dosing" | "drainage" | "booster";

export type PumpRole = {
  id: PumpRoleId;
  name: string;
  purpose: string;
  required: string;
  caution: string;
};

export const pumpRoles: PumpRole[] = [
  { id:"network", name:"Сетевые насосы", purpose:"Перекачивание воды в тепловых сетях", required:"Q, H, t, P, N, n, КПД, NPSHr, DN", caution:"Не смешивать сетевой насос с малым циркуляционным" },
  { id:"circulation", name:"Котловые циркуляционные", purpose:"Циркуляция воды через водогрейный котёл", required:"Q, H, t, P, теплоноситель, ротор, PN, материал", caution:"Не утверждать температурную пригодность без паспорта" },
  { id:"makeup", name:"Подпиточные насосы", purpose:"Поддержание давления в котловом контуре", required:"Q, H, P, NPSHr, материал, частота, исполнение", caution:"Не путать рабочий и максимальный напор" },
  { id:"feedwater", name:"Питательные насосы", purpose:"Питательная вода паровых котлов", required:"Q, H, t, P, NPSHr, кавитационный запас, число ступеней", caution:"Нужны проверка NPSH и запас давления" },
  { id:"condensate", name:"Конденсатные насосы", purpose:"Конденсат и питание деаэратора", required:"Q, H, t, высота подпора, NPSHr, материал", caution:"Не смешивать конденсатные и дренажные насосы" },
  { id:"thermal-oil", name:"Насосы для термомасла", purpose:"Высокотемпературный органический теплоноситель", required:"Q, H, tmax, вязкость, плотность, уплотнения, материал", caution:"Совместимость масла подтверждается изготовителем" },
  { id:"fuel", name:"Насосы для жидкого топлива", purpose:"Дизель, мазут и топливо горелочных устройств", required:"Расход, давление, вязкость, температура, взрывозащита", caution:"Водяной насос нельзя рекомендовать для топлива" },
  { id:"dosing", name:"Дозирующие насосы", purpose:"Химводоочистка, реагенты", required:"Расход, давление, реагент, материал мембраны, точность", caution:"Нужна проверка химической совместимости" },
  { id:"drainage", name:"Дренаж и КНС", purpose:"Удаление воды и сточных масс", required:"Q, H, допустимые включения, IP, материал", caution:"Бытовые модели не считать промышленными" },
  { id:"booster", name:"Повысительные установки", purpose:"Водоснабжение, поддержание давления", required:"Q, H, число насосов, резерв, ЧРП, PN", caution:"Резервирование подтверждается схемой установки" },
];

export type PumpResearchManufacturer = {
  id: string;
  name: string;
  site: string;
  catalog: string;
  country: string;
  entity: string;
  applications: string;
  seriesNames: string;
  reference: string;
  caveat: string;
  priority: "A";
  editorialStatus: "source-register-unverified";
};

/** Values copied from the workbook; URLs and applicability require rechecking. */
const pilotRows: Array<[string,string,string,string,string,string,string,string,string]> = [
  ["ГМС Ливгидромаш","https://www.hms-livgidromash.ru/","https://www.hms-livgidromash.ru/catalog/","Россия","Завод","Сетевые, котловые, подпиточные, питательные, конденсатные, топливные","К, КМ, Boosta, Kordis, ЦНС, Кс, НМШ","https://www.hms-livgidromash.ru/documentation/advertising-materials/264/","Имеются технические каталоги серий и изделия для котельных."],
  ["Катайский насосный завод (КНЗ)","https://knz.ru/","https://knz.ru/catalog/nasosy-dlya-vody","Россия","Завод","Сетевые, подпиточные, конденсатные, консольные","К, КМ, ЛМ, Д, ЦНС, конденсатные","https://knz.ru/catalog/ekspluatatsionnaya-informatsiya","На сайте отдельные разделы горячей воды, конденсата и руководств."],
  ["ЭНА","https://www.ena.ru/","https://www.ena.ru/products/nasosy_vodoteplosnabj/","Россия","Завод","Циркуляция, ГВС, подпитка, промышленность","К, КМ, КМЛ, ЦМНШ, СМ","https://www.ena.ru/products/nasosy_vodoteplosnabj/",""],
  ["ИСТРАТЕХ","https://www.istratex.ru/","https://www.istratex.ru/catalog/","Россия","Завод","Циркуляция отопления, сетевые, подпиточные, повышение давления","BM(N), BO, KMG, MP, HC","https://www.istratex.ru/reference-list/gazprom-teploenergo-mo/","Ранее «Грундфос Истра»; не смешивать с Grundfos."],
  ["SVN PUMP","https://svnpump.ru/","https://svnpump.ru/catalog/nasosy/","Россия","Производственный бренд","Сетевые, in-line, моноблочные, многоступенчатые, циркуляция","SVN NPM, SVN DL, DLF, NPC","https://svnpump.ru/","Не путать с неподтверждённым названием SNP."],
  ["ГМС Ливнынасос","https://www.livnasos.ru/","https://www.livnasos.ru/catalog/","Россия","Завод","Подпитка, водоснабжение, повышение давления, скважинные","Boosta, APD Boosta, ЭЦВ, Ciris","https://livnasos.pro/documents/Tekhnicheskie%20katalogi/","Отдельное юрлицо группы ГМС, не тождественно Ливгидромаш."],
  ["ВИЛЛИНА","https://villina.ru/","https://villina.ru/product/","Россия","Завод","Термомасло, химические жидкости, высокотемпературные среды","Герметичные горизонтальные, полупогружные, многоступенчатые","https://villina.ru/product/",""],
  ["Валдайский механический завод","https://www.vmz-nasos.ru/","https://www.vmz-nasos.ru/catalog.html","Россия","Завод","Консольные, подпитка, конденсат, циркуляция","К, КМ, ЦНСГ, Кс, ЦНЛ, НМШ","https://www.vmz-nasos.ru/","Не включать снятые с производства исполнения."],
  ["UNIPUMP","https://www.unipump.ru/","https://www.unipump.ru/catalog--nasosy/","Россия","Производственный/торговый бренд","Циркуляция, подпитка, повышение давления, КНС","VM, SVH, CM, UPF, PF, FC, FS","https://unipump.ru/upload/iblock/f3a/axtvll6h0o6zmfyhmfiwns942x4zmjey/Katalog-2026.-Promyshlennoe-oborudovanie.pdf","Изготовитель конкретной модели может отличаться."],
  ["Ридан (Ridan)","https://ridan.ru/","https://ridan.ru/catalog/1487/nasosy","Россия","Торгово-производственный бренд","Сетевые, циркуляция, подпитка, повышение давления","RW, RWE, RV, RMV, RMHI, RH","https://ridan.ru/instruments/configurator-pumps","Бренд; не утверждать собственное производство каждой серии."],
  ["Grundfos","https://www.grundfos.com/","https://product-selection.grundfos.com/","Дания","Завод/группа","Сетевые, циркуляция, подпитка, питательные, дозирование","MAGNA, TPE, CR, CRE, NK, NB","https://www.grundfos.com/solutions/support/select-configure-tendering","Динамический конфигуратор; соблюдать условия доступа."],
  ["Wilo","https://wilo.com/","https://wilo.com/us/en_us/Products/en_us/products","Германия","Завод/группа","Сетевые, циркуляция, подпитка, повышение давления","Stratos, Crono, Helix, IL, IPL","https://wilo.com/us/en_us/Products/en_us/products","Не смешивать исполнения 50 и 60 Гц."],
  ["KSB","https://www.ksb.com/","https://www.ksb.com/en-gb/product/product-catalogue?productType=PUMP","Германия","Завод/группа","Питательные, сетевые, циркуляция, конденсат, промышленные","Etanorm, Etaline, Movitec, Calio, Multitec","https://www.ksb.com/en-gb/product/product-catalogue?productType=PUMP","Отделять энергетические насосы от обычных котельных."],
  ["DAB Pumps","https://www.dabpumps.com/","https://www.dabpumps.com/en_en/products/catalog","Италия","Завод","Циркуляция, сетевые, подпитка, повышение давления","Evosta, Evoplus, KLM, KV, KDN","https://www.dabpumps.com/en_en/products","Есть общий технический каталог 2026."],
  ["Lowara (Xylem)","https://www.xylem.com/","https://www.xylem.com/en-na/brands/lowara/lowara-products/","Италия","Производственный бренд группы","Циркуляция, подпитка, сетевые, повышение давления","e-SV, e-LNE, e-NSC, e-HM","https://www.xylem.com/nl-nl/brand/lowara/","Марка холдинга Xylem, не отдельный завод."],
  ["Ebara","https://www.ebaraeurope.com/","https://ebara.com/global-en/building-industry/standard-pump/","Япония/Италия","Завод/группа","Циркуляция, подпитка, дренаж, повышение давления","3D, EVM, DWC","https://ebara.com/global-en/building-industry/standard-pump/","Прямая ссылка на каталог требует дополнительной проверки."],
  ["Calpeda","https://www.calpeda.com/","https://www.calpeda.com/en/products/","Италия","Завод","Циркуляция, подпитка, многоступенчатые, КНС","NCE, NM, MXV, BS","https://www.calpeda.com/en/products/",""],
  ["SAER Elettropompe","https://www.saerelettropompe.com/","https://www.saerelettropompe.com/en/products/product-filter-search-results.html","Италия","Завод","Сетевые, подпиточные, двухстороннего входа, питательная вода","IR, NCB, SKD, L, TM, TMV","https://www.saerelettropompe.com/en/products.html","Часть паспортов может требовать регистрации."],
  ["IMP Pumps","https://imp-pumps.com/","https://imp-pumps.com/pumps/","Словения","Завод","Циркуляция отопления, in-line, подпитка","NMT, CL, ECL, BL","https://www.c-o-k.ru/articles/cirkulyacionnye-nasosy-dlya-sistem-otopleniya-kak-perestroilsya-rossiyskiy-rynok","Отраслевые данные по выручке не заменяют технический паспорт."],
  ["HERMETIC-Pumpen","https://www.hermetic-pumpen.com/","https://www.hermetic-pumpen.com/us-en/products/canned-motor-pump/canned-motor-pumps-with-explosion-protection","Германия","Завод","Термомасло, высокотемпературные жидкости, герметичные","Canned motor pumps","https://www.hermetic-pumpen.com/us-en/products/canned-motor-pump/canned-motor-pumps-with-explosion-protection","Требуется сверить исполнение для термомасла."],
  ["DICKOW PUMPEN","https://www.dickow.de/","https://www.dickow.de/index.php/en/products-equipment","Германия","Завод","Термомасло, топлива, высокотемпературные герметичные","NMWR, NMR, HZMA","https://www.dickow.de/index.php/en/products-equipment","Условия применения проверяются по конкретной серии."],
  ["ALLWEILER","https://www.allweiler.com/","https://pumps.circor.com/allweiler","Германия","Завод/бренд группы","Термомасло, мазут, дизельное топливо, промышленные жидкости","NT, NTT, NEMO","https://pumps.circor.com/allweiler","Проверить актуального правообладателя марки."],
  ["ProMinent","https://www.prominent.com/","https://www.prominent.com/en/Products/Products/Process-Metering-Pumps/pg-process-metering-pumps.html","Германия","Завод","Химводоочистка, дозирование реагентов","gamma, Sigma, DULCO","https://www.prominent.com/en/Products/Products/Process-Metering-Pumps/pg-process-metering-pumps.html","Дозирующие насосы, не сетевые."],
  ["CNP Nanfang Pump Industry","https://www.cnprussia.ru/","https://www.cnprussia.ru/catalog/cnp/","Китай","Завод/группа","Сетевые, циркуляция, подпитка, КНС, дозирование","CDM, CDMF, TD, TDE, NSC, NIS","https://www.cnprussia.ru/","Не дублировать с брендом CNP Russia."],
  ["SHINHOO","https://www.shinhoopump.com/","https://www.shinhoopump.com/products","Китай","Завод/бренд","Циркуляция отопления","Mega, Master SD, Classic, Basic","https://www.shinhoopump.com/products","Не считать все бытовые исполнения промышленными."],
];

export const pumpPilotCompanies: PumpResearchManufacturer[] = pilotRows.map((row, index) => ({
  id: "pump-a-" + String(index + 1).padStart(2, "0"),
  name: row[0], site: row[1], catalog: row[2], country: row[3],
  entity: row[4], applications: row[5], seriesNames: row[6],
  reference: row[7], caveat: row[8],
  priority: "A", editorialStatus: "source-register-unverified",
}));

/** B/C are reference-backlog names, NOT public manufacturer cards. */
export const pumpBacklogNames = {
  B: "Уралгидромаш|Пермские насосы|Димитровградхиммаш|Энергия — насосы и арматура (МНЗ)|МЗ ПОТОК|ГК «Гидромаш» (Челябинск)|АО «Насосный завод», Екатеринбург|Астерион|Гидрогаз|АО ЛГМ|Завод им. Гаджиева|МСВ-НАСКО|VALTEC|PUMPMAN / TAIFU|Акварио / Aquario|VALFEX|Oasis|Бобруйский машиностроительный завод (ГМС)|Промбурвод|Pedrollo|Speroni|Caprari|ESPA|Biral|DESMI|HOMA Pumpen|Sulzer|NETZSCH Pumps & Systems|SEEPEX|Wangen Pumpen|LEWA|Verder / Verder Liquids|Tapflo|SPX FLOW / Johnson Pump|Ruhrpumpen|Andritz Pumps|Flowserve|Goulds Pumps (ITT)|Bell & Gossett (Xylem)|Flygt (Xylem)|Franklin Electric|Viking Pump|Milton Roy|Iwaki|Tsurumi|Torishima|AIKON|LEO Group|Shimge|Taifu|Kaiquan|Masdaf|ETNA Pump|Standart Pompa|Kirloskar Brothers (KBL)|C.R.I. Pumps".split("|"),
  C: "Турбонасос|Транснефть — Нефтяные насосы (ТНН)|Пензкомпрессормаш|Нефтемаш-Сапкон|ДЖИЛЕКС|ROMMER|WESTER|JEMIX|STI|Вихрь|Росэнерготраст / Энерготраст|Гидродинамика (Минск)|Пинский опытно-механический завод|Alfa Laval — pumps|Gorman-Rupp|Cornell Pump|Graco|Wilden (PSG Dover)|SANDPIPER / Warren Rupp|Sundyne|Yamada Pump|Nikkiso|Liancheng Pump|Shakti Pumps|WPIL".split("|"),
};

/** Rows in source workbook: 106; direct catalog URLs: 40; source is NOT publication clearance. */
export const pumpResearchCounts = { total: 106, A: 25, B: 56, C: 25, directCatalogs: 40, dated: "2026-11-16" } as const;

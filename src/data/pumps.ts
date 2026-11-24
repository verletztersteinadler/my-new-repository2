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
  country: string;
  entity: string;
  applications: string;
  seriesNames: string;
  caveat: string;
  priority: "A";
  editorialStatus: "source-register-unverified";
};

/** Public-facing manufacturer records exclude source-site URLs. */
const pilotRows: Array<[string,string,string,string,string,string]> = [
  ["ГМС Ливгидромаш","Россия","Завод","Сетевые, котловые, подпиточные, питательные, конденсатные, топливные","К, КМ, Boosta, Kordis, ЦНС, Кс, НМШ","Имеются технические каталоги серий и изделия для котельных."],
  ["Катайский насосный завод (КНЗ)","Россия","Завод","Сетевые, подпиточные, конденсатные, консольные","К, КМ, ЛМ, Д, ЦНС, конденсатные","На сайте отдельные разделы горячей воды, конденсата и руководств."],
  ["ЭНА","Россия","Завод","Циркуляция, ГВС, подпитка, промышленность","К, КМ, КМЛ, ЦМНШ, СМ",""],
  ["ИСТРАТЕХ","Россия","Завод","Циркуляция отопления, сетевые, подпиточные, повышение давления","BM(N), BO, KMG, MP, HC","Ранее «Грундфос Истра»; не смешивать с Grundfos."],
  ["SVN PUMP","Россия","Производственный бренд","Сетевые, in-line, моноблочные, многоступенчатые, циркуляция","SVN NPM, SVN DL, DLF, NPC","Не путать с неподтверждённым названием SNP."],
  ["ГМС Ливнынасос","Россия","Завод","Подпитка, водоснабжение, повышение давления, скважинные","Boosta, APD Boosta, ЭЦВ, Ciris","Отдельное юрлицо группы ГМС, не тождественно Ливгидромаш."],
  ["ВИЛЛИНА","Россия","Завод","Термомасло, химические жидкости, высокотемпературные среды","Герметичные горизонтальные, полупогружные, многоступенчатые",""],
  ["Валдайский механический завод","Россия","Завод","Консольные, подпитка, конденсат, циркуляция","К, КМ, ЦНСГ, Кс, ЦНЛ, НМШ","Не включать снятые с производства исполнения."],
  ["UNIPUMP","Россия","Производственный/торговый бренд","Циркуляция, подпитка, повышение давления, КНС","VM, SVH, CM, UPF, PF, FC, FS","Изготовитель конкретной модели может отличаться."],
  ["Ридан (Ridan)","Россия","Торгово-производственный бренд","Сетевые, циркуляция, подпитка, повышение давления","RW, RWE, RV, RMV, RMHI, RH","Бренд; не утверждать собственное производство каждой серии."],
  ["Grundfos","Дания","Завод/группа","Сетевые, циркуляция, подпитка, питательные, дозирование","MAGNA, TPE, CR, CRE, NK, NB","Динамический конфигуратор; соблюдать условия доступа."],
  ["Wilo","Германия","Завод/группа","Сетевые, циркуляция, подпитка, повышение давления","Stratos, Crono, Helix, IL, IPL","Не смешивать исполнения 50 и 60 Гц."],
  ["KSB","Германия","Завод/группа","Питательные, сетевые, циркуляция, конденсат, промышленные","Etanorm, Etaline, Movitec, Calio, Multitec","Отделять энергетические насосы от обычных котельных."],
  ["DAB Pumps","Италия","Завод","Циркуляция, сетевые, подпитка, повышение давления","Evosta, Evoplus, KLM, KV, KDN","Есть общий технический каталог 2026."],
  ["Lowara (Xylem)","Италия","Производственный бренд группы","Циркуляция, подпитка, сетевые, повышение давления","e-SV, e-LNE, e-NSC, e-HM","Марка холдинга Xylem, не отдельный завод."],
  ["Ebara","Япония/Италия","Завод/группа","Циркуляция, подпитка, дренаж, повышение давления","3D, EVM, DWC","Прямая ссылка на каталог требует дополнительной проверки."],
  ["Calpeda","Италия","Завод","Циркуляция, подпитка, многоступенчатые, КНС","NCE, NM, MXV, BS",""],
  ["SAER Elettropompe","Италия","Завод","Сетевые, подпиточные, двухстороннего входа, питательная вода","IR, NCB, SKD, L, TM, TMV","Часть паспортов может требовать регистрации."],
  ["IMP Pumps","Словения","Завод","Циркуляция отопления, in-line, подпитка","NMT, CL, ECL, BL","Отраслевые данные по выручке не заменяют технический паспорт."],
  ["HERMETIC-Pumpen","Германия","Завод","Термомасло, высокотемпературные жидкости, герметичные","Canned motor pumps","Требуется сверить исполнение для термомасла."],
  ["DICKOW PUMPEN","Германия","Завод","Термомасло, топлива, высокотемпературные герметичные","NMWR, NMR, HZMA","Условия применения проверяются по конкретной серии."],
  ["ALLWEILER","Германия","Завод/бренд группы","Термомасло, мазут, дизельное топливо, промышленные жидкости","NT, NTT, NEMO","Проверить актуального правообладателя марки."],
  ["ProMinent","Германия","Завод","Химводоочистка, дозирование реагентов","gamma, Sigma, DULCO","Дозирующие насосы, не сетевые."],
  ["CNP Nanfang Pump Industry","Китай","Завод/группа","Сетевые, циркуляция, подпитка, КНС, дозирование","CDM, CDMF, TD, TDE, NSC, NIS","Не дублировать с брендом CNP Russia."],
  ["SHINHOO","Китай","Завод/бренд","Циркуляция отопления","Mega, Master SD, Classic, Basic","Не считать все бытовые исполнения промышленными."],

];

export const pumpPilotCompanies: PumpResearchManufacturer[] = pilotRows.map((row, index) => ({
  id: "pump-a-" + String(index + 1).padStart(2, "0"),
  name: row[0], country: row[1],
  entity: row[2], applications: row[3], seriesNames: row[4],
  caveat: row[5],
  priority: "A", editorialStatus: "source-register-unverified",
}));

/** B/C are reference-backlog names, NOT public manufacturer cards. */
export const pumpBacklogNames = {
  B: "Уралгидромаш|Пермские насосы|Димитровградхиммаш|Энергия — насосы и арматура (МНЗ)|МЗ ПОТОК|ГК «Гидромаш» (Челябинск)|АО «Насосный завод», Екатеринбург|Астерион|Гидрогаз|АО ЛГМ|Завод им. Гаджиева|МСВ-НАСКО|VALTEC|PUMPMAN / TAIFU|Акварио / Aquario|VALFEX|Oasis|Бобруйский машиностроительный завод (ГМС)|Промбурвод|Pedrollo|Speroni|Caprari|ESPA|Biral|DESMI|HOMA Pumpen|Sulzer|NETZSCH Pumps & Systems|SEEPEX|Wangen Pumpen|LEWA|Verder / Verder Liquids|Tapflo|SPX FLOW / Johnson Pump|Ruhrpumpen|Andritz Pumps|Flowserve|Goulds Pumps (ITT)|Bell & Gossett (Xylem)|Flygt (Xylem)|Franklin Electric|Viking Pump|Milton Roy|Iwaki|Tsurumi|Torishima|AIKON|LEO Group|Shimge|Taifu|Kaiquan|Masdaf|ETNA Pump|Standart Pompa|Kirloskar Brothers (KBL)|C.R.I. Pumps".split("|"),
  C: "Турбонасос|Транснефть — Нефтяные насосы (ТНН)|Пензкомпрессормаш|Нефтемаш-Сапкон|ДЖИЛЕКС|ROMMER|WESTER|JEMIX|STI|Вихрь|Росэнерготраст / Энерготраст|Гидродинамика (Минск)|Пинский опытно-механический завод|Alfa Laval — pumps|Gorman-Rupp|Cornell Pump|Graco|Wilden (PSG Dover)|SANDPIPER / Warren Rupp|Sundyne|Yamada Pump|Nikkiso|Liancheng Pump|Shakti Pumps|WPIL".split("|"),
};

/** Rows in source workbook: 106; source is NOT publication clearance. */
export const pumpResearchCounts = { total: 106, A: 25, B: 56, C: 25, directCatalogs: 40, dated: "2026-11-16" } as const;

import type { Manufacturer } from "@/data/manufacturers";

export const SITE_ORIGIN = "https://kotly.pro";

type EquipmentIntent = {
  product: string;
  subject: string;
  specs: string;
  details: string[];
};

const categories: Record<Manufacturer["line"], EquipmentIntent> = {
  boiler: {
    product: "Промышленные котлы",
    subject: "котлов",
    specs: "тепловую мощность или паропроизводительность, топливо, температуру, давление и резервирование",
    details: [
      "Вид котла: водогрейный, паровой, термомасляный — в соответствии с задачей.",
      "Номинальная мощность (кВт/МВт) либо производительность пара (кг/ч, т/ч).",
      "Топливо, параметры теплоносителя, рабочее давление и температурный график.",
      "Резервирование, автоматизация, водоподготовка, насосы и требования к размещению.",
    ],
  },
  burner: {
    product: "Промышленные горелки",
    subject: "горелочного оборудования",
    specs: "тепловую мощность, тип топлива, диапазон регулирования и совместимость с котлом",
    details: [
      "Тип топлива, мощность и требуемый диапазон регулирования.",
      "Совместимость с топкой, противодавление и требования к выбросам.",
      "Тип управления, автоматика безопасности и условия монтажа.",
      "Состав горелочного комплекта и необходимая документация.",
    ],
  },
  air: {
    product: "Промышленные воздухонагреватели",
    subject: "воздухонагревателей",
    specs: "тепловую мощность, расход воздуха, температуру подачи и вид энергоносителя",
    details: [
      "Требуемая тепловая мощность, расход и температура воздуха.",
      "Тип источника тепла, топливо и условия эксплуатации.",
      "Сопротивление воздушного тракта, монтажные ограничения и автоматика.",
      "Комплектация, система безопасности и техническая документация.",
    ],
  },
};

export function equipmentIntent(maker: Manufacturer): EquipmentIntent {
  return categories[maker.line];
}

export function manufacturerSeo(maker: Manufacturer, hasVerifiedSeries: boolean) {
  const intent = equipmentIntent(maker);
  const title = `${intent.product} ${maker.title} — подбор и запрос КП | kotly.pro`;
  const description = hasVerifiedSeries
    ? `${intent.product} ${maker.title}: серии, характеристики и подбор для закупки. Сравните модели, уточните комплектацию, цену и условия поставки через kotly.pro.`
    : `${intent.product} ${maker.title} (${maker.place}): подбор по техническим параметрам, поиск аналогов и подготовка запроса КП. Характеристики моделей уточняются.`;
  return {
    title,
    description,
    url: `${SITE_ORIGIN}/${maker.slug}`,
  };
}

/** Only meaningful public source notes; never expose editorial instructions as manufacturer facts. */
export function manufacturerPublicNote(maker: Manufacturer): string | null {
  const note = maker.note.trim();
  if (
    !note ||
    /не публиковать|спрос не доказан|спрос|необходимо подтвердить|сверить сайт|исходный реестр|данные не получены/i.test(note)
  ) return null;
  return note;
}

# SCHUSTER — отчёт P1 (№42, М228)

**Дата сверки:** 28.11.2026
**Сайт:** https://www.schusterboilers.com/ — открыт, отвечает корректно (та же CMS, что у Unical AG; P.IVA совпадает с Unical)
**Раздел источника:** Industrial (Steam, Superheated Water, Thermal Oil, Industrial Hot Water) + Professional (Commercial Steel Boilers, Steel condensation)
**Реестр:** строка 47, приоритет P1, «Промышленные котлы», статус «Ранее — дополнена»

## Что сделано

Файла `src/data/schuster.ts` в базе не было — карточка новая: **16 серий** по промышленному и профессиональному разделам каталога Schuster.

## Серии

**Паровые (steam):**
| id | Модель | Диапазон | Давление |
|---|---|---|---|
| schuster-de12 | DE 12 | 300–6 000 кг/ч (204–4 089 кВт), реверсивная топка | 12 бар |
| schuster-de3g | DE 3G | 500–4 000 кг/ч (341–2 728 кВт), 3 хода | 12 бар |
| schuster-de312 | DE3' 12 | 2 000–25 000 кг/ч (1 328–16 607 кВт), 3 хода | 12 бар |
| schuster-de1 | DE 1 | 1 250–4 000 кг/ч (838–2 683 кВт), низкое давление | 0,98 бар |
| schuster-de1cb | DE 1 CB | 100–1 000 кг/ч (67–671 кВт), низкое давление | 0,98 бар |
| schuster-el7 | EL7 | 20–250 кг/ч (16–180 кВт), электрический, fuels: [] | — |

**Перегретая вода (hw170):**
| id | Модель | Диапазон | Давление |
|---|---|---|---|
| schuster-wwg | WWG | 140–2 900 кВт, реверсивная топка | 5 / 10 бар |
| schuster-wwg3 | WWG3 | 1 200–18 000 кВт, 3 хода | 6 / 10 бар |

**Термомасляные (oil):**
| id | Модель | Диапазон |
|---|---|---|
| schuster-schd | SCHD | 116–5 815 кВт, 3 хода |

**Водогрейные (water):**
| id | Модель | Диапазон |
|---|---|---|
| schuster-toxd2p | TOX D 2P | 2 000–22 000 кВт, индустриальная серия |
| schuster-dds | DDS | 80–6 100 кВт, реверсивная топка |
| schuster-tox | TOX 65–1900 | 55–1 900 кВт, 3 хода |
| schuster-dst | DST | 65–3 000 кВт, 3 хода |
| schuster-kde | KDE | 124–2 160 кВт, конденсационный (116 кВт — версия с камерой) |
| schuster-kde3 | KDE 3 | 116–3 000 кВт, конденсационный 3 хода Low NOx |
| schuster-kdeoil | KDE oil (oil/gas) | 69–1 550 кВт, конденсационный очень низкой температуры |

## Решения и расхождения

1. **UWD** (Superheated Water → Expansion tank 500–5 000 л) — расширительный бак, не котёл; не включён.
2. **EL7:** электрический парогенератор — fuels: [] (топливо не используется).
3. Деаэраторы, танки, паровые аксессуары, наружные котельные (Industrial-категории сайта) — вспомогательное оборудование, в карточку не включены.
4. Диапазоны и мощности указаны на карточках продуктов Schuster напрямую (Steam production … / Output …), пересчёта не требовалось.

## Источники

- https://www.schusterboilers.com/catalogue-products/369/industrial (категории 1304, 1305, 370, 391)
- Карточки: de-12, de-3g, de3--12, de-1, de-1-cb, el7, schd, wwg, wwg3, tox-d-2p
- https://www.schusterboilers.com/catalogue-products/professional-300 (313, 334): dds, tox-65-1900, dst, kde, kde-3, kde-oil-oil-gas

## Техпроверка

- `node --experimental-strip-types scripts/catalog-check.mjs` → **catalog-check: ok**
- Импорт-тест: 16 серий, дубликатов нет

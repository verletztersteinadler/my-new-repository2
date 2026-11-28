# BABCOCK WANSON — отчёт P1 (№48, И005)

**Дата сверки:** 28.11.2026
**Сайт:** https://www.babcock-wanson.com/ — открыт, отвечает корректно
**Раздел источника:** Products: Steam Boilers (Fire Tube / Coil Type / Water Tube / Superheaters) / Thermal Fluid Heaters / Industrial Hot Water Boilers / Industrial Electric Boilers / Heat Recovery (страницы серий с таблицами)
**Реестр:** строка 53, приоритет P1, «Паровые, термомасляные котлы»

## Что сделано

В базе был компактный `src/data/wanson.ts` (2 серии: BWD, TPC-B) — **legacy-id wanson-bwd и wanson-tpc сохранены**. Карточка расширена: **22 серии, 41 типоразмер**.

Примечание: `babcock.ts` в базе относится к Babcock & Wilcox (babcock.com, водотрубные FM/HCFM/PFM) — это другой производитель и к строке реестра «Babcock Wanson» отношения не имеет; файл не менялся.

## Серии

**Паровые жаротрубные:**
| id | Модель | Диапазон | Примечание |
|---|---|---|---|
| wanson-bwd | BWD | 1 500–8 000 кг/ч, 10 типоразмеров, 3 хода | таблица при 15 бар; КПД 95 %+ |
| wanson-bwr | BWR | 10 000–30 000 кг/ч, 3 хода | КПД >98 % (R-Eco), 105 % (конденс.) |
| wanson-nbwb | NBWB | 250–2 500 кг/ч | вихревые кольца, компактный |
| wanson-steampack | SteamPack | 3 500–8 000 кг/ч | водотрубная поворотная камера |
| wanson-powerpack | PowerPack | 10 000–34 000 кг/ч | большая мощность |
| wanson-twinpack | TwinPack | 30 000–58 000 кг/ч | двухтопочные |
| wanson-vap-bp | VAP BP | 140–4 000 кг/ч | пар <0,5 бар |

**Паровые змеевиковые, электрические, водотрубные:**
| id | Модель | Диапазон |
|---|---|---|
| wanson-vap | VAP | 150–7 000 кг/ч (106–4 920 кВт), 13 типоразмеров Standard, 12 бар |
| wanson-vap-ln | VAP-LN | 250–3 500 кг/ч (174–2 442 кВт), 10–29 бар |
| wanson-e-vap | E-VAP | 1 700–5 700 кг/ч |
| wanson-eurosteam | EUROSTEAM (ESM) | 697–6 976 кВт, до 10 000 кг/ч, до 29 бар |
| wanson-vap-hp | VAP-HP | 232–2 325 кВт, до 100 бар, замкнутый контур |
| wanson-vap-el | VAP-EL | 16–360 кВт, электрический, fuels: [] |
| wanson-e-pack | e-Pack | 300–12 000 кг/ч, электрический, fuels: [] |
| wanson-watertube | Water Tube | 4,5–80 т/ч, 10–90 бар, пар до 550 °C, EN 12952 |

**Термомасляные:**
| id | Модель | Диапазон |
|---|---|---|
| wanson-tpc | TPC-B | 116–6 978 кВт, 13 типоразмеров (легаси-ряд сохранён) |
| wanson-tpc-ln | TPC-LN | 291–2 383 кВт |
| wanson-epc-es | EPC-ES | 1 163–6 978 кВт |
| wanson-epc-h | EPC-H | 2 326–13 953 кВт, КПД до 92 % |

**Водогрейные:**
| id | Модель | Диапазон |
|---|---|---|
| wanson-heb | HEB | 90–2 300 кВт, 18 моделей, 5–6 бар, до 100 °C |
| wanson-hw3p | HW3P | 1 100–10 500 кВт, 14 моделей, до 106 °C |
| wanson-tpc-as | TPC-AS | 581–2 326 кВт, 5 типоразмеров |

## Решения и расхождения

1. **BWD, колонка кВт.** Ошибка сайта сохраняется (модель 15: 2025 кВт при 1366 кВт у модели 20) — киловатты таблицы по-прежнему не перенесены (решение сверки 16.11.2026 подтверждено), в типоразмерах только кг/ч.
2. **VAP Standard, кВт модели 7000.** В таблице серии клетка кВт для 7000 пустая (ошибка сайта); в типоразмере кВт не указан, в диапазоне серии принят 4 920 кВт по аналогии с VAP RR 7000 (4 886 кВт). Исполнения Premium RR (250–1500, 175–1047 кВт) и RR (1500–7000, 1047–4886 кВт) упомянуты в feature/sizesNote.
3. **VAP EL и e-Pack** — электрические: fuels: []. e-Pack (300–12 000 кг/ч) добавлен как отдельная серия больших электрических котлов.
4. **EUROSTEAM** — страница даёт теплопроизводительность в ккал/ч → кВт и потолок 10 000 кг/ч пара: в карточке диапазон кВт + steamMax 10 000 кг/ч (минимум пара таблицей не опубликован).
5. **Heat Recovery (economiser, R-Eco, EXT, REC, SOV/SOAS)** — надстройки и теплообменники, не котлы: в карточки не включены, упомянуты в отчёте.
6. **Water Tube (4,5–80 т/ч, 10–90 бар, до 550 °C)** — страница без таблицы моделей: серия без sizes.
7. **Superheaters, Process Air Heaters, Burners, Water Treatment, Thermal Oxidisers** — вспомогательное оборудование, вне реестровой рамки.

## Источники

- https://www.babcock-wanson.com/products/ (карточки: steam-boilers/bwd-series, bwr-series, nbwb-series, powerpack, steampack, twinpack, vap-bp, vap-series, vap-ln-series, vap-el, vap-hp, eurosteam, water-tube-boilers; coil-type-steam-boilers/e-vap; industrial-electric-boilers/e-pack; thermal-fluid-heaters/tpc-b-series, tpc-ln-series, epc-es-series, epc-h-series; industrial-hot-water-boilers/heb-series, hw3p-series, tpc-as-series-2)

## Техпроверка

- Импорт-тест: 22 серии, 41 типоразмер, дублей id нет; legacy-id wanson-bwd, wanson-tpc на месте.
- `node --experimental-strip-types scripts/catalog-check.mjs` → catalog-check: ok.

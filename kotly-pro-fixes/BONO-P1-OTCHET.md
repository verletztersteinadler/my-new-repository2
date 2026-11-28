# CANNON BONO ENERGIA — отчёт P1 (№45, М270)

**Дата сверки:** 28.11.2026
**Сайт:** https://cannonbono.com/ — открыт, отвечает корректно
**Раздел источника:** Industrial process heating: Fire Tube boilers / Water tube boilers / Coil steam generators / Thermal oil heaters / Biomass boilers / Industrial electric boilers / Waste heat recovery generators (13 страниц серий)
**Реестр:** строка 50, приоритет P1, «Паровые, термомасляные котлы, парогенераторы»

## Что сделано

В базе был компактный `src/data/bono.ts` (2 серии: bono-sg, bono-omv) — **legacy-id сохранены**. Карточка расширена: **15 серий, 75 типоразмеров**. Сайт полностью переработан (ноябрь 2025 — январь 2026): на каждой странице серии теперь публикуются технические таблицы, они и использованы как источник.

## Серии

**Паровые (steam):**
| id | Модель | Диапазон | Давление |
|---|---|---|---|
| bono-sg | SG | 2 000–30 000 кг/ч, 17 типоразмеров, 2 хода, мокрая камера, до 97,5 % | 12–25 бар (расч. до 30) |
| bono-ft | FT | 1 000–6 000 кг/ч, 6 типоразмеров, компактный, до 95 % | 12 бар (15 по заказу) |
| bono-um | UM (flash) | 500–5 000 кг/ч, 7 типоразмеров, змеевик, пуск 2–3 мин, до 93 % | 10–80 бар |
| bono-um-hp | UM-HP | 233–4 652 кВт (200 тыс.–4 млн ккал/ч), 11 типоразмеров, с HP Lux | до 100 бар |
| bono-ct | CT | 1 000–200 000 кг/ч, водотрубный, до 97,5 %, без таблицы | до 80 бар |
| bono-e-sg | e-SG | 200–6 000 кВт (300–9 200 кг/ч), 12 типоразмеров, электрический, fuels: [] | 12–20 бар |
| bono-sgr-smr | SGR / SMR | утилизационный HRSG (ГТУ 0,2–7 МВтэ), fuels: [] | до 15 бар, 300 °C |
| bono-ctr | CTR | утилизационный водотрубный (ГТУ 1,5–15 МВтэ), fuels: [] | до 80 бар, 500 °C |
| bono-biomass | Biomass | 1 000–50 000 кг/ч (1–50 МВт), биомасса, fuels: [solid] | до 80 бар |

**Перегретая вода (hw170):**
| id | Модель | Диапазон |
|---|---|---|
| bono-cth | CTH | до 140 000 кВт, водотрубный, вода 120+ °C, до 96 %, без таблицы |

**Термомасляные (oil):**
| id | Модель | Диапазон |
|---|---|---|
| bono-omv | OMV | 200–5 800 кВт, 13 типоразмеров (OMV 200–5000), до 350 °C, КПД до 92 % |
| bono-omp-hth | OMP / HTH | 1 700–40 000 кВт; табличный ряд OMP 2000–12500 (2 300–14 600 кВт, 9 типоразмеров), до 400 °C, до 93 % |
| bono-e-omv | e-OMV | до 5 000 кВт, электрический, до 390 °C, fuels: [] |
| bono-hthr | HTHR | утилизационный термомасляный (ГТУ 1,5–15 МВтэ), fuels: [] |

**Водогрейные (water):**
| id | Модель | Диапазон |
|---|---|---|
| bono-cthr | CTHR | утилизационный водогрейный (ГТУ 1,5–15 МВтэ), fuels: [] |

## Решения и расхождения

1. **SG: давление.** Шапка страницы — 12–25 бар; в таблице расчётное давление зависит от модели: 12–30 бар (SG 200–1200), 12–22 (SG 1500–2000), 12–19 (SG 2200–2500), 12–17 (SG 3000). Зафиксировано в pressureNote и extra. Ряд из 17 моделей (SG 200–3000) совпадает с прежней свёркой 16.11.2026.
2. **OMV: колонка ккал/ч не сходится с колонкой МВт** (например, OMV 1000: 1 000 000 ккал/ч, но 1,2 МВт; OMV 1250: в таблице ккал указано 1 500 000). Как и в прежней свёрке, в размер взята колонка МВт (кВт). Серия расширена с 7 до 13 типоразмеров: добавлены OMV 200/300/400/600/800/1000 (0,2–1,2 МВт) — их таблица на новой версии сайта опубликована полностью.
3. **UM-HP** — паропроизводительность таблицей не публикуется (только теплопроизводительность ккал/ч → кВт); размеры заполнены в кВт.
4. **e-SG** — электрический: в размерах и электрическая мощность (кВт), и пар «до» (кг/ч) по таблице; fuels: [].
5. **OMP / HTH** — одно семейство многотрубных нагревателей: табличный ряд только по OMP (9 моделей до 14,6 МВт), ключевые характеристики страницы — 1,7–40 МВт, до 400 °C. Сделана одна серия с алиасами OMP и HTH.
6. **Утилизационные серии (SGR/SMR, CTR, HTHR, CTHR)** — работают на тепле уходящих газов: fuels: [], без типоразмеров (проектное изготовление). SGR/SMR и CTR отнесены к паровой категории, HTHR — термомасляной, CTHR — водогрейной.
7. **Biomass** — по странице категории: пар 1–50 т/ч, тепловая мощность 1–50 МВт, давление до 80 бар; отнесена к паровой категории (также возможны перегретая вода и термомасло — отмечено в extra), fuels: [solid].
8. **CT и CTH** — проектные серии без таблиц типоразмеров: указаны максимальные параметры (200 т/ч / 140 МВт).

## Источники

- https://cannonbono.com/industrial-process-heating/ (обзор)
- Страницы серий: fire-tube-boilers/fire-tube-steam-boilers-sg-series, small-fire-tube-steam-boilers-ft-series, coil-steam-generators/flash-coil-steam-generators-um-series, high-pressure-coil-steam-generators-um-hp-series, water-tube-boilers/water-tube-steam-boilers-ct-series, superheated-water-boilers-cth-series, thermal-oil-heaters/multicoil-heaters-omv-series, multitubolar-heaters-omp-and-hth-series, industrial-electric-boilers/industrial-electric-steam-generators-e-sg-series, industrial-electric-thermal-oil-heaters-e-omv-series, waste-heat-recovery-generators/heat-recovery-steam-generators-sgr-and-smr-series, water-tube-heat-recovery-boilers-ctr-series, hot-water-and-thermal-oil-recovery-heaters-hthr-and-cthr, biomass-boilers

## Техпроверка

- Импорт-тест: 15 серий, 75 типоразмеров, дублей id нет; legacy-id bono-sg, bono-omv на месте.
- `node --experimental-strip-types scripts/catalog-check.mjs` → catalog-check: ok.

# FERROLI — отчёт P1 (№38, М136)

**Дата сверки:** 28.11.2026
**Сайт:** https://ferroli.com/ и https://www.ferroli.com/int-en/products/industrial-solutions — открыты, отвечают корректно
**Раздел источника:** Industrial solutions (Hot water boilers, Superheated water boilers, Steam generators, Special applications)
**Реестр:** строка 43, приоритет P1, «PREXTHERM, VAPOPREX и другие промышленные серии», статус «Ранее — дополнена»

## Что сделано

Файл `src/data/ferroli.ts` содержал 5 серий (TP3 LN, TP3 COND, Force W, Atlas, RSW) без промышленных серий. Карточка переработана: **27 серий** по всем модельным карточкам промышленного раздела (int-en, дубль uk). Все 5 легаси-id сохранены: ferroli-tp3, ferroli-cond, ferroli-rsw, ferroli-force, ferroli-atlas.

## Серии

**Водогрейные (вода):**
| id | Модель | Диапазон | Типоразмеры |
|---|---|---|---|
| ferroli-tp3 | TP3 LN | 70–3 200 кВт, 6 бар, КПД до 95 % | 20 |
| ferroli-cond | TP3 COND | 65–3 200 кВт, 6 бар, КПД до 106 % | 15 |
| ferroli-rsw | PREXTHERM RSW N | 92–6 000 кВт, 6 бар | 25 (объединены карточки 92–1890 и 2360–6000) |
| ferroli-rsh | PREXTHERM RSH N | 100–3 000 кВт, 6 бар | 17 (100–1480 и 1850–3000) |
| ferroli-t3gf | PREXTHERM T3G F | 1 200–9 000 кВт, 6 бар, КПД >92 % | 14 |
| ferroli-t3gn | PREXTHERM T3G N | 6 000–15 000 кВт, 6 бар | 7 |

**Перегретая вода (hw170):**
| id | Модель | Диапазон | Тemp |
|---|---|---|---|
| ferroli-prexnash | PREX N ASH | 160–3 500 кВт, 12/15 бар | до 200 °C | 13 |
| ferroli-prexnasl | PREX N ASL | 1 210–3 500 кВт, 5 бар | до 145 °C | 7 |
| ferroli-prexqasl | PREX Q ASL | 160–1 000 кВт, 5 бар | до 145 °C | 6 |
| ferroli-t3gfash | T3G F ASH | 1 200–9 000 кВт, 12/15 бар | до 200 °C | 14 |
| ferroli-t3gfasl | T3G F ASL | 1 200–9 000 кВт, 6/8 бар | до 175 °C | 14 |
| ferroli-t3gnash | T3G N ASH | 6 000–15 000 кВт, 12/15 бар | до 200 °C | 7 |
| ferroli-t3gnasl | T3G N ASL | 6 000–15 000 кВт, 6/8 бар | до 175 °C | 7 |

**Паровые:**
| id | Модель | Диапазон | Давление |
|---|---|---|---|
| ferroli-vapoprex3gn | VAPOPREX 3GN | 1 600–25 000 кг/ч, 191,7 °C | 12 бар |
| ferroli-vapoprexhvp | VAPOPREX HVP | 1 500–5 000 кг/ч | 12 бар, 8 типоразмеров |
| ferroli-vapoprexhvpq | VAPOPREX HVPQ | 150–1 250 кг/ч | 12 бар |
| ferroli-vapoprexhwp | VAPOPREX HWP | 700–3 200 кг/ч | 12 бар, твёрдое топливо (solid) |
| ferroli-vapoprexlvp | VAPOPREX LVP | 1 500–4 000 кг/ч, 120 °C | 1 бар, 7 типоразмеров |
| ferroli-vapoprexlvpq | VAPOPREX LVPQ | 150–1 250 кг/ч, 120 °C | 1 бар, 7 типоразмеров |
| ferroli-vapoprexvi | VAPOPREX VI | 300–4 000 кг/ч, принудительная циркуляция | 12 бар, 12 типоразмеров |
| ferroli-vp3g | VP 3G | 1 000–4 000 кг/ч | 12 бар, 6 типоразмеров |
| ferroli-vp3gf | VP 3G F | 500–7 000 кг/ч | 12 бар, 12 типоразмеров (моды в т/ч) |
| ferroli-vp3gfl | VP 3G F L | 500–5 000 кг/ч, 143 °C | 3 бар, 10 типоразмеров |
| ferroli-vaporeva | VAPOR EVA | 166–8 300 кг/ч, до 200 °C | 15 бар, непрямой нагрев (fuels: []) |
| ferroli-prexrec | PREXREC / VAPOREC | утилизационные (вода или пар) | топлива нет (fuels: []) |

**Коммерческие (легаси, без изменений):** ferroli-force (Force W 60–600 кВт), ferroli-atlas (Atlas/GN 32–650 кВт).

## Решения и расхождения

1. **TP3 COND:** прежняя карточка брала текст 65–1 000 кВт при заголовке 65–3 200; карточка сайта и таблица типоразмеров (15 моделей до mod.3200) подтверждают **65–3 200 кВт** — диапазон расширен, примечание снято.
2. **PREXTHERM RSW N:** легаси-диапазон 92–6 000 кВт подтверждён; на сайте это две карточки (92–1890 Square, 2360–6000), объединены в одну серию ferroli-rsw с 25 типоразмерами.
3. **PREXTHERM T3G:** на сайте 4 пары исполнений (F/N × ASH/ASL) + 2 водогрейные карточки (T3G F, T3G N) — включены 6 отдельных серий, как на сайте.
4. **VAPOPREX 3GN:** таблица модов на сайте приведена в тыс. ккал/ч (мод.1000–15000), паропроизводительность дана баннером 1 600–25 000 кг/ч; типоразмеры в карточке не детализированы по кг/ч.
5. **VP 3G F / VP 3G F L:** моды на сайте указаны в т/ч (mod.0.5–7.0 и 0.5–5.0) — пересчитаны в кг/ч.
6. **VAPOPREX HWP:** единственная паровая модель на твёрдом топливе — fuels: ["solid"].
7. **VAPOR EVA и PREXREC/VAPOREC:** топливо не сжигается (непрямой нагрев / утилизация) — fuels: [] с пояснением в extra.
8. **Аксессуары промышленного раздела** (экономайзеры, деаэраторы, панели управления, контейнеры, системы 24/72 ч без надзора) в карточку не включались.
9. Старый раздел `%20Industrial_en` (Vapoprex LVP 150–3000 кг/ч и др.) заменён новым Industrial solutions; данные взяты с нового раздела.

## Источники

- https://www.ferroli.com/int-en/products/industrial-solutions (листинг, страницы 1–6)
- Карточки: prex-n-ash, prex-n-asl, prex-q-asl, prextherm-rsw-n-92-1890, prextherm-rsw-n-2360-600, prextherm-rsh-n-100-1480, prextherm-rsh-n-1850-3000, prextherm-t3g-f(-ash/-asl), prextherm-t3g-n(-ash/-asl), tp3-cond-65-3200, tp3-ln, vapoprex-3gn/-hvp/-hvpq/-hwp/-lvp/-lvpq/-vi, vp-3g, vp-3g-f, vp-3g-f-l, vapor-eva, prexrec-vaporec

## Техпроверка

- `node --experimental-strip-types scripts/catalog-check.mjs` → **catalog-check: ok**
- Импорт-тест: 27 серий, 232 типоразмера, дубликатов нет, все 5 легаси-id присутствуют

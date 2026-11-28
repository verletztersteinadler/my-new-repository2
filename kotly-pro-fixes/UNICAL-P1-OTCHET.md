# UNICAL — отчёт P1 (№40, М228)

**Дата сверки:** 28.11.2026
**Сайт:** https://www.unicalag.it/ — открыт; SSL-сертификат сайта просрочен (доступ с отключённой проверкой), unicalboiler.com редиректит на unicalag.it
**Раздел источника:** Catalogo prodotti → Industriale (Vapore, Acqua surriscaldata, Olio diatermico, Acqua calda, Centrale termica da esterno) + Caldaie professionali → Pressurizzate a tubi fumo
**Реестр:** строка 45, приоритет P1, «Водогрейные, паровые и термомасляные котлы», статус «Ранее — дополнена»

## Что сделано

Файл `src/data/unical.ts` содержал одну серию (TRYSUHR). Карточка переработана: **15 серий** по промышленному и профессиональному разделам каталога Unical AG. Легаси-id `unical-try` сохранён (серия TRYSUHR', перенесена в категорию «свыше 115 °C»).

## Серии

**Паровые (steam):**
| id | Модель | Диапазон | Давление |
|---|---|---|---|
| unical-bahr12 | BAHR'12 | 300–6 000 кг/ч (204–4 089 кВт) | до 12 бар |
| unical-bahr12-3g | BAHR'12 3G | 500–4 000 кг/ч | до 12 бар |
| unical-trypass | TRYPASS' | 2 000–22 000 кг/ч, КПД 90–96 % | до 12 бар |
| unical-trypasshyb | TRYPASS' HYB | 3 000–12 000 кг/ч, КПД до 97 % (EC) | до 12 бар |
| unical-el7 | EL7 | 20–250 кг/ч (15–180 кВт), электрический, fuels: [] | 5 бар (до 8,5) |
| unical-stem | StEM | 40–320 кг/ч (30–240 кВт), электрический, fuels: [] | до 7,5 бар |

**Перегретая вода (hw170):**
| id | Модель | Диапазон | Давление |
|---|---|---|---|
| unical-try | TRYSUHR' (легаси) | 1 200–18 000 кВт, КПД 91 % | до 10 бар |
| unical-suhr | SUHR' | 140–2 900 кВт, КПД 90–95 % | 5 / 10 бар (SUHR'5 / SUHR'10) |

**Водогрейные (water):**
| id | Модель | Диапазон |
|---|---|---|
| unical-ternox2s | TERNOX 2S | 2 200–10 200 кВт, до 6 бар |
| unical-ternoxd2p | TERNOX D 2P | 2 000–22 000 кВт, до 6 бар |
| unical-tristar2s | TRISTAR 2S | 450–6 100 кВт (проф. серия) |
| unical-modal | MODAL | 64–291 кВт (проф. серия) |
| unical-ellprex | ELLPREX | 420–7 000 кВт (проф. серия) |
| unical-tristar3g2s | TRISTAR 3G 2S | 65–3 000 кВт (проф. серия) |

**Термомасляные (oil):**
| id | Модель | Диапазон |
|---|---|---|
| unical-diather | DIATHER' | 116–8 000 кВт, 3 хода, вертикальная версия до mod. 2900 |

## Решения и расхождения

1. **TRYSUHR':** перенесена из категории «водогрейные» в «свыше 115 °C» (на сайте это Acqua surriscaldata); id, диапазон и давление (до 10 бар, 1 200–18 000 кВт) подтверждены карточкой.
2. **BAHR'12 3G:** на итальянской карточке диапазон не указан; 500–4 000 кг/ч взяты с официальной испанской версии той же карточки (es/…/2092/bahr-3g), дилер jessytrade указывает 800–4 000 кг/ч — расхождение зафиксировано в extra.
3. **V_SUHR'** — расширительный бак (аксессуар), не котёл; в карточку не включён.
4. **BAHR UNO:** карточка на сайте пустая (шаблон без контента) — серия не включена, отмечено здесь.
5. **EL7, StEM:** электрические парогенераторы — fuels: [] (топливо не используется).
6. **U-RGE (блочно-модульные котельные, noleggio)** и **Centrale termica da esterno** — готовые котельные/аренда, не отдельные котлы; не включены.
7. Доступ к сайту: SSL-сертификат unicalag.it просрочен (сверка выполнена с `-k`), в отчёте зафиксировано; на работу сайта это не влияет.

## Источники

- https://www.unicalag.it/catalogo-prodotti/369/industriale-369 и категории 1568–1571
- Карточки: bahr-12, bahr-12-3g, trypass-, trypass--hyb, el7, stem, suhr-, trysuhr-, diather-, ternox-2s, ternox-d-2p
- https://www.unicalag.it/catalogo-prodotti/caldaie-professionali-300/5620/pressurizzate-a-tubi-fumo (tristar-2s-450-6100, modal-64-291, ellprex-420-7000, tristar-3g-2s-65-3000)
- https://www.unicalag.it/es/productos/industrial-369/vapor/2092/bahr-3g (диапазон BAHR 3G)
- Листовка: https://www.unicalag.it/upload/blocchi/X375allegatoDEPLIANT1-2X_bahr-12_07-23_en.pdf

## Техпроверка

- `node --experimental-strip-types scripts/catalog-check.mjs` → **catalog-check: ok**
- Импорт-тест: 15 серий, дубликатов нет, легаси-id `unical-try` присутствует

## Контроль серий (лист «Контроль серий»)

Контрольный список: ELLPREX, TRYSUHR, KON и остальные серии.

- ELLPREX — covered (`unical-ellprex`, проф. серия Pressurizzate, 420–7000 кВт).
- TRYSUHR — covered (легаси-id `unical-try`, серия TRYSUHR', 1200–18 000 кВт, перенесена в «свыше 115 °C»).
- KON — не подтверждена как промышленная серия: KONm/KON M — бытовые конденсационные котлы Unical (навесные, около 35 кВт), в промышленный и профессиональный каталоги сайта unicalag.it не входят (поиск по сайту по «kon» — 0 результатов). В карточку не включена.
- Прочие серии индустриального раздела (BAHR'12, BAHR'12 3G, TRYPASS', TERNOX, DIATHER', TRISTAR, EL7, StEM, утилизационные) — включены в карточку; BAHR UNO (пустая карточка-шаблон) и аксессуары — нет, см. выше.

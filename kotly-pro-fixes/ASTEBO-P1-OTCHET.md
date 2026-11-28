# ASTEBO — отчёт P1 (№46, И196)

**Дата сверки:** 28.11.2026
**Сайт:** https://www.astebo.com/ — открыт, отвечает корректно
**Раздел источника:** Produkte: Dampfkessel / Heiss- und Warmwasserkessel / Abhitzekessel / Mobile Kesselanlagen
**Реестр:** строка 51, приоритет P1, «Водогрейные, паровые, перегретая вода»

## Что сделано

В базе был компактный `src/data/astebo.ts` (2 серии) — **legacy-id astebo-hw и astebo-steam сохранены**. Карточка расширена: **5 серий** (типоразмеров по-прежнему нет — см. ниже).

## Серии

| id | Категория | Диапазон | Особенности |
|---|---|---|---|
| astebo-steam | steam | 1 000–60 000 кг/ч | 8 рядов: TND-U (низкое давление), THD-IZ, THD-IZ Ü, THSD-I, THSD-IE, THD-U, THD-I, THD-I-Ü |
| astebo-hw | hw170 | 1 000–40 000 кВт | aqua 3E, THW-I, THW-IZ — свыше 120 °C; 6/10/13/16 бар (до 40 спец.) |
| astebo-thw-i-nte | water | 1 000–40 000 кВт (общий диапазон) | THW-I-NTE — вода до 120 °C |
| astebo-abhitze | steam | утилизационный, fuels: [] | за ГТУ/двигателями, перегрев до 350 °C, опциональная доп. топка (газ/водород) |
| astebo-mobile | steam | паровые блоки 3 000–5 000 кг/ч; водогрейные контейнеры до ~7 000 кВт | контейнерные и LKW-исполнения |

## Решения и расхождения

1. **Таблиц типоразмеров нет.** astebo изготавливает котлы «tailor-made»: на страницах публикуются только имена рядов и общий диапазон (пар 1 000–60 000 кг/ч; тепло 1–40 МВт). Все серии без sizes, диапазоны отнесены к линейке — как и в прежней свёрке 16.11.2026.
2. **Разделение по температуре.** Прежняя серия astebo-hw объединяла все 4 тепловых ряда в категории water. Теперь aqua 3E / THW-I / THW-IZ (свыше 120 °C) остались в astebo-hw с категорией hw170, THW-I-NTE (до 120 °C) выделена в отдельную серию water. Legacy-id сохранён.
3. **astebo-steam** дополнен: полный список 8 рядов (на странице также указано давление референсов: THD-IZ 55000 Ü 16 бар, THD-IZ 48000 Ü 13 бар — единичные поставки, в типоразмеры не разложены, отмечено в extra).
4. **Abhitzekiesel → Abhitzekessel** (утилизационные): добавлена серия astebo-abhitze, fuels: [] (основа — тепло уходящих газов), с примечанием об опциональной дополнительной камере сгорания на газе/водороде.
5. **Мобильные котельные** (Mobile Kesselanlagen): добавлена серия astebo-mobile; цифры взяты из референсов (Petrom 3 000/5 000 кг/ч; Energie Steiermark 3×7 080 кВт, КПД 97,7 %) — производитель таблиц не публикует.
6. **Speisewasserbehälter, Brennersysteme, EMSR** — вспомогательное оборудование, в карточки котлов не включены.

## Источники

- https://www.astebo.com/dampfkessel
- https://www.astebo.com/heisswasserkessel-und-warmwasserkessel
- https://www.astebo.com/abhitzekessel
- https://www.astebo.com/mobile-dampfkessel

## Техпроверка

- Импорт-тест: 5 серий, дублей id нет; legacy-id astebo-hw, astebo-steam на месте.
- `node --experimental-strip-types scripts/catalog-check.mjs` → catalog-check: ok.

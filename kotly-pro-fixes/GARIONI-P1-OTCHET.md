# GARIONI NAVAL — отчёт P1 (№37, М275)

**Дата сверки:** 28.11.2026
**Сайт:** https://www.garioninaval.com/ — открыт, отвечает корректно
**Раздел источника:** Industrial boilers (Steam generators, Hot water heaters, Superheated water heaters, Thermal oil heaters, Water tube boilers, Heat recovery, Systems for cogenerations)
**Реестр:** строка 42, приоритет P1, статус «Ранее — дополнена»

## Что сделано

Файл `src/data/garioni.ts` существовал в базе только с одной серией (garioni-gpt). Карточка переработана: **16 серий** по всем модельным страницам раздела Industrial boilers. Легаси-id `garioni-gpt` сохранён без изменений (якорь страницы сайта).

## Серии

| id | Модель | Категория | Диапазон | Примечание |
|---|---|---|---|---|
| garioni-gpt | GPT | steam | 3 000–25 000 кг/ч, до 21 бар | легаси-id, жаротрубный 3 хода |
| garioni-gbp | GBP | steam | 100–3 000 кг/ч, 0,5/0,98 бар | низкое давление, вне PED |
| garioni-ngc | NG/C | steam | 300–6 000 кг/ч, до 18 бар | 2 хода, сухая поворотная камера |
| garioni-gmt | GMT / GMT/V | steam | 120–8 000 кг/ч | проточный змеевиковый |
| garioni-vpr | VPR | steam | 50–500 кг/ч | tubeless, вертикальная топка |
| garioni-gmthp | GMT/HP | steam | 100 000–5 000 000 ккал/ч (≈116–5 814 кВт), до 110 бар | пар высокого давления |
| garioni-gev | GEV | steam | 100–200 кВт, до 21 бар | электрический, fuels: [] |
| garioni-maxi | MAXI | steam | 15–180 кВт, 9–170 кг/ч | электрический, fuels: [] |
| garioni-npr | NPR | hw115 | 64–7 000 кВт | жаротрубный 3 хода |
| garioni-npr3s | NPR-3S | hw115 | 80–6 100 кВт | КПД до 95 % |
| garioni-gmtac | GMT/AC | hw115 | 150 000–7 000 000 ккал/ч (≈174–8 140 кВт), до 110 °C | змеевиковый водогрейный |
| garioni-gptac | GPT/AC | hw115 | 3 000–20 000 кВт, до 16 бар | жаротрубный водогрейный |
| garioni-gptas | GPT/AS | hw170 | 3 000–20 000 кВт, до 16 бар | перегретая вода |
| garioni-gmtas | GMT/AS | hw170 | 150 000–7 000 000 ккал/ч (≈174–8 140 кВт), до 180 °C | перегретая вода |
| garioni-th | TH | oil | 150 000–7 000 000 ккал/ч (≈174–8 140 кВт), до 320 °C | термомасляный |
| garioni-geo | GEO | oil | 10–5 000 кВт, до 320 °C | электрический, fuels: [] |

## Решения и расхождения

1. **Категория hw170 для GPT/AS:** карточка модели не указывает температуру; серия отнесена к категории Superheated water heaters сайта → hw170. tempMaxC не указан (null), категория暗示 свыше 115 °C.
2. **Единицы ккал/ч:** для GMT/AC, GMT/AS, TH, GMT/HP мощность на сайте указана в ккал/ч; пересчитано в кВт (1 кВт = 860 ккал/ч), оригинальный ряд сохранён в sizesNote.
3. **GPT/AC (водогрейный) и GPT/AS (перегретая вода):** одинаковый диапазон 3 000–20 000 кВт, до 16 бар — на сайте это две разные карточки в разных категориях, обе включены отдельными сериями.
4. **Электрические модели** (GEV, MAXI, GEO): fuels: [] с пояснением в extra — топливо не используется.
5. **Топливо GPT:** оставлено как в легаси (gas/diesel/heavy); карточка говорит «жидкое или газообразное топливо».
6. **Водотрубные котлы, рекуператоры (Heat recovery) и когенерационные системы:** на сайте не имеют модельных карточек с диапазонами (индивидуальное проектирование, «tailor-made») — серии в карточку не включены, упомянуты в отчёте.
7. **TWA/аксессуары и водоподготовка:** разделы аксессуаров в карточку не включались (не котлы).

## Источники

- https://www.garioninaval.com/en/industrial-boilers/steam-generators/ и карточки: model-gpt, model-gbp, model-ng-c, model-gmt-and-gmtv, model-vpr, model-gmt-hp, model-gev, model-maxi
- https://www.garioninaval.com/en/industrial-boilers/hot-water-heaters/ и карточки: model-npr, model-npr-3s, model-gmt-ac, model-gpt-ac
- https://www.garioninaval.com/en/industrial-boilers/superheated-water-heaters/ (model-gpt-as, model-gmt-as)
- https://www.garioninaval.com/en/industrial-boilers/thermal-oil-heaters/ (model-th, model-geo)

## Техпроверка

- `node --experimental-strip-types scripts/catalog-check.mjs` → **catalog-check: ok**
- Импорт-тест: 16 серий, дубликатов id нет, легаси-id `garioni-gpt` присутствует, sizes 0 (типоразмеры на карточках сайта не публикуются, только диапазоны)

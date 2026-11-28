# URALZAVOD / ООО «Уральский завод» (Нейтрон) — отчёт P1

- **Позиция реестра:** №31, строка 36, ID И181, «Уральский завод / Нейтрон», приоритет P1.
- **Сайт:** https://uralzavod-kotel.ru/ — доступен, открыт и полностью спарсен 28.11.2026 (главная + 14 страниц категорий, карточки товаров).
- **Статус в реестре:** «Ранее — дополнена». Файла `src/data/uralzavod.ts` в репозитории не было; карточка новая. Живая запись `fill-rest.ts` (`uralzavod-kotel`, «Водогрейные ТВК 0,1–6 МВт», water) не входит в правку и не менялась.
- **Результат:** `src/data/uralzavod.ts` — 12 серий, 45 типоразмеров (5 карточек НТ-низкого, 15 НТ-высокого, 7 НТ-твёрдотопливных, 12 ПГ-низкого давления, 6 ПГ(Е)).

## Серии

| ID | Серия | Категория | Диапазон | Топливо |
|---|---|---|---|---|
| uralzavod-tvk | Котлы ТВК (на влажных древесных отходах) | water | 0,1–6 МВт | твёрдое |
| uralzavod-nt-low | Котлы НТ низкого давления | water | 250–500 кВт, 115 °С, 0,5–0,6 МПа | газ/дизель |
| uralzavod-nt-high | Котлы НТ высокого давления | hw170 | 3–20 МВт, 170 °С, 1,6 МПа | газ/дизель |
| uralzavod-nt-solid | Котлы НТ твердотопливные | water | 0,5–4 МВт, 0,6 МПа | твёрдое |
| uralzavod-smaga | Котельные SMAGA наружного размещения | water | 100–2000 кВт, КПД >93 % | газ |
| uralzavod-pg-low | Паровые котлы ПГ низкого давления | steam | 50–3000 кг/ч, 0,7 МПа, 165 °С | газ/дизель |
| uralzavod-pg-high | Паровые котлы ПГ высокого давления | steam | 3–35 т/ч, 1,6–2,4 МПа, до 450 °С | газ/дизель/мазут |
| uralzavod-pgp | Парогенераторы ПГ-П | steam | 50 кВт – 20 000 кг/ч, до 100 бар, до 450 °С | газ/дизель |
| uralzavod-pg-solid | Паровые котлы ПГ (Е) на твёрдом топливе | steam | 4–20 т/ч, 1,4/2,4 МПа, 194–370 °С | твёрдое/газ/дизель |
| uralzavod-tmk | Термомасляные котлы ТМК (газ/жидкое) | oil | 50–24 000 кВт, до 420 °С | газ/дизель |
| uralzavod-tmk-solid | Термомасляные котлы ТМК на твёрдом топливе | oil | 500–6000 кВт, до 400 °С | твёрдое |
| uralzavod-tmk-et | Электрические термомасляные ТМК-ЭТ | oil | 50–1000 кВт, до 380 °С | электричество (fuels: []) |

## Решения и расхождения

1. **Категории:** НТ высокого давления (170 °С, 1,6 МПа) отнесены к `hw170`; ТВК, НТ-низкого/твёрдотопливные и SMAGA — `water`; паровые — `steam`; термомасляные — `oil`.
2. **ТВК:** типоразмерный ряд не публикуется (0,1–6 МВт по заголовку; в описании показаны ТВК-1,5 и ТВК-4). Серия включена с sizes: [] и соответствующим sizesNote; топливо — влажные древесные отходы (solid).
3. **SMAGA, ПГ-высокого давления, ПГ-П, ТМК (все три):** ряды в карточках не публикуются — sizes: [] с границами диапазонов из таблиц/текста.
4. **ПГ-П:** сайт даёт смешанный диапазон «от 50 кВт до 20 000 кг пара/ч» — зафиксирован в powerNote-подобной формулировке sizesNote, steamMaxKgH 20000, powerMinKw/MaxKw null (разделённого ряда нет).
5. **ПГ низкого давления:** таблица карточки «ПГ 3000» на сайте заполнена техническим мусором (посторонние строки «Давление 123» и т. п.); параметры ПГ 3000 приняты по остальным 11 карточкам серии. Отражено в sizesNote.
6. **ПГ (Е) на твёрдом топливе:** категория включает и газомазутные модификации ГМ — fuels серии `["solid","gas","diesel"]`, 6 базовых исполнений (4 и 20 т/ч × 1,4/2,4 МПа × 194/220/250/370 °С); суффиксы С/КШ/ГМ/ПМ и «россыпью» описаны в sizesNote. Карточки ПГ-4,0-13ПМ (Е-4,0-1,4ОИ) опубликованы без таблиц.
7. **ТМК (газ/жидкое):** в таблице характеристик КПД 90–94 %, в тексте преимуществ — «94–95 %»; зафиксировано расхождение сайта в extra.
8. **ТМК-ЭТ:** электрические — `fuels: []` (в проекте нет fuelId «электричество»), питание и КПД 99 % отражены в feature/extra.
9. **Не включены в карточку-котёл:** бункерный утилизатор ТБО «Нейтрон-NT» (утилизатор, не котёл), паровые турбины, теплообменное и ёмкостное оборудование, электрощиты, БМК, ВТОТ (масла) — смежные направления сайта.
10. **Живая запись fill-rest** (`uralzavod-kotel`) описывает только ТВК 0,1–6 МВт и остаётся как есть; новая карточка даёт полную линейку завода (12 серий).

## Источники (сверка 28.11.2026, сайт открыт напрямую)

- https://uralzavod-kotel.ru/ — обзор линейки
- https://uralzavod-kotel.ru/category/kotlyi/vodogreynyie-kotlyi/vodogrejnye-kotly-tvk/ — ТВК
- https://uralzavod-kotel.ru/category/kotlyi/vodogreynyie-kotlyi/vodogreynyie-kotlyi-serii-nt/ — НТ (общая: 0,25–20 МВт, 115–170 °С, 0,6–1,6 МПа, КПД 91–92,6)
- https://uralzavod-kotel.ru/category/kotlyi/vodogreynyie-kotlyi/vodogreynyie-kotlyi-serii-nt/kotlyi-nizkogo-davleniya/ — НТ низкого давления (карточки)
- https://uralzavod-kotel.ru/category/kotlyi/vodogreynyie-kotlyi/vodogreynyie-kotlyi-serii-nt/vodogreynyie-kotlyi-vyisokogo-davleniya/ — НТ высокого давления (карточки)
- https://uralzavod-kotel.ru/category/kotlyi/vodogreynyie-kotlyi/tverdotoplivnyie-vodogreynyie-kotlyi-serii-nt/ — НТ твёрдотопливные (карточки)
- https://uralzavod-kotel.ru/category/kotlyi/vodogreynyie-kotlyi/kotely-naruzhnogo-razmeshheniya/ — SMAGA
- https://uralzavod-kotel.ru/category/kotlyi/parovyie-turbinyi/ и …/parovyie-kotlyi/parovyie-kotlyi-nizkogo-davleniya/ — ПГ низкого давления (карточки)
- https://uralzavod-kotel.ru/category/kotlyi/parovyie-kotlyi/parovyie-kotlyi-vyisokogo-davleniya/ — ПГ высокого давления (3–35 т/ч, 1,6–2,4 МПа, 450 °С, КПД >92)
- https://uralzavod-kotel.ru/category/kotlyi/parovyie-kotlyi/promyishlennyie-parogeneratoryi/ — ПГ-П
- https://uralzavod-kotel.ru/category/kotlyi/parovyie-kotlyi/parovyie-kotlyi-na-tverdom-toplive/ — ПГ (Е) 4 и 20 т/ч (карточки)
- https://uralzavod-kotel.ru/category/kotlyi/termomaslyanyie-kotlyi/termomaslyanyie-kotlyi-na-gazovom-i-zhidkom-toplive/ — ТМК (50–24 000 кВт, до 420 °С)
- https://uralzavod-kotel.ru/category/kotlyi/termomaslyanyie-kotlyi/termomaslyanyie-kotlyi-na-tverdom-toplive/ — ТМК твёрдотопливные (500 кВт – 6 МВт)
- https://uralzavod-kotel.ru/category/kotlyi/termomaslyanyie-kotlyi/elektricheskie-termomaslyanyie-kotlyi-termomaslyanyie-kotlyi/ — ТМК-ЭТ (50–1000 кВт)

## Техпроверка

- Импорт-тест (`node --experimental-strip-types`, копия с заменой `@/data/catalog`): 12 серий, 45 типоразмеров, id серий и типоразмеров уникальны — ok.
- `node --experimental-strip-types scripts/catalog-check.mjs` — «catalog-check: ok».

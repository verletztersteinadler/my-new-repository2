# VKK STANDARDKESSEL — отчёт сверки P1 (28.11.2026)

## Бренд

Реестр: №56, приоритет P1, ID И052, URL: https://vkkstandardkessel.de/. Статус сайта: открыт (немецкая версия; английская есть). VKK STANDARDKESSEL Köthen GmbH (Кётен, Саксония-Анхальт) — производитель промышленных котлов; флагман CONDORKESSEL выпускается с 1951 года. Компания входит в группу Babcock Wanson; представляет электродные котлы PARAT Halvorsen (Норвегия) в регионе DACH и изготавливает их по заказу PARAT.

## Карточка

Файл: `src/data/vkk.ts` (новая карточка, 7 серий). Легаси-файла в базе не было.

| Серия | Категория | Диапазон | Источник |
|---|---|---|---|
| CONDORKESSEL (Rauchrohrkessel) | steam | 3,2–70 т/ч, пар до 450 °C; по горячей воде до 38 МВт | dampfkessel |
| Kombikessel-System | steam | 10–70 т/ч, до 450 °C | dampfkessel |
| Heißwasserkessel | hw170 | до 38 МВт | heisswasserkessel + таблица |
| Elektrokessel | steam | чисел нет; в референсах 8 МВт | elektrokessel |
| / PARAT Elektrodenkessel | steam | пар 7,5–70 МВт, вода до 60 МВт, 6–85 бар | elektrodenkessel |
| Hybridkessel | steam | электронагрев до 8 МВт (400/690 В) + топливо | hybridkessel |
| Abhitzekessel | steam | по проекту, опции доп. сжигания | abhitzekessel |

## Решения и расхождения

1. Основной диапазон сайта: дымогарные котлы (CONDORKESSEL) 3,2–70 т/ч пара до 450 °C; комбисистема 10–70 т/ч. В таблице Leistungsspektrum для комбисистемы графа горячей воды обрезана на «до 46» без единицы (вероятно МВт) — зафиксировано в extra с оговоркой.
2. Heißwasserkessel отнесён к hw170: отдельной таблицы по воде нет, мощность до 38 МВт взята из графы «Heißwasserleistung» таблицы дымогарных котлов (оговорено в extra).
3. Elektrodenkessel: это продукция собственно PARAT; в карточке указано партнёрство VKK (id vkk-parat, алиас parat). Электрические и электродные серии — fuels [].
4. Hybridkessel: большой водяной объём с обычной горелкой плюс фланцевый ТЭН до 8 МВт; подготовка котла под последующее дооснащение.
5. Abhitzekessel: утилизационные дымогарные котлы под процесс; опции дополнительного сжигания (на остаточном кислороде) и свежего дутья (резерв при остановке газовой турбины); числового диапазона нет.
6. Экономайзеры, паровые аккумуляторы (Dampfspeicher), сосуды и ёмкости (Behälter), дымовые трубы — вспомогательное оборудование, в карточку не включены.
7. Топливо: сайт говорит о любых обычных топливах для CONDORKESSEL; в карточке gas/diesel/heavy как стандартные.

## Источники

- https://vkkstandardkessel.de/dampfkessel/
- https://vkkstandardkessel.de/heisswasserkessel/
- https://vkkstandardkessel.de/elektrokessel/
- https://vkkstandardkessel.de/elektrodenkessel/
- https://vkkstandardkessel.de/hybridkessel/
- https://vkkstandardkessel.de/abhitzekessel/

## Техпроверка

- Импорт-тест: 7 серий, дублей id нет; категории steam/hw170 валидны.
- `catalog-check.mjs`: ok.

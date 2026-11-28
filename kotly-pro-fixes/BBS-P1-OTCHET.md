# BBS GMBH — отчёт сверки P1 (28.11.2026)

## Бренд

Реестр: №55, приоритет P1, ID И099, URL: https://www.bay-boiler.com/. Статус сайта: открыт (немецкая версия; есть английская и русская). BBS GmbH (Фрайберг-ам-Неккар, Баден-Вюртемберг) — проектный производитель промышленных котлов: пар, высокотемпературная вода, термомасло, утилизация, биомасса, контейнерные решения.

## Карточка

Файл: `src/data/bbs.ts` (15 серий). Легаси-id bbs-hdk, bbs-ahk, bbs-wr, bbs-hpb, bbs-cbs, bbs-edk сохранены; добавлено 9 новых серий по полному продуктовому меню сайта.

| Серия | Категория | Диапазон | Статус |
|---|---|---|---|
| Dreizug-Dampfkessel (HDK / HDK-M) | steam | 300–16 000 кг/ч, с двумя жаровыми трубами до 50 000 кг/ч | обновлён (было без диапазона) |
| Hochdruck-Dampf-Generator | steam | 50–1 000 кг/ч, до 120 бар | новая |
| Elektro-Dampfkessel | steam | 50–2 000 кг/ч (больше по запросу) | обновлён |
| Abhitze-Dampfkessel (AHK-HD) | steam | по проекту, до 50 бар | подтверждён |
| HDK-WR | steam | по буклету, до 50 бар | сохранён (на сайте страницы нет) |
| HPB | steam | по буклету | сохранён (на сайте страницы нет) |
| CBS | steam | по буклету, до 25 бар | сохранён (на сайте страницы нет) |
| Dreizug-Heißwasserkessel | hw170 | 100–15 000 кВт (до 20 000 по запросу), до 230 °C | новая |
| Elektro-Heißwasserkessel | hw170 | до 230 °C, до 25 бар | новая |
| Abhitze-Heißwasserkessel | hw170 | по проекту | новая |
| Thermoölkessel Typ HG | oil | 0,1–16 МВт, до 320/400 °C, до 10 (20) бар | новая |
| Elektro-Heißölkessel | oil | до 350 °C, до 16 бар | новая |
| Abhitze-Thermalölkessel (AHK-HG) | oil | по проекту | новая |
| Biomassefeuerungen | steam | 0,5–50 МВт топки, биомасса/твёрдое топливо | новая |
| Heiz-Zentralen im Container | block | контейнерные котельные (пар/вода/термомасло) | новая |

## Решения и расхождения

1. HDK: страница dreizug-dampfkessel даёт диапазон 300–16 000 кг/ч (одна жарова труба) и до 50 000 кг/ч (две жаровые трубы) — в карточке установлен общий диапазон 300–50 000 кг/ч с пояснением в extra. Типоразмерного ряда нет; в проектах фигурируют типы HDK 1.000–HDK 10.000.
2. Прежняя карточка (сверка 16.11.2026 по буклету) не имела числовых диапазонов; теперь для HDK, Hochdruck-Dampf-Generator, EDK, Heißwasser- и Thermoölkessel установлены диапазоны со страниц сайта.
3. HDK-WR, HPB и CBS: на текущем сайте отдельных страниц нет; серии сохранены по буклету с пометкой в extra. AHK-HD давление «до 50 бар» — также по буклету (сайт чисел не даёт).
4. Fuels утилизационных серий (AHK-HD, AHK-HG, AHK-HW) исправлены на пустые: это котлы на уходящих газах, без собственного топлива (в прежней карточке у AHK стояли газ/дизель/твёрдое топливо).
5. Категория «Heißwasserkessel» отнесена к hw170 (свыше 115 °C): низкотемпературное исполнение до 120 °C, высокотемпературное до 230 °C.
6. Biomassefeuerungen — топки (системы сжигания) в комбинации с котлами BBS; отнесены к steam с пояснением в kind, топлива — твёрдые.
7. Heiz-Zentralen im Container отнесены к категории block (котловые блоки).
8. Экономайзеры, паровые аккумуляторы (Dampfspeicher), расширительные сосуды, ёмкостное оборудование и электрощиты — вспомогательное оборудование, в карточку не включены, перечислены в отчёте.

## Источники

- https://www.bay-boiler.com/dreizug-dampfkessel/
- https://www.bay-boiler.com/hochdruck-dampf-generator/
- https://www.bay-boiler.com/elektro-dampfkessel/
- https://www.bay-boiler.com/abhitze-dampfkessel/
- https://www.bay-boiler.com/dreizug-heisswasserkessel/
- https://www.bay-boiler.com/elektro-heisswasserkessel/
- https://www.bay-boiler.com/abhitze-heisswasserkessel/
- https://www.bay-boiler.com/heissoel-kessel-typ-hg/
- https://www.bay-boiler.com/elektro-heissoel-kessel/
- https://www.bay-boiler.com/abhitze-heissoel-kessel/
- https://www.bay-boiler.com/biomassefeuerungen/
- https://www.bay-boiler.com/heiz-zentralen-im-container/

## Техпроверка

- Импорт-тест: 15 серий, дублей id нет; категории steam/hw170/oil/block валидны.
- `catalog-check.mjs`: ok.

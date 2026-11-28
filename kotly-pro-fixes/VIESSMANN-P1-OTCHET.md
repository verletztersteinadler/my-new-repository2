# VIESSMANN — отчёт P1

- **Позиция реестра:** №35, строка 40, ID М236; И051, «Viessmann», «Vitoplex, Vitomax», приоритет P1, статус «Ранее — дополнена». Сайты реестра: viessmann-kh.com (региональный сайт Viessmann, Казахстан), viessmann.co.uk.
- **Сайт (сверка 28.11.2026, открыт напрямую):** viessmann.co.uk — карточки Vitomax LW/HW, Vitoplex 300, обзоры Vitomax и Vitoplex; зеркала viessmann-co-uk.infopark.io — карточки Vitomax HS, Vitoplex 300, Vitoplex 100-LS; технические руководства Vitoplex 200 SX2A (типоряды).
- **Исходное состояние:** `src/data/viessmann.ts` существовал (сверка 16.11.2026): 4 серии (v-lw, v-hw, v-m60, v-hs) без типоразмеров.
- **Результат:** файл переработан — 9 серий, 14 типоразмеров; все 4 легаси-id сохранены; добавлены Vitoplex 200 (SX2A), Vitoplex 300, Vitoplex 100-LS, Vitomax HS-E и Vitomax LW-E/HW-E.

## Серии

| ID | Серия | Категория | Диапазон | Ключевое |
|---|---|---|---|---|
| v-lw | Vitomax LW (300-E) | water | 0,65–22 МВт | ≤110 °C, 6/10/16 бар, КПД 95,5 % |
| v-hw | Vitomax HW | hw170 | 0,35–20 МВт | >110 °C (до 210 °C), 0,5–30 бар, H2-ready |
| v-m60 | Vitomax LW M60A | water | 700–1950 кВт | трёхходовой компактный |
| v-hs | Vitomax HS (73B/75C) | steam | 0,5–31,5 т/ч | 6–20 бар (30 по запросу), КПД до 95,5 % |
| v-vp200 | Vitoplex 200 (SX2A) | water | 90–1950 кВт, 14 типоразмеров | 90–560 и 700–1950 кВт |
| v-vp300 | Vitoplex 300 | water | 405–2000 кВт | триплекс-трубы, низкие NOx |
| v-vp100ls | Vitoplex 100-LS | steam | 0,26–2,2 т/ч | 1 бар (до 0,5 бар) |
| v-hse | Vitomax HS-E (эл.) | steam | 0,5–5,0 т/ч | fuels: [] (электро) |
| v-el | Vitomax LW-E/HW-E (эл.) | water | 0,45–4,5 МВт | fuels: [] (электро) |

## Типоряд Vitoplex 200 SX2A

90/120/150/200/270/350/440/560 кВт (группа 90–560) + 700/900/1100/1300/1600/1950 кВт (группа 700–1950) — подтверждено руководством «Vitoplex 200, type SX2A, 700 to 1950 kW» (rated heating output 700/900/1100/1300/1600/1950) и рядом группы 90–560.

## Решения и расхождения

1. **Категории:** Vitomax HW (подача >110 °C, до 210 °C) перенесён из water в hw170; LW, M60A, Vitoplex — water; HS, 100-LS, HS-E — steam.
2. **Vitomax HS:** карточка UK даёт тип 73B 0,5–4 т/ч; верхняя граница 31,5 т/ч (тип 75C) — по брошюре и техпаспорту лицензионного Vitomax HS M75C (Гермес-Липецк, см. hermes.ts); обе границы отражены в v-hs, расхождение оговорено в extra.
3. **Важно (позиционирование):** «VITOMAX SX2A» в реестре/лицензионном производстве Гермес — это у Viessmann Vitoplex 200, тип SX2A; уточнение зафиксировано в карточке.
4. **Электрические (HS-E, LW-E/HW-E)** и гибриды EH: `fuels: []` (в проекте нет fuelId «электричество»), пояснения в extra.
5. **H2-ready:** все Vitomax — до 100 % водорода с соответствующей горелкой (в fuels отражены gas/diesel/heavy, водород — в feature/extra).
6. **Типоряды LW/HW/M60A/300:** на карточках сайта не публикуются — sizes: [] с sizesNote; ссылки на лицензионные ряды в hermes.ts.
7. viessmann-kh.com в сверке не переоткрывался (региональный сайт той же продуктовой линейки; учтён в checked).

## Источники (сверка 28.11.2026)

- https://www.viessmann.co.uk/en/products/large-boiler/vitomax-lw.html — Vitomax LW (0,65–22 МВт, ≤110 °C, 6/10/16 бар)
- https://www.viessmann.co.uk/en/products/large-boiler/vitomax-hw.html — Vitomax HW (0,35–20 МВт, >110 °C, ≤210 °C, 0,5–30 бар)
- https://www.viessmann.co.uk/en/products/large-boiler/vitomax-lw-m60a.html — M60A (700–1950 кВт)
- https://www.viessmann.co.uk/en/products/large-boiler/vitomax-family.html — обзор Vitomax (HS-E 0,5–5 т/ч; HW-E/LW-E 0,45–4,5 МВт; гибриды EH; давление 6–20 бар)
- https://viessmann-co-uk.infopark.io/products/steam-boilers/high-pressure-steam-boilers/vitomax-hs — Vitomax HS 73B (0,5–4 т/ч, 6–20 бар)
- https://viessmann-co-uk.infopark.io/products/gas-boilers/low-temperature-gas-boilers/vitoplex-300 — Vitoplex 300 (405–2000 кВт)
- https://www.viessmann.co.uk/en/products/low-temperature/vitoplex-family.html — обзор Vitoplex (200: 90–1950 кВт, 300: 405–2000 кВт)
- Руководство Vitoplex 200 SX2A (manualslib/manymanuals, зеркало документации Viessmann): типоряд 700–1950 кВт
- VIESSMANN Product Pocket Guide 06.25 (PDF): Vitomax 300-E LW 0,65–22 МВт; HW 0,35–20 МВт, 95,5 %

## Техпроверка

- Импорт-тест (`node --experimental-strip-types`, копия с заменой `@/data/catalog`): 9 серий, 14 типоразмеров, id уникальны, легаси-id v-lw/v-hw/v-m60/v-hs на месте — ok.
- `node --experimental-strip-types scripts/catalog-check.mjs` — «catalog-check: ok».

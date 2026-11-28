# ICI CALDAIE — отчёт P1

- **Позиция реестра:** №36, строка 41, ID М047, «ICI CALDAIE», «Водогрейные и паровые котлы», приоритет P1, статус «Ранее — дополнена». Сайт: https://www.icicaldaie.com/.
- **Сайт:** открыт напрямую 28.11.2026; спарсены страницы категорий Industrial Boilers (Steam, Hot Water, Superheated Water, Thermal Oil, Waste Heat Recovery) с паспортными данными каждой серии.
- **Исходное состояние:** `src/data/ici.ts` существовал (сверка 16.11.2026): только GX/GX S/GX C.
- **Результат:** файл переработан — 17 серий (11 паровых, 2 водогрейные, 2 перегретой воды, 1 термомасляная, 1 утилизационная); легаси-id `ici-gx`, `ici-gxs`, `ici-gxc` сохранены.

## Серии

| ID | Серия | Категория | Пара/мощность | Давление | КПД |
|---|---|---|---|---|---|
| ici-gx | GX | steam | 1 700–32 000 кг/ч (1 163–17 442 кВт) | 12/15 бар | 90 % |
| ici-gxs | GX S (перегретый пар) | steam | 1 700–25 000 кг/ч | 12/15 бар | 90 % |
| ici-gxc | GX C (+утилизация 100–5 000 кг/ч) | steam | 1 700–25 000 кг/ч | 12/15 бар | 90 % |
| ici-evosteam | EVOSTEAM | steam | 1 500–10 000 кг/ч (1 020–6 826 кВт) | 12/15 бар | >90 % |
| ici-ecovapor | ECOVAPOR | steam | 1 000–3 000 кг/ч (681–2 044 кВт) | 12 бар | >95 % |
| ici-trevapor | TReVAPOR | steam | 1 200–6 500 кг/ч (818–4 770 кВт) | 12 бар | 90,5 % |
| ici-sixen-n | SIXEN N | steam | 350–5 000 кг/ч (238–3 407 кВт) | 12/15 бар | >90 % |
| ici-bnx | BNX (низкое давление) | steam | 100–3 000 кг/ч (69,8–2 035 кВт) | 0,98/0,5 бар | >91 % |
| ici-fx-n | FX N (мгновенный) | steam | 50–300 кг/ч (31,7–209,2 кВт) | 5 бар | >91 % |
| ici-flash | FLASH (мгновенный) | steam | 20,3–244,2 кг/ч (15–180 кВт) | 4,5 бар | — |
| ici-isg | ISG (косвенный чистый пар) | steam | 160–2 750 кг/ч (115–2 054 кВт) | 6 бар | — |
| ici-tnx | TNX | water | 3 000–20 000 кВт | 6 бар | >92 % |
| ici-tnox | TNOX | water | 2 500–25 000 кВт | 6 бар | — |
| ici-asx-en | ASX EN | hw170 | 470–3 500 кВт | 5/12 бар | >90 % |
| ici-asgx-en | ASGX EN | hw170 | 3 000–17 000 кВт | 12 бар | >90 % |
| ici-opx | OPX | oil | 116–9 302 кВт | 10 бар | >86 % |
| ici-wh | WH (WHB/WHS/WHC/WHO) | steam | 100–25 000 кВт (пар 100–20 000) | 1–25 бар | — |

## Решения и расхождения

1. **Вся линейка Industrial Boilers добавлена:** ранее были только GX-исполнения; теперь покрыты все 17 серий сайта (категории сайта: паровые 50–32 000 кг/ч; водогрейные 2 500–20 000 кВт; перегретая вода 200–17 000 кВт; термомасляные 100–9 000 кВт).
2. **GX S/GX C:** диапазоны исполнений (перегрев 1 700–25 000; утилизация 100–5 000 кг/ч) взяты с карточки GX прошлой сверки; на текущих страницах категорий диапазоны исполнений не публикуются — оговорено в extra.
3. **Категории:** ASX EN и ASGX EN (перегретая вода >110 °C) — hw170; TNX/TNOX — water; OPX — oil.
4. **WH (утилизационные):** собраны в одну серию (WHB пар, WHS перегретая вода, WHC горячая вода, WHO термомасло), `fuels: []` — собственного горения нет.
5. **GSS:** все промышленные котлы поддерживают работу без оператора до 72 часов (operator exemption) — отражено в feature основной серии GX.
6. Типоряды внутри диапазонов сайт не публикует — sizes: [] с sizesNote.
7. Не включены: Commercial Solutions (конденсационные/неконденсационные домовые), горелки, аксессуары, котельная обвязка — смежные разделы сайта.

## Источники (сверка 28.11.2026, сайт открыт напрямую)

- https://www.icicaldaie.com/en/products/industrial-boilers/steam-boilers/ — GX, EVOSTEAM, ECOVAPOR, TReVAPOR, SIXEN N, BNX, FX N, FLASH, ISG
- https://www.icicaldaie.com/en/products/industrial-boilers/hot-water-boilers/ — TNX, TNOX
- https://www.icicaldaie.com/en/products/industrial-boilers/superheated-water-boilers/ — ASX EN, ASGX EN
- https://www.icicaldaie.com/en/products/industrial-boilers/thermal-oil-boilers/ — OPX
- https://www.icicaldaie.com/en/products/industrial-boilers/heat-recovery-boilers/ — WHB, WHS, WHC, WHO

## Техпроверка

- Импорт-тест (`node --experimental-strip-types`, копия с заменой `@/data/catalog`): 17 серий, id уникальны, легаси-id ici-gx/ici-gxs/ici-gxc на месте — ok.
- `node --experimental-strip-types scripts/catalog-check.mjs` — «catalog-check: ok».

## Контроль серий (лист «Контроль серий»)

Контрольный список: REX, SIXEN, EVOSTEAM, ECOVAPOR и остальные заводские серии.

- SIXEN — covered (SIXEN N, паровой, промышленный раздел).
- EVOSTEAM — covered (паровой).
- ECOVAPOR — covered (паровой).
- REX — на действующем сайте ICI отнесён к разделу Commercial Solutions (неконденсационные котлы), вне линейки Industrial Boilers; в промышленную карточку P1 не включён. Позиция зафиксирована на случай отдельного решения по коммерческому сегменту.
- Остальные серии промышленного раздела (GX/GX S/GX C, TNX/TNOX, ASX EN/ASGX EN, OPX, TReVAPOR, BNX, FX N, FLASH, ISG, WHB/WHS/WHC/WHO) — covered, см. список серий выше.

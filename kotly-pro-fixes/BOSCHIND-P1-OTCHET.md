# BOSCH INDUSTRIAL / LOOS — отчёт P1

- **Позиция реестра:** №34, строка 39, ID И006, «Bosch Industrial / LOOS», «Промышленные водогрейные и паровые котлы», приоритет P1, статус «Ранее — дополнена».
- **Сайт:** https://www.bosch-industrial.com/ (раздел OCS Commercial & Industrial) — доступен, карточки продукции всех котлов открыты и спарсены 28.11.2026. Производитель — Bosch Industriekessel GmbH (бренд LOOS поглощён Bosch в 2009 г.).
- **Исходное состояние:** `src/data/boschind.ts` существовал (сверка 16.11.2026): 9 серий, без типоразмеров; примечание «U-MB, CSB, HRSB, ELHB и ELSB … их цифры в эту поставку не читались».
- **Результат:** файл переработан — 14 серий: 5 новых (U-MB, CSB, HRSB, ELSB, ELHB), все легаси-id сохранены, характеристики UT-серии уточнены по карточкам сайта.

## Серии

| ID | Серия | Категория | Диапазон | Давление/температура |
|---|---|---|---|---|
| bosch-uls | UL-S | steam | 1 250–28 000 кг/ч | до 30 бар, до 235 °C |
| bosch-ulsx | UL-SX (перегретый пар) | steam | 2 600–28 000 кг/ч | до 30 бар, до 300 °C |
| bosch-zfr | ZFR | steam | 18 000–55 000 кг/ч | до 30 бар, до 235 °C |
| bosch-zfrx | ZFR-X (перегретый пар) | steam | 18 000–55 000 кг/ч | до 30 бар, до 300 °C |
| bosch-umb | U-MB (новая) | steam | 200–2 000 кг/ч | до 16 бар, до 204 °C |
| bosch-csb | CSB (новая) | steam | 300–4 800 кг/ч | до 0,5 бар, до 110 °C |
| bosch-hrsb | HRSB (новая, утилизационный) | steam | 400–4 100 кг/ч | 10 и 16 бар |
| bosch-elsb | ELSB (новая, электрический) | steam | 350–8 300 кг/ч | до 24 бар, до 224 °C |
| bosch-elhb | ELHB (новая, электрический) | hw170 | 250–5 500 кВт | до 16 бар, до 190 °C |
| bosch-uni | Uni Condens | water | 0,8–1,2 МВт | до 6 бар, до 110 °C |
| bosch-utl | UT-L (UNIMAT) | water | 650–25 000 кВт | до 16 бар, до 110 °C |
| bosch-utm | UT-M (UNIMAT) | hw170 | 750–19 200 кВт | до 16 бар, до 190 °C |
| bosch-uth | UT-H (UNIMAT) | hw170 | 820–18 300 кВт | до 30 бар, до 225 °C |
| bosch-uthz | UT-HZ (UNIMAT) | hw170 | 13 000–38 000 кВт | до 30 бар, до 225 °C |

## Исправления против прежней сверки (16.11.2026)

1. **UT-L:** 120 → 110 °C (карточка: «Low-pressure hot water … up to 110 °C»), 0,6 → 0,65 МВт нижняя граница.
2. **UT-M:** 0,7–19 → 750–19 200 кВт.
3. **UT-H:** 210 → 225 °C, 0,8–18 → 820–18 300 кВт.
4. **UT-HZ:** 210 → 225 °C.
5. **Категории:** UT-M, UT-H, UT-HZ и ELHB (190–225 °C) перенесены из water в hw170 («свыше 115 °C»); UT-L и CSB (110 °C) — в water/steam.
6. **UL-SX/ZFR-X:** карточки UL-S/UL-SX и ZFR/ZFR-X публикуют только данные насыщенного пара (235 °C); перегретые 300 °C оставлены по брошюре прошлой сверки — оговорено в extra.

## Решения

- **Топливо:** газ, масло, биогаз, биомасло, водород (на карточках; в фильтре проекта отражены gas/diesel, остальные — в extra, как и прежде). CSB — до 20 % водорода в смеси.
- **HRSB:** утилизационный котёл без собственного горения (отходящие газы 500–23 500 кг/ч при 550 °C, источники — ГПУ 0,5–4 МВтэл) — `fuels: []`, пояснение в extra.
- **ELSB/ELHB:** электрические (380/400/690 В) — `fuels: []`, пояснение в extra.
- **Uni Condens:** карточка при этой сверке не переоткрывалась, данные прежней сверки сохранены (отмечено в feature).
- Типоразмерные ряды внутри диапазонов Bosch на карточках не публикует — sizes: [] с соответствующим sizesNote (как и в исходном файле).

## Источники (сверка 28.11.2026, сайт открыт напрямую)

- https://www.bosch-industrial.com/global/en/ocs/commercial-industrial/steam-boilers-669471-c/ — паровые котлы (обзор)
- https://www.bosch-industrial.com/global/en/ocs/commercial-industrial/hot-water-boilers-669462-c/ — водогрейные (обзор)
- …/universal-steam-boiler-ul-s-ul-sx-669474-p/, …/universal-steam-boiler-zfr-zfr-x-669475-p/, …/universal-steam-boiler-u-mb-669473-p/, …/universal-steam-boiler-csb-1001957-p/, …/universal-heat-recovery-steam-boiler-hrsb-669521-p/, …/electric-steam-boiler-elsb-19175285-p/ — паровые серии
- …/electric-boiler-for-heating-and-hot-water-elhb-20939747-p/ — ELHB
- …/unimat-heating-boiler-ut-l-669463-p/, …/unimat-hot-water-boiler-ut-m-669464-p/, …/unimat-hot-water-boiler-ut-h-669465-p/, …/unimat-hot-water-boiler-ut-hz-669466-p/ — UNIMAT

## Техпроверка

- Импорт-тест (`node --experimental-strip-types`, копия с заменой `@/data/catalog`): 14 серий, id уникальны, все 9 легаси-id на месте — ok.
- `node --experimental-strip-types scripts/catalog-check.mjs` — «catalog-check: ok».

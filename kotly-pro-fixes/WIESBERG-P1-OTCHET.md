# WIESBERG — отчёт P1 (№41, М228)

**Дата сверки:** 28.11.2026
**Сайт:** https://www.wiesbergboilers.com/ — открыт, отвечает корректно
**Реестр:** строка 46, приоритет P1, «Промышленные котлы STEEL», статус «Ранее — дополнена»

## Что сделано

Файла `src/data/wiesberg.ts` в базе не было — карточка новая: **1 серия** (T-PET BOILER, 5 типоразмеров).

## Важное расхождение с реестром

Реестр описывает Wiesberg как «промышленные котлы STEEL», но действующий каталог wiesbergboilers.com содержит только пеллетную продукцию бытового и профессионального сегмента (дивизион Bioenergy): пеллетные котлы, печи, гидропечи, кухни. Промышленных паровых/водогрейных стальных котлов на сайте нет. Wiesberg — зарегистрированная торговая марка Unical AG S.p.A. (промышленная линейка Unical закрыта отдельной карточкой unical.ts, реестр №40).

Единственный котёл в каталоге:
| id | Модель | Диапазон | Топливо |
|---|---|---|---|
| wiesberg-tpet | T-PET BOILER 14-18-22-26-30 | 14–30 кВт (тепловая 13,8–29 кВт), класс A+ | пеллеты (solid) |

Остальная продукция (пеллетные печи YURA, гидропечи, кухни) — не котлы, в карточку не включена.

## Источники

- https://www.wiesbergboilers.com/ (главная: «Wiesberg is a registered trademark of Unical AG S.p.A.»)
- https://www.wiesbergboilers.com/catalogue-products/pellet-1727/pellet/1692/pellet-boilers
- https://www.wiesbergboilers.com/products/pellet-1727/pellet/pellet-boilers/1814/t-pet-boiler-14-18-22-26-30 (Thermal power 13,8 / 17,5 / 21 / 25 / 29 кВт)

## Техпроверка

- `node --experimental-strip-types scripts/catalog-check.mjs` → **catalog-check: ok**
- Импорт-тест: 1 серия, 5 типоразмеров, дубликатов нет

# MIMSAN ENERGY — отчёт P1 (№47, И133)

**Дата сверки:** 28.11.2026
**Сайт:** https://www.mimsanenergy.com/ — доступен, но **SSL-сертификат истёк** (браузер выдаёт предупреждение; страницы отдаются корректно, зеркала EN/RU работают)
**Раздел источника:** Ürünler: Kömür Yakıtlı Akışkan Yataklı Kazanlar / Biyokütle Yakıtlı Enerji Santralleri / Çöp Yakıtlı Enerji Santralleri / Katı Yakıtlı Kojenerasyon Tesisleri / Atık Isı Kazanım Sistemleri / Sıvı ve Gaz Yakıtlı Kazanlar (+ Dolaşımlı tip akışkan yataklı buhar ve kızgın yağ kazanları)
**Реестр:** строка 52, приоритет P1, «Паровые, термомасляные, водотрубные котлы»

## Что сделано

Файла `src/data/mimsan.ts` в базе не было — карточка новая: **6 серий** (типоразмеров нет — см. ниже).

## Серии

| id | Категория | Диапазон | Топливо |
|---|---|---|---|
| mimsan-cfb-steam | steam | 10 000–100 000 кг/ч (по платформе CFB); до 60 МВт тепл. на единицу | лигнит 2 500–6 500 ккал/кг |
| mimsan-watertube | steam | по проекту (референс D-типа 3×25 МВт) | газ/жидкое |
| mimsan-biomass | steam | 10 000–100 000 кг/ч, 12 станций, 200 МВтэ суммарно | биомасса |
| mimsan-wte | steam | 10 000–100 000 кг/ч | RDF/ТБО |
| mimsan-cfb-oil | oil | до 60 000 кВт (CFB, пылеугольный) | уголь |
| mimsan-whr | steam | утилизационные (водотрубные/жаротрубные), fuels: [] | тепло отходящих газов |

## Решения и расхождения

1. **Таблиц типоразмеров нет.** Mimsan — проектный производитель «под ключ»: на страницах публикуются только технологические диапазоны. EN-версия главной даёт ключевую цифру: «industrial steam boilers and thermal oil boilers up to 60 MWth in each unit» (CFB-технология) — использована как максимум для CFB-серий. Диапазон 10–100 т/ч пара указан на страницах биомассы и WtE.
2. **CFB-термомасляный котёл — угольный** (страница «Dolaşımlı tip akışkan yataklı kızgın yağ kazanı»: топливо Toz Kömür, пылеугольный лигнит): категория oil, fuels: [solid].
3. **Диапазон 10–100 т/ч отнесён к платформе CFB**: серия mimsan-cfb-steam получила 10 000–100 000 кг/ч по данным страниц биомассы/WtE (та же циркулирующая кипящий слой технология); собственный диапазон угольной страницы не публикуется — оговорено в extra.
4. **Katı Yakıtlı Kojenerasyon (пылеугольная когенерация)** — электростанции, а не котловая серия: в отдельную карточку не вынесена, упомянута в отчёте. Аналогично WtE включён как серия, поскольку страница публикует паровой диапазон 10–100 т/ч.
5. **Утилизационные (Atık Isı)** — fuels: [], без типоразмеров (проектное изготовление); продукты: пар, горячая вода, термомасло.
6. **Каталоги** (kataloglar.aspx) выдают только список названий без прямых PDF-ссылок; таблиц из них не извлечь.

## Источники

- https://www.mimsanenergy.com/ (TR/EN/RU)
- https://www.mimsanenergy.com/urunler/sivi-ve-gaz-yakitli-kazanlar/
- https://www.mimsanenergy.com/urunler/dolasimli-tip-akiskan-yatakli-buhar-kazani/
- https://www.mimsanenergy.com/urunler/dolasimli-tip-akiskan-yatakli-kizgin-yag-kazani/
- https://www.mimsanenergy.com/urunler/biyokutle-yakitli-enerji-santralleri/
- https://www.mimsanenergy.com/urunler/cop-yakitli-enerji-santralleri/
- https://www.mimsanenergy.com/urunler/atik-isi-kazanim-sistemleri/

## Техпроверка

- Импорт-тест: 6 серий, дублей id нет.
- `node --experimental-strip-types scripts/catalog-check.mjs` → catalog-check: ok.

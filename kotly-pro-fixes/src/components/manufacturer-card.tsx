import { Link } from "@tanstack/react-router";
import { lines, type Manufacturer } from "@/data/manufacturers";

/**
 * Карточка производителя. Единый вид для каталога и блока подбора:
 * при переходе из «Все типы» в конкретный тип оборудования внутри подбора
 * показываются те же карточки, что и в фильтре каталога.
 */
export function ManufacturerCard({ item, hasSeries }: { item: Manufacturer; hasSeries: boolean }) {
  return (
    <li className="flex min-h-44 flex-col overflow-hidden rounded-3xl border border-line bg-surface">
      <div className={hasSeries ? "bg-accent px-5 py-5 text-on-accent" : "bg-ink px-5 py-5 text-bg"}>
        <p className="text-xs font-semibold uppercase opacity-80">
          {lines.find((entry) => entry.id === item.line)?.label}
          {" · "}
          {item.place}
          {hasSeries ? " · серии открыты" : " · карточка открыта"}
        </p>
        <h2 className="mt-2 font-display text-3xl leading-[0.95] font-extrabold tracking-[-0.04em]">{item.title}</h2>
      </div>
      <div className="flex flex-1 flex-col px-5 pt-4 pb-5">
        {item.title !== item.name ? <p className="line-clamp-2 text-xs leading-relaxed text-muted">{item.name}</p> : null}
        {hasSeries ? (
          <p className="mt-2 text-xs leading-relaxed text-muted">Взято с оф. сайта производителя</p>
        ) : (
          <p className="mt-2 text-sm leading-relaxed text-ink">Информация на сайте производителя не предоставлена.</p>
        )}
        <Link
          to="/manufacturers/$slug"
          params={{ slug: item.slug }}
          search={hasSeries ? {} : { ask: "1" }}
          className={
            hasSeries
              ? "mt-4 inline-flex h-11 items-center self-start rounded-sm bg-ink px-4 text-sm leading-none font-semibold text-bg hover:bg-ink/80"
              : "mt-4 inline-flex h-12 items-center self-start rounded-sm bg-accent px-5 text-base leading-none font-extrabold text-on-accent ring-2 ring-ink"
          }
        >
          {hasSeries ? "Смотреть серии" : "Подобрать аналоги"}
        </Link>
      </div>
    </li>
  );
}

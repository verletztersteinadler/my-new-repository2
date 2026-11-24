import { useId, useMemo, useState, type FormEvent, type KeyboardEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Search, ArrowRight, X } from "lucide-react";
import { findCatalogHits } from "@/lib/catalog-search";
import type { CatalogHit } from "@/lib/catalog-search";

type Props = {
  className?: string;
  compact?: boolean;
};

export function CatalogHeaderSearch({ className = "", compact = false }: Props) {
  const navigate = useNavigate();
  const listId = useId();
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const [selected, setSelected] = useState(-1);
  const trimmed = value.trim().slice(0, 80);
  const hits = useMemo(() => findCatalogHits(trimmed, 7), [trimmed]);
  const expanded = focused && trimmed.length > 0;

  function openHit(hit: CatalogHit) {
    setFocused(false);
    setSelected(-1);
    navigate({
      to: "/$slug",
      params: { slug: hit.slug },
      search: hit.seriesId ? { series: hit.seriesId } : {},
    });
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!trimmed) return;
    if (selected >= 0 && hits[selected]) {
      openHit(hits[selected]);
      return;
    }
    setFocused(false);
    navigate({ to: "/", search: { q: trimmed }, hash: "manufacturers" });
  }

  function handleKeys(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      setFocused(false);
      setSelected(-1);
      event.currentTarget.blur();
    } else if (event.key === "ArrowDown" && expanded && hits.length) {
      event.preventDefault();
      setSelected((v) => (v + 1) % hits.length);
    } else if (event.key === "ArrowUp" && expanded && hits.length) {
      event.preventDefault();
      setSelected((v) => (v <= 0 ? hits.length - 1 : v - 1));
    }
  }

  return (
    <div className={`relative min-w-0 ${className}`} onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) {
        setFocused(false);
        setSelected(-1);
      }
    }}>
      <form role="search" onSubmit={submit} className="relative flex h-11 min-w-0 items-center overflow-hidden rounded-xl border border-white/20 bg-white/10 text-white transition-colors focus-within:border-[#d3123b] focus-within:bg-white/15">
        <Search aria-hidden="true" className="ml-3 size-[18px] shrink-0 text-white/65" />
        <input
          type="search"
          name="catalog-search"
          value={value}
          onChange={(event) => { setValue(event.target.value.slice(0, 80)); setSelected(-1); setFocused(true); }}
          onFocus={() => setFocused(true)}
          onKeyDown={handleKeys}
          aria-label="Поиск по каталогу производителей, серий и моделей"
          aria-autocomplete="list"
          aria-expanded={expanded}
          aria-controls={expanded ? listId : undefined}
          aria-activedescendant={expanded && selected >= 0 ? `${listId}-result-${selected}` : undefined}
          placeholder={compact ? "Поиск по каталогу" : "Поиск: производитель, серия, модель"}
          autoComplete="off"
          className="h-full min-w-0 flex-1 bg-transparent px-3 text-[16px] text-white outline-none placeholder:text-white/55 lg:text-sm [&::-webkit-search-cancel-button]:hidden"
        />
        {value && (
          <button type="button" onClick={() => { setValue(""); setSelected(-1); setFocused(true); }} className="inline-flex size-9 shrink-0 items-center justify-center text-white/75 hover:text-white" aria-label="Очистить поиск">
            <X aria-hidden="true" className="size-4" />
          </button>
        )}
        <button type="submit" aria-label="Найти в каталоге" className="flex h-full shrink-0 items-center gap-1 border-l border-white/15 bg-[#d3123b] px-3 font-semibold text-white transition-colors hover:bg-[#a80f30]">
          <span className="hidden text-xs xl:inline">Найти</span>
          <ArrowRight aria-hidden="true" className="size-4" />
        </button>
      </form>

      {expanded && (
        <div id={listId} role="listbox" aria-label="Подсказки поиска" className="absolute inset-x-0 top-[calc(100%+0.5rem)] z-[75] max-h-[min(70dvh,28rem)] overflow-y-auto overscroll-contain rounded-2xl border border-[#2d3947] bg-[#111c2a] p-1.5 text-white shadow-2xl shadow-black/40">
          {hits.length > 0 ? hits.map((hit, index) => (
            <Link
              id={`${listId}-result-${index}`}
              key={`${hit.kind}-${hit.slug}-${hit.seriesId ?? ""}-${hit.title}-${index}`}
              to="/$slug"
              params={{ slug: hit.slug }}
              search={hit.seriesId ? { series: hit.seriesId } : {}}
              role="option"
              aria-selected={selected === index}
              onMouseEnter={() => setSelected(index)}
              onClick={() => { setFocused(false); setValue(""); }}
              className={`flex min-h-12 min-w-0 flex-col justify-center rounded-xl px-3 py-2 text-left transition-colors ${selected === index ? "bg-white/15" : "hover:bg-white/10"}`}
            >
              <span className="truncate text-sm font-semibold">{hit.title}</span>
              <span className="truncate text-xs text-white/65">{hit.subtitle}</span>
            </Link>
          )) : (
            <p className="px-3 py-3 text-sm text-white/75">Совпадений не найдено. Можно уточнить запрос.</p>
          )}
          <button type="button" onClick={() => { setFocused(false); navigate({ to: "/", search: { q: trimmed }, hash: "manufacturers" }); }} className="mt-1 flex w-full items-center justify-between rounded-xl border-t border-white/15 px-3 py-3 text-left text-sm font-semibold text-white/90 hover:bg-white/10">
            Все результаты в каталоге <ArrowRight aria-hidden="true" className="size-4" />
          </button>
        </div>
      )}
    </div>
  );
}

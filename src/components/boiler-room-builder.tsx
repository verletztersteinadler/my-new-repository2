import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { LeadForm } from "@/components/lead-form";
import { SheetHandle } from "@/components/sheet-handle";
import {
  filterSeries,
  fuels,
  powerBands,
  primarySpec,
  steamBands,
  type CatalogQuery,
  type FuelId,
  type PowerBand,
  type SteamBand,
} from "@/data/catalog";

type PublishedCatalog = (typeof import("@/data/series-index"))["publishedCatalogs"][number];

type Room = "block" | "heat" | "steam";
type KitId = "burner" | "pumps" | "auto" | "economizer" | "water" | "chimney" | "metering";

const rooms: { id: Room; label: string }[] = [
  { id: "block", label: "Блочно-модульная котельная" },
  { id: "heat", label: "Отопление и ГВС" },
  { id: "steam", label: "Паровая котельная" },
];

const roomKits: { id: KitId; label: string; inCatalog: boolean }[] = [
  { id: "burner", label: "Горелки", inCatalog: false },
  { id: "pumps", label: "Насосы", inCatalog: true },
  { id: "auto", label: "Автоматика", inCatalog: true },
  { id: "economizer", label: "Экономайзер", inCatalog: false },
  { id: "water", label: "Водоподготовка", inCatalog: false },
  { id: "chimney", label: "Дымоход и дымосос", inCatalog: false },
  { id: "metering", label: "Узел учёта тепла", inCatalog: false },
];

const heatOnly = new Set(["steam", "auto", "air", "pumps"]);

export function BoilerRoomBuilder() {
  const [room, setRoom] = useState<Room>("block");
  const [fuel, setFuel] = useState<FuelId | "any">("any");
  const [power, setPower] = useState<PowerBand | "any">("any");
  const [steam, setSteam] = useState<SteamBand | "any">("any");
  const [kit, setKit] = useState<KitId[]>(["auto", "pumps"]);
  const [catalogs, setCatalogs] = useState<PublishedCatalog[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let alive = true;
    import("@/data/series-index").then((module) => {
      if (alive) setCatalogs(module.publishedCatalogs);
    });
    return () => {
      alive = false;
    };
  }, []);

  const hits = useMemo(() => {
    if (catalogs.length === 0) return [];
    const query: CatalogQuery = {
      type: room === "block" ? "block" : room === "steam" ? "steam" : undefined,
      fuel: fuel === "any" ? undefined : fuel,
      power: room === "steam" ? undefined : power === "any" ? undefined : power,
      steam: room === "steam" && steam !== "any" ? steam : undefined,
    };
    const rows = catalogs.flatMap((catalog) =>
      filterSeries(query, catalog.series).map((series) => ({ series, slug: catalog.slug, maker: catalog.title })),
    );
    return room === "heat" ? rows.filter((row) => !heatOnly.has(row.series.categoryId)) : rows;
  }, [catalogs, room, fuel, power, steam]);

  function toggleKit(id: KitId) {
    setKit((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  }

  const roomLabel = rooms.find((item) => item.id === room)?.label ?? "";
  const paramLabel =
    room === "steam"
      ? steam === "any"
        ? "не задана"
        : steamBands.find((item) => item.id === steam)?.title ?? "не задана"
      : power === "any"
        ? "не задана"
        : powerBands.find((item) => item.id === power)?.title ?? "не задана";
  const fuelLabel = fuel === "any" ? "любое" : fuels.find((item) => item.id === fuel)?.title ?? "любое";
  const kitLabels = kit.map((id) => roomKits.find((item) => item.id === id)?.label).filter(Boolean);
  const comment = `Конструктор котельной. Тип: ${roomLabel}. ${room === "steam" ? "Паропроизводительность" : "Мощность"}: ${paramLabel}. Топливо: ${fuelLabel}. Комплектация: ${kitLabels.length ? kitLabels.join(", ") : "базовая (котлы)"}. Подходящих открытых серий в каталоге: ${hits.length}. Прошу собрать готовое решение.`;

  return (
    <section id="konstruktor" className="mx-auto mt-8 max-w-6xl scroll-mt-20 px-4">
      <div className="rounded-3xl border border-line bg-surface p-4 sm:p-6">
        <p className="text-xs font-semibold tracking-[0.14em] text-ink uppercase">Полноценное решение</p>
        <h2 className="mt-2 font-display text-3xl leading-[0.95] font-extrabold tracking-[-0.04em]">
          Конструктор котельной
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Для тех, кому нужна не одна модель, а котельная целиком: выбираем тип, мощность и комплектацию —
          показываем, какие открытые серии подходят, и отправляем заявку на расчёт. Это не заказ и не покупка.
        </p>

        <fieldset className="mt-5">
          <legend className="text-sm font-semibold">Что строим</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {rooms.map((item) => (
              <Chip key={item.id} active={room === item.id} onClick={() => setRoom(item.id)}>
                {item.label}
              </Chip>
            ))}
          </div>
        </fieldset>

        <fieldset className="mt-4">
          <legend className="text-sm font-semibold">{room === "steam" ? "Паропроизводительность" : "Мощность"}</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {room === "steam" ? (
              <>
                <Chip active={steam === "any"} onClick={() => setSteam("any")}>
                  Любая
                </Chip>
                {steamBands.map((item) => (
                  <Chip key={item.id} active={steam === item.id} onClick={() => setSteam(item.id)}>
                    {item.title}
                  </Chip>
                ))}
              </>
            ) : (
              <>
                <Chip active={power === "any"} onClick={() => setPower("any")}>
                  Любая
                </Chip>
                {powerBands.map((item) => (
                  <Chip key={item.id} active={power === item.id} onClick={() => setPower(item.id)}>
                    {item.title}
                  </Chip>
                ))}
              </>
            )}
          </div>
        </fieldset>

        <fieldset className="mt-4">
          <legend className="text-sm font-semibold">Топливо</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            <Chip active={fuel === "any"} onClick={() => setFuel("any")}>
              Любое
            </Chip>
            {fuels.map((item) => (
              <Chip key={item.id} active={fuel === item.id} onClick={() => setFuel(item.id)}>
                {item.title}
              </Chip>
            ))}
          </div>
        </fieldset>

        <fieldset className="mt-4">
          <legend className="text-sm font-semibold">Комплектация</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {roomKits.map((item) => (
              <Chip key={item.id} active={kit.includes(item.id)} onClick={() => toggleKit(item.id)}>
                {item.label}
                {item.inCatalog ? " · в каталоге" : ""}
              </Chip>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted">
            Котлы входят в базовую комплектацию. «В каталоге» — по этим позициям есть открытые серии в справочнике.
          </p>
        </fieldset>

        {catalogs.length > 0 ? (
          <div className="mt-5 rounded-2xl bg-chip p-4">
            <p className="text-sm text-muted">
              Подходящих открытых серий: <span className="font-semibold text-ink tabular-nums">{hits.length}</span>
            </p>
            {hits.length > 0 ? (
              <ul className="mt-2 grid gap-2 sm:grid-cols-3">
                {hits.slice(0, 3).map((item) => (
                  <li key={`${item.slug}-${item.series.id}`} className="rounded-xl border border-line bg-surface px-3 py-2">
                    <p className="text-xs font-semibold text-ink uppercase">{item.maker}</p>
                    <p className="mt-1 font-display text-lg leading-none font-extrabold tracking-[-0.04em]">{item.series.name}</p>
                    <p className="mt-1 text-xs text-muted">
                      {primarySpec(item.series).label}: {primarySpec(item.series).value}
                    </p>
                    <Link to="/manufacturers/$slug" params={{ slug: item.slug }} className="mt-1 inline-flex text-xs font-semibold text-ink">
                      Открыть производителя
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : null}

        <button
          type="button"
          className="mt-6 flex w-full items-center justify-between gap-4 rounded-3xl bg-accent px-5 py-5 text-left text-on-accent hover:bg-accent-hover sm:px-7"
          onClick={() => setOpen(true)}
        >
          <span>
            <span className="block font-display text-2xl leading-none font-extrabold tracking-[-0.04em]">
              Собрать котельную
            </span>
            <span className="mt-2 block text-sm text-on-accent/80">
              {roomLabel} · {paramLabel} · {fuelLabel}
            </span>
          </span>
          <span className="text-2xl" aria-hidden="true">→</span>
        </button>
      </div>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-40 bg-black/70" />
          <Dialog.Content className="fixed inset-x-0 bottom-0 z-50 max-h-dvh overflow-y-auto rounded-t-3xl bg-surface p-4 pb-safe shadow-lg md:inset-x-auto md:top-1/2 md:bottom-auto md:left-1/2 md:w-full md:max-w-xl md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-3xl">
            <SheetHandle />
            <div className="mb-3 flex items-start justify-between gap-3">
              <Dialog.Title className="pr-12 font-display text-3xl leading-none font-extrabold tracking-[-0.04em]">
                Готовое решение котельной
              </Dialog.Title>
              <Dialog.Close className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg bg-chip" aria-label="Закрыть">
                <X className="size-5" />
              </Dialog.Close>
            </div>
            <Dialog.Description className="text-sm text-muted">
              Сверим комплектацию по открытым данным каталога и вернёмся с расчётом. Это не заказ и не покупка.
            </Dialog.Description>
            <div className="mt-4">
              <LeadForm key={comment} context={{ intent: "request" }} initialComment={comment} submitLabel="Получить готовое решение" />
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}

function Chip({ active, children, onClick }: { active: boolean; children: ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={active ? "h-10 rounded-sm bg-accent px-3 text-sm font-semibold text-on-accent" : "h-10 rounded-sm bg-chip px-3 text-sm text-ink"}
    >
      {children}
    </button>
  );
}

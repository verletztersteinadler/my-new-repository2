import { useState } from "react";
import { Link } from "@tanstack/react-router";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { LeadForm } from "@/components/lead-form";
import { SheetHandle } from "@/components/sheet-handle";
import { clearPicks, pickKey, removePick, usePicks } from "@/lib/picks";

export function PickBar() {
  const [open, setOpen] = useState(false);
  const picks = usePicks();
  const picksComment = picks.length
    ? `В подборке: ${picks.map((item) => `${item.maker} ${item.title}`).join("; ")}. Прошу подобрать готовое решение.`
    : "Запрос готового решения.";

  return (
    <>
      <button
        type="button"
        className="fixed top-1/2 right-[env(safe-area-inset-right)] z-40 -translate-y-1/2 rounded-l-2xl bg-accent px-3 py-5 text-sm font-extrabold tracking-[0.12em] text-on-accent uppercase shadow-lg hover:bg-accent-hover"
        onClick={() => setOpen(true)}
      >
        {picks.length > 0 ? (
          <span className="absolute -top-2 -left-2 inline-flex size-6 items-center justify-center rounded-full bg-ink text-xs font-bold normal-case tracking-normal text-bg">
            {picks.length}
          </span>
        ) : null}
        <span className="block [writing-mode:vertical-rl] rotate-180">Получить готовое решение</span>
      </button>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-40 bg-black/70" />
          <Dialog.Content className="fixed inset-x-0 bottom-0 z-50 max-h-dvh overflow-y-auto rounded-t-3xl border border-line bg-surface p-4 pb-safe shadow-xl md:inset-x-3 md:top-8 md:bottom-auto md:mx-auto md:max-h-[85dvh] md:max-w-lg md:rounded-3xl">
            <SheetHandle />
            <Dialog.Close className="absolute top-3 right-3 inline-flex size-11 items-center justify-center rounded-lg bg-chip" aria-label="Закрыть">
              <X className="size-5" />
            </Dialog.Close>
            <Dialog.Title className="pr-12 font-display text-3xl leading-none font-extrabold tracking-[-0.04em]">Получить готовое решение</Dialog.Title>
            <Dialog.Description className="mt-2 text-sm text-muted">
              Оператор справочника разберёт задачу по открытым данным. Это не заказ и не покупка.
            </Dialog.Description>
            {picks.length > 0 ? (
              <div className="mt-4 rounded-2xl border border-line p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold">Подборка ({picks.length})</p>
                  <button type="button" className="text-xs text-muted underline" onClick={clearPicks}>
                    Очистить
                  </button>
                </div>
                <ul className="mt-2 grid gap-1">
                  {picks.map((item) => (
                    <li key={pickKey(item)} className="flex items-center gap-2 text-sm">
                      <Link
                        to="/manufacturers/$slug"
                        params={{ slug: item.slug }}
                        search={{ series: item.seriesId, ...(item.sizeId ? { size: item.sizeId } : {}) }}
                        className="min-w-0 flex-1 truncate hover:text-accent"
                        onClick={() => setOpen(false)}
                      >
                        {item.maker} · {item.title}
                      </Link>
                      <button
                        type="button"
                        aria-label="Убрать из подборки"
                        className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-chip"
                        onClick={() => removePick(item.seriesId, item.sizeId)}
                      >
                        <X className="size-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            <div className="mt-4">
              <LeadForm
                key={picksComment}
                context={{ intent: "request" }}
                initialComment={picksComment}
                submitLabel="Получить готовое решение"
              />
            </div>
            <Dialog.Close className="mt-3 text-sm text-muted underline">Закрыть</Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

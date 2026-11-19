import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { LeadForm } from "@/components/lead-form";
import { SheetHandle } from "@/components/sheet-handle";

export function PickBar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="fixed top-1/2 right-[env(safe-area-inset-right)] z-40 -translate-y-1/2 rounded-l-2xl bg-accent px-3 py-5 text-sm font-extrabold tracking-[0.12em] text-on-accent uppercase shadow-lg hover:bg-accent-hover"
        onClick={() => setOpen(true)}
      >
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
            <Dialog.Title className="pr-12 font-display text-3xl leading-none font-extrabold tracking-[-0.04em]">
              Получить готовое решение
            </Dialog.Title>
            <Dialog.Description className="mt-2 text-sm text-muted">
              Оператор справочника разберёт задачу по открытым данным. Это инженерная консультация, не заказ и не покупка.
            </Dialog.Description>
            <div className="mt-4">
              <LeadForm
                context={{ intent: "request" }}
                initialComment="Запрос готового решения."
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

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { LeadForm } from "@/components/lead-form";

export function PickBar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="fixed inset-x-0 bottom-0 z-40 flex min-h-16 w-full items-center justify-center border-t border-white/20 bg-accent px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] text-base font-extrabold text-on-accent shadow-[0_-8px_24px_rgba(0,0,0,.16)] hover:bg-accent-hover sm:inset-x-auto sm:right-4 sm:bottom-4 sm:min-h-12 sm:w-auto sm:rounded-2xl sm:border-0 sm:px-6 sm:py-3 sm:shadow-lg"
        onClick={() => setOpen(true)}
      >
        <span>Оставить инженерную заявку</span>
      </button>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-40 bg-black/70" />
          <Dialog.Content className="fixed inset-x-0 bottom-0 z-50 mx-auto max-h-[min(92dvh,52rem)] max-w-lg overflow-y-auto overscroll-contain rounded-t-3xl border border-line bg-surface p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] shadow-xl sm:inset-x-3 sm:top-1/2 sm:bottom-auto sm:max-h-[85dvh] sm:-translate-y-1/2 sm:rounded-3xl">
            <Dialog.Title className="font-display text-2xl leading-tight font-extrabold tracking-[-0.04em] sm:text-3xl">
              Оставить инженерную заявку
            </Dialog.Title>
            <Dialog.Description className="mt-2 text-sm text-muted">
              Опишите техническую задачу для подбора оборудования, уточнения комплектации и коммерческих условий. Запрос не является автоматическим заказом.
            </Dialog.Description>
            <div className="mt-4">
              <LeadForm
                context={{ intent: "request" }}
                initialComment="Запрос готового решения."
                submitLabel="Отправить заявку"
              />
            </div>
            <Dialog.Close className="mt-3 text-sm text-muted underline">Закрыть</Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

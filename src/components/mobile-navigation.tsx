import { useState } from "react";
import { Link } from "@tanstack/react-router";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";

/**
 * A single accessible navigation drawer for every public page.
 * Desktop navigation remains in each page header; compact screens use this
 * global trigger, so catalogue and engineering flows keep the same links.
 */
export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const linkClass = "flex min-h-12 items-center rounded-xl px-4 py-3 text-base font-semibold text-ink hover:bg-chip focus-visible:outline-2";

  return (
    <div className="lg:hidden">
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <button
            type="button"
            aria-label="Открыть меню"
            className="fixed right-3 top-[calc(0.6rem+env(safe-area-inset-top))] z-[65] inline-flex size-12 items-center justify-center rounded-xl border border-line bg-surface text-ink shadow-md transition-colors hover:bg-chip"
          >
            <Menu aria-hidden="true" className="size-6" />
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[80] bg-black/65" />
          <Dialog.Content className="fixed inset-y-0 right-0 z-[90] flex w-[min(88vw,24rem)] max-w-full flex-col overflow-y-auto bg-surface px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-[calc(1.25rem+env(safe-area-inset-top))] shadow-2xl">
            <div className="flex items-center justify-between gap-3 border-b border-line pb-4">
              <div>
                <Dialog.Title className="font-display text-xl font-extrabold">kotly<span className="text-accent">.pro</span></Dialog.Title>
                <Dialog.Description className="mt-1 text-xs text-muted">Разделы справочника</Dialog.Description>
              </div>
              <Dialog.Close asChild>
                <button type="button" aria-label="Закрыть меню" className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-chip">
                  <X aria-hidden="true" className="size-5" />
                </button>
              </Dialog.Close>
            </div>
            <nav aria-label="Мобильная навигация" className="mt-5 grid gap-1">
              <Link to="/" search={{}} onClick={close} className={linkClass}>Главная</Link>
              <Link to="/" hash="podbor" onClick={close} className={linkClass}>Подбор оборудования</Link>
              <Link to="/kotelnaya" onClick={close} className={linkClass}>Конструктор котельной</Link>
              <Link to="/nasosy" onClick={close} className={linkClass}>Насосы</Link>
              <Link to="/" hash="manufacturers" onClick={close} className={linkClass}>Производители</Link>
              <Link to="/politika" onClick={close} className={linkClass}>О проекте</Link>
            </nav>
            <p className="mt-auto border-t border-line pt-5 text-xs leading-relaxed text-muted">
              Инженерный запрос можно отправить с любой страницы через кнопку внизу экрана.
            </p>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

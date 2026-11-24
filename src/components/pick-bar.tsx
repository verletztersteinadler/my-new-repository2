import { useState } from "react";
import { useLocation } from "@tanstack/react-router";
import * as Dialog from "@radix-ui/react-dialog";
import { LeadForm } from "@/components/lead-form";

/**
 * Shared lead CTA, fixed to the BOTTOM of the viewport on desktop and mobile.
 *
 * The same component appears on the home/catalog, calculators and configurators.
 * In the REG.RU static build LeadForm checks /api/v1/leads/index.php and will
 * refuse to collect contacts until the operator's private settings are approved.
 *
 * Keep the page-end spacer: a fixed bar must never obscure the last fields,
 * calculator results, footer links or native browser controls.
 */
export function PickBar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // No sales solicitations on standalone legal/consent pages.
  if (pathname.startsWith("/politika") || pathname.startsWith("/soglasie")) return null;

  const calculatorPage = pathname.startsWith("/calculators");
  const description = calculatorPage
    ? "Получили расчёт? Поможем уточнить параметры и подобрать оборудование для вашей задачи."
    : "Подберём котельное и насосное оборудование под ваши исходные данные.";

  return (
    <>
      <div aria-hidden="true" className="h-28 sm:h-24 print:hidden" />
      <div
        role="region"
        aria-label="Инженерная консультация"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-line print:hidden bg-surface/95 shadow-[0_-8px_30px_rgba(0,0,0,0.15)] backdrop-blur-md"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        <div className="mx-auto flex min-h-[76px] max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:gap-6">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-extrabold leading-tight text-ink sm:text-base">
              Нужен подбор под вашу задачу?
            </p>
            <p className="mt-1 hidden max-w-2xl text-xs leading-relaxed text-muted sm:block">
              {description}
            </p>
          </div>
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <button
                type="button"
                className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-xl bg-accent px-4 text-center text-sm font-extrabold text-on-accent shadow-sm transition hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:px-6"
              >
                Оставить заявку <span aria-hidden="true" className="ml-2">→</span>
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-[60] bg-black/70" />
              <Dialog.Content
                className="fixed inset-x-3 top-1/2 z-[70] mx-auto max-h-[min(88dvh,760px)] w-[calc(100%-1.5rem)] max-w-lg -translate-y-1/2 overflow-y-auto rounded-3xl border border-line bg-surface p-5 shadow-2xl outline-none sm:p-7"
                aria-describedby="sticky-lead-description"
              >
                <div className="flex items-start justify-between gap-4">
                  <Dialog.Title className="font-display text-2xl font-extrabold leading-tight text-ink sm:text-3xl">
                    Получить инженерное решение
                  </Dialog.Title>
                  <Dialog.Close
                    type="button"
                    aria-label="Закрыть форму заявки"
                    className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl border border-line text-xl text-ink hover:bg-chip"
                  >
                    ×
                  </Dialog.Close>
                </div>
                <Dialog.Description id="sticky-lead-description" className="mt-3 text-sm leading-relaxed text-muted">
                  Опишите задачу — подготовим инженерную консультацию по подбору оборудования.
                  Если защищённый приём заявок пока не подключён, форма сообщит об этом до ввода контактов.
                </Dialog.Description>
                <div className="mt-5">
                  <LeadForm
                    context={{ intent: "request" }}
                    initialComment={calculatorPage
                      ? "Запрос инженерного подбора по результатам расчёта на kotly.pro."
                      : "Запрос инженерного решения по оборудованию на kotly.pro."}
                    submitLabel="Отправить заявку"
                  />
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </>
  );
}

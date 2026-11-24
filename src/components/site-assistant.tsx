import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { LeadForm, type LeadContext } from "@/components/lead-form";
import { cn } from "@/lib/utils";

type Intent = "solution" | "project" | "pick";

type Message = { id: string; role: "bot" | "user"; text: string };

const actions: { id: Intent; label: string }[] = [
  { id: "solution", label: "Получить решение" },
  { id: "project", label: "Рассчитать проект" },
  { id: "pick", label: "Подобрать оборудование" },
];

const steps: Record<Intent, { ask: string; choices: string[]; lead: LeadContext["intent"]; title: string }> = {
  solution: {
    title: "Получить решение",
    ask: "Для какого объекта нужно решение?",
    choices: ["Здание", "Производство", "Котельная", "Пока не знаю"],
    lead: "request",
  },
  project: {
    title: "Рассчитать проект",
    ask: "Что нужно рассчитать?",
    choices: ["Мощность", "Топливо и режим", "Состав оборудования", "Пока не знаю"],
    lead: "request",
  },
  pick: {
    title: "Подобрать оборудование",
    ask: "Какое топливо рассматриваете?",
    choices: ["Газ", "Твёрдое топливо", "Электричество", "Не определились"],
    lead: "pick",
  },
};

const greeting =
  "Могу принять задачу: получить решение, рассчитать проект или подобрать оборудование. Мощности и модели я не считаю сам — заявку забирает оператор каталога.";

export function openAssistant(intent?: Intent) {
  window.dispatchEvent(new CustomEvent("kotly-assistant", { detail: { intent } }));
}

export function AssistantActions({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {actions.map((item) => (
        <button
          key={item.id}
          type="button"
          className="h-11 rounded-sm bg-accent px-4 text-sm font-semibold text-on-accent hover:bg-accent-hover"
          onClick={() => openAssistant(item.id)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

export function SiteAssistant() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [intent, setIntent] = useState<Intent | null>(null);
  const [choice, setChoice] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([{ id: "hi", role: "bot", text: greeting }]);

  function reset(next?: Intent) {
    const seed: Message[] = [{ id: "hi", role: "bot", text: greeting }];
    if (next) {
      const step = steps[next];
      seed.push({ id: `u-${next}`, role: "user", text: step.title });
      seed.push({ id: `b-${next}`, role: "bot", text: step.ask });
    }
    setIntent(next ?? null);
    setChoice(null);
    setMessages(seed);
  }

  useEffect(() => {
    function onOpen(event: Event) {
      const next = (event as CustomEvent<{ intent?: Intent }>).detail?.intent;
      setOpen(true);
      reset(next);
    }
    window.addEventListener("kotly-assistant", onOpen);
    return () => window.removeEventListener("kotly-assistant", onOpen);
  }, []);

  function chooseIntent(next: Intent) {
    const step = steps[next];
    setIntent(next);
    setChoice(null);
    setMessages((prev) => [
      ...prev,
      { id: `u-${next}-${prev.length}`, role: "user", text: step.title },
      { id: `b-${next}-${prev.length}`, role: "bot", text: step.ask },
    ]);
  }

  function chooseAnswer(answer: string) {
    if (!intent) return;
    setChoice(answer);
    setMessages((prev) => [
      ...prev,
      { id: `u-a-${prev.length}`, role: "user", text: answer },
      {
        id: `b-a-${prev.length}`,
        role: "bot",
        text:
          intent === "project"
            ? "В конструкторе котельной можно рассчитать основные параметры. Для уточнения конфигурации отправьте инженерный запрос."
            : intent === "pick"
              ? "Подбор идёт по опубликованным сериям. Модель не выдумывается: если параметра нет, оператор так и напишет."
              : "Решение соберёт оператор каталога. Это не ответ завода-изготовителя.",
      },
    ]);
  }

  const comment = intent && choice ? `${steps[intent].title}. ${steps[intent].ask} ${choice}` : "";

  return (
    <>
      {open ? (
        <section
          className="fixed inset-x-3 bottom-[calc(5.5rem+env(safe-area-inset-bottom))] z-50 flex max-h-[min(34rem,65dvh)] flex-col border border-line bg-surface shadow-xl sm:inset-x-auto sm:right-4 sm:bottom-20 sm:w-[24rem]"
          aria-label="Чат с оператором каталога"
        >
          <header className="flex items-center gap-3 bg-accent px-4 py-3 text-on-accent">
            <div>
              <p className="font-display text-lg leading-none font-extrabold tracking-[-0.04em]">Каталог</p>
              <p className="mt-1 text-xs opacity-80">Решение, расчёт, подбор</p>
            </div>
            <button type="button" className="ml-auto text-sm" onClick={() => setOpen(false)}>
              Закрыть
            </button>
          </header>
          <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-4">
            {messages.map((message) => (
              <p
                key={message.id}
                className={cn(
                  "max-w-[90%] px-3 py-2 text-sm leading-relaxed",
                  message.role === "bot" ? "bg-chip text-ink" : "ml-auto bg-ink text-surface",
                )}
              >
                {message.text}
              </p>
            ))}
            {!intent ? (
              <div className="flex flex-col gap-2">
                {actions.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="h-11 rounded-sm border border-line bg-surface text-sm font-semibold hover:bg-chip"
                    onClick={() => chooseIntent(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            ) : null}
            {intent && !choice ? (
              <div className="flex flex-wrap gap-2">
                {steps[intent].choices.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className="h-10 rounded-sm bg-chip px-3 text-sm font-semibold"
                    onClick={() => chooseAnswer(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            ) : null}
            {intent && choice ? (
              <div className="grid gap-3 border-t border-line pt-3">
                {intent === "pick" ? (
                  <button
                    type="button"
                    className="h-11 rounded-sm border border-line text-sm font-semibold"
                    onClick={() => {
                      setOpen(false);
                      navigate({ to: "/", hash: "manufacturers" });
                    }}
                  >
                    К производителям
                  </button>
                ) : null}
                <LeadForm
                  key={comment}
                  compact
                  initialComment={comment}
                  context={{ intent: steps[intent].lead }}
                />
              </div>
            ) : null}
          </div>
        </section>
      ) : null}
      <button
        type="button"
        className="fixed right-4 bottom-[calc(5.5rem+env(safe-area-inset-bottom))] z-40 h-12 rounded-sm bg-accent px-4 text-sm font-semibold text-on-accent shadow-lg hover:bg-accent-hover md:bottom-5"
        onClick={() => {
          if (open) {
            setOpen(false);
            return;
          }
          setOpen(true);
          if (messages.length === 0) reset();
        }}
      >
        {open ? "Скрыть чат" : "Решение · расчёт · подбор"}
      </button>
    </>
  );
}

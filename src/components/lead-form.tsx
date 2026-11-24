import { useRef, useState, type FormEvent, type InputHTMLAttributes } from "react";
import { CONSENT_VERSION, sizeById } from "@/data/catalog";
import { findSeries, publishedCatalogs } from "@/data/series-index";
import { displaySeriesName } from "@/lib/series-names";
import { cn } from "@/lib/utils";

export type LeadContext = {
  intent: "kp" | "request" | "pick";
  seriesId?: string;
  sizeId?: string;
  categoryId?: string;
};

const titles: Record<LeadContext["intent"], string> = {
  kp: "Консультация по серии",
  request: "Запросить подбор и КП",
  pick: "Подобрать оборудование для закупки",
};

type FieldErrors = Record<string, string>;

export function LeadForm({
  context,
  compact = false,
  initialComment = "",
  submitLabel,
  onDone,
}: {
  context: LeadContext;
  compact?: boolean;
  initialComment?: string;
  submitLabel?: string;
  onDone?: (leadId: string) => void;
}) {
  const submissionId = useRef(crypto.randomUUID());
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [leadId, setLeadId] = useState<string | null>(null);
  const [delivery, setDelivery] = useState<"sent" | "pending" | null>(null);
  const [sizeId, setSizeId] = useState(context.sizeId ?? "");
  const series = findSeries(context.seriesId);
  const seriesBrand = series ? publishedCatalogs.find((item) => item.series.includes(series))?.title ?? "" : "";
  const size = sizeById(series, sizeId);

  if (leadId) {
    return (
      <div className="rounded-xl border border-line bg-chip p-4" role="status">
        <p className="text-base font-semibold">{delivery === "sent" ? "Запрос отправлен" : "Запрос сохранён"} · {leadId}</p>
        <p className="mt-2 text-sm text-muted">
          {delivery === "sent"
            ? "Запрос получен. Мы свяжемся с вами по указанным контактам."
            : "Запрос сохранён, но почтовый сервер пока не принял уведомление. Если вопрос срочный, напишите на info@kotly.pro и укажите номер обращения."}
        </p>
      </div>
    );
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setPending(true);
    setErrors({});
    try {
      const response = await fetch("/api/v1/leads.php", {
        method: "POST",
        headers: { accept: "application/json", "content-type": "application/json" },
        body: JSON.stringify({
          submission_id: submissionId.current,
          name: String(data.get("name") ?? ""),
          phone: String(data.get("phone") ?? ""),
          email: String(data.get("email") ?? ""),
          comment: String(data.get("comment") ?? ""),
          series_id: context.seriesId ?? "",
          size_id: String(data.get("size_id") ?? ""),
          category_id: context.categoryId ?? series?.categoryId ?? "",
          page_url: window.location.href,
          consent: data.get("consent") === "on",
          consent_version: CONSENT_VERSION,
          website: String(data.get("website") ?? ""),
        }),
      });
      const payload = (await response.json()) as { lead_id?: string; delivery?: "sent" | "pending"; message?: string; errors?: FieldErrors };
      if (response.status === 409) {
        setErrors({ form: payload.message || "Заявка уже сохранена с другими данными" });
        return;
      }
      if (!response.ok || !payload.lead_id) {
        setErrors(payload.errors && Object.keys(payload.errors).length ? payload.errors : { form: payload.message || "Не удалось сохранить обращение" });
        return;
      }
      setDelivery(payload.delivery === "sent" ? "sent" : "pending");
      setLeadId(payload.lead_id);
      if (payload.delivery === "sent") onDone?.(payload.lead_id);
    } catch {
      setErrors({ form: "Нет ответа сервера. Неизвестно, была ли заявка сохранена. Повторная отправка использует тот же идентификатор." });
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="grid gap-3 sm:grid-cols-2" action="/api/v1/leads.php" method="post" onSubmit={onSubmit} noValidate>
      <input type="hidden" name="submission_id" value={submissionId.current} />
      <input type="hidden" name="series_id" value={context.seriesId ?? ""} />
      <input type="hidden" name="category_id" value={context.categoryId ?? series?.categoryId ?? ""} />
      <input type="hidden" name="consent_version" value={CONSENT_VERSION} />
      <input type="hidden" name="page_url" value="" />
      <p className="absolute -left-[9999px] h-0 overflow-hidden" aria-hidden="true">
        <label>
          Сайт
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <p className="sm:col-span-2 text-sm text-muted">
        Опишите задачу — мы рассмотрим параметры оборудования и свяжемся с вами. Отправка запроса не означает оформление заказа.
      </p>
      {series ? (
        <p className="sm:col-span-2 rounded-sm bg-chip px-3 py-2 text-sm">
          <span className="text-muted">Оборудование: </span>
          {displaySeriesName(seriesBrand, series.name)}
          {` · ${size ? size.name : "типоразмер не указан"}`}
        </p>
      ) : null}
      {series && series.sizes.length > 0 ? (
        <label className="sm:col-span-2 grid gap-1 text-sm font-medium">
          Типоразмер
          <select
            name="size_id"
            value={sizeId}
            onChange={(event) => setSizeId(event.target.value)}
            className="h-11 w-full min-w-0 rounded-sm border border-line bg-surface px-3 font-normal"
          >
            <option value="">Не указан</option>
            {series.sizes.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
      ) : (
        <input type="hidden" name="size_id" value="" />
      )}
      <Field label="Имя" name="name" error={errors.name} autoComplete="name" maxLength={100} required />
      <Field label="Телефон" name="phone" error={errors.phone} autoComplete="tel" placeholder="+7 или другой код" required />
      <Field
        label="Эл. почта"
        name="email"
        error={errors.email}
        autoComplete="email"
        type="email"
        maxLength={120}
        placeholder="Необязательно"
        className="sm:col-span-2"
      />
      <label className="sm:col-span-2 grid gap-1 text-sm font-medium">
        Сообщение
        <textarea
          name="comment"
          maxLength={3000}
          rows={compact ? 3 : 4}
          defaultValue={initialComment}
          placeholder="Необязательно"
          className="w-full min-w-0 rounded-sm border border-line bg-surface px-3 py-2 font-normal"
        />
      </label>
      <label className="sm:col-span-2 flex items-start gap-3 text-sm">
        <input name="consent" type="checkbox" className="mt-1 size-5 accent-accent" required />
        <span>
          Даю согласие на{" "}
          <a className="font-medium text-ink underline-offset-2 hover:underline" href="/soglasie">
            обработку персональных данных
          </a>{" "}
          и ознакомлен с{" "}
          <a className="font-medium text-ink underline-offset-2 hover:underline" href="/politika">
            политикой конфиденциальности
          </a>.
        </span>
      </label>
      {errors.consent ? <p className="sm:col-span-2 text-sm text-danger">{errors.consent}</p> : null}
      {errors.form ? (
        <p className="sm:col-span-2 text-sm text-danger" role="alert">
          {errors.form}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="sm:col-span-2 inline-flex h-12 items-center justify-center rounded-sm bg-accent px-5 text-sm font-semibold text-on-accent hover:bg-accent-hover disabled:opacity-60"
      >
        {pending ? "Отправляем…" : submitLabel || titles[context.intent]}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  error,
  className,
  ...props
}: {
  label: string;
  name: string;
  error?: string;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={cn("grid gap-1 text-sm font-medium", className)}>
      {label}
      <input name={name} className="h-11 rounded-sm border border-line bg-surface px-3 font-normal" {...props} />
      {error ? <span className="font-normal text-danger">{error}</span> : null}
    </label>
  );
}

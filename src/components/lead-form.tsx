import { useEffect, useRef, useState, type FormEvent, type InputHTMLAttributes } from "react";
import { CONSENT_VERSION, sizeById } from "@/data/catalog";
import { findSeries } from "@/data/series-index";
import { cn } from "@/lib/utils";

export type LeadContext = {
  intent: "kp" | "request" | "pick";
  seriesId?: string;
  sizeId?: string;
  categoryId?: string;
};

const titles: Record<LeadContext["intent"], string> = {
  kp: "Консультация по серии",
  request: "Получить готовое решение",
  pick: "Подобрать оборудование",
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
  const staticWebsite = import.meta.env.VITE_STATIC_EXPORT === "1";
  const endpoint = staticWebsite ? "/api/v1/leads/index.php" : "/api/v1/leads";
  const [availability, setAvailability] = useState<"checking" | "ready" | "disabled">(
    staticWebsite ? "checking" : "ready",
  );
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [leadId, setLeadId] = useState<string | null>(null);
  const [sizeId, setSizeId] = useState(context.sizeId ?? "");
  const series = findSeries(context.seriesId);
  const size = sizeById(series, sizeId);

  // Static deployment uses a PHP 8.3 endpoint. It will report ready ONLY after
  // private configuration, approved privacy policy and writable storage exist.
  useEffect(() => {
    if (!staticWebsite) return;
    const controller = new AbortController();
    fetch(endpoint, { method: "GET", cache: "no-store", signal: controller.signal })
      .then(async (res) => res.ok ? (await res.json()) as { enabled?: boolean } : { enabled: false })
      .then((result) => { if (!controller.signal.aborted) setAvailability(result.enabled ? "ready" : "disabled"); })
      .catch(() => { if (!controller.signal.aborted) setAvailability("disabled"); });
    return () => controller.abort();
  }, [endpoint, staticWebsite]);

  if (staticWebsite && availability !== "ready") {
    return (
      <div className="rounded-xl border border-line bg-chip p-5" role="status">
        <p className="text-base font-semibold">
          {availability === "checking" ? "Проверяем подключение формы…" : "Приём заявок пока не активирован"}
        </p>
        <p className="mt-2 text-sm text-muted">
          Конфигурацию можно сохранить, но контактные данные сейчас не принимаются.
          Оператор сайта должен сначала настроить защищённое хранение обращений,
          уведомления и утвердить политику обработки данных.
        </p>
        {series ? (
          <p className="mt-3 text-sm">
            <span className="text-muted">Оборудование: </span>
            {series.name}{size ? ` · ${size.name}` : ""}
          </p>
        ) : null}
        {initialComment ? (
          <label className="mt-4 grid gap-2 text-sm font-medium">
            Параметры вашего подбора — можно выделить и скопировать
            <textarea readOnly value={initialComment} rows={5} className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm font-normal" />
          </label>
        ) : null}
      </div>
    );
  }

  if (leadId) {
    return (
      <div className="rounded-xl border border-line bg-chip p-4" role="status">
        <p className="text-base font-semibold">Обращение {leadId} принято</p>
        <p className="mt-2 text-sm text-muted">
          Обращение сохранено сервером. Номер поможет уточнить его статус у оператора сайта.
          Подтверждение получения заявки не является подтверждением заказа или поставки.
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
      const response = await fetch(endpoint, {
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
      const payload = (await response.json()) as { lead_id?: string; message?: string; errors?: FieldErrors };
      if (response.status === 409) {
        setErrors({ form: payload.message || "Заявка уже сохранена с другими данными" });
        return;
      }
      if (!response.ok || !payload.lead_id) {
        setErrors(payload.errors && Object.keys(payload.errors).length ? payload.errors : { form: payload.message || "Не удалось сохранить обращение" });
        return;
      }
      setLeadId(payload.lead_id);
      onDone?.(payload.lead_id);
    } catch {
      setErrors({ form: "Нет ответа сервера. Поля сохранены, можно отправить ещё раз." });
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="grid gap-3 sm:grid-cols-2" action={endpoint} method="post" onSubmit={onSubmit} noValidate>
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
        Запрос на инженерную консультацию. Данные передаются оператору сайта и не направляются изготовителю без отдельного согласования. Подача заявки не означает оформления заказа.
      </p>
      {series ? (
        <p className="sm:col-span-2 rounded-sm bg-chip px-3 py-2 text-sm">
          <span className="text-muted">Оборудование: </span>
          {series.name}
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
            className="h-11 rounded-sm border border-line bg-surface px-3 font-normal"
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
          className="rounded-sm border border-line bg-surface px-3 py-2 font-normal"
        />
      </label>
      <label className="sm:col-span-2 flex items-start gap-3 text-sm">
        <input name="consent" type="checkbox" className="mt-1 size-5 accent-accent" required />
        <span>
          Даю{" "}
          <a className="font-semibold text-ink underline underline-offset-2 hover:text-accent" href="/soglasie" target="_blank" rel="noopener noreferrer">
            отдельное согласие на обработку персональных данных
          </a>
          {" "}для ответа на мой запрос.
        </span>
      </label>
      <p className="sm:col-span-2 text-xs text-muted">
        Ознакомьтесь с{" "}
        <a href="/politika" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-ink">Политикой обработки персональных данных</a>.
        Данные используются для ответа на обращение; согласие на рекламу не запрашивается.
      </p>
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

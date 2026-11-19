import { seriesById, sizeById, CONSENT_VERSION, MANUFACTURER_ID, type CategoryId } from "@/data/catalog";

const CATEGORIES = new Set(["hw115", "hw170", "steam", "oil", "block", "auto"]);
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export type LeadInput = {
  submissionId?: string;
  name?: string;
  phone?: string;
  email?: string;
  organization?: string;
  city?: string;
  comment?: string;
  seriesId?: string;
  sizeId?: string;
  categoryId?: string;
  pageUrl?: string;
  consent?: boolean;
  consentVersion?: string;
  honeypot?: string;
};

export type LeadRecord = {
  leadId: string;
  submissionId: string;
  fingerprint: string;
  createdAt: string;
  name: string;
  phone: string;
  email: string;
  organization: string;
  city: string;
  comment: string;
  manufacturerId: string;
  seriesId: string | null;
  seriesName: string | null;
  sizeId: string | null;
  sizeName: string | null;
  modelState: "selected" | "not_selected";
  categoryId: string | null;
  pageUrl: string;
  consentVersion: string;
  deliveryStatus: "pending";
};

type LeadResult =
  | { ok: true; status: 200 | 201; lead: LeadRecord; replay: boolean }
  | { ok: false; status: 409 | 422 | 429 | 503; errors?: Record<string, string>; message: string };

type Store = {
  bySubmission: Map<string, LeadRecord>;
  hits: number[];
};

const globalStore = globalThis as typeof globalThis & { __kotlyLeads?: Store };

function store(): Store {
  globalStore.__kotlyLeads ??= { bySubmission: new Map(), hits: [] };
  return globalStore.__kotlyLeads;
}

function clean(value: string | undefined, max: number) {
  return (value ?? "").replace(/\s+/g, " ").trim().slice(0, max);
}

function digits(value: string) {
  return value.replace(/\D/g, "");
}

function fingerprint(lead: Omit<LeadRecord, "leadId" | "submissionId" | "createdAt" | "fingerprint" | "deliveryStatus">) {
  return JSON.stringify(lead);
}

function makeLeadId() {
  const n = store().bySubmission.size + 1042;
  return `LAV-${n}`;
}

export function getLead(id: string) {
  for (const lead of store().bySubmission.values()) {
    if (lead.leadId === id) return lead;
  }
  return undefined;
}

export function acceptLead(input: LeadInput): LeadResult {
  if (input.honeypot) {
    return { ok: false, status: 422, message: "Заявка не принята", errors: { form: "Проверьте поля формы" } };
  }

  const now = Date.now();
  const bucket = store();
  bucket.hits = bucket.hits.filter((stamp) => now - stamp < 60_000);
  if (bucket.hits.length >= 12) {
    return { ok: false, status: 429, message: "Слишком много заявок. Повторите через минуту." };
  }

  const errors: Record<string, string> = {};
  const name = clean(input.name, 100);
  const phone = clean(input.phone, 40);
  const email = clean(input.email, 120);
  const organization = clean(input.organization, 200);
  const city = clean(input.city, 120);
  const comment = clean(input.comment, 3000);
  const pageUrl = clean(input.pageUrl, 300);
  const submissionId = clean(input.submissionId, 60);

  if (!name) errors.name = "Укажите имя";
  if (name.length > 100) errors.name = "Не длиннее 100 символов";
  if (!phone) errors.phone = "Укажите телефон";
  else if (digits(phone).length < 8) errors.phone = "Укажите телефон полностью";
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Проверьте адрес почты";
  if (!input.consent) errors.consent = "Нужно согласие с политикой конфиденциальности";
  if (input.consentVersion && input.consentVersion !== CONSENT_VERSION) {
    errors.consent = "Откройте текст согласия ещё раз: версия изменилась";
  }

  let seriesId: string | null = clean(input.seriesId, 40) || null;
  let sizeId: string | null = clean(input.sizeId, 60) || null;
  let categoryId: string | null = clean(input.categoryId, 20) || null;
  if (categoryId && !CATEGORIES.has(categoryId)) errors.categoryId = "Неизвестная категория";
  const series = seriesId ? seriesById(seriesId) : undefined;
  if (seriesId && !series) errors.seriesId = "Серия не найдена в каталоге LAVART";
  const size = sizeById(series, sizeId ?? undefined);
  if (sizeId && !size) errors.sizeId = "Типоразмер не относится к выбранной серии";
  if (!seriesId) sizeId = null;
  if (series) categoryId = series.categoryId;

  if (Object.keys(errors).length) {
    return { ok: false, status: 422, message: "Проверьте поля", errors };
  }

  const draft = {
    name,
    phone,
    email,
    organization,
    city,
    comment,
    manufacturerId: MANUFACTURER_ID,
    seriesId: series?.id ?? null,
    seriesName: series?.name ?? null,
    sizeId: size?.id ?? null,
    sizeName: size?.name ?? null,
    modelState: size ? "selected" : "not_selected",
    categoryId: (categoryId as CategoryId | null) ?? null,
    pageUrl,
    consentVersion: CONSENT_VERSION,
  } as const;
  const print = fingerprint(draft);

  if (submissionId) {
    if (!UUID.test(submissionId)) {
      return { ok: false, status: 422, message: "Проверьте поля", errors: { submissionId: "Некорректный ключ заявки" } };
    }
    const prev = bucket.bySubmission.get(submissionId);
    if (prev) {
      if (prev.fingerprint !== print) {
        return { ok: false, status: 409, message: "Эта заявка уже принята с другими данными и не перезаписывается." };
      }
      return { ok: true, status: 200, lead: prev, replay: true };
    }
  }

  const id = submissionId || crypto.randomUUID();
  const lead: LeadRecord = {
    leadId: makeLeadId(),
    submissionId: id,
    fingerprint: print,
    createdAt: new Date().toISOString(),
    deliveryStatus: "pending",
    ...draft,
  };
  bucket.bySubmission.set(id, lead);
  bucket.hits.push(now);
  return { ok: true, status: 201, lead, replay: false };
}

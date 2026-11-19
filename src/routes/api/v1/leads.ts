import { createFileRoute } from "@tanstack/react-router";
import { acceptLead, type LeadInput } from "@/lib/leads.server";

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}

function readField(source: Record<string, unknown>, key: string) {
  const value = source[key];
  return typeof value === "string" ? value : undefined;
}

async function readInput(request: Request): Promise<LeadInput | Response> {
  const length = Number(request.headers.get("content-length") || 0);
  if (length > 32_768) return json({ message: "Слишком большой запрос" }, 413);
  const type = request.headers.get("content-type") || "";
  try {
    if (type.includes("application/json")) {
      const body = (await request.json()) as Record<string, unknown>;
      const raw = JSON.stringify(body);
      if (raw.length > 32_768) return json({ message: "Слишком большой запрос" }, 413);
      const consent = body.consent === true || body.consent === "1" || body.consent === "on";
      return {
        submissionId: readField(body, "submission_id"),
        name: readField(body, "name"),
        phone: readField(body, "phone"),
        email: readField(body, "email"),
        organization: readField(body, "organization"),
        city: readField(body, "city"),
        comment: readField(body, "comment"),
        seriesId: readField(body, "series_id"),
        sizeId: readField(body, "size_id"),
        categoryId: readField(body, "category_id"),
        pageUrl: readField(body, "page_url"),
        consent,
        consentVersion: readField(body, "consent_version"),
        honeypot: readField(body, "website"),
      };
    }
    const form = await request.formData();
    const dump = [...form.values()].join("");
    if (dump.length > 32_768) return json({ message: "Слишком большой запрос" }, 413);
    const agreed = form.get("consent");
    return {
      submissionId: String(form.get("submission_id") ?? ""),
      name: String(form.get("name") ?? ""),
      phone: String(form.get("phone") ?? ""),
      email: String(form.get("email") ?? ""),
      organization: String(form.get("organization") ?? ""),
      city: String(form.get("city") ?? ""),
      comment: String(form.get("comment") ?? ""),
      seriesId: String(form.get("series_id") ?? ""),
      sizeId: String(form.get("size_id") ?? ""),
      categoryId: String(form.get("category_id") ?? ""),
      pageUrl: String(form.get("page_url") ?? ""),
      consent: agreed === "1" || agreed === "on" || agreed === "true",
      consentVersion: String(form.get("consent_version") ?? ""),
      honeypot: String(form.get("website") ?? ""),
    };
  } catch {
    return json({ message: "Не удалось прочитать заявку" }, 422);
  }
}

async function handlePost({ request }: { request: Request }) {
  const input = await readInput(request);
  if (input instanceof Response) return input;
  const result = acceptLead(input);
  const wantsJson = (request.headers.get("accept") || "").includes("application/json");
  if (!result.ok) {
    if (!wantsJson) {
      const text = result.errors ? Object.values(result.errors).join(". ") : result.message;
      return new Response(textPage("Заявка не отправлена", text), {
        status: result.status,
        headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" },
      });
    }
    return json({ message: result.message, errors: result.errors ?? {} }, result.status);
  }
  if (!wantsJson) {
    return new Response(null, {
      status: 303,
      headers: { location: `/?accepted=${encodeURIComponent(result.lead.leadId)}` },
    });
  }
  return json(
    {
      lead_id: result.lead.leadId,
      status: "accepted",
      delivery: result.lead.deliveryStatus,
      replay: result.replay,
    },
    result.status,
  );
}

function textPage(title: string, text: string) {
  return `<!doctype html><meta charset="utf-8"><title>${title}</title><body style="font-family:sans-serif;padding:32px"><h1>${title}</h1><p>${text}</p><p><a href="/">Вернуться в каталог</a></p></body>`;
}

export const Route = createFileRoute("/api/v1/leads")({
  server: { handlers: { POST: handlePost } },
});

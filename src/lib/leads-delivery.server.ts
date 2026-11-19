import { env } from "@/lib/env.server";
import type { LeadRecord } from "@/lib/leads.server";

export type DeliveryStatus = "pending" | "sent" | "failed";

const DELIVERY_TIMEOUT_MS = 8_000;
const DELIVERY_ATTEMPTS = 2;
const RETRY_DELAY_MS = 500;

export async function deliverLead(lead: LeadRecord): Promise<DeliveryStatus> {
  if (typeof window !== "undefined") {
    throw new Error("@/lib/leads-delivery.server is server-only — never import it from client code.");
  }
  const url = env("LEADS_WEBHOOK_URL");
  if (!url) {
    console.warn(`[leads] LEADS_WEBHOOK_URL is not set — lead ${lead.leadId} stays pending`);
    return "pending";
  }
  const secret = env("LEADS_WEBHOOK_SECRET");
  const { deliveryStatus: _omit, ...payload } = lead;
  const body = JSON.stringify(payload);
  const headers: Record<string, string> = { "content-type": "application/json" };
  if (secret) headers["x-kotly-secret"] = secret;

  for (let attempt = 1; attempt <= DELIVERY_ATTEMPTS; attempt += 1) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers,
        body,
        signal: AbortSignal.timeout(DELIVERY_TIMEOUT_MS),
      });
      if (res.ok) return "sent";
      console.error(`[leads] webhook answered ${res.status} for ${lead.leadId} (attempt ${attempt})`);
    } catch (err) {
      console.error(
        `[leads] delivery attempt ${attempt} for ${lead.leadId} failed: ${String((err as Error)?.message ?? err)}`,
      );
    }
    if (attempt < DELIVERY_ATTEMPTS) {
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
    }
  }
  return "failed";
}

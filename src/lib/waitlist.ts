import "server-only";
import { Resend } from "resend";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { site } from "@/lib/site";

export type Role = "attendee" | "organizer";
export type WaitlistResult = { ok: true; isNew: boolean } | { ok: false };

/*
  Environment
  RESEND_API_KEY            required in production; a full-access key (contacts are not a sending-only endpoint)
  RESEND_SEGMENT_ID         optional; the "Waitlist" segment every signup joins
  RESEND_FROM_EMAIL         optional; e.g. "Lykpass <hello@lykpass.com>" on a verified domain.
                            When set, new signups get a short confirmation email in their language.
  Contact properties used: waitlist_role, locale, signup_source (create once with `npm run resend:setup`).
*/

let client: Resend | null = null;
function resend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  client ??= new Resend(key);
  return client;
}

export async function addToWaitlist(email: string, role: Role, locale: Locale): Promise<WaitlistResult> {
  const r = resend();
  if (!r) {
    if (process.env.NODE_ENV === "production") {
      console.error("[waitlist] RESEND_API_KEY is not set; signup was not stored.");
      return { ok: false };
    }
    console.warn(`[waitlist] RESEND_API_KEY not set; skipping Resend in development (${role}, ${locale}).`);
    return { ok: true, isNew: true };
  }

  const segmentId = process.env.RESEND_SEGMENT_ID;
  const properties = { waitlist_role: role, locale, signup_source: "landing" };

  const created = await r.contacts.create({
    email,
    unsubscribed: false,
    properties,
    ...(segmentId ? { segments: [{ id: segmentId }] } : {}),
  });

  let isNew = true;
  if (created.error) {
    // Most likely the contact already exists. Confirm, then refresh their details instead of failing.
    const existing = await r.contacts.get({ email });
    if (existing.error || !existing.data) {
      console.error("[waitlist] Resend contact create failed:", created.error.name, created.error.message);
      return { ok: false };
    }
    isNew = false;
    const updated = await r.contacts.update({ email, properties });
    if (updated.error) console.warn("[waitlist] Could not update existing contact:", updated.error.message);
    if (segmentId) {
      const added = await r.contacts.segments.add({ email, segmentId });
      if (added.error) console.warn("[waitlist] Could not add existing contact to segment:", added.error.message);
    }
  }

  // Only new signups get the confirmation, and the idempotency key stops duplicates on retries.
  const from = process.env.RESEND_FROM_EMAIL;
  if (from && isNew) {
    const t = getDictionary(locale).email;
    const sent = await r.emails.send(
      {
        from,
        to: [email],
        subject: t.subject,
        html: confirmationHtml(locale, role),
        text: [t.heading, "", role === "organizer" ? t.organizer : t.attendee, "", t.next, "", t.signoff, "", t.footer].join("\n"),
      },
      { idempotencyKey: `waitlist-welcome/${email}` },
    );
    // The signup itself succeeded; a failed confirmation is logged, not shown to the visitor.
    if (sent.error) console.error("[waitlist] Confirmation email failed:", sent.error.name, sent.error.message);
  }

  return { ok: true, isNew };
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Small, table-based email that renders in every client, in brand colors, light background. */
function confirmationHtml(locale: Locale, role: Role) {
  const t = getDictionary(locale).email;
  const body = role === "organizer" ? t.organizer : t.attendee;
  const home = `${site.url}/${locale}`;
  return `<!doctype html>
<html lang="${locale}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(t.subject)}</title></head>
<body style="margin:0;background:#fff2ea;font-family:Helvetica,Arial,sans-serif;color:#0e2622;">
<span style="display:none;max-height:0;overflow:hidden;">${esc(t.preview)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fff2ea;padding:32px 16px;">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#ffffff;border-radius:24px;overflow:hidden;">
<tr><td style="background:#0e2622;padding:28px 32px;">
<a href="${home}" style="text-decoration:none;color:#ffffff;font-size:24px;font-weight:800;letter-spacing:-0.5px;"><span style="color:#ff5709;">&#9679;</span> lykpass</a>
</td></tr>
<tr><td style="padding:36px 32px 8px;">
<h1 style="margin:0 0 16px;font-size:28px;line-height:1.15;font-weight:800;color:#0e2622;">${esc(t.heading)}</h1>
<p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#4d5e59;">${esc(body)}</p>
<p style="margin:0 0 28px;font-size:16px;line-height:1.6;color:#4d5e59;">${esc(t.next)}</p>
<p style="margin:0 0 32px;font-size:16px;font-weight:600;color:#0e2622;">${esc(t.signoff)}</p>
</td></tr>
<tr><td style="padding:20px 32px;border-top:1px solid #ede6e0;font-size:12px;line-height:1.5;color:#4d5e59;">${esc(t.footer)}</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

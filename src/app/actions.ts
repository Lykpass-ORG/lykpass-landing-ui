"use server";

import { hasLocale } from "@/i18n/config";
import { addToWaitlist } from "@/lib/waitlist";

export type WaitlistState = {
  status: "idle" | "ok" | "error";
  /** Message key resolved by the client in the visitor's language. */
  code: "" | "errEmpty" | "errInvalid" | "errServer" | "okAttendee" | "okOrganizer";
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function joinWaitlist(_prev: WaitlistState, formData: FormData): Promise<WaitlistState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const role = formData.get("role") === "organizer" ? "organizer" : "attendee";
  const rawLocale = String(formData.get("locale") ?? "en");
  const locale = hasLocale(rawLocale) ? rawLocale : "en";
  const okCode = role === "organizer" ? "okOrganizer" : "okAttendee";

  // Honeypot: people never see or fill this field; bots that do get a quiet "success".
  if (String(formData.get("company") ?? "").trim()) return { status: "ok", code: okCode };

  if (!email) return { status: "error", code: "errEmpty" };
  if (!EMAIL.test(email) || email.length > 254) return { status: "error", code: "errInvalid" };

  const result = await addToWaitlist(email, role, locale);
  if (!result.ok) return { status: "error", code: "errServer" };

  return { status: "ok", code: okCode };
}

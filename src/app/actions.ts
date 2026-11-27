"use server";

export type WaitlistState = {
  status: "idle" | "ok" | "error";
  /** Message key resolved by the client in the visitor's language. */
  code: "" | "errEmpty" | "errInvalid" | "okAttendee" | "okOrganizer";
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function joinWaitlist(_prev: WaitlistState, formData: FormData): Promise<WaitlistState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const role = formData.get("role") === "organizer" ? "organizer" : "attendee";
  const locale = String(formData.get("locale") ?? "en");

  if (!email) return { status: "error", code: "errEmpty" };
  if (!EMAIL.test(email) || email.length > 254) return { status: "error", code: "errInvalid" };

  // TODO: persist the signup (database or Resend audience) before launch,
  // keeping `role` and `locale` so the invite goes out in the right language.
  void locale;

  return { status: "ok", code: role === "organizer" ? "okOrganizer" : "okAttendee" };
}

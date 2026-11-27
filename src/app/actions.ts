"use server";

export type WaitlistState = {
  status: "idle" | "ok" | "error";
  message: string;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function joinWaitlist(_prev: WaitlistState, formData: FormData): Promise<WaitlistState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const role = formData.get("role") === "organizer" ? "organizer" : "attendee";

  if (!email) {
    return { status: "error", message: "Add your email so we can send your invite." };
  }
  if (!EMAIL.test(email) || email.length > 254) {
    return { status: "error", message: "That email doesn't look right. Check it and try again." };
  }

  // TODO: persist the signup (database or Resend audience) before launch.
  // Kept as a no-op so the landing page ships without a backend dependency.
  void role;

  return {
    status: "ok",
    message:
      role === "organizer"
        ? "You're on the list. We'll email you when organizer access opens."
        : "You're on the list. We'll email you when your invite is ready.",
  };
}

"use client";

import { useActionState, useId, useState } from "react";
import { ArrowRight, Check, LoaderCircle } from "lucide-react";
import { joinWaitlist, type WaitlistState } from "@/app/actions";

type Props = {
  tone?: "on-photo" | "on-brand";
  withRole?: boolean;
  className?: string;
};

const initial: WaitlistState = { status: "idle", message: "" };

export function WaitlistForm({ tone = "on-photo", withRole = false, className = "" }: Props) {
  const [state, action, pending] = useActionState(joinWaitlist, initial);
  const [role, setRole] = useState<"attendee" | "organizer">("attendee");
  const id = useId();
  const msgId = `${id}-msg`;

  if (state.status === "ok") {
    return (
      <div
        role="status"
        className={`flex items-center gap-3 rounded-full bg-white px-5 py-4 text-ink shadow-soft ${className}`}
      >
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand">
          <Check className="h-4 w-4" strokeWidth={2.5} aria-hidden />
        </span>
        <span className="text-[0.98rem] font-medium">{state.message}</span>
      </div>
    );
  }

  return (
    <form action={action} className={className} noValidate>
      {withRole && (
        <fieldset className="mb-4">
          <legend className="sr-only">I want to</legend>
          <div className="inline-flex rounded-full bg-white/10 p-1 ring-1 ring-white/20">
            {(
              [
                ["attendee", "Go to events"],
                ["organizer", "Run events"],
              ] as const
            ).map(([value, label]) => (
              <label
                key={value}
                className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                  role === value ? "bg-white text-ink" : "text-white/85 hover:text-white"
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value={value}
                  checked={role === value}
                  onChange={() => setRole(value)}
                  className="sr-only"
                />
                {label}
              </label>
            ))}
          </div>
        </fieldset>
      )}
      <div
        className={`flex w-full max-w-[34rem] items-center gap-1.5 rounded-full bg-white p-1.5 shadow-lift ring-1 ${
          state.status === "error" ? "ring-2 ring-brand" : tone === "on-brand" ? "ring-white/40" : "ring-black/5"
        }`}
      >
        <label htmlFor={`${id}-email`} className="sr-only">
          Email address
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          placeholder="you@email.com"
          aria-invalid={state.status === "error"}
          aria-describedby={state.status === "error" ? msgId : undefined}
          className="min-w-0 flex-1 bg-transparent px-4 py-3 text-[1rem] text-ink placeholder:text-mute focus:outline-none"
        />
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-brand px-5 py-3 text-[0.95rem] font-semibold text-ink transition-[background-color,transform] duration-300 ease-[var(--ease-out-expo)] hover:bg-brand-deep active:scale-[0.97] disabled:cursor-wait disabled:opacity-80 sm:px-6"
        >
          {pending ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden />
              Joining
            </>
          ) : (
            <>
              <span className="hidden min-[400px]:inline">Get early access</span>
              <span className="min-[400px]:hidden">Join</span>
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden
              />
            </>
          )}
        </button>
      </div>
      <p
        id={msgId}
        aria-live="polite"
        className={`mt-3 min-h-[1.25rem] pl-5 text-sm ${
          tone === "on-brand" || tone === "on-photo" ? "text-white/90" : "text-mute"
        }`}
      >
        {state.status === "error" ? state.message : "No spam. One email when your invite is ready."}
      </p>
    </form>
  );
}

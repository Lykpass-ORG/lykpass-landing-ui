"use client";

import { useActionState, useId, useState } from "react";
import { ArrowRight, Check, LoaderCircle } from "lucide-react";
import { joinWaitlist, type WaitlistState } from "@/app/actions";
import { useI18n } from "@/i18n/I18nProvider";

type Props = {
  withRole?: boolean;
  className?: string;
};

const initial: WaitlistState = { status: "idle", code: "" };

/** Always sits on a dark ground (hero photo or night panel), so helper text is light. */
export function WaitlistForm({ withRole = false, className = "" }: Props) {
  const { t, locale } = useI18n();
  const [state, action, pending] = useActionState(joinWaitlist, initial);
  const [role, setRole] = useState<"attendee" | "organizer">("attendee");
  const id = useId();
  const msgId = `${id}-msg`;

  if (state.status === "ok" && state.code) {
    return (
      <div
        role="status"
        className={`flex w-full max-w-[34rem] items-center gap-3 rounded-[26px] bg-surface px-5 py-4 text-ink shadow-soft ${className}`}
      >
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand text-on-brand">
          <Check className="h-4 w-4" strokeWidth={2.5} aria-hidden />
        </span>
        <span className="text-[0.98rem] font-medium">{t.form[state.code]}</span>
      </div>
    );
  }

  return (
    <form action={action} className={`relative w-full min-w-0 ${className}`} noValidate>
      <input type="hidden" name="locale" value={locale} />
      {/* Honeypot for bots: hidden from people and assistive tech, never focusable. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>
      {withRole && (
        <fieldset className="mb-4">
          <legend className="sr-only">{t.form.roleLegend}</legend>
          <div className="inline-flex max-w-full flex-wrap rounded-full bg-white/10 p-1 ring-1 ring-white/15">
            {(
              [
                ["attendee", t.form.roleAttendee],
                ["organizer", t.form.roleOrganizer],
              ] as const
            ).map(([value, label]) => (
              <label
                key={value}
                className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brand ${
                  role === value ? "bg-white text-night" : "text-white/85 hover:text-white"
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
        className={`flex w-full min-w-0 max-w-[34rem] items-center gap-1.5 rounded-full bg-surface p-1.5 shadow-lift ring-1 transition-[box-shadow] duration-300 ease-[var(--ease-out-expo)] has-[input:focus]:ring-[3px] has-[input:focus]:ring-brand/70 ${
          state.status === "error" ? "ring-2 ring-brand" : "ring-white/15"
        }`}
      >
        <label htmlFor={`${id}-email`} className="sr-only">
          {t.form.email}
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          size={1}
          placeholder={t.form.placeholder}
          aria-invalid={state.status === "error"}
          aria-describedby={msgId}
          className="w-0 min-w-0 flex-1 bg-transparent px-3 py-3 text-[1rem] text-ink placeholder:text-mute focus:outline-none focus-visible:outline-none sm:px-4"
        />
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-brand px-4 py-3 text-[0.95rem] font-semibold text-on-brand transition-[background-color,transform] duration-300 ease-[var(--ease-out-expo)] hover:bg-brand-deep focus-visible:outline-offset-2 focus-visible:outline-brand active:scale-[0.97] disabled:cursor-wait disabled:opacity-80 sm:px-6"
        >
          {pending ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden />
              <span className="hidden min-[420px]:inline">{t.form.joining}</span>
            </>
          ) : (
            <>
              <span className="hidden min-[420px]:inline">{t.form.submit}</span>
              <span className="min-[420px]:hidden">{t.form.submitShort}</span>
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden
              />
            </>
          )}
        </button>
      </div>
      <p id={msgId} aria-live="polite" className="mt-3 min-h-[1.25rem] px-2 text-sm text-white/85 sm:px-5">
        {state.status === "error" && state.code ? t.form[state.code] : t.form.note}
      </p>
    </form>
  );
}

"use client";

import Image from "next/image";
import { ArrowLeftRight, BellRing, Check, Heart, MessageCircle, Sparkles, Ticket } from "lucide-react";
import dance from "../../public/images/dance-floor.jpg";
import party from "../../public/images/party-crowd.jpg";
import wax from "../../public/images/waxprint-dancers.jpg";
import { useI18n } from "@/i18n/I18nProvider";

/* Phone UI screens for the attendee chapters. All event data is sample data. */

export function FeedScreen() {
  const { t } = useI18n();
  const s = t.screens;
  const imgs = [wax, party];
  return (
    <div className="h-full bg-surface">
      <div className="flex items-center justify-between px-5 pb-3 pt-4">
        <p className="text-[1.05rem] font-bold tracking-[-0.02em] text-ink">{s.feedTitle}</p>
        <span className="h-7 w-7 rounded-full bg-tint-2" />
      </div>
      <div className="space-y-3 px-4">
        {s.feed.map((e, i) => (
          <div key={e.t} className="overflow-hidden rounded-[18px] border border-line">
            <div className="relative h-32">
              <Image src={imgs[i]} alt="" fill sizes="300px" className="object-cover" />
              <span className="absolute right-2.5 top-2.5 grid h-8 w-8 place-items-center rounded-full bg-white/95">
                <Heart className="h-4 w-4 text-brand" />
              </span>
            </div>
            <div className="p-3">
              <p className="text-[0.95rem] font-bold text-ink">{e.t}</p>
              <p className="tabular text-[0.78rem] text-mute">{e.m}</p>
              <p className="mt-2 inline-flex items-center gap-1 rounded-full bg-tint px-2.5 py-1 text-[0.72rem] font-semibold text-brand-ink">
                <Sparkles className="h-3 w-3 shrink-0" /> {e.why}
              </p>
            </div>
          </div>
        ))}
        <p className="px-1 text-[0.7rem] text-mute">{s.feedNote}</p>
      </div>
    </div>
  );
}

export function QAScreen() {
  const { t } = useI18n();
  const s = t.screens;
  return (
    <div className="flex h-full flex-col bg-surface">
      <div className="relative h-36 shrink-0">
        <Image src={dance} alt="" fill sizes="300px" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-night/85 to-transparent" />
        <p className="absolute bottom-3 left-4 right-4 text-[1.05rem] font-bold text-white">{s.qaEvent}</p>
      </div>
      <div className="flex-1 space-y-3 overflow-hidden p-4">
        <div className="ml-auto max-w-[82%] rounded-[16px] rounded-br-[6px] bg-night px-3.5 py-2.5 text-[0.8rem] text-white ring-1 ring-white/10">
          {s.q1}
        </div>
        <div className="max-w-[88%] rounded-[16px] rounded-bl-[6px] bg-tint px-3.5 py-2.5 text-[0.8rem] leading-relaxed text-ink">
          {s.a1}
          <span className="mt-2 block text-[0.7rem] font-medium text-brand-ink">{s.source}</span>
        </div>
        <div className="ml-auto max-w-[72%] rounded-[16px] rounded-br-[6px] bg-night px-3.5 py-2.5 text-[0.8rem] text-white ring-1 ring-white/10">
          {s.q2}
        </div>
        <div className="max-w-[70%] rounded-[16px] rounded-bl-[6px] bg-tint px-3.5 py-2.5 text-[0.8rem] text-ink">{s.a2}</div>
      </div>
      <div className="m-4 flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-[0.8rem] text-mute">
        <MessageCircle className="h-4 w-4 shrink-0" /> {s.askEvent}
      </div>
    </div>
  );
}

export function TicketScreen() {
  const { t } = useI18n();
  const s = t.screens;
  return (
    <div className="h-full bg-tint p-4">
      <p className="px-1 pb-3 pt-1 text-[1.05rem] font-bold text-ink">{s.ticketTitle}</p>
      <div className="rounded-[20px] bg-surface p-4 shadow-soft">
        <p className="text-[0.95rem] font-bold text-ink">{s.ticketEvent}</p>
        <p className="tabular text-[0.78rem] text-mute">{s.ticketMeta}</p>
        <div className="my-4 border-t border-dashed border-line" />
        <div className="space-y-2 text-[0.8rem]">
          <div className="flex items-center justify-between gap-2 rounded-[12px] bg-tint px-3 py-2.5">
            <span className="inline-flex min-w-0 items-center gap-2 font-medium text-ink">
              <ArrowLeftRight className="h-4 w-4 shrink-0 text-brand" /> <span className="truncate">{s.send}</span>
            </span>
            <span className="shrink-0 rounded-full bg-brand px-2.5 py-1 text-[0.7rem] font-semibold text-on-brand">
              {s.confirm}
            </span>
          </div>
          <p className="px-1 text-[0.72rem] leading-relaxed text-mute">{s.sendNote}</p>
        </div>
      </div>
      <div className="mt-3 rounded-[20px] bg-surface p-4 text-[0.8rem] leading-relaxed text-ink shadow-soft">
        <p className="font-semibold">{s.refundQ}</p>
        <p className="mt-1 text-mute">{s.refundA}</p>
      </div>
    </div>
  );
}

export function ReminderScreen() {
  const { t } = useI18n();
  const s = t.screens;
  const notes = [s.n1, s.n2];
  return (
    <div className="h-full bg-night p-4 text-white">
      <p className="tabular pt-6 text-center text-[2.6rem] font-bold tracking-[-0.03em]">18:12</p>
      <p className="text-center text-[0.75rem] text-white/60">{s.day}</p>
      <div className="mt-8 space-y-2.5">
        {notes.map((n) => (
          <div key={n.t} className="flex gap-3 rounded-[18px] bg-white/10 p-3.5">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[10px] bg-brand text-on-brand">
              <BellRing className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <p className="text-[0.82rem] font-semibold">{n.t}</p>
              <p className="text-[0.72rem] text-white/65">{n.s}</p>
            </div>
          </div>
        ))}
        <div className="flex gap-3 rounded-[18px] bg-brand p-3.5 text-on-brand">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[10px] bg-night text-brand">
            <Ticket className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p className="text-[0.82rem] font-semibold">{s.n3.t}</p>
            <p className="text-[0.72rem] opacity-75">{s.n3.s}</p>
          </div>
          <Check className="ml-auto h-4 w-4 shrink-0" />
        </div>
      </div>
    </div>
  );
}

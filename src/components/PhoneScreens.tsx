import Image from "next/image";
import { ArrowLeftRight, BellRing, Check, Heart, MessageCircle, Sparkles, Ticket } from "lucide-react";
import dance from "../../public/images/dance-floor.jpg";
import party from "../../public/images/party-crowd.jpg";
import wax from "../../public/images/waxprint-dancers.jpg";

/* Static phone UI screens for the attendee chapters. All event data is sample data. */

function Bar({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between px-5 pb-3 pt-4">
      <p className="text-[1.05rem] font-bold tracking-[-0.02em] text-ink">{title}</p>
      <span className="h-7 w-7 rounded-full bg-tint-2" />
    </div>
  );
}

export function FeedScreen() {
  return (
    <div className="h-full bg-white">
      <Bar title="For you" />
      <div className="space-y-3 px-4">
        {[
          { img: wax, t: "Owambe Sunday Social", m: "Sun · Surulere · ₦7,000", why: "You saved two cultural events" },
          { img: party, t: "Late Shift: Amapiano Night", m: "Fri · Yaba · ₦5,000", why: "Amapiano, near you, Friday" },
        ].map((e) => (
          <div key={e.t} className="overflow-hidden rounded-[18px] border border-line">
            <div className="relative h-32">
              <Image src={e.img} alt="" fill sizes="300px" className="object-cover" />
              <span className="absolute right-2.5 top-2.5 grid h-8 w-8 place-items-center rounded-full bg-white/95">
                <Heart className="h-4 w-4 text-brand" />
              </span>
            </div>
            <div className="p-3">
              <p className="text-[0.95rem] font-bold text-ink">{e.t}</p>
              <p className="tabular text-[0.78rem] text-mute">{e.m}</p>
              <p className="mt-2 inline-flex items-center gap-1 rounded-full bg-tint px-2.5 py-1 text-[0.72rem] font-semibold text-brand-ink">
                <Sparkles className="h-3 w-3" /> {e.why}
              </p>
            </div>
          </div>
        ))}
        <p className="px-1 text-[0.7rem] text-mute">Personalized because you turned it on. Change anytime.</p>
      </div>
    </div>
  );
}

export function QAScreen() {
  return (
    <div className="flex h-full flex-col bg-white">
      <div className="relative h-36 shrink-0">
        <Image src={dance} alt="" fill sizes="300px" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 to-transparent" />
        <p className="absolute bottom-3 left-4 text-[1.05rem] font-bold text-white">Lagos Night Market Live</p>
      </div>
      <div className="flex-1 space-y-3 p-4">
        <div className="ml-auto max-w-[80%] rounded-[16px] rounded-br-[6px] bg-ink px-3.5 py-2.5 text-[0.82rem] text-white">
          Is there parking, and can I bring my 10-year-old?
        </div>
        <div className="max-w-[88%] rounded-[16px] rounded-bl-[6px] bg-tint px-3.5 py-2.5 text-[0.82rem] leading-relaxed text-ink">
          Yes to both. The organizer lists free parking at Gate B, and the event is marked family friendly.
          <span className="mt-2 block text-[0.7rem] font-medium text-brand-ink">From this event’s details</span>
        </div>
        <div className="ml-auto max-w-[70%] rounded-[16px] rounded-br-[6px] bg-ink px-3.5 py-2.5 text-[0.82rem] text-white">
          What time do doors open?
        </div>
        <div className="max-w-[60%] rounded-[16px] rounded-bl-[6px] bg-tint px-3.5 py-2.5 text-[0.82rem] text-ink">
          Doors open at 5:00 PM.
        </div>
      </div>
      <div className="m-4 flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-[0.8rem] text-mute">
        <MessageCircle className="h-4 w-4" /> Ask about this event
      </div>
    </div>
  );
}

export function TicketScreen() {
  return (
    <div className="h-full bg-tint p-4">
      <p className="px-1 pb-3 pt-1 text-[1.05rem] font-bold text-ink">My ticket</p>
      <div className="rounded-[20px] bg-white p-4 shadow-soft">
        <p className="text-[0.95rem] font-bold text-ink">Skyline Jazz Sessions</p>
        <p className="tabular text-[0.78rem] text-mute">Sat · 8:00 PM · Regular × 2</p>
        <div className="my-4 border-t border-dashed border-line" />
        <div className="space-y-2 text-[0.8rem]">
          <div className="flex items-center justify-between rounded-[12px] bg-tint px-3 py-2.5">
            <span className="inline-flex items-center gap-2 font-medium text-ink">
              <ArrowLeftRight className="h-4 w-4 text-brand" /> Send 1 ticket to Tolu
            </span>
            <span className="rounded-full bg-brand px-2.5 py-1 text-[0.7rem] font-semibold text-ink">Confirm</span>
          </div>
          <p className="px-1 text-[0.72rem] leading-relaxed text-mute">
            Her ticket gets a new QR code. Yours stops working the moment she accepts.
          </p>
        </div>
      </div>
      <div className="mt-3 rounded-[20px] bg-white p-4 text-[0.8rem] leading-relaxed text-ink shadow-soft">
        <p className="font-semibold">Can I get a refund?</p>
        <p className="mt-1 text-mute">
          This event allows refunds up to 48 hours before start. I can prepare the request for you. The organizer
          approves it.
        </p>
      </div>
    </div>
  );
}

export function ReminderScreen() {
  return (
    <div className="h-full bg-ink p-4 text-white">
      <p className="pt-6 text-center text-[2.6rem] font-bold tabular tracking-[-0.03em]">6:12</p>
      <p className="text-center text-[0.75rem] text-white/60">Saturday</p>
      <div className="mt-8 space-y-2.5">
        {[
          { t: "Leave by 7:15 to make doors", s: "Skyline Jazz Sessions starts at 8:00 PM" },
          { t: "Your tickets are ready", s: "2 tickets saved offline for the gate" },
        ].map((n) => (
          <div key={n.t} className="flex gap-3 rounded-[18px] bg-white/10 p-3.5">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[10px] bg-brand">
              <BellRing className="h-4 w-4" />
            </span>
            <div>
              <p className="text-[0.82rem] font-semibold">{n.t}</p>
              <p className="text-[0.72rem] text-white/65">{n.s}</p>
            </div>
          </div>
        ))}
        <div className="flex gap-3 rounded-[18px] bg-brand p-3.5 text-ink">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[10px] bg-ink text-brand">
            <Ticket className="h-4 w-4" />
          </span>
          <div>
            <p className="text-[0.82rem] font-semibold">Doors are open</p>
            <p className="text-[0.72rem] text-ink/70">Show your QR at Gate A</p>
          </div>
          <Check className="ml-auto h-4 w-4" />
        </div>
      </div>
    </div>
  );
}

export const site = {
  name: "Lykpass",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://lykpass.com").replace(/\/$/, ""),
  title: "Lykpass: find events by saying what you feel like doing",
  description:
    "Lykpass is the AI-native event app. Describe your night in plain words and get real, bookable events that fit your budget, date and taste. Organizers draft, price and forecast events with an AI co-pilot. Join early access.",
  keywords: [
    "AI event discovery",
    "event tickets Nigeria",
    "events in Lagos",
    "buy event tickets",
    "event ticketing platform",
    "event management software",
    "sell tickets online",
    "virtual event tickets",
    "livestream tickets",
    "things to do this weekend",
  ],
};

export const faqs = [
  {
    q: "What is Lykpass?",
    a: "Lykpass is an event discovery and ticketing app with AI built in. You describe what you feel like doing, such as a rooftop jazz night under ₦15k this weekend, and Lykpass shows real events you can book. Organizers use the same AI to draft, price, promote and forecast their events.",
  },
  {
    q: "Can the AI make up an event, a price or a seat?",
    a: "No. The AI only chooses, ranks and explains events that already exist in Lykpass's ticket records. Prices, dates, seat availability, refund status and ticket validity are always read from those records and checked before they appear on your screen.",
  },
  {
    q: "What happens if the AI is down?",
    a: "Regular keyword and filter search keeps working, and so do checkout, tickets, transfers and check-in. The AI is a faster way in, never the only way in.",
  },
  {
    q: "Do I need to share my data to get recommendations?",
    a: "Search works for everyone without personalization. A personal feed is only built if you agree to it, and you can view, edit, reset or delete your interest profile, or switch personalization off, at any time.",
  },
  {
    q: "How do online events and livestreams work?",
    a: "For online and hybrid events, a Join live button appears on your ticket when the stream window opens. Streams run on Lykluk Live, and only a valid, unrefunded ticket gets in. If you transfer your ticket, access moves with it. Buying a ticket never requires a Lykluk account.",
  },
  {
    q: "I organize events. What does Lykpass do for me?",
    a: "Describe your event in a sentence and Lykpass drafts the title, description, tags, category and age guidance for you to edit. You get sales and attendance forecasts with a confidence range, price suggestions that show the comparable events used, and marketing copy you approve before anything is sent.",
  },
  {
    q: "Will the AI ever publish, refund or ban anything on its own?",
    a: "No. Anything that touches money or people, including publishing events, sending campaigns, approving refunds, payouts and account bans, needs a human decision. AI can flag and suggest; people decide.",
  },
  {
    q: "When can I use Lykpass?",
    a: "Lykpass is opening in stages. Join the early-access list and we will email you when your invite is ready.",
  },
];

# lykpass-landing-ui

Marketing landing page for Lykpass, the AI-native event discovery and ticketing platform.

Built with Next.js (App Router), Tailwind CSS v4, Lenis smooth scroll and Motion for scroll-linked animation.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Configure

Copy `.env.example` to `.env.local` (and set the same variables in your host, e.g. Vercel).

- `NEXT_PUBLIC_SITE_URL`: the production origin used for canonical URLs, the sitemap, robots.txt, hreflang, Open Graph and JSON-LD. Defaults to `https://lykpass.com`.

### Waitlist (Resend)

The early-access forms post to the server action in `src/app/actions.ts`, which saves each signup as a Resend contact (`src/lib/waitlist.ts`).

1. Create a **full-access** API key at [resend.com/api-keys](https://resend.com/api-keys) (contacts are not available to sending-only keys) and set `RESEND_API_KEY`.
2. Run the one-time setup. It creates the contact properties the form writes (`waitlist_role`, `locale`, `signup_source`) and a "Waitlist" segment, then prints its id:
   ```bash
   npm run resend:setup
   ```
3. Set `RESEND_SEGMENT_ID` to the printed id.
4. Optional: set `RESEND_FROM_EMAIL` (e.g. `Lykpass <hello@lykpass.com>`) on a domain verified in Resend to send new signups a short confirmation email in their language.

Behavior:
- Each contact records whether they go to or run events, and their language, so invites can go out in the right language.
- Signing up twice is treated as success: the existing contact is updated rather than duplicated, and no second confirmation is sent.
- A hidden honeypot field quietly drops simple bots.
- Without `RESEND_API_KEY`, development signups are logged and skipped; in production the visitor sees a "try again" message and the server logs the cause.

## Content notes

- Every event, price, forecast and ticket shown in the page's product demos is sample data and is labelled as such on the page.
- Photography is from Unsplash (Unsplash License). Each file in `public/images` has its source URL embedded in its metadata.

## Boron, the AI assistant

Boron is the character that marks AI in Lykpass: a shaded, egg-shaped orange head with pill eyes, a smile and a little blush. It turns its head left and right now and then, looks around, blinks and grins.

- In the app code: `src/components/Boron.tsx` (`thinking` makes the eyes dart while Boron is "typing"; `track` makes them follow the pointer; `grounded` adds a bob and a ground shadow; `delay` keeps several Borons out of sync). Animations live in `globals.css` under `.boron-*` and stop for reduced-motion users.
- Standalone files: `public/brand/boron.svg` (self-animating: turns, looks around, blinks and grins anywhere SVG animation plays) and `public/brand/boron-static.svg`.

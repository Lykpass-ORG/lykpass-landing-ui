// One-time Resend setup for the Lykpass waitlist.
// Creates the contact properties the form writes and a "Waitlist" segment.
// Usage: RESEND_API_KEY=re_... npm run resend:setup   (or put the key in .env.local)
import { Resend } from "resend";

const key = process.env.RESEND_API_KEY;
if (!key) {
  console.error("Set RESEND_API_KEY (full-access key) first.");
  process.exit(1);
}
const resend = new Resend(key);

const wanted = [
  { key: "waitlist_role", type: "string", fallbackValue: "attendee" },
  { key: "locale", type: "string", fallbackValue: "en" },
  { key: "signup_source", type: "string", fallbackValue: "landing" },
];

const { data: list, error: listErr } = await resend.contactProperties.list();
if (listErr) {
  console.error("Could not list contact properties:", listErr.message);
  process.exit(1);
}
const have = new Set((list?.data ?? []).map((p) => p.key));
for (const prop of wanted) {
  if (have.has(prop.key)) {
    console.log(`✓ property ${prop.key} already exists`);
    continue;
  }
  const { error } = await resend.contactProperties.create(prop);
  if (error) console.error(`✗ property ${prop.key}:`, error.message);
  else console.log(`+ created property ${prop.key}`);
}

const { data: segs } = await resend.segments.list();
const existing = (segs?.data ?? []).find((s) => s.name === "Waitlist");
if (existing) {
  console.log(`✓ segment "Waitlist" exists: ${existing.id}`);
  console.log(`\nSet RESEND_SEGMENT_ID=${existing.id}`);
} else {
  const { data, error } = await resend.segments.create({ name: "Waitlist" });
  if (error) {
    console.error("✗ segment:", error.message);
    process.exit(1);
  }
  console.log(`+ created segment "Waitlist": ${data.id}`);
  console.log(`\nSet RESEND_SEGMENT_ID=${data.id}`);
}

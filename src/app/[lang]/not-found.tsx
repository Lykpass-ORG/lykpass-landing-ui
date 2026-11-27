import Link from "next/link";
import { Logo } from "@/components/Logo";

export default function NotFound() {
  return (
    <main className="grid min-h-[100svh] place-items-center bg-paper px-5 text-center">
      <div>
        <Logo className="justify-center" />
        <h1 className="mt-10 text-[clamp(2.4rem,8vw,4.5rem)] font-extrabold leading-none text-ink">404</h1>
        <p className="mt-4 text-[1.05rem] text-mute">This page doesn’t exist.</p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-brand px-6 py-3 font-semibold text-on-brand transition-colors hover:bg-brand-deep"
        >
          Lykpass
        </Link>
      </div>
    </main>
  );
}

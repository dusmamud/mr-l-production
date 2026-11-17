import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8">
      <p className="font-display text-7xl font-black text-flame">404</p>
      <h1 className="pt-4 font-display text-3xl font-black tracking-tight sm:text-4xl">This idea wandered off.</h1>
      <p className="mx-auto max-w-md pt-3 text-ink-2">The page you are looking for does not exist — or it moved somewhere brighter.</p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-flame px-6 py-3.5 text-sm font-bold text-white"
      >
        Back to Home <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </section>
  );
}

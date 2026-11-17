"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, ChevronDown } from "lucide-react";
import { SERVICES } from "@/data/site";

const BUDGETS = ["Under ₹50,000", "₹50,000 – ₹1,50,000", "₹1,50,000 – ₹5,00,000", "₹5,00,000+"];

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [service, setService] = useState(SERVICES[0].title);
  const [budget, setBudget] = useState(BUDGETS[1]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (name.length < 2) return setError("Please tell us your name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError("Please enter a valid email address.");
    if (message.length < 10) return setError("Tell us a little more about your project (at least 10 characters).");
    setError("");
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-[24px] bg-cream-2 p-8 text-center ring-1 ring-line sm:p-10" role="status">
        <CheckCircle2 className="mx-auto h-12 w-12 text-flame" aria-hidden="true" />
        <h2 className="pt-4 font-display text-2xl font-black tracking-tight">Thank you — we got it.</h2>
        <p className="mx-auto max-w-md pt-2 text-sm leading-relaxed text-ink-2 sm:text-base">
          Your brief is in. We reply to every serious enquiry within one working day — usually much faster.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-6 rounded-full border border-ink/20 px-5 py-2.5 text-sm font-bold hover:border-ink"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-[24px] bg-cream-2 p-6 ring-1 ring-line sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="text-sm font-bold">Your name *</label>
          <input id="cf-name" name="name" autoComplete="name" placeholder="Aarav Sharma" className="mt-2 w-full rounded-xl border border-line bg-cream px-4 py-3 text-sm outline-none placeholder:text-ink-3 focus:border-flame" />
        </div>
        <div>
          <label htmlFor="cf-email" className="text-sm font-bold">Email *</label>
          <input id="cf-email" name="email" type="email" autoComplete="email" placeholder="you@company.com" className="mt-2 w-full rounded-xl border border-line bg-cream px-4 py-3 text-sm outline-none placeholder:text-ink-3 focus:border-flame" />
        </div>
        <div className="relative">
          <label htmlFor="cf-service" className="text-sm font-bold">Service needed</label>
          <select id="cf-service" name="service" value={service} onChange={(e) => setService(e.target.value)} className="mt-2 w-full appearance-none rounded-xl border border-line bg-cream px-4 py-3 text-sm outline-none focus:border-flame">
            {SERVICES.map((s) => (
              <option key={s.slug} value={s.title}>{s.title}</option>
            ))}
            <option value="Full project">Full project — everything</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-4 bottom-3.5 h-4 w-4 text-ink-3" aria-hidden="true" />
        </div>
        <div className="relative">
          <label htmlFor="cf-budget" className="text-sm font-bold">Budget range</label>
          <select id="cf-budget" name="budget" value={budget} onChange={(e) => setBudget(e.target.value)} className="mt-2 w-full appearance-none rounded-xl border border-line bg-cream px-4 py-3 text-sm outline-none focus:border-flame">
            {BUDGETS.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-4 bottom-3.5 h-4 w-4 text-ink-3" aria-hidden="true" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="cf-message" className="text-sm font-bold">Tell us about your project *</label>
          <textarea id="cf-message" name="message" rows={5} placeholder="What are you building, who is it for, and when do you need it?" className="mt-2 w-full resize-y rounded-xl border border-line bg-cream px-4 py-3 text-sm outline-none placeholder:text-ink-3 focus:border-flame" />
        </div>
      </div>
      {error && (
        <p className="mt-4 rounded-xl bg-flame/10 px-4 py-3 text-sm font-semibold text-flame-dark" role="alert">{error}</p>
      )}
      <button type="submit" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-flame px-6 py-4 text-sm font-bold text-white transition-transform hover:scale-[1.01] active:scale-95 sm:w-auto">
        Send Message <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>
      <p className="pt-3 text-xs leading-relaxed text-ink-3">
        No backend yet — this form confirms your brief on screen. For a live inbox, connect it to your email or a form service before launch.
      </p>
    </form>
  );
}

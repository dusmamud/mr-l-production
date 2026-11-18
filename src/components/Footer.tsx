"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NAV, SITE } from "@/data/site";
import { Logo } from "./Logo";

// Brand icons were removed from lucide-react, so X / YouTube / LinkedIn are inline SVGs.
function XIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-6.4L6.4 22H3.3l7.3-8.3L1 2h6.5l4.4 5.9L18.9 2Zm-1.1 18h1.7L7.1 3.9H5.3L17.8 20Z" />
    </svg>
  );
}

function YoutubeIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4L15.8 12l-6.2 3.6Z" />
    </svg>
  );
}

function InstagramIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6h.1c.5-.9 1.7-1.9 3.4-1.9 3.6 0 4.2 2.4 4.2 5.4v6.4ZM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2ZM7.1 20.5H3.5V9h3.6v11.5Z" />
    </svg>
  );
}

const FOOTER_LINKS = [
  { label: "Testimonials", href: "/testimonials" },
  { label: "Team", href: "/team" },
  { label: "Process", href: "/process" },
  { label: "FAQ", href: "/faq" },
  { label: "Careers", href: "/careers" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    const subject = encodeURIComponent("Subscribe — Mr. L Production newsletter");
    const body = encodeURIComponent(`Please add me to the Mr. L Production newsletter.\n\nEmail: ${email.trim()}\n`);
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
  }
  return (
    <form onSubmit={onSubmit} noValidate>
      <p className="font-display text-lg font-extrabold tracking-tight">Studio notes, once a month.</p>
      <p className="pt-1 text-sm text-ink-2">What we made, what we learned, and what is next. No spam, ever.</p>
      <div className="mt-4 flex max-w-md items-center gap-2">
        <label htmlFor="footer-newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="footer-newsletter-email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-full border border-line bg-cream px-4 py-3 text-sm outline-none placeholder:text-ink-3 focus:border-flame"
        />
        <button type="submit" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-flame-dark px-5 py-3 text-sm font-bold text-white transition-transform hover:scale-[1.03] active:scale-95">
          Subscribe <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
      {error && (
        <p className="mt-3 text-sm font-semibold text-flame-dark" role="alert">{error}</p>
      )}
      <p className="pt-3 text-xs leading-relaxed text-ink-3">
        Opens your mail app — we store nothing here. There is no newsletter backend yet; your email goes to us as a message.
      </p>
    </form>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-cream">
      {/* Design mark: one thin swooping curve line across the footer top,
          behind the content. Clipped by the footer's own overflow-hidden. */}
      <svg viewBox="0 0 1440 96" fill="none" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 top-0 h-24 w-full text-ink/10" aria-hidden="true">
        <path d="M-20 72 C 240 8, 480 92, 720 44 S 1200 8, 1460 62" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <div className="relative mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 border-b border-line pb-10 lg:flex-row lg:items-start lg:justify-between">
          <NewsletterSignup />
          <nav className="grid grid-cols-2 gap-x-10 gap-y-3 sm:grid-cols-3" aria-label="More pages">
            {FOOTER_LINKS.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm font-semibold text-ink-2 transition-colors hover:text-flame-dark">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <Logo />
          <nav className="flex flex-wrap items-center gap-x-7 gap-y-3" aria-label="Footer navigation">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm font-semibold text-ink-2 transition-colors hover:text-flame-dark">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            {[
              { label: "X (Twitter)", href: SITE.socials.x, Icon: XIcon },
              { label: "YouTube", href: SITE.socials.youtube, Icon: YoutubeIcon },
              { label: "Instagram", href: SITE.socials.instagram, Icon: InstagramIcon },
              { label: "LinkedIn", href: SITE.socials.linkedin, Icon: LinkedinIcon },
            ].map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 transition-all hover:border-flame hover:bg-flame-dark hover:text-white"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 text-sm text-ink-3 sm:flex-row sm:items-center sm:justify-between">
          <p>© {SITE.year} {SITE.name}. All rights reserved.</p>
          <p className="font-semibold tracking-wide">Dream &nbsp;•&nbsp; Design &nbsp;•&nbsp; Create</p>
        </div>
      </div>
    </footer>
  );
}

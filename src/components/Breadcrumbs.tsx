import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SITE } from "@/data/site";

export type Crumb = { label: string; href?: string };

/**
 * Visible breadcrumb trail + BreadcrumbList JSON-LD for detail pages.
 * Server component — no interactivity, safe for static export.
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE.url}${item.href}` } : {}),
    })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Breadcrumb" className="pb-6">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm font-semibold text-ink-3">
          {items.map((item, i) => (
            <li key={item.label} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="h-4 w-4 text-ink-3/60" aria-hidden="true" />}
              {item.href ? (
                <Link href={item.href} className="transition-colors hover:text-flame-dark">
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="text-ink">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

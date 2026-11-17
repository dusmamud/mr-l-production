import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";

// Required with `output: "export"` — see sitemap.ts.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      {
        // Explicitly allowed: AI crawlers may read the site (and llms.txt).
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "OAI-SearchBot",
          "ClaudeBot",
          "anthropic-ai",
          "PerplexityBot",
          "Google-Extended",
          "CCBot",
        ],
        allow: "/",
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}

export const SITE = {
  name: "Mr. L Production",
  shortName: "Mr. L",
  tagline: "Make Ideas Move.",
  description:
    "A creative studio turning bold ideas into powerful digital experiences — branding, web design and motion that inspire, engage and make an impact.",
  url: "https://mr-l-production.pages.dev",
  email: "hello@mr-l-production.com",
  phone: "+91 98765 43210",
  location: "Mumbai, India",
  year: 2026,
  socials: {
    x: "https://x.com/mrlproduction",
    youtube: "https://youtube.com/@mrlproduction",
    instagram: "https://instagram.com/mrlproduction",
    linkedin: "https://linkedin.com/company/mrlproduction",
  },
};

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  image: string;
  deliverables: string[];
  icon: "fingerprint" | "globe" | "clapperboard";
};

export const SERVICES: Service[] = [
  {
    slug: "branding-identity",
    title: "Branding & Identity",
    short: "Build a brand that stands out.",
    description:
      "From the first sketch to a full identity system — logo, colour, type and voice — we build brands people remember and trust. Every mark is designed to work everywhere: from a favicon to a billboard.",
    image: "/images/service-branding.jpg",
    deliverables: ["Logo & wordmark", "Colour & type system", "Brand guidelines", "Stationery & social kit"],
    icon: "fingerprint",
  },
  {
    slug: "web-design-development",
    title: "Web Design & Development",
    short: "Create digital experiences.",
    description:
      "Fast, accessible, mobile-first websites built on modern stacks. We design in the browser, obsess over Core Web Vitals, and ship sites that rank, convert and feel effortless on every device.",
    image: "/images/service-web.jpg",
    deliverables: ["UX & UI design", "Next.js development", "CMS & e-commerce", "SEO & performance"],
    icon: "globe",
  },
  {
    slug: "motion-graphics-video",
    title: "Motion Graphics & Video",
    short: "Bring ideas to life.",
    description:
      "Cinematic reels, product films and animated stories that make people stop scrolling. From storyboard to final grade, our motion work gives your brand a pulse.",
    image: "/images/service-motion.png",
    deliverables: ["Brand films & reels", "Product videos", "2D / 3D animation", "Social cut-downs"],
    icon: "clapperboard",
  },
];

export type Project = {
  slug: string;
  title: string;
  category: string;
  service: string;
  image: string;
  year: string;
  client: string;
  summary: string;
  results: string[];
};

export const PROJECTS: Project[] = [
  {
    slug: "visual-identity-aurora",
    title: "Visual Identity — Aurora",
    category: "Branding",
    service: "Branding & Identity",
    image: "/images/portfolio-visual.jpg",
    year: "2025",
    client: "Aurora Outdoors",
    summary:
      "A complete identity for an outdoor brand — a rising-sun mark, warm earth palette and a type system built for trail and screen alike.",
    results: ["+62% brand recall in launch survey", "Identity live across 40+ touchpoints"],
  },
  {
    slug: "digital-experience-velocity",
    title: "Digital Experience — Velocity",
    category: "Web Design",
    service: "Web Design & Development",
    image: "/images/portfolio-digital.jpg",
    year: "2025",
    client: "Velocity Motors",
    summary:
      "A dark, cinematic configurator and marketing site for a performance EV — 98 Lighthouse performance, sub-second LCP on mobile.",
    results: ["3.1x more test-drive bookings", "98 / 100 Lighthouse performance"],
  },
  {
    slug: "creative-campaign-ember",
    title: "Creative Campaign — Ember",
    category: "Motion Graphics",
    service: "Motion Graphics & Video",
    image: "/images/portfolio-campaign.jpg",
    year: "2025",
    client: "Ember Beauty",
    summary:
      "A launch film and social campaign built around liquid light — one hero film, twelve cut-downs, one very impatient launch date.",
    results: ["4.2M views in the first month", "Sold out launch collection in 9 days"],
  },
  {
    slug: "brand-system-northwind",
    title: "Brand System — Northwind",
    category: "Branding",
    service: "Branding & Identity",
    image: "/images/service-branding.jpg",
    year: "2024",
    client: "Northwind Studio",
    summary:
      "A fluid identity system for an architecture practice — chrome, light and shadow as a living brand language.",
    results: ["Identity adopted across 3 offices", "Shortlisted — National Design Awards"],
  },
  {
    slug: "ecommerce-lumen",
    title: "E-commerce — Lumen",
    category: "Web Design",
    service: "Web Design & Development",
    image: "/images/service-web.jpg",
    year: "2024",
    client: "Lumen Living",
    summary:
      "A calm, fast storefront for a homeware brand — mobile-first checkout, rich product stories and zero layout shift.",
    results: ["+48% mobile conversion", "0.9s median LCP"],
  },
  {
    slug: "motion-reel-orbit",
    title: "Motion Reel — Orbit",
    category: "Motion Graphics",
    service: "Motion Graphics & Video",
    image: "/images/service-motion.png",
    year: "2024",
    client: "Orbit Fitness",
    summary:
      "A kinetic launch reel and app-store motion kit that turned a fitness app's first impression into its best ad.",
    results: ["1.8M reel views", "+34% app installs in launch week"],
  },
];

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  body: string[];
};

export const POSTS: Post[] = [
  {
    slug: "why-motion-is-the-new-logo",
    title: "Why motion is the new logo",
    excerpt: "Static marks still matter — but the first thing people meet today is movement. How we design brands that live in motion.",
    category: "Branding",
    date: "2026-11-10",
    readTime: "5 min read",
    image: "/images/service-motion.png",
    body: [
      "A logo used to be a stamp. Today it is the first frame of a film — the thing that loads, loops and moves before anyone reads a word. Brands that treat motion as an afterthought end up with a mark that feels frozen in every place it matters most: the reel, the story, the app splash.",
      "We start every identity with a motion idea, not a motion add-on. How does the mark arrive? How does it leave? What does it do when it has one second, and what does it do when it has ten? Answering that early keeps the static logo honest — if it cannot move, it probably cannot survive.",
      "The practical rule we use: design the smallest moving moment first. A two-second loop, a loading mark, a hover. If that moment feels like the brand, the rest of the system falls into place.",
    ],
  },
  {
    slug: "mobile-first-is-not-a-phase",
    title: "Mobile-first is not a phase",
    excerpt: "Most of your audience meets you on a phone, on a slow network, with one thumb. Designing desktop-down is designing backwards.",
    category: "Web Design",
    date: "2026-10-28",
    readTime: "4 min read",
    image: "/images/service-web.jpg",
    body: [
      "Mobile-first is often sold as a layout technique. It is really a priorities technique: what matters most has to survive the smallest screen, the weakest connection and the shortest attention span.",
      "We design the 390px layout first, with real copy and real images. If the story does not work there, no amount of desktop decoration will save it. Only when the small screen sings do we expand — and the desktop version inherits the discipline, not the clutter.",
      "The payoff is measurable: faster loads, higher conversion, and a site that feels considered instead of squeezed.",
    ],
  },
  {
    slug: "the-brief-that-changed-everything",
    title: "The brief that changed everything",
    excerpt: "The best projects we have shipped started with a bad brief — and one honest conversation about what the client actually needed.",
    category: "Process",
    date: "2026-10-12",
    readTime: "6 min read",
    image: "/images/about.jpg",
    body: [
      "A brief tells you what a client thinks they want. A conversation tells you what they actually need. The gap between the two is where the best work lives.",
      "Our Discover phase exists for exactly this: one structured workshop, a stack of awkward questions, and permission to challenge the premise. Half the time the deliverable changes. Almost every time, the result gets better.",
      "If you are writing a brief right now, include the one sentence you are afraid to write — the real problem, the real deadline, the real budget. A studio that cannot handle the truth cannot solve it either.",
    ],
  },
  {
    slug: "colour-that-converts",
    title: "Colour that converts",
    excerpt: "Our orange is not decoration. It is a decision — and colour decisions, made well, are the cheapest conversion lift you will ever buy.",
    category: "Branding",
    date: "2026-09-30",
    readTime: "4 min read",
    image: "/images/portfolio-visual.jpg",
    body: [
      "Colour does three jobs at once: it gets noticed, it sets a mood, and it tells the eye where to go next. Most brands pick a colour they like. Better brands pick a colour that works.",
      "Our flame orange exists to do one job — mark the action. Every button that matters, every word that matters, every moment that matters wears it. The rest of the palette stays quiet so the orange can speak.",
      "Test it yourself: take your homepage, remove every colour except one accent, and see if a stranger can still find the next step in three seconds. If they cannot, your palette is decorating instead of directing.",
    ],
  },
  {
    slug: "shooting-cars-in-the-dark",
    title: "Shooting cars in the dark",
    excerpt: "Notes from the Velocity shoot — why we lit a black car with orange streaks and almost no light at all.",
    category: "Motion",
    date: "2026-09-14",
    readTime: "5 min read",
    image: "/images/portfolio-digital.jpg",
    body: [
      "A black car in a dark studio is a photographer's dare: there is almost nothing to see, and everything to reveal. We lit Velocity with long orange streaks and let the bodywork do the talking — every curve became a line of light.",
      "The lesson travels beyond cars. When the subject is dark, do not flood it with light. Give the audience one strong light source and let their eye complete the shape. Restraint reads as confidence.",
      "The final frames needed almost no retouching. When the light is right on set, the edit is just trimming.",
    ],
  },
  {
    slug: "from-concept-to-creation",
    title: "From concept to creation",
    excerpt: "Our three-step process, honestly explained — what happens in Discover, Create and Deliver, and what we need from you at each step.",
    category: "Process",
    date: "2026-08-26",
    readTime: "5 min read",
    image: "/images/process-ring.jpg",
    body: [
      "Discover is listening with structure: audience, competitors, constraints, and the one metric that will decide whether the project worked. No design happens here — and that is the point.",
      "Create is where the work becomes visible: concepts, prototypes, films, then the hard rounds of critique. We show work early and often, because a surprise at the end is a failure of process.",
      "Deliver is not a handover, it is a launch: files, guidelines, training, and a month of support while the work meets the real world. A project is only done when it works without us.",
    ],
  },
];

export const PROCESS = [
  {
    n: "01",
    title: "Discover",
    text: "We understand your vision and goals.",
  },
  {
    n: "02",
    title: "Create",
    text: "We bring ideas to life with creativity.",
  },
  {
    n: "03",
    title: "Deliver",
    text: "You get exceptional results.",
  },
];

export const NAV = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

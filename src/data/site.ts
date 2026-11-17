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
  priceFrom?: string;
  priceNote?: string;
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
    priceFrom: "from ₹50,000",
    priceNote: "Identity for one brand, including logo, colour and type system.",
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
    priceFrom: "from ₹80,000",
    priceNote: "A fast, mobile-first marketing site or storefront, designed and built.",
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
    priceFrom: "from ₹60,000",
    priceNote: "One hero film plus social cut-downs, storyboarded and graded.",
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
  challenge?: string;
  approach?: string;
  solution?: string;
  metrics?: string[];
  quote?: { text: string; author: string; role: string };
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
    // MOCK — replace with real values before launch
    challenge:
      "Aurora had a loyal trail community but no visual identity — every touchpoint looked like a different brand, and the product was getting lost on crowded shelves.",
    approach:
      "We spent a week on the trail with the team and their customers, then built the identity around one idea: the first light on a summit. Every mark, colour and texture had to earn its place in that story.",
    solution:
      "A rising-sun mark, a warm earth palette and a type system built for trail and screen alike, delivered as a full guideline set with 40+ ready-to-use touchpoints.",
    metrics: ["+62% brand recall", "40+ touchpoints live", "3 weeks to launch"],
    quote: { text: "It finally looks like the brand we always knew we were.", author: "Rohan Kapoor", role: "Founder, Aurora Outdoors" },
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
    // MOCK — replace with real values before launch
    challenge:
      "Velocity's configurator was beautiful but slow — buyers dropped off before they ever reached a test-drive booking, and the site failed on most phones.",
    approach:
      "We rebuilt the experience mobile-first, designing the configurator around three decisions instead of thirty, and treated performance as a design constraint, not an afterthought.",
    solution:
      "A dark, cinematic site with a three-step configurator, sub-second loading on mobile and a booking flow that takes under a minute from first click to confirmed slot.",
    metrics: ["3.1x test-drive bookings", "98 / 100 Lighthouse", "0.8s mobile LCP"],
    quote: { text: "The site finally sells the car the way the car deserves to be sold.", author: "Meera Iyer", role: "Marketing Head, Velocity Motors" },
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
    // MOCK — replace with real values before launch
    challenge:
      "Ember's launch collection had nine days of stock and no campaign — the film had to do the work of a launch event, a lookbook and a storefront at once.",
    approach:
      "We built the whole campaign around one visual idea, liquid light, and shot it so every frame could stand alone as a still, a story or a 15-second cut-down.",
    solution:
      "One hero film, twelve cut-downs and a stills set, all graded to the same warm palette and delivered in every format the launch channels needed.",
    metrics: ["4.2M views in month one", "Sold out in 9 days", "12 cut-downs delivered"],
    quote: { text: "One film did the work of an entire launch team.", author: "Ananya Desai", role: "Brand Lead, Ember Beauty" },
  },
  {
    slug: "brand-system-northwind",
    title: "Brand System — Northwind",
    category: "Branding",
    service: "Branding & Identity",
    image: "/images/project-northwind.jpg",
    year: "2024",
    client: "Northwind Studio",
    summary:
      "A fluid identity system for an architecture practice — chrome, light and shadow as a living brand language.",
    results: ["Identity adopted across 3 offices", "Shortlisted — National Design Awards"],
    // MOCK — replace with real values before launch
    challenge:
      "Northwind's three offices each presented the practice differently, and none of it looked like the buildings they were proud of.",
    approach:
      "We treated the identity like architecture itself — a system of light, shadow and structure, with rules flexible enough for three offices and strict enough to stay one brand.",
    solution:
      "A fluid identity system built on chrome, light and shadow, with templates for proposals, signage and site boards that every office could use without a designer in the room.",
    metrics: ["3 offices on one system", "National Design Awards shortlist", "6 weeks to rollout"],
    quote: { text: "Our proposals finally look like our buildings.", author: "Vikram Seth", role: "Director, Northwind Studio" },
  },
  {
    slug: "ecommerce-lumen",
    title: "E-commerce — Lumen",
    category: "Web Design",
    service: "Web Design & Development",
    image: "/images/project-lumen.jpg",
    year: "2024",
    client: "Lumen Living",
    summary:
      "A calm, fast storefront for a homeware brand — mobile-first checkout, rich product stories and zero layout shift.",
    results: ["+48% mobile conversion", "0.9s median LCP"],
    // MOCK — replace with real values before launch
    challenge:
      "Lumen's beautiful products were buried in a slow, cluttered store — most shoppers left on mobile before the first product image had loaded.",
    approach:
      "We stripped the store back to the products and their stories, designed checkout for one thumb, and made speed a feature the brand could talk about.",
    solution:
      "A calm, fast storefront with rich product stories, mobile-first checkout and zero layout shift, so the page never jumps while a customer is reading.",
    metrics: ["+48% mobile conversion", "0.9s median LCP", "0 layout shift"],
    quote: { text: "The store feels like the products now — calm, considered, easy.", author: "Sara Thomas", role: "Founder, Lumen Living" },
  },
  {
    slug: "motion-reel-orbit",
    title: "Motion Reel — Orbit",
    category: "Motion Graphics",
    service: "Motion Graphics & Video",
    image: "/images/project-orbit.jpg",
    year: "2024",
    client: "Orbit Fitness",
    summary:
      "A kinetic launch reel and app-store motion kit that turned a fitness app's first impression into its best ad.",
    results: ["1.8M reel views", "+34% app installs in launch week"],
    // MOCK — replace with real values before launch
    challenge:
      "Orbit's app was strong, but its launch looked like every other fitness app — static screenshots in a feed built for movement.",
    approach:
      "We made the launch reel the ad: one kinetic idea, light trails following real movement, cut so the first two seconds alone told the whole story.",
    solution:
      "A kinetic launch reel plus an app-store motion kit — hero film, loopable social cuts and store preview video, all from one shoot day.",
    metrics: ["1.8M reel views", "+34% installs in launch week", "1 shoot day"],
    quote: { text: "Our first impression finally moves like the app does.", author: "Arjun Patel", role: "Co-founder, Orbit Fitness" },
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

// MOCK — replace with real values before launch
// All testimonials, clients, team members, prices, awards and metrics in
// this file are placeholder content for the demo. No real person or company
// has endorsed the studio; replace every entry with real values before launch.
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "They listened properly, challenged the brief where it needed challenging, and delivered an identity our customers actually remember. The launch survey numbers surprised even us.",
    name: "Rohan Kapoor",
    role: "Founder",
    company: "Aurora Outdoors",
  },
  {
    quote:
      "Our old site was beautiful and slow. The new one is beautiful and fast — bookings tripled, and the configurator finally works on a phone in a showroom.",
    name: "Meera Iyer",
    role: "Marketing Head",
    company: "Velocity Motors",
  },
  {
    quote:
      "One film did the work of an entire launch team. The campaign sold out in nine days, and we are still using the cut-downs months later.",
    name: "Ananya Desai",
    role: "Brand Lead",
    company: "Ember Beauty",
  },
  {
    quote:
      "Three offices, one brand, no arguments. The system is so clear that our own teams run it without calling the studio every week.",
    name: "Vikram Seth",
    role: "Director",
    company: "Northwind Studio",
  },
];

// MOCK — replace with real values before launch
export const CLIENTS: string[] = [
  "Aurora Outdoors",
  "Velocity Motors",
  "Ember Beauty",
  "Northwind Studio",
  "Lumen Living",
  "Orbit Fitness",
  "Halcyon Hotels",
  "Copper & Craft",
];

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  portrait: string;
  // Short visual descriptor the portrait was generated to match.
  descriptor: string;
};

// MOCK — replace with real values before launch
export const TEAM: TeamMember[] = [
  {
    name: "Arjun Mehta",
    role: "Founder & Creative Director",
    bio: "Sets the creative bar and directs every brand and film that leaves the studio.",
    portrait: "/images/team-arjun.jpg",
    descriptor: "Man, late 30s, short dark beard, black-rimmed glasses",
  },
  {
    name: "Priya Nair",
    role: "Head of Design",
    bio: "Leads identity and web design, from the first sketch to the final system.",
    portrait: "/images/team-priya.jpg",
    descriptor: "Woman, early 30s, long dark hair, no glasses",
  },
  {
    name: "Kabir Shah",
    role: "Motion & Film Lead",
    bio: "Directs reels, films and animation — the movement in Make Ideas Move.",
    portrait: "/images/team-kabir.jpg",
    descriptor: "Man, mid 20s, clean-shaven, curly dark hair",
  },
  {
    name: "Sara D'Souza",
    role: "Strategy & Production",
    bio: "Runs discovery, timelines and delivery, so the work lands on time.",
    portrait: "/images/team-sara.jpg",
    descriptor: "Woman, mid 40s, short grey-streaked hair, glasses",
  },
];

// MOCK — replace with real values before launch
export type FaqItem = { q: string; a: string };

export const FAQS: FaqItem[] = [
  {
    q: "How much does a project cost?",
    a: "Focused engagements typically start at ₹50,000. After a short Discover call we give you a fixed quote — no hourly surprises.",
  },
  {
    q: "How long does a project take?",
    a: "A focused branding, web or motion project usually takes 3–6 weeks. Larger, multi-service projects are scoped in phases with dates agreed up front.",
  },
  {
    q: "Who will I work with?",
    a: "Directly with the senior people making the work. No hand-offs to juniors, no chain of account managers.",
  },
  {
    q: "Do you work with startups?",
    a: "Yes — roughly half our work is with early-stage teams. If the idea is bold and the timeline is honest, we want to hear it.",
  },
  {
    q: "How many revision rounds are included?",
    a: "Two structured revision rounds per phase, with a review call each time. Extra rounds are possible and quoted in advance, so there are no surprise bills.",
  },
  {
    q: "Who owns the work when we are done?",
    a: "You do. On final payment, all finished files, source assets and guidelines are yours, with a licence to use them wherever your brand goes.",
  },
  {
    q: "Do you work remotely?",
    a: "Yes. Most projects run fully remote, with video workshops for Discover and reviews. On-site shoots and workshops are available where the work needs them.",
  },
  {
    q: "What do you need from us to start?",
    a: "One honest conversation and whatever you already have — a brief, a deck, a rough budget and a deadline. We handle the rest of the shaping in Discover week.",
  },
];

// MOCK — replace with real values before launch
export type EngagementModel = {
  title: string;
  description: string;
  bestFor: string;
};

export const ENGAGEMENT_MODELS: EngagementModel[] = [
  {
    title: "Project",
    description:
      "One defined piece of work — a brand, a website or a film — with a fixed scope, a fixed price and a fixed date. You know exactly what you are getting and when.",
    bestFor: "Best for: a launch, a rebrand or a single campaign.",
  },
  {
    title: "Retainer",
    description:
      "A set number of studio days each month, booked in advance. Design, web and motion on tap, with the same senior team every month and no hiring overhead.",
    bestFor: "Best for: brands shipping new work every month.",
  },
  {
    title: "Dedicated",
    description:
      "A small studio team reserved for you full-time for a fixed period. Daily stand-ups, shared tools and one backlog — like an in-house team, without the hiring.",
    bestFor: "Best for: a big launch or a multi-month programme.",
  },
];

export type ProcessStep = {
  weeks: string;
  title: string;
  happens: string;
  needsFromClient: string;
};

export const PROCESS_TIMELINE: ProcessStep[] = [
  {
    weeks: "Week 1",
    title: "Discover",
    happens:
      "A structured workshop and research: audience, competitors, constraints, and the one metric that will decide whether the project worked. No design happens here — and that is the point.",
    needsFromClient: "One 90-minute workshop, your goals, and honest answers to awkward questions.",
  },
  {
    weeks: "Week 2",
    title: "Define & Concept",
    happens:
      "We turn the workshop into a sharp creative direction — two or three concepts, each with a clear idea, a mood and a reason it will work for your audience.",
    needsFromClient: "One review call to pick a direction and say what does not feel right yet.",
  },
  {
    weeks: "Weeks 3–4",
    title: "Create",
    happens:
      "The chosen concept becomes real work: identity systems, website builds or filmed motion, shown early and often so nothing arrives as a surprise at the end.",
    needsFromClient: "Content, photos and approvals on schedule — we give you a simple checklist.",
  },
  {
    weeks: "Week 5",
    title: "Refine",
    happens:
      "Two structured revision rounds with a review call each time. We stress-test the work on real devices, real copy and real audiences before it goes live.",
    needsFromClient: "Consolidated feedback from one decision-maker, not five conflicting inboxes.",
  },
  {
    weeks: "Week 6",
    title: "Deliver & Launch",
    happens:
      "Final files, guidelines and training, then launch day with us on call. The site, the identity or the film goes live with everything it needs around it.",
    needsFromClient: "Final sign-off and access to your accounts, domains and channels.",
  },
  {
    weeks: "Week 7+",
    title: "Support",
    happens:
      "A month of support while the work meets the real world — small fixes, launch tweaks and a review of the numbers against the metric we set in Week 1.",
    needsFromClient: "Your launch numbers, so we can report honestly on what worked.",
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

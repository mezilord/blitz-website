/**
 * Blitz Creative — portfolio content.
 *
 * To add a project:
 *  1. Put its images in /public/work/<slug>/ (jpg/png/webp, ~1600px wide).
 *  2. Add an entry to `projects` below.
 *  3. Tag it with one or more `categories` so it shows under the right
 *     service card on the homepage.
 *
 * Anything with `placeholder: true` is sample content and should be
 * replaced (or deleted) before it goes live.
 */

export type ServiceKey = "brand" | "logo" | "web";

export type Service = {
  key: ServiceKey;
  title: string;
  delivery: string;
  description: string;
};

export const services: Service[] = [
  {
    key: "brand",
    title: "Brand Identity Design",
    delivery: "3–4 weeks delivery",
    description:
      "A complete visual identity — logo, colour, typography and guidelines — so your business looks consistent and recognisable everywhere it shows up.",
  },
  {
    key: "logo",
    title: "Logo Design",
    delivery: "1–2 weeks delivery",
    description:
      "A distinctive mark built around your story, delivered in every format you need for print, web and social.",
  },
  {
    key: "web",
    title: "Web Design (UI/UX)",
    delivery: "2–3 weeks delivery",
    description:
      "Fast, responsive websites designed around your customers and built to turn visitors into clients.",
  },
];

export type MediaItem =
  | { type: "image"; src: string; alt: string }
  | { type: "youtube"; id: string; title: string };

export type Project = {
  slug: string;
  title: string;
  client: string;
  year: string;
  services: string[];
  categories: ServiceKey[];
  /** One-line summary for cards. */
  summary: string;
  /** Paragraphs shown at the top of the case study. */
  intro: string[];
  /** Card / thumbnail image. */
  cover: string;
  /** Full-width media stack on the case-study page, top to bottom. */
  media: MediaItem[];
  /** Client's live website, opened in the Live demo overlay. */
  liveUrl?: string;
  /**
   * Some sites refuse to load inside another page (X-Frame-Options /
   * CSP frame-ancestors). Set to false for those — the overlay then shows
   * the cover image with a "Visit site" button instead.
   */
  embeddable?: boolean;
  placeholder?: boolean;
};

const img = (slug: string, file: string, alt: string): MediaItem => ({
  type: "image",
  src: `/work/${slug}/${file}`,
  alt,
});

export const projects: Project[] = [
  {
    slug: "bahrain-jazz-fest",
    title: "Bahrain Jazz Fest",
    client: "BNP Paribas Bahrain Jazz Fest",
    year: "2025",
    services: ["Web Design", "Development"],
    categories: ["web"],
    summary: "A festival website built to sell tickets and capture the energy of the day.",
    intro: [
      "Since 2017, the BNP Paribas Bahrain Jazz Fest has brought acclaimed international jazz and blues artists to the Kingdom. Heading into its 10th edition at the Royal Golf Club, the festival needed a website that could sell tickets, showcase the lineup and give visitors everything they need in one place.",
      "We designed and built a bold, poster-inspired site with a live countdown to festival day, the festival playlist and after-movie right on the homepage, and clear routes to tickets, the lineup, partners and visitor information.",
    ],
    cover: "/work/bahrain-jazz-fest/home.jpg",
    media: [
      img("bahrain-jazz-fest", "home.jpg", "Bahrain Jazz Fest homepage with festival countdown"),
      img("bahrain-jazz-fest", "festival.jpg", "Festival, Bahrain and gallery sections with partner logos"),
    ],
    liveUrl: "https://bahrainjazzfest.com/",
  },
  {
    slug: "prime-phones",
    title: "Prime Phones",
    client: "Prime Phones",
    year: "2026",
    services: ["Logo Design", "Web Design", "Development"],
    categories: ["web", "logo"],
    summary: "Logo and website for a Canadian device buyback service.",
    intro: [
      "Prime Phones buys used phones, tablets and other devices from people across Canada, with same-day pickup in the Greater Toronto Area and free shipping kits everywhere else. They came to us for a brand and a website that would make selling a device feel simple and trustworthy.",
      "We created an elegant serif wordmark and a warm, premium website built around one goal: getting an instant offer. A guided quote flow, a clear four-step process and straightforward answers to common questions take visitors from \u201cwhat\u2019s my phone worth?\u201d to a booked pickup in minutes.",
    ],
    cover: "/work/prime-phones/home.jpg",
    media: [
      img("prime-phones", "logo.jpg", "Prime Phones wordmark"),
      img("prime-phones", "home.jpg", "Prime Phones homepage"),
      img("prime-phones", "how-it-works.jpg", "Four-step how it works section"),
    ],
    liveUrl: "https://primephones.ca/",
  },
  {
    slug: "northerntech-solutions",
    title: "Northerntech Solutions",
    client: "Northern Tech Solutions",
    year: "2025",
    services: ["Logo Design", "Web Design", "Development"],
    categories: ["web", "logo"],
    summary: "Logo and website for an IT, cybersecurity and AI solutions firm.",
    intro: [
      "Northern Tech Solutions delivers managed IT, cybersecurity, cloud, AI-enabled CCTV and custom software for organisations across industrial sectors, with a track record on major projects in Saudi Arabia. They needed an identity and a website that matched the scale of that work.",
      "We designed a clean wordmark built around a guiding north star, and a deep-navy website with glowing, futuristic details. It presents their services, achievements and project highlights with the confidence of a much larger firm.",
    ],
    cover: "/work/northerntech-solutions/home.jpg",
    media: [
      img("northerntech-solutions", "logo.jpg", "Northern Tech Solutions logo"),
      img("northerntech-solutions", "home.jpg", "Northern Tech Solutions homepage"),
      img("northerntech-solutions", "services.jpg", "Services section"),
    ],
    liveUrl: "https://northerntech-solutions.com/",
  },
  {
    slug: "world-of-antiques",
    title: "World of Antiques",
    client: "WorldsOfAntiques.com",
    year: "2025",
    services: ["Web Design", "Development"],
    categories: ["web"],
    summary: "An online archive for a lifetime collection of coins, stamps, notes and antiques.",
    intro: [
      "What began as a single coin and a single stamp grew, over decades, into a collection spanning countries, cultures and eras. WorldsOfAntiques.com was created to preserve that collection and share the stories behind it with collectors, researchers and anyone who loves history.",
      "We designed a refined, museum-like website with elegant serif type and a dark, textured backdrop that lets each piece shine. The collection is organised into coins, notes, stamps, tokens, calling cards and antiques, each with its own gallery.",
    ],
    cover: "/work/world-of-antiques/home.jpg",
    media: [
      img("world-of-antiques", "home.jpg", "World of Antiques homepage"),
      img("world-of-antiques", "collection.jpg", "Collection categories"),
    ],
    liveUrl: "https://worldsofantiques.com/",
  },
  {
    slug: "black-stripe-burgers",
    title: "Black Stripe Burgers",
    client: "Black Stripe Gourmet Burgers",
    year: "2025",
    services: ["Web Design", "Development"],
    categories: ["web"],
    summary: "A bold website for a gourmet burger brand born in Bahrain.",
    intro: [
      "Black Stripe started in 2020 as a food truck at Bahrain\u2019s Financial Harbour and has grown into a gourmet burger brand with locations across Bahrain and Saudi Arabia, and plans to open in London. Their website needed to be as bold as their burgers.",
      "We built a dark, editorial site with rich food photography, playful retro touches and a full menu organised like a gig \u2014 from The Warm Up to The After Party Riders \u2014 along with their story, opening hours and job openings.",
    ],
    cover: "/work/black-stripe-burgers/home.jpg",
    media: [
      img("black-stripe-burgers", "home.jpg", "Black Stripe homepage"),
      img("black-stripe-burgers", "menu.jpg", "Menu section"),
    ],
    liveUrl: "https://blackstripeburgers.com/",
  },
];

/** Images shown inside each service card on the homepage (back, front). */
export const serviceShowcase: Record<ServiceKey, { back: string; front: string }> = {
  brand: {
    back: "/work/northerntech-solutions/logo-mark.jpg",
    front: "/work/prime-phones/logo.jpg",
  },
  logo: {
    back: "/work/northerntech-solutions/logo-mark.jpg",
    front: "/work/prime-phones/logo-portrait.jpg",
  },
  web: {
    back: "/work/bahrain-jazz-fest/home.jpg",
    front: "/work/black-stripe-burgers/home.jpg",
  },
};

export const liveProjects = projects.filter((p) => p.liveUrl);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function projectsFor(key: ServiceKey) {
  return projects.filter((p) => p.categories.includes(key));
}

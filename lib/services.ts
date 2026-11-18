import type { SceneKind } from "@/components/services/iso-scene";
import type { ServiceKey } from "@/lib/work";

export type ServicePage = {
  slug: string;
  name: string;
  /** Chess piece that stands for this service. */
  piece: string;
  /** One line connecting the piece to the service. */
  move: string;
  scene: SceneKind;
  headline: string;
  lead: string;
  metaDescription: string;
  price: { label: string; value: string };
  timeline?: { label: string; value: string };
  included: { id?: string; title: string; body: string }[];
  process: [string, string, string, string];
  faqs: { q: string; a: string }[];
  /** Which portfolio projects to show, if any. */
  work?: ServiceKey;
  workHeading?: string;
};

export const SITE_URL = "https://blitz-creative.com";

export const servicePages: ServicePage[] = [
  {
    slug: "web-mobile-development",
    name: "Web & Mobile Development",
    piece: "Rook",
    move: "The rook moves in straight lines and anchors the board. Good software should too.",
    scene: "web",
    headline: "Websites and apps built to hold their ground.",
    lead: "Fast, responsive websites, web apps and native mobile apps for iOS and Android, designed around your customers and built to keep working as you grow.",
    metaDescription:
      "Custom websites, web applications and iOS/Android apps by Blitz Creative. Single-page sites from $500, multi-page sites from $2,500.",
    price: { label: "Websites from", value: "$500" },
    timeline: { label: "Typical timeline", value: "1–3 weeks" },
    included: [
      { id: "websites", title: "Business websites", body: "Landing pages and multi-page sites that load fast, rank well and turn visitors into enquiries." },
      { id: "web-apps", title: "Web applications", body: "Dashboards, portals and booking systems built on modern, maintainable code." },
      { id: "mobile", title: "Mobile apps", body: "Cross-platform apps for iOS and Android, from first prototype to app store release." },
      { title: "Online stores", body: "E-commerce with secure checkout, product management and payment integrations." },
      { title: "Content you can edit", body: "A CMS set up so you can update text, images and pages without calling a developer." },
      { title: "Launch and care", body: "Hosting, analytics and SEO basics at launch, plus an optional maintenance plan from $200/month." },
    ],
    process: [
      "We map your goals, pages and features, then agree on scope, timeline and budget.",
      "Design and development happen in short rounds. You review a live staging link as it takes shape.",
      "We test on real phones and browsers, tune speed and SEO basics, and load your content.",
      "Your site goes live, with post-launch support to fix anything that comes up.",
    ],
    faqs: [
      { q: "How long does a website take?", a: "A single-page site usually takes about a week. Multi-page sites take two to three weeks, depending on content and features." },
      { q: "Do you use WordPress or custom code?", a: "Both. We recommend what fits how you'll run the site: WordPress, Shopify or Webflow if you'll edit content often, custom code when speed and flexibility matter most." },
      { q: "Can you redesign my existing website?", a: "Yes. We keep what's working, rebuild what isn't, and set up redirects so you don't lose your search rankings." },
      { q: "Will it work on phones?", a: "Every site we build is responsive and tested on phones, tablets and desktops before launch." },
    ],
    work: "web",
    workHeading: "Websites we've built",
  },
  {
    slug: "ai-solutions",
    name: "AI Solutions",
    piece: "Knight",
    move: "The knight is the only piece that jumps. Good automation skips the busywork the same way.",
    scene: "ai",
    headline: "AI that thinks a few moves ahead for your business.",
    lead: "Customer support agents, chatbots, AI-powered workflows and custom integrations that save your team time and help your customers faster.",
    metaDescription:
      "AI chat assistants, support agents, workflow automation and custom AI integrations for small and growing businesses, by Blitz Creative.",
    price: { label: "Pricing", value: "Custom quote" },
    included: [
      { title: "AI chat assistants", body: "Answer customer questions on your website or messaging channels, trained on your own content." },
      { title: "Support agents", body: "Sort incoming enquiries, book appointments and hand off to your team when a person is needed." },
      { title: "Workflow automation", body: "Connect your tools so data entry, follow-ups and reports run on their own." },
      { title: "Document and data tools", body: "Search, summarise and pull information out of your files, forms and spreadsheets." },
      { title: "Custom integrations", body: "Add AI features to your existing website, app or internal systems." },
      { title: "Training and handover", body: "Clear documentation and a walkthrough so your team knows how everything works." },
    ],
    process: [
      "We look at where your team loses time and pick the tasks where AI will make a measurable difference.",
      "We build a working prototype on your real content and test it with your team.",
      "We connect it to your tools, add safeguards and refine the answers until they're reliable.",
      "We launch, watch the results and keep improving it as your business changes.",
    ],
    faqs: [
      { q: "Is AI a good fit for my business?", a: "If your team answers the same questions, copies data between tools or spends hours on repeatable tasks, there's usually a good fit. If there isn't, we'll tell you on the call." },
      { q: "Is my data safe?", a: "We use providers with business data protections, keep access to what the tool needs, and sign an NDA before we start." },
      { q: "Do I need technical staff to run it?", a: "No. We handle setup and maintenance and show your team how to use and adjust it." },
      { q: "How much does it cost?", a: "Every AI project is quoted after a free call, because the cost depends on the tools, volume and integrations involved." },
    ],
  },
  {
    slug: "ux-ui-design",
    name: "UX/UI Design",
    piece: "Bishop",
    move: "The bishop covers the board on the diagonal. Good design looks at a product from every angle.",
    scene: "ux",
    headline: "Interfaces designed from every angle.",
    lead: "User-centred design that converts, from wireframes to polished interfaces, backed by research and proven design principles.",
    metaDescription:
      "UX research, wireframes, UI design systems and clickable prototypes for websites and apps, by Blitz Creative.",
    price: { label: "Pricing", value: "Custom quote" },
    included: [
      { title: "User research", body: "Interviews, analytics and competitor reviews to understand what your users need." },
      { title: "Wireframes and user flows", body: "The structure of every screen and the paths people take through them." },
      { title: "UI design", body: "Polished screens in your brand, with a reusable set of components, colours and type." },
      { title: "Clickable prototypes", body: "A prototype you can click through and share, so you can test before anything is built." },
      { title: "Usability testing", body: "Watch real people use the design and fix what trips them up." },
      { title: "Developer handoff", body: "Organised Figma files and specs, ready for our team or yours to build." },
    ],
    process: [
      "We learn who your users are, what they're trying to do and where they get stuck today.",
      "We sketch the structure in wireframes and agree on the flows before any visual design.",
      "We design the screens, build a clickable prototype and refine it with your feedback.",
      "We test with real users, make the final fixes and hand over build-ready files.",
    ],
    faqs: [
      { q: "Do you only design, or build too?", a: "Both. We can hand designs to your developers, or build them ourselves as part of a website or app project." },
      { q: "What tools do you use?", a: "We design in Figma, so you get editable files and a prototype link you can share with your team." },
      { q: "How many revisions are included?", a: "It depends on the package. Our Professional website package includes unlimited revisions; your proposal will say exactly what's included." },
      { q: "Can you improve an app we already have?", a: "Yes. We start with an audit of where users struggle, then prioritise the fixes with the biggest impact." },
    ],
    work: "web",
    workHeading: "Interfaces we've designed",
  },
  {
    slug: "digital-marketing",
    name: "Digital Marketing",
    piece: "Queen",
    move: "The queen moves in every direction. So should your marketing.",
    scene: "marketing",
    headline: "Marketing that reaches in every direction.",
    lead: "Grow your brand online with social media management, SEO, video editing, content creation and Google Business Profile management.",
    metaDescription:
      "Social media management, SEO, video editing, content creation and Google Business Profile management by Blitz Creative. Plans from $150.",
    price: { label: "Plans from", value: "$150" },
    included: [
      { id: "social", title: "Social media management", body: "Planning, design and posting for your channels, with monthly reporting. From $300/month." },
      { id: "seo", title: "SEO", body: "Technical fixes, on-page optimisation and content that help you rank for what customers search. From $400/month." },
      { id: "video", title: "Video editing", body: "Reels, ads and brand videos cut for each platform. From $150 per video." },
      { id: "content", title: "Content creation", body: "Graphics, captions and copy that keep your feed and website fresh." },
      { id: "google-business", title: "Google Business Profile", body: "Set up and manage your profile so you show up on Maps and in local search." },
      { title: "Monthly reporting", body: "A clear report on what's working and what we'll do next." },
    ],
    process: [
      "We audit your current channels and competitors, and set goals you can measure.",
      "We plan a content calendar and keyword strategy around your customers.",
      "We create, publish and optimise, adjusting as the results come in.",
      "Every month you get a report, and we double down on what's working.",
    ],
    faqs: [
      { q: "Which platforms do you work with?", a: "Instagram, TikTok, LinkedIn, Facebook, YouTube and Google. We focus on the channels where your customers already spend time." },
      { q: "How soon will I see results?", a: "Social media and Google Business Profile changes show up within weeks. SEO usually takes three to six months to build momentum." },
      { q: "Do I need to provide the content?", a: "No, but it helps. We can create graphics, edit video and write copy, or work from photos and footage you already have." },
      { q: "How do I know it's working?", a: "You get a monthly report with the numbers that matter for your goals, like reach, enquiries and search rankings." },
    ],
  },
  {
    slug: "brand-identity",
    name: "Brand Identity Design",
    piece: "King",
    move: "Every move on the board protects the king. Every touchpoint should protect your brand.",
    scene: "brand",
    headline: "A brand everything else can rally around.",
    lead: "Logo, colour, typography and guidelines that make your business look consistent and recognisable everywhere it shows up.",
    metaDescription:
      "Brand identity design: strategy, logo suite, colour, typography and brand guidelines. From $500, delivered in 3–4 weeks by Blitz Creative.",
    price: { label: "From", value: "$500" },
    timeline: { label: "Typical timeline", value: "3–4 weeks" },
    included: [
      { title: "Brand strategy", body: "Your positioning, audience and personality, agreed before any design starts." },
      { title: "Logo suite", body: "Primary logo, secondary versions and an icon for small spaces." },
      { title: "Colour and typography", body: "A palette and type system that work on screen and in print." },
      { title: "Brand guidelines", body: "A clear guide so anyone can use your brand correctly." },
      { title: "Templates", body: "Business cards, social media templates and an email signature." },
      { title: "Brand in use", body: "Mockups of signage, packaging or merchandise so you can see it in the real world." },
    ],
    process: [
      "A discovery session to understand your business, customers and competitors.",
      "We present distinct creative directions and you choose the one that fits.",
      "We refine the chosen direction and build out the full system.",
      "You receive your guidelines and every file, ready to use.",
    ],
    faqs: [
      { q: "What's the difference between a logo and a brand identity?", a: "A logo is one mark. A brand identity is the whole system around it, including colours, type, imagery and rules, so everything you put out looks like it belongs together." },
      { q: "What files will I get?", a: "Vector and high-resolution files for print and web (SVG, PDF, PNG and more), plus your brand guidelines." },
      { q: "Can you refresh an existing brand?", a: "Yes. We can modernise what you have while keeping the recognition you've built." },
      { q: "Do I own the final brand?", a: "Yes. Once the project is paid in full, you own the rights to the final brand assets." },
    ],
    work: "logo",
    workHeading: "Related work",
  },
  {
    slug: "logo-design",
    name: "Logo Design",
    piece: "Pawn",
    move: "A pawn that reaches the far side of the board is promoted. A good logo grows with you.",
    scene: "logo",
    headline: "A small mark that can become something big.",
    lead: "A distinctive logo built around your story, delivered in every format you need for print, web and social.",
    metaDescription:
      "Custom logo design from $200, delivered in 1–2 weeks with all the file formats you need, by Blitz Creative.",
    price: { label: "From", value: "$200" },
    timeline: { label: "Typical timeline", value: "1–2 weeks" },
    included: [
      { title: "Discovery brief", body: "A short questionnaire and call about your business, audience and taste." },
      { title: "Logo concepts", body: "Original concepts built around your story, not templates." },
      { title: "Revisions", body: "Rounds of refinement on your chosen concept, as set out in your proposal." },
      { title: "Logo variations", body: "Horizontal, stacked, icon-only and one-colour versions." },
      { title: "Every file format", body: "SVG, PDF, PNG and more, for print, web and social." },
      { title: "Usage sheet", body: "Your colours, spacing and do's and don'ts on one page." },
    ],
    process: [
      "You fill in a short brief and we talk through your business and audience.",
      "We sketch widely, then present the strongest concepts.",
      "We refine your favourite until every detail is right.",
      "You receive the final logo in every format you need.",
    ],
    faqs: [
      { q: "How long does a logo take?", a: "Usually one to two weeks from the brief to final files." },
      { q: "How many revisions do I get?", a: "Every logo project includes revision rounds. The exact number is confirmed in your proposal before we start." },
      { q: "Do I own the logo?", a: "Yes. Once the project is paid in full, you own the rights to the final logo." },
      { q: "Can I upgrade to a full brand identity later?", a: "Yes. Your logo becomes the starting point, and we build the colours, type and guidelines around it." },
    ],
    work: "logo",
    workHeading: "Logos we've designed",
  },
];

export function getServicePage(slug: string) {
  return servicePages.find((s) => s.slug === slug);
}

export const PROCESS_STAGES = ["Opening", "Middlegame", "Endgame", "Checkmate"] as const;

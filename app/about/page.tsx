import type { Metadata } from "next";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { CalFloatingButton } from "@/components/work/cal-floating";
import { IsoScene } from "@/components/services/iso-scene";
import { BookCallButton } from "@/components/services/book-call";
import { YourMove } from "@/components/services/your-move";
import { servicePages, SITE_URL } from "@/lib/services";
import { projects } from "@/lib/work";

export const metadata: Metadata = {
  title: "About — Blitz Creative",
  description:
    "Blitz Creative is a design and development studio working with businesses in Canada and Bahrain. Websites, apps, brands and AI tools built to help you grow.",
  alternates: { canonical: `${SITE_URL}/about/` },
};

const beliefs = [
  {
    title: "Strategy before pixels",
    body: "We start every project by understanding your business, your customers and what success looks like. Design and code come after the plan.",
  },
  {
    title: "Speed without shortcuts",
    body: "We work in short rounds and show progress early, so projects move fast without skipping the testing and care that make them last.",
  },
  {
    title: "Everything works together",
    body: "Your logo, website, social channels and tools should feel like one brand. We design each piece with the others in mind.",
  },
];

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <Navigation />
      <CalFloatingButton floating={false} />

      {/* Hero */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-32 lg:pt-40 pb-16 lg:pb-24">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-6">
            <p className="text-sm text-muted-foreground mb-8">About Blitz Creative</p>
            <h1 className="text-5xl sm:text-6xl xl:text-7xl font-display tracking-tight leading-[1.02]">
              Fast moves. Long&#8209;term thinking.
            </h1>
            <p className="mt-8 max-w-xl text-lg lg:text-xl text-muted-foreground leading-relaxed">
              Blitz Creative is a design and development studio working with
              businesses in Canada and Bahrain. We build websites, apps, brands
              and AI tools that help our clients grow.
            </p>
            <div className="mt-10">
              <BookCallButton />
            </div>
          </div>
          <figure className="lg:col-span-6">
            <IsoScene kind="about" className="w-full h-auto" />
          </figure>
        </div>
      </section>

      {/* Why Blitz */}
      <section className="border-t border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20 lg:py-28 grid lg:grid-cols-12 gap-10">
          <h2 className="lg:col-span-4 text-3xl lg:text-5xl font-display tracking-tight">
            Why &ldquo;Blitz&rdquo;
          </h2>
          <div className="lg:col-span-8 max-w-2xl space-y-6 text-lg lg:text-xl leading-relaxed text-muted-foreground">
            <p>
              <span className="text-foreground">
                In chess, blitz is the fast format: a few minutes on the clock
                for the whole game.
              </span>{" "}
              You can&apos;t win it on speed alone. You win by knowing what you
              want three moves from now, then moving quickly and with
              confidence.
            </p>
            <p>
              That&apos;s how we work. We plan carefully, decide quickly and
              keep your project moving, so you get to launch sooner without
              cutting corners.
            </p>
          </div>
        </div>
      </section>

      {/* Beliefs */}
      <section className="border-t border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20 lg:py-28">
          <h2 className="text-3xl lg:text-5xl font-display tracking-tight">
            How we work
          </h2>
          <div className="mt-14 grid md:grid-cols-3 gap-x-8 gap-y-12">
            {beliefs.map((b) => (
              <div key={b.title} className="border-t-2 border-foreground/80 pt-6">
                <h3 className="text-2xl font-display">{b.title}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Where + who */}
      <section className="border-t border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20 lg:py-28 grid lg:grid-cols-12 gap-10">
          <h2 className="lg:col-span-4 text-3xl lg:text-5xl font-display tracking-tight">
            Where we work
          </h2>
          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-10">
            <div>
              <h3 className="text-2xl font-display">Canada</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Based in Ontario, working with businesses like Prime Phones,
                a device buyback service across the Greater Toronto Area and
                Canada.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-display">Bahrain</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Working with brands like the Bahrain Jazz Fest and Black
                Stripe Burgers, and with clients across the Gulf.
              </p>
            </div>
            <p className="sm:col-span-2 text-muted-foreground">
              We also work remotely with clients anywhere else.
            </p>
          </div>
        </div>
      </section>

      {/* Clients + services */}
      <section className="border-t border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20 lg:py-28 grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-sm text-muted-foreground mb-6">Some of our clients</h2>
            <ul className="border-t border-foreground/10">
              {projects.map((p) => (
                <li key={p.slug} className="border-b border-foreground/10">
                  <a
                    href={`/work/${p.slug}/`}
                    className="flex items-baseline justify-between gap-6 py-5 text-xl font-display hover:text-brand-navy transition-colors"
                  >
                    {p.title}
                    <span className="text-sm font-sans text-muted-foreground">
                      {p.services[0]}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm text-muted-foreground mb-6">What we do</h2>
            <ul className="border-t border-foreground/10">
              {servicePages.map((s) => (
                <li key={s.slug} className="border-b border-foreground/10">
                  <a
                    href={`/services/${s.slug}/`}
                    className="flex items-baseline justify-between gap-6 py-5 text-xl font-display hover:text-brand-navy transition-colors"
                  >
                    {s.name}
                    <span className="text-sm font-sans text-muted-foreground">
                      {s.piece}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <YourMove />
      <FooterSection />
    </main>
  );
}

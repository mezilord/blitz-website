import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { CalFloatingButton } from "@/components/work/cal-floating";
import { ProjectCard } from "@/components/work/project-card";
import { IsoScene } from "@/components/services/iso-scene";
import { BookCallButton } from "@/components/services/book-call";
import { YourMove } from "@/components/services/your-move";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  PROCESS_STAGES,
  SITE_URL,
  getServicePage,
  servicePages,
} from "@/lib/services";
import { projectsFor } from "@/lib/work";

export const dynamicParams = false;

export function generateStaticParams() {
  return servicePages.map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = getServicePage(slug);
  if (!s) return {};
  const url = `${SITE_URL}/services/${s.slug}/`;
  return {
    title: `${s.name} — Blitz Creative`,
    description: s.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: `${s.name} — Blitz Creative`,
      description: s.metaDescription,
      url,
      siteName: "Blitz Creative",
      type: "website",
    },
  };
}

export default async function ServicePageRoute({ params }: Props) {
  const { slug } = await params;
  const s = getServicePage(slug);
  if (!s) notFound();

  const work = s.work ? projectsFor(s.work).slice(0, 3) : [];
  const others = servicePages.filter((o) => o.slug !== s.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    description: s.lead,
    url: `${SITE_URL}/services/${s.slug}/`,
    provider: {
      "@type": "Organization",
      name: "Blitz Creative",
      url: SITE_URL,
      email: "hello@blitz-creative.com",
    },
    areaServed: ["Canada", "Bahrain"],
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />
      <CalFloatingButton floating={false} />

      {/* Hero */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-32 lg:pt-40 pb-16 lg:pb-24">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-6">
            <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-8">
              <a href="/#services" className="hover:text-foreground transition-colors">
                Services
              </a>
              <span className="mx-2 text-foreground/30">/</span>
              <span className="text-foreground">{s.name}</span>
            </nav>
            <h1 className="text-5xl sm:text-6xl xl:text-7xl font-display tracking-tight leading-[1.02] text-balance">
              {s.headline}
            </h1>
            <p className="mt-8 max-w-xl text-lg lg:text-xl text-muted-foreground leading-relaxed">
              {s.lead}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <BookCallButton />
              {s.work && (
                <a
                  href="/work/"
                  className="inline-flex h-[52px] items-center rounded-full border border-foreground/15 px-7 text-base hover:bg-foreground/5 transition-colors"
                >
                  See our work
                </a>
              )}
            </div>
            <dl className={`mt-12 grid ${s.timeline ? "grid-cols-2" : "grid-cols-1"} max-w-md border-t border-foreground/10`}>
              <div className="pt-5 pr-6">
                <dt className="text-sm text-muted-foreground">{s.price.label}</dt>
                <dd className="mt-1 text-2xl font-display">{s.price.value}</dd>
              </div>
              {s.timeline && (
                <div className="pt-5 pl-6 border-l border-foreground/10">
                  <dt className="text-sm text-muted-foreground">{s.timeline.label}</dt>
                  <dd className="mt-1 text-2xl font-display">{s.timeline.value}</dd>
                </div>
              )}
            </dl>
          </div>

          <figure className="lg:col-span-6">
            <IsoScene kind={s.scene} className="w-full h-auto" />
            <figcaption className="mt-2 max-w-md mx-auto text-center text-sm text-muted-foreground leading-relaxed">
              {s.move}
            </figcaption>
          </figure>
        </div>
      </section>

      {/* What's included */}
      <section className="border-t border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20 lg:py-28 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <h2 className="text-3xl lg:text-5xl font-display tracking-tight lg:sticky lg:top-32">
              What&apos;s included
            </h2>
          </div>
          <dl className="lg:col-span-8">
            {s.included.map((item) => (
              <div
                key={item.title}
                id={item.id}
                className="grid sm:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] gap-2 sm:gap-10 py-7 border-b border-foreground/10 first:border-t scroll-mt-28"
              >
                <dt className="text-xl font-display">{item.title}</dt>
                <dd className="text-muted-foreground leading-relaxed">{item.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Process */}
      <section className="border-t border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20 lg:py-28">
          <h2 className="text-3xl lg:text-5xl font-display tracking-tight max-w-2xl">
            How a project moves
          </h2>
          <ol className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {s.process.map((step, i) => (
              <li key={i} className="border-t-2 border-foreground/80 pt-6">
                <span className="font-mono text-sm text-brand-orange">{i + 1}.</span>
                <h3 className="mt-2 text-2xl font-display">{PROCESS_STAGES[i]}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Related work */}
      {work.length > 0 && (
        <section className="border-t border-foreground/10">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20 lg:py-28">
            <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
              <h2 className="text-3xl lg:text-5xl font-display tracking-tight">
                {s.workHeading}
              </h2>
              <a
                href="/work/"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                All projects
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
              {work.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="border-t border-foreground/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20 lg:py-28 grid lg:grid-cols-12 gap-10">
          <h2 className="lg:col-span-4 text-3xl lg:text-5xl font-display tracking-tight">
            Questions
          </h2>
          <Accordion type="single" collapsible className="lg:col-span-8 border-t border-foreground/10">
            {s.faqs.map((f, i) => (
              <AccordionItem key={i} value={`q${i}`} className="border-foreground/10">
                <AccordionTrigger className="py-6 text-left text-lg lg:text-xl font-normal hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-base text-muted-foreground leading-relaxed max-w-2xl">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <YourMove />

      {/* Other services */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20">
        <h2 className="text-sm text-muted-foreground mb-6">Other services</h2>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-5 border-t border-foreground/10">
          {others.map((o) => (
            <li key={o.slug} className="border-b lg:border-b-0 lg:border-r last:border-r-0 border-foreground/10">
              <a
                href={`/services/${o.slug}/`}
                className="group flex h-full flex-col gap-1 py-6 lg:px-5 lg:first:pl-0 hover:bg-foreground/[0.02] transition-colors"
              >
                <span className="text-sm text-muted-foreground">{o.piece}</span>
                <span className="text-lg font-display group-hover:underline underline-offset-4">
                  {o.name}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <FooterSection />
    </main>
  );
}

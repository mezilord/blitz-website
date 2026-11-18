import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Navigation } from "@/components/landing/navigation";
import { CtaSection } from "@/components/landing/cta-section";
import { FooterSection } from "@/components/landing/footer-section";
import { ProjectCard } from "@/components/work/project-card";
import { LiveDemoButton } from "@/components/work/live-demo";
import { getProject, projects } from "@/lib/work";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Blitz Creative`,
    description: project.summary,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const others = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  const meta = [
    { label: "Client", value: project.client },
    { label: "Services", value: project.services.join(", ") },
    { label: "Year", value: project.year },
  ];

  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <Navigation />

      <article className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-36 lg:pt-44">
        <a
          href="/work/"
          className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-white px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all projects
        </a>

        {/* Title + intro */}
        <header className="mt-10">
          <h1 className="text-5xl lg:text-8xl font-display tracking-tight">
            {project.title}
          </h1>
          <div className="mt-8 max-w-4xl space-y-6">
            {project.intro.map((para, i) => (
              <p
                key={i}
                className="text-lg lg:text-xl text-muted-foreground leading-relaxed"
              >
                {para}
              </p>
            ))}
          </div>

          {/* Meta */}
          <dl className="mt-12 grid sm:grid-cols-3 border-t border-foreground/10">
            {meta.map((m, i) => (
              <div
                key={m.label}
                className={`py-6 sm:py-8 ${
                  i > 0
                    ? "border-t sm:border-t-0 sm:border-l border-foreground/10 sm:pl-8"
                    : ""
                }`}
              >
                <dt className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                  {m.label}
                </dt>
                <dd className="mt-2 text-lg">{m.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-4 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-brand-navy px-8 h-14 text-base text-white hover:bg-brand-navy/90 transition-colors"
            >
              Book a call
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            {project.liveUrl && (
              <LiveDemoButton
                slug={project.slug}
                className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-8 h-14 text-base hover:bg-foreground/5 transition-colors"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-brand-orange animate-pulse" />
                View live site
              </LiveDemoButton>
            )}
          </div>
        </header>

        {/* Media stack */}
        <div className="mt-16 lg:mt-24 overflow-hidden rounded-3xl">
          {project.media.map((m, i) =>
            m.type === "image" ? (
              <img
                key={i}
                src={m.src}
                alt={m.alt}
                loading={i < 2 ? "eager" : "lazy"}
                className="block w-full h-auto"
              />
            ) : (
              <div key={i} className="relative aspect-video bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${m.id}?autoplay=1&mute=1&loop=1&playlist=${m.id}&controls=0&modestbranding=1&playsinline=1&rel=0`}
                  title={m.title}
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            ),
          )}
        </div>

        {/* Other projects */}
        {others.length > 0 && (
          <section className="mt-24 lg:mt-32">
            <h2 className="text-3xl lg:text-5xl font-display tracking-tight mb-10 lg:mb-12">
              Other projects
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
              {others.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
            <div className="mt-10">
              <a
                href="/work/"
                className="inline-flex items-center gap-2 text-foreground font-medium hover:underline underline-offset-4"
              >
                View all projects
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </section>
        )}
      </article>

      <CtaSection />
      <FooterSection />
    </main>
  );
}

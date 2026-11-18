import type { ReactNode } from "react";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";

export type LegalSection = { heading: string; body: ReactNode };

export function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: ReactNode;
  sections: LegalSection[];
}) {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <Navigation />
      <article className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-32 lg:pt-40 pb-24 lg:pb-32 grid lg:grid-cols-12 gap-10">
        <header className="lg:col-span-4">
          <h1 className="text-4xl lg:text-6xl font-display tracking-tight lg:sticky lg:top-32">
            {title}
          </h1>
        </header>
        <div className="lg:col-span-8 max-w-[68ch]">
          <p className="text-sm text-muted-foreground">Last updated {updated}</p>
          <div className="mt-6 text-lg leading-relaxed text-foreground/85">{intro}</div>
          <div className="mt-12 space-y-12">
            {sections.map((s, i) => (
              <section key={s.heading} aria-labelledby={`s${i}`}>
                <h2 id={`s${i}`} className="text-2xl font-display tracking-tight">
                  {s.heading}
                </h2>
                <div className="mt-4 space-y-4 text-foreground/80 leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_a]:underline [&_a]:underline-offset-4">
                  {s.body}
                </div>
              </section>
            ))}
          </div>
        </div>
      </article>
      <FooterSection />
    </main>
  );
}

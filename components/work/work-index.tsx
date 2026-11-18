import { ArrowRight, GalleryHorizontal } from "lucide-react";
import { projects } from "@/lib/work";
import { ProjectCard } from "./project-card";

export function WorkIndex() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-36 lg:pt-44 pb-24 lg:pb-32">
      {/* Header */}
      <span className="inline-flex items-center gap-3 text-sm font-medium uppercase tracking-wider mb-6">
        <GalleryHorizontal className="h-5 w-5 stroke-[1.5]" />
        Work
        <span className="w-16 h-px bg-foreground/20" />
      </span>
      <h1 className="text-4xl lg:text-6xl font-display tracking-tight leading-[1.1]">
        Projects we&apos;re proud to have built.
        <br />
        <span className="text-muted-foreground">
          Websites and brands made to grow businesses.
        </span>
      </h1>

      <a
        href="#contact"
        className="group mt-10 inline-flex items-center gap-3 rounded-full bg-brand-navy pl-7 pr-2 py-2 text-base text-white shadow-[0_8px_24px_rgba(6,42,58,0.25)] transition-colors hover:bg-brand-navy/90"
      >
        Book Free Discovery Call
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30">
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </a>

      {/* Grid */}
      <div className="mt-16 lg:mt-24 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14 lg:gap-y-20">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </div>
  );
}

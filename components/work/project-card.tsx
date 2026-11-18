import { ArrowRight } from "lucide-react";
import type { Project } from "@/lib/work";
import { LiveDemoButton } from "./live-demo";

export function ProjectCard({ project }: { project: Project }) {
  const href = `/work/${project.slug}/`;
  return (
    <div className="group">
      {/* Framed image with soft shadow */}
      <div className="relative rounded-[28px] border border-foreground/10 bg-white p-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06),0_24px_48px_rgba(0,0,0,0.04)] transition-shadow duration-500 group-hover:shadow-[0_2px_4px_rgba(0,0,0,0.06),0_12px_32px_rgba(0,0,0,0.10),0_32px_64px_rgba(0,0,0,0.06)]">
        <a
          href={href}
          className="block aspect-[16/11] overflow-hidden rounded-[22px] bg-muted"
        >
          <img
            src={project.cover}
            alt={project.title}
            className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </a>
        {project.liveUrl && (
          <LiveDemoButton
            slug={project.slug}
            className="absolute top-4 right-4 inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur px-4 py-2 text-sm text-foreground shadow-sm hover:bg-white transition-colors"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-orange animate-pulse" />
            Live site
          </LiveDemoButton>
        )}
      </div>

      {/* Caption */}
      <div className="flex items-start justify-between gap-6 px-5 lg:px-6 pt-6">
        <a href={href} className="min-w-0">
          <h3 className="text-2xl font-display tracking-tight">
            {project.title}
          </h3>
          <p className="mt-2 text-base text-muted-foreground leading-relaxed">
            {project.services.join(", ")}
          </p>
        </a>
        <a
          href={href}
          className="mt-1.5 inline-flex shrink-0 items-center gap-2 text-base text-muted-foreground transition-colors hover:text-foreground"
        >
          View Project
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
}

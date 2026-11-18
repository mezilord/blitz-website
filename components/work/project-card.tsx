import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/work";
import { LiveDemoButton } from "./live-demo";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-foreground/10 bg-white">
      <a href={`/work/${project.slug}/`} className="block">
        <div className="aspect-[16/10] overflow-hidden bg-muted">
          <img
            src={project.cover}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </div>
        <div className="flex items-start justify-between gap-6 p-6 lg:p-8">
          <div>
            <h3 className="text-xl lg:text-2xl font-display tracking-tight">
              {project.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {project.services.join(", ")}
            </p>
          </div>
          <span className="flex items-center gap-3 shrink-0">
            <span className="text-xs font-mono text-muted-foreground">
              {project.year}
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/10 transition-colors group-hover:bg-brand-navy group-hover:border-brand-navy group-hover:text-white">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </span>
        </div>
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
  );
}

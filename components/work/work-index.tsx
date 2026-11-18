"use client";

import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { projects, services, type ServiceKey } from "@/lib/work";
import { ProjectCard } from "./project-card";

type Filter = "all" | ServiceKey;

const filters: { key: Filter; label: string }[] = [
  { key: "all", label: "All work" },
  ...services
    .filter((s) => projects.some((p) => p.categories.includes(s.key)))
    .map((s) => ({ key: s.key as Filter, label: s.title })),
];

function readHash(): Filter {
  if (typeof window === "undefined") return "all";
  const h = window.location.hash.replace("#", "");
  return (["brand", "logo", "web"] as string[]).includes(h)
    ? (h as Filter)
    : "all";
}

export function WorkIndex() {
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    setFilter(readHash());
    const onHash = () => setFilter(readHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const select = (key: Filter) => {
    setFilter(key);
    history.replaceState(null, "", key === "all" ? "/work/" : `/work/#${key}`);
  };

  const visible =
    filter === "all"
      ? projects
      : projects.filter((p) => p.categories.includes(filter));

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-36 lg:pt-44 pb-24 lg:pb-32">
      <a
        href="/"
        className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-white px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to home
      </a>

      <div className="mt-10 mb-12 lg:mb-16">
        <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
          <span className="w-8 h-px bg-brand-orange" />
          Our Work
        </span>
        <h1 className="text-5xl lg:text-7xl font-display tracking-tight">
          Selected work
        </h1>
      </div>

      <div className="flex flex-wrap gap-3 mb-12">
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => select(f.key)}
            className={`rounded-full border px-5 py-2.5 text-sm transition-colors ${
              filter === f.key
                ? "border-brand-navy bg-brand-navy text-white"
                : "border-foreground/10 bg-white text-muted-foreground hover:text-foreground"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {visible.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {visible.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">New projects coming soon.</p>
      )}
    </div>
  );
}

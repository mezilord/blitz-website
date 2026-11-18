"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Loader2 } from "lucide-react";
import { liveProjects } from "@/lib/work";

type Ctx = { open: (slug?: string) => void };
const LiveDemoContext = createContext<Ctx>({ open: () => {} });

export const useLiveDemo = () => useContext(LiveDemoContext);

/**
 * Full-screen "live demo" overlay: shows a client's real website inside the
 * page, with a top bar for switching between sites, visiting, or closing.
 */
export function LiveDemoProvider({ children }: { children: ReactNode }) {
  const [index, setIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const open = useCallback((slug?: string) => {
    if (liveProjects.length === 0) return;
    const i = slug ? liveProjects.findIndex((p) => p.slug === slug) : 0;
    setLoading(true);
    setIndex(i >= 0 ? i : 0);
  }, []);

  const close = useCallback(() => setIndex(null), []);

  const step = useCallback((dir: 1 | -1) => {
    setLoading(true);
    setIndex((i) =>
      i === null ? i : (i + dir + liveProjects.length) % liveProjects.length,
    );
  }, []);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [index, close, step]);

  const project = index === null ? null : liveProjects[index];
  const many = liveProjects.length > 1;
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <LiveDemoContext.Provider value={{ open }}>
      {children}

      {project && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} live demo`}
          onClick={close}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-navy/60 backdrop-blur-sm p-3 sm:p-6 animate-in fade-in duration-300"
        >
          {/* Browser window: ~70% of the screen on desktop */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex h-[88vh] w-full flex-col overflow-hidden rounded-2xl bg-brand-navy shadow-[0_24px_80px_rgba(0,0,0,0.45)] ring-1 ring-white/10 lg:h-[90vh] lg:w-[90vw] animate-in zoom-in-95 duration-300"
          >
            {/* Top bar */}
            <div className="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-white/10 px-4 lg:px-6 text-white">
              <div className="flex min-w-0 items-center gap-4">
                <span className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-white/60">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-orange animate-pulse" />
                  Live
                </span>
                <span className="truncate text-sm lg:text-base">
                  {project.title}
                </span>
                {many && (
                  <span className="hidden sm:inline text-xs font-mono text-white/40">
                    {pad(index! + 1)} / {pad(liveProjects.length)}
                  </span>
                )}
              </div>

              <div className="flex shrink-0 items-center gap-2">
                {many && (
                  <>
                    <button
                      type="button"
                      onClick={() => step(-1)}
                      aria-label="Previous site"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 hover:bg-white/10 transition-colors"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => step(1)}
                      aria-label="Next site"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 hover:bg-white/10 transition-colors"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </>
                )}
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex h-9 items-center gap-1.5 rounded-full border border-white/20 px-4 text-sm hover:bg-white/10 transition-colors"
                >
                  Visit
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
                <button
                  type="button"
                  onClick={close}
                  className="inline-flex h-9 items-center gap-2 rounded-full bg-background px-4 text-sm text-brand-navy hover:bg-white transition-colors"
                >
                  Close
                  <kbd className="hidden sm:inline rounded border border-brand-navy/20 px-1.5 text-[10px] font-mono">
                    Esc
                  </kbd>
                </button>
              </div>
            </div>

            {/* Site */}
            <div className="relative flex-1 bg-white">
              {project.embeddable === false ? (
                <div className="flex h-full flex-col items-center justify-center gap-6 bg-background p-6 text-center">
                  <img
                    src={project.cover}
                    alt={project.title}
                    className="max-h-[60%] max-w-full rounded-2xl border border-foreground/10 object-contain"
                  />
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center gap-2 rounded-full bg-brand-navy px-6 text-white"
                  >
                    Visit the live site
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              ) : (
                <>
                  {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background">
                      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    </div>
                  )}
                  <iframe
                    key={project.slug}
                    src={project.liveUrl}
                    title={`${project.title} — live site`}
                    onLoad={() => setLoading(false)}
                    className="h-full w-full border-0"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </LiveDemoContext.Provider>
  );
}

/** Button that opens the live demo for one project (or the first one). */
export function LiveDemoButton({
  slug,
  className,
  children,
}: {
  slug?: string;
  className?: string;
  children: ReactNode;
}) {
  const { open } = useLiveDemo();
  return (
    <button type="button" onClick={() => open(slug)} className={className}>
      {children}
    </button>
  );
}

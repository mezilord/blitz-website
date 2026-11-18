"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { CalEmbed } from "./cal-embed";

export function CtaSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative pt-12 pb-24 lg:pt-16 lg:pb-32 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        <div
          className={`relative z-10 border border-brand-navy transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          onMouseMove={handleMouseMove}
        >
          {/* Spotlight effect */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0,0,0,0.15), transparent 40%)`,
            }}
          />

          <div className="relative z-10 px-4 sm:px-8 lg:px-12 xl:px-16 py-12 lg:py-20">
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-12 xl:gap-16">
              {/* Left content */}
              <div className="flex-1 min-w-0">
                <h2 className="text-4xl lg:text-6xl xl:text-[clamp(3rem,4.1vw,4.5rem)] font-display tracking-tight mb-8 leading-[0.95]">
                  Ready to bring
                  <br />
                  your vision to life?
                </h2>

                <p className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-xl">
                  Let&apos;s discuss your project and create something amazing
                  together. Free consultation, no obligations.
                </p>

                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-brand-navy hover:bg-brand-navy/90 text-white px-8 h-14 text-base rounded-full group"
                  >
                    <a href="#book">
                      Get Your Free Quote
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="h-14 px-8 text-base rounded-full border-foreground/20 hover:bg-foreground/5"
                  >
                    <a href="#book">Schedule a Call</a>
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground mt-8 font-mono">
                  Response within 24 hours
                </p>
              </div>

              {/* Booking calendar */}
              <div
                id="book"
                className="w-full xl:w-[560px] shrink-0 scroll-mt-28 border border-foreground/10 bg-background"
              >
                <div className="flex items-center justify-between gap-4 px-4 sm:px-6 py-4 border-b border-foreground/10 whitespace-nowrap">
                  <span className="text-xs sm:text-sm font-mono text-muted-foreground">
                    Book a free call
                  </span>
                  <span className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                    30 min &middot; MS Teams
                  </span>
                </div>
                <div className="min-h-[480px]">
                  <CalEmbed />
                </div>
              </div>
            </div>
          </div>

          {/* Decorative corner */}
          <div className="absolute top-0 right-0 w-32 h-32 border-b border-l border-foreground/10" />
          <div className="absolute bottom-0 left-0 w-32 h-32 border-t border-r border-foreground/10" />
        </div>
      </div>
    </section>
  );
}

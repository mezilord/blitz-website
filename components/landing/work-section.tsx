"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Crop, Globe, Layers, PanelsTopLeft } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  liveProjects,
  services,
  serviceShowcase,
  type ServiceKey,
} from "@/lib/work";
import { LiveDemoButton } from "@/components/work/live-demo";

const icons: Record<ServiceKey, LucideIcon> = {
  brand: PanelsTopLeft,
  logo: Crop,
  web: Globe,
};

const viewWorkClass =
  "group/btn inline-flex items-center gap-3 rounded-full border border-foreground/10 bg-white pl-6 pr-1.5 py-1.5 text-base text-foreground shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-[0_2px_4px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.08)]";

function ViewWorkInner({ label = "View work" }: { label?: string }) {
  return (
    <>
      {label}
      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/10 transition-colors group-hover/btn:bg-brand-navy group-hover/btn:border-brand-navy group-hover/btn:text-white">
        <ArrowRight className="h-4 w-4" />
      </span>
    </>
  );
}

function ViewWorkButton({ serviceKey }: { serviceKey: ServiceKey }) {
  // Web design opens client sites live; brand & logo go to case studies.
  if (serviceKey === "web" && liveProjects.length > 0) {
    return (
      <LiveDemoButton className={viewWorkClass}>
        <ViewWorkInner label="View live work" />
      </LiveDemoButton>
    );
  }
  return (
    <a href="/work/" className={viewWorkClass}>
      <ViewWorkInner />
    </a>
  );
}

function CardHeader({ serviceKey }: { serviceKey: ServiceKey }) {
  const service = services.find((s) => s.key === serviceKey)!;
  const Icon = icons[serviceKey];
  return (
    <div className="p-8 lg:p-12 pb-0 lg:pb-0">
      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
        <h3 className="flex items-center gap-4 text-2xl lg:text-3xl font-display tracking-tight">
          <Icon className="h-7 w-7 shrink-0 stroke-[1.5]" />
          {service.title}
        </h3>
        <span className="pt-2 text-xs lg:text-sm font-mono uppercase tracking-wider text-muted-foreground whitespace-nowrap">
          {service.delivery}
        </span>
      </div>
      <p className="mt-6 text-lg text-muted-foreground leading-[1.8]">
        {service.description}
      </p>
      <div className="mt-8">
        <ViewWorkButton serviceKey={serviceKey} />
      </div>
    </div>
  );
}

const card =
  "relative flex flex-col overflow-hidden rounded-3xl border border-foreground/10 bg-white";

export function WorkSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const reveal = `transition-all duration-700 ${
    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
  }`;
  const delay = (ms: number) => ({ transitionDelay: `${ms}ms` });

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-16 lg:mb-24">
          <div className={reveal}>
            <span className="inline-flex items-center gap-3 text-sm font-medium uppercase tracking-wider mb-6">
              <Layers className="h-5 w-5 stroke-[1.5]" />
              Our Work
            </span>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-display tracking-tight leading-[1.1]">
              Results that speak volumes, across every touchpoint.
            </h2>
          </div>
          <p
            className={`text-lg lg:text-xl text-muted-foreground leading-[1.8] lg:pt-12 ${reveal}`}
            style={delay(100)}
          >
            From the first sketch of a logo to a full brand identity and the
            website that brings it to life, we design every piece to work
            together. Whether you&apos;re launching something new or refreshing
            what you have, here&apos;s the kind of work we deliver.
          </p>
        </div>

        {/* Cards */}
        <div className="grid lg:grid-cols-2 lg:grid-rows-[auto_1fr] gap-6 lg:gap-8">
          {/* Brand identity — tall, left */}
          <article className={`${card} lg:row-span-2 ${reveal}`} style={delay(150)}>
            <CardHeader serviceKey="brand" />
            <div className="relative mt-12 flex-1 min-h-[340px] sm:min-h-[420px] lg:min-h-[480px]">
              <img
                src={serviceShowcase.brand.front}
                alt="Prime Phones logo"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </article>

          {/* Logo design — short, top right */}
          <article className={`${card} ${reveal}`} style={delay(250)}>
            <CardHeader serviceKey="logo" />
            <div className="h-8 lg:h-12" />
          </article>

          {/* Web design — bottom right */}
          <article className={`${card} ${reveal}`} style={delay(350)}>
            <CardHeader serviceKey="web" />
            <div className="relative mt-10 h-[260px] sm:h-[320px] lg:h-auto lg:flex-1 lg:min-h-[340px]">
              <img
                src={serviceShowcase.web.back}
                alt=""
                className="absolute right-0 top-0 h-[85%] w-[62%] rounded-tl-lg object-cover object-top"
              />
              <img
                src={serviceShowcase.web.front}
                alt=""
                className="absolute left-8 lg:left-12 bottom-0 h-[72%] w-[68%] rounded-t-lg object-cover object-top shadow-[0_-8px_40px_rgba(0,0,0,0.18)]"
              />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

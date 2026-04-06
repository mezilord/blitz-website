"use client";

import { useEffect, useState, useRef } from "react";

const benefits = [
  { title: "Dedicated Team", detail: "Assigned project manager", icon: "team" },
  { title: "Fast Turnaround", detail: "Quick delivery times", icon: "speed" },
  { title: "Transparent Pricing", detail: "No hidden fees", icon: "price" },
  {
    title: "Revision Rounds",
    detail: "Until you're satisfied",
    icon: "revisions",
  },
  {
    title: "Ongoing Support",
    detail: "Post-launch assistance",
    icon: "support",
  },
  { title: "Quality Guarantee", detail: "100% satisfaction", icon: "quality" },
];

export function InfrastructureSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeLocation, setActiveLocation] = useState(0);
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

  // ✅ Fix: use benefits.length instead of undefined locations.length
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLocation((prev) => (prev + 1) % benefits.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Content */}
          <div
            className={`transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
          >
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="w-8 h-px bg-foreground/30" />
              Why Choose Us
            </span>
            <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-8">
              Your success is
              <br />
              our priority.
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-12">
              We're not just another agency. We're your creative partners,
              invested in delivering exceptional results that drive real
              business growth.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div>
                <div className="text-4xl lg:text-5xl font-display mb-2">5+</div>
                <div className="text-sm text-muted-foreground">
                  Years experience
                </div>
              </div>
              <div>
                <div className="text-4xl lg:text-5xl font-display mb-2">
                  100%
                </div>
                <div className="text-sm text-muted-foreground">
                  Delivery rate
                </div>
              </div>
              <div>
                <div className="text-4xl lg:text-5xl font-display mb-2">
                  24hr
                </div>
                <div className="text-sm text-muted-foreground">
                  Response time
                </div>
              </div>
            </div>
          </div>

          {/* Right: Benefits list */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
          >
            <div className="border border-foreground/10">
              {/* Header */}
              <div className="px-6 py-4 border-b border-foreground/10 flex items-center justify-between">
                <span className="text-sm font-mono text-muted-foreground">
                  What You Get
                </span>
                <span className="flex items-center gap-2 text-xs font-mono text-green-600">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Always included
                </span>
              </div>

              {/* Benefits */}
              <div>
                {benefits.map((benefit, index) => (
                  <div
                    key={benefit.title}
                    className={`px-6 py-5 border-b border-foreground/5 last:border-b-0 flex items-center justify-between transition-all duration-300 ${
                      activeLocation === index ? "bg-foreground/[0.02]" : ""
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                          activeLocation === index
                            ? "bg-foreground"
                            : "bg-foreground/20"
                        }`}
                      />
                      <div>
                        <div className="font-medium">{benefit.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {benefit.detail}
                        </div>
                      </div>
                    </div>
                    <span className="font-mono text-sm text-green-600">
                      Included
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

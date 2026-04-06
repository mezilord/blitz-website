"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "TechFlow SaaS Platform",
    category: "Web Development",
    description: "Complete redesign and development of a B2B SaaS dashboard with AI-powered analytics.",
    tags: ["Next.js", "TypeScript", "AI Integration"],
    image: "/portfolio/techflow.jpg",
  },
  {
    title: "FitLife Mobile App",
    category: "Mobile Development",
    description: "Cross-platform fitness app with personalized workout plans and progress tracking.",
    tags: ["React Native", "iOS", "Android"],
    image: "/portfolio/fitlife.jpg",
  },
  {
    title: "Luxe Realty Website",
    category: "Website Design",
    description: "Elegant real estate platform with virtual tours and advanced property search.",
    tags: ["UI/UX Design", "Web Development", "SEO"],
    image: "/portfolio/luxe.jpg",
  },
];

const stats = [
  { label: "Projects Delivered", value: "30+" },
  { label: "Happy Clients", value: "15+" },
  { label: "Industries Served", value: "10+" },
  { label: "Team Members", value: "8" },
];

export function DevelopersSection() {
  const [activeProject, setActiveProject] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-rotate projects
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProject((prev) => (prev + 1) % projects.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="portfolio" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Content */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
              <span className="w-8 h-px bg-foreground/30" />
              Our Work
            </span>
            <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-8">
              Results that
              <br />
              <span className="text-muted-foreground">speak volumes.</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              From startups to established brands, we've helped businesses 
              transform their digital presence and achieve measurable growth.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mb-12">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${index * 50 + 200}ms` }}
                >
                  <div className="text-3xl lg:text-4xl font-display mb-1">{stat.value}</div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a 
              href="#contact" 
              className="inline-flex items-center gap-2 text-foreground font-medium hover:underline underline-offset-4 group"
            >
              Start your project
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
          
          {/* Right: Project showcase */}
          <div
            className={`lg:sticky lg:top-32 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="border border-foreground/10">
              {/* Project tabs */}
              <div className="flex items-center border-b border-foreground/10">
                {projects.map((project, idx) => (
                  <button
                    key={project.title}
                    type="button"
                    onClick={() => setActiveProject(idx)}
                    className={`px-6 py-4 text-sm font-mono transition-colors relative ${
                      activeProject === idx
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {String(idx + 1).padStart(2, "0")}
                    {activeProject === idx && (
                      <span className="absolute bottom-0 left-0 right-0 h-px bg-foreground" />
                    )}
                  </button>
                ))}
                <div className="flex-1" />
                <a
                  href="#"
                  className="px-4 py-4 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="View project"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              
              {/* Project content */}
              <div className="p-8 bg-foreground/[0.01] min-h-[320px]">
                <div className="mb-6">
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                    {projects[activeProject].category}
                  </span>
                  <h3 className="text-2xl font-display mt-2 mb-3">
                    {projects[activeProject].title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {projects[activeProject].description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {projects[activeProject].tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1 text-xs font-mono border border-foreground/10 text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Project image placeholder */}
                <div className="aspect-video bg-foreground/5 border border-foreground/10 flex items-center justify-center">
                  <span className="text-sm text-muted-foreground font-mono">
                    Project Preview
                  </span>
                </div>
              </div>
            </div>
            
            {/* Links */}
            <div className="mt-6 flex items-center gap-6 text-sm">
              <a href="#contact" className="text-foreground hover:underline underline-offset-4">
                View all projects
              </a>
              <span className="text-foreground/20">|</span>
              <a href="#contact" className="text-muted-foreground hover:text-foreground">
                Request case studies
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

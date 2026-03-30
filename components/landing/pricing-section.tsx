"use client";

import { ArrowRight, Check } from "lucide-react";

const packages = [
  {
    name: "Starter",
    description: "Perfect for small businesses getting started",
    startingAt: "500",
    features: [
      "Single page website or landing page",
      "Mobile responsive design",
      "Basic SEO setup",
      "Contact form integration",
      "2 rounds of revisions",
      "1 week delivery",
    ],
    cta: "Get Started",
    popular: false,
    examples: "Landing pages, portfolios",
  },
  {
    name: "Professional",
    description: "For growing businesses needing more",
    startingAt: "2,500",
    features: [
      "Multi-page website (up to 10 pages)",
      "Custom UI/UX design",
      "Advanced SEO optimization",
      "CMS integration",
      "Social media setup",
      "Unlimited revisions",
      "2-3 weeks delivery",
      "30 days post-launch support",
    ],
    cta: "Most Popular",
    popular: true,
    examples: "Business sites, e-commerce",
  },
  {
    name: "Enterprise",
    description: "Full-service for ambitious projects",
    startingAt: null,
    features: [
      "Everything in Professional",
      "Custom web/mobile app development",
      "AI integration & chatbots",
      "API development",
      "Dedicated project manager",
      "Ongoing maintenance",
      "Priority support",
      "Custom timeline",
    ],
    cta: "Let's Talk",
    popular: false,
    examples: "Apps, AI solutions, platforms",
  },
];

const addOns = [
  { name: "Logo Design", price: "From $200" },
  { name: "Brand Identity", price: "From $500" },
  { name: "Social Media Package", price: "From $300/mo" },
  { name: "SEO Monthly", price: "From $400/mo" },
  { name: "Video Editing", price: "From $150/video" },
  { name: "Maintenance Plan", price: "From $200/mo" },
];

export function PricingSection() {
  return (
    <section id="pricing" className="relative py-32 lg:py-40 border-t border-foreground/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase block mb-6">
            Pricing
          </span>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl tracking-tight text-foreground mb-6">
            Flexible packages
            <br />
            <span className="text-stroke">for every need</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl">
            Transparent pricing with no hidden fees. Every project is unique, 
            so we&apos;ll provide a custom quote after understanding your needs.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-px bg-foreground/10 mb-16">
          {packages.map((pkg, idx) => (
            <div
              key={pkg.name}
              className={`relative p-8 lg:p-12 bg-background ${
                pkg.popular ? "md:-my-4 md:py-12 lg:py-16 border-2 border-foreground" : ""
              }`}
            >
              {pkg.popular && (
                <span className="absolute -top-3 left-8 px-3 py-1 bg-foreground text-primary-foreground text-xs font-mono uppercase tracking-widest">
                  Most Popular
                </span>
              )}

              {/* Package Header */}
              <div className="mb-8">
                <span className="font-mono text-xs text-muted-foreground">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-3xl text-foreground mt-2">{pkg.name}</h3>
                <p className="text-sm text-muted-foreground mt-2">{pkg.description}</p>
              </div>

              {/* Price */}
              <div className="mb-8 pb-8 border-b border-foreground/10">
                {pkg.startingAt !== null ? (
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm text-muted-foreground">Starting at</span>
                    <span className="font-display text-5xl lg:text-6xl text-foreground">
                      ${pkg.startingAt}
                    </span>
                  </div>
                ) : (
                  <span className="font-display text-4xl text-foreground">Custom Quote</span>
                )}
                <p className="text-xs text-muted-foreground mt-2 font-mono">
                  {pkg.examples}
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-10">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-foreground mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#contact"
                className={`w-full py-4 flex items-center justify-center gap-2 text-sm font-medium transition-all group ${
                  pkg.popular
                    ? "bg-foreground text-primary-foreground hover:bg-foreground/90"
                    : "border border-foreground/20 text-foreground hover:border-foreground hover:bg-foreground/5"
                }`}
              >
                {pkg.cta}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          ))}
        </div>

        {/* Add-ons */}
        <div className="border border-foreground/10 p-8 lg:p-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-8">
            <div>
              <h3 className="font-display text-2xl text-foreground mb-2">Add-on Services</h3>
              <p className="text-muted-foreground">Enhance your project with these extras</p>
            </div>
            <a 
              href="#contact" 
              className="text-sm text-foreground hover:underline underline-offset-4 flex items-center gap-2 group"
            >
              Request custom quote
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {addOns.map((addon) => (
              <div 
                key={addon.name}
                className="flex items-center justify-between p-4 border border-foreground/10 hover:border-foreground/20 transition-colors"
              >
                <span className="text-sm text-foreground">{addon.name}</span>
                <span className="text-sm font-mono text-muted-foreground">{addon.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Note */}
        <p className="mt-12 text-center text-sm text-muted-foreground">
          All projects include free consultation and detailed proposal.{" "}
          <a href="#contact" className="underline underline-offset-4 hover:text-foreground transition-colors">
            Get in touch to discuss your project
          </a>
        </p>
      </div>
    </section>
  );
}

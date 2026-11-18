"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { AnimatedWave } from "./animated-wave";

const footerLinks = {
  Services: [
    { name: "Web & Mobile Development", href: "/services/web-mobile-development/" },
    { name: "AI Solutions", href: "/services/ai-solutions/" },
    { name: "UX/UI Design", href: "/services/ux-ui-design/" },
    { name: "Brand Identity", href: "/services/brand-identity/" },
    { name: "Logo Design", href: "/services/logo-design/" },
  ],
  Marketing: [
    { name: "Social Media", href: "/services/digital-marketing/#social" },
    { name: "SEO", href: "/services/digital-marketing/#seo" },
    { name: "Video Editing", href: "/services/digital-marketing/#video" },
    { name: "Google Business Profile", href: "/services/digital-marketing/#google-business" },
  ],
  Company: [
    { name: "About Us", href: "/about/" },
    { name: "Our Work", href: "/work/" },
    { name: "Process", href: "/#process" },
    { name: "Contact", href: "/#contact" },
  ],
  Legal: [
    { name: "Privacy Policy", href: "/privacy/" },
    { name: "Terms of Service", href: "/terms/" },
    { name: "Our Guarantee", href: "/guarantee/" },
  ],
};

const socialLinks = [
  { name: "LinkedIn", href: "https://linkedin.com/company/blitzcreativ" },
  { name: "Instagram", href: "https://www.instagram.com/blitzcreativ" },
  { name: "TikTok", href: "https://www.tiktok.com/@blitzcreativ" },
];

export function FooterSection() {
  return (
    <footer className="relative border-t border-foreground/10">
      {/* Animated wave background */}
      <div className="absolute inset-0 h-64 opacity-20 pointer-events-none overflow-hidden">
        <AnimatedWave />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Main Footer */}
        <div className="py-16 lg:py-24">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="col-span-2">
              <a
                href="/"
                className="inline-flex items-center justify-start gap-2 mb-6 text-left"
              >
                <img
                  alt="Blitz Creative Logo"
                  src="/logo.svg"
                  width={150}
                  height={101}
                  className="h-auto w-[150px]"
                />
              </a>

              <p className="text-muted-foreground leading-relaxed mb-8 max-w-xs">
                Your full-service design and development studio. We bring your
                vision to life with exceptional quality.
              </p>

              <a
                href="mailto:hello@blitz-creative.com"
                className="inline-block mb-8 text-foreground underline decoration-foreground/20 underline-offset-4 hover:decoration-brand-orange transition-colors"
              >
                hello@blitz-creative.com
              </a>

              {/* Social Links */}
              <div className="flex gap-6">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-sm font-medium mb-6">{title}</h3>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Blitz Creative. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-orange" />
              Available for new projects
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

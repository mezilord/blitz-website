import type { Metadata } from "next";
import { Navigation } from "@/components/landing/navigation";
import { CtaSection } from "@/components/landing/cta-section";
import { FooterSection } from "@/components/landing/footer-section";
import { WorkIndex } from "@/components/work/work-index";

export const metadata: Metadata = {
  title: "Our Work — Blitz Creative",
  description:
    "Brand identities, logos and websites designed and built by Blitz Creative.",
};

export default function WorkPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <Navigation />
      <WorkIndex />
      <CtaSection />
      <FooterSection />
    </main>
  );
}

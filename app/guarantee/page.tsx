import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { SITE_URL } from "@/lib/services";

export const metadata: Metadata = {
  title: "Our Guarantee — Blitz Creative",
  description:
    "What Blitz Creative guarantees on every project: delivery, revisions, ownership, confidentiality and support.",
  alternates: { canonical: `${SITE_URL}/guarantee/` },
};

const EMAIL = "hello@blitz-creative.com";

export default function GuaranteePage() {
  return (
    <LegalPage
      title="Our Guarantee"
      updated="November 18, 2026"
      intro={
        <p>
          We want you to feel confident hiring us. These are the promises we
          make on every project, and how they work in practice.
        </p>
      }
      sections={[
        {
          heading: "We finish what we start",
          body: (
            <p>
              We don&apos;t stop until the work in your proposal is complete
              and you&apos;re happy with it. If something isn&apos;t right,
              tell us and we&apos;ll fix it.
            </p>
          ),
        },
        {
          heading: "On-time delivery",
          body: (
            <p>
              Your proposal includes a timeline, and we plan our work to meet
              it. If anything puts a deadline at risk, we&apos;ll tell you as
              soon as we know and agree a new plan with you. Timelines depend
              on receiving content and feedback on schedule.
            </p>
          ),
        },
        {
          heading: "Revisions",
          body: (
            <p>
              Every project includes revision rounds. Our Starter website
              package includes two rounds, and our Professional package
              includes unlimited revisions within the agreed scope. Your
              proposal confirms what&apos;s included for your project.
            </p>
          ),
        },
        {
          heading: "Money-back guarantee",
          body: (
            <p>
              If you&apos;re not happy with our first designs, tell us before
              you approve them. We&apos;ll revise them, and if we still
              can&apos;t get it right, you can cancel the project and we&apos;ll
              refund what you&apos;ve paid for work you haven&apos;t approved,
              less any third-party costs already incurred on your behalf.
            </p>
          ),
        },
        {
          heading: "You own your work",
          body: (
            <p>
              Once your project is paid in full, you own the final deliverables
              we create for you. See our Terms of Service for details.
            </p>
          ),
        },
        {
          heading: "Confidentiality",
          body: (
            <p>
              Your ideas and data stay private. We&apos;ll sign a
              non-disclosure agreement before we start if you&apos;d like one.
            </p>
          ),
        },
        {
          heading: "Support after launch",
          body: (
            <p>
              Website projects include post-launch support, with 30 days on
              our Professional package. Ongoing maintenance plans are
              available from $200 per month.
            </p>
          ),
        },
        {
          heading: "Questions",
          body: (
            <p>
              Email <a href={`mailto:${EMAIL}`}>{EMAIL}</a> and we&apos;ll get
              back to you within 24 hours.
            </p>
          ),
        },
      ]}
    />
  );
}

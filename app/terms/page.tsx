import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { SITE_URL } from "@/lib/services";

export const metadata: Metadata = {
  title: "Terms of Service — Blitz Creative",
  description: "The terms that apply to Blitz Creative's website and services.",
  alternates: { canonical: `${SITE_URL}/terms/` },
};

const EMAIL = "hello@blitz-creative.com";

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="November 18, 2026"
      intro={
        <p>
          These terms apply to your use of blitz-creative.com and to the
          design, development, marketing and AI services provided by Blitz
          Creative (&ldquo;we&rdquo;, &ldquo;us&rdquo;). If your project has a
          signed proposal or agreement, that document takes priority where it
          differs from these terms.
        </p>
      }
      sections={[
        {
          heading: "Proposals and scope",
          body: (
            <p>
              Every project starts with a written proposal that sets out the
              scope, deliverables, timeline and price. Work outside that scope
              is quoted separately before we start it. Prices on our website
              are starting prices; your proposal confirms the final price.
            </p>
          ),
        },
        {
          heading: "Payments",
          body: (
            <p>
              Payment terms, including any deposit, are set out in your
              proposal and invoices, in the currency stated there. If an invoice
              is overdue, we may pause work until it&apos;s paid. Monthly
              services are billed in advance unless agreed otherwise.
            </p>
          ),
        },
        {
          heading: "Your responsibilities",
          body: (
            <ul>
              <li>Provide content, access and feedback on time so we can keep to the schedule.</li>
              <li>Make sure you have the rights to any text, images, logos or other materials you give us.</li>
              <li>Review and approve deliverables at each stage.</li>
            </ul>
          ),
        },
        {
          heading: "Revisions",
          body: (
            <p>
              Each package includes revision rounds as described on our website
              and in your proposal. For example, our Starter website package
              includes two rounds of revisions and our Professional package
              includes unlimited revisions within the agreed scope.
            </p>
          ),
        },
        {
          heading: "Ownership",
          body: (
            <>
              <p>
                Once your project is paid in full, you own the final
                deliverables we create for you, such as your logo, designs and
                website code written specifically for your project.
              </p>
              <p>
                We keep ownership of our pre-existing tools, code libraries and
                know-how, and grant you a licence to use them as part of your
                project. Third-party items such as fonts, stock images and
                plugins are covered by their own licences.
              </p>
              <p>
                Unless you ask us not to or we&apos;ve signed an NDA, we may show
                completed work in our portfolio and marketing.
              </p>
            </>
          ),
        },
        {
          heading: "Confidentiality",
          body: (
            <p>
              We keep your business information confidential and will sign a
              non-disclosure agreement on request.
            </p>
          ),
        },
        {
          heading: "Third-party services",
          body: (
            <p>
              Hosting, domains, plugins, payment processors, AI providers and
              other third-party services used in your project are subject to
              their own terms and pricing. We&apos;re not responsible for their
              outages or changes, but we&apos;ll help you work around them.
            </p>
          ),
        },
        {
          heading: "Liability",
          body: (
            <p>
              We provide our services with reasonable skill and care. To the
              extent the law allows, our total liability for any project is
              limited to the amount you paid us for that project, and we
              aren&apos;t liable for indirect or consequential losses such as
              lost profits or data.
            </p>
          ),
        },
        {
          heading: "Ending a project",
          body: (
            <p>
              Either of us can end a project with written notice. You&apos;ll
              pay for work completed up to that point, and we&apos;ll hand over
              everything that&apos;s been paid for.
            </p>
          ),
        },
        {
          heading: "Using this website",
          body: (
            <p>
              The content on this website belongs to Blitz Creative unless
              stated otherwise. Client websites shown in our live previews
              belong to their owners and are shown as examples of our work.
            </p>
          ),
        },
        {
          heading: "Governing law",
          body: (
            <p>
              These terms are governed by the laws of the Province of Ontario
              and the federal laws of Canada that apply there.
            </p>
          ),
        },
        {
          heading: "Contact",
          body: (
            <p>
              Questions about these terms? Email{" "}
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
            </p>
          ),
        },
      ]}
    />
  );
}

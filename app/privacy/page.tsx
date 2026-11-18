import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { SITE_URL } from "@/lib/services";

export const metadata: Metadata = {
  title: "Privacy Policy — Blitz Creative",
  description: "How Blitz Creative collects, uses and protects your personal information.",
  alternates: { canonical: `${SITE_URL}/privacy/` },
};

const EMAIL = "hello@blitz-creative.com";

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="November 18, 2026"
      intro={
        <p>
          Blitz Creative (&ldquo;we&rdquo;, &ldquo;us&rdquo;) is a design and
          development studio working with clients in Canada and Bahrain. This
          policy explains what personal information we collect through
          blitz-creative.com and our services, how we use it, and the choices
          you have.
        </p>
      }
      sections={[
        {
          heading: "Information we collect",
          body: (
            <>
              <p>We only collect what we need to talk with you and deliver your project:</p>
              <ul>
                <li>
                  <strong>Contact details</strong> you give us when you book a
                  call or email us, such as your name, email address, phone
                  number and company.
                </li>
                <li>
                  <strong>Project information</strong> you share with us, such
                  as briefs, content, files and feedback.
                </li>
                <li>
                  <strong>Billing information</strong> needed to invoice you.
                  Card payments are handled by our payment provider; we don&apos;t
                  store card numbers.
                </li>
                <li>
                  <strong>Technical information</strong> such as your browser
                  type, device and pages visited, which our hosting provider
                  may record in standard server logs.
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: "How we use it",
          body: (
            <ul>
              <li>To reply to your enquiries and schedule calls.</li>
              <li>To plan, deliver and support your project.</li>
              <li>To send invoices and keep business records.</li>
              <li>To keep our website secure and working properly.</li>
              <li>To meet our legal and tax obligations.</li>
            </ul>
          ),
        },
        {
          heading: "We don't sell your information",
          body: (
            <p>
              We never sell or rent your personal information. We share it
              only with the service providers below, when needed to run our
              business, or when the law requires it.
            </p>
          ),
        },
        {
          heading: "Service providers",
          body: (
            <>
              <p>We use trusted providers to run the website and our studio, including:</p>
              <ul>
                <li>Cal.com, to schedule calls you book through our website.</li>
                <li>Our web hosting and email providers.</li>
                <li>Payment and accounting providers, for invoices and payments.</li>
                <li>
                  Design, development and AI tools used to deliver your project,
                  where relevant.
                </li>
              </ul>
              <p>
                These providers may process information in Canada, Bahrain and
                other countries, and are expected to protect it to a standard
                consistent with this policy.
              </p>
            </>
          ),
        },
        {
          heading: "Cookies and embedded content",
          body: (
            <p>
              Our website does not use advertising cookies. Some pages include
              content from other sites, such as the Cal.com booking calendar and
              live previews of our clients&apos; websites. Those sites may set
              their own cookies, which are covered by their own privacy
              policies.
            </p>
          ),
        },
        {
          heading: "How long we keep it",
          body: (
            <p>
              We keep personal information only as long as we need it for the
              purposes above, including any period required for accounting or
              legal reasons, and then delete or anonymise it.
            </p>
          ),
        },
        {
          heading: "Your rights",
          body: (
            <>
              <p>
                Depending on where you live, including under Canada&apos;s
                Personal Information Protection and Electronic Documents Act
                (PIPEDA) and Bahrain&apos;s Personal Data Protection Law, you can:
              </p>
              <ul>
                <li>Ask what personal information we hold about you.</li>
                <li>Ask us to correct or delete it.</li>
                <li>Withdraw your consent to how we use it.</li>
                <li>Complain to your local privacy regulator.</li>
              </ul>
              <p>
                To make a request, email{" "}
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. We&apos;ll reply within
                30 days.
              </p>
            </>
          ),
        },
        {
          heading: "Security",
          body: (
            <p>
              We use reasonable technical and organisational measures to protect
              your information, and we sign NDAs with clients on request. No
              system is completely secure, so please avoid sending highly
              sensitive information by email.
            </p>
          ),
        },
        {
          heading: "Changes to this policy",
          body: (
            <p>
              If we change this policy, we&apos;ll update the date at the top of
              this page. Significant changes will be highlighted on the website.
            </p>
          ),
        },
        {
          heading: "Contact",
          body: (
            <p>
              Questions about privacy? Email{" "}
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
            </p>
          ),
        },
      ]}
    />
  );
}

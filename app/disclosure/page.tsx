import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate Disclosure — DevEx Tools Team",
  description:
    "DevEx Tools Team's affiliate disclosure policy. Learn how we may earn commissions through partner links on our site.",
};

export default function DisclosurePage() {
  return (
    <div className="relative pt-32 pb-20 px-6">
      <div className="max-w-[800px] mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#3B82F6] bg-[#162440] px-3 py-1.5 rounded-md mb-4">
            Legal
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#F0F4F8] tracking-tight mb-3">
            Affiliate Disclosure
          </h1>
          <p className="text-[#8BA3BE] text-sm">
            Last updated: May 21, 2026
          </p>
        </div>

        <div className="space-y-6 text-[#8BA3BE] leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-[#F0F4F8] mb-3">Transparency First</h2>
            <p>
              DevEx Tools Team is committed to transparency. This Affiliate Disclosure
              explains how we may earn compensation through links on our website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#F0F4F8] mb-3">Affiliate Links</h2>
            <p>
              Some of the links on DevEx Tools Team are affiliate links. This means that
              if you click on a link and make a purchase or sign up for a service, we may
              receive a commission at no additional cost to you.
            </p>
            <p className="mt-3">
              These commissions help us maintain and improve our platform, including the
              research and content creation required to provide accurate, up-to-date tool
              comparisons.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#F0F4F8] mb-3">No Impact on Rankings</h2>
            <p>
              Our tool listings, ratings, and recommendations are never influenced by
              affiliate relationships. We evaluate tools based on publicly available
              information, user reviews, and feature comparisons — not sponsorship dollars.
              If a tool is featured on our site, it is because we believe it provides
              genuine value to our users, regardless of any affiliate relationship.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#F0F4F8] mb-3">Partners</h2>
            <p>
              We may participate in affiliate programs including but not limited to:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Amazon Associates</li>
              <li>PartnerStack</li>
              <li>Impact Radius</li>
              <li>Individual SaaS vendor referral programs</li>
            </ul>
            <p className="mt-3">
              This list may change over time as we add or remove affiliate partnerships.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#F0F4F8] mb-3">Questions</h2>
            <p>
              If you have any questions about our affiliate relationships or this
              disclosure, please contact us at{" "}
              <a href="mailto:info@devex-tools.net" className="text-[#3B82F6] hover:underline">
                info@devex-tools.net
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

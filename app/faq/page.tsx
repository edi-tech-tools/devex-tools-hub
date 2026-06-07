"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is B2B SaaS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "B2B SaaS (Business-to-Business Software as a Service) refers to cloud-based software solutions that businesses subscribe to and use to support their operations. Unlike traditional software that requires on-premise installation, B2B SaaS is hosted by the provider and accessed via a web browser. Examples include Salesforce (CRM), HubSpot (Marketing), Slack (Communication), and Asana (Project Management).",
      },
    },
    {
      "@type": "Question",
      name: "How do you choose the right SaaS tool for your business?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Choosing the right SaaS tool involves defining your requirements, budgeting, evaluating features, reading verified user reviews from platforms like G2 and Capterra, considering integration capabilities, testing with free trials or demos, and assessing vendor support and scalability. Always prioritize tools that solve your specific pain points rather than getting distracted by feature bloat.",
      },
    },
    {
      "@type": "Question",
      name: "What's the difference between B2B and B2C SaaS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "B2B SaaS targets business customers and focuses on features like team collaboration, admin controls, security compliance, and ROI tracking. B2C SaaS targets individual consumers and prioritizes user experience, ease of use, and personal productivity. B2B products typically have higher price points, longer sales cycles, and require onboarding support, while B2C products are often self-serve with lower monthly fees.",
      },
    },
    {
      "@type": "Question",
      name: "How much should a small business spend on SaaS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A common benchmark is that small businesses spend 3–10% of their annual revenue on SaaS subscriptions. For a company with $500K in revenue, that translates to roughly $15K–$50K per year. However, this varies by industry — tech startups often spend more, while traditional service businesses spend less. The key is to track SaaS usage regularly and eliminate underutilized subscriptions.",
      },
    },
    {
      "@type": "Question",
      name: "What are the most popular B2B SaaS categories?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The most popular B2B SaaS categories include CRM (Customer Relationship Management), Marketing Automation, Project Management, Human Resources (HRIS), Accounting & Finance, Customer Support (Help Desk), Communication & Collaboration, Analytics & Business Intelligence, Cybersecurity, and DevOps tools. Each category has dozens of competing platforms with varying feature sets and pricing models.",
      },
    },
    {
      "@type": "Question",
      name: "What is SaaS churn and why does it matter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SaaS churn refers to the percentage of customers who cancel their subscriptions over a given period. It's a critical metric because acquiring new customers costs 5–7x more than retaining existing ones. High churn indicates product-market fit issues, poor customer experience, or competitive pressures. Top SaaS companies aim for monthly churn rates below 3–5%.",
      },
    },
    {
      "@type": "Question",
      name: "How do B2B SaaS pricing models work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "B2B SaaS pricing models vary widely. Common models include per-user per-month pricing (the most common), tiered plans (Basic/Pro/Enterprise), usage-based pricing (pay per API call or storage), flat-rate pricing, and freemium with paid upgrades. Many vendors also offer annual discounts of 15–25% compared to monthly billing. Enterprise plans often include custom pricing.",
      },
    },
    {
      "@type": "Question",
      name: "What is a B2B SaaS marketplace?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A B2B SaaS marketplace is a platform where businesses can discover, compare, and purchase software tools. Examples include G2, Capterra, TrustRadius, and GetApp. These marketplaces aggregate user reviews, feature comparisons, and pricing information to help buyers make informed decisions. Some also facilitate direct purchases or free trials.",
      },
    },
    {
      "@type": "Question",
      name: "How important are integrations when choosing SaaS tools?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Integrations are extremely important. A SaaS tool that doesn't integrate with your existing tech stack can create data silos and manual workarounds. Look for tools that offer native integrations with popular platforms (like Slack, Salesforce, Google Workspace, or Microsoft 365), support APIs and webhooks for custom connections, and have a marketplace of third-party integrations.",
      },
    },
    {
      "@type": "Question",
      name: "What should I look for in a SaaS contract?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Key items to review in a SaaS contract include the service level agreement (SLA) guaranteeing uptime (typically 99.9%+), data ownership and portability clauses, security compliance certifications (SOC 2, ISO 27001), termination and refund policies, auto-renewal terms, pricing escalation limits, and data processing agreements for GDPR compliance. Always have legal counsel review enterprise contracts.",
      },
    },
    {
      "@type": "Question",
      name: "How does SaaS onboarding work for teams?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SaaS onboarding typically involves account setup, user provisioning, data migration or import, training sessions (live or recorded), and integration configuration. The best SaaS providers offer dedicated onboarding specialists for enterprise plans, knowledge bases with tutorials, interactive walkthroughs within the product, and templates or starter kits to accelerate time-to-value.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between free trial and freemium?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A free trial gives you full access to premium features for a limited time (typically 7–30 days), after which you must subscribe. Freemium offers a permanently free version with limited features, designed to upsell you to paid plans when you need more functionality. Free trials are better for evaluating full capabilities, while freemium is good for long-term testing at no cost.",
      },
    },
    {
      "@type": "Question",
      name: "How do B2B SaaS companies handle data security?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Reputable B2B SaaS companies implement encryption at rest and in transit, SOC 2 Type II audits, ISO 27001 certification, GDPR compliance, regular penetration testing, multi-factor authentication (MFA), role-based access controls (RBAC), and data backup & disaster recovery procedures. Always verify a vendor's security posture before committing to their platform.",
      },
    },
    {
      "@type": "Question",
      name: "What is the average length of a B2B SaaS sales cycle?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The B2B SaaS sales cycle varies by deal size and complexity. Self-serve products under $100/month may close in minutes. Mid-market deals ($1K–$10K/year) typically take 2–4 weeks. Enterprise deals ($50K+/year) can take 3–12 months, involving multiple stakeholders, demo sessions, security reviews, and legal negotiations.",
      },
    },
    {
      "@type": "Question",
      name: "Should we build or buy SaaS tools?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Unless your core business differentiation depends on custom software, buying is almost always better than building. Building a CRM, analytics platform, or help desk from scratch costs 10–100x more than subscribing to a proven SaaS solution, and ongoing maintenance is a significant burden. Buy off-the-shelf SaaS and invest your engineering resources in your core product.",
      },
    },
    {
      "@type": "Question",
      name: "What is SaaS sprawl and how to avoid it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SaaS sprawl is the uncontrolled proliferation of software subscriptions across an organization, leading to wasted spending, security risks, and integration headaches. The average company uses 130+ SaaS tools. To prevent sprawl, implement a SaaS management policy, conduct quarterly audits, use a SaaS management platform, designate approval workflows for new tool purchases, and consolidate overlapping tools.",
      },
    },
    {
      "@type": "Question",
      name: "How do B2B SaaS reviews and ratings work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "B2B SaaS reviews are typically collected by third-party platforms like G2, Capterra, and TrustRadius. Users submit ratings (usually 1–5 stars) and written feedback. These platforms verify reviewers, moderate content for authenticity, and aggregate scores to produce overall ratings. Reviews cover criteria like ease of use, customer support, value for money, and feature set. Always read recent reviews and look for patterns rather than outliers.",
      },
    },
    {
      "@type": "Question",
      name: "What is the future of B2B SaaS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The future of B2B SaaS is being shaped by AI-powered features (copilots, automation, predictive analytics), vertical SaaS (industry-specific solutions), product-led growth (PLG) strategies, usage-based and consumption pricing models, and increased focus on interoperability through open APIs. The global B2B SaaS market is projected to exceed $900 billion by 2030, driven by digital transformation across all industries.",
      },
    },
  ],
};

const FAQ_ITEMS = [
  {
    question: "What is B2B SaaS?",
    answer:
      "B2B SaaS (Business-to-Business Software as a Service) refers to cloud-based software solutions that businesses subscribe to and use to support their operations. Unlike traditional software that requires on-premise installation, B2B SaaS is hosted by the provider and accessed via a web browser. Examples include Salesforce (CRM), HubSpot (Marketing), Slack (Communication), and Asana (Project Management).",
  },
  {
    question: "How do you choose the right SaaS tool for your business?",
    answer:
      "Choosing the right SaaS tool involves defining your requirements, budgeting, evaluating features, reading verified user reviews from platforms like G2 and Capterra, considering integration capabilities, testing with free trials or demos, and assessing vendor support and scalability. Always prioritize tools that solve your specific pain points rather than getting distracted by feature bloat.",
  },
  {
    question: "What's the difference between B2B and B2C SaaS?",
    answer:
      "B2B SaaS targets business customers and focuses on features like team collaboration, admin controls, security compliance, and ROI tracking. B2C SaaS targets individual consumers and prioritizes user experience, ease of use, and personal productivity. B2B products typically have higher price points, longer sales cycles, and require onboarding support, while B2C products are often self-serve with lower monthly fees.",
  },
  {
    question: "How much should a small business spend on SaaS?",
    answer:
      "A common benchmark is that small businesses spend 3–10% of their annual revenue on SaaS subscriptions. For a company with $500K in revenue, that translates to roughly $15K–$50K per year. However, this varies by industry — tech startups often spend more, while traditional service businesses spend less. The key is to track SaaS usage regularly and eliminate underutilized subscriptions.",
  },
  {
    question: "What are the most popular B2B SaaS categories?",
    answer:
      "The most popular B2B SaaS categories include CRM (Customer Relationship Management), Marketing Automation, Project Management, Human Resources (HRIS), Accounting & Finance, Customer Support (Help Desk), Communication & Collaboration, Analytics & Business Intelligence, Cybersecurity, and DevOps tools. Each category has dozens of competing platforms with varying feature sets and pricing models.",
  },
  {
    question: "What is SaaS churn and why does it matter?",
    answer:
      "SaaS churn refers to the percentage of customers who cancel their subscriptions over a given period. It's a critical metric because acquiring new customers costs 5–7x more than retaining existing ones. High churn indicates product-market fit issues, poor customer experience, or competitive pressures. Top SaaS companies aim for monthly churn rates below 3–5%.",
  },
  {
    question: "How do B2B SaaS pricing models work?",
    answer:
      "B2B SaaS pricing models vary widely. Common models include per-user per-month pricing (the most common), tiered plans (Basic/Pro/Enterprise), usage-based pricing (pay per API call or storage), flat-rate pricing, and freemium with paid upgrades. Many vendors also offer annual discounts of 15–25% compared to monthly billing. Enterprise plans often include custom pricing.",
  },
  {
    question: "What is a B2B SaaS marketplace?",
    answer:
      "A B2B SaaS marketplace is a platform where businesses can discover, compare, and purchase software tools. Examples include G2, Capterra, TrustRadius, and GetApp. These marketplaces aggregate user reviews, feature comparisons, and pricing information to help buyers make informed decisions. Some also facilitate direct purchases or free trials.",
  },
  {
    question: "How important are integrations when choosing SaaS tools?",
    answer:
      "Integrations are extremely important. A SaaS tool that doesn't integrate with your existing tech stack can create data silos and manual workarounds. Look for tools that offer native integrations with popular platforms (like Slack, Salesforce, Google Workspace, or Microsoft 365), support APIs and webhooks for custom connections, and have a marketplace of third-party integrations.",
  },
  {
    question: "What should I look for in a SaaS contract?",
    answer:
      "Key items to review in a SaaS contract include the service level agreement (SLA) guaranteeing uptime (typically 99.9%+), data ownership and portability clauses, security compliance certifications (SOC 2, ISO 27001), termination and refund policies, auto-renewal terms, pricing escalation limits, and data processing agreements for GDPR compliance. Always have legal counsel review enterprise contracts.",
  },
  {
    question: "How does SaaS onboarding work for teams?",
    answer:
      "SaaS onboarding typically involves account setup, user provisioning, data migration or import, training sessions (live or recorded), and integration configuration. The best SaaS providers offer dedicated onboarding specialists for enterprise plans, knowledge bases with tutorials, interactive walkthroughs within the product, and templates or starter kits to accelerate time-to-value.",
  },
  {
    question: "What is the difference between free trial and freemium?",
    answer:
      "A free trial gives you full access to premium features for a limited time (typically 7–30 days), after which you must subscribe. Freemium offers a permanently free version with limited features, designed to upsell you to paid plans when you need more functionality. Free trials are better for evaluating full capabilities, while freemium is good for long-term testing at no cost.",
  },
  {
    question: "How do B2B SaaS companies handle data security?",
    answer:
      "Reputable B2B SaaS companies implement encryption at rest and in transit, SOC 2 Type II audits, ISO 27001 certification, GDPR compliance, regular penetration testing, multi-factor authentication (MFA), role-based access controls (RBAC), and data backup & disaster recovery procedures. Always verify a vendor's security posture before committing to their platform.",
  },
  {
    question: "What is the average length of a B2B SaaS sales cycle?",
    answer:
      "The B2B SaaS sales cycle varies by deal size and complexity. Self-serve products under $100/month may close in minutes. Mid-market deals ($1K–$10K/year) typically take 2–4 weeks. Enterprise deals ($50K+/year) can take 3–12 months, involving multiple stakeholders, demo sessions, security reviews, and legal negotiations.",
  },
  {
    question: "Should we build or buy SaaS tools?",
    answer:
      "Unless your core business differentiation depends on custom software, buying is almost always better than building. Building a CRM, analytics platform, or help desk from scratch costs 10–100x more than subscribing to a proven SaaS solution, and ongoing maintenance is a significant burden. Buy off-the-shelf SaaS and invest your engineering resources in your core product.",
  },
  {
    question: "What is SaaS sprawl and how to avoid it?",
    answer:
      "SaaS sprawl is the uncontrolled proliferation of software subscriptions across an organization, leading to wasted spending, security risks, and integration headaches. The average company uses 130+ SaaS tools. To prevent sprawl, implement a SaaS management policy, conduct quarterly audits, use a SaaS management platform, designate approval workflows for new tool purchases, and consolidate overlapping tools.",
  },
  {
    question: "How do B2B SaaS reviews and ratings work?",
    answer:
      "B2B SaaS reviews are typically collected by third-party platforms like G2, Capterra, and TrustRadius. Users submit ratings (usually 1–5 stars) and written feedback. These platforms verify reviewers, moderate content for authenticity, and aggregate scores to produce overall ratings. Reviews cover criteria like ease of use, customer support, value for money, and feature set. Always read recent reviews and look for patterns rather than outliers.",
  },
  {
    question: "What is the future of B2B SaaS?",
    answer:
      "The future of B2B SaaS is being shaped by AI-powered features (copilots, automation, predictive analytics), vertical SaaS (industry-specific solutions), product-led growth (PLG) strategies, usage-based and consumption pricing models, and increased focus on interoperability through open APIs. The global B2B SaaS market is projected to exceed $900 billion by 2030, driven by digital transformation across all industries.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />

      <div className="relative pt-32 pb-20 px-6">
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#3B82F6] bg-[#162440] px-3 py-1.5 rounded-md mb-4">
              FAQ
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-[#F0F4F8] tracking-tight mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-[#8BA3BE] max-w-xl mx-auto leading-relaxed">
              Everything you need to know about B2B SaaS — from choosing the right
              tools to understanding pricing, security, and industry trends.
            </p>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, index) => (
              <div
                key={index}
                className="bg-[#0F1D32] border border-[#1E3A5F] rounded-xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-[#162440] transition-colors"
                  aria-expanded={openIndex === index}
                >
                  <span className="text-[#F0F4F8] font-medium pr-4">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#3B82F6] flex-shrink-0 transition-transform duration-200 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-5 pb-5 text-[#8BA3BE] leading-relaxed text-sm border-t border-[#1E3A5F] pt-4">
                    {item.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-[#8BA3BE] text-sm">
              Still have questions?{" "}
              <a
                href="/contact"
                className="text-[#3B82F6] hover:underline font-medium"
              >
                Contact our team
              </a>{" "}
              and we&apos;ll get back to you within 24 hours.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

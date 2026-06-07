import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Target, TrendingUp, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "About — DevEx Tools Hub",
  description:
    "DevEx Tools Hub is an independent directory of developer tools. We curate and compare dev tools, frameworks, and APIs to help engineering teams make informed decisions.",
};

const VALUES = [
  {
    icon: Search,
    title: "Independent Curation",
    desc: "We research and catalog tools based on publicly available information, user reviews from major platforms, and product documentation — not sponsorship dollars.",
  },
  {
    icon: TrendingUp,
    title: "Data-Driven Comparisons",
    desc: "Every tool page includes feature comparisons, pricing breakdowns, and pros and cons synthesized from verified user feedback across multiple review platforms.",
  },
  {
    icon: Target,
    title: "Practical Guidance",
    desc: "Our use case recommendations are based on real-world scenarios. We help match tools to specific business needs and team sizes.",
  },
  {
    icon: FileText,
    title: "Transparent Methodology",
    desc: "We clearly indicate when information comes from public sources, vendor documentation, or aggregated review data. Our goal is transparency, not pretense.",
  },
];

export default function AboutPage() {
  return (
    <div className="relative pt-32 pb-20 px-6">
      <div className="max-w-[800px] mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#3B82F6] bg-[#162440] px-3 py-1.5 rounded-md mb-4">
            About
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#F0F4F8] tracking-tight mb-6">
            Your Guide to Better{" "}
            <span className="text-gradient">Software Decisions</span>
          </h1>
          <p className="text-lg text-[#8BA3BE] leading-relaxed max-w-2xl mx-auto">
            DevEx Tools Hub is an independent directory that helps businesses
            discover, compare, and evaluate enterprise software. We aggregate
            information from publicly available sources to give you a clear
            picture of what each tool offers.
          </p>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[#F0F4F8] mb-6">What We Do</h2>
          <div className="space-y-4 text-[#8BA3BE] leading-relaxed">
            <p>
              DevEx Tools Hub was created to solve a common problem: finding
              reliable, up-to-date information about enterprise software is
              harder than it should be. Review sites are often biased by
              sponsorship, pricing is hidden behind sales calls, and feature
              comparisons quickly go out of date.
            </p>
            <p>
              We catalog and compare B2B SaaS tools across 15+ categories,
              including CRM, Marketing, DevOps, Security, HR, Finance, and more.
              Each tool page includes verified pricing tiers, feature lists, pros
              and cons synthesized from user reviews, and practical use case
              recommendations.
            </p>
            <p>
              Our data is compiled from vendor documentation, official pricing
              pages, and aggregated user reviews from platforms like G2,
              Capterra, and TrustRadius. We do not claim to have tested every
              tool personally — instead, we synthesize the best available public
              information to help you make an informed choice.
            </p>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[#F0F4F8] mb-8 text-center">
            How We Evaluate Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {VALUES.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="bg-[#0F1D32] border border-[#1E3A5F] rounded-xl p-6 card-hover"
                >
                  <div className="w-12 h-12 rounded-lg bg-[#162440] flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#3B82F6]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#F0F4F8] mb-2">{value.title}</h3>
                  <p className="text-sm text-[#8BA3BE] leading-relaxed">{value.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[#F0F4F8] mb-6">Data Sources</h2>
          <div className="space-y-4 text-[#8BA3BE] leading-relaxed">
            <p>
              Information on this site is compiled from the following sources:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-[#F0F4F8]">Vendor official websites and documentation</strong> — pricing, features, and product descriptions
              </li>
              <li>
                <strong className="text-[#F0F4F8]">Aggregated user reviews</strong> — publicly available ratings and feedback from platforms like G2, Capterra, and TrustRadius
              </li>
              <li>
                <strong className="text-[#F0F4F8]">Industry publications and analyst reports</strong> — market trends and comparative analysis
              </li>
            </ul>
            <p className="text-sm mt-4">
              We strive to keep all information current, but pricing and features
              change frequently. Please verify details directly with the vendor
              before making purchasing decisions. Links to official websites are
              provided on every tool page.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-[#0F1D32] border border-[#1E3A5F] rounded-xl p-10">
          <h2 className="text-2xl font-bold text-[#F0F4F8] mb-4">
            Have feedback or a suggestion?
          </h2>
          <p className="text-[#8BA3BE] mb-6 max-w-lg mx-auto">
            We are always improving. If you notice outdated information or have
            suggestions for tools we should add, let us know.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-6 py-3 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-medium rounded-lg transition-colors"
            >
              Contact Us
            </Link>
            <a
              href="mailto:info@devex-tools.net"
              className="px-6 py-3 border border-[#1E3A5F] hover:border-[#2A5080] text-[#8BA3BE] hover:text-[#F0F4F8] font-medium rounded-lg transition-all"
            >
              info@devex-tools.net
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

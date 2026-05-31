"use client";

import { useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Star,
  CheckCircle,
  XCircle,
  ExternalLink,
  DollarSign,
  TrendingUp,
  Users,
  Shield,
  BarChart3,
  Quote,
  Layers,
  Sparkles,
} from "lucide-react";
import { TOOL_MAP, ALL_TOOLS } from "@/data/tools";
import { softwareSchema, organizationSchema } from "@/lib/schema";

function ScoreBar({ label, score, color }: { label: string; score: number; color: string }) {
  const pct = Math.min(score, 100);
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-[#8BA3BE] w-20 shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-[#1E3A5F] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-xs font-bold text-[#F0F4F8] w-8 text-right">{score}%</span>
    </div>
  );
}

export default function ToolDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const tool = TOOL_MAP.get(slug);
  const schemaInjected = useRef(false);

  // Inject JSON-LD Schema for SoftwareApplication
  useEffect(() => {
    if (!tool || schemaInjected.current) return;
    schemaInjected.current = true;

    const scripts: HTMLScriptElement[] = [];

    const software = softwareSchema(
      tool.name,
      tool.category,
      tool.rating,
      tool.reviewCount,
      tool.pricing || '0.00',
      'USD'
    );
    const s1 = document.createElement('script');
    s1.type = 'application/ld+json';
    s1.text = JSON.stringify(software);
    document.head.appendChild(s1);
    scripts.push(s1);

    const org = organizationSchema(
      'B2B Software List',
      'https://b2b-saas-tool-hub.com',
      'Comprehensive B2B SaaS directory and tool hub for modern enterprises.'
    );
    const s2 = document.createElement('script');
    s2.type = 'application/ld+json';
    s2.text = JSON.stringify(org);
    document.head.appendChild(s2);
    scripts.push(s2);

    return () => {
      scripts.forEach(s => document.head.removeChild(s));
    };
  }, [tool]);

  if (!tool) {
    return (
      <div className="relative pt-32 px-6 text-center">
        <h1 className="text-3xl font-bold text-[#F0F4F8] mb-4">
          Tool Not Found
        </h1>
        <p className="text-[#8BA3BE] mb-8">
          The tool you are looking for does not exist or has been removed.
        </p>
        <Link
          href="/"
          className="inline-flex items-center text-[#3B82F6] hover:text-[#22D3EE] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Hub
        </Link>
      </div>
    );
  }

  const Icon = tool.icon;

  // Find related tools (same category, excluding current)
  const relatedTools = ALL_TOOLS.filter(
    (t) => t.category === tool.category && t.id !== tool.id
  ).slice(0, 4);

  // Resolve alternative tool names
  const alternativeNames = (tool.alternatives || [])
    .map((altId) => {
      const alt = ALL_TOOLS.find((t) => t.id === altId);
      return alt ? alt.name : null;
    })
    .filter(Boolean) as string[];

  const scores = tool.scoreBreakdown || {
    features: 90,
    reviews: 88,
    momentum: 85,
    popularity: 87,
  };

  return (
    <div className="relative pt-28 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center text-[#8BA3BE] hover:text-[#3B82F6] transition-colors mb-8 text-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Hub
        </Link>

        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-[#162440] flex items-center justify-center">
              <Icon className="w-7 h-7 text-[#3B82F6]" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-[#162440] text-[#3B82F6] text-xs font-bold rounded-full uppercase tracking-wider border border-[#1E3A5F]">
                  {tool.category}
                </span>
                <div className="flex items-center text-[#F59E0B] font-bold text-sm">
                  <Star className="w-4 h-4 fill-[#F59E0B] mr-1" />{" "}
                  {tool.rating}/5
                  <span className="text-[#4A6380] font-normal ml-1">
                    ({tool.reviewCount.toLocaleString()} reviews)
                  </span>
                </div>
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#F0F4F8] mb-4 tracking-tight">
            {tool.name}
          </h1>
          <p className="text-lg md:text-xl text-[#8BA3BE] leading-relaxed">
            {tool.longDescription}
          </p>
        </header>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-[#0F1D32] border border-[#1E3A5F] rounded-xl p-4">
            <DollarSign className="w-5 h-5 text-[#22D3EE] mb-2" />
            <p className="text-xs text-[#4A6380] uppercase tracking-wider mb-1">
              Starting Price
            </p>
            <p className="text-sm font-bold text-[#F0F4F8]">{tool.pricing}</p>
          </div>
          <div className="bg-[#0F1D32] border border-[#1E3A5F] rounded-xl p-4">
            <Star className="w-5 h-5 text-[#F59E0B] mb-2" />
            <p className="text-xs text-[#4A6380] uppercase tracking-wider mb-1">
              Rating
            </p>
            <p className="text-sm font-bold text-[#F0F4F8]">
              {tool.rating}/5
            </p>
          </div>
          <div className="bg-[#0F1D32] border border-[#1E3A5F] rounded-xl p-4">
            <Users className="w-5 h-5 text-[#3B82F6] mb-2" />
            <p className="text-xs text-[#4A6380] uppercase tracking-wider mb-1">
              Reviews
            </p>
            <p className="text-sm font-bold text-[#F0F4F8]">
              {tool.reviewCount.toLocaleString()}
            </p>
          </div>
          <div className="bg-[#0F1D32] border border-[#1E3A5F] rounded-xl p-4">
            <Shield className="w-5 h-5 text-[#22D3EE] mb-2" />
            <p className="text-xs text-[#4A6380] uppercase tracking-wider mb-1">
              Category
            </p>
            <p className="text-sm font-bold text-[#F0F4F8]">{tool.category}</p>
          </div>
        </div>

        {/* SW Score Section */}
        <div className="bg-[#0F1D32] border border-[#1E3A5F] rounded-xl p-6 mb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-[#F0F4F8] flex items-center text-base">
              <BarChart3 className="w-5 h-5 mr-2 text-[#3B82F6]" /> SW Score
            </h2>
            <span className="text-xs text-[#4A6380]">Powered by verified reviews & data</span>
          </div>
          <div className="space-y-3">
            <ScoreBar label="Features" score={scores.features} color="#3B82F6" />
            <ScoreBar label="Reviews" score={scores.reviews} color="#22D3EE" />
            <ScoreBar label="Momentum" score={scores.momentum} color="#F59E0B" />
            <ScoreBar label="Popularity" score={scores.popularity} color="#8B5CF6" />
          </div>
          <div className="mt-4 pt-4 border-t border-[#1E3A5F] flex items-center justify-between text-xs text-[#4A6380]">
            <span>Overall rating based on user reviews and product data</span>
            <span className="font-bold text-[#22D3EE]">
              Avg: {((scores.features + scores.reviews + scores.momentum + scores.popularity) / 4).toFixed(0)}%
            </span>
          </div>
        </div>

        {/* Pros & Cons */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-[#0F1D32] border border-[#1E3A5F] rounded-xl p-6">
            <h3 className="font-bold text-green-400 mb-4 flex items-center text-base">
              <CheckCircle className="w-5 h-5 mr-2" /> Key Advantages
            </h3>
            <ul className="space-y-3">
              {tool.pros.map((pro, i) => (
                <li
                  key={i}
                  className="flex items-start text-sm text-[#8BA3BE]"
                >
                  <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                  {pro}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-[#0F1D32] border border-[#1E3A5F] rounded-xl p-6">
            <h3 className="font-bold text-red-400 mb-4 flex items-center text-base">
              <XCircle className="w-5 h-5 mr-2" /> Potential Drawbacks
            </h3>
            <ul className="space-y-3">
              {tool.cons.map((con, i) => (
                <li
                  key={i}
                  className="flex items-start text-sm text-[#8BA3BE]"
                >
                  <XCircle className="w-4 h-4 mr-2 mt-0.5 text-red-500 flex-shrink-0" />
                  {con}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Features */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-[#F0F4F8] mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-[#3B82F6]" />
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {tool.features.map((feature, i) => (
              <div
                key={i}
                className="bg-[#0F1D32] border border-[#1E3A5F] rounded-lg px-4 py-3 text-sm text-[#8BA3BE] hover:text-[#F0F4F8] hover:border-[#2A5080] transition-all flex items-center gap-3"
              >
                <CheckCircle className="w-4 h-4 text-[#22D3EE] flex-shrink-0" />
                {feature}
              </div>
            ))}
          </div>
        </div>

        {/* Use Case */}
        <div className="bg-[#0F1D32] border border-[#1E3A5F] rounded-xl p-6 mb-10">
          <h3 className="font-bold text-[#F0F4F8] mb-3 flex items-center text-base">
            <Users className="w-5 h-5 mr-2 text-[#3B82F6]" /> Best For
          </h3>
          <p className="text-sm text-[#8BA3BE] leading-relaxed">
            {tool.useCase}
          </p>
        </div>

        {/* User Quotes */}
        {tool.userQuotes && tool.userQuotes.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-[#F0F4F8] mb-6 flex items-center gap-2">
              <Quote className="w-6 h-6 text-[#3B82F6]" />
              What Users Say
            </h2>
            <div className="grid gap-4">
              {tool.userQuotes.map((q, i) => (
                <div
                  key={i}
                  className="bg-[#0F1D32] border border-[#1E3A5F] rounded-xl p-6 relative"
                >
                  <Sparkles className="w-5 h-5 text-[#3B82F6] opacity-30 absolute top-4 right-4" />
                  <p className="text-sm text-[#8BA3BE] leading-relaxed italic mb-4">
                    &ldquo;{q.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-2 text-xs text-[#4A6380]">
                    <div className="w-8 h-8 rounded-full bg-[#162440] flex items-center justify-center text-[#3B82F6] font-bold">
                      {q.role.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-[#F0F4F8]">{q.role}</p>
                      <p>{q.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Alternatives Considered */}
        {alternativeNames.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-[#F0F4F8] mb-6 flex items-center gap-2">
              <Layers className="w-6 h-6 text-[#3B82F6]" />
              Alternatives Considered
            </h2>
            <div className="flex flex-wrap gap-3">
              {alternativeNames.map((name, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-[#162440] border border-[#1E3A5F] rounded-full text-sm text-[#8BA3BE]"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Related Tools */}
        {relatedTools.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-[#F0F4F8] mb-6 flex items-center gap-2">
              <Shield className="w-6 h-6 text-[#3B82F6]" />
              More {tool.category} Tools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedTools.map((rt) => {
                const RtIcon = rt.icon;
                return (
                  <Link
                    key={rt.id}
                    href={`/tools/${rt.id}`}
                    className="group bg-[#0F1D32] border border-[#1E3A5F] rounded-xl p-5 hover:border-[#2A5080] transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#162440] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <RtIcon className="w-5 h-5 text-[#3B82F6]" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm font-bold text-[#F0F4F8] group-hover:text-[#3B82F6] transition-colors">
                          {rt.name}
                        </h3>
                        <p className="text-xs text-[#4A6380] mt-0.5">
                          {rt.description}
                        </p>
                        <div className="flex items-center gap-1 mt-1.5">
                          <Star className="w-3 h-3 text-[#F59E0B] fill-[#F59E0B]" />
                          <span className="text-xs text-[#F59E0B] font-semibold">{rt.rating}</span>
                          <span className="text-xs text-[#4A6380]">({rt.reviewCount.toLocaleString()})</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Pricing & CTA */}
        <div className="bg-gradient-to-r from-[#162440] to-[#0F1D32] border border-[#1E3A5F] rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold text-[#F0F4F8] mb-2">
              Ready to scale with {tool.name}?
            </h2>
            <p className="text-[#8BA3BE] text-sm">{tool.pricingDetail}</p>
          </div>
          <a
            href={tool.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-8 py-3 rounded-full font-bold transition-all flex items-center shadow-glow-sm whitespace-nowrap"
          >
            Visit Official Website{" "}
            <ExternalLink className="ml-2 w-5 h-5" />
          </a>
        </div>

        {/* Ad Placeholder */}
        <div className="mt-10 p-8 border border-dashed border-[#1E3A5F] rounded-lg text-center text-[#4A6380] italic bg-[#0A1628]/50">
          [AdSense In-Article Ad]
        </div>

        {/* Affiliate Disclaimer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-[#4A6380]">
            When you purchase through links on our site, we may earn an affiliate commission.{' '}
            <Link href="/disclosure" className="text-[#3B82F6] hover:underline">
              Learn more
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

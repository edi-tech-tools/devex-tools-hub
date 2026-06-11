import { Metadata } from "next";
import Link from "next/link";
import { ALL_TOOLS } from "@/data/tools";
import { Star, ArrowRight, Sparkles, ChevronRight, Search } from "lucide-react";

const ALL_CATEGORIES = Array.from(new Set(ALL_TOOLS.map((t) => t.category))).sort();

function slugify(category: string) {
  return category.toLowerCase().replace(/\s+/g, "-");
}

export const metadata: Metadata = {
  title: "Best Developer Tools 2026 — Expert Comparisons",
  description:
    "Discover the best developer tools and platforms in 2026. Compare top-rated platforms with verified reviews, pricing, and expert analysis.",
  openGraph: {
    title: "Best Developer Tools 2026 — Expert Comparisons",
    description: `Compare ${ALL_TOOLS.length} top-rated solutions with verified reviews and detailed comparisons.`,
  },
};

export default function BestToolsPage() {
  const topTools = [...ALL_TOOLS].sort((a, b) => b.rating - a.rating).slice(0, 6);

  return (
    <div className="min-h-screen bg-[#0B1120]">
      <section className="relative pt-28 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E3A5F]/20 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-[1000px] mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#334155] bg-[#1E293B]/60 text-sm text-[#94A3B8] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#60A5FA]" />
            <span>{ALL_TOOLS.length} tools reviewed</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#F1F5F9] leading-tight">
            Best Developer Tools <span className="text-[#60A5FA]">2026</span>
          </h1>
          <p className="text-[#94A3B8] mt-3 max-w-2xl mx-auto text-sm">
            Discover the best developer tools and platforms in 2026. Expert comparisons, verified user reviews, transparent pricing &mdash; all in one place.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
              <input
                type="text"
                placeholder="Search tools..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#334155] bg-[#1E293B]/80 text-[#E2E8F0] placeholder:text-[#475569] text-sm outline-none focus:border-[#60A5FA]/50 transition-colors"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-[1000px] mx-auto">
          <h2 className="text-lg font-semibold text-[#F1F5F9] mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {ALL_CATEGORIES.map((cat) => {
              const count = ALL_TOOLS.filter((t) => t.category === cat).length;
              return (
                <Link
                  key={cat}
                  href={`/best/${slugify(cat)}`}
                  className="group flex items-center justify-between p-4 rounded-xl border border-[#1E293B] bg-[#0F172A] hover:border-[#334155] hover:bg-[#1A2332] transition-all"
                >
                  <div>
                    <div className="text-sm font-medium text-[#E2E8F0] group-hover:text-[#60A5FA] transition-colors">{cat}</div>
                    <div className="text-xs text-[#64748B] mt-0.5">{count} tools</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#475569] group-hover:text-[#60A5FA] transition-colors" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-[1000px] mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-[#F1F5F9]">Top Rated Tools</h2>
            <Link
              href={`/best/${slugify(ALL_CATEGORIES[0])}`}
              className="text-sm text-[#60A5FA] hover:underline flex items-center gap-1"
            >
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topTools.map((tool) => (
              <Link
                key={tool.id || tool.slug || tool.name}
                href={`/tools/${tool.slug || tool.id || ""}`}
                className="block p-5 rounded-xl border border-[#1E293B] bg-[#0F172A] hover:border-[#334155] transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#1E3A5F] to-[#0F172A] flex items-center justify-center text-lg flex-shrink-0">
                    {tool.icon || "&#x1F527;"}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-[#E2E8F0] truncate">{tool.name}</h3>
                    <p className="text-xs text-[#64748B] mt-1 line-clamp-2">{tool.description}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-[#F59E0B] fill-[#F59E0B]" />
                        <span className="text-xs text-[#94A3B8]">{tool.rating}</span>
                      </div>
                      <span className="text-xs text-[#475569]">{tool.reviews || tool.reviewCount || 0} reviews</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

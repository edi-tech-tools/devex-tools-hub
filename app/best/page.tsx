import { Metadata } from "next";
import Link from "next/link";
import { ALL_TOOLS } from "@/data/tools";
import { Sparkles, ChevronRight, Search, Star } from "lucide-react";

const ALL_CATEGORIES = Array.from(new Set(ALL_TOOLS.map((t) => t.category))).sort((a, b) => a.localeCompare(b));

function slugify(cat: string) {
  return cat.toLowerCase().replace(/\s+/g, "-");
}

export const metadata: Metadata = {
  title: "Best Developer Tools 2026 — Expert Comparisons",
  description: "Discover the best developer tools and platforms in 2026. Compare top-rated platforms with verified reviews, pricing, and expert analysis.",
};

function CategoryCard({ name }: { name: string }) {
  const count = ALL_TOOLS.filter((t) => t.category === name).length;
  return (
    <Link
      href={"/best/" + slugify(name)}
      className="group flex items-center justify-between p-4 rounded-xl border border-[#1E293B] bg-[#0F172A] hover:border-[#334155] hover:bg-[#1A2332] transition-all"
    >
      <div>
        <div className="text-sm font-medium text-[#E2E8F0] group-hover:text-[#60A5FA] transition-colors">{name}</div>
        <div className="text-xs text-[#64748B] mt-0.5">{count} tools</div>
      </div>
      <ChevronRight className="w-4 h-4 text-[#475569] group-hover:text-[#60A5FA] transition-colors" />
    </Link>
  );
}

export default function BestPage() {
  return (
    <div className="min-h-screen bg-[#0B1120]">
      <section className="relative pt-28 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E3A5F]/20 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-[1000px] mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#334155] bg-[#1E293B]/60 text-sm text-[#94A3B8] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#60A5FA]" />
            <span>{ALL_TOOLS.length} tools</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#F1F5F9] leading-tight">
            Best Developer Tools <span className="text-[#60A5FA]">2026</span>
          </h1>
          <p className="text-[#94A3B8] mt-3 max-w-2xl mx-auto text-sm">
            Discover the best developer tools and platforms in 2026. Expert comparisons, verified user reviews, transparent pricing.
          </p>
          <div className="max-w-md mx-auto mt-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
              <input type="text" placeholder="Search categories..." className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#334155] bg-[#1E293B]/80 text-[#E2E8F0] placeholder:text-[#475569] text-sm outline-none focus:border-[#60A5FA]/50 transition-colors" />
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-[1000px] mx-auto">
          <h2 className="text-lg font-semibold text-[#F1F5F9] mb-6">Browse by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {ALL_CATEGORIES.map((cat) => <CategoryCard key={cat} name={cat} />)}
          </div>
        </div>
      </section>
    </div>
  );
}

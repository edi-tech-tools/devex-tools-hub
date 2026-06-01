"use client";

import { useState, useMemo } from "react";
import { Search, Star, ArrowRight, BookOpen, Layers, Sparkles, Calendar, TrendingUp, Building2, Users, Briefcase } from "lucide-react";
import Link from "next/link";
import { ALL_TOOLS } from "@/data/tools";
import { BLOG_POSTS } from "@/data/blog-posts";

const CATEGORIES = Array.from(new Set(ALL_TOOLS.map((t) => t.category)));

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [companySize, setCompanySize] = useState<string | null>(null);

  const filteredTools = ALL_TOOLS.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const latestPosts = useMemo(
    () => [...BLOG_POSTS].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3),
    []
  );

  const topCategories = useMemo(() => {
    const stats: Record<string, { count: number; avgRating: number }> = {};
    for (const t of ALL_TOOLS) {
      if (!stats[t.category]) stats[t.category] = { count: 0, avgRating: 0 };
      stats[t.category].count++;
      stats[t.category].avgRating += t.rating;
    }
    for (const key of Object.keys(stats)) {
      stats[key].avgRating = Math.round((stats[key].avgRating / stats[key].count) * 10) / 10;
    }
    return Object.entries(stats).sort((a, b) => b[1].count - a[1].count).slice(0, 8);
  }, []);

  const industrySolutions = useMemo(() => {
    const stats: Record<string, { count: number; avgRating: number; tools: typeof ALL_TOOLS }> = {};
    for (const t of ALL_TOOLS) {
      if (!stats[t.category]) stats[t.category] = { count: 0, avgRating: 0, tools: [] };
      stats[t.category].count++;
      stats[t.category].avgRating += t.rating;
      stats[t.category].tools.push(t);
    }
    for (const key of Object.keys(stats)) {
      stats[key].avgRating = Math.round((stats[key].avgRating / stats[key].count) * 10) / 10;
      stats[key].tools.sort((a, b) => b.rating - a.rating);
    }
    return Object.entries(stats)
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 3)
      .map(([name, data]) => ({ name, toolCount: data.count, avgRating: data.avgRating, top3: data.tools.slice(0, 3) }));
  }, []);

  const getCategoryIcon = (cat: string) => {
    const tool = ALL_TOOLS.find(t => t.category === cat);
    return tool?.icon || Layers;
  };

  const totalRatingSum = useMemo(() => ALL_TOOLS.reduce((sum, t) => sum + t.rating, 0), []);

  // Featured tool of the month (top rated)
  const featuredTool = useMemo(() => [...ALL_TOOLS].sort((a, b) => b.rating - a.rating)[0], []);

  // Vendor comparison pairs
  const vendorPairs = useMemo(() => {
    const cats = [...new Set(ALL_TOOLS.map(t => t.category))].slice(0, 3);
    return cats.map(cat => {
      const tools = ALL_TOOLS.filter(t => t.category === cat).sort((a, b) => b.rating - a.rating).slice(0, 3);
      return { category: cat, tools };
    });
  }, []);

  // Testimonials
  const testimonials = useMemo(() => {
    const results: { quote: string; toolName: string; category: string }[] = [];
    for (const tool of ALL_TOOLS) {
      if (tool.userQuotes && tool.userQuotes.length > 0) {
        for (const q of tool.userQuotes) {
          results.push({
            quote: q.quote.length > 120 ? q.quote.slice(0, 120) + "..." : q.quote,
            toolName: tool.name,
            category: tool.category,
          });
          if (results.length >= 3) break;
        }
      }
      if (results.length >= 3) break;
    }
    if (results.length < 3) {
      for (const tool of ALL_TOOLS) {
        if (!results.some((r) => r.toolName === tool.name)) {
          results.push({
            quote: tool.description.length > 100 ? tool.description.slice(0, 100) + "..." : tool.description,
            toolName: tool.name,
            category: tool.category,
          });
          if (results.length >= 3) break;
        }
      }
    }
    return results.slice(0, 3);
  }, []);

  const FeaturedIcon = featuredTool?.icon || Star;

  return (
    <div className="relative">
      {/* ========== HERO — 双栏布局 ========== */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 px-6">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2">
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-[#F0F4F8] tracking-tight leading-[1.05] mb-6">
              Find Enterprise Software That{" "}
              <span className="text-[#3B82F6]" style={{ textShadow: "0 0 40px rgba(59,130,246,0.3)" }}>
                Fits
              </span>
            </h1>
            <p className="text-lg md:text-xl text-[#8BA3BE] max-w-2xl mb-8 leading-relaxed">
              Compare, evaluate, and choose the right B2B solutions for your organization.
              {" "}We've curated <span className="text-[#3B82F6] font-bold">{ALL_TOOLS.length}</span> tools across{" "}
              <span className="text-[#3B82F6] font-bold">{CATEGORIES.length}</span> categories
            </p>
            <div className="w-full flex items-center relative max-w-[640px]">
              <div className="w-full flex items-center rounded-full border border-[#1E3A5F] bg-[#0F1D32] transition-all duration-300">
                <Search className="ml-5 w-5 h-5 text-[#4A6380] flex-shrink-0" />
                <input
                  type="search"
                  placeholder="搜索企业软件，按名称、分类或功能..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 py-4 px-3 bg-transparent text-[#F0F4F8] placeholder:text-[#4A6380] outline-none text-base"
                />
                <Link
                  href={filteredTools.length > 0 ? `/tools/${filteredTools[0].id}` : "/"}
                  className="mr-2 px-6 py-2.5 bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm font-medium rounded-full transition-colors flex-shrink-0"
                >
                  Search
                </Link>
              </div>
            </div>
          </div>

          {/* Right: Featured Tool Card */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-[#0F1D32] to-[#162440] border border-[#1E3A5F] rounded-2xl p-6 hover:border-[#3B82F6]/50 transition-all">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-[#F59E0B]" />
                <span className="text-xs font-semibold uppercase tracking-wider text-[#F59E0B]">Featured Solution</span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-[#162440] flex items-center justify-center">
                  <FeaturedIcon className="w-6 h-6 text-[#3B82F6]" />
                </div>
                <div>
                  <p className="text-base font-bold text-[#F0F4F8]">{featuredTool?.name}</p>
                  <p className="text-xs text-[#4A6380]">{featuredTool?.category}</p>
                </div>
              </div>
              <p className="text-sm text-[#8BA3BE] leading-relaxed line-clamp-2 mb-4">
                {featuredTool?.description}
              </p>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-[#162440] px-2.5 py-1.5 rounded-md">
                  <Star className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
                  <span className="text-sm font-bold text-[#F0F4F8]">{featuredTool?.rating}</span>
                </div>
                <Link
                  href={`/tools/${featuredTool?.id}`}
                  className="ml-auto text-sm text-[#3B82F6] hover:text-[#22D3EE] transition-colors flex items-center gap-1"
                >
                  View Details <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== COMPANY SIZE FILTER ========== */}
      <section className="relative pb-8 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="w-5 h-5 text-[#22D3EE]" />
            <h2 className="text-sm font-bold text-[#F0F4F8]">Filter by Company Size</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { key: null, label: "All Companies", icon: Briefcase },
              { key: "startup", label: "Startup (< 50)", icon: Users },
              { key: "mid", label: "Mid-Market (50-1000)", icon: Building2 },
              { key: "enterprise", label: "Enterprise (1000+)", icon: Building2 },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key || "all"}
                onClick={() => setCompanySize(key)}
                className={`px-4 py-2 rounded-full border text-sm transition-colors flex items-center gap-2 ${
                  companySize === key
                    ? "bg-[#22D3EE] text-[#0A1628] border-[#22D3EE] font-semibold"
                    : "bg-[#0F1D32] text-[#8BA3BE] border-[#1E3A5F] hover:text-[#F0F4F8] hover:border-[#2A5080]"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ========== HOT CATEGORIES — 5列紧凑卡片 ========== */}
      <section className="relative pb-16 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <Layers className="w-5 h-5 text-[#3B82F6]" />
            <h2 className="text-lg font-bold text-[#F0F4F8]">Popular Categories</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {topCategories.map(([cat, stats]) => {
              const CatIcon = getCategoryIcon(cat);
              return (
                <Link
                  key={cat}
                  href={`/category/${cat.toLowerCase().replace(/\s+/g, "-")}`}
                  className="group bg-[#0F1D32] border border-[#1E3A5F] rounded-xl p-4 hover:shadow-lg hover:shadow-[#3B82F6]/10 hover:border-[#2A5080] transition-all text-center"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#162440] flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                    <CatIcon className="w-5 h-5 text-[#3B82F6]" />
                  </div>
                  <p className="text-sm font-bold text-[#F0F4F8] group-hover:text-[#3B82F6] transition-colors truncate">{cat}</p>
                  <p className="text-xs text-[#4A6380] mt-1">{stats.count} tools · ★ {stats.avgRating}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== INDUSTRY SOLUTIONS ========== */}
      <section className="relative pb-16 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-[#22D3EE]" />
            <h2 className="text-lg font-bold text-[#F0F4F8]">Industry Solutions</h2>
          </div>
          <div className="space-y-4">
            {industrySolutions.map((solution) => (
              <div key={solution.name} className="bg-[#0F1D32] border border-[#1E3A5F] rounded-xl p-6 hover:border-[#2A5080] transition-all">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xl font-bold text-[#F0F4F8] mb-1">{solution.name}</h3>
                    <p className="text-sm text-[#8BA3BE] mb-3">{solution.toolCount} tools · Avg rating: {solution.avgRating}</p>
                    <div className="flex flex-wrap items-center gap-2">
                      {solution.top3.map((tool) => (
                        <Link
                          key={tool.id}
                          href={`/tools/${tool.id}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#162440] border border-[#1E3A5F] rounded-full text-xs font-medium text-[#F0F4F8] hover:text-[#3B82F6] hover:border-[#3B82F6] transition-colors"
                        >
                          <Star className="w-3 h-3 text-[#F59E0B] fill-[#F59E0B]" />
                          <span>{tool.name}</span>
                          <span className="text-[#4A6380]">{tool.rating}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <Link
                    href={`/category/${solution.name.toLowerCase().replace(/\s+/g, "-")}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm font-medium rounded-full transition-colors flex-shrink-0 whitespace-nowrap"
                  >
                    View Solutions <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== TOOLS FILTER GRID ========== */}
      <section className="relative pb-20 px-6" id="all-tools">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl md:text-[2rem] font-bold text-[#F0F4F8] tracking-tight">
                {selectedCategory ? `${selectedCategory} Tools` : "All Enterprise Tools"}
              </h2>
              <p className="text-[#8BA3BE] mt-1 text-base">{filteredTools.length} tool{filteredTools.length !== 1 ? "s" : ""} found</p>
            </div>
            <div className="w-full md:w-72 flex items-center rounded-full border border-[#1E3A5F] bg-[#0F1D32]">
              <Search className="ml-4 w-4 h-4 text-[#4A6380] flex-shrink-0" />
              <input
                type="search"
                placeholder="Filter tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 py-2.5 px-2 bg-transparent text-[#F0F4F8] placeholder:text-[#4A6380] outline-none text-sm"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => { setSelectedCategory(null); setSearchQuery(""); }}
              className={`px-4 py-1.5 rounded-full border text-sm transition-colors ${
                !selectedCategory
                  ? "bg-[#3B82F6] text-white border-[#3B82F6]"
                  : "bg-[#0F1D32] text-[#8BA3BE] border-[#1E3A5F] hover:text-[#F0F4F8] hover:border-[#2A5080]"
              }`}
            >All</button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                className={`px-4 py-1.5 rounded-full border text-sm transition-colors ${
                  selectedCategory === cat
                    ? "bg-[#3B82F6] text-white border-[#3B82F6]"
                    : "bg-[#0F1D32] text-[#8BA3BE] border-[#1E3A5F] hover:text-[#F0F4F8] hover:border-[#2A5080]"
                }`}
              >{cat}</button>
            ))}
          </div>

          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredTools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link href={`/tools/${tool.id}`} key={tool.id} className="group">
                    <article className="bg-[#0F1D32] border border-[#1E3A5F] rounded-xl p-5 hover:shadow-lg hover:shadow-[#3B82F6]/5 hover:border-[#2A5080] transition-all h-full flex flex-col">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-[#162440] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-5 h-5 text-[#3B82F6]" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-base font-bold text-[#F0F4F8] group-hover:text-[#3B82F6] transition-colors truncate">{tool.name}</h3>
                          <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-[#3B82F6]">{tool.category}</span>
                        </div>
                        <div className="flex items-center gap-1 bg-[#162440] px-2 py-1 rounded-md flex-shrink-0">
                          <Star className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]" />
                          <span className="text-xs font-bold text-[#F0F4F8]">{tool.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-[#8BA3BE] leading-relaxed line-clamp-1 flex-grow mb-4">{tool.description}</p>
                      <div className="flex items-center justify-between pt-3 border-t border-[#1E3A5F]">
                        <span className="text-xs text-[#3B82F6] font-semibold group-hover:text-[#22D3EE] transition-colors flex items-center">
                          View Details <ArrowRight className="ml-1 w-3.5 h-3.5" />
                        </span>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-lg text-[#8BA3BE]">No tools found matching your search.</p>
              <button
                onClick={() => { setSearchQuery(""); setSelectedCategory(null); }}
                className="mt-4 px-5 py-2 text-sm font-medium text-white bg-[#3B82F6] rounded-lg hover:bg-[#2563EB] transition-colors"
              >Clear Filters</button>
            </div>
          )}
        </div>
      </section>

      {/* ========== CUSTOMER TESTIMONIALS ========== */}
      <section className="relative pb-16 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <TrendingUp className="w-5 h-5 text-[#F59E0B]" />
            <h2 className="text-lg font-bold text-[#F0F4F8]">What Teams Are Saying</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((item, idx) => (
              <div key={idx} className="bg-[#0F1D32] border border-[#1E3A5F] rounded-xl p-6 flex flex-col">
                <svg className="w-8 h-8 text-[#3B82F6]/30 mb-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
                </svg>
                <p className="text-sm text-[#8BA3BE] leading-relaxed flex-grow mb-4 italic">&ldquo;{item.quote}&rdquo;</p>
                <div className="pt-3 border-t border-[#1E3A5F]">
                  <p className="text-sm font-semibold text-[#F0F4F8]">{item.toolName}</p>
                  <p className="text-xs text-[#4A6380]">{item.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== VENDOR COMPARISON CTA ========== */}
      <section className="relative pb-16 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-[#F59E0B]" />
            <h2 className="text-lg font-bold text-[#F0F4F8]">Compare Top Vendors</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {vendorPairs.map(({ category, tools }) => (
              <Link key={category} href={`/category/${category.toLowerCase().replace(/\s+/g, "-")}`} className="group">
                <div className="bg-gradient-to-br from-[#0F1D32] to-[#162440] border border-[#1E3A5F] rounded-xl p-6 hover:border-[#3B82F6]/50 transition-all">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#3B82F6] mb-3">{category}</p>
                  <div className="space-y-2">
                    {tools.map((tool, i) => {
                      const TIcon = tool.icon;
                      return (
                        <div key={tool.id} className="flex items-center gap-3 p-2 rounded-lg bg-[#162440]/50">
                          <span className="w-5 h-5 rounded-full bg-[#1E3A5F] flex items-center justify-center text-[10px] font-bold text-[#8BA3BE]">#{i + 1}</span>
                          <TIcon className="w-4 h-4 text-[#3B82F6]" />
                          <span className="text-sm font-medium text-[#F0F4F8] flex-1">{tool.name}</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-[#F59E0B] fill-[#F59E0B]" />
                            <span className="text-xs text-[#8BA3BE]">{tool.rating}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#1E3A5F] text-center">
                    <span className="text-sm text-[#3B82F6] group-hover:text-[#22D3EE] transition-colors flex items-center justify-center gap-1">
                      Compare All {category} Tools <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========== LATEST BLOG ========== */}
      <section className="relative pb-16 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#F59E0B]" />
              <h2 className="text-lg font-bold text-[#F0F4F8]">Latest Insights</h2>
            </div>
            <Link href="/blog" className="hidden md:flex items-center gap-1 text-sm text-[#3B82F6] hover:text-[#22D3EE] transition-colors">
              View All Posts <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <article className="bg-[#0F1D32] border border-[#1E3A5F] rounded-xl p-5 hover:shadow-lg hover:shadow-[#3B82F6]/5 hover:border-[#2A5080] transition-all h-full flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#3B82F6] bg-[#162440] px-2.5 py-1 rounded-md">{post.category}</span>
                    <span className="text-xs text-[#4A6380]">{post.readTime} min read</span>
                  </div>
                  <h3 className="font-bold text-[#F0F4F8] mb-2 group-hover:text-[#3B82F6] transition-colors leading-snug line-clamp-2 text-base">{post.title}</h3>
                  <p className="text-sm text-[#8BA3BE] leading-relaxed flex-grow line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#1E3A5F] text-xs text-[#4A6380]">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    <span className="mx-1">·</span>
                    {post.author}
                  </div>
                </article>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center md:hidden">
            <Link href="/blog" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0F1D32] border border-[#1E3A5F] rounded-full text-sm text-[#3B82F6] hover:text-[#22D3EE] transition-colors">
              View All Posts <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========== BOTTOM STATS ========== */}
      <section className="relative pb-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="bg-gradient-to-r from-[#0F1D32] to-[#162440] border border-[#1E3A5F] rounded-2xl p-8 md:p-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-3xl md:text-4xl font-extrabold text-[#F0F4F8]">{ALL_TOOLS.length}</p>
                <p className="text-sm text-[#8BA3BE] mt-1">Tools Reviewed</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-extrabold text-[#F0F4F8]">{BLOG_POSTS.length}</p>
                <p className="text-sm text-[#8BA3BE] mt-1">Expert Guides</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-extrabold text-[#F0F4F8]">{CATEGORIES.length}</p>
                <p className="text-sm text-[#8BA3BE] mt-1">Categories</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-extrabold text-[#F0F4F8]">{totalRatingSum.toFixed(0)}</p>
                <p className="text-sm text-[#8BA3BE] mt-1">Total Rating Score</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== VENDOR COMPARISON CTA ========== */}
      <section className="relative pb-16 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="bg-gradient-to-r from-[#0F1D32] to-[#162440] border border-[#1E3A5F] rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#F0F4F8] mb-4">Not Sure Which Software to Choose?</h2>
            <p className="text-[#8BA3BE] max-w-2xl mx-auto mb-6">Use our side-by-side comparison tool to evaluate features, pricing, and reviews.</p>
            <Link href="/best/enterprise-software" className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold rounded-full transition-colors">
              Start Comparing <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

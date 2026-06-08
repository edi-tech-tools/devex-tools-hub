"use client";

import { useMemo } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Star,
  BookOpen,
  Code2,
  Users,
  BarChart3,
  Shield,
  Quote,
  Clock,
  Cpu,
  ChevronRight,
} from "lucide-react";
import { ALL_TOOLS } from "@/data/tools";
import { BLOG_POSTS } from "@/data/blog-posts";
import { MotionProvider, m } from "@/lib/motion";
import { GradientMesh } from "@/components/motion/gradient-mesh";
import { LiquidGlass } from "@/components/motion/liquid-glass";
import { Reveal, StaggerReveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { NumberTicker } from "@/components/motion/number-ticker";

const COLORS = ["#00bcd4", "#a78bfa", "#f472b6"];

export default function HomePage() {
  const topTools = useMemo(
    () => [...ALL_TOOLS].sort((a: any, b: any) => b.rating - a.rating).slice(0, 6),
    []
  );

  const recentPosts = useMemo(
    () =>
      [...BLOG_POSTS]
        .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 3),
    []
  );

  const features = [
    { icon: Code2, title: "Smart Matching", desc: "AI matches tools to your tech stack, team size, and workflow." },
    { icon: Users, title: "Real Developer Reviews", desc: "Authentic feedback from thousands of verified engineers." },
    { icon: BarChart3, title: "Side-by-Side Comparison", desc: "Compare tools by features, pricing, and DX benchmarks." },
    { icon: Shield, title: "Unbiased Rankings", desc: "No sponsored placements — just honest, data-driven evaluations." },
  ];

  const testimonials = [
    { quote: "We used this to evaluate CI/CD platforms. The comparison tables saved us weeks of trial and error.", name: "Alex M.", role: "Senior DevOps Engineer" },
    { quote: "Finally a place that rates dev tools by actual DX, not just marketing hype.", name: "Priya K.", role: "Full-Stack Developer" },
    { quote: "The feature breakdown helped me justify our tooling choices to leadership.", name: "James T.", role: "Engineering Manager" },
  ];

  return (
    <MotionProvider>
      <div className="relative min-h-screen">
        {/* Background */}
        <GradientMesh colors={COLORS} intensity={0.06} />

        {/* Hero Section */}
        <section className="relative z-10 pt-28 pb-20 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <Reveal delay={0.1}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-8 card-liquid">
                <Cpu className="w-3.5 h-3.5" style={{ color: COLORS[0] }} />
                <span className="text-zinc-400">Built by developers, for developers</span>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 tracking-tight">
                Ship Better Software
                <br />
                <span className="text-gradient">
                  With the Right Dev Tools
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.35}>
              <p className="text-lg text-zinc-400 max-w-xl mx-auto mb-10 leading-relaxed">
                Unbiased reviews, detailed comparisons, and expert recommendations
                for developer tools — CI/CD, monitoring, version control, and more.
              </p>
            </Reveal>

            <Reveal delay={0.5}>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <Magnetic strength={12}>
                  <Link
                    href="/tools"
                    className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm overflow-hidden"
                    style={{ backgroundColor: COLORS[0], color: "#09090b" }}
                  >
                    Explore Top Tools
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </Magnetic>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold card-liquid hover:border-white/20 transition-all"
                  style={{ color: COLORS[1] }}
                >
                  Read Guides
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="relative z-10 px-6 py-14 border-t border-white/[0.04]">
          <div className="max-w-4xl mx-auto">
            <StaggerReveal stagger={0.1} delay={0.2}>
              <div className="grid grid-cols-3 gap-8">
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-white">
                    <NumberTicker value={ALL_TOOLS.length} suffix="+" />
                  </p>
                  <p className="text-sm text-zinc-500 mt-1">Tools Reviewed</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-gradient">
                    8K+
                  </p>
                  <p className="text-sm text-zinc-500 mt-1">Active Developers</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-white">
                    <NumberTicker value={BLOG_POSTS.length} suffix="+" />
                  </p>
                  <p className="text-sm text-zinc-500 mt-1">Expert Reviews</p>
                </div>
              </div>
            </StaggerReveal>
          </div>
        </section>

        {/* Top Tools Grid */}
        <section className="relative z-10 px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-3">Top-Rated Dev Tools</h2>
                <p className="text-zinc-400">Curated and ranked by our expert review team</p>
              </div>
            </Reveal>

            <StaggerReveal stagger={0.06} delay={0.15}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {topTools.map((tool: any, i: number) => (
                  <Reveal key={tool.id} delay={i * 0.05}>
                    <Link href={`/tools/${tool.id}`} className="block group">
                      <LiquidGlass
                        className="rounded-2xl p-5 h-full"
                        tint={COLORS[0]}
                        glow
                        sheen
                        noise
                        tilt
                        tiltIntensity={6}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          {i === 0 && (
                            <span
                              className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                              style={{ backgroundColor: COLORS[0], color: "#09090b" }}
                            >
                              #1 Pick
                            </span>
                          )}
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-zinc-400 border border-white/5">
                            {tool.category}
                          </span>
                        </div>
                        <h3 className="text-base font-semibold text-white group-hover:text-white/90 mb-1">{tool.name}</h3>
                        <p className="text-xs text-zinc-400 line-clamp-2 mb-4">{tool.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <Star className="w-4 h-4" style={{ color: COLORS[0], fill: COLORS[0] }} />
                            <span className="text-sm font-semibold text-white">{tool.rating}</span>
                            <span className="text-xs text-zinc-500">({tool.reviewCount || 0})</span>
                          </div>
                          <span className="text-xs text-zinc-400">{tool.pricing || "Free"}</span>
                        </div>
                      </LiquidGlass>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </StaggerReveal>
          </div>
        </section>

        {/* Features */}
        <section className="relative z-10 px-6 py-20 border-t border-white/[0.04]">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Why DevEx Tools?</h2>
            </Reveal>
            <StaggerReveal stagger={0.08} delay={0.2}>
              <div className="grid md:grid-cols-4 gap-5">
                {features.map((feat, i) => (
                  <Reveal key={i} delay={i * 0.08}>
                    <LiquidGlass className="rounded-2xl p-6 text-center h-full" intensity="subtle" tint={COLORS[i % 3]} sheen>
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                        style={{ backgroundColor: `${COLORS[i % 3]}15` }}
                      >
                        <feat.icon className="w-5 h-5" style={{ color: COLORS[i % 3] }} />
                      </div>
                      <h3 className="font-semibold text-white mb-1.5">{feat.title}</h3>
                      <p className="text-sm text-zinc-400 leading-relaxed">{feat.desc}</p>
                    </LiquidGlass>
                  </Reveal>
                ))}
              </div>
            </StaggerReveal>
          </div>
        </section>

        {/* Testimonials */}
        <section className="relative z-10 px-6 py-20">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">What Developers Say</h2>
            </Reveal>
            <StaggerReveal stagger={0.1} delay={0.2}>
              <div className="grid md:grid-cols-3 gap-5">
                {testimonials.map((t, i) => (
                  <Reveal key={i} delay={i * 0.1}>
                    <LiquidGlass className="rounded-2xl p-6" intensity="subtle" tint={COLORS[i]} sheen>
                      <Quote className="w-5 h-5 mb-3" style={{ color: `${COLORS[i]}60` }} />
                      <p className="text-sm text-zinc-300 leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
                      <div>
                        <p className="text-sm font-semibold text-white">{t.name}</p>
                        <p className="text-xs text-zinc-500">{t.role}</p>
                      </div>
                    </LiquidGlass>
                  </Reveal>
                ))}
              </div>
            </StaggerReveal>
          </div>
        </section>

        {/* Latest Blog Posts */}
        {recentPosts.length > 0 && (
          <section className="relative z-10 px-6 py-20 border-t border-white/[0.04]">
            <div className="max-w-6xl mx-auto">
              <Reveal>
                <div className="flex items-center justify-between mb-10">
                  <h2 className="text-xl md:text-2xl font-bold">Latest from Our Blog</h2>
                  <Link
                    href="/blog"
                    className="text-sm flex items-center gap-1 font-medium transition-colors"
                    style={{ color: COLORS[0] }}
                  >
                    View all <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </Reveal>
              <StaggerReveal stagger={0.08} delay={0.15}>
                <div className="grid md:grid-cols-3 gap-5">
                  {recentPosts.map((post: any, i: number) => (
                    <Reveal key={post.slug || i} delay={i * 0.08}>
                      <Link href={`/blog/${post.slug}`} className="block group">
                        <LiquidGlass
                          className="rounded-2xl p-5 h-full"
                          tint={COLORS[0]}
                          sheen
                          noise
                          tilt
                          tiltIntensity={4}
                        >
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-zinc-400 border border-white/5">
                            {post.category || "Article"}
                          </span>
                          <h3 className="text-sm font-semibold text-white mt-3 mb-2 line-clamp-2 group-hover:text-white/80 transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-xs text-zinc-400 line-clamp-2 mb-3">{post.excerpt}</p>
                          <div className="flex items-center gap-2 text-[10px] text-zinc-500">
                            <span>{post.date}</span>
                            <span>·</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {post.readTime || 3} min
                            </span>
                          </div>
                        </LiquidGlass>
                      </Link>
                    </Reveal>
                  ))}
                </div>
              </StaggerReveal>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="relative z-10 px-6 py-24">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal>
              <LiquidGlass
                className="rounded-3xl p-10 md:p-14"
                intensity="heavy"
                tint={COLORS[0]}
                glow
                sheen
                noise
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-3">Stay Updated</h2>
                <p className="text-zinc-400 mb-8 max-w-md mx-auto">
                  Get the latest dev tool reviews and engineering insights delivered to your inbox.
                </p>
                <div className="flex max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-1 px-4 py-3 rounded-l-xl bg-white/5 border border-white/10 text-sm outline-none text-white placeholder-zinc-500 focus:border-white/20 transition-colors"
                  />
                  <Magnetic strength={8}>
                    <button
                      className="px-6 py-3 rounded-r-xl text-sm font-semibold transition-all hover:brightness-110"
                      style={{ backgroundColor: COLORS[0], color: "#09090b" }}
                    >
                      Subscribe
                    </button>
                  </Magnetic>
                </div>
              </LiquidGlass>
            </Reveal>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-10 border-t border-white/[0.04] px-6 py-8">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5" style={{ color: COLORS[0] }} />
              <span className="text-sm font-semibold text-white">DevEx Tools</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-zinc-500">
              <Link href="/about" className="hover:text-zinc-300 transition-colors">About</Link>
              <Link href="/privacy" className="hover:text-zinc-300 transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-zinc-300 transition-colors">Terms</Link>
              <Link href="/contact" className="hover:text-zinc-300 transition-colors">Contact</Link>
            </div>
            <p className="text-xs text-zinc-600">&copy; 2026 DevEx Tools. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </MotionProvider>
  );
}

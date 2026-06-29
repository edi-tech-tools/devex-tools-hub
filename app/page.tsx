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
  GitBranch,
  Bot,
} from "lucide-react";
import { ALL_TOOLS } from "@/data/tools";
import { BLOG_POSTS } from "@/data/blog-posts";
import { MotionProvider, m } from "@/lib/motion";
import { GradientMesh } from "@/components/motion/gradient-mesh";
import { LiquidGlass } from "@/components/motion/liquid-glass";
import { Reveal, StaggerReveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { NumberTicker } from "@/components/motion/number-ticker";

const COLORS = ["#06b6d4", "#a78bfa", "#f472b6"];

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
    { icon: Bot, title: "Robotics-Grade Testing", desc: "Tools vetted by our Stuttgart robotics team — real CI/CD, real hardware-in-the-loop." },
    { icon: GitBranch, title: "DevOps-First Reviews", desc: "Infrastructure-as-code, pipeline optimization, and reproducibility at scale." },
    { icon: Users, title: "6-Person Engineering Team", desc: "DevEx Tools Team is a tight-knit crew of 6. Every review reflects hands-on experience." },
    { icon: Shield, title: "No Sponsored Rankings", desc: "Zero paid placements. Just honest evaluations from practicing engineers." },
  ];

  const testimonials = [
    { quote: "DevEx Tools Team actually knows what they're talking about. Their CI/CD breakdowns are the most practical I've seen.", name: "Alex M.", role: "Senior DevOps Engineer" },
    { quote: "Finally a dev tools site run by people who build for a living — not marketing teams.", name: "Priya K.", role: "Full-Stack Developer" },
    { quote: "The robotics angle makes their performance benchmarks uniquely thorough. Real-world data, not synthetic.", name: "James T.", role: "Engineering Manager" },
  ];

  return (
    <MotionProvider>
      <div className="relative min-h-screen bg-[#020617]">
        {/* Background */}
        <GradientMesh colors={COLORS} intensity={0.05} />

        {/* Header */}
        <header className="relative z-10 border-b border-white/[0.04] px-6 py-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#06b6d4] to-[#a78bfa] flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-bold text-white tracking-tight">
                Isle<span className="text-[#06b6d4]">Works</span>
                <span className="text-[10px] text-[#64748b] font-normal ml-2">DevEx</span>
              </span>
            </Link>
            <nav className="flex items-center gap-6 text-xs text-[#94a3b8]">
              <Link href="/tools" className="hover:text-white transition-colors">Tools</Link>
              <Link href="/about" className="hover:text-white transition-colors">About</Link>
              <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
              <Link
                href="/contact"
                className="px-4 py-2 rounded-lg bg-[#1e293b] border border-white/[0.06] text-white hover:bg-[#334155] transition-all text-xs font-medium"
              >
                Contact
              </Link>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative z-10 pt-24 pb-16 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <Reveal delay={0.1}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-8 bg-[#1e293b]/80 border border-white/[0.06]">
                <Cpu className="w-3.5 h-3.5 text-[#06b6d4]" />
                <span className="text-[#94a3b8]">Built by DevEx Tools Team — Stuttgart, Germany</span>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 tracking-tight">
                Dev Tools That
                <br />
                <span className="text-gradient">
                  Actually Ship
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.35}>
              <p className="text-lg text-[#94a3b8] max-w-xl mx-auto mb-10 leading-relaxed">
                Honest reviews and data-driven comparisons from a robotics & DevOps
                team that uses these tools every day. No filler, no sponsorships.
              </p>
            </Reveal>

            <Reveal delay={0.5}>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <Magnetic strength={12}>
                  <Link
                    href="/tools"
                    className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm overflow-hidden"
                    style={{ backgroundColor: COLORS[0], color: "#020617" }}
                  >
                    Explore Top Tools
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </Magnetic>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold bg-[#1e293b]/80 border border-white/[0.06] text-[#94a3b8] hover:border-white/20 hover:text-white transition-all"
                >
                  Meet the Team
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="relative z-10 px-6 py-12 border-t border-white/[0.04]">
          <div className="max-w-4xl mx-auto">
            <StaggerReveal stagger={0.1} delay={0.2}>
              <div className="grid grid-cols-3 gap-8">
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-white">
                    <NumberTicker value={ALL_TOOLS.length} suffix="+" />
                  </p>
                  <p className="text-sm text-[#64748b] mt-1">Tools Reviewed</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-gradient">
                    8K+
                  </p>
                  <p className="text-sm text-[#64748b] mt-1">Active Developers</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-white">
                    <NumberTicker value={BLOG_POSTS.length} suffix="+" />
                  </p>
                  <p className="text-sm text-[#64748b] mt-1">Expert Reviews</p>
                </div>
              </div>
            </StaggerReveal>
          </div>
        </section>

        {/* Top Tools Grid */}
        <section className="relative z-10 px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-3">Top-Rated Dev Tools</h2>
                <p className="text-[#94a3b8]">Curated and ranked by the DevEx Tools Team</p>
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
                              style={{ backgroundColor: COLORS[0], color: "#020617" }}
                            >
                              #1 Pick
                            </span>
                          )}
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-[#94a3b8] border border-white/5">
                            {tool.category}
                          </span>
                        </div>
                        <h3 className="text-base font-semibold text-white group-hover:text-white/90 mb-1">{tool.name}</h3>
                        <p className="text-xs text-[#94a3b8] line-clamp-2 mb-4">{tool.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <Star className="w-4 h-4" style={{ color: COLORS[0], fill: COLORS[0] }} />
                            <span className="text-sm font-semibold text-white">{tool.rating}</span>
                            <span className="text-xs text-[#64748b]">({tool.reviewCount || 0})</span>
                          </div>
                          <span className="text-xs text-[#94a3b8]">{tool.pricing || "Free"}</span>
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
        <section className="relative z-10 px-6 py-16 border-t border-white/[0.04]">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Why DevEx Tools Team Reviews?</h2>
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
                      <p className="text-sm text-[#94a3b8] leading-relaxed">{feat.desc}</p>
                    </LiquidGlass>
                  </Reveal>
                ))}
              </div>
            </StaggerReveal>
          </div>
        </section>

        {/* Testimonials */}
        <section className="relative z-10 px-6 py-16">
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
                      <p className="text-sm text-[#cbd5e1] leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
                      <div>
                        <p className="text-sm font-semibold text-white">{t.name}</p>
                        <p className="text-xs text-[#64748b]">{t.role}</p>
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
          <section className="relative z-10 px-6 py-16 border-t border-white/[0.04]">
            <div className="max-w-6xl mx-auto">
              <Reveal>
                <div className="flex items-center justify-between mb-10">
                  <h2 className="text-xl md:text-2xl font-bold">Latest Reviews</h2>
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
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-[#94a3b8] border border-white/5">
                            {post.category || "Article"}
                          </span>
                          <h3 className="text-sm font-semibold text-white mt-3 mb-2 line-clamp-2 group-hover:text-white/80 transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-xs text-[#94a3b8] line-clamp-2 mb-3">{post.excerpt}</p>
                          <div className="flex items-center gap-2 text-[10px] text-[#64748b]">
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
        <section className="relative z-10 px-6 py-20">
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
                <h2 className="text-2xl md:text-3xl font-bold mb-3">Stay in the Loop</h2>
                <p className="text-[#94a3b8] mb-8 max-w-md mx-auto">
                  Get dev tool deep-dives and engineering insights from the DevEx Tools Team, delivered monthly.
                </p>
                <div className="flex max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-1 px-4 py-3 rounded-l-xl bg-white/5 border border-white/10 text-sm outline-none text-white placeholder-[#64748b] focus:border-white/20 transition-colors"
                  />
                  <Magnetic strength={8}>
                    <button
                      className="px-6 py-3 rounded-r-xl text-sm font-semibold transition-all hover:brightness-110"
                      style={{ backgroundColor: COLORS[0], color: "#020617" }}
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
              <Bot className="w-5 h-5 text-[#06b6d4]" />
              <span className="text-sm font-semibold text-white">DevEx Tools Team</span>
              <span className="text-[10px] text-[#64748b]">DevEx</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-[#64748b]">
              <Link href="/about" className="hover:text-white transition-colors">About</Link>
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            </div>
            <p className="text-xs text-[#475569]">&copy; 2026 DevEx Tools Team — Stuttgart, Germany. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </MotionProvider>
  );
}

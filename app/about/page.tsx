import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Users, Cpu, GitBranch, Linkedin, Code2, Server, TestTubes } from "lucide-react";

export const metadata: Metadata = {
  title: "About — Isle Works DevEx",
  description:
    "Isle Works is a Stuttgart-based engineering studio specializing in robotics and DevOps. Meet the 6-person team behind DevEx tool reviews.",
};

const TEAM = [
  {
    name: "Erik Petit",
    role: "CEO & Founder",
    initials: "EP",
    bio: "Former robotics lead at Bosch Rexroth. Erik founded Isle Works to bridge the gap between hardware-in-the-loop testing and modern DevOps practices. He oversees the review methodology and technical direction.",
  },
  {
    name: "Scarlett Ramirez",
    role: "CTO",
    initials: "SR",
    bio: "Ex-Platform Engineering at Mercedes-Benz R&D. Scarlett architectured CI/CD pipelines for autonomous vehicle simulation stacks. She leads infrastructure tool comparisons and performance benchmarking.",
  },
  {
    name: "Giulia Smit",
    role: "Frontend Engineer",
    initials: "GS",
    bio: "Giulia brings 8 years of React and TypeScript experience from fintech and SaaS startups. She ensures every tool review reflects real frontend development workflows and DX quality.",
  },
  {
    name: "Marcus Chen",
    role: "DevOps Engineer",
    initials: "MC",
    bio: "Kubernetes and infrastructure-as-code specialist. Marcus has deployed and operated over 50 production clusters across cloud and on-prem environments. He writes our CI/CD and container orchestration reviews.",
  },
  {
    name: "Lea Wagner",
    role: "Robotics Software Engineer",
    initials: "LW",
    bio: "Lea specializes in real-time systems and ROS 2 tooling. She evaluates developer tools through the lens of deterministic performance and hardware-software integration — critical for robotics stacks.",
  },
  {
    name: "Tomás Silva",
    role: "QA & Test Automation Lead",
    initials: "TS",
    bio: "Tomás built test infrastructure for autonomous drone navigation systems. He brings obsessive attention to test framework ergonomics, flaky test detection, and CI reliability metrics.",
  },
];

const EXPERTISE = [
  { icon: Cpu, title: "Robotics", desc: "Hardware-in-the-loop testing, ROS 2, real-time systems, sensor integration" },
  { icon: GitBranch, title: "DevOps", desc: "CI/CD pipelines, GitOps, infrastructure-as-code, Kubernetes, observability" },
  { icon: Code2, title: "Full-Stack Engineering", desc: "React, TypeScript, Node.js, microservices, API design, developer experience" },
  { icon: Server, title: "Platform Engineering", desc: "Cloud infrastructure, edge computing, on-prem deployments, container orchestration" },
];

export default function AboutPage() {
  return (
    <div className="relative bg-[#020617] min-h-screen">
      {/* Header - reused from home */}
      <header className="relative z-10 border-b border-white/[0.04] px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#06b6d4] to-[#a78bfa] flex items-center justify-center">
              <Cpu className="w-4 h-4 text-white" />
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

      <div className="relative pt-20 pb-20 px-6">
        <div className="max-w-[900px] mx-auto">
          {/* Intro */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-6 bg-[#1e293b]/80 border border-white/[0.06]">
              <Users className="w-3.5 h-3.5 text-[#06b6d4]" />
              <span className="text-[#94a3b8]">Team of 6 · Stuttgart, Germany</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6">
              Built by Engineers,{" "}
              <span className="text-gradient">for Engineers</span>
            </h1>
            <p className="text-lg text-[#94a3b8] leading-relaxed max-w-2xl mx-auto">
              Isle Works is a Stuttgart-based engineering studio specializing in robotics and DevOps.
              We review developer tools the way we wish someone had reviewed them for us — with
              rigorous benchmarks, honest tradeoffs, and zero sponsor bias.
            </p>
          </div>

          {/* Our Story */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">Our Story</h2>
            <div className="space-y-4 text-[#94a3b8] leading-relaxed">
              <p>
                Isle Works started in a small workshop in Stuttgart&apos;s Innovation Park in 2023.
                Erik Petit and Scarlett Ramirez had spent years building robotics platforms and the
                infrastructure to support them — and kept running into the same problem: there was
                no trustworthy resource for comparing developer tools from an engineering perspective.
              </p>
              <p>
                Review sites were either pay-to-play or written by people who had never deployed a
                Kubernetes cluster on actual hardware. Pricing was hidden. Feature comparisons were
                shallow. Developer experience — the actual feel of using a tool day in, day out — was
                never discussed.
              </p>
              <p>
                So they built their own. What started as an internal wiki for tool evaluations grew
                into DevEx, a public resource maintained by the full Isle Works team of six. Every
                review on this site represents real hours spent with the tool — benchmarking,
                breaking, and rebuilding.
              </p>
              <p>
                We don&apos;t accept sponsorship or paid placements. Our revenue comes from a small
                affiliate program on listed tools and occasional consulting for engineering teams
                that want to optimize their toolchains. That&apos;s it.
              </p>
            </div>
          </div>

          {/* Expertise */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Our Expertise</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {EXPERTISE.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="bg-[#1e293b]/60 border border-white/[0.06] rounded-xl p-6 hover:bg-[#1e293b]/80 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#06b6d4]/10 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-[#06b6d4]" />
                    </div>
                    <h3 className="text-base font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-sm text-[#94a3b8]">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Team */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Meet the Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {TEAM.map((member) => (
                <div
                  key={member.name}
                  className="bg-[#1e293b]/60 border border-white/[0.06] rounded-xl p-5 hover:bg-[#1e293b]/80 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#06b6d4] to-[#a78bfa] flex items-center justify-center text-white font-bold text-sm">
                      {member.initials}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">{member.name}</h3>
                      <p className="text-xs text-[#06b6d4]">{member.role}</p>
                    </div>
                  </div>
                  <p className="text-xs text-[#94a3b8] leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Location & CTA */}
          <div className="mb-16">
            <div className="bg-[#1e293b]/60 border border-white/[0.06] rounded-xl p-8 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-[#06b6d4]" />
                <span className="text-sm text-[#94a3b8]">Stuttgart Innovation Park, Germany</span>
              </div>
              <h2 className="text-xl font-bold text-white mb-4">Want to work with us?</h2>
              <p className="text-[#94a3b8] mb-6 max-w-lg mx-auto text-sm">
                We&apos;re available for toolchain consulting, infrastructure audits, and
                custom DevOps automation. Reach out — we&apos;d love to chat.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="px-6 py-3 bg-[#06b6d4] hover:bg-[#0891b2] text-[#020617] font-medium rounded-lg transition-colors text-sm"
                >
                  Contact Us
                </Link>
                <a
                  href="mailto:hello@isleworks.dev"
                  className="px-6 py-3 border border-white/[0.1] hover:border-white/20 text-[#94a3b8] hover:text-white font-medium rounded-lg transition-all text-sm"
                >
                  hello@isleworks.dev
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.04] px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-[#06b6d4]" />
            <span className="text-sm font-semibold text-white">Isle Works</span>
            <span className="text-[10px] text-[#64748b]">DevEx</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-[#64748b]">
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
          <p className="text-xs text-[#475569]">&copy; 2026 Isle Works — Stuttgart, Germany. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

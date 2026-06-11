"use client";

import { useState } from "react";
import { Mail, MapPin, Clock, Send, Cpu } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="relative bg-[#020617] min-h-screen">
      {/* Header */}
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
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-6 bg-[#1e293b]/80 border border-white/[0.06]">
              <Mail className="w-3.5 h-3.5 text-[#06b6d4]" />
              <span className="text-[#94a3b8]">Get in touch</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
              Contact Isle Works
            </h1>
            <p className="text-lg text-[#94a3b8] max-w-xl mx-auto">
              Have a question about a tool review, want to suggest a tool for evaluation,
              or interested in our consulting services? We&apos;d love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-[1000px] mx-auto">
            <div className="lg:col-span-2">
              <div className="bg-[#1e293b]/60 border border-white/[0.06] rounded-xl p-8">
                <h2 className="text-xl font-bold text-white mb-6">Send Us a Message</h2>

                {submitted ? (
                  <div className="bg-[#1e293b] border border-[#06b6d4]/30 rounded-lg p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-[#06b6d4]/10 flex items-center justify-center mx-auto mb-3">
                      <Send className="w-6 h-6 text-[#06b6d4]" />
                    </div>
                    <p className="text-white font-semibold text-lg mb-1">Message Sent!</p>
                    <p className="text-[#94a3b8] text-sm">
                      Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-[#94a3b8] mb-1.5">
                          Your Name
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 bg-[#0f172a] border border-white/[0.08] rounded-lg text-white placeholder:text-[#64748b] focus:border-[#06b6d4] focus:outline-none transition-colors"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#94a3b8] mb-1.5">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 bg-[#0f172a] border border-white/[0.08] rounded-lg text-white placeholder:text-[#64748b] focus:border-[#06b6d4] focus:outline-none transition-colors"
                          placeholder="you@company.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#94a3b8] mb-1.5">
                        Subject
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        required
                        className="w-full px-4 py-3 bg-[#0f172a] border border-white/[0.08] rounded-lg text-white focus:border-[#06b6d4] focus:outline-none transition-colors"
                      >
                        <option value="">Select a subject...</option>
                        <option value="general">General Inquiry</option>
                        <option value="tool-suggestion">Suggest a Tool</option>
                        <option value="bug">Report an Issue</option>
                        <option value="consulting">Consulting Inquiry</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#94a3b8] mb-1.5">
                        Message
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 bg-[#0f172a] border border-white/[0.08] rounded-lg text-white placeholder:text-[#64748b] focus:border-[#06b6d4] focus:outline-none transition-colors resize-none"
                        placeholder="Tell us what&apos;s on your mind..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-3 bg-[#06b6d4] hover:bg-[#0891b2] text-[#020617] font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>

            <div className="space-y-5">
              <div className="bg-[#1e293b]/60 border border-white/[0.06] rounded-xl p-6">
                <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#06b6d4]" />
                  Email Us
                </h3>
                <div className="space-y-3">
                  <p className="text-sm text-[#94a3b8]">
                    <strong className="text-white">General:</strong>
                    <br />
                    <a href="mailto:hello@isleworks.dev" className="text-[#06b6d4] hover:underline">
                      hello@isleworks.dev
                    </a>
                  </p>
                  <p className="text-sm text-[#94a3b8]">
                    <strong className="text-white">Consulting:</strong>
                    <br />
                    <a href="mailto:consulting@isleworks.dev" className="text-[#06b6d4] hover:underline">
                      consulting@isleworks.dev
                    </a>
                  </p>
                </div>
              </div>

              <div className="bg-[#1e293b]/60 border border-white/[0.06] rounded-xl p-6">
                <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#06b6d4]" />
                  Studio
                </h3>
                <p className="text-sm text-[#94a3b8] leading-relaxed">
                  Stuttgart Innovation Park
                  <br />
                  Universitätsstraße 38
                  <br />
                  70569 Stuttgart, Germany
                </p>
              </div>

              <div className="bg-[#1e293b]/60 border border-white/[0.06] rounded-xl p-6">
                <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#06b6d4]" />
                  Response Time
                </h3>
                <p className="text-sm text-[#94a3b8]">
                  We typically respond within <strong className="text-white">24 hours</strong> during
                  business days (CET/CEST).
                </p>
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

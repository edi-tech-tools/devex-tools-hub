"use client";

import { useState } from "react";
import type { Metadata } from "next";
import { Mail, MapPin, Clock, Send } from "lucide-react";

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
    // In production, this would send to an API endpoint
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="relative pt-32 pb-20 px-6">
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#3B82F6] bg-[#162440] px-3 py-1.5 rounded-md mb-4">
            Contact
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#F0F4F8] tracking-tight mb-3">
            Get in Touch
          </h1>
          <p className="text-lg text-[#8BA3BE] max-w-xl mx-auto">
            Have a question, suggestion, or want to list your tool? We&apos;d love to
            hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-[1000px] mx-auto">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-[#0F1D32] border border-[#1E3A5F] rounded-xl p-8">
              <h2 className="text-xl font-bold text-[#F0F4F8] mb-6">Send Us a Message</h2>

              {submitted ? (
                <div className="bg-[#162440] border border-[#22D3EE]/30 rounded-lg p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#22D3EE]/10 flex items-center justify-center mx-auto mb-3">
                    <Send className="w-6 h-6 text-[#22D3EE]" />
                  </div>
                  <p className="text-[#F0F4F8] font-semibold text-lg mb-1">Message Sent!</p>
                  <p className="text-[#8BA3BE] text-sm">
                    Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-[#8BA3BE] mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-[#0A1628] border border-[#1E3A5F] rounded-lg text-[#F0F4F8] placeholder:text-[#4A6380] focus:border-[#3B82F6] focus:outline-none transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#8BA3BE] mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-[#0A1628] border border-[#1E3A5F] rounded-lg text-[#F0F4F8] placeholder:text-[#4A6380] focus:border-[#3B82F6] focus:outline-none transition-colors"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#8BA3BE] mb-1.5">
                      Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-[#0A1628] border border-[#1E3A5F] rounded-lg text-[#F0F4F8] focus:border-[#3B82F6] focus:outline-none transition-colors"
                    >
                      <option value="">Select a subject...</option>
                      <option value="general">General Inquiry</option>
                      <option value="tool-listing">List My Tool</option>
                      <option value="bug">Report a Bug</option>
                      <option value="suggestion">Feature Suggestion</option>
                      <option value="advertising">Advertising / Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#8BA3BE] mb-1.5">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-[#0A1628] border border-[#1E3A5F] rounded-lg text-[#F0F4F8] placeholder:text-[#4A6380] focus:border-[#3B82F6] focus:outline-none transition-colors resize-none"
                      placeholder="Tell us how we can help..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-5">
            <div className="bg-[#0F1D32] border border-[#1E3A5F] rounded-xl p-6">
              <h3 className="text-sm font-semibold text-[#F0F4F8] mb-4 flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#3B82F6]" />
                Email Us
              </h3>
              <div className="space-y-2">
                <p className="text-sm text-[#8BA3BE]">
                  <strong className="text-[#F0F4F8]">Support:</strong>
                  <br />
                  <a href="mailto:support@b2b-software.net" className="text-[#3B82F6] hover:underline">
                    support@b2b-software.net
                  </a>
                </p>
                <p className="text-sm text-[#8BA3BE]">
                  <strong className="text-[#F0F4F8]">General:</strong>
                  <br />
                  <a href="mailto:info@b2b-software.net" className="text-[#3B82F6] hover:underline">
                    info@b2b-software.net
                  </a>
                </p>
                <p className="text-sm text-[#8BA3BE]">
                  <strong className="text-[#F0F4F8]">Press:</strong>
                  <br />
                  <a href="mailto:info@b2b-software.net" className="text-[#3B82F6] hover:underline">
                    info@b2b-software.net
                  </a>
                </p>
              </div>
            </div>

            <div className="bg-[#0F1D32] border border-[#1E3A5F] rounded-xl p-6">
              <h3 className="text-sm font-semibold text-[#F0F4F8] mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#3B82F6]" />
                Office
              </h3>
              <p className="text-sm text-[#8BA3BE] leading-relaxed">
                548 Market Street, Suite 19530
                <br />
                San Francisco, CA 94104
                <br />
                United States
              </p>
            </div>

            <div className="bg-[#0F1D32] border border-[#1E3A5F] rounded-xl p-6">
              <h3 className="text-sm font-semibold text-[#F0F4F8] mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#3B82F6]" />
                Response Time
              </h3>
              <p className="text-sm text-[#8BA3BE]">
                We typically respond within <strong className="text-[#F0F4F8]">24 hours</strong> during
                business days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

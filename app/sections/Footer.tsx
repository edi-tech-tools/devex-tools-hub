"use client";
import { Sparkles, Github, Twitter, Linkedin } from 'lucide-react';
import Link from 'next/link';

interface FooterLink {
  name: string;
  href: string;
}

const FOOTER_LINKS: Record<string, FooterLink[]> = {
  Product: [
    { name: 'Browse Tools', href: '/' },
    { name: 'Categories', href: '/' },
    { name: 'Comparisons', href: '/' },
    { name: 'API Access', href: '/' },
  ],
  Company: [
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '#' },
    { name: 'Press Kit', href: '#' },
  ],
  Resources: [
    { name: 'Documentation', href: '/' },
    { name: 'Help Center', href: '/contact' },
    { name: 'Community', href: '#' },
    { name: 'Status', href: '#' },
  ],
  Legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Affiliate Disclosure', href: '/disclosure' },
    { name: 'Cookie Policy', href: '/privacy' },
  ],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-[#1E3A5F] bg-[#0A1628]">
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
          {/* Brand Column */}
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0D9488] to-[#14B8A6] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-[#F0F4F8]">DevEx Hub</span>
            </Link>
            <p className="text-sm text-[#8BA3BE] leading-relaxed mb-6">
              The most comprehensive directory of developer tools. Discover, compare, and integrate the best tools for your engineering workflow.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-[#0F1D32] border border-[#1E3A5F] flex items-center justify-center text-[#8BA3BE] hover:text-[#0D9488] hover:border-[#2A5080] transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-[#0F1D32] border border-[#1E3A5F] flex items-center justify-center text-[#8BA3BE] hover:text-[#0D9488] hover:border-[#2A5080] transition-all">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-[#0F1D32] border border-[#1E3A5F] flex items-center justify-center text-[#8BA3BE] hover:text-[#0D9488] hover:border-[#2A5080] transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Link Columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(FOOTER_LINKS).map(([title, links]) => (
              <div key={title}>
                <h4 className="text-sm font-semibold text-[#F0F4F8] mb-4">{title}</h4>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-[#8BA3BE] hover:text-[#0D9488] transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#1E3A5F] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#4A6380]">
            &copy; {new Date().getFullYear()} DevEx Tools Hub. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-sm text-[#4A6380] hover:text-[#8BA3BE] transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-[#4A6380] hover:text-[#8BA3BE] transition-colors">
              Terms
            </Link>
            <a href="#" className="text-sm text-[#4A6380] hover:text-[#8BA3BE] transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

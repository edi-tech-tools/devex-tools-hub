"use client";
import { motion } from 'framer-motion';
import { Star, ArrowRight, BarChart3, ShieldCheck, MessageSquare, Users, CreditCard, Briefcase } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  description: string;
  icon: LucideIcon;
  pricing: string;
}

const FEATURED_TOOLS: Tool[] = [
  {
    id: 'tool-1',
    name: 'DataMetrics Pro',
    category: 'Analytics',
    rating: 4.9,
    reviews: 128,
    description: 'Advanced enterprise analytics platform with real-time predictive modeling.',
    icon: BarChart3,
    pricing: 'From $99/mo',
  },
  {
    id: 'tool-2',
    name: 'SecureGuard CRM',
    category: 'CRM & Sales',
    rating: 4.8,
    reviews: 342,
    description: 'End-to-end encrypted customer relationship management for finance teams.',
    icon: ShieldCheck,
    pricing: 'Contact Sales',
  },
  {
    id: 'tool-3',
    name: 'TeamSync Hub',
    category: 'Collaboration',
    rating: 4.7,
    reviews: 89,
    description: 'Unified communication and project management suite for remote teams.',
    icon: MessageSquare,
    pricing: 'Freemium',
  },
  {
    id: 'tool-4',
    name: 'HR TalentFlow',
    category: 'Human Resources',
    rating: 4.6,
    reviews: 215,
    description: 'Automated recruitment, onboarding, and payroll management system.',
    icon: Users,
    pricing: 'From $49/mo',
  },
  {
    id: 'tool-5',
    name: 'PayStream API',
    category: 'Finance',
    rating: 4.9,
    reviews: 512,
    description: 'Global B2B payment gateway API with built-in fraud prevention.',
    icon: CreditCard,
    pricing: 'Pay-as-you-go',
  },
  {
    id: 'tool-6',
    name: 'BizOps Flow',
    category: 'Operations',
    rating: 4.5,
    reviews: 76,
    description: 'No-code workflow automation specifically designed for operational efficiency.',
    icon: Briefcase,
    pricing: 'From $199/mo',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
  },
};

export default function FeaturedTools() {
  return (
    <section id="featured" className="relative py-20 px-6">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-10"
        >
          <div>
            <h2 className="text-2xl md:text-[2rem] font-bold text-[#F0F4F8] tracking-tight">
              Featured SaaS Solutions
            </h2>
            <p className="text-[#8BA3BE] mt-1 text-base">
              Hand-picked tools highly rated by enterprise users.
            </p>
          </div>
          <a
            href="#categories"
            className="hidden sm:flex items-center gap-1 text-[#3B82F6] hover:text-[#22D3EE] font-medium text-sm transition-colors"
          >
            View All Categories
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {FEATURED_TOOLS.map((tool) => {
            const Icon = tool.icon;
            return (
              <motion.article
                key={tool.id}
                variants={cardVariants}
                className="group bg-[#0F1D32] border border-[#1E3A5F] rounded-xl p-6 card-hover cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-[#162440] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-[#3B82F6]" />
                  </div>
                  <div className="flex items-center gap-1 bg-[#162440] px-2 py-1 rounded-md border border-[#1E3A5F]">
                    <Star className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
                    <span className="text-sm font-semibold text-[#F0F4F8]">{tool.rating}</span>
                    <span className="text-sm text-[#4A6380]">({tool.reviews})</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[#F0F4F8] mb-1 group-hover:text-[#3B82F6] transition-colors">
                  {tool.name}
                </h3>

                <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#3B82F6] bg-[#162440] px-2.5 py-1 rounded-md mb-3">
                  {tool.category}
                </span>

                <p className="text-sm text-[#8BA3BE] mb-6 leading-relaxed">
                  {tool.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-[#1E3A5F]">
                  <span className="text-sm font-semibold text-[#F0F4F8]">{tool.pricing}</span>
                  <button className="px-4 py-1.5 text-xs font-medium text-[#8BA3BE] bg-transparent border border-[#1E3A5F] rounded-lg group-hover:bg-[#162440] group-hover:text-[#3B82F6] group-hover:border-[#2A5080] transition-all">
                    Learn More
                  </button>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        <div className="mt-8 sm:hidden flex justify-center">
          <button className="w-full px-6 py-3 text-sm font-medium text-[#8BA3BE] bg-[#0F1D32] border border-[#1E3A5F] rounded-lg hover:bg-[#162440] transition-colors">
            View All Categories
          </button>
        </div>
      </div>
    </section>
  );
}

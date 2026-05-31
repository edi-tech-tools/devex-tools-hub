import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/data/blog-posts";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog — DevEx Tools Hub",
  description:
    "Expert insights, comparisons, and strategies for choosing and using developer tools. Stay informed with the latest in DevOps, frameworks, APIs, and engineering workflows.",
};

const CATEGORIES = Array.from(new Set(BLOG_POSTS.map((post) => post.category)));

export default function BlogPage() {
  // Sort by date, newest first
  const sortedPosts = [...BLOG_POSTS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="relative pt-32 pb-20 px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Hero */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#3B82F6] bg-[#162440] px-3 py-1.5 rounded-md mb-4">
            Blog
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#F0F4F8] tracking-tight mb-3">
            Insights &{" "}
            <span className="text-gradient">Expert Analysis</span>
          </h1>
          <p className="text-lg text-[#8BA3BE] max-w-2xl mx-auto">
            In-depth comparisons, buying guides, and strategies to help you make
            smarter enterprise software decisions.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {["All", ...CATEGORIES].map((cat) => (
            <a
              key={cat}
              href={cat === "All" ? "/blog" : `/blog?category=${cat}`}
              className="px-3.5 py-1.5 rounded-full border border-[#1E3A5F] bg-[#0F1D32] text-sm text-[#8BA3BE] hover:text-[#F0F4F8] hover:border-[#2A5080] transition-colors"
            >
              {cat}
            </a>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group"
            >
              <article className="bg-[#0F1D32] border border-[#1E3A5F] rounded-xl p-6 card-hover h-full flex flex-col">
                {/* Category Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#3B82F6] bg-[#162440] px-2.5 py-1 rounded-md">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-[#4A6380]">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime} min read
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-lg font-bold text-[#F0F4F8] mb-3 group-hover:text-[#3B82F6] transition-colors leading-snug">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-sm text-[#8BA3BE] mb-4 leading-relaxed flex-grow line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-[#4A6380] bg-[#0A1628] px-2 py-0.5 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Meta */}
                <div className="flex items-center justify-between pt-4 border-t border-[#1E3A5F]">
                  <div className="flex items-center gap-2 text-xs text-[#4A6380]">
                    <User className="w-3.5 h-3.5" />
                    {post.author}
                    <span className="mx-1">·</span>
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#3B82F6] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

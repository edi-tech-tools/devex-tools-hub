import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/data/blog-posts";
import { Calendar, Clock, User, ArrowLeft, Tag, Star, ArrowRight, ExternalLink } from "lucide-react";
import { blogPostSchema, organizationSchema } from "@/lib/schema";

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} — Isle Works DevEx`,
    description: post.excerpt,
  };
}

function renderContent(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="text-xl md:text-2xl font-bold text-[#F0F4F8] mt-10 mb-4 tracking-tight">
          {trimmed.replace(/^##\s+/, "")}
        </h2>
      );
      i++;
      continue;
    }
    if (trimmed.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="text-lg font-bold text-[#F0F4F8] mt-8 mb-3">
          {trimmed.replace(/^###\s+/, "")}
        </h3>
      );
      i++;
      continue;
    }

    if (trimmed.startsWith("|")) {
      const tableRows: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        tableRows.push(lines[i].trim());
        i++;
      }
      elements.push(renderTable(tableRows, `table-${i}`));
      continue;
    }

    if (trimmed === "---") {
      elements.push(<hr key={i} className="border-[#1E3A5F] my-8" />);
      i++;
      continue;
    }

    if (trimmed === "") {
      i++;
      continue;
    }

    elements.push(
      <p key={i} className="text-[#8BA3BE] leading-relaxed mb-4 text-base">
        {formatInline(trimmed)}
      </p>
    );
    i++;
  }

  return elements;
}

function renderTable(rows: string[], key: string) {
  const parsed = rows.map((row) =>
    row
      .replace(/^\||\|$/g, "")
      .split("|")
      .map((cell) => cell.trim())
  );

  const headerRow = parsed[0];
  const dataRows = parsed.slice(2);

  return (
    <div key={key} className="overflow-x-auto mb-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-[#162440]">
            {headerRow.map((h, idx) => (
              <th
                key={idx}
                className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-[#3B82F6] border-b border-[#1E3A5F]"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataRows.map((row, rIdx) => (
            <tr key={rIdx} className="border-b border-[#1E3A5F]/50 hover:bg-[#162440]/50 transition-colors">
              {row.map((cell, cIdx) => (
                <td key={cIdx} className="px-4 py-3 text-[#8BA3BE]">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function formatInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={idx} className="font-bold text-[#F0F4F8]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

function getRelatedPosts(currentSlug: string, category: string) {
  return BLOG_POSTS.filter(
    (p) => p.slug !== currentSlug && p.category === category
  ).slice(0, 3);
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const contentElements = renderContent(post.content);
  const relatedPosts = getRelatedPosts(slug, post.category);

  const blogJsonLd = blogPostSchema(
    post.title,
    post.author,
    post.date,
    'Isle Works DevEx',
    post.excerpt
  );
  const orgJsonLd = organizationSchema(
    'Isle Works DevEx',
    'https://devex-tools.net',
    'Developer tool reviews and comparisons curated by the Isle Works engineering team in Stuttgart.'
  );

  return (
    <div className="relative pt-32 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <div className="max-w-[1200px] mx-auto px-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-[#8BA3BE] hover:text-[#3B82F6] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
          <article>
            <header className="mb-10">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#3B82F6] bg-[#162440] px-3 py-1.5 rounded-md">
                  {post.category}
                </span>
                <div className="flex items-center gap-2 text-xs text-[#4A6380]">
                  <User className="w-3.5 h-3.5" />
                  {post.author}
                </div>
                <div className="flex items-center gap-2 text-xs text-[#4A6380]">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#4A6380]">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readTime} min read
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#F0F4F8] tracking-tight leading-[1.1] mb-4">
                {post.title}
              </h1>

              <p className="text-lg text-[#8BA3BE] leading-relaxed max-w-3xl">
                {post.excerpt}
              </p>

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1.5 px-3 py-1 bg-[#0F1D32] border border-[#1E3A5F] rounded-full text-xs text-[#4A6380]"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </header>

            <div className="prose-custom max-w-none">
              {contentElements}
            </div>

            <div className="mt-12 pt-8 border-t border-[#1E3A5F]">
              <div className="bg-[#0F1D32] border border-[#1E3A5F] rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#22D3EE] flex items-center justify-center text-white font-bold text-lg">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-[#F0F4F8]">{post.author}</p>
                    <p className="text-sm text-[#8BA3BE]">{post.authorRole}</p>
                    <p className="text-xs text-[#4A6380] mt-2">
                      Isle Works independently researches and verifies all product data. Ratings sourced from G2, Capterra, and other trusted review platforms.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {relatedPosts.length > 0 && (
              <div className="mt-12 lg:hidden">
                <h3 className="text-lg font-bold text-[#F0F4F8] mb-4">Related Articles</h3>
                <div className="grid gap-4">
                  {relatedPosts.map((rp) => (
                    <Link
                      key={rp.slug}
                      href={`/blog/${rp.slug}`}
                      className="block bg-[#0F1D32] border border-[#1E3A5F] rounded-xl p-4 hover:border-[#2A5080] transition-all"
                    >
                      <h4 className="font-bold text-[#F0F4F8] hover:text-[#3B82F6] transition-colors text-sm">
                        {rp.title}
                      </h4>
                      <p className="text-xs text-[#4A6380] mt-1">
                        {rp.readTime} min read · {new Date(rp.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <div className="bg-[#0F1D32] border border-[#1E3A5F] rounded-xl p-5">
                <h3 className="text-sm font-bold text-[#F0F4F8] mb-3 uppercase tracking-wider">
                  In This Article
                </h3>
                <nav className="space-y-2">
                  {post.content
                    .split("\n")
                    .filter((l) => l.trim().startsWith("## "))
                    .slice(0, 8)
                    .map((heading, idx) => (
                      <a
                        key={idx}
                        href={`#`}
                        className="block text-xs text-[#8BA3BE] hover:text-[#3B82F6] transition-colors"
                      >
                        {heading.replace(/^##\s+/, "")}
                      </a>
                    ))}
                </nav>
              </div>

              {relatedPosts.length > 0 && (
                <div className="bg-[#0F1D32] border border-[#1E3A5F] rounded-xl p-5">
                  <h3 className="text-sm font-bold text-[#F0F4F8] mb-3 uppercase tracking-wider">
                    Related Articles
                  </h3>
                  <div className="space-y-3">
                    {relatedPosts.map((rp) => (
                      <Link
                        key={rp.slug}
                        href={`/blog/${rp.slug}`}
                        className="block group"
                      >
                        <h4 className="text-sm font-bold text-[#8BA3BE] group-hover:text-[#3B82F6] transition-colors leading-snug">
                          {rp.title}
                        </h4>
                        <p className="text-xs text-[#4A6380] mt-1">
                          {rp.readTime} min read
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="bg-gradient-to-br from-[#162440] to-[#0F1D32] border border-[#1E3A5F] rounded-xl p-5 text-center">
                <div className="w-10 h-10 rounded-full bg-[#3B82F6]/20 flex items-center justify-center mx-auto mb-3">
                  <Star className="w-5 h-5 text-[#3B82F6]" />
                </div>
                <h3 className="text-sm font-bold text-[#F0F4F8] mb-2">Find the Right Tool</h3>
                <p className="text-xs text-[#8BA3BE] mb-4">
                  Browse 57+ developer tools
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-1 px-4 py-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-bold rounded-lg transition-colors"
                >
                  Browse Tools <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, ArrowLeft, ArrowRight, BookOpen, Layers, ChevronRight } from "lucide-react";
import { ALL_TOOLS } from "@/data/tools";
import { BLOG_POSTS } from "@/data/blog-posts";

// All unique categories
const ALL_CATEGORIES = Array.from(new Set(ALL_TOOLS.map((t) => t.category)));

// Slugify
function slugify(category: string) {
  return category.toLowerCase().replace(/\s+/g, "-");
}

// Deslugify
function deslugify(slug: string): string | undefined {
  return ALL_CATEGORIES.find((c) => slugify(c) === slug);
}

// Category descriptions (auto-generated)
const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  CRM: "Customer Relationship Management (CRM) software helps businesses manage customer interactions, track leads, and automate sales processes. Compare the best CRM platforms for your enterprise.",
  Marketing: "Marketing automation platforms enable businesses to create, execute, and analyze multi-channel campaigns. Find the right tools to attract, engage, and convert your audience.",
  Communication: "Team communication and collaboration platforms keep your organization connected. From messaging to video conferencing, discover tools that streamline internal communication.",
  Management: "Project and work management software helps teams plan, track, and execute work efficiently. Compare the best platforms for task management, resource planning, and portfolio oversight.",
  Finance: "Financial software solutions for payment processing, accounting, expense management, and billing. Find the right tools to manage your company's financial operations.",
  Legal: "Legal software solutions including contract lifecycle management, e-signature, and compliance tools. Streamline your legal operations with enterprise-grade platforms.",
  Support: "Customer support and service desk platforms help teams manage tickets, provide self-service options, and deliver exceptional customer experiences at scale.",
  HR: "Human Resources software for recruitment, onboarding, performance management, payroll, and employee engagement. Find the best HR tools for your growing team.",
  DevOps: "DevOps and development tools including CI/CD, monitoring, container orchestration, and infrastructure management. Compare platforms to streamline your software delivery pipeline.",
  Productivity: "Productivity software helps individuals and teams work smarter with document management, note-taking, knowledge bases, and workflow automation tools.",
  Security: "Security software solutions for identity management, endpoint protection, network security, and compliance monitoring. Protect your enterprise with top-rated security platforms.",
  Analytics: "Business intelligence and analytics platforms help organizations visualize data, create dashboards, and derive actionable insights from their business data.",
  Design: "Design and creative software for UI/UX design, graphic design, prototyping, and digital asset management. Find the best tools for your creative team.",
  Sales: "Sales engagement and enablement platforms help revenue teams automate outreach, manage pipelines, and close deals faster with data-driven selling tools.",
  Data: "Data management and integration platforms for ETL, data warehousing, data quality, and master data management. Compare solutions for your data infrastructure needs.",
  "E-Commerce": "E-commerce platforms and tools for building online stores, managing product catalogs, processing payments, and optimizing conversion rates.",
  Infrastructure: "Cloud infrastructure and hosting platforms for compute, storage, networking, and serverless computing. Compare providers for your cloud architecture needs.",
  "E-Signature": "Electronic signature solutions for legally binding digital signatures, document workflows, and contract automation. Streamline your agreement processes.",
  "A/B Testing": "A/B testing and experimentation platforms for optimizing websites, mobile apps, and marketing campaigns through data-driven testing and personalization.",
  FinTech: "Financial technology solutions including payment gateways, lending platforms, investment tools, and banking APIs for modern financial services.",
};

// Count tools per category for stats
const CATEGORY_STATS = ALL_CATEGORIES.reduce(
  (acc, cat) => {
    const tools = ALL_TOOLS.filter((t) => t.category === cat);
    const avgRating =
      tools.reduce((sum, t) => sum + t.rating, 0) / tools.length;
    acc[cat] = {
      count: tools.length,
      avgRating: Math.round(avgRating * 10) / 10,
    };
    return acc;
  },
  {} as Record<string, { count: number; avgRating: number }>
);

export function generateStaticParams() {
  return ALL_CATEGORIES.map((cat) => ({
    slug: slugify(cat),
  }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const category = deslugify(params.slug);
  if (!category) {
    return { title: "Category Not Found" };
  }
  const stats = CATEGORY_STATS[category];
  return {
    title: `Best ${category} Software in 2026 — ${stats.count} Tools Compared`,
    description:
      CATEGORY_DESCRIPTIONS[category] ||
      `Compare the best ${category} software solutions. Browse ${stats.count} tools with reviews, ratings, and pricing.`,
    keywords: [
      `best ${category.toLowerCase()} software`,
      `${category.toLowerCase()} tools`,
      `${category.toLowerCase()} platforms`,
      `${category.toLowerCase()} comparison`,
      `enterprise ${category.toLowerCase()}`,
    ],
    openGraph: {
      title: `Best ${category} Software in 2026 — ${stats.count} Tools Compared`,
      description: `Compare ${stats.count} top-rated ${category} software solutions. Read verified reviews, compare pricing, and find the perfect tool for your business.`,
    },
  };
}

export default function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const category = deslugify(params.slug);
  if (!category) {
    notFound();
  }

  const tools = ALL_TOOLS.filter((t) => t.category === category);
  const relatedPosts = BLOG_POSTS.filter(
    (p) =>
      p.tags.some(
        (t) => t.toLowerCase().includes(category.toLowerCase())
      ) || p.category.toLowerCase().includes(category.toLowerCase())
  ).slice(0, 3);

  const stats = CATEGORY_STATS[category];
  const description =
    CATEGORY_DESCRIPTIONS[category] ||
    `Compare top ${category.toLowerCase()} software solutions for your business needs.`;

  return (
    <div className="relative pt-28 pb-20 px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#4A6380] mb-8">
          <Link href="/" className="hover:text-[#3B82F6] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#8BA3BE]">{category} Software</span>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#162440] flex items-center justify-center">
              <Layers className="w-6 h-6 text-[#3B82F6]" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#F0F4F8] tracking-tight">
                Best {category} Software
              </h1>
              <p className="text-[#8BA3BE] mt-1 text-base">
                {stats.count} tool{stats.count !== 1 ? "s" : ""} ·{" "}
                <span className="inline-flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]" />{" "}
                  Avg. {stats.avgRating}/5
                </span>
              </p>
            </div>
          </div>
          <p className="text-[#8BA3BE] leading-relaxed max-w-3xl text-base">
            {description}
          </p>
        </header>

        {/* Quick Links */}
        <div className="flex flex-wrap gap-3 mb-10">
          <Link
            href={`/best/${params.slug}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm font-medium rounded-full transition-colors"
          >
            View Best {category} Software 2026 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Tools Grid */}
        <section>
          <h2 className="text-2xl font-bold text-[#F0F4F8] mb-6">
            All {category} Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  href={`/tools/${tool.id}`}
                  key={tool.id}
                  className="group bg-[#0F1D32] border border-[#1E3A5F] rounded-xl p-6 card-hover"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-[#162440] flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                      <Icon className="w-6 h-6 text-[#3B82F6]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-[#F0F4F8] group-hover:text-[#3B82F6] transition-colors truncate">
                        {tool.name}
                      </h3>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]" />
                        <span className="text-xs font-bold text-[#F0F4F8]">
                          {tool.rating}
                        </span>
                        <span className="text-xs text-[#4A6380]">
                          ({tool.reviewCount.toLocaleString()} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-[#8BA3BE] leading-relaxed line-clamp-2 mb-4">
                    {tool.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-[#1E3A5F]">
                    <span className="text-xs text-[#4A6380]">{tool.pricing}</span>
                    <span className="text-sm text-[#3B82F6] font-semibold group-hover:text-[#22D3EE] transition-colors flex items-center">
                      View Details <ArrowRight className="ml-1 w-4 h-4" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Related Blog Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-16">
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="w-5 h-5 text-[#F59E0B]" />
              <h2 className="text-xl font-bold text-[#F0F4F8]">
                Related Guides
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-[#0F1D32] border border-[#1E3A5F] rounded-xl p-5 card-hover"
                >
                  <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-[#3B82F6] bg-[#162440] px-2 py-0.5 rounded mb-3">
                    {post.category}
                  </span>
                  <h3 className="font-bold text-[#F0F4F8] group-hover:text-[#3B82F6] transition-colors leading-snug line-clamp-2 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-[#8BA3BE] line-clamp-2">
                    {post.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

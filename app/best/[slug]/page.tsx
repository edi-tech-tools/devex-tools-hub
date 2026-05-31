import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Star,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  DollarSign,
  ChevronRight,
  Sparkles,
  HelpCircle,
} from "lucide-react";
import { ALL_TOOLS } from "@/data/tools";

const ALL_CATEGORIES = Array.from(new Set(ALL_TOOLS.map((t) => t.category)));

function slugify(category: string) {
  return category.toLowerCase().replace(/\s+/g, "-");
}

function deslugify(slug: string): string | undefined {
  return ALL_CATEGORIES.find((c) => slugify(c) === slug);
}

const BUYING_GUIDES: Record<string, string> = {
  CRM:
    "When choosing a CRM platform, consider your team size, sales process complexity, and integration needs. Enterprise organizations with complex workflows benefit from Salesforce's deep customization, while mid-market teams often prefer HubSpot's ease of use. Key factors to evaluate include AI-powered lead scoring, pipeline visualization, mobile access, and API ecosystem. Look for platforms that offer seamless integration with your existing email, calendar, and marketing tools.",
  Marketing:
    "The best marketing platform depends on your primary channel strategy. Content-driven teams benefit from HubSpot's inbound marketing suite, while email-focused marketers may prefer Mailchimp or Klaviyo. Evaluate automation capabilities, lead scoring sophistication, multi-channel campaign management, and analytics depth. Consider total cost of ownership including contact tiers — the jump between pricing tiers can be significant for growing teams.",
  Communication:
    "Evaluate communication platforms based on your organization's size, remote work setup, and integration ecosystem. Slack leads for channel-based messaging and app integrations, while Zoom excels at video quality and meeting features. Microsoft Teams offers the deepest Office 365 integration. Consider AI features like meeting summaries, smart replies, and thread summarization. For enterprise deployments, prioritize admin controls, compliance features, and guest access management.",
  Management:
    "Project management tools vary significantly in their approach. Asana excels at cross-team portfolio management and goal tracking. Monday.com offers the most visual, customizable interface with 200+ templates. Jira is the standard for software development teams. ClickUp provides the most features per dollar. Consider your team's workflow style — some prefer Kanban boards, others need Gantt charts or timeline views with dependency tracking.",
};

const FAQS: Record<string, { q: string; a: string }[]> = {
  CRM: [
    {
      q: "What's the best CRM for small businesses?",
      a: "For small businesses, HubSpot's free CRM offers the best value with contact management, deal tracking, and email integration at no cost. Freshsales is also excellent for growing teams with its intuitive interface and built-in phone system starting at $9/user/month.",
    },
    {
      q: "How much does enterprise CRM cost?",
      a: "Enterprise CRM costs vary widely. Salesforce Enterprise starts at $165/user/month with full customization, while HubSpot Enterprise runs $3,600/month for 10K contacts. Pipedrive and Zoho offer more affordable plans starting under $15/user/month.",
    },
    {
      q: "What CRM features should I prioritize in 2026?",
      a: "Prioritize AI-powered lead scoring, pipeline forecasting, workflow automation, mobile access with offline mode, and API quality for integrations. In 2026, platforms with strong AI features and agent-ready APIs have a significant advantage.",
    },
  ],
  Marketing: [
    {
      q: "Is HubSpot worth the price for marketing automation?",
      a: "HubSpot Marketing Hub provides exceptional value for mid-market B2B teams that need an all-in-one solution. The free CRM integration, smart content engine, and AI content strategy tools justify the cost for teams that will use the full suite. However, the jump from Starter ($15/mo) to Pro ($890/mo) is steep.",
    },
    {
      q: "What's the best email marketing platform for B2B?",
      a: "For B2B email marketing, HubSpot is the gold standard for integrated CRM+email. Mailchimp is best for simplicity and ease of use. Marketo Engage leads enterprise-level email automation. Consider your contact list size, automation complexity, and CRM integration needs.",
    },
    {
      q: "What are the must-have marketing automation features?",
      a: "Essential features include multi-step automation workflows, lead scoring and grading, A/B testing for emails and landing pages, smart content personalization, and integrated analytics. AI-powered content recommendations and predictive lead scoring are becoming table stakes in 2026.",
    },
  ],
  Communication: [
    {
      q: "Slack vs Teams vs Zoom — which is best?",
      a: "Slack is best for deep app integrations and developer-friendly workflows. Microsoft Teams wins for organizations already using Office 365 with its native integration. Zoom Workplace is the strongest choice for video-first organizations that want an all-in-one platform with AI Companion included at no extra cost.",
    },
    {
      q: "How do I reduce notification overload in team chat?",
      a: "Implement channel governance policies (dedicated channels per project/team), use Do Not Disturb hours, set notification preferences per channel, and encourage async communication. Slack's notification schedules and Teams' quiet hours are effective — but culture change is more important than tool settings.",
    },
    {
      q: "Is Slack AI worth the upgrade?",
      a: "Slack AI provides genuinely useful daily recaps and thread summaries, particularly for managers and executives who can't read every message. The natural-language search across message history saves time finding past decisions. However, enterprise-grade features require Enterprise Grid, which is custom-priced.",
    },
  ],
  Management: [
    {
      q: "Asana vs Monday.com vs ClickUp — which is best?",
      a: "Asana is best for teams that need portfolio management and goal tracking across departments. Monday.com offers the most visual, customizable interface with minimal training. ClickUp provides the most features per dollar but has a steeper learning curve. Jira remains the standard for software development teams.",
    },
    {
      q: "What project management methodology works best for SaaS teams?",
      a: "Most SaaS teams benefit from a hybrid approach — Scrum for engineering sprints, Kanban for ongoing operations, and OKRs for strategic initiatives. Look for tools that support multiple views (board, timeline, calendar) so each team can work their way while leadership gets portfolio-level visibility.",
    },
    {
      q: "How much should we budget for project management software?",
      a: "Expect $10-15/user/month for basic plans, $20-35/user/month for business plans with automation and reporting, and custom pricing for enterprise tiers. For a 50-person team, budget approximately $750-1,500/month for a solid project management solution with automation capabilities.",
    },
  ],
};

function getDefaultBuyingGuide(category: string): string {
  return `When evaluating ${category.toLowerCase()} software solutions, consider your specific use case, team size, budget, and required integrations. Key evaluation criteria include feature completeness, ease of use, scalability, customer support quality, and total cost of ownership. Always take advantage of free trials to test the platform with your actual workflows before committing.`;
}

function getDefaultFAQs(category: string): { q: string; a: string }[] {
  return [
    {
      q: `What is the best ${category.toLowerCase()} software?`,
      a: `The best ${category.toLowerCase()} software depends on your specific needs. Our rankings are based on verified user reviews, feature analysis, and expert evaluation. Compare the top-rated tools above to find the best fit for your organization.`,
    },
    {
      q: `How much does ${category.toLowerCase()} software cost?`,
      a: `Pricing varies widely from free tiers to enterprise plans. Most ${category.toLowerCase()} tools offer monthly or annual subscriptions with tiered pricing based on features and usage. See individual tool pages for detailed pricing information.`,
    },
    {
      q: `What features should I look for in ${category.toLowerCase()} software?`,
      a: `Essential features include core functionality specific to ${category.toLowerCase()} use cases, integration capabilities with your existing tech stack, reporting and analytics, security and compliance features, and responsive customer support.`,
    },
  ];
}

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
  const tools = ALL_TOOLS.filter((t) => t.category === category).sort(
    (a, b) => b.rating - a.rating
  );
  return {
    title: `Best ${category} Software in 2026 — Top ${Math.min(tools.length, 10)} Tools Compared`,
    description: `Discover the best ${category.toLowerCase()} software in 2026. Compare top-rated platforms with verified reviews, pricing breakdowns, and expert recommendations. Find the perfect ${category.toLowerCase()} tool for your business.`,
    keywords: [
      `best ${category.toLowerCase()} software 2026`,
      `top ${category.toLowerCase()} tools`,
      `${category.toLowerCase()} comparison`,
      `${category.toLowerCase()} reviews`,
      `best ${category.toLowerCase()} platforms`,
    ],
    openGraph: {
      title: `Best ${category} Software in 2026 — Top Picks & Comparison`,
      description: `Find the best ${category.toLowerCase()} software for your business. Expert comparisons, verified reviews, and detailed pricing for ${tools.length} leading ${category.toLowerCase()} platforms.`,
    },
  };
}

export default function BestCategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const category = deslugify(params.slug);
  if (!category) {
    notFound();
  }

  const tools = ALL_TOOLS.filter((t) => t.category === category).sort(
    (a, b) => b.rating - a.rating
  );
  const topTool = tools[0];
  const buyingGuide = BUYING_GUIDES[category] || getDefaultBuyingGuide(category);
  const faqs = FAQS[category] || getDefaultFAQs(category);

  return (
    <div className="relative pt-28 pb-20 px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#4A6380] mb-8">
          <Link href="/" className="hover:text-[#3B82F6] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link
            href={`/category/${params.slug}`}
            className="hover:text-[#3B82F6] transition-colors"
          >
            {category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#8BA3BE]">Best {category} 2026</span>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#3B82F6]/20 to-[#22D3EE]/20 flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-[#22D3EE]" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#F0F4F8] tracking-tight">
                Best {category} Software in 2026
              </h1>
              <p className="text-base text-[#8BA3BE] mt-1">
                Our expert picks for the top{" "}
                {tools.length > 10 ? "10" : tools.length} {category.toLowerCase()}{" "}
                platforms — compared with ratings, pricing, and key features.
              </p>
            </div>
          </div>

          {/* Top pick badge */}
          {topTool && (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#162440] border border-[#F59E0B]/30 rounded-full text-sm text-[#F59E0B]">
              <Star className="w-4 h-4 fill-[#F59E0B]" />
              Top Pick:{" "}
              <Link
                href={`/tools/${topTool.id}`}
                className="font-bold hover:text-[#F0F4F8] transition-colors underline underline-offset-2"
              >
                {topTool.name}
              </Link>
              <span className="text-[#4A6380]">— {topTool.rating}/5</span>
            </div>
          )}
        </header>

        {/* Comparison Table */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-[#F0F4F8] mb-6 flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-[#3B82F6]" />
            Head-to-Head Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-[#1E3A5F]">
                  <th className="text-left py-3 px-4 text-[#8BA3BE] font-semibold">
                    Tool
                  </th>
                  <th className="text-left py-3 px-4 text-[#8BA3BE] font-semibold">
                    Rating
                  </th>
                  <th className="text-left py-3 px-4 text-[#8BA3BE] font-semibold hidden md:table-cell">
                    Pricing
                  </th>
                  <th className="text-left py-3 px-4 text-[#8BA3BE] font-semibold hidden lg:table-cell">
                    Reviews
                  </th>
                  <th className="text-right py-3 px-4 text-[#8BA3BE] font-semibold">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody>
                {tools.slice(0, 10).map((tool, idx) => {
                  const Icon = tool.icon;
                  return (
                    <tr
                      key={tool.id}
                      className="border-b border-[#1E3A5F]/60 hover:bg-[#0F1D32]/80 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#162440] flex items-center justify-center shrink-0">
                            <Icon className="w-4 h-4 text-[#3B82F6]" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-[#F0F4F8] whitespace-nowrap">
                                {tool.name}
                              </span>
                              {idx === 0 && (
                                <span className="text-[10px] font-bold bg-[#F59E0B]/20 text-[#F59E0B] px-1.5 py-0.5 rounded">
                                  #1
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
                          <span className="font-bold text-[#F0F4F8]">
                            {tool.rating}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-[#8BA3BE] hidden md:table-cell">
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-3.5 h-3.5 text-[#22D3EE]" />
                          <span>{tool.pricing}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-[#4A6380] hidden lg:table-cell">
                        {tool.reviewCount.toLocaleString()}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <Link
                          href={`/tools/${tool.id}`}
                          className="inline-flex items-center gap-1 text-[#3B82F6] hover:text-[#22D3EE] transition-colors text-xs font-semibold"
                        >
                          Review <ArrowRight className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Top Picks detailed cards */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-[#F0F4F8] mb-6">
            Detailed Reviews
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.slice(0, 6).map((tool, idx) => {
              const Icon = tool.icon;
              return (
                <Link
                  href={`/tools/${tool.id}`}
                  key={tool.id}
                  className="group bg-[#0F1D32] border border-[#1E3A5F] rounded-xl p-6 card-hover"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-lg bg-[#162440] flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6 text-[#3B82F6]" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#F59E0B] flex items-center justify-center text-[10px] font-bold text-black">
                        #{idx + 1}
                      </div>
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
                          ({tool.reviewCount.toLocaleString()})
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-[#8BA3BE] leading-relaxed line-clamp-2 mb-3">
                    {tool.description}
                  </p>
                  <div className="text-xs text-[#22D3EE] font-medium mb-3">
                    {tool.pricing}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-[#1E3A5F]">
                    <span className="text-xs text-[#4A6380] capitalize">
                      Best for: {tool.useCase.split(".")[0].slice(0, 50)}...
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Buying Guide */}
        <section className="mb-14">
          <div className="bg-[#0F1D32] border border-[#1E3A5F] rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-[#F0F4F8] mb-4 flex items-center gap-2">
              <ArrowRight className="w-6 h-6 text-[#3B82F6]" />
              {category} Software Buying Guide
            </h2>
            <p className="text-[#8BA3BE] leading-relaxed text-base">
              {buyingGuide}
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-[#F0F4F8] mb-6 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-[#3B82F6]" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="bg-[#0F1D32] border border-[#1E3A5F] rounded-xl group"
              >
                <summary className="px-6 py-4 cursor-pointer text-[#F0F4F8] font-semibold text-sm flex items-center justify-between group-open:text-[#22D3EE] transition-colors">
                  {faq.q}
                  <ChevronRight className="w-4 h-4 text-[#4A6380] group-open:rotate-90 transition-transform shrink-0 ml-4" />
                </summary>
                <div className="px-6 pb-4 text-sm text-[#8BA3BE] leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-[#162440] to-[#0F1D32] border border-[#1E3A5F] rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold text-[#F0F4F8] mb-2">
              Ready to find your perfect {category.toLowerCase()} tool?
            </h2>
            <p className="text-[#8BA3BE] text-sm">
              Browse all {tools.length} {category.toLowerCase()} solutions or dive into detailed reviews.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/category/${params.slug}`}
              className="px-6 py-3 bg-[#0F1D32] border border-[#1E3A5F] text-[#F0F4F8] text-sm font-medium rounded-full hover:border-[#2A5080] transition-colors"
            >
              View All {category} Tools
            </Link>
            {topTool && (
              <Link
                href={`/tools/${topTool.id}`}
                className="px-6 py-3 bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm font-medium rounded-full transition-colors"
              >
                Read {topTool.name} Review
              </Link>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

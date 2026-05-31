#!/usr/bin/env python3
"""生成B2B站完整sitemap"""
import re

with open('app/data/tools.ts', 'r') as f:
    content = f.read()

ids = re.findall(r'id:\s*"([^"]+)"', content)
seen = set()
tool_slugs = []
for i in ids:
    if i not in seen:
        seen.add(i)
        tool_slugs.append(i)

print(f"工具slug: {len(tool_slugs)}个")

blog_slugs = [
    "top-10-crm-software-2026",
    "saas-pricing-strategies",
    "ai-tools-productivity-2026",
    "remote-team-collaboration-tools",
    "cybersecurity-best-practices",
    "email-marketing-automation-guide",
    "project-management-methodologies",
    "devops-tools-comparison",
    "hr-software-digital-transformation",
    "customer-support-automation",
    "slack-vs-microsoft-teams-2026-comparison",
    "best-data-analytics-tools-b2b-2026",
    "top-project-management-tools-2026",
    "marketing-automation-platforms-comparison-2026",
    "customer-success-software-reduce-churn",
    "best-remote-work-tools-2026",
    "b2b-saas-pricing-models-comparison",
    "best-hr-software-2026-comparison",
    "best-video-conferencing-tools-2026",
    "accounting-software-enterprise-2026",
    "best-ai-writing-tools-2026",
    "best-cybersecurity-tools-b2b-2026",
    "best-data-warehousing-tools-2026",
    "best-customer-success-software-2026",
    "best-ecommerce-platforms-b2b-2026",
    "enterprise-ai-agent-orchestration-2026",
]

# 生成sitemap
slugs_str = ",\n  ".join(f'"{s}"' for s in tool_slugs)
blog_str = ",\n  ".join(f'"{s}"' for s in blog_slugs)

sitemap = f"""import {{ MetadataRoute }} from "next";

const BLOG_SLUGS = [
  {blog_str},
];

const TOOL_SLUGS = [
  {slugs_str},
];

export async function GET() {{
  const baseUrl = "https://b2b-software.net";
  
  const urls: string[] = [];
  
  // Static pages
  urls.push(`<url><loc>${{baseUrl}}</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>`);
  urls.push(`<url><loc>${{baseUrl}}/blog</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>`);
  urls.push(`<url><loc>${{baseUrl}}/about</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>`);
  urls.push(`<url><loc>${{baseUrl}}/contact</loc><changefreq>monthly</changefreq><priority>0.4</priority></url>`);
  urls.push(`<url><loc>${{baseUrl}}/faq</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>`);
  urls.push(`<url><loc>${{baseUrl}}/privacy</loc><changefreq>yearly</changefreq><priority>0.3</priority></url>`);
  urls.push(`<url><loc>${{baseUrl}}/terms</loc><changefreq>yearly</changefreq><priority>0.3</priority></url>`);
  
  // Blog pages
  for (const slug of BLOG_SLUGS) {{
    urls.push(`<url><loc>${{baseUrl}}/blog/${{slug}}</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>`);
  }}
  
  // Tool pages
  for (const slug of TOOL_SLUGS) {{
    urls.push(`<url><loc>${{baseUrl}}/tools/${{slug}}</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>`);
  }}
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\\n${{urls.join("\\n")}}\\n</urlset>`;
  
  return new Response(sitemap, {{
    headers: {{ "Content-Type": "application/xml" }},
  }});
}}"""

with open('app/sitemap.xml/route.ts', 'w') as f:
    f.write(sitemap)

print(f"✅ B2B站sitemap已生成: {len(tool_slugs)}个工具 + {len(blog_slugs)}篇博客")

import subprocess
r = subprocess.run(['wc', '-l', 'app/sitemap.xml/route.ts'], capture_output=True, text=True)
print(f"文件行数: {r.stdout.strip()}")

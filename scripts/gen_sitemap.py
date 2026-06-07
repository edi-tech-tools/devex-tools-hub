#!/usr/bin/env python3
"""生成DevEx站完整sitemap"""
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

with open('app/data/blog-posts.ts', 'r') as f:
    blog_content = f.read()

blog_slugs = re.findall(r'slug:\s*"([^"]+)"', blog_content)

cats = sorted(set(re.findall(r'category:\s*"([^"]+)"', content)))

def slugify(s):
    return s.lower().replace(' & ', '-and-').replace(' ', '-').replace('/', '-').replace('---', '-').replace('--', '-')

cat_slugs = [slugify(c) for c in cats]

print(f"博客slug: {len(blog_slugs)}个")
print(f"分类: {len(cat_slugs)}个")

# 生成sitemap
slug_str = ",\n  ".join(f'  "{s}"' for s in tool_slugs)
blog_str = ",\n  ".join(f'  "{s}"' for s in blog_slugs)
cat_str = ",\n  ".join(f'  "{s}"' for s in cat_slugs)

sitemap = f"""import {{ MetadataRoute }} from "next";

const BLOG_SLUGS = [
{blog_str},
] as const;

const TOOL_SLUGS = [
{slug_str},
] as const;

const CATEGORY_SLUGS = [
{cat_str},
] as const;

export async function GET() {{
  const baseUrl = "https://devex-tools.net";
  
  const urls: string[] = [];
  
  urls.push(`<url><loc>${{baseUrl}}</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>`);
  urls.push(`<url><loc>${{baseUrl}}/blog</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>`);
  urls.push(`<url><loc>${{baseUrl}}/about</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>`);
  urls.push(`<url><loc>${{baseUrl}}/contact</loc><changefreq>monthly</changefreq><priority>0.4</priority></url>`);
  urls.push(`<url><loc>${{baseUrl}}/faq</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>`);
  urls.push(`<url><loc>${{baseUrl}}/privacy</loc><changefreq>yearly</changefreq><priority>0.3</priority></url>`);
  urls.push(`<url><loc>${{baseUrl}}/terms</loc><changefreq>yearly</changefreq><priority>0.3</priority></url>`);
  urls.push(`<url><loc>${{baseUrl}}/disclosure</loc><changefreq>yearly</changefreq><priority>0.3</priority></url>`);

  for (const slug of CATEGORY_SLUGS) {{
    urls.push(`<url><loc>${{baseUrl}}/category/${{slug}}</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>`);
  }}
  
  for (const slug of BLOG_SLUGS) {{
    urls.push(`<url><loc>${{baseUrl}}/blog/${{slug}}</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>`);
  }}
  
  for (const slug of TOOL_SLUGS) {{
    urls.push(`<url><loc>${{baseUrl}}/tools/${{slug}}</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>`);
  }}
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\\n${{urls.join("\\n")}}\\n</urlset>`;
  
  return new Response(sitemap, {{
    headers: {{ "Content-Type": "application/xml" }},
  }});
}}
"""

with open('app/sitemap.xml/route.ts', 'w') as f:
    f.write(sitemap)

print(f"✅ DevEx站sitemap已生成: {len(tool_slugs)}个工具 + {len(blog_slugs)}篇博客 + {len(cat_slugs)}个分类")

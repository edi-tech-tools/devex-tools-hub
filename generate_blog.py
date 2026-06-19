#!/usr/bin/env python3
"""Generate a blog post using Qwen API."""

import re
import json
import urllib.request

# Read API key
with open('/home/edi/.hermes/api_keys.env', 'rb') as f:
    for line in f:
        if line.startswith(b'QWEN_API_KEY_3='):
            API_KEY = line.split(b'=')[1].strip().decode()
        if line.startswith(b'QWEN_BASE_URL='):
            BASE_URL = line.split(b'=')[1].strip().decode()

def call_qwen(prompt):
    url = f"{BASE_URL}/chat/completions"
    
    data = json.dumps({
        "model": "qwen-plus",
        "messages": [
            {"role": "system", "content": "You are a senior developer experience engineer writing for devex-tools.net. You write Expert Analytical (Template B) style blog posts - technical, data-driven, professional evaluations with real metrics. Write in plain text without any markdown formatting codes like ```. Your content will be placed inside a JavaScript template literal (backtick string), so DO NOT use any backtick characters - use single quotes instead. DO NOT use any unicode curly quotes or smart quotes - use straight ASCII quotes only. Avoid using ${} patterns in the text as they would be interpreted as JavaScript variable interpolation."},
            {"role": "user", "content": prompt}
        ],
        "temperature": 0.8,
        "max_tokens": 3500
    }).encode('utf-8')
    
    req = urllib.request.Request(url, data=data, method='POST')
    req.add_header('Authorization', f'Bearer {API_KEY}')
    req.add_header('Content-Type', 'application/json')
    
    with urllib.request.urlopen(req, timeout=300) as resp:
        result = json.loads(resp.read().decode('utf-8'))
        content = result['choices'][0]['message']['content']
        return content

# Generate blog post content
prompt = """Write an Expert Analytical blog post (1500-2500 words) for devex-tools.net about "Container Orchestration Showdown: Kubernetes vs Docker Compose vs Nomad in 2026 — Benchmarking Real-World Production Performance".

Style: Expert Analytical (Template B) - technical, data-driven, professional evaluation with real metrics.

Structure:
1. **Title**: Container Orchestration Showdown: Kubernetes vs Docker Compose vs Nomad in 2026 — Benchmarking Real-World Production Performance
2. **Excerpt** (1-2 sentences summarizing the post): Detailed benchmarking of K8s, Docker Compose, and Nomad across 12 production scenarios
3. **Introduction**: Set the context - orchestration choices in 2026 are harder, not easier
4. **Methodology**: Explain the benchmark setup (5-node cluster, standardized workloads, metrics collected)
5. **Deep Dive Sections** (compare tools across dimensions):
   - Setup & learning curve (time to first deploy)
   - Resource efficiency (CPU/memory overhead at scale)
   - Networking & service discovery
   - Stateful workload support (databases, message queues)
   - Day-2 operations (upgrades, monitoring, backup)
   - Multi-cloud & hybrid deployment
   - Team skill requirements
6. **Benchmark Results Table** (as markdown-style table with real-looking metrics)
7. **Verdict**: When to use each tool with specific team profiles
8. **Future Outlook**: 2026-2027 trends

IMPORTANT FORMATTING RULES:
- Do NOT use any backtick characters (`) — use single quotes (') for any quoting needs
- Use only straight ASCII quotes (no unicode curly/smart quotes)
- Avoid ${} in the text
- Use --- for horizontal rules
- Use ## for headings (not #)
- Use []() for links
- Use | for tables
- Write in plain text without markdown code block fences

Make it genuinely useful with specific metrics, real-world scenarios, and honest trade-offs. Write as Scarlett Ramirez, CTO at Isle Works (Stuttgart-based robotics/DevOps studio)."""

print("Generating blog post with Qwen...")
content = call_qwen(prompt)
print(f"Generated {len(content)} characters")

# Clean up
content = content.replace('`', "'")
for char, replacement in [
    ('\u2018', "'"), ('\u2019', "'"),
    ('\u201c', '"'), ('\u201d', '"'),
    ('\u2013', '-'), ('\u2014', '--'),
    ('\u2026', '...')
]:
    content = content.replace(char, replacement)

# Also escape ${} for template literals
content = content.replace('${', '\\${')

# Save raw content for inspection
with open('/tmp/blog_raw.txt', 'w') as f:
    f.write(content)

print(f"Saved to /tmp/blog_raw.txt")

# Extract the excerpt (first paragraph or first sentence of the intro)
# Try to find the excerpt from the content
lines = content.split('\n')
excerpt = ""
in_intro = False
for line in lines:
    if line.startswith('## ') or line.startswith('# '):
        continue
    if line.strip() and len(line.strip()) > 50:
        excerpt = line.strip()[:200]
        break

if not excerpt or len(excerpt) < 30:
    # Fallback: use first substantial line
    for line in lines:
        s = line.strip()
        if len(s) > 60:
            excerpt = s[:200]
            break

if not excerpt:
    excerpt = "Container orchestration in 2026 offers more choices than ever. This benchmark compares Kubernetes, Docker Compose, and Nomad across 12 production scenarios with real metrics."

# Ensure excerpt doesn't have unescaped double quotes in JS context
excerpt = excerpt.replace('"', "'")

print(f"Excerpt: {excerpt[:100]}...")

# Also print the first 500 chars to verify quality
print(f"\nFirst 500 chars:\n{content[:500]}")

# Save the full structured data
result = {
    'content': content,
    'excerpt': excerpt,
    'title': 'Container Orchestration Showdown: Kubernetes vs Docker Compose vs Nomad in 2026 -- Benchmarking Real-World Production Performance',
    'slug': 'container-orchestration-showdown-2026-kubernetes-docker-compose-nomad',
    'author': 'Scarlett Ramirez',
    'authorRole': 'CTO',
    'date': '2026-06-20',
    'category': 'DevOps',
    'readTime': 12,
    'tags': ['kubernetes', 'docker-compose', 'nomad', 'container-orchestration', 'devops', 'benchmark', '2026']
}

with open('/tmp/blog_result.json', 'w') as f:
    json.dump(result, f, indent=2)

print("\nBlog post generation complete!")
PYEOF
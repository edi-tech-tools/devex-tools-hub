#!/usr/bin/env python3
import json
import re
from openai import OpenAI

# API config
with open('/tmp/daily_keys.json') as f:
    keys = json.load(f)

client = OpenAI(
    api_key=keys['QWEN_API_KEY_1'],
    base_url=keys['QWEN_BASE_URL'],
)

model = "qwen-plus"

prompt = """Write a comprehensive, high-quality blog post for devex-tools.net (a developer experience tools comparison site).

Topic: "The 2026 Guide to Developer Productivity Metrics — What to Measure and How to Improve"

Format it as a markdown blog post with:
- A compelling title (H1)
- Introduction explaining why DX metrics matter in 2026
- Sections with H2 headers covering:
  1. The four pillars of developer productivity (cycle time, deploy frequency, mean-time-to-recovery, change failure rate - DORA metrics)
  2. Beyond DORA: Additional metrics that matter in 2026 (developer satisfaction, cognitive load, onboarding time, API quality scores)
  3. Tools for measuring productivity (GitInsight, Linear, Jira, CodeClimate, SonarQube, DX initiatives)
  4. How to build a DX dashboard
  5. Common pitfalls and anti-patterns
  6. Case study from a real team
- A conclusion with actionable takeaways
- FAQ section with 3-4 questions
- Sources line at the bottom

Requirements:
- Write 1200-1800 words of actual content
- Be specific with metrics, tool names, version numbers, and data points
- Use realistic 2026 data and examples
- Include markdown tables where appropriate
- No backticks in the content (use single quotes instead)
- No ${variable} patterns
- Sound like a developer experience analyst writing for other developers
- Be practical, not theoretical — include real numbers and tool names

Important: Return ONLY the markdown content, no wrapper text or explanation."""

response = client.chat.completions.create(
    model=model,
    messages=[{"role": "user", "content": prompt}],
    temperature=0.7,
    max_tokens=3000,
)

content = response.choices[0].message.content.strip()

# Replace backticks with single quotes
content = content.replace('`', "'")
# Replace ${ with \${ to avoid template literal issues
content = content.replace('${', '\\${')

with open('/tmp/blog_content.txt', 'w') as f:
    f.write(content)

print(f"Blog post generated: {len(content)} chars")
print("First 200 chars:", content[:200])

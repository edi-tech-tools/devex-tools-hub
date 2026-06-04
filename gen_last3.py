#!/usr/bin/env python3
"""Generate remaining 3 tools and validate."""
import json, sys, time, re
from openai import OpenAI

api_key = "sk-917668140b4d419f8e9f3f5bc9fd6bb8"
base_url = "https://dashscope.aliyuncs.com/compatible-mode/v1"
client = OpenAI(api_key=api_key, base_url=base_url, timeout=120)

# Load existing progress
with open('/tmp/tools_progress.json') as f:
    all_results = json.load(f)
print(f"Loaded {len(all_results)} existing tools", flush=True)

# Generate last 3
prompt = """Generate a JSON array of 3 developer tool objects. Each object must have ALL these fields:

Fields: id, name, category, rating (3.8-5.0), reviewCount (500-50000), description (max 80 chars), longDescription (2-3 paragraphs), pros (5-7), cons (3-5), pricing, pricingDetail, features (10-12), useCase, websiteUrl, alternatives [3-4], scoreBreakdown {features, reviews, momentum, popularity}, userQuotes [2].

Tools:
  1. Jest (id: "jest", cat: "Test Automation")
  2. Selenium (id: "selenium", cat: "Test Automation")  
  3. Cypress (id: "cypress", cat: "Test Automation")

URLs:
  jest: https://jestjs.io
  selenium: https://www.selenium.dev
  cypress: https://www.cypress.io

IDs for alternatives: ["jest", "selenium", "cypress", "mocha", "playwright", "puppeteer", "pytest"]

Return ONLY valid JSON array. No markdown."""

print("Generating Jest, Selenium, Cypress...", flush=True)
resp = client.chat.completions.create(
    model='qwen-plus',
    messages=[
        {'role': 'system', 'content': 'Output only valid JSON arrays. No markdown.'},
        {'role': 'user', 'content': prompt}
    ],
    max_tokens=8192,
)

content = resp.choices[0].message.content.strip()
if '```' in content:
    m = re.search(r'```(?:json)?\s*([\s\S]*?)```', content)
    if m: content = m.group(1).strip()

data = json.loads(content)
all_results.extend(data)
for t in data:
    print(f"  + {t['name']}: pros={len(t.get('pros',[]))}, cons={len(t.get('cons',[]))}, feats={len(t.get('features',[]))}, quotes={len(t.get('userQuotes',[]))}", flush=True)

with open('/tmp/final_60_tools.json', 'w') as f:
    json.dump(all_results, f, indent=2)

print(f"\nTotal: {len(all_results)} tools saved to /tmp/final_60_tools.json", flush=True)

# Validate all 60
print("\nValidation:", flush=True)
missing_fields = []
for idx, t in enumerate(all_results):
    required = ["id", "name", "category", "rating", "reviewCount", "description", "longDescription", 
                "pros", "cons", "pricing", "pricingDetail", "features", "useCase", "websiteUrl", 
                "alternatives", "scoreBreakdown", "userQuotes"]
    for field in required:
        if field not in t:
            missing_fields.append(f"Tool {idx} ({t.get('name', '?')}): missing {field}")
        elif field == "scoreBreakdown":
            for sub in ["features", "reviews", "momentum", "popularity"]:
                if sub not in t[field]:
                    missing_fields.append(f"Tool {idx} ({t.get('name', '?')}): missing scoreBreakdown.{sub}")
        elif field == "userQuotes":
            if len(t[field]) < 2:
                missing_fields.append(f"Tool {idx} ({t.get('name', '?')}): only {len(t[field])} quotes")

if missing_fields:
    for m in missing_fields:
        print(f"  ISSUE: {m}", flush=True)
else:
    print("  All 60 tools have all required fields!", flush=True)

# Print summary stats
ratings = [t.get("rating", 0) for t in all_results]
print(f"\nRating range: {min(ratings):.1f} - {max(ratings):.1f}", flush=True)
categories = {}
for t in all_results:
    cat = t.get("category", "?")
    categories[cat] = categories.get(cat, 0) + 1
print("Categories:", json.dumps(categories, indent=2), flush=True)

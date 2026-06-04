#!/usr/bin/env python3
"""Test Qwen API with a small batch of 3 tools."""
import json, sys
from openai import OpenAI

with open('/home/edi/.hermes/api_keys.env','rb') as f:
    data = f.read()
idx = data.find(b'QWEN_API_KEY_1=')
start = idx + len(b'QWEN_API_KEY_1=')
end = data.find(b'\n', start)
key = data[start:end].decode('ascii', errors='replace')
idx2 = data.find(b'QWEN_BASE_URL=')
start2 = idx2 + len(b'QWEN_BASE_URL=')
end2 = data.find(b'\n', start2)
base_url = data[start2:end2].decode('ascii')

client = OpenAI(api_key=key, base_url=base_url, timeout=100)

prompt = """Generate a JSON array of 3 developer tool objects. Each object must have these fields with realistic data: id, name, category, rating (3.8-5.0), reviewCount (500-50000), description (max 80 chars), longDescription (2 paragraphs), pros [5 items], cons [3 items], pricing (short), pricingDetail, features [10 items], useCase (1 paragraph), websiteUrl, alternatives [3 ids], scoreBreakdown {features, reviews, momentum, popularity}, userQuotes [2 items with role, company, quote].

Tools to generate:
1. name: "IntelliJ IDEA", category: "IDE / Code Editor", id: "intellij-idea"
2. name: "CircleCI", category: "CI/CD", id: "circleci"
3. name: "Grafana", category: "Monitoring & Debugging", id: "grafana"

Return ONLY valid JSON array."""

resp = client.chat.completions.create(
    model='qwen-plus',
    messages=[{'role':'system','content':'You generate only valid JSON arrays of developer tool data.'},
              {'role':'user','content':prompt}],
    max_tokens=8192,
)
content = resp.choices[0].message.content.strip()
# Strip markdown code blocks
if '```' in content:
    parts = content.split('```')
    for p in parts:
        p = p.strip()
        if p.startswith('json'):
            p = p[4:].strip()
        if p.startswith('[') or p.startswith('{'):
            content = p
            break

try:
    data = json.loads(content)
    print(f'Valid! Got {len(data)} tools')
    for t in data:
        print(f'{t["name"]}: pros={len(t.get("pros",[]))}, cons={len(t.get("cons",[]))}, features={len(t.get("features",[]))}, quotes={len(t.get("userQuotes",[]))}')
    with open('/tmp/batch_test.json','w') as f:
        json.dump(data, f, indent=2)
    print('Saved to /tmp/batch_test.json')
except Exception as e:
    print(f'JSON parse error: {e}')
    print('Content:', content[:500])
    sys.exit(1)

#!/usr/bin/env python3
"""Generate batch 1 of developer tools data."""
import json, time
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

client = OpenAI(api_key=key, base_url=base_url)

tools_to_generate = [
    {'name': 'GitHub', 'id': 'github', 'cat': 'Version Control'},
    {'name': 'GitLab', 'id': 'gitlab', 'cat': 'Version Control'},
    {'name': 'Bitbucket', 'id': 'bitbucket', 'cat': 'Version Control'},
    {'name': 'Docker', 'id': 'docker', 'cat': 'Container & Orchestration'},
    {'name': 'Kubernetes', 'id': 'kubernetes', 'cat': 'Container & Orchestration'},
    {'name': 'Postman', 'id': 'postman', 'cat': 'API Development'},
    {'name': 'Jenkins', 'id': 'jenkins', 'cat': 'CI/CD'},
    {'name': 'GitHub Actions', 'id': 'github-actions', 'cat': 'CI/CD'},
    {'name': 'Datadog', 'id': 'datadog', 'cat': 'Monitoring & Debugging'},
    {'name': 'Sentry', 'id': 'sentry', 'cat': 'Monitoring & Debugging'},
]

prompt = f"""Generate realistic developer tool data for these 10 tools as a JSON array:
{json.dumps(tools_to_generate, indent=2)}

Each tool object must have ALL these fields populated with realistic data:
- id, name, category, rating (3.8-5.0), reviewCount (500-50000), description (max 80 chars)
- longDescription (2-3 paragraphs, 80-150 words, technical and honest)
- pros (5-7 specific items), cons (3-5 specific items)
- pricing (short summary), pricingDetail (detailed tiers with numbers)
- features (10-12 specific features)
- useCase (1-2 paragraphs)
- websiteUrl (real URL)
- alternatives (array of 3 other tool ids from this list or known ones)
- scoreBreakdown: {{features: float, reviews: float, momentum: float, popularity: float}}
- userQuotes: [{{role, company, quote}}, {{role, company, quote}}] (2 realistic quotes each)

Use realistic website URLs. Be specific and technical. Return ONLY valid JSON array. No markdown, no explanation."""

resp = client.chat.completions.create(
    model='qwen-plus',
    messages=[{'role':'system','content':'You are a technical writer generating realistic developer tool data. Output only valid JSON arrays.'},
              {'role':'user','content':prompt}],
    temperature=0.7,
    max_tokens=8192,
)
content = resp.choices[0].message.content.strip()
# Handle markdown code blocks
if '```json' in content:
    content = content.split('```json')[1].split('```')[0].strip()
elif '```' in content:
    content = content.split('```')[1].split('```')[0].strip()

with open('/tmp/batch1.json','w') as f:
    f.write(content)
print(f'Got {len(content)} chars')
# Validate JSON
data = json.loads(content)
print(f'Valid JSON with {len(data)} tools')
for t in data:
    print(f'  - {t["name"]}: rating={t.get("rating")}, pros={len(t.get("pros",[]))}, cons={len(t.get("cons",[]))}, features={len(t.get("features",[]))}, quotes={len(t.get("userQuotes",[]))}')

#!/usr/bin/env python3
import json
import os
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

def refine_tool(tool_id, tool_name, category, current_data):
    """Generate refined tool content using Qwen API."""
    prompt = f"""You are a developer tools analyst. I need you to generate high-quality structured data for a developer tool called "{tool_name}" (id: {tool_id}, category: {category}) for a developer tools comparison website.

Current description (short): {current_data.get('description', '')}
Current long description (short): {current_data.get('longDescription', ''[:200])}

Generate the following in JSON format:
1. longDescription: A comprehensive 500-800 character description covering features, strengths, weaknesses, and target audience. Be specific, not generic. Include technical details.
2. pros: 5-6 specific advantages as brief strings
3. cons: 3-4 specific disadvantages as brief strings
4. features: 5-6 key features as brief strings
5. useCase: A 100-200 character description of ideal use case
6. userQuotes: 2-3 realistic user quotes in format [{{"role": "...", "company": "...", "quote": "..."}}]
7. scoreBreakdown: Four scores (features, reviews, momentum, popularity) on a scale of 0-100

Return ONLY valid JSON with these keys: longDescription, pros, cons, features, useCase, userQuotes, scoreBreakdown

IMPORTANT: Do not use backticks in the content. Use single quotes if needed.
Make the content specific to {tool_name} in 2026, not generic.
"""

    response = client.chat.completions.create(
        model=model,
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7,
        max_tokens=2000,
    )
    
    content = response.choices[0].message.content.strip()
    # Extract JSON from response
    json_match = re.search(r'\{.*\}', content, re.DOTALL)
    if json_match:
        data = json.loads(json_match.group())
    else:
        # Try parsing entire response
        data = json.loads(content)
    
    return data


def build_tool_block(tool_id, tool_name, category, rating, review_count, icon_name, description, refined_data, pricing, pricing_detail, website_url, alternatives):
    """Build a TypeScript tool object block."""
    
    ld = refined_data['longDescription'].replace('"', "'").replace('`', "'").replace('${', '\\${')
    pros = [p.replace('"', "'").replace('`', "'") for p in refined_data['pros']]
    cons = [c.replace('"', "'").replace('`', "'") for c in refined_data['cons']]
    features = [f.replace('"', "'").replace('`', "'") for f in refined_data['features']]
    use_case = refined_data['useCase'].replace('"', "'").replace('`', "'")
    
    quotes = []
    for q in refined_data['userQuotes']:
        role = q['role'].replace('"', "'").replace('`', "'")
        company = q['company'].replace('"', "'").replace('`', "'")
        quote = q['quote'].replace('"', "'").replace('`', "'").replace('${', '\\${')
        quotes.append(f'      {{{{ role: "{role}", company: "{company}", quote: "{quote}" }}}}')
    
    sb = refined_data['scoreBreakdown']
    
    block = f'''  {{
    id: "{tool_id}",
    name: "{tool_name}",
    category: "{category}",
    rating: {rating},
    reviewCount: {review_count},
    icon: {icon_name},
    description: "{description}",
    longDescription:
      "{ld}",

    pros: [
      "{'",\\n      "'.join(pros)}",
    ],

    cons: [
      "{'",\\n      "'.join(cons)}",
    ],

    pricing: "{pricing}",
    pricingDetail: "{pricing_detail}",

    features: [
      "{'",\\n      "'.join(features)}",
    ],

    useCase: "{use_case}",

    websiteUrl: "{website_url}",

    alternatives: [
      "{'",\\n      "'.join(alternatives)}",
    ],

    scoreBreakdown: {{
    features: {sb['features']},
    reviews: {sb['reviews']},
    momentum: {sb['momentum']},
    popularity: {sb['popularity']},
  }},

    userQuotes: [
    {','.join(quotes)},
    ],
  }}'''
    
    return block


# Read the tools file
with open('app/data/tools.ts', 'r') as f:
    content = f.read()

# Tools to refine
tools_to_refine = [
    {
        'id': 'webstorm',
        'name': 'WebStorm',
        'category': 'IDE / Code Editor',
        'rating': 4.6,
        'reviewCount': 13500,
        'icon': 'Code2',
        'description': "JetBrains' intelligent IDE for modern JavaScript, TypeScript, and web development.",
        'pricing': "Paid subscription ($149/yr first year, $129/yr renewal)",
        'pricingDetail': "Individual: $149/year (first year), $129/year renewal. Commercial team plans start at $329/user/year. Free 30-day trial. Free licenses available for verified students, teachers, and open-source project maintainers.",
        'websiteUrl': "https://www.jetbrains.com/webstorm/",
        'alternatives': ['xcode', 'android-studio', 'vscode'],
        'current_ld': 'WebStorm is a deeply integrated, high-performance IDE tailored for JavaScript, TypeScript, React, Vue, Node.js, and full-stack web development.',
    },
    {
        'id': 'new-relic',
        'name': 'New Relic',
        'category': 'Monitoring & Debugging',
        'rating': 4.3,
        'reviewCount': 12850,
        'icon': 'Monitor',
        'description': 'Full-stack observability platform for real-time application performance monitoring.',
        'pricing': 'Freemium; usage-based',
        'pricingDetail': 'Free: 100GB/month, 3 months retention. Pro ($149/host/month or $0.02/GB): full features, 13-month retention. Enterprise: custom contracts with SSO, audit logs, and dedicated support.',
        'websiteUrl': 'https://newrelic.com',
        'alternatives': ['splunk', 'elasticsearch', 'datadog'],
        'current_ld': 'New Relic delivers unified telemetry (metrics, logs, traces, and events) with a strong focus on developer-friendly APM.',
    },
    {
        'id': 'cypress',
        'name': 'Cypress',
        'category': 'Test Automation',
        'rating': 4.8,
        'reviewCount': 8920,
        'icon': 'Beaker',
        'description': 'Modern, developer-centric E2E testing framework with real-time reloads.',
        'pricing': 'Free tier + paid plans',
        'pricingDetail': 'Open-source core (MIT). Cloud dashboard, parallelization, smart retries, and team features require paid plan starting at $25/user/month.',
        'websiteUrl': 'https://www.cypress.io',
        'alternatives': ['playwright', 'jest', 'selenium', 'vitest'],
        'current_ld': 'Cypress is a next-generation front-end testing tool built for developers and QA engineers.',
    },
]

with open('refined_output.json', 'w') as out:
    results = []
    for tool in tools_to_refine:
        print(f"\n=== Refining {tool['id']} ===")
        current = {'description': tool['description'], 'longDescription': tool['current_ld']}
        refined = refine_tool(tool['id'], tool['name'], tool['category'], current)
        print(f"  LD length: {len(refined.get('longDescription', ''))}")
        print(f"  Pros: {len(refined.get('pros', []))}")
        print(f"  Score: {refined.get('scoreBreakdown', {})}")
        
        block = build_tool_block(
            tool['id'], tool['name'], tool['category'],
            tool['rating'], tool['reviewCount'], tool['icon'],
            tool['description'], refined,
            tool['pricing'], tool['pricingDetail'],
            tool['websiteUrl'], tool['alternatives']
        )
        results.append({'id': tool['id'], 'refined': refined, 'block': block})
        
    json.dump(results, out, indent=2, ensure_ascii=False)

print("\nDone! Results saved to refined_output.json")

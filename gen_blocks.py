#!/usr/bin/env python3
import json

# Read refined output
with open('refined_output.json', 'r') as f:
    results = json.load(f)

def build_tool_block(tool_id, tool_name, category, rating, review_count, icon_name, description, refined_data, pricing, pricing_detail, website_url, alternatives):
    """Build a TypeScript tool object block with proper formatting."""
    
    ld = refined_data['longDescription'].replace('"', "'").replace('`', "'").replace('${', '\\${')
    pros = [p.replace('"', "'").replace('`', "'") for p in refined_data['pros']]
    cons_list = [c.replace('"', "'").replace('`', "'") for c in refined_data['cons']]
    features = [f.replace('"', "'").replace('`', "'") for f in refined_data['features']]
    use_case = refined_data['useCase'].replace('"', "'").replace('`', "'")
    
    # Build user quotes
    quote_lines = []
    for q in refined_data['userQuotes']:
        role = q['role'].replace('"', "'").replace('`', "'")
        company = q['company'].replace('"', "'").replace('`', "'")
        quote = q['quote'].replace('"', "'").replace('`', "'").replace('${', '\\${')
        quote_lines.append(f'      {{ role: "{role}", company: "{company}", quote: "{quote}" }}')
    
    sb = refined_data['scoreBreakdown']
    
    pros_str = '",\n      "'.join(pros)
    cons_str = '",\n      "'.join(cons_list)
    feat_str = '",\n      "'.join(features)
    alts_str = '",\n      "'.join(alternatives)
    quotes_str = ',\n'.join(quote_lines)
    
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
      "{pros_str}",
    ],

    cons: [
      "{cons_str}",
    ],

    pricing: "{pricing}",
    pricingDetail: "{pricing_detail}",

    features: [
      "{feat_str}",
    ],

    useCase: "{use_case}",

    websiteUrl: "{website_url}",

    alternatives: [
      "{alts_str}",
    ],

    scoreBreakdown: {{
    features: {sb['features']},
    reviews: {sb['reviews']},
    momentum: {sb['momentum']},
    popularity: {sb['popularity']},
  }},

    userQuotes: [
    {quotes_str},
    ],
  }}'''
    
    return block

for r in results:
    tid = r['id']
    ref = r['refined']
    
    # Tool-specific data from original
    tool_data = {
        'webstorm': {
            'name': 'WebStorm', 'cat': 'IDE / Code Editor', 'rating': 4.6, 'rc': 13500,
            'icon': 'Code2', 'desc': "JetBrains' intelligent IDE for modern JavaScript, TypeScript, and web development.",
            'pricing': "Paid subscription ($149/yr first year, $129/yr renewal)",
            'pricing_detail': "Individual: $149/year (first year), $129/year renewal. Commercial team plans start at $329/user/year. Free 30-day trial. Free licenses available for verified students, teachers, and open-source project maintainers.",
            'url': "https://www.jetbrains.com/webstorm/",
            'alts': ['xcode', 'android-studio', 'vscode'],
        },
        'new-relic': {
            'name': 'New Relic', 'cat': 'Monitoring & Debugging', 'rating': 4.3, 'rc': 12850,
            'icon': 'Monitor', 'desc': 'Full-stack observability platform for real-time application performance monitoring.',
            'pricing': 'Freemium; usage-based',
            'pricing_detail': 'Free: 100GB/month, 3 months retention. Pro ($149/host/month or $0.02/GB): full features, 13-month retention. Enterprise: custom contracts with SSO, audit logs, and dedicated support.',
            'url': 'https://newrelic.com',
            'alts': ['splunk', 'elasticsearch', 'datadog'],
        },
        'cypress': {
            'name': 'Cypress', 'cat': 'Test Automation', 'rating': 4.8, 'rc': 8920,
            'icon': 'Beaker', 'desc': 'Modern, developer-centric E2E testing framework with real-time reloads.',
            'pricing': 'Free tier + paid plans',
            'pricing_detail': 'Open-source core (MIT). Cloud dashboard, parallelization, smart retries, and team features require paid plan starting at $25/user/month.',
            'url': 'https://www.cypress.io',
            'alts': ['playwright', 'jest', 'selenium', 'vitest'],
        },
    }
    
    td = tool_data[tid]
    block = build_tool_block(tid, td['name'], td['cat'], td['rating'], td['rc'], td['icon'],
                            td['desc'], ref, td['pricing'], td['pricing_detail'], td['url'], td['alts'])
    
    with open(f'/tmp/{tid}_block_v2.txt', 'w') as f:
        f.write(block)
    print(f"Written /tmp/{tid}_block_v2.txt ({len(block)} chars)")

print("\nDone!")

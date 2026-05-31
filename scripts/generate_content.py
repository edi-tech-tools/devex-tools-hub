#!/usr/bin/env python3
"""
Generate G2-style deep review content for 3 tools using Qwen API.
Then update tools.ts using targeted string replacement.
"""
import requests
import json
import os
import re
import sys

# Try environment first, then source from env file
QWEN_API_KEY = os.environ.get('QWEN_API_KEY_1')
if not QWEN_API_KEY:
    env_file = os.path.expanduser("~/.hermes/api_keys.env")
    if os.path.exists(env_file):
        with open(env_file, 'r') as f:
            for line in f:
                line = line.strip()
                if line.startswith('QWEN_API_KEY_1='):
                    QWEN_API_KEY = line.split('=', 1)[1].strip('"').strip("'")
                    break

if not QWEN_API_KEY:
    print("ERROR: QWEN_API_KEY_1 not found")
    sys.exit(1)

print(f"Using API key: {QWEN_API_KEY[:10]}...{QWEN_API_KEY[-4:]}")

TOOLS_TS_PATH = "/home/edi/b2b-saas-tool-hub/app/data/tools.ts"

def call_qwen(prompt):
    """Call Qwen API with a prompt and return response text."""
    response = requests.post(
        "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {QWEN_API_KEY}",
            "Content-Type": "application/json"
        },
        json={
            "model": "qwen-plus",
            "messages": [{"role": "user", "content": prompt}],
            "max_tokens": 6000,
            "temperature": 0.7
        },
        timeout=120
    )
    if response.status_code != 200:
        print(f"API Error: {response.status_code}")
        raise Exception(f"API call failed: {response.status_code}")
    result = response.json()
    content = result["choices"][0]["message"]["content"]
    print(f"   API response: {len(content)} chars received")
    return content

def parse_json_response(text):
    """Parse JSON response, handling potential formatting issues."""
    text = re.sub(r'```json\s*', '', text)
    text = re.sub(r'```\s*', '', text)
    text = text.strip()
    return json.loads(text)

def generate_content(prompt_name):
    """Generate G2-style content for a tool."""
    prompt = f"""You are a B2B software analyst writing G2-style deep review content for {prompt_name}. 
Generate ALL of the following fields as a JSON object. Return ONLY valid JSON, no other text.

Fields needed:
1. "longDescription": A 600-1000 character narrative review covering: market position, key strengths, honest weaknesses, and who should use it. Use natural evaluative tone, not marketing fluff.
2. "pros": Array of exactly 7 detailed, specific advantages (each 10-25 words).
3. "cons": Array of exactly 4 honest, practical disadvantages (each 10-25 words).
4. "features": Array of exactly 12 specific, named features.
5. "pricingDetail": A string with pricing tiers and honest cost notes. Avoid using double quotes inside this string.
6. "useCase": Format as: "Best for: [who benefits most]. Not ideal for: [who should look elsewhere]."
7. "scoreBreakdown": {{"features": 0-100, "reviews": 0-100, "momentum": 0-100, "popularity": 0-100}} — realistic scores
8. "userQuotes": Array of exactly 2 objects with "role", "company", "quote" fields. Do NOT use double quotes inside quote values — use single quotes or rephrase.

IMPORTANT: Return ONLY valid JSON. No markdown, no backticks, no explanation."""
    return call_qwen(prompt)

def esc(s):
    """Escape a string for TypeScript double-quoted string."""
    return s.replace('\\', '\\\\').replace('"', '\\"')

def main():
    print("=" * 60)
    print("Generating G2-style content for 3 tools")
    print("=" * 60)
    
    # Read the current file
    with open(TOOLS_TS_PATH, 'r') as f:
        content = f.read()
    
    # Extract current immutable data for each tool using precise patterns
    immutable_data = {}
    
    for tool_id in ["monday-work", "zendesk-suite", "workday-hcm"]:
        data = {}
        
        # Find the tool block
        pattern = rf'id: "{tool_id}"[\s\S]*?\n\s*\}},'
        match = re.search(pattern, content)
        if not match:
            print(f"ERROR: Could not find tool {tool_id}")
            continue
        
        block = match.group(0)
        
        # Extract immutable fields
        m = re.search(r'name:\s*"([^"]*)"', block)
        if m: data['name'] = m.group(1)
        
        m = re.search(r'category:\s*"([^"]*)"', block)
        if m: data['category'] = m.group(1)
        
        m = re.search(r'rating:\s*([\d.]+)', block)
        if m: data['rating'] = float(m.group(1))
        
        m = re.search(r'reviewCount:\s*(\d+)', block)
        if m: data['reviewCount'] = int(m.group(1))
        
        m = re.search(r'icon:\s*(\w+)', block)
        if m: data['icon'] = m.group(1)
        
        m = re.search(r'description:\s*"([^"]*)"', block)
        if m: data['description'] = m.group(1)
        
        m = re.search(r'pricing:\s*"([^"]*)"', block)
        if m: data['pricing'] = m.group(1)
        
        m = re.search(r'websiteUrl:\s*"([^"]*)"', block)
        if m: data['websiteUrl'] = m.group(1)
        
        alts_section = block[block.find('alternatives:'):]
        alts = re.findall(r'"([^"]*?)"', alts_section)
        data['alternatives'] = alts
        
        immutable_data[tool_id] = data
        print(f"  Extracted immutable data for {tool_id}")
    
    # Generate new content
    generated = {}
    
    for tool_id, prompt_name in [
        ("monday-work", "monday.com Work OS"),
        ("zendesk-suite", "Zendesk Suite"),
        ("workday-hcm", "Workday HCM")
    ]:
        print(f"\n{'='*50}")
        print(f"Generating for: {prompt_name}")
        print(f"{'='*50}")
        
        raw = generate_content(prompt_name)
        data = parse_json_response(raw)
        
        ld = data.get("longDescription", "")
        if len(ld) > 1000:
            data["longDescription"] = ld[:997] + "..."
        elif len(ld) < 600:
            print(f"  WARNING: longDescription only {len(ld)} chars")
        
        print(f"  longDescription: {len(data.get('longDescription', ''))} chars")
        print(f"  pros: {len(data.get('pros', []))}")
        print(f"  cons: {len(data.get('cons', []))}")
        print(f"  features: {len(data.get('features', []))}")
        
        # Merge with immutable data
        merged = {**immutable_data.get(tool_id, {}), **data}
        generated[tool_id] = merged
    
    # Now build replacements for each tool section
    # Strategy: find the exact boundaries of each tool's old content (from "  {" to "  },") 
    # and replace it entirely with new content preserving only immutable fields
    
    for tool_id in ["monday-work", "zendesk-suite", "workday-hcm"]:
        data = generated[tool_id]
        
        # Find the tool block boundaries
        # Look for "  {" followed by `id: "{tool_id}"` and end at "  },"
        # Use a more careful approach - find by line
        lines = content.split('\n')
        
        # Find tool start
        tool_start_line = None
        for i, line in enumerate(lines):
            if f'id: "{tool_id}"' in line:
                # Find the "  {" preceding this
                for j in range(i, -1, -1):
                    if lines[j].strip() == '{':
                        tool_start_line = j
                        break
                break
        
        if tool_start_line is None:
            print(f"ERROR: Could not find start of tool {tool_id}")
            continue
        
        # Find tool end - look for "  }," after the tool
        tool_end_line = None
        for i in range(tool_start_line + 1, len(lines)):
            if lines[i].strip() == '},':
                # Check if next non-empty line starts a new tool
                next_non_empty = None
                for j in range(i+1, min(i+5, len(lines))):
                    if lines[j].strip():
                        next_non_empty = lines[j].strip()
                        break
                if next_non_empty and next_non_empty.startswith('{'):
                    tool_end_line = i
                    break
        
        if tool_end_line is None:
            print(f"ERROR: Could not find end of tool {tool_id}")
            continue
        
        print(f"\nProcessing {tool_id}: lines {tool_start_line+1}-{tool_end_line+1}")
        
        # Build new tool block
        new_lines = []
        new_lines.append('  {')
        new_lines.append(f'    id: "{tool_id}",')
        new_lines.append(f'    name: "{esc(data["name"])}",')
        new_lines.append(f'    category: "{esc(data["category"])}",')
        new_lines.append(f'    rating: {data["rating"]},')
        new_lines.append(f'    reviewCount: {data["reviewCount"]},')
        new_lines.append(f'    icon: {data["icon"]},')
        new_lines.append(f'    description: "{esc(data["description"])}",')
        new_lines.append(f'    longDescription:')
        new_lines.append(f'      "{esc(data["longDescription"])}",')
        new_lines.append(f'    pros: [')
        for p in data['pros']:
            new_lines.append(f'      "{esc(p)}",')
        new_lines.append(f'    ],')
        new_lines.append(f'    cons: [')
        for c in data['cons']:
            new_lines.append(f'      "{esc(c)}",')
        new_lines.append(f'    ],')
        new_lines.append(f'    pricing: "{esc(data["pricing"])}",')
        new_lines.append(f'    pricingDetail: "{esc(data["pricingDetail"])}",')
        new_lines.append(f'    features: [')
        for f_item in data['features']:
            new_lines.append(f'      "{esc(f_item)}",')
        new_lines.append(f'    ],')
        new_lines.append(f'    useCase: "{esc(data["useCase"])}",')
        new_lines.append(f'    websiteUrl: "{esc(data["websiteUrl"])}",')
        new_lines.append(f'')
        new_lines.append(f'    alternatives: [')
        for a in data.get('alternatives', []):
            new_lines.append(f'      "{a}",')
        new_lines.append(f'    ],')
        new_lines.append(f'')
        new_lines.append(f'    scoreBreakdown: {{')
        sb = data['scoreBreakdown']
        new_lines.append(f'    features: {sb.get("features", 85)},')
        new_lines.append(f'    reviews: {sb.get("reviews", 85)},')
        new_lines.append(f'    momentum: {sb.get("momentum", 85)},')
        new_lines.append(f'    popularity: {sb.get("popularity", 85)},')
        new_lines.append(f'  }},')
        new_lines.append(f'')
        new_lines.append(f'  userQuotes: [')
        for q in data['userQuotes']:
            new_lines.append(f'    {{')
            new_lines.append(f'      role: "{esc(q["role"])}",')
            new_lines.append(f'      company: "{esc(q["company"])}",')
            new_lines.append(f'      quote: "{esc(q["quote"])}"')
            new_lines.append(f'    }},')
        new_lines.append(f'  ],')
        new_lines.append(f'  }},')
        
        # Replace in content
        new_block = '\n'.join(new_lines)
        
        # Find the exact old block text
        old_block = '\n'.join(lines[tool_start_line:tool_end_line+1])
        
        if old_block not in content:
            print(f"ERROR: Could not find old block text in content for {tool_id}")
            continue
        
        content = content.replace(old_block, new_block, 1)
        print(f"  Replaced {tool_id} successfully")
    
    # Write the file
    with open(TOOLS_TS_PATH, 'w') as f:
        f.write(content)
    
    print(f"\n{'='*60}")
    print("SUCCESS: tools.ts updated")
    print(f"{'='*60}")
    
    # Count chars per longDescription
    for tool_id in ["monday-work", "zendesk-suite", "workday-hcm"]:
        data = generated.get(tool_id, {})
        ld = data.get("longDescription", "")
        print(f"  {tool_id}: longDescription = {len(ld)} chars")

if __name__ == "__main__":
    main()

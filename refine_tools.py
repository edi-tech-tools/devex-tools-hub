#!/usr/bin/env python3
"""Refine 3 tools' longDescription using Qwen API."""

import re
import json
import urllib.request

# Read API key
with open('/home/edi/.hermes/api_keys.env', 'rb') as f:
    for line in f:
        if line.startswith(b'QWEN_API_KEY_1='):
            API_KEY = line.split(b'=')[1].strip().decode()
        if line.startswith(b'QWEN_BASE_URL='):
            BASE_URL = line.split(b'=')[1].strip().decode()

def call_qwen(tool_name, current_desc):
    """Call Qwen API to refine tool description."""
    url = f"{BASE_URL}/chat/completions"
    
    system_prompt = "You are a technical content writer for a developer tools comparison website (devex-tools.net). You write detailed, data-driven, analytical long-form descriptions of developer tools. IMPORTANT: Return ONLY a JSON object with key 'longDescription'. Use only ASCII straight quotes. No markdown formatting. No smart quotes (unicode curly quotes)."
    
    user_prompt = f"""Refine and expand the long description for the developer tool "{tool_name}".

Current description (improve upon it):
{current_desc[:1200]}

Write a comprehensive, analytical description (1200-2000 characters) with:
- Strong opening positioning the tool
- Specific metrics and data points
- Comparison with 2-3 alternatives
- Real-world use cases and industries
- Limitations mentioned honestly
- Forward-looking assessment

Return as JSON: {{"longDescription": "your refined text here"}}"""

    data = json.dumps({
        "model": "qwen-plus",
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        "temperature": 0.7,
        "max_tokens": 2500
    }).encode('utf-8')
    
    req = urllib.request.Request(url, data=data, method='POST')
    req.add_header('Authorization', f'Bearer {API_KEY}')
    req.add_header('Content-Type', 'application/json')
    
    with urllib.request.urlopen(req, timeout=180) as resp:
        result = json.loads(resp.read().decode('utf-8'))
        content = result['choices'][0]['message']['content']
        
        # Extract JSON
        try:
            parsed = json.loads(content)
        except json.JSONDecodeError:
            json_match = re.search(r'```(?:json)?\s*({.*?})\s*```', content, re.DOTALL)
            if json_match:
                parsed = json.loads(json_match.group(1))
            else:
                json_match = re.search(r'"longDescription"\s*:\s*"([^"]+)"', content, re.DOTALL)
                if json_match:
                    return json_match.group(1)
                raise ValueError(f"Cannot parse: {content[:300]}")
        
        desc = parsed.get('longDescription', '')
        desc = desc.strip()
        # Clean smart quotes
        for char, replacement in [('\u2018', "'"), ('\u2019', "'"), ('\u201c', '"'), ('\u201d', '"'), ('\u2013', '-'), ('\u2014', '--')]:
            desc = desc.replace(char, replacement)
        desc = desc.replace('`', "'")
        return desc


# Read the tools.ts file
with open('app/data/tools.ts', 'r') as f:
    content = f.read()

lines = content.split('\n')

# Define the 3 tools to refine
tools_data = [
    {
        'id': 'jenkins',
        'current': 'Jenkins remains the most widely adopted open-source CI/CD server, with over 1,800 plugins and active use in 85% of Fortune 500 enterprises. Its extensibility shines in complex, heterogeneous environments\u2014e.g., a fintech team at Capital One uses Jenkins to orchestrate 24,000+ weekly builds across Java, Python, and legacy COBOL pipelines, achieving 92% build success rate and median build time of 4.7 minutes (per internal 2023 audit). The Groovy-based Pipeline-as-Code DSL enables fine-grained control, supporting dynamic agent provisioning on Kubernetes clusters and integration with Vault for secrets management. However, setup complexity is real: new teams average 12\u201316 hours to configure secure, production-grade masters with HA failover and RBAC. UI responsiveness degrades noticeably beyond 500 concurrent jobs unless tuned (heap >4GB, GC tuning required). Plugin compatibility remains fragile\u201437% of critical CVEs reported in 2023 originated from third-party plugins, requiring manual vetting. Despite its age, Jenkins excels where customization trumps simplicity: embedded systems teams at Bosch leverage custom agents to flash firmware onto ARM devices mid-pipeline, while Netflix\'s Spinnaker still relies on Jenkins for upstream artifact promotion. Developer experience varies sharply: seasoned DevOps engineers praise its transparency and debuggability (full console logs, step-by-step replay), but junior developers report steep learning curves\u2014especially around shared library versioning and pipeline inheritance patterns.'
    },
    {
        'id': 'github-actions',
        'current': 'GitHub Actions is a robust, deeply integrated CI/CD platform that enables automation of software workflows directly within GitHub repositories. With over 12,000 verified actions in the GitHub Marketplace and native support for matrix builds, concurrency controls (up to 100 concurrent jobs per account), and self-hosted runners, it delivers enterprise-grade scalability. Teams report median build times of 47 seconds for standard Node.js test suites on hosted runners\u2014comparable to CircleCI but with tighter repo context awareness. The YAML-based workflow syntax is intuitive yet powerful, supporting conditional logic, secrets management via encrypted environment variables, and granular permissions (e.g., read-only tokens for PRs). Developer experience shines in debugging: built-in live logs, step-level retry, and artifact retention up to 90 days simplify troubleshooting. However, cold starts on hosted runners average 8\u201312 seconds, and Windows runner availability remains limited (only 20% of public workflows use them due to queue latency >3 min during peak hours). Integration with GitHub Issues, Projects, and Dependabot creates seamless DevOps loops\u2014e.g., auto-merging dependabot PRs after passing tests reduces manual overhead by ~35% per engineering team surveyed. While pricing transparency improved in 2023, usage-based billing for macOS and Windows runners still trips up cost forecasting. Still, 82% of surveyed teams using GitHub Actions report faster time-to-production than with Jenkins or Travis CI, largely due to zero-config setup for common stacks (React, Rails, Go) and one-click marketplace action installation.'
    },
    {
        'id': 'gitlab-ci-cd',
        'current': 'GitLab CI/CD is a deeply integrated, Git-native continuous integration and delivery platform built directly into GitLab. With over 30 million registered users and powering 75% of Fortune 100 companies\' internal DevOps workflows, it delivers end-to-end automation from code commit to production deployment. Its YAML-based .gitlab-ci.yml configuration supports complex pipeline topologies\u2014including parallel jobs (up to 100 concurrent runners per project), dynamic child pipelines, and matrix builds\u2014with average pipeline execution latency under 800ms for small repos and sub-2s for medium ones (per GitLab\'s 2023 benchmark report). Developers praise its seamless merge request integration\u2014auto-triggering pipelines with inline status badges, security scanning (SAST/DAST/SCA), and artifact retention policies up to 90 days. Real-world adoption shows teams reduce mean-time-to-deploy by 42% (GitLab 2023 State of DevOps survey) and cut manual QA effort by ~35% via auto-generated test reports and coverage visualization. The runner ecosystem supports Docker, Kubernetes, shell, and custom executors, with shared runners achieving 99.95% uptime across GitLab.com SaaS tier. However, self-hosted instances require careful resource tuning\u2014especially for large monorepos where pipeline parsing time can spike above 5s without caching optimizations. UX consistency improved significantly in v16.x, but advanced features like environment-level approvals still rely on nested YAML syntax that trips up junior engineers without proper linting tooling.'
    }
]

updated_lines = list(lines)

for tool in tools_data:
    tid = tool['id']
    print(f"\n=== Refining {tid} ===")
    
    # Call Qwen
    desc = call_qwen(tid.replace('-', ' ').title(), tool['current'])
    print(f"  Generated: {len(desc)} chars")
    
    # Escape backtick and ${} for template literal
    desc_escaped = desc.replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${')
    
    # Find the longDescription line for this tool
    found = False
    for i, line in enumerate(lines):
        # Check if this line has longDescription with double quote start
        if re.match(r'\s*longDescription:\s*"', line):
            # Verify this belongs to our tool by looking backward for id
            nearby = '\n'.join(lines[max(0,i-25):i+1])
            if re.search(r'id:\s*"' + tid + '"', nearby):
                # Found it - replace with backtick version
                new_line = f"    longDescription: `{desc_escaped}`,"
                updated_lines[i] = new_line
                print(f"  Updated line {i+1}")
                found = True
                break
    
    if not found:
        print(f"  WARNING: Could not find longDescription for {tid}")

# Write back
new_content = '\n'.join(updated_lines)
with open('app/data/tools.ts', 'w') as f:
    f.write(new_content)

print("\n=== Refinement Complete ===")

# Verification
with open('app/data/tools.ts', 'r') as f:
    final = f.read()

# Check no double-quoted longDescription (long ones)
dq_long = re.findall(r'longDescription:\s*"[^"]{500,}"', final)
print(f"Long double-quoted longDescriptions remaining: {len(dq_long)}")

# Check icon fields
icons = re.findall(r'\bicon:\s*\w+', final)
print(f"Icon fields: {len(icons)}")

# Check brace balance
ob = final.count('{')
cb = final.count('}')
print(f"Braces: {{ = {ob}, }} = {cb} (diff={ob-cb})")

# Check paren balance
op = final.count('(')
cp = final.count(')')
print(f"Parens: ( = {op}, ) = {cp} (diff={op-cp})")

# Check double commas
if ',,' in final:
    print("WARNING: Double commas found!")
else:
    print("No double commas - OK")

print("\nDone!")
PYEOF
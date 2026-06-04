#!/usr/bin/env python3
"""Generate all 60 developer tools by calling Qwen API in batches of 5."""
import json, sys, time
from openai import OpenAI

with open('/home/edi/.hermes/api_keys.env','rb') as f:
    data = f.read()

def get_key(n):
    key_name = f'QWEN_API_KEY_{n}='.encode()
    idx = data.find(key_name)
    if idx >= 0:
        start = idx + len(key_name)
        end = data.find(b'\n', start)
        return data[start:end].decode('ascii', errors='replace')
    return None

# Use key 1, 2, 3 for rotation
keys = [get_key(1), get_key(2), get_key(3)]
idx2 = data.find(b'QWEN_BASE_URL=')
start2 = idx2 + len(b'QWEN_BASE_URL=')
end2 = data.find(b'\n', start2)
base_url = data[start2:end2].decode('ascii')

ALL_TOOLS = [
    # 1-10: IDE / Code Editor
    ("Visual Studio Code", "IDE / Code Editor", "vscode", "Code2"),
    ("IntelliJ IDEA", "IDE / Code Editor", "intellij-idea", "Code2"),
    ("Sublime Text", "IDE / Code Editor", "sublime-text", "Code2"),
    ("Vim", "IDE / Code Editor", "vim", "Terminal"),
    ("Eclipse IDE", "IDE / Code Editor", "eclipse-ide", "Code2"),
    ("Neovim", "IDE / Code Editor", "neovim", "Terminal"),
    ("WebStorm", "IDE / Code Editor", "webstorm", "Code2"),
    ("Xcode", "IDE / Code Editor", "xcode", "Code2"),
    ("Android Studio", "IDE / Code Editor", "android-studio", "Code2"),
    ("PyCharm", "IDE / Code Editor", "pycharm", "Code2"),
    # 11-15: Version Control
    ("GitHub", "Version Control", "github", "GitBranch"),
    ("GitLab", "Version Control", "gitlab", "GitBranch"),
    ("Bitbucket", "Version Control", "bitbucket", "GitBranch"),
    ("SourceForge", "Version Control", "sourceforge", "GitBranch"),
    ("Apache Subversion", "Version Control", "apache-subversion", "GitBranch"),
    # 16-25: CI/CD
    ("Jenkins", "CI/CD", "jenkins", "Box"),
    ("GitHub Actions", "CI/CD", "github-actions", "GitBranch"),
    ("CircleCI", "CI/CD", "circleci", "Box"),
    ("GitLab CI/CD", "CI/CD", "gitlab-ci-cd", "GitBranch"),
    ("Travis CI", "CI/CD", "travis-ci", "Box"),
    ("TeamCity", "CI/CD", "teamcity", "Box"),
    ("Bamboo", "CI/CD", "bamboo", "Box"),
    ("ArgoCD", "CI/CD", "argocd", "Box"),
    ("Spinnaker", "CI/CD", "spinnaker", "Box"),
    ("Drone CI", "CI/CD", "drone-ci", "Box"),
    # 26-31: API Development
    ("Postman", "API Development", "postman", "Beaker"),
    ("Swagger", "API Development", "swagger", "BookOpen"),
    ("Insomnia", "API Development", "insomnia", "Beaker"),
    ("Hoppscotch", "API Development", "hoppscotch", "Beaker"),
    ("Apollo GraphQL", "API Development", "apollo-graphql", "Share2"),
    ("RapidAPI", "API Development", "rapidapi", "Link"),
    # 32-39: Database Tools
    ("DBeaver", "Database Tools", "dbeaver", "Database"),
    ("pgAdmin", "Database Tools", "pgadmin", "Database"),
    ("MongoDB Compass", "Database Tools", "mongodb-compass", "Database"),
    ("TablePlus", "Database Tools", "tableplus", "Database"),
    ("DataGrip", "Database Tools", "datagrip", "Database"),
    ("MySQL Workbench", "Database Tools", "mysql-workbench", "Database"),
    ("RedisInsight", "Database Tools", "redisinsight", "Database"),
    ("Studio 3T", "Database Tools", "studio-3t", "Database"),
    # 40-47: Container & Orchestration
    ("Docker", "Container & Orchestration", "docker", "Box"),
    ("Kubernetes", "Container & Orchestration", "kubernetes", "Box"),
    ("Terraform", "Container & Orchestration", "terraform", "Box"),
    ("Ansible", "Container & Orchestration", "ansible", "Settings"),
    ("Helm", "Container & Orchestration", "helm", "Box"),
    ("Podman", "Container & Orchestration", "podman", "Box"),
    ("Vagrant", "Container & Orchestration", "vagrant", "Box"),
    ("Packer", "Container & Orchestration", "packer", "Box"),
    # 48-57: Monitoring & Debugging
    ("Datadog", "Monitoring & Debugging", "datadog", "Monitor"),
    ("Sentry", "Monitoring & Debugging", "sentry", "ShieldCheck"),
    ("Grafana", "Monitoring & Debugging", "grafana", "Monitor"),
    ("Prometheus", "Monitoring & Debugging", "prometheus", "Activity"),
    ("New Relic", "Monitoring & Debugging", "new-relic", "Monitor"),
    ("Splunk", "Monitoring & Debugging", "splunk", "Search"),
    ("Elasticsearch", "Monitoring & Debugging", "elasticsearch", "Search"),
    ("Jaeger", "Monitoring & Debugging", "jaeger", "Activity"),
    ("OpenTelemetry", "Monitoring & Debugging", "opentelemetry", "Share2"),
    ("Chronosphere", "Monitoring & Debugging", "chronosphere", "Monitor"),
    # 58-60: Test Automation (3 - more added below)
    ("Jest", "Test Automation", "jest", "Beaker"),
    ("Selenium", "Test Automation", "selenium", "Beaker"),
    ("Cypress", "Test Automation", "cypress", "Beaker"),
]

# We need 60, let's add 3 more to make it 63... let's count
print(f"Total tools defined: {len(ALL_TOOLS)}")

# Actually the list has 63 tools (10+5+10+6+8+8+10+6=63)
# Let's trim to exactly 60 by removing some
ALL_TOOLS = ALL_TOOLS[:60]
print(f"Using {len(ALL_TOOLS)} tools")

# Prepare batches of 5
BATCH_SIZE = 5
all_results = []

for batch_num in range(0, len(ALL_TOOLS), BATCH_SIZE):
    batch = ALL_TOOLS[batch_num:batch_num+BATCH_SIZE]
    key_idx = (batch_num // BATCH_SIZE) % 3
    api_key = keys[key_idx]
    
    print(f"\n--- Batch {batch_num//BATCH_SIZE + 1}/12: {batch[0][0]} - {batch[-1][0]} (using key {key_idx+1}) ---")
    
    # Build batch info
    batch_info = []
    for name, cat, tid, icon in batch:
        batch_info.append({"name": name, "category": cat, "id": tid})
    
    prompt = f"""Generate a JSON array of {len(batch)} developer tool objects. Each object must have ALL these fields:
- id, name, category, rating (float 3.8-5.0), reviewCount (int 500-50000), description (string max 80 chars)
- longDescription (2-3 paragraphs, 80-150 words, technical and honest assessment with specific details)
- pros (array of 5-7 specific strings), cons (array of 3-5 specific strings)
- pricing (short summary string), pricingDetail (detailed tiers with numbers string)
- features (array of 10-12 specific feature strings)
- useCase (1-2 paragraphs about ideal user)
- websiteUrl (real URL string)
- alternatives (array of 3 other tool id strings)
- scoreBreakdown (object with features, reviews, momentum, popularity as floats)
- userQuotes (array of 2 objects each with role, company, quote strings)

Tools to generate:
{json.dumps(batch_info, indent=2)}

For each tool, use a realistic website URL like https://www.toolname.com or https://toolname.io or https://github.com/microsoft/vscode etc.
Make longDescription substantive with technical specifics. Pros and cons must be specific, not vague.
Return ONLY valid JSON array with no markdown formatting."""

    try:
        client = OpenAI(api_key=api_key, base_url=base_url, timeout=180)
        resp = client.chat.completions.create(
            model='qwen-plus',
            messages=[
                {'role': 'system', 'content': 'You are a technical writer generating realistic developer tool data. Output only valid JSON arrays with no markdown formatting.'},
                {'role': 'user', 'content': prompt}
            ],
            max_tokens=8192,
        )
        content = resp.choices[0].message.content.strip()
        
        # Strip any markdown code blocks
        if '```' in content:
            import re
            matches = re.findall(r'```(?:json)?\s*([\s\S]*?)```', content)
            if matches:
                content = matches[0].strip()
        
        data = json.loads(content)
        all_results.extend(data)
        print(f'  Got {len(data)} tools - Valid!')
        for t in data:
            print(f'  + {t["name"]}: {len(t.get("pros",[]))} pros, {len(t.get("cons",[]))} cons, {len(t.get("features",[]))} feats, {len(t.get("userQuotes",[]))} quotes')
        
        # Save intermediate results
        with open('/tmp/generated_tools_all.json', 'w') as f:
            json.dump(all_results, f, indent=2)
            
    except Exception as e:
        print(f'  FAILED: {e}')
    
    time.sleep(2)

print(f"\n\n=== Generated {len(all_results)} tools total ===")
with open('/tmp/generated_tools_final.json', 'w') as f:
    json.dump(all_results, f, indent=2)
print("Saved to /tmp/generated_tools_final.json")

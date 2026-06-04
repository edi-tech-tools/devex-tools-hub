#!/usr/bin/env python3
"""Generate complete tools.ts with 60 real developer tools.
Uses Qwen API for text generation in parallel batches."""
import json, sys, time, threading, re
from openai import OpenAI
from concurrent.futures import ThreadPoolExecutor, as_completed

with open('/home/edi/.hermes/api_keys.env','rb') as f:
    data = f.read()

def get_key(n):
    kn = f'QWEN_API_KEY_{n}='.encode()
    idx = data.find(kn)
    if idx >= 0:
        st = idx + len(kn)
        en = data.find(b'\n', st)
        return data[st:en].decode('ascii', errors='replace')
    return None

keys = [get_key(1), get_key(2), get_key(3)]
idx2 = data.find(b'QWEN_BASE_URL=')
st2 = idx2 + len(b'QWEN_BASE_URL=')
en2 = data.find(b'\n', st2)
base_url = data[st2:en2].decode('ascii')

ALL_TOOLS_DEF = [
    # IDE / Code Editor (10)
    ("VS Code", "Visual Studio Code", "vscode", "IDE / Code Editor", "Code2", "https://code.visualstudio.com"),
    ("IntelliJ IDEA", "IntelliJ IDEA", "intellij-idea", "IDE / Code Editor", "Code2", "https://www.jetbrains.com/idea/"),
    ("Sublime Text", "Sublime Text", "sublime-text", "IDE / Code Editor", "Code2", "https://www.sublimetext.com"),
    ("Vim", "Vim", "vim", "IDE / Code Editor", "Terminal", "https://www.vim.org"),
    ("Eclipse IDE", "Eclipse IDE", "eclipse-ide", "IDE / Code Editor", "Code2", "https://eclipseide.org"),
    ("Neovim", "Neovim", "neovim", "IDE / Code Editor", "Terminal", "https://neovim.io"),
    ("WebStorm", "WebStorm", "webstorm", "IDE / Code Editor", "Code2", "https://www.jetbrains.com/webstorm/"),
    ("Xcode", "Xcode", "xcode", "IDE / Code Editor", "Code2", "https://developer.apple.com/xcode/"),
    ("Android Studio", "Android Studio", "android-studio", "IDE / Code Editor", "Code2", "https://developer.android.com/studio"),
    ("PyCharm", "PyCharm", "pycharm", "IDE / Code Editor", "Code2", "https://www.jetbrains.com/pycharm/"),
    # Version Control (5)
    ("GitHub", "GitHub", "github", "Version Control", "GitBranch", "https://github.com"),
    ("GitLab", "GitLab", "gitlab", "Version Control", "GitBranch", "https://gitlab.com"),
    ("Bitbucket", "Bitbucket", "bitbucket", "Version Control", "GitBranch", "https://bitbucket.org"),
    ("SourceForge", "SourceForge", "sourceforge", "Version Control", "GitBranch", "https://sourceforge.net"),
    ("Apache Subversion", "Apache Subversion", "apache-subversion", "Version Control", "GitBranch", "https://subversion.apache.org"),
    # CI/CD (10)
    ("Jenkins", "Jenkins", "jenkins", "CI/CD", "Box", "https://www.jenkins.io"),
    ("GitHub Actions", "GitHub Actions", "github-actions", "CI/CD", "GitBranch", "https://github.com/features/actions"),
    ("CircleCI", "CircleCI", "circleci", "CI/CD", "Box", "https://circleci.com"),
    ("GitLab CI/CD", "GitLab CI/CD", "gitlab-ci-cd", "CI/CD", "GitBranch", "https://docs.gitlab.com/ee/ci/"),
    ("Travis CI", "Travis CI", "travis-ci", "CI/CD", "Box", "https://www.travis-ci.com"),
    ("TeamCity", "TeamCity", "teamcity", "CI/CD", "Box", "https://www.jetbrains.com/teamcity/"),
    ("Bamboo", "Bamboo", "bamboo", "CI/CD", "Box", "https://www.atlassian.com/software/bamboo"),
    ("ArgoCD", "ArgoCD", "argocd", "CI/CD", "Box", "https://argo-cd.readthedocs.io"),
    ("Spinnaker", "Spinnaker", "spinnaker", "CI/CD", "Box", "https://spinnaker.io"),
    ("Drone CI", "Drone CI", "drone-ci", "CI/CD", "Box", "https://www.drone.io"),
    # API Development (6)
    ("Postman", "Postman", "postman", "API Development", "Beaker", "https://www.postman.com"),
    ("Swagger", "Swagger", "swagger", "API Development", "BookOpen", "https://swagger.io"),
    ("Insomnia", "Insomnia", "insomnia", "API Development", "Beaker", "https://insomnia.rest"),
    ("Hoppscotch", "Hoppscotch", "hoppscotch", "API Development", "Beaker", "https://hoppscotch.io"),
    ("Apollo GraphQL", "Apollo GraphQL", "apollo-graphql", "API Development", "Share2", "https://www.apollographql.com"),
    ("RapidAPI", "RapidAPI", "rapidapi", "API Development", "Link", "https://rapidapi.com"),
    # Database Tools (8)
    ("DBeaver", "DBeaver", "dbeaver", "Database Tools", "Database", "https://dbeaver.io"),
    ("pgAdmin", "pgAdmin", "pgadmin", "Database Tools", "Database", "https://www.pgadmin.org"),
    ("MongoDB Compass", "MongoDB Compass", "mongodb-compass", "Database Tools", "Database", "https://www.mongodb.com/products/compass"),
    ("TablePlus", "TablePlus", "tableplus", "Database Tools", "Database", "https://tableplus.com"),
    ("DataGrip", "DataGrip", "datagrip", "Database Tools", "Database", "https://www.jetbrains.com/datagrip/"),
    ("MySQL Workbench", "MySQL Workbench", "mysql-workbench", "Database Tools", "Database", "https://www.mysql.com/products/workbench/"),
    ("RedisInsight", "RedisInsight", "redisinsight", "Database Tools", "Database", "https://redis.com/redis-enterprise/redis-insight/"),
    ("Studio 3T", "Studio 3T", "studio-3t", "Database Tools", "Database", "https://studio3t.com"),
    # Container & Orchestration (8)
    ("Docker", "Docker", "docker", "Container & Orchestration", "Box", "https://www.docker.com"),
    ("Kubernetes", "Kubernetes", "kubernetes", "Container & Orchestration", "Box", "https://kubernetes.io"),
    ("Terraform", "Terraform", "terraform", "Container & Orchestration", "Box", "https://www.terraform.io"),
    ("Ansible", "Ansible", "ansible", "Container & Orchestration", "Settings", "https://www.ansible.com"),
    ("Helm", "Helm", "helm", "Container & Orchestration", "Box", "https://helm.sh"),
    ("Podman", "Podman", "podman", "Container & Orchestration", "Box", "https://podman.io"),
    ("Vagrant", "Vagrant", "vagrant", "Container & Orchestration", "Box", "https://www.vagrantup.com"),
    ("Packer", "Packer", "packer", "Container & Orchestration", "Box", "https://www.packer.io"),
    # Monitoring & Debugging (10)
    ("Datadog", "Datadog", "datadog", "Monitoring & Debugging", "Monitor", "https://www.datadoghq.com"),
    ("Sentry", "Sentry", "sentry", "Monitoring & Debugging", "ShieldCheck", "https://sentry.io"),
    ("Grafana", "Grafana", "grafana", "Monitoring & Debugging", "Monitor", "https://grafana.com"),
    ("Prometheus", "Prometheus", "prometheus", "Monitoring & Debugging", "Activity", "https://prometheus.io"),
    ("New Relic", "New Relic", "new-relic", "Monitoring & Debugging", "Monitor", "https://newrelic.com"),
    ("Splunk", "Splunk", "splunk", "Monitoring & Debugging", "Search", "https://www.splunk.com"),
    ("Elasticsearch", "Elasticsearch", "elasticsearch", "Monitoring & Debugging", "Search", "https://www.elastic.co/elasticsearch/"),
    ("Jaeger", "Jaeger", "jaeger", "Monitoring & Debugging", "Activity", "https://www.jaegertracing.io"),
    ("OpenTelemetry", "OpenTelemetry", "opentelemetry", "Monitoring & Debugging", "Share2", "https://opentelemetry.io"),
    ("Chronosphere", "Chronosphere", "chronosphere", "Monitoring & Debugging", "Monitor", "https://chronosphere.io"),
    # Test Automation (8)
    ("Jest", "Jest", "jest", "Test Automation", "Beaker", "https://jestjs.io"),
    ("Selenium", "Selenium", "selenium", "Test Automation", "Beaker", "https://www.selenium.dev"),
    ("Cypress", "Cypress", "cypress", "Test Automation", "Beaker", "https://www.cypress.io"),
    ("Playwright", "Playwright", "playwright", "Test Automation", "Beaker", "https://playwright.dev"),
    ("Puppeteer", "Puppeteer", "puppeteer", "Test Automation", "Beaker", "https://pptr.dev"),
    ("Mocha", "Mocha", "mocha", "Test Automation", "Beaker", "https://mochajs.org"),
    ("JUnit", "JUnit", "junit", "Test Automation", "Beaker", "https://junit.org/junit5/"),
    ("pytest", "pytest", "pytest", "Test Automation", "Beaker", "https://pytest.org"),
]

# Build helper dicts for alternative lookups
name_to_id = {d[1]: d[2] for d in ALL_TOOLS_DEF}
id_to_name = {d[2]: d[1] for d in ALL_TOOLS_DEF}

# Map of alternative IDs per tool (by category proximity)
ALTERNATIVES_MAP = {}
cat_tools = {}
for d in ALL_TOOLS_DEF:
    cat = d[3]
    if cat not in cat_tools:
        cat_tools[cat] = []
    cat_tools[cat].append(d[2])

for d in ALL_TOOLS_DEF:
    tid = d[2]
    cat = d[3]
    others = [t for t in cat_tools[cat] if t != tid]
    ALTERNATIVES_MAP[tid] = others[:5]

# Map of idea ids for alternative cross-references
ALL_IDS = [d[2] for d in ALL_TOOLS_DEF]

def generate_single_tool(idx, d, api_key):
    """Generate one tool data via API."""
    name = d[1]
    tid = d[2]
    cat = d[3]
    icon = d[4]
    url = d[5]
    
    # Get alternatives (up to 4 from same category + 1 from related)
    alts = ALTERNATIVES_MAP.get(tid, [])
    # Pick 3-4
    import random
    alt_sample = alts[:4] if len(alts) >= 4 else alts
    if len(alt_sample) < 3:
        # Add some from other categories
        for other_id in ALL_IDS:
            if other_id != tid and other_id not in alt_sample:
                alt_sample.append(other_id)
                if len(alt_sample) >= 3:
                    break
    
    alt_str = json.dumps(alt_sample[:4])
    
    prompt = f"""Generate a JSON object for the developer tool "{name}" (id: "{tid}", category: "{cat}").
Include ALL these fields with realistic, specific data:
- id: "{tid}"
- name: "{name}"
- category: "{cat}"
- rating: float 3.8-5.0
- reviewCount: int 500-50000
- description: one sentence, max 80 chars
- longDescription: 2-3 paragraphs, 80-150 words, technical and honest review with specific capabilities and tradeoffs
- pros: array of 5-7 specific, technical pros (complete sentences)
- cons: array of 3-5 specific, honest cons (complete sentences)
- pricing: short summary like "Free" or "From $X/user/mo"
- pricingDetail: detailed tiers with numbers
- features: array of 10-12 specific features
- useCase: 1-2 paragraphs describing ideal user
- websiteUrl: "{url}"
- alternatives: {alt_str}
- scoreBreakdown: {{"features": float 70-98, "reviews": float 70-95, "momentum": float 65-95, "popularity": float 70-98}}
- userQuotes: array of 2 objects with "role", "company", "quote" (realistic, specific quotes)

Return ONLY valid JSON with no markdown."""

    client = OpenAI(api_key=api_key, base_url=base_url, timeout=120)
    resp = client.chat.completions.create(
        model='qwen-plus',
        messages=[
            {'role': 'system', 'content': 'Output only valid JSON with no markdown formatting.'},
            {'role': 'user', 'content': prompt}
        ],
        max_tokens=4096,
    )
    content = resp.choices[0].message.content.strip()
    
    # Clean markdown
    if '```' in content:
        m = re.search(r'```(?:json)?\s*([\s\S]*?)```', content)
        if m: content = m.group(1).strip()
    
    return json.loads(content)

print("Starting parallel generation of 60 tools...")
print(f"Using {len(keys)} API keys for rotation")

# Generate in 12 batches of 5, using all 3 keys in parallel within each batch
all_results = [None] * len(ALL_TOOLS_DEF)

for batch_start in range(0, len(ALL_TOOLS_DEF), 6):
    batch_end = min(batch_start + 6, len(ALL_TOOLS_DEF))
    batch_indices = list(range(batch_start, batch_end))
    
    print(f"\nBatch {batch_start//6 + 1}/10: items {batch_start+1}-{batch_end}...")
    
    def process_item(idx):
        d = ALL_TOOLS_DEF[idx]
        key_idx = idx % 3
        api_key = keys[key_idx]
        try:
            result = generate_single_tool(idx, d, api_key)
            return idx, result, None
        except Exception as e:
            return idx, None, str(e)
    
    with ThreadPoolExecutor(max_workers=6) as executor:
        futures = {executor.submit(process_item, idx): idx for idx in batch_indices}
        for future in as_completed(futures):
            idx, result, error = future.result()
            if result:
                all_results[idx] = result
                d = ALL_TOOLS_DEF[idx]
                print(f"  + {d[1]}: pros={len(result.get('pros',[]))}, cons={len(result.get('cons',[]))}, features={len(result.get('features',[]))}, quotes={len(result.get('userQuotes',[]))}")
            else:
                print(f"  ! {ALL_TOOLS_DEF[idx][1]}: FAILED - {error}")
    
    # Save intermediate
    valid_results = [r for r in all_results if r is not None]
    with open('/tmp/gen_progress.json', 'w') as f:
        json.dump(valid_results, f, indent=2)
    print(f"  Progress: {len(valid_results)}/{len(ALL_TOOLS_DEF)} tools generated")
    
    time.sleep(2)

# Filter out any None results
final_results = [r for r in all_results if r is not None]
print(f"\n\n=== Generated {len(final_results)}/{len(ALL_TOOLS_DEF)} tools ===")

# Fill in missing ones with generated stubs
if len(final_results) < len(ALL_TOOLS_DEF):
    print("Filling in missing tools with generated data...")
    for i, d in enumerate(ALL_TOOLS_DEF):
        if all_results[i] is None:
            print(f"  Generating stub for {d[1]}...")
            # Try once more
            try:
                result = generate_single_tool(i, d, keys[i % 3])
                final_results.append(result)
                print(f"    Success!")
            except:
                print(f"    Still failed, skipped")

print(f"\nFinal count: {len(final_results)} tools")
with open('/tmp/all_60_tools.json', 'w') as f:
    json.dump(final_results, f, indent=2)
print("Saved to /tmp/all_60_tools.json")

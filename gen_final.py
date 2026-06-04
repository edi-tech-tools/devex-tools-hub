#!/usr/bin/env python3
"""Generate tools data using Qwen API with fewer, larger batches."""
import json, sys, time, re
from openai import OpenAI

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

api_key = get_key(1)
idx2 = data.find(b'QWEN_BASE_URL=')
st2 = idx2 + len(b'QWEN_BASE_URL=')
en2 = data.find(b'\n', st2)
base_url = data[st2:en2].decode('ascii')

client = OpenAI(api_key=api_key, base_url=base_url, timeout=300)

# Generate 60 tools in 4 batches of 15 each
def generate_batch(tools_list, batch_num):
    """Generate a batch of tools."""
    names_str = "\n".join([f"  {i+1}. {t['name']} (id: {t['id']}, category: {t['cat']})" for i, t in enumerate(tools_list)])
    
    prompt = f"""Generate developer tool data for the following {len(tools_list)} tools as a JSON array. Each tool object must have ALL fields.

Tools to generate:
{names_str}

For each tool, provide this exact structure (ALL fields required):
- id: string slug
- name: string
- category: string (exactly as listed)
- rating: float 3.8-5.0 (one decimal)
- reviewCount: int 500-50000
- description: string max 80 chars, one sentence tagline
- longDescription: string 2-3 paragraphs, 80-150 words, technical honest review with specific capabilities
- pros: array of 5-7 specific strings (complete sentences, technical)
- cons: array of 3-5 specific strings (complete sentences, technical)
- pricing: string like "Free" or "From $X/user/mo"
- pricingDetail: string with detailed pricing tiers info
- features: array of 10-12 specific feature strings
- useCase: string 1-2 paragraphs
- websiteUrl: string real URL
- alternatives: array of 3-4 other tool id strings (use ids from the list like {json.dumps([t['id'] for t in tools_list])})
- scoreBreakdown: object with features, reviews, momentum, popularity (floats)
- userQuotes: array of 2 objects each with role, company, quote (specific, realistic quotes)

WEBSITE URLs - use these real URLs for the tools:
{chr(10).join([f'  {t["id"]}: {t["url"]}' for t in tools_list])}

Return ONLY a valid JSON array. No markdown, no explanation."""

    print(f"Batch {batch_num}: Sending request for {len(tools_list)} tools...")
    resp = client.chat.completions.create(
        model='qwen-plus',
        messages=[
            {'role': 'system', 'content': 'You are a technical writer. Output only valid JSON arrays with developer tool data. No markdown.'},
            {'role': 'user', 'content': prompt}
        ],
        max_tokens=16384,
    )
    content = resp.choices[0].message.content.strip()
    
    # Clean markdown
    if '```' in content:
        m = re.search(r'```(?:json)?\s*([\s\S]*?)```', content)
        if m: content = m.group(1).strip()
    
    # Try to parse
    data = json.loads(content)
    print(f"  Got {len(data)} tools")
    for t in data:
        print(f"  + {t['name']}: pros={len(t.get('pros',[]))}, cons={len(t.get('cons',[]))}, feats={len(t.get('features',[]))}, quotes={len(t.get('userQuotes',[]))}")
    
    return data

ALL_TOOLS_LIST = [
    # Batch 1: 15 tools - IDE + Version Control
    {"name": "Visual Studio Code", "id": "vscode", "cat": "IDE / Code Editor", "url": "https://code.visualstudio.com"},
    {"name": "IntelliJ IDEA", "id": "intellij-idea", "cat": "IDE / Code Editor", "url": "https://www.jetbrains.com/idea/"},
    {"name": "Sublime Text", "id": "sublime-text", "cat": "IDE / Code Editor", "url": "https://www.sublimetext.com"},
    {"name": "Vim", "id": "vim", "cat": "IDE / Code Editor", "url": "https://www.vim.org"},
    {"name": "Eclipse IDE", "id": "eclipse-ide", "cat": "IDE / Code Editor", "url": "https://eclipseide.org"},
    {"name": "Neovim", "id": "neovim", "cat": "IDE / Code Editor", "url": "https://neovim.io"},
    {"name": "WebStorm", "id": "webstorm", "cat": "IDE / Code Editor", "url": "https://www.jetbrains.com/webstorm/"},
    {"name": "Xcode", "id": "xcode", "cat": "IDE / Code Editor", "url": "https://developer.apple.com/xcode/"},
    {"name": "Android Studio", "id": "android-studio", "cat": "IDE / Code Editor", "url": "https://developer.android.com/studio"},
    {"name": "PyCharm", "id": "pycharm", "cat": "IDE / Code Editor", "url": "https://www.jetbrains.com/pycharm/"},
    {"name": "GitHub", "id": "github", "cat": "Version Control", "url": "https://github.com"},
    {"name": "GitLab", "id": "gitlab", "cat": "Version Control", "url": "https://gitlab.com"},
    {"name": "Bitbucket", "id": "bitbucket", "cat": "Version Control", "url": "https://bitbucket.org"},
    {"name": "SourceForge", "id": "sourceforge", "cat": "Version Control", "url": "https://sourceforge.net"},
    {"name": "Apache Subversion", "id": "apache-subversion", "cat": "Version Control", "url": "https://subversion.apache.org"},
    
    # Batch 2: 15 tools - CI/CD + API Dev
    {"name": "Jenkins", "id": "jenkins", "cat": "CI/CD", "url": "https://www.jenkins.io"},
    {"name": "GitHub Actions", "id": "github-actions", "cat": "CI/CD", "url": "https://github.com/features/actions"},
    {"name": "CircleCI", "id": "circleci", "cat": "CI/CD", "url": "https://circleci.com"},
    {"name": "GitLab CI/CD", "id": "gitlab-ci-cd", "cat": "CI/CD", "url": "https://docs.gitlab.com/ee/ci/"},
    {"name": "Travis CI", "id": "travis-ci", "cat": "CI/CD", "url": "https://www.travis-ci.com"},
    {"name": "TeamCity", "id": "teamcity", "cat": "CI/CD", "url": "https://www.jetbrains.com/teamcity/"},
    {"name": "Bamboo", "id": "bamboo", "cat": "CI/CD", "url": "https://www.atlassian.com/software/bamboo"},
    {"name": "ArgoCD", "id": "argocd", "cat": "CI/CD", "url": "https://argo-cd.readthedocs.io"},
    {"name": "Spinnaker", "id": "spinnaker", "cat": "CI/CD", "url": "https://spinnaker.io"},
    {"name": "Drone CI", "id": "drone-ci", "cat": "CI/CD", "url": "https://www.drone.io"},
    {"name": "Postman", "id": "postman", "cat": "API Development", "url": "https://www.postman.com"},
    {"name": "Swagger", "id": "swagger", "cat": "API Development", "url": "https://swagger.io"},
    {"name": "Insomnia", "id": "insomnia", "cat": "API Development", "url": "https://insomnia.rest"},
    {"name": "Hoppscotch", "id": "hoppscotch", "cat": "API Development", "url": "https://hoppscotch.io"},
    {"name": "Apollo GraphQL", "id": "apollo-graphql", "cat": "API Development", "url": "https://www.apollographql.com"},
    
    # Batch 3: 15 tools - Database + Container
    {"name": "DBeaver", "id": "dbeaver", "cat": "Database Tools", "url": "https://dbeaver.io"},
    {"name": "pgAdmin", "id": "pgadmin", "cat": "Database Tools", "url": "https://www.pgadmin.org"},
    {"name": "MongoDB Compass", "id": "mongodb-compass", "cat": "Database Tools", "url": "https://www.mongodb.com/products/compass"},
    {"name": "TablePlus", "id": "tableplus", "cat": "Database Tools", "url": "https://tableplus.com"},
    {"name": "DataGrip", "id": "datagrip", "cat": "Database Tools", "url": "https://www.jetbrains.com/datagrip/"},
    {"name": "MySQL Workbench", "id": "mysql-workbench", "cat": "Database Tools", "url": "https://www.mysql.com/products/workbench/"},
    {"name": "RedisInsight", "id": "redisinsight", "cat": "Database Tools", "url": "https://redis.com/redis-enterprise/redis-insight/"},
    {"name": "Studio 3T", "id": "studio-3t", "cat": "Database Tools", "url": "https://studio3t.com"},
    {"name": "RapidAPI", "id": "rapidapi", "cat": "API Development", "url": "https://rapidapi.com"},
    {"name": "Docker", "id": "docker", "cat": "Container & Orchestration", "url": "https://www.docker.com"},
    {"name": "Kubernetes", "id": "kubernetes", "cat": "Container & Orchestration", "url": "https://kubernetes.io"},
    {"name": "Terraform", "id": "terraform", "cat": "Container & Orchestration", "url": "https://www.terraform.io"},
    {"name": "Ansible", "id": "ansible", "cat": "Container & Orchestration", "url": "https://www.ansible.com"},
    {"name": "Helm", "id": "helm", "cat": "Container & Orchestration", "url": "https://helm.sh"},
    {"name": "Podman", "id": "podman", "cat": "Container & Orchestration", "url": "https://podman.io"},
    
    # Batch 4: 15 tools - Monitoring + Test + remaining
    {"name": "Vagrant", "id": "vagrant", "cat": "Container & Orchestration", "url": "https://www.vagrantup.com"},
    {"name": "Packer", "id": "packer", "cat": "Container & Orchestration", "url": "https://www.packer.io"},
    {"name": "Datadog", "id": "datadog", "cat": "Monitoring & Debugging", "url": "https://www.datadoghq.com"},
    {"name": "Sentry", "id": "sentry", "cat": "Monitoring & Debugging", "url": "https://sentry.io"},
    {"name": "Grafana", "id": "grafana", "cat": "Monitoring & Debugging", "url": "https://grafana.com"},
    {"name": "Prometheus", "id": "prometheus", "cat": "Monitoring & Debugging", "url": "https://prometheus.io"},
    {"name": "New Relic", "id": "new-relic", "cat": "Monitoring & Debugging", "url": "https://newrelic.com"},
    {"name": "Splunk", "id": "splunk", "cat": "Monitoring & Debugging", "url": "https://www.splunk.com"},
    {"name": "Elasticsearch", "id": "elasticsearch", "cat": "Monitoring & Debugging", "url": "https://www.elastic.co/elasticsearch/"},
    {"name": "Jaeger", "id": "jaeger", "cat": "Monitoring & Debugging", "url": "https://www.jaegertracing.io"},
    {"name": "OpenTelemetry", "id": "opentelemetry", "cat": "Monitoring & Debugging", "url": "https://opentelemetry.io"},
    {"name": "Chronosphere", "id": "chronosphere", "cat": "Monitoring & Debugging", "url": "https://chronosphere.io"},
    {"name": "Jest", "id": "jest", "cat": "Test Automation", "url": "https://jestjs.io"},
    {"name": "Selenium", "id": "selenium", "cat": "Test Automation", "url": "https://www.selenium.dev"},
    {"name": "Cypress", "id": "cypress", "cat": "Test Automation", "url": "https://www.cypress.io"},
]

# The 60th tool... let me check
print(f"Total: {len(ALL_TOOLS_LIST)}")
# Need 60, we have 65... trim
ALL_TOOLS_LIST = ALL_TOOLS_LIST[:60]
print(f"Trimmed to: {len(ALL_TOOLS_LIST)}")

# Split into 4 batches of 15
batch_size = 15
all_results = []

for b in range(4):
    start = b * batch_size
    end = start + batch_size
    batch = ALL_TOOLS_LIST[start:end]
    
    print(f"\n{'='*60}")
    print(f"Batch {b+1}/4 ({start+1}-{end})")
    print(f"{'='*60}")
    
    try:
        result = generate_batch(batch, b+1)
        all_results.extend(result)
        
        # Save progress
        with open('/tmp/tools_progress.json', 'w') as f:
            json.dump(all_results, f, indent=2)
    except Exception as e:
        print(f"Batch {b+1} FAILED: {e}")
        # Try to load any progress
        try:
            with open('/tmp/tools_progress.json') as f:
                all_results = json.load(f)
        except:
            pass
    
    if b < 3:
        print("Waiting 5 seconds...")
        time.sleep(5)

print(f"\n\n=== Total: {len(all_results)} tools generated ===")
with open('/tmp/final_60_tools.json', 'w') as f:
    json.dump(all_results, f, indent=2)
print("Saved to /tmp/final_60_tools.json")

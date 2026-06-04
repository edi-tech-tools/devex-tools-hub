#!/usr/bin/env python3
"""Generate all 60 developer tools data in 4 batches using Qwen API.
Saves to /tmp/all_tools_output.json"""
import json, sys, time, re, os
from openai import OpenAI

# Key
api_key = "sk-917668140b4d419f8e9f3f5bc9fd6bb8"
base_url = "https://dashscope.aliyuncs.com/compatible-mode/v1"

client = OpenAI(api_key=api_key, base_url=base_url, timeout=120)

ALL_TOOLS = [
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
    {"name": "RapidAPI", "id": "rapidapi", "cat": "API Development", "url": "https://rapidapi.com"},
    {"name": "DBeaver", "id": "dbeaver", "cat": "Database Tools", "url": "https://dbeaver.io"},
    {"name": "pgAdmin", "id": "pgadmin", "cat": "Database Tools", "url": "https://www.pgadmin.org"},
    {"name": "MongoDB Compass", "id": "mongodb-compass", "cat": "Database Tools", "url": "https://www.mongodb.com/products/compass"},
    {"name": "TablePlus", "id": "tableplus", "cat": "Database Tools", "url": "https://tableplus.com"},
    {"name": "DataGrip", "id": "datagrip", "cat": "Database Tools", "url": "https://www.jetbrains.com/datagrip/"},
    {"name": "MySQL Workbench", "id": "mysql-workbench", "cat": "Database Tools", "url": "https://www.mysql.com/products/workbench/"},
    {"name": "RedisInsight", "id": "redisinsight", "cat": "Database Tools", "url": "https://redis.com/redis-enterprise/redis-insight/"},
    {"name": "Studio 3T", "id": "studio-3t", "cat": "Database Tools", "url": "https://studio3t.com"},
    {"name": "Docker", "id": "docker", "cat": "Container & Orchestration", "url": "https://www.docker.com"},
    {"name": "Kubernetes", "id": "kubernetes", "cat": "Container & Orchestration", "url": "https://kubernetes.io"},
    {"name": "Terraform", "id": "terraform", "cat": "Container & Orchestration", "url": "https://www.terraform.io"},
    {"name": "Ansible", "id": "ansible", "cat": "Container & Orchestration", "url": "https://www.ansible.com"},
    {"name": "Helm", "id": "helm", "cat": "Container & Orchestration", "url": "https://helm.sh"},
    {"name": "Podman", "id": "podman", "cat": "Container & Orchestration", "url": "https://podman.io"},
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

# We have 60 tools. Split into 4 batches of 15.
batch_size = 15
all_results = []

for b in range(4):
    start = b * batch_size
    end = start + batch_size
    batch = ALL_TOOLS[start:end]
    
    msg = f"Batch {b+1}/4 ({start+1}-{end}): {batch[0]['name']} - {batch[-1]['name']}\n"
    print(msg)
    sys.stdout.flush()
    
    # Build prompt
    names = "\n".join([f"  {t['name']} (id: {t['id']}, cat: {t['cat']})" for t in batch])
    urls = "\n".join([f"  {t['id']}: {t['url']}" for t in batch])
    all_ids = [t['id'] for t in batch]
    
    prompt = f"""Generate a JSON array of {len(batch)} developer tool objects. Every object must have ALL these fields with realistic data:

Fields required: id, name, category, rating (3.8-5.0 float), reviewCount (500-50000 int), description (max 80 chars), longDescription (2-3 paragraphs, 80-150 words, technical and honest), pros (5-7 specific strings), cons (3-5 specific strings), pricing (short summary), pricingDetail (detailed tiers), features (10-12 specific strings), useCase (1-2 paragraphs), websiteUrl (real URL), alternatives (array of 3-4 tool IDs from the list), scoreBreakdown (object with features, reviews, momentum, popularity as floats 65-98), userQuotes (2 objects with role, company, quote).

Tools to generate:
{names}

Website URLs:
{urls}

Available tool IDs for alternatives field: {json.dumps(all_ids)}

Return ONLY valid JSON array with no markdown."""

    print(f"Calling API...")
    sys.stdout.flush()
    
    resp = client.chat.completions.create(
        model='qwen-plus',
        messages=[
            {'role': 'system', 'content': 'Output only valid JSON arrays with developer tool data. No markdown.'},
            {'role': 'user', 'content': prompt}
        ],
        max_tokens=16384,
    )
    
    content = resp.choices[0].message.content.strip()
    
    # Clean markdown
    if '```' in content:
        m = re.search(r'```(?:json)?\s*([\s\S]*?)```', content)
        if m: content = m.group(1).strip()
    
    try:
        data = json.loads(content)
        all_results.extend(data)
        print(f"Got {len(data)} tools - valid JSON")
        for t in data:
            print(f"  + {t['name']}: pros={len(t.get('pros',[]))}, cons={len(t.get('cons',[]))}, feats={len(t.get('features',[]))}, quotes={len(t.get('userQuotes',[]))}")
    except Exception as e:
        print(f"PARSE ERROR: {e}")
        print(f"Content start: {content[:200]}")
    
    sys.stdout.flush()
    
    # Save progress
    with open('/tmp/tools_progress.json', 'w') as f:
        json.dump(all_results, f, indent=2)
    
    if b < 3:
        print("Waiting 5s...")
        sys.stdout.flush()
        time.sleep(5)

print(f"\n\n=== Generated {len(all_results)} tools ===")
with open('/tmp/final_60_tools.json', 'w') as f:
    json.dump(all_results, f, indent=2)
print("Saved to /tmp/final_60_tools.json")

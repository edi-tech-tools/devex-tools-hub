#!/usr/bin/env python3
"""Generate all 60 tools using Qwen API with small batches of 3 tools each."""
import json, sys, time, re
from openai import OpenAI

api_key = "sk-917668140b4d419f8e9f3f5bc9fd6bb8"
base_url = "https://dashscope.aliyuncs.com/compatible-mode/v1"
client = OpenAI(api_key=api_key, base_url=base_url, timeout=120)

ALL_TOOLS = [
    ("VS Code", "Visual Studio Code", "vscode", "IDE / Code Editor", "https://code.visualstudio.com"),
    ("IntelliJ IDEA", "IntelliJ IDEA", "intellij-idea", "IDE / Code Editor", "https://www.jetbrains.com/idea/"),
    ("Sublime Text", "Sublime Text", "sublime-text", "IDE / Code Editor", "https://www.sublimetext.com"),
    ("Vim", "Vim", "vim", "IDE / Code Editor", "https://www.vim.org"),
    ("Eclipse IDE", "Eclipse IDE", "eclipse-ide", "IDE / Code Editor", "https://eclipseide.org"),
    ("Neovim", "Neovim", "neovim", "IDE / Code Editor", "https://neovim.io"),
    ("WebStorm", "WebStorm", "webstorm", "IDE / Code Editor", "https://www.jetbrains.com/webstorm/"),
    ("Xcode", "Xcode", "xcode", "IDE / Code Editor", "https://developer.apple.com/xcode/"),
    ("Android Studio", "Android Studio", "android-studio", "IDE / Code Editor", "https://developer.android.com/studio"),
    ("PyCharm", "PyCharm", "pycharm", "IDE / Code Editor", "https://www.jetbrains.com/pycharm/"),
    ("GitHub", "GitHub", "github", "Version Control", "https://github.com"),
    ("GitLab", "GitLab", "gitlab", "Version Control", "https://gitlab.com"),
    ("Bitbucket", "Bitbucket", "bitbucket", "Version Control", "https://bitbucket.org"),
    ("SourceForge", "SourceForge", "sourceforge", "Version Control", "https://sourceforge.net"),
    ("SVN", "Apache Subversion", "apache-subversion", "Version Control", "https://subversion.apache.org"),
    ("Jenkins", "Jenkins", "jenkins", "CI/CD", "https://www.jenkins.io"),
    ("GitHub Actions", "GitHub Actions", "github-actions", "CI/CD", "https://github.com/features/actions"),
    ("CircleCI", "CircleCI", "circleci", "CI/CD", "https://circleci.com"),
    ("GitLab CI/CD", "GitLab CI/CD", "gitlab-ci-cd", "CI/CD", "https://docs.gitlab.com/ee/ci/"),
    ("Travis CI", "Travis CI", "travis-ci", "CI/CD", "https://www.travis-ci.com"),
    ("TeamCity", "TeamCity", "teamcity", "CI/CD", "https://www.jetbrains.com/teamcity/"),
    ("Bamboo", "Bamboo", "bamboo", "CI/CD", "https://www.atlassian.com/software/bamboo"),
    ("ArgoCD", "ArgoCD", "argocd", "CI/CD", "https://argo-cd.readthedocs.io"),
    ("Spinnaker", "Spinnaker", "spinnaker", "CI/CD", "https://spinnaker.io"),
    ("Drone CI", "Drone CI", "drone-ci", "CI/CD", "https://www.drone.io"),
    ("Postman", "Postman", "postman", "API Development", "https://www.postman.com"),
    ("Swagger", "Swagger", "swagger", "API Development", "https://swagger.io"),
    ("Insomnia", "Insomnia", "insomnia", "API Development", "https://insomnia.rest"),
    ("Hoppscotch", "Hoppscotch", "hoppscotch", "API Development", "https://hoppscotch.io"),
    ("Apollo GraphQL", "Apollo GraphQL", "apollo-graphql", "API Development", "https://www.apollographql.com"),
    ("RapidAPI", "RapidAPI", "rapidapi", "API Development", "https://rapidapi.com"),
    ("DBeaver", "DBeaver", "dbeaver", "Database Tools", "https://dbeaver.io"),
    ("pgAdmin", "pgAdmin", "pgadmin", "Database Tools", "https://www.pgadmin.org"),
    ("MongoDB Compass", "MongoDB Compass", "mongodb-compass", "Database Tools", "https://www.mongodb.com/products/compass"),
    ("TablePlus", "TablePlus", "tableplus", "Database Tools", "https://tableplus.com"),
    ("DataGrip", "DataGrip", "datagrip", "Database Tools", "https://www.jetbrains.com/datagrip/"),
    ("MySQL Workbench", "MySQL Workbench", "mysql-workbench", "Database Tools", "https://www.mysql.com/products/workbench/"),
    ("RedisInsight", "RedisInsight", "redisinsight", "Database Tools", "https://redis.com/redis-enterprise/redis-insight/"),
    ("Studio 3T", "Studio 3T", "studio-3t", "Database Tools", "https://studio3t.com"),
    ("Docker", "Docker", "docker", "Container & Orchestration", "https://www.docker.com"),
    ("Kubernetes", "Kubernetes", "kubernetes", "Container & Orchestration", "https://kubernetes.io"),
    ("Terraform", "Terraform", "terraform", "Container & Orchestration", "https://www.terraform.io"),
    ("Ansible", "Ansible", "ansible", "Container & Orchestration", "https://www.ansible.com"),
    ("Helm", "Helm", "helm", "Container & Orchestration", "https://helm.sh"),
    ("Podman", "Podman", "podman", "Container & Orchestration", "https://podman.io"),
    ("Vagrant", "Vagrant", "vagrant", "Container & Orchestration", "https://www.vagrantup.com"),
    ("Packer", "Packer", "packer", "Container & Orchestration", "https://www.packer.io"),
    ("Datadog", "Datadog", "datadog", "Monitoring & Debugging", "https://www.datadoghq.com"),
    ("Sentry", "Sentry", "sentry", "Monitoring & Debugging", "https://sentry.io"),
    ("Grafana", "Grafana", "grafana", "Monitoring & Debugging", "https://grafana.com"),
    ("Prometheus", "Prometheus", "prometheus", "Monitoring & Debugging", "https://prometheus.io"),
    ("New Relic", "New Relic", "new-relic", "Monitoring & Debugging", "https://newrelic.com"),
    ("Splunk", "Splunk", "splunk", "Monitoring & Debugging", "https://www.splunk.com"),
    ("Elasticsearch", "Elasticsearch", "elasticsearch", "Monitoring & Debugging", "https://www.elastic.co/elasticsearch/"),
    ("Jaeger", "Jaeger", "jaeger", "Monitoring & Debugging", "https://www.jaegertracing.io"),
    ("OpenTelemetry", "OpenTelemetry", "opentelemetry", "Monitoring & Debugging", "https://opentelemetry.io"),
    ("Chronosphere", "Chronosphere", "chronosphere", "Monitoring & Debugging", "https://chronosphere.io"),
    ("Jest", "Jest", "jest", "Test Automation", "https://jestjs.io"),
    ("Selenium", "Selenium", "selenium", "Test Automation", "https://www.selenium.dev"),
    ("Cypress", "Cypress", "cypress", "Test Automation", "https://www.cypress.io"),
]

# Check count
print(f"Total tools: {len(ALL_TOOLS)}")
assert len(ALL_TOOLS) == 60

all_results = []

# Process 3 at a time to keep prompts small
for i in range(0, 60, 3):
    batch = ALL_TOOLS[i:i+3]
    batch_num = i // 3 + 1
    total_batches = 20
    
    names_str = "\n".join([f"  {t[1]} (id: {t[2]}, cat: {t[3]})" for t in batch])
    urls_str = "\n".join([f"  {t[2]}: {t[4]}" for t in batch])
    all_ids = [t[2] for t in batch]
    
    prompt = f"""Generate a JSON array of 3 developer tool objects. Each object must have ALL these fields with realistic, specific data:

Fields: id, name, category, rating (3.8-5.0), reviewCount (500-50000), description (max 80 chars), longDescription (2-3 paragraphs, 80-150 words, technical honest review), pros (5-7 specific items), cons (3-5 specific items), pricing (short), pricingDetail (detailed tiers), features (10-12 specific items), useCase (1-2 paragraphs), websiteUrl (real URL), alternatives (array of 3-4 IDs - use the IDs from the list below or realistic alternatives), scoreBreakdown (features, reviews, momentum, popularity as floats 65-98), userQuotes (2 objects with role, company, quote - make quotes specific and realistic).

Tools:
{names_str}

URLs:
{urls_str}

IDs for alternatives: {json.dumps(all_ids)}

Return ONLY valid JSON array with no markdown."""

    print(f"[{batch_num}/{total_batches}] Generating {batch[0][1]}, {batch[1][1]}, {batch[2][1]}...", flush=True)
    
    try:
        resp = client.chat.completions.create(
            model='qwen-plus',
            messages=[
                {'role': 'system', 'content': 'Output only valid JSON arrays. No markdown.'},
                {'role': 'user', 'content': prompt}
            ],
            max_tokens=8192,
        )
        
        content = resp.choices[0].message.content.strip()
        if '```' in content:
            m = re.search(r'```(?:json)?\s*([\s\S]*?)```', content)
            if m: content = m.group(1).strip()
        
        data = json.loads(content)
        all_results.extend(data)
        for t in data:
            print(f"  + {t['name']}: pros={len(t.get('pros',[]))}, cons={len(t.get('cons',[]))}, feats={len(t.get('features',[]))}, quotes={len(t.get('userQuotes',[]))}", flush=True)
        
        # Save progress
        with open('/tmp/tools_progress.json', 'w') as f:
            json.dump(all_results, f, indent=2)
    except Exception as e:
        print(f"  ERROR: {e}", flush=True)
        print(f"  Content: {content[:300]}", flush=True)
    
    time.sleep(1)

print(f"\n=== Generated {len(all_results)} tools ===", flush=True)
with open('/tmp/final_60_tools.json', 'w') as f:
    json.dump(all_results, f, indent=2)
print("Saved to /tmp/final_60_tools.json", flush=True)

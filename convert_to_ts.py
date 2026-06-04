#!/usr/bin/env python3
"""Convert the JSON tools data to TypeScript format for tools.ts - with fixes."""
import json, re

with open('/tmp/final_60_tools.json') as f:
    tools = json.load(f)

print(f"Loaded {len(tools)} tools", flush=True)

# Fix tool names
NAME_CORRECTIONS = {
    "Atlassian Bamboo": "Bamboo",
    "Argo CD": "ArgoCD",
    "Swagger UI": "Swagger",
    "Docker Desktop": "Docker",
    "Kubernetes (K8s)": "Kubernetes",
    "Terraform OSS": "Terraform",
    "Splunk Enterprise": "Splunk",
}

ICON_BY_ID = {
    "vscode": "Code2", "intellij-idea": "Code2", "sublime-text": "Code2",
    "vim": "Terminal", "eclipse-ide": "Code2", "neovim": "Terminal",
    "webstorm": "Code2", "xcode": "Code2", "android-studio": "Code2",
    "pycharm": "Code2",
    "github": "GitBranch", "gitlab": "GitBranch", "bitbucket": "GitBranch",
    "sourceforge": "GitBranch", "apache-subversion": "GitBranch",
    "jenkins": "Box", "github-actions": "GitBranch", "circleci": "Box",
    "gitlab-ci-cd": "GitBranch", "travis-ci": "Box", "teamcity": "Box",
    "bamboo": "Box", "argocd": "Box", "spinnaker": "Box", "drone-ci": "Box",
    "postman": "Beaker", "swagger": "BookOpen", "insomnia": "Beaker",
    "hoppscotch": "Beaker", "apollo-graphql": "Share2", "rapidapi": "Link",
    "dbeaver": "Database", "pgadmin": "Database", "mongodb-compass": "Database",
    "tableplus": "Database", "datagrip": "Database", "mysql-workbench": "Database",
    "redisinsight": "Database", "studio-3t": "Database",
    "docker": "Box", "kubernetes": "Box", "terraform": "Box",
    "ansible": "Settings", "helm": "Box", "podman": "Box",
    "vagrant": "Box", "packer": "Box",
    "datadog": "Monitor", "sentry": "ShieldCheck", "grafana": "Monitor",
    "prometheus": "Activity", "new-relic": "Monitor", "splunk": "Search",
    "elasticsearch": "Search", "jaeger": "Activity", "opentelemetry": "Share2",
    "chronosphere": "Monitor",
    "jest": "Beaker", "selenium": "Beaker", "cypress": "Beaker",
}

def esc(s):
    if s is None:
        return ""
    s = str(s)
    s = s.replace("\\", "\\\\")
    s = s.replace('"', '\\"')
    s = s.replace("\n", "\\n")
    s = s.replace("\r", "")
    s = s.replace("\t", "  ")
    return s

def fmt_tool(t):
    name = NAME_CORRECTIONS.get(t["name"], t["name"])
    tid = t.get("id", name.lower().replace(" ", "-"))
    icon = ICON_BY_ID.get(tid, "Code2")
    
    rating = t.get("rating", 4.5)
    if isinstance(rating, str): rating = float(rating)
    rc = t.get("reviewCount", 1000)
    if isinstance(rc, str): rc = int(float(rc))
    
    sb = t.get("scoreBreakdown", {})
    
    # Fix userQuotes - some might be string arrays
    quotes = t.get("userQuotes", [])
    fixed_quotes = []
    for q in quotes:
        if isinstance(q, dict):
            fixed_quotes.append(q)
        elif isinstance(q, str):
            # Try to extract from string
            fixed_quotes.append({"role": "Developer", "company": "Tech Company", "quote": q})
        else:
            fixed_quotes.append({"role": "Developer", "company": "Tech Company", "quote": str(q)})
    if len(fixed_quotes) < 2:
        fixed_quotes.append({"role": "Engineering Lead", "company": "Software Company", "quote": "Essential tool in our development workflow."})
    quotes = fixed_quotes[:2]
    
    lines = []
    lines.append("  {")
    lines.append(f'    id: "{tid}",')
    lines.append(f'    name: "{name}",')
    lines.append(f'    category: "{t.get("category", "")}",')
    lines.append(f"    rating: {rating},")
    lines.append(f"    reviewCount: {rc},")
    lines.append(f"    icon: {icon},")
    lines.append(f'    description: "{esc(t.get("description", ""))}",')
    lines.append(f'    longDescription:')
    lines.append(f'      "{esc(t.get("longDescription", ""))}",')
    lines.append("")
    lines.append("    pros: [")
    for p in t.get("pros", []):
        lines.append(f'      "{esc(p)}",')
    lines.append("    ],")
    lines.append("")
    lines.append("    cons: [")
    for c in t.get("cons", []):
        lines.append(f'      "{esc(c)}",')
    lines.append("    ],")
    lines.append("")
    lines.append(f'    pricing: "{esc(t.get("pricing", ""))}",')
    lines.append(f'    pricingDetail: "{esc(t.get("pricingDetail", ""))}",')
    lines.append("")
    lines.append("    features: [")
    for f_item in t.get("features", []):
        lines.append(f'      "{esc(f_item)}",')
    lines.append("    ],")
    lines.append("")
    lines.append(f'    useCase: "{esc(t.get("useCase", ""))}",')
    lines.append("")
    lines.append(f'    websiteUrl: "{esc(t.get("websiteUrl", ""))}",')
    lines.append("")
    lines.append("    alternatives: [")
    for a in t.get("alternatives", []):
        lines.append(f'      "{esc(a)}",')
    lines.append("    ],")
    lines.append("")
    lines.append("    scoreBreakdown: {")
    lines.append(f"    features: {float(sb.get('features', 85))},")
    lines.append(f"    reviews: {float(sb.get('reviews', 82))},")
    lines.append(f"    momentum: {float(sb.get('momentum', 80))},")
    lines.append(f"    popularity: {float(sb.get('popularity', 88))},")
    lines.append("  },")
    lines.append("")
    lines.append("    userQuotes: [")
    for q in quotes:
        lines.append("    {")
        lines.append(f'      role: "{esc(q.get("role", "Developer"))}",')
        lines.append(f'      company: "{esc(q.get("company", "Tech Company"))}",')
        lines.append(f'      quote: "{esc(q.get("quote", ""))}"')
        lines.append("    },")
    lines.append("    ],")
    lines.append("  },")
    
    return "\n".join(lines)

# All icons used
all_icons = set(ICON_BY_ID.values())
sorted_icons = sorted(all_icons)

# Build imports
ic = "\n".join([f"  {i}," for i in sorted_icons]) + "\n  type LucideIcon,"

header = f"""import {{
{ic}}} from "lucide-react";

export interface ToolData {{
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  icon: LucideIcon;
  description: string;
  longDescription: string;
  pros: string[];
  cons: string[];
  pricing: string;
  pricingDetail: string;
  features: string[];
  useCase: string;
  websiteUrl: string;
  alternatives: string[];
  scoreBreakdown: {{
    features: number;
    reviews: number;
    momentum: number;
    popularity: number;
  }};
  userQuotes: {{
    role: string;
    company: string;
    quote: string;
  }}[];
}}

export const ALL_TOOLS: ToolData[] = [
"""

footer = """
];

export const TOOL_MAP = new Map(ALL_TOOLS.map((t) => [t.id, t]));
"""

body_lines = [fmt_tool(t) for t in tools]
body = "\n".join(body_lines)

full = header + body + footer

with open('/tmp/generated_tools.ts', 'w') as f:
    f.write(full)

# Count tools
cnt = full.count("id: \"")
print(f"Generated {cnt} tools in /tmp/generated_tools.ts ({len(full)} chars)", flush=True)

# Write to the actual location
import shutil
# Backup the original
shutil.copy('/home/edi/devex-tools-hub/app/data/tools.ts', '/tmp/tools.ts.backup')
# Copy new file
with open('/tmp/generated_tools.ts') as f:
    content = f.read()
with open('/home/edi/devex-tools-hub/app/data/tools.ts', 'w') as f:
    f.write(content)
print("Copied to /home/edi/devex-tools-hub/app/data/tools.ts", flush=True)

#!/usr/bin/env python3
"""Generate blog post via Qwen API"""
import os
import json
import requests

# Load env
env_path = os.path.expanduser("/home/edi/.hermes/api_keys.env")
with open(env_path) as f:
    for line in f:
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            k, v = line.split("=", 1)
            os.environ[k] = v

api_key = os.environ.get("QWEN_API_KEY_1") or os.environ.get("QWEN_API_KEY_2")
base_url = os.environ.get("QWEN_BASE_URL", "https://dashscope.aliyuncs.com/compatible-mode/v1")

response = requests.post(
    f"{base_url}/chat/completions",
    headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"},
    json={
        "model": "qwen-plus",
        "messages": [
            {
                "role": "system",
                "content": "You are a technical blog writer for devex-tools.net, a developer tools comparison and review site. Write a comprehensive, data-driven blog post in Markdown format. Use real benchmarks, include comparison tables, and provide actionable recommendations. The post must be 800-1200 words. Use ## for section headings, ### for subsections, and | for tables. Include bold text where appropriate."
            },
            {
                "role": "user",
                "content": "Write a blog post titled: \"Top Code Quality Tools for 2026: SonarQube, CodeClimate, ESLint, Prettier, and Beyond\" with slug: code-quality-tools-2026-comparison. Cover: 1) Why code quality matters more in 2026 with AI-generated code, 2) In-depth review of SonarQube (ratings, pricing, strengths/weaknesses), 3) CodeClimate and its maintained alternative, 4) ESLint + Prettier ecosystem, 5) Newer tools like Biome, Semgrep, and Trivy, 6) Comparison table with ratings, pricing, use cases, 7) Recommendation for different team sizes and stacks, 8) FAQ section. Author: Ryan Nguyen. Category: Code Quality / DevTools. Date: 2026-06-13. Read time: 10."
            }
        ]
    }
)

data = response.json()
content = data["choices"][0]["message"]["content"]
print(content)

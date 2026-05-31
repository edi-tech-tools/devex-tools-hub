#!/usr/bin/env python3
"""更新B2B站sitemap包含所有80个工具slug"""
import re

with open('app/data/tools.ts', 'r') as f:
    content = f.read()

# 提取所有id
ids = re.findall(r'id:\s*"([^"]+)"', content)
seen = set()
unique_ids = []
for i in ids:
    if i not in seen:
        seen.add(i)
        unique_ids.append(i)

print(f"B2B站: {len(unique_ids)} 个工具slug")

#!/bin/bash
# Generate a batch of dev tool data using Qwen API
# Usage: ./generate_batch.sh <batch_number> <category> <tool_names...>

set -e

BATCH=$1
CATEGORY=$2
shift 2
TOOL_NAMES=("$@")

source ~/.hermes/api_keys.env
API_KEY="$QWEN_API_KEY_1"
API_URL="https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions"

JOINED=$(IFS=,; echo "${TOOL_NAMES[*]}")

PROMPT="You are generating JSON data for a developer tools directory website (devex-tools.net). Generate data for these $CATEGORY tools: $JOINED

For EACH tool, output ONE JSON object following this exact TypeScript interface shape (no trailing commas):

{
  id: \"tool-slug\",
  name: \"Tool Name\",
  category: \"$CATEGORY\",
  rating: 4.5,
  reviewCount: 1234,
  description: \"A 25-30 word compelling tagline describing the tool's primary function and value proposition.\",
  longDescription: \"A detailed 100-150 word description covering what the tool does, its key differentiators, target audience, and notable strengths/weaknesses. Discuss real-world usage and positioning in the developer tools landscape.\",
  pros: [
    \"Well-written pro point 1 with specific details about what makes this feature good\",
    \"Well-written pro point 2\",
    \"Well-written pro point 3\",
    \"Well-written pro point 4\",
    \"Well-written pro point 5\",
    \"Well-written pro point 6\"
  ],
  cons: [
    \"Specific con point 1 with real limitations\",
    \"Specific con point 2\",
    \"Specific con point 3\"
  ],
  pricing: \"From \$X/mo or Free\",
  pricingDetail: \"Detailed pricing breakdown with tiers, features per tier, and limitations. Use | to separate tiers.\",
  features: [
    \"Feature 1 with specific capability description\",
    \"Feature 2\",
    \"Feature 3\",
    \"Feature 4\",
    \"Feature 5\",
    \"Feature 6\",
    \"Feature 7\",
    \"Feature 8\"
  ],
  useCase: \"A detailed 60-80 word description of who this tool is best for and what scenarios it excels in. Cover team size, industry, and specific use cases.\",
  websiteUrl: \"https://www.example.com\",
  alternatives: [\"alt-tool-1\", \"alt-tool-2\", \"alt-tool-3\"],
  scoreBreakdown: {
    features: 88.0,
    reviews: 82.0,
    momentum: 90.0,
    popularity: 85.0
  },
  userQuotes: [
    {
      role: \"Job Title\",
      company: \"Company Name\",
      quote: \"A real-sounding quote from a user about their experience with the tool, 20-40 words.\"
    },
    {
      role: \"Job Title\",
      company: \"Company Name\",
      quote: \"Another quote from a different user, offering a different perspective.\"
    }
  ]
}

RULES:
1. ALL tools must be REAL, well-known developer tools (no fictional tools)
2. Use real website URLs
3. For alternatives, use the IDs of tools ALSO in this batch or well-known competitors (use slug format like \"vscode\", \"github\", \"docker\")
4. reviewCount should be realistic (100-50000 range)
5. rating should be 3.8-4.9
6. Features must be 8 entries
7. Pros must be 6 entries
8. Cons must be 3 entries
9. ALL content must be in English
10. Each tool object must start with { and end with } — NO commas between objects, NO array wrapper
11. Output ONLY the JSON objects separated by line '---TOKEN---' between each tool

Example output format for ONE tool:
{
  id: \"example-tool\",
  name: \"Example Tool\",
  ...
}
---TOKEN---
{
  id: \"next-tool\",
  ...
}

Now generate data for: ${JOINED}"

JSON_PAYLOAD=$(cat <<EOF
{
  "model": "qwen-plus",
  "max_tokens": 12000,
  "messages": [
    {"role": "system", "content": "You are a developer tools expert. Generate realistic, accurate JSON data about dev tools. Output only the requested JSON data."},
    {"role": "user", "content": $(echo "$PROMPT" | jq -Rs .)}
  ],
  "temperature": 0.7,
  "max_tokens": 8000
}
EOF
)

echo "Generating batch $BATCH: $CATEGORY - ${TOOL_NAMES[*]}" >&2

RESPONSE=$(curl -s -w "\n%{http_code}" "$API_URL" \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d "$JSON_PAYLOAD")

HTTP_CODE=$(echo "$RESPONSE" | tail -1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" != "200" ]; then
  echo "ERROR: HTTP $HTTP_CODE" >&2
  echo "$BODY" >&2
  exit 1
fi

CONTENT=$(echo "$BODY" | jq -r '.choices[0].message.content' 2>/dev/null)
if [ -z "$CONTENT" ] || [ "$CONTENT" = "null" ]; then
  echo "ERROR: Empty response from API" >&2
  echo "$BODY" >&2
  exit 1
fi

echo "$CONTENT"

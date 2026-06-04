#!/bin/bash
# Modified batch generation with 5 tools per batch and higher token limit
set -e

cd ~/devex-tools-hub

SCRIPT="scripts/generate_batch.sh"
OUTPUT_DIR="scripts/batches"
mkdir -p "$OUTPUT_DIR" || true

# Let me try a single batch of 5 tools first to test
echo "=== Batch 1: IDE/Code Editors (5 tools) ==="
bash "$SCRIPT" 1 "IDE/Code Editors" \
  "Visual Studio Code" "JetBrains IntelliJ IDEA" "Sublime Text" "Vim" "Eclipse" \
  > "$OUTPUT_DIR/batch1.txt" 2> "$OUTPUT_DIR/batch1.log"
echo "Batch 1 done: $(wc -c < "$OUTPUT_DIR/batch1.txt") bytes"

echo "=== Batch 2: Version Control (5 tools) ==="
bash "$SCRIPT" 2 "Version Control" \
  "GitHub" "GitLab" "Bitbucket" "GitKraken" "SourceTree" \
  > "$OUTPUT_DIR/batch2.txt" 2> "$OUTPUT_DIR/batch2.log"
echo "Batch 2 done: $(wc -c < "$OUTPUT_DIR/batch2.txt") bytes"

echo "=== Batch 3: CI/CD (5 tools) ==="
bash "$SCRIPT" 3 "CI/CD" \
  "Jenkins" "GitHub Actions" "CircleCI" "GitLab CI/CD" "ArgoCD" \
  > "$OUTPUT_DIR/batch3.txt" 2> "$OUTPUT_DIR/batch3.log"
echo "Batch 3 done: $(wc -c < "$OUTPUT_DIR/batch3.txt") bytes"

echo "=== Batch 4: API Development (5 tools) ==="
bash "$SCRIPT" 4 "API Development" \
  "Postman" "Swagger/OpenAPI" "Insomnia" "Apollo GraphQL" "GraphQL" \
  > "$OUTPUT_DIR/batch4.txt" 2> "$OUTPUT_DIR/batch4.log"
echo "Batch 4 done: $(wc -c < "$OUTPUT_DIR/batch4.txt") bytes"

echo "=== Batch 5: Database Tools (5 tools) ==="
bash "$SCRIPT" 5 "Database Tools" \
  "DBeaver" "pgAdmin" "MongoDB Compass" "MySQL Workbench" "RedisInsight" \
  > "$OUTPUT_DIR/batch5.txt" 2> "$OUTPUT_DIR/batch5.log"
echo "Batch 5 done: $(wc -c < "$OUTPUT_DIR/batch5.txt") bytes"

echo "=== Batch 6: Code Collaboration (5 tools) ==="
bash "$SCRIPT" 6 "Code Collaboration" \
  "GitHub Copilot" "CodeSandbox" "Replit" "Codepen" "Discord" \
  > "$OUTPUT_DIR/batch6.txt" 2> "$OUTPUT_DIR/batch6.log"
echo "Batch 6 done: $(wc -c < "$OUTPUT_DIR/batch6.txt") bytes"

echo "=== Batch 7: Monitoring/Debugging (5 tools) ==="
bash "$SCRIPT" 7 "Monitoring/Debugging" \
  "Datadog" "Sentry" "New Relic" "Grafana" "Prometheus" \
  > "$OUTPUT_DIR/batch7.txt" 2> "$OUTPUT_DIR/batch7.log"
echo "Batch 7 done: $(wc -c < "$OUTPUT_DIR/batch7.txt") bytes"

echo "=== Batch 8: Container Orchestration (5 tools) ==="
bash "$SCRIPT" 8 "Container Orchestration" \
  "Docker" "Kubernetes" "Terraform" "Ansible" "Helm" \
  > "$OUTPUT_DIR/batch8.txt" 2> "$OUTPUT_DIR/batch8.log"
echo "Batch 8 done: $(wc -c < "$OUTPUT_DIR/batch8.txt") bytes"

echo "=== Batch 9: Test Automation (5 tools) ==="
bash "$SCRIPT" 9 "Test Automation" \
  "Jest" "Selenium" "Cypress" "Playwright" "Puppeteer" \
  > "$OUTPUT_DIR/batch9.txt" 2> "$OUTPUT_DIR/batch9.log"
echo "Batch 9 done: $(wc -c < "$OUTPUT_DIR/batch9.txt") bytes"

echo "=== Batch 10: Low-Code Platforms (5 tools) ==="
bash "$SCRIPT" 10 "Low-Code Platforms" \
  "Retool" "Bubble" "OutSystems" "Mendix" "Node.js/npm" \
  > "$OUTPUT_DIR/batch10.txt" 2> "$OUTPUT_DIR/batch10.log"
echo "Batch 10 done: $(wc -c < "$OUTPUT_DIR/batch10.txt") bytes"

echo "=== Batch 11: More Dev Tools (5 tools) ==="
bash "$SCRIPT" 11 "Database Tools" \
  "Sequel Pro" "Azure Data Studio" "DbVisualizer" "NaviCat" "Beekeeper Studio" \
  > "$OUTPUT_DIR/batch11.txt" 2> "$OUTPUT_DIR/batch11.log"
echo "Batch 11 done: $(wc -c < "$OUTPUT_DIR/batch11.txt") bytes"

echo "=== Batch 12: More Dev Tools (5 tools) ==="
bash "$SCRIPT" 12 "Code Collaboration" \
  "Notion" "Jira" "Confluence" "Miro" "Visual Studio" \
  > "$OUTPUT_DIR/batch12.txt" 2> "$OUTPUT_DIR/batch12.log"
echo "Batch 12 done: $(wc -c < "$OUTPUT_DIR/batch12.txt") bytes"

echo "=== Batch 13: More Dev Tools (5 tools) ==="
bash "$SCRIPT" 13 "Monitoring/Debugging" \
  "Chrome DevTools" "LightHouse" "PostHog" "Splunk" "Elasticsearch/Kibana" \
  > "$OUTPUT_DIR/batch13.txt" 2> "$OUTPUT_DIR/batch13.log"
echo "Batch 13 done: $(wc -c < "$OUTPUT_DIR/batch13.txt") bytes"

echo "=== Batch 14: More Dev Tools (5 tools) ==="
bash "$SCRIPT" 14 "Container Orchestration" \
  "Minikube" "Vagrant" "Packer" "Consul" "Nomad" \
  > "$OUTPUT_DIR/batch14.txt" 2> "$OUTPUT_DIR/batch14.log"
echo "Batch 14 done: $(wc -c < "$OUTPUT_DIR/batch14.txt") bytes"

echo "=== All batches complete! ==="
ls -la "$OUTPUT_DIR"

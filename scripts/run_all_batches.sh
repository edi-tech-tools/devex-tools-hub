#!/bin/bash
# Generate all DevEx tools data in batches (70 tools total)
set -e

cd ~/devex-tools-hub

SCRIPT="scripts/generate_batch.sh"
OUTPUT_DIR="scripts/batches"
mkdir -p "$OUTPUT_DIR"

# === Batch 1: IDE/Code Editors (7 tools) ===
echo "=== Batch 1: IDE/Code Editors ==="
bash "$SCRIPT" 1 "IDE/Code Editors" \
  "Visual Studio Code" "JetBrains IntelliJ IDEA" "Sublime Text" "Vim" "Emacs" "Eclipse" "Neovim" \
  > "$OUTPUT_DIR/batch1.txt" 2> "$OUTPUT_DIR/batch1.log"
echo "Done: $(wc -c < "$OUTPUT_DIR/batch1.txt") bytes"

# === Batch 2: Version Control (7 tools) ===
echo "=== Batch 2: Version Control ==="
bash "$SCRIPT" 2 "Version Control" \
  "GitHub" "GitLab" "Bitbucket" "Git" "SourceTree" "GitKraken" "Mercurial" \
  > "$OUTPUT_DIR/batch2.txt" 2> "$OUTPUT_DIR/batch2.log"
echo "Done: $(wc -c < "$OUTPUT_DIR/batch2.txt") bytes"

# === Batch 3: CI/CD (7 tools) ===
echo "=== Batch 3: CI/CD ==="
bash "$SCRIPT" 3 "CI/CD" \
  "Jenkins" "GitHub Actions" "CircleCI" "Travis CI" "GitLab CI/CD" "ArgoCD" "TeamCity" \
  > "$OUTPUT_DIR/batch3.txt" 2> "$OUTPUT_DIR/batch3.log"
echo "Done: $(wc -c < "$OUTPUT_DIR/batch3.txt") bytes"

# === Batch 4: API Development (7 tools) ===
echo "=== Batch 4: API Development ==="
bash "$SCRIPT" 4 "API Development" \
  "Postman" "Swagger/OpenAPI" "Insomnia" "GraphQL" "Apollo GraphQL" "Paw" "Hoppscotch" \
  > "$OUTPUT_DIR/batch4.txt" 2> "$OUTPUT_DIR/batch4.log"
echo "Done: $(wc -c < "$OUTPUT_DIR/batch4.txt") bytes"

# === Batch 5: Database Tools (7 tools) ===
echo "=== Batch 5: Database Tools ==="
bash "$SCRIPT" 5 "Database Tools" \
  "DBeaver" "pgAdmin" "MongoDB Compass" "MySQL Workbench" "RedisInsight" "TablePlus" "DataGrip" \
  > "$OUTPUT_DIR/batch5.txt" 2> "$OUTPUT_DIR/batch5.log"
echo "Done: $(wc -c < "$OUTPUT_DIR/batch5.txt") bytes"

# === Batch 6: Code Collaboration + Package Management (7 tools) ===
echo "=== Batch 6: Code Collaboration ==="
bash "$SCRIPT" 6 "Code Collaboration" \
  "GitHub Copilot" "CodeSandbox" "Replit" "Codepen" "Discord" "Slack" "Linear" \
  > "$OUTPUT_DIR/batch6.txt" 2> "$OUTPUT_DIR/batch6.log"
echo "Done: $(wc -c < "$OUTPUT_DIR/batch6.txt") bytes"

# === Batch 7: Monitoring/Debugging (7 tools) ===
echo "=== Batch 7: Monitoring/Debugging ==="
bash "$SCRIPT" 7 "Monitoring/Debugging" \
  "Datadog" "Sentry" "New Relic" "Grafana" "Prometheus" "Chrome DevTools" "Jaeger" \
  > "$OUTPUT_DIR/batch7.txt" 2> "$OUTPUT_DIR/batch7.log"
echo "Done: $(wc -c < "$OUTPUT_DIR/batch7.txt") bytes"

# === Batch 8: Container Orchestration (7 tools) ===
echo "=== Batch 8: Container Orchestration ==="
bash "$SCRIPT" 8 "Container Orchestration" \
  "Docker" "Kubernetes" "Terraform" "Ansible" "Packer" "Helm" "Minikube" \
  > "$OUTPUT_DIR/batch8.txt" 2> "$OUTPUT_DIR/batch8.log"
echo "Done: $(wc -c < "$OUTPUT_DIR/batch8.txt") bytes"

# === Batch 9: Test Automation (7 tools) ===
echo "=== Batch 9: Test Automation ==="
bash "$SCRIPT" 9 "Test Automation" \
  "Jest" "Selenium" "Cypress" "Playwright" "Mocha" "Puppeteer" "Vitest" \
  > "$OUTPUT_DIR/batch9.txt" 2> "$OUTPUT_DIR/batch9.log"
echo "Done: $(wc -c < "$OUTPUT_DIR/batch9.txt") bytes"

# === Batch 10: Low-Code Platforms + Package Managers (7 tools) ===
echo "=== Batch 10: Low-Code Platforms ==="
bash "$SCRIPT" 10 "Low-Code Platforms" \
  "Retool" "Bubble" "OutSystems" "Mendix" "Appian" "Node.js/npm" "pnpm" \
  > "$OUTPUT_DIR/batch10.txt" 2> "$OUTPUT_DIR/batch10.log"
echo "Done: $(wc -c < "$OUTPUT_DIR/batch10.txt") bytes"

echo "=== All 10 batches complete! ==="
ls -la "$OUTPUT_DIR"

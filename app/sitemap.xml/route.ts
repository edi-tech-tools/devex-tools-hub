import { MetadataRoute } from "next";

const BLOG_SLUGS = [
  "top-10-ci-cd-tools-2026",
    "docker-vs-podman-vs-orbstack-2026-developer-experience",
    "playwright-vs-cypress-vs-puppeteer-2026",
    "k8s-vs-docker-compose-vs-nomad-2026",
    "grafana-vs-datadog-vs-new-relic-vs-sentry-2026",
    "best-devops-tools-2026-comparison",
    "github-actions-vs-gitlab-ci-vs-jenkins-2026",
    "code-quality-tools-2026-comparison",
] as const;

const TOOL_SLUGS = [
  "android-studio",
    "ansible",
    "apache-subversion",
    "apollo-graphql",
    "argocd",
    "bamboo",
    "bitbucket",
    "chronosphere",
    "circleci",
    "cypress",
    "datadog",
    "datagrip",
    "dbeaver",
    "docker",
    "drone-ci",
    "eclipse-ide",
    "elasticsearch",
    "github",
    "github-actions",
    "gitlab",
    "gitlab-ci-cd",
    "grafana",
    "helm",
    "hoppscotch",
    "insomnia",
    "intellij-idea",
    "jaeger",
    "jenkins",
    "jest",
    "kubernetes",
    "mongodb-compass",
    "mysql-workbench",
    "neovim",
    "new-relic",
    "opentelemetry",
    "packer",
    "pgadmin",
    "podman",
    "postman",
    "prometheus",
    "pycharm",
    "rapidapi",
    "redisinsight",
    "selenium",
    "sentry",
    "sourceforge",
    "spinnaker",
    "splunk",
    "studio-3t",
    "sublime-text",
    "swagger",
    "tableplus",
    "teamcity",
    "terraform",
    "travis-ci",
    "vagrant",
    "vim",
    "vscode",
    "webstorm",
    "xcode",
] as const;

const CATEGORY_SLUGS = [
  "api-development",
    "ci-cd",
    "container-and-orchestration",
    "database-tools",
    "ide-code-editor",
    "monitoring-and-debugging",
    "test-automation",
    "version-control",
] as const;

export async function GET() {
  const baseUrl = "https://devex-tools.net";

  const urls: string[] = [];

  // Static pages
  urls.push(`<url><loc>${baseUrl}</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>`);
  urls.push(`<url><loc>${baseUrl}/blog</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>`);
  urls.push(`<url><loc>${baseUrl}/about</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>`);
  urls.push(`<url><loc>${baseUrl}/contact</loc><changefreq>monthly</changefreq><priority>0.4</priority></url>`);
  urls.push(`<url><loc>${baseUrl}/faq</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>`);
  urls.push(`<url><loc>${baseUrl}/privacy</loc><changefreq>yearly</changefreq><priority>0.3</priority></url>`);
  urls.push(`<url><loc>${baseUrl}/terms</loc><changefreq>yearly</changefreq><priority>0.3</priority></url>`);
  urls.push(`<url><loc>${baseUrl}/disclosure</loc><changefreq>yearly</changefreq><priority>0.3</priority></url>`);

  // Category pages
  for (const slug of CATEGORY_SLUGS) {
    urls.push(`<url><loc>${baseUrl}/category/${slug}</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>`);
  }

  // Blog pages
  for (const slug of BLOG_SLUGS) {
    urls.push(`<url><loc>${baseUrl}/blog/${slug}</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>`);
  }

  // Tool pages
  for (const slug of TOOL_SLUGS) {
    urls.push(`<url><loc>${baseUrl}/tools/${slug}</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>`);
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;

  return new Response(sitemap, {
    headers: { "Content-Type": "application/xml" },
  });
}

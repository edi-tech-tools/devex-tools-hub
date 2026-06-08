"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: 'What are developer tools?',
      acceptedAnswer: {
        "@type": "Answer",
        text: 'Developer tools (dev tools) are software applications, libraries, frameworks, and platforms that help engineers write, test, deploy, and monitor code. They range from IDEs and version control systems to CI/CD pipelines, API testing frameworks, containerization tools, and observability platforms. Dev tools are essential for modern software development workflows, enabling teams to ship faster with higher quality and confidence.',
      },
    },
    {
      "@type": "Question",
      name: 'What is the difference between free and paid developer tools?',
      acceptedAnswer: {
        "@type": "Answer",
        text: 'Free developer tools are typically open-source projects (e.g., VS Code, Git, Prometheus) maintained by communities or foundations, offering full functionality at no cost. Paid tools add enterprise features like SSO, dedicated support, advanced analytics, SLA guarantees, and compliance certifications. Many commercial tools (e.g., GitHub Copilot, Datadog, Terraform Cloud) offer free tiers with usage limits, then charge for scale. The right choice depends on your team size, compliance needs, and budget.',
      },
    },
    {
      "@type": "Question",
      name: 'How do I choose the right IDE or code editor?',
      acceptedAnswer: {
        "@type": "Answer",
        text: 'Choosing an IDE depends on your tech stack and workflow. VS Code is the most versatile with extensions for nearly every language. JetBrains IDEs (IntelliJ, PyCharm, WebStorm) offer deep language-specific features but cost money. Vim/Neovim and Emacs suit power users who want terminal-based workflows. Zed is a modern, fast editor gaining traction. Evaluate language support, debugging capabilities, terminal integration, extension ecosystem, and collaboration features like Live Share.',
      },
    },
    {
      "@type": "Question",
      name: 'What is version control and why is it important?',
      acceptedAnswer: {
        "@type": "Answer",
        text: "Version control systems (VCS) track changes to code over time, enabling teams to collaborate without overwriting each other's work. Git is the industry standard, with platforms like GitHub, GitLab, and Bitbucket providing hosting and collaboration features. Version control enables branching (working on features in isolation), code review via pull requests, rollback to previous states, audit trails, and CI/CD integration. It is foundational to modern software development.",
      },
    },
    {
      "@type": "Question",
      name: 'What is CI/CD and how do I choose a pipeline tool?',
      acceptedAnswer: {
        "@type": "Answer",
        text: 'CI/CD (Continuous Integration/Continuous Deployment) automates building, testing, and deploying code changes. CI runs tests on every commit to catch regressions early; CD automates deployment to staging/production. GitHub Actions offers the best GitHub integration and generous free tier. GitLab CI/CD provides end-to-end DevSecOps traceability. CircleCI excels at caching and parallelism. Jenkins is the most customizable but requires maintenance. Choose based on your platform, compliance needs, and team size.',
      },
    },
    {
      "@type": "Question",
      name: 'What are the best API testing tools?',
      acceptedAnswer: {
        "@type": "Answer",
        text: 'Top API testing tools include Postman (most popular for manual and automated REST API testing), Insomnia (open-source alternative with GraphQL support), Bruno (lightweight, Git-friendly API client), and HTTPie (CLI-focused). For automated integration testing, Supertest (Node.js) and pytest (Python) are widely used. For API monitoring, tools like Checkly and Postman Monitors track endpoint health. Key features to evaluate: environment management, test scripting, CI/CD integration, and collaboration.',
      },
    },
    {
      "@type": "Question",
      name: 'What is the difference between a code editor and an IDE?',
      acceptedAnswer: {
        "@type": "Answer",
        text: 'A code editor is a lightweight tool focused on editing text with syntax highlighting, basic autocompletion, and file navigation (e.g., VS Code, Sublime Text, Vim). An IDE (Integrated Development Environment) bundles an editor with built-in debugging, compilation, testing, profiling, and deployment tools (e.g., IntelliJ IDEA, Eclipse, Xcode). The line has blurred — VS Code with extensions can function like an IDE. Choose an editor for speed and simplicity, or an IDE for all-in-one, language-specific functionality.',
      },
    },
    {
      "@type": "Question",
      name: 'What database management tools do developers need?',
      acceptedAnswer: {
        "@type": "Answer",
        text: "Essential database tools include: GUI clients like DBeaver (universal), TablePlus (modern, fast), and pgAdmin (PostgreSQL-specific). For schema migrations: Liquibase, Flyway, and Prisma Migrate. For query optimization: pg_stat_statements, MySQL Workbench's visual explain. Redis Insight for caching layers. MongoDB Compass for NoSQL. For cloud databases: AWS RDS Console, Google Cloud SQL. Most GUI tools support SSH tunneling and SSL for secure remote connections.",
      },
    },
    {
      "@type": "Question",
      name: 'What are containerization tools and should I use them?',
      acceptedAnswer: {
        "@type": "Answer",
        text: 'Containerization packages applications with their dependencies into isolated, portable units. Docker is the standard for building and running containers. Podman is a daemonless, rootless alternative. For orchestration at scale, Kubernetes (K8s) manages container clusters with auto-scaling and self-healing. Docker Compose simplifies local multi-container setups. Containerization ensures consistent environments across development, testing, and production. It is essential for microservices and cloud-native development.',
      },
    },
    {
      "@type": "Question",
      name: 'How do I choose monitoring and observability tools?',
      acceptedAnswer: {
        "@type": "Answer",
        text: 'Observability tools fall into three pillars: metrics, logs, and traces. Datadog and New Relic offer all-in-one SaaS platforms with rich dashboards and alerting. Grafana + Prometheus is the leading open-source stack for metrics. Grafana Loki handles logs. Jaeger and OpenTelemetry provide distributed tracing. Sentry specializes in error/exception tracking. For cost-sensitive teams, start with Prometheus + Grafana + Loki. For enterprise needs, Datadog provides the fastest time-to-value. Evaluate cardinality handling, retention costs, and integration with your stack.',
      },
    },
    {
      "@type": "Question",
      name: 'What security scanning tools should developers use?',
      acceptedAnswer: {
        "@type": "Answer",
        text: 'Essential security tools include: SAST (Static Analysis): SonarQube, ESLint security plugins, CodeQL. DAST (Dynamic Analysis): OWASP ZAP, Burp Suite. Dependency scanning: Dependabot (GitHub), Snyk, Renovate. Secret scanning: GitGuardian, TruffleHog. Container scanning: Trivy, Grype, Clair. SBOM generation: Syft, CycloneDX. Linting: ESLint, Pylint, golangci-lint. Integrate these into CI/CD pipelines to catch vulnerabilities before deployment. Start with Snyk or Dependabot for dependency scanning.',
      },
    },
    {
      "@type": "Question",
      name: 'What tools help teams collaborate on code?',
      acceptedAnswer: {
        "@type": "Answer",
        text: 'Key collaboration tools include: Code review: GitHub Pull Requests, GitLab MRs, Gerrit, Reviewable. Documentation: Notion, Confluence, Obsidian, MDN-style with Storybook. Real-time collaboration: Tuple (pair programming), CodeWithMe (JetBrains), VS Code Live Share. Project management: Linear, Jira, GitHub Projects. Knowledge sharing: Stack Overflow for Teams, Swimm (code documentation), Mermaid for diagrams. Effective collaboration depends on well-defined workflows and processes, not just tools.',
      },
    },
    {
      "@type": "Question",
      name: 'Open-source vs commercial developer tools: which is better?',
      acceptedAnswer: {
        "@type": "Answer",
        text: 'Open-source tools offer free access, transparency, community support, and customization. Commercial tools provide polished UX, dedicated support, SLAs, compliance certifications, and enterprise features. Many adopt an open-core model (free basics + paid enterprise features). Best practice: use open-source for core infrastructure where you have expertise, and commercial tools where support and reliability are critical. For startups: start with open-source. For enterprises: budget for commercial tools that reduce operational burden.',
      },
    },
    {
      "@type": "Question",
      name: 'How do I build an effective developer toolchain?',
      acceptedAnswer: {
        "@type": "Answer",
        text: 'Start with a version control system (Git), then add CI/CD (GitHub Actions or GitLab CI), an editor (VS Code with extensions), and a package manager (npm, pip, cargo). Layer on testing (Jest, pytest, Playwright), monitoring (Prometheus + Grafana), containerization (Docker), and deployment (GitHub Actions + Docker Compose or Kubernetes). Keep your toolchain lean — only add tools that solve a real pain point. Regularly audit tool usage and remove unused ones. The best toolchain is one your whole team understands and uses consistently.',
      },
    },
  ],
};

const FAQ_ITEMS = [
  {
    question: 'What are developer tools?',
    answer: 'Developer tools (dev tools) are software applications, libraries, frameworks, and platforms that help engineers write, test, deploy, and monitor code. They range from IDEs and version control systems to CI/CD pipelines, API testing frameworks, containerization tools, and observability platforms. Dev tools are essential for modern software development workflows, enabling teams to ship faster with higher quality and confidence.',
  },
  {
    question: 'What is the difference between free and paid developer tools?',
    answer: 'Free developer tools are typically open-source projects (e.g., VS Code, Git, Prometheus) maintained by communities or foundations, offering full functionality at no cost. Paid tools add enterprise features like SSO, dedicated support, advanced analytics, SLA guarantees, and compliance certifications. Many commercial tools (e.g., GitHub Copilot, Datadog, Terraform Cloud) offer free tiers with usage limits, then charge for scale. The right choice depends on your team size, compliance needs, and budget.',
  },
  {
    question: 'How do I choose the right IDE or code editor?',
    answer: 'Choosing an IDE depends on your tech stack and workflow. VS Code is the most versatile with extensions for nearly every language. JetBrains IDEs (IntelliJ, PyCharm, WebStorm) offer deep language-specific features but cost money. Vim/Neovim and Emacs suit power users who want terminal-based workflows. Zed is a modern, fast editor gaining traction. Evaluate language support, debugging capabilities, terminal integration, extension ecosystem, and collaboration features like Live Share.',
  },
  {
    question: 'What is version control and why is it important?',
    answer: "Version control systems (VCS) track changes to code over time, enabling teams to collaborate without overwriting each other's work. Git is the industry standard, with platforms like GitHub, GitLab, and Bitbucket providing hosting and collaboration features. Version control enables branching (working on features in isolation), code review via pull requests, rollback to previous states, audit trails, and CI/CD integration. It is foundational to modern software development.",
  },
  {
    question: 'What is CI/CD and how do I choose a pipeline tool?',
    answer: 'CI/CD (Continuous Integration/Continuous Deployment) automates building, testing, and deploying code changes. CI runs tests on every commit to catch regressions early; CD automates deployment to staging/production. GitHub Actions offers the best GitHub integration and generous free tier. GitLab CI/CD provides end-to-end DevSecOps traceability. CircleCI excels at caching and parallelism. Jenkins is the most customizable but requires maintenance. Choose based on your platform, compliance needs, and team size.',
  },
  {
    question: 'What are the best API testing tools?',
    answer: 'Top API testing tools include Postman (most popular for manual and automated REST API testing), Insomnia (open-source alternative with GraphQL support), Bruno (lightweight, Git-friendly API client), and HTTPie (CLI-focused). For automated integration testing, Supertest (Node.js) and pytest (Python) are widely used. For API monitoring, tools like Checkly and Postman Monitors track endpoint health. Key features to evaluate: environment management, test scripting, CI/CD integration, and collaboration.',
  },
  {
    question: 'What is the difference between a code editor and an IDE?',
    answer: 'A code editor is a lightweight tool focused on editing text with syntax highlighting, basic autocompletion, and file navigation (e.g., VS Code, Sublime Text, Vim). An IDE (Integrated Development Environment) bundles an editor with built-in debugging, compilation, testing, profiling, and deployment tools (e.g., IntelliJ IDEA, Eclipse, Xcode). The line has blurred — VS Code with extensions can function like an IDE. Choose an editor for speed and simplicity, or an IDE for all-in-one, language-specific functionality.',
  },
  {
    question: 'What database management tools do developers need?',
    answer: "Essential database tools include: GUI clients like DBeaver (universal), TablePlus (modern, fast), and pgAdmin (PostgreSQL-specific). For schema migrations: Liquibase, Flyway, and Prisma Migrate. For query optimization: pg_stat_statements, MySQL Workbench's visual explain. Redis Insight for caching layers. MongoDB Compass for NoSQL. For cloud databases: AWS RDS Console, Google Cloud SQL. Most GUI tools support SSH tunneling and SSL for secure remote connections.",
  },
  {
    question: 'What are containerization tools and should I use them?',
    answer: 'Containerization packages applications with their dependencies into isolated, portable units. Docker is the standard for building and running containers. Podman is a daemonless, rootless alternative. For orchestration at scale, Kubernetes (K8s) manages container clusters with auto-scaling and self-healing. Docker Compose simplifies local multi-container setups. Containerization ensures consistent environments across development, testing, and production. It is essential for microservices and cloud-native development.',
  },
  {
    question: 'How do I choose monitoring and observability tools?',
    answer: 'Observability tools fall into three pillars: metrics, logs, and traces. Datadog and New Relic offer all-in-one SaaS platforms with rich dashboards and alerting. Grafana + Prometheus is the leading open-source stack for metrics. Grafana Loki handles logs. Jaeger and OpenTelemetry provide distributed tracing. Sentry specializes in error/exception tracking. For cost-sensitive teams, start with Prometheus + Grafana + Loki. For enterprise needs, Datadog provides the fastest time-to-value. Evaluate cardinality handling, retention costs, and integration with your stack.',
  },
  {
    question: 'What security scanning tools should developers use?',
    answer: 'Essential security tools include: SAST (Static Analysis): SonarQube, ESLint security plugins, CodeQL. DAST (Dynamic Analysis): OWASP ZAP, Burp Suite. Dependency scanning: Dependabot (GitHub), Snyk, Renovate. Secret scanning: GitGuardian, TruffleHog. Container scanning: Trivy, Grype, Clair. SBOM generation: Syft, CycloneDX. Linting: ESLint, Pylint, golangci-lint. Integrate these into CI/CD pipelines to catch vulnerabilities before deployment. Start with Snyk or Dependabot for dependency scanning.',
  },
  {
    question: 'What tools help teams collaborate on code?',
    answer: 'Key collaboration tools include: Code review: GitHub Pull Requests, GitLab MRs, Gerrit, Reviewable. Documentation: Notion, Confluence, Obsidian, MDN-style with Storybook. Real-time collaboration: Tuple (pair programming), CodeWithMe (JetBrains), VS Code Live Share. Project management: Linear, Jira, GitHub Projects. Knowledge sharing: Stack Overflow for Teams, Swimm (code documentation), Mermaid for diagrams. Effective collaboration depends on well-defined workflows and processes, not just tools.',
  },
  {
    question: 'Open-source vs commercial developer tools: which is better?',
    answer: 'Open-source tools offer free access, transparency, community support, and customization. Commercial tools provide polished UX, dedicated support, SLAs, compliance certifications, and enterprise features. Many adopt an open-core model (free basics + paid enterprise features). Best practice: use open-source for core infrastructure where you have expertise, and commercial tools where support and reliability are critical. For startups: start with open-source. For enterprises: budget for commercial tools that reduce operational burden.',
  },
  {
    question: 'How do I build an effective developer toolchain?',
    answer: 'Start with a version control system (Git), then add CI/CD (GitHub Actions or GitLab CI), an editor (VS Code with extensions), and a package manager (npm, pip, cargo). Layer on testing (Jest, pytest, Playwright), monitoring (Prometheus + Grafana), containerization (Docker), and deployment (GitHub Actions + Docker Compose or Kubernetes). Keep your toolchain lean — only add tools that solve a real pain point. Regularly audit tool usage and remove unused ones. The best toolchain is one your whole team understands and uses consistently.',
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />

      <div className="relative pt-32 pb-20 px-6">
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#3B82F6] bg-[#162440] px-3 py-1.5 rounded-md mb-4">
              FAQ
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-[#F0F4F8] tracking-tight mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-[#8BA3BE] max-w-xl mx-auto leading-relaxed">
              Everything you need to know about developer tools — from choosing the right
              tools to understanding IDEs, CI/CD, version control, and deployment strategies.
            </p>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, index) => (
              <div
                key={index}
                className="bg-[#0F1D32] border border-[#1E3A5F] rounded-xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-[#162440] transition-colors"
                  aria-expanded={openIndex === index}
                >
                  <span className="text-[#F0F4F8] font-medium pr-4">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#3B82F6] flex-shrink-0 transition-transform duration-200 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-5 pb-5 text-[#8BA3BE] leading-relaxed text-sm border-t border-[#1E3A5F] pt-4">
                    {item.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-[#8BA3BE] text-sm">
              Still have questions?{" "}
              <a
                href="/contact"
                className="text-[#3B82F6] hover:underline font-medium"
              >
                Contact our team
              </a>{" "}
              and we&apos;ll get back to you within 24 hours.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

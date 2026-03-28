# Dependency Management Specification

> 6 ay guncellenmemis dependency = guvenlik acigi. Otomatik guncelleme sart.

---

## Setup: Renovate (Recommended)

### renovate.json (repo root)
```json
{
  "$schema": "https://docs.renovatebot.com/renovate-schema.json",
  "extends": [
    "config:recommended",
    ":semanticCommits",
    "group:allNonMajor"
  ],
  "schedule": ["before 7am on Monday"],
  "labels": ["dependencies"],
  "packageRules": [
    {
      "description": "Minor + Patch → auto-merge",
      "matchUpdateTypes": ["minor", "patch"],
      "automerge": true,
      "automergeType": "pr",
      "platformAutomerge": true
    },
    {
      "description": "Major → manual review",
      "matchUpdateTypes": ["major"],
      "automerge": false,
      "labels": ["dependencies", "breaking-change"]
    },
    {
      "description": "Group Next.js ecosystem",
      "matchPackageNames": ["next", "eslint-config-next", "@next/*"],
      "groupName": "Next.js"
    },
    {
      "description": "Group Tailwind ecosystem",
      "matchPackageNames": ["tailwindcss", "@tailwindcss/*", "postcss", "autoprefixer"],
      "groupName": "Tailwind CSS"
    },
    {
      "description": "Group shadcn/ui related",
      "matchPackageNames": ["@radix-ui/*", "class-variance-authority", "clsx", "tailwind-merge"],
      "groupName": "UI Components"
    },
    {
      "description": "Group testing tools",
      "matchPackageNames": ["vitest", "@playwright/test", "@axe-core/*", "@testing-library/*"],
      "groupName": "Testing"
    }
  ],
  "vulnerabilityAlerts": {
    "enabled": true,
    "labels": ["security"]
  }
}
```

### How It Works
```
Every Monday before 7am:
├── Renovate scans all dependencies
├── Minor/Patch updates → auto-merge PR (if CI passes)
├── Major updates → creates PR, waits for manual review
├── Security vulnerabilities → immediate PR with "security" label
└── Grouped PRs (Next.js together, Tailwind together, etc.)
```

---

## Alternative: Dependabot (GitHub Native)

### .github/dependabot.yml
```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
    open-pull-requests-limit: 10
    labels:
      - "dependencies"
    groups:
      next-ecosystem:
        patterns: ["next", "@next/*", "eslint-config-next"]
      ui-components:
        patterns: ["@radix-ui/*", "class-variance-authority"]
      testing:
        patterns: ["vitest", "@playwright/*", "@testing-library/*"]
```

---

## npm audit (CI Pipeline)

```yaml
# .github/workflows/ci.yml — add this step
- name: Security audit
  run: npm audit --audit-level=high
  continue-on-error: true  # warn but don't block
```

### Manual Audit
```bash
npm audit                    # show vulnerabilities
npm audit fix               # auto-fix compatible updates
npm audit fix --force       # fix with breaking changes (careful!)
npm outdated                # show outdated packages
```

---

## Version Pinning Strategy

```json
// package.json
{
  "dependencies": {
    "next": "^15.0.0",          // ^minor allowed (Renovate handles)
    "react": "^19.0.0",
    "@radix-ui/react-dialog": "^1.0.0",
    "tailwindcss": "^4.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@playwright/test": "^1.40.0",
    "vitest": "^2.0.0"
  }
}
```

**Rule:** Use `^` (caret) for all dependencies. Let Renovate/Dependabot handle updates via PRs with CI checks.

**Never:** Use `*` or `latest`. Never `npm update --latest` without checking breaking changes.

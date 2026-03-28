# WebForge — Architecture & Bootstrap

> Bu dosya bir projenin CLAUDE.md dosyasinda referans verildiginde otomatik calisir.
> Kullanim: CLAUDE.md icine `@webforge/BOOTSTRAP.md` ekleyin.
> Version: 3.0.0 | Date: 2026-03-27

---

## INSTRUCTION FOR CLAUDE

When you see this file referenced in CLAUDE.md or the user points you to the `webforge/` folder,
execute the following protocol AUTOMATICALLY, step by step. Do NOT skip any step.

---

## System Architecture Overview

```
USER (any language)
  │
  ▼
┌──────────────────┐
│  user-liaison     │  ← Receives raw user input in ANY language
│                    │  ← Fixes grammar, asks clarifying questions
│                    │  ← Translates to clean English
└────────┬─────────┘
         │ (clean English message)
         ▼
┌──────────────────┐
│  prompt-engineer  │  ← Receives clean English requirement
│                    │  ← Creates structured Task JSON
│                    │  ← Assigns to appropriate agents
│                    │  ← Defines dependencies, parallel/sequential
└────────┬─────────┘
         │ (Task JSON)
         ▼
┌──────────────────┐
│  lead-manager     │  ← Receives Task JSON
│                    │  ← Orchestrates agent execution
│                    │  ← Launches parallel agents
│                    │  ← Collects status reports
│                    │  ← Resolves conflicts
└────────┬─────────┘
         │ (assigns tasks)
         ▼
┌─────────────────────────────────────────────────────────┐
│  SPECIALIST AGENTS (work in parallel where possible)     │
│                                                          │
│  ┌─────────────────┐  ┌─────────────────┐               │
│  │ brand-strategist │  │ keyword-analyst │               │
│  │ (identity, tone, │  │ (keyword research│               │
│  │  naming, colors) │  │  traffic targets)│               │
│  └────────┬────────┘  └────────┬────────┘               │
│           │                     │                         │
│           ▼                     ▼                         │
│  ┌─────────────────┐  ┌──────────────────┐              │
│  │ seo-sem-expert  │  │ content-strategist│              │
│  │ (SEO, SEM, GEO, │  │ (copy, messaging, │              │
│  │  AIO, analytics) │  │  tone of voice)   │              │
│  └─────────────────┘  └──────────────────┘              │
│                                                          │
│  ┌─────────────────┐  ┌─────────────────┐               │
│  │ frontend-dev    │  │ backend-dev     │               │
│  │ (UI, a11y, theme│  │ (API, DB, auth) │               │
│  │  i18n, pages)   │  │                  │               │
│  └─────────────────┘  └─────────────────┘               │
│                                                          │
│  ┌─────────────────┐  ┌─────────────────┐               │
│  │ infra-engineer  │  │ test-engineer   │               │
│  │ (cookie, headers│  │ (quality gate,  │               │
│  │  analytics, perf│  │  a11y, SEO audit│               │
│  └─────────────────┘  └─────────────────┘               │
└─────────────────────────────────────────────────────────┘
         │ (status reports)
         ▼
┌──────────────────┐
│  lead-manager     │  ← Collects all reports
│                    │  ← Compiles summary
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  prompt-engineer  │  ← Receives completion report
│                    │  ← Formats final status
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  user-liaison     │  ← Translates report to user's language
│                    │  ← Presents results
└────────┬─────────┘
         │
         ▼
      USER (sees results in their language)
```

## Communication Matrix

```
                    liaison  prompt  lead   brand  keyword  seo-sem  content  front  back   infra  test
user-liaison          -       ✅      -      -       -        -        -       -      -      -      -
prompt-engineer      ✅       -      ✅      -       -        -        -       -      -      -      -
lead-manager          -      ✅       -     ✅      ✅       ✅       ✅      ✅     ✅     ✅     ✅
brand-strategist      -       -      ✅      -      ✅       ✅       ✅      ✅      -      -      -
keyword-analyst       -       -      ✅     ✅       -       ✅       ✅       -      -      -      -
seo-sem-expert        -       -      ✅     ✅      ✅        -       ✅      ✅      -     ✅      -
content-strategist    -       -      ✅     ✅      ✅       ✅        -      ✅      -      -      -
frontend-dev          -       -      ✅     ✅       -       ✅       ✅       -     ✅      -     ✅
backend-dev           -       -      ✅      -       -        -        -      ✅      -     ✅     ✅
infra-engineer        -       -      ✅      -       -       ✅        -      ✅     ✅      -     ✅
test-engineer         -       -      ✅      -       -       ✅        -      ✅     ✅     ✅      -
```

**Reading the matrix:** Row = sender, Column = receiver. ✅ = can send messages.

---

## Step 0: Read System Files

Read the following files from this folder IN ORDER:

```
1. BOOTSTRAP.md          ← (this file — architecture + flow)
2. CONFIG.md             ← Language rules, agent fundamentals, tool hierarchy
3. discovery/            ← Discovery phases (14 files, read sequentially)
4. agents/               ← Agent templates (read after discovery)
5. specs/                ← Implementation specs (read during implementation)
6. checklists/           ← Quality gates (read during testing)
```

---

## Step 1: Scan the Project (Automatic)

Scan the project directory with Glob and Grep:

```
1. package.json / requirements.txt / go.mod / Cargo.toml  → Tech stack
2. src/ or app/ directory structure                        → Architecture
3. .env.example / .env.local                               → External services
4. Existing CLAUDE.md, AGENTS.md                           → Previous rules
5. .claude/agents/*.md                                     → Existing agents
6. src/app/api/ or routes/                                 → Backend layer
7. src/components/ or pages/                               → Frontend layer
8. src/lib/ or utils/                                      → Shared logic
9. tests/ or __tests__/ or *.test.*                        → Test infrastructure
10. .github/workflows/ or CI config                        → CI/CD
```

---

## Step 2: Detect Project Type

| Signal | Type |
|--------|------|
| Next.js / Nuxt / Remix / Astro / SvelteKit | Web Project → FULL DISCOVERY |
| Express / Fastify / Hono / Django / FastAPI only | API Project → SKIP web phases |
| No framework detected | Ask user what to build |

---

## Step 3: Activate user-liaison Agent

The `user-liaison` agent takes over from this point. It:

1. Presents scan results to the user IN THEIR LANGUAGE
2. Runs all 14 discovery phases (asking questions one phase at a time)
3. For EACH user answer:
   a. Fixes grammar/spelling issues
   b. Identifies ambiguous or contradictory statements
   c. Asks clarifying questions if needed
   d. Once clear → translates to clean English
   e. Passes English version to prompt-engineer
4. After all phases → prompt-engineer generates the master Task JSON
5. lead-manager orchestrates execution
6. Results flow back through the chain to the user

---

## Step 4: Discovery Protocol (16 Phases)

```
discovery/
├── 01-core-identity.md          → Site type, audience, languages, domain
├── 02-brand-strategy.md         → Brand identity, naming, tone, personality
├── 03-visual-identity.md        → Colors, typography, logo, design system
├── 04-keyword-strategy.md       → Target keywords, competitors, traffic goals
├── 05-legal-privacy.md          → Cookie consent, GDPR/KVKK, legal pages
├── 06-accessibility.md          → WCAG level, UI library, a11y requirements
├── 07-theme-visual.md           → Light/Dark/System, design tokens
├── 08-seo.md                    → Technical SEO, structured data, sitemap
├── 09-sem.md                    → GTM, pixels, conversion tracking
├── 10-geo.md                    → AI search optimization (llms.txt)
├── 11-aio-llmo.md               → AI bot management, content structure
├── 12-analytics-performance.md  → GA4, Core Web Vitals, optimization
├── 13-security.md               → Headers, auth, hosting, CI/CD
├── 14-ux-social.md              → Pages, components, social, contact
├── 15-blog-system.md            → Blog (progressive Level 0-4, import/export)
├── 16-infrastructure.md         → Email, media, Sentry, CI/CD, URL, favicon, tests
```

---

## Step 5: Agent Selection & Approval

After discovery, present recommended agent structure to user:

### Minimum (Landing page / Small site)
```
user-liaison → prompt-engineer → frontend-dev + seo-sem-expert → test-engineer
```

### Standard (Corporate / Business site)
```
user-liaison → prompt-engineer → lead-manager
  → brand-strategist + keyword-analyst (Phase A — research)
  → seo-sem-expert + content-strategist (Phase B — strategy)
  → frontend-dev + backend-dev + infra-engineer (Phase C — build)
  → test-engineer (Phase D — quality gate)
```

### Full (SaaS / E-commerce / Complex)
```
All 11 agents active with full communication matrix
```

---

## Step 6: Execution Flow

### Phase A: Research (Parallel)
```
lead-manager launches in parallel:
├── brand-strategist  → brand identity, naming, color palette, tone
└── keyword-analyst   → keyword research, competitor analysis, traffic targets
```

### Phase B: Strategy (Parallel, depends on Phase A)
```
lead-manager launches in parallel (using Phase A outputs):
├── seo-sem-expert     → SEO strategy, keyword mapping, schema plan, SEM setup
└── content-strategist → content plan, messaging framework, copy guidelines
```

### Phase C: Build (Parallel, depends on Phase B)
```
lead-manager launches in parallel (using Phase A+B outputs):
├── frontend-dev    → UI, pages, a11y, theme, i18n
├── backend-dev     → API, DB, auth, email
└── infra-engineer  → cookie consent, analytics, security, performance
```

### Phase D: Quality Gate (Sequential, depends on Phase C)
```
test-engineer → full quality audit → report to lead-manager
→ if issues found → assign fixes to responsible agent → re-test
```

### Phase E: Reporting
```
lead-manager → compiles final status → prompt-engineer formats → user-liaison translates → USER
```

---

## Step 7: Task JSON Format (Generated by prompt-engineer)

```json
{
  "project": "project-name",
  "created_by": "prompt-engineer",
  "created_at": "2026-03-27T12:00:00Z",
  "phases": [
    {
      "id": "phase-A",
      "name": "Research",
      "parallel": true,
      "tasks": [
        {
          "id": "task-001",
          "title": "Brand Identity Research",
          "agent": "brand-strategist",
          "priority": "high",
          "inputs": { "discovery_data": "phase-01-02-03-results" },
          "expected_output": "brand-guide.json",
          "steps": ["..."],
          "rules": ["..."],
          "acceptance_criteria": "..."
        }
      ]
    }
  ],
  "status_report_format": {
    "frequency": "per_task_completion",
    "format": "json",
    "fields": ["task_id", "status", "summary", "files_changed", "issues", "next_steps"]
  }
}
```

---

## Status Report Format (All agents MUST use)

```json
{
  "agent": "agent-name",
  "task_id": "task-XXX",
  "status": "completed | in_progress | blocked | failed",
  "summary": "What was done in 1-2 sentences",
  "files_changed": ["src/path/file.ts"],
  "files_created": ["src/path/new-file.ts"],
  "issues": ["Any problems encountered"],
  "dependencies_met": true,
  "next_steps": ["What should happen next"],
  "outputs": {
    "key": "value — structured data other agents can consume"
  }
}
```

---

## Shortcut Commands

| Command | Action |
|---------|--------|
| `varsayilan` / `default` | Use defaults for current phase |
| `atla` / `skip` | Skip current phase |
| `hepsini varsayilan` | Use defaults for ALL remaining phases |
| `geri` / `back` | Go back to previous phase |
| `matris` / `matrix` | Show current requirement matrix |
| `durum` / `status` | Show agent status dashboard |
| `baslat` / `start` | Skip remaining questions, start building |

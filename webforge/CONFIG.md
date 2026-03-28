# Configuration & Rules

## Language Rules

All agent `.md` files, task JSONs, and specs MUST be written in **English**.

| Content | Language | Reason |
|---------|----------|--------|
| Agent `.md` frontmatter (name, description) | English | Agent selection engine |
| Agent `.md` `<example>` blocks | English | Pattern matching accuracy |
| Agent `.md` body (instructions, rules) | English | Agent instruction processing |
| Task JSON fields | English | Cross-agent consistency |
| SendMessage content between agents | English | Agent-to-agent communication |
| `CLAUDE.md` project rules | Project language | Developer documentation |
| `AGENTS.md` team structure | Project language | Developer documentation |
| User-facing UI text in code | Project language | End-user experience |
| Discovery questions to user | User's language | Direct communication |
| Agent's final report to user | User's language | Direct communication |

**Rule of Thumb:**
- Talking TO Claude (agent files, task JSONs, prompts) → English
- Talking TO the user (UI, errors, reports, questions) → User's language

---

## Agent Tool Fundamentals

### Agent Types

| Type | Description | Tools |
|------|-------------|-------|
| `general-purpose` | Complex, multi-step research and tasks | All |
| `Explore` | Quick codebase exploration (quick/medium/very thorough) | Read-only |
| `Plan` | Architecture planning, strategy design | Read-only |
| Custom agents | Defined via `.claude/agents/*.md` | All |

### Parallel Execution (CRITICAL)

Launch independent tasks as **multiple Agent tool calls in a SINGLE message**.

```
// CORRECT — parallel:
Agent(subagent_type: "frontend-dev", name: "fe-task", prompt: "...")
Agent(subagent_type: "backend-dev", name: "be-task", prompt: "...")

// WRONG — sequential (unnecessarily slow):
Agent(frontend-dev) → wait → Agent(backend-dev)
```

### When Parallel:
- Frontend page + Backend API route (different files)
- Type definition + Test writing
- Multiple independent components

### When Sequential:
- Type definition → component that uses it
- DB schema → API route that uses it
- API route → frontend hook that calls it

---

## Tool Usage Hierarchy

**Dedicated tools ALWAYS take priority over Bash:**

| Operation | USE | DO NOT USE |
|-----------|-----|------------|
| Read file | `Read` | `cat`, `head`, `tail` |
| Edit file | `Edit` | `sed`, `awk` |
| Create file | `Write` | `echo >`, `cat <<EOF` |
| Search files | `Glob` | `find`, `ls` |
| Search content | `Grep` | `grep`, `rg` |
| Complex research | `Explore agent` | Multiple bash pipes |
| Shell operations | `Bash` | — |

---

## Permission Modes

| Mode | Behavior | Usage |
|------|----------|-------|
| `auto` | Default — normal operation | Most tasks |
| `acceptEdits` | User approval for each edit | Risky changes |
| `bypassPermissions` | No approval needed | Trusted, repetitive tasks |
| `plan` | Plan approval first | Large refactors |
| `dontAsk` | No questions asked | Automation |

---

## Git Safety

- **Create new commits**, DO NOT amend (unless user requests)
- **Stage specific files**: DO NOT use `git add -A` or `git add .`
- **Do not skip hooks**: DO NOT use `--no-verify`
- **If hook fails**: Fix issue, create NEW commit
- **Commit message**: HEREDOC format with Co-Authored-By

```bash
git commit -m "$(cat <<'EOF'
feat: add cookie consent system

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Communication Rules

- **Short and concise**: Lead with the answer/action
- **No emoji**: Unless user requests
- **Code references**: `file_path:line_number` format
- **Don't estimate time**: Focus on what, not how long
- **Don't summarize unnecessarily**: Diff is visible

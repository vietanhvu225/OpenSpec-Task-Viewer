---
name: openspec-roadmap-manager
description: Manages openspec/ROADMAP.md — the single source of truth for project progress. Use when creating, modifying, archiving changes, or when user asks about project status, progress, phases, or roadmap.
license: MIT
compatibility: Requires openspec CLI and openspec/ROADMAP.md file.
metadata:
  author: custom
  version: "2.0"
---

## Purpose

This skill manages `openspec/ROADMAP.md`, a custom file that tracks overall project progress across all OpenSpec changes. OpenSpec excels at managing individual changes but lacks a project-level progress view — ROADMAP.md fills that gap.

## When to Use

Automatically apply this skill when:
- A change is created (`/opsx:new`) → add entry as `📦 Backlog`
- A change starts implementation (`/opsx:apply`) → update to `🔄 In Progress`
- A change is archived (`/opsx:archive`) → move to Completed as `✅ Done YYYY-MM-DD HH:MM`
- User asks about project progress, status, or roadmap
- User mentions phases, milestones, or project overview

## 4-Status Artifact-Based System

Status is determined by **filesystem/artifact state**, not manual triggers:

| Status | Emoji | Artifact State | Detection Logic |
|---|---|---|---|
| Backlog | 📦 | `.openspec.yaml` only, or has `proposal.md` | No specs/design/tasks |
| Designing | 📝 | Has `specs/` or `design.md` or `tasks.md` | Has design artifacts, no `[x]` in tasks |
| In Progress | 🔄 | `tasks.md` has at least 1 `[x]` | Regex: `- \[x\]` found |
| Done | ✅ | Moved to `archive/` | In archive folder |

### Agile Mapping

| ROADMAP Status | Agile Equivalent |
|---|---|
| `📦 Backlog` | Product Backlog / Icebox |
| `📝 Designing` | Refinement / Ready for Dev |
| `🔄 In Progress` | In Progress (Sprint) |
| `✅ Done` | Done / Completed |

## ROADMAP.md Format

The file uses a structured markdown format with tables:

```markdown
# OpenSpec Change Roadmap

> Project-name — brief description

## ✅ Completed

| # | Change | Phase | Status |
|---|--------|-------|--------|
| 1 | `change-name` | Phase N | ✅ Done YYYY-MM-DD HH:MM |

## ✅ Phase N — <name> — COMPLETE

## 📋 Phase N — <name>

| # | Change | Scope | Status |
|---|--------|-------|--------|
| N | `change-name` | Description | 📦 Backlog |
```

> **IMPORTANT — Two table schemas**: The Completed table uses column `Phase` (short label like "Phase 5"). Active/planned phase tables use column `Scope` (description text). When archiving a change (moving from active → Completed), extract the phase label from the section header (e.g., `## 📋 Phase 5 — UI Overhaul v2` → `Phase 5`) — do NOT copy the Scope description into the Phase column.

### Table Columns

| Column | Description |
|--------|-------------|
| `#` | Global sequential number across ALL tables |
| `Change` | Change name in backticks (e.g., \`add-auth\`) |
| `Phase` | Phase label (in Completed table) |
| `Scope` | Brief description (in active/planned phase tables) |
| `Status` | One of: `📦 Backlog`, `📝 Designing`, `🔄 In Progress`, `✅ Done YYYY-MM-DD HH:MM` |

## Rules

1. **Always update ROADMAP.md** when change state transitions occur
2. **Never modify human-written content** — only update table rows and status values
3. **Preserve phase ordering** — completed phases stay in order, never reorder
4. **Use consistent emojis** — `📦` Backlog, `📝` Designing, `🔄` In Progress, `✅` Done
5. **Auto-increment `#`** — global numbering across all tables
6. **Phase headers**: Use `✅ Phase N — <name> — COMPLETE` for fully completed phases, `📋 Phase N — <name>` for active/planned
7. **If ROADMAP.md doesn't exist** — skip silently, don't create automatically unless user requests via `/opsx:roadmap init`
8. **Column mapping on archive** — Active table `Scope` column does NOT map to Completed table `Phase` column. Extract phase label from section header instead.
9. **Backlog items need no filesystem directory** — `📦 Backlog` entries may exist in ROADMAP before `/opsx:new` creates the change directory. This is normal.
10. **`📝 Designing` is auto-detected** — no guardrail needed. When `specs/`, `design.md`, or `tasks.md` appear, `/opsx:roadmap sync` will detect the transition from Backlog.

## Sync Logic

When verifying ROADMAP accuracy:
1. Run `openspec list --json` → active changes
2. Scan `openspec/changes/archive/` → archived changes (parse dates from folder names `YYYY-MM-DD-<name>`)
3. **Artifact-based detection** for each active change:
   - `tasks.md` has `[x]` → `🔄 In Progress`
   - Has `specs/` or `design.md` or `tasks.md` → `📝 Designing`
   - Has `proposal.md` or `.openspec.yaml` only → `📦 Backlog`
4. Read `.openspec.yaml` in each archived change for precise `created` and `archived` timestamps
5. Compare with ROADMAP entries
6. Report mismatches, don't auto-fix without user confirmation

## `.openspec.yaml` Timestamps

Each change has a `.openspec.yaml` metadata file:
```yaml
schema: spec-driven
created: "2026-02-17T08:30:00+07:00"    # Set by /opsx:new (ISO 8601)
archived: "2026-02-17T14:30:00+07:00"   # Set by /opsx:archive (ISO 8601)
```

- `created` — full timestamp when change was created (used for timeline start)
- `archived` — full timestamp when change was archived (used for timeline end + duration calculation)
- Folder name stays `YYYY-MM-DD-<name>` (date only) for readability
- Dashboard uses these timestamps for precise Gantt/timeline views

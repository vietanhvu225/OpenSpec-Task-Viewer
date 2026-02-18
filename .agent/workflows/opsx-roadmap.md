---
name: "OPSX: Roadmap"
description: View, sync, or manage the project roadmap (openspec/ROADMAP.md)
category: Workflow
tags: [workflow, roadmap, progress]
---

View or manage the project roadmap.

**Input**: `/opsx:roadmap [action]`
- No args or `show` → Display current roadmap status summary
- `sync` → Sync ROADMAP.md with actual filesystem state
- `init` → Create ROADMAP.md from scratch based on existing changes
- `add-phase <name>` → Add a new phase section

**Steps**

### Action: `show` (default)

1. **Read `openspec/ROADMAP.md`**

   If file doesn't exist, suggest running `/opsx:roadmap init`.

2. **Display summary**

   Parse the ROADMAP and show:
   - Project name (from first header or `openspec/config.yaml` context)
   - Phase overview: which phases complete, which active, which planned
   - Active changes with progress (cross-reference with `openspec list --json`)
   - Backlog / Designing / In Progress / Done counts
   - Latest archive date

   Format as a clear, scannable summary.

### Action: `sync`

1. **Read `openspec/ROADMAP.md`**

   Parse all tables to extract change entries and their statuses.

2. **Scan filesystem for actual state**

   ```bash
   openspec list --json
   ```
   Also scan `openspec/changes/archive/` for archived changes (folder names: `YYYY-MM-DD-<name>`).

   **Artifact-based status detection** for each active change in `openspec/changes/<name>/`:
   ```
   if tasks.md contains "- [x]"          → 🔄 In Progress
   elif has specs/ or design.md or tasks.md → 📝 Designing
   elif has proposal.md or .openspec.yaml   → 📦 Backlog
   ```
   For archived changes → `✅ Done`

   **Delta spec sync check (Gap prevention):**
   For each archived change, check if `openspec/changes/archive/YYYY-MM-DD-<name>/specs/` contains delta spec folders. If yes, check whether corresponding main specs exist at `openspec/specs/<capability>/spec.md`. Report any unsynced delta specs as warnings:
   ```
   ⚠ UNSYNCED SPECS:
   - `extension-core` has delta specs [extension-scaffold, openspec-data-layer, test-infrastructure] but openspec/specs/ is empty
   - Recommendation: These specs were archived without syncing. Consider running /opsx:sync retroactively or documenting this as known gap.
   ```

3. **Compare ROADMAP entries with filesystem**

   Detect mismatches:
   - **Missing from ROADMAP**: active or archived changes that exist on filesystem but aren't in ROADMAP
   - **Status mismatch**: ROADMAP says `📦 Backlog` but filesystem shows design artifacts (should be `📝 Designing`)
   - **Orphan entries**: ROADMAP lists a change that doesn't exist on filesystem — **BUT only flag as orphan if status is `🔄 In Progress` or `✅ Done`**. Items with status `📦 Backlog` are allowed to exist in ROADMAP without a filesystem directory (they represent future work not yet started with `/opsx:new`).
   - **Archive not reflected**: change is in `archive/` folder but ROADMAP still shows `🔄 In Progress`
   - **Unsynced delta specs**: archived changes with delta spec folders that have no corresponding main spec in `openspec/specs/`

4. **Show diff and ask for confirmation**

   Display proposed changes in a clear diff format:
   ```
   ## ROADMAP Sync Report

   ### Changes to apply:
   + ADD: `new-feature` → Phase 2 table (📦 Backlog) — found in active changes
   ~ UPDATE: `auth-fix` → 📦 Backlog → 📝 Designing — has specs/design artifacts
   ~ UPDATE: `old-feature` → 🔄 In Progress → ✅ Done 2026-02-18 14:30 — found in archive
   ⚠ ORPHAN: `deleted-change` — in ROADMAP but not on filesystem

   Apply these changes? (Yes / No / Select individually)
   ```

5. **Apply confirmed changes**

   Update `openspec/ROADMAP.md` with the confirmed changes. Preserve all human-written content (vision, phase descriptions).

### Action: `init`

1. **Check if ROADMAP.md already exists**

   If yes, warn and ask to confirm overwrite or suggest `sync` instead.

2. **Gather project data**

   - Read `openspec/config.yaml` for project context
   - Run `openspec list --json` for active changes
   - Scan `openspec/changes/archive/` for completed changes with dates
   - Detect status of each active change using **artifact-based detection**

3. **Generate ROADMAP.md**

   Use this template:

   ```markdown
   # OpenSpec Change Roadmap

   > <project-name> — <brief description from config.yaml context>

   ## ✅ Completed

   | # | Change | Phase | Status |
   |---|--------|-------|--------|
   | 1 | `<archived-change>` | Phase 1 | ✅ Done YYYY-MM-DD HH:MM |
   ...

   ## 📋 Phase N — <phase-name>

   | # | Change | Scope | Status |
   |---|--------|-------|--------|
   | N | `<active-change>` | <inferred scope> | 📦 Backlog / 📝 Designing / 🔄 In Progress |
   ...
   ```

   **Phase assignment**: Group changes logically. If unclear, put all active changes in one phase and ask user to organize.

4. **Show generated content and ask for review**

   Display the generated ROADMAP and ask user to confirm or edit before saving.

### Action: `add-phase <name>`

1. **Read existing ROADMAP.md**
2. **Append new phase section** after the last phase:
   ```markdown
   ## 📋 Phase N — <name>

   | # | Change | Scope | Status |
   |---|--------|-------|--------|
   ```
3. **Confirm** the addition.

**Output**

```
## Roadmap Status

**Project:** <project-name>
**Phases:** 3 complete · 1 active · 1 planned
**Progress:** 15/18 changes done (83%)

### Active Phase: Phase 5 — UI Overhaul v2
- 📦 `ui-overhaul-v2` — Backlog (has proposal only)

### Next Phase: Phase 6 — AI-native
- 📦 `ai-context-sync` — Backlog
- 📦 `smart-suggestions` — Backlog
```

**Guardrails**
- NEVER delete or rewrite human-written content (vision, phase descriptions, notes)
- Only modify table rows and status values during sync
- Always show diff before applying changes
- Preserve phase ordering — never reorder completed phases
- Use consistent status emojis: `📦` Backlog, `📝` Designing, `🔄` In Progress, `✅` Done
- Auto-increment `#` column across all tables (global numbering)
- If `ROADMAP.md` doesn't exist and action is not `init`, suggest `init` first

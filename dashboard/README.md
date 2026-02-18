# OpenSpec Dashboard

> Web dashboard for visualizing OpenSpec project progress — Kanban, Timeline, Analytics.

![Overview](https://img.shields.io/badge/status-MVP-blueviolet) ![Vite](https://img.shields.io/badge/vite-6.x-646CFF) ![Vanilla JS](https://img.shields.io/badge/vanilla-JS-F7DF1E)

## Quick Start

```bash
cd dashboard
npm install
npm run dev
# → http://localhost:5173/
```

## Current State (2026-02-19)

**MVP with mock data** — UI is functional, not yet connected to real OpenSpec filesystem.

### What's Working

| View | Status | Description |
|---|---|---|
| **Overview** | ✅ | Progress circle (83%), status distribution cards, active changes list, 6-phase grid |
| **Kanban** | ✅ | 4-column board (Backlog / Designing / In Progress / Done), compact done cards |
| **Timeline** | ✅ | Gantt chart grouped by phase, date-labeled, color-coded bars |
| **Detail Panel** | ✅ | Click any card → slide-in with lifecycle, metadata, task checklist |

### Mock Data

Models `antigravity-task-viewer` project: 18 changes across 6 phases (15 done, 3 backlog).

## Architecture

```
dashboard/
├── index.html              # SPA shell with nav + detail panel
├── styles.css              # Dark mode glassmorphism design system
├── app.js                  # Routing, navigation, animations
├── data/
│   └── mock.js             # Mock data (replace with real parser later)
├── components/
│   ├── overview.js         # Progress circle, status cards, phases
│   ├── kanban.js           # 4-column Kanban board
│   ├── timeline.js         # Gantt chart
│   └── detail.js           # Change detail slide-in panel
└── package.json            # Vite dev dependency
```

## 4-Status System

Dashboard uses the **artifact-based status detection** system:

| Status | Emoji | Detection |
|---|---|---|
| Backlog | 📦 | `.openspec.yaml` only or has `proposal.md` |
| Designing | 📝 | Has `specs/`, `design.md`, or `tasks.md` |
| In Progress | 🔄 | `tasks.md` has at least 1 `[x]` |
| Done | ✅ | Moved to `archive/` folder |

## TODO — Next Steps

### Phase 1: Real Data (replace mock)
- [ ] Filesystem parser: scan `openspec/` directory for changes + artifacts
- [ ] ROADMAP.md parser: extract phases, statuses, entries
- [ ] `.openspec.yaml` reader: timestamps (`created`, `archived`)
- [ ] `tasks.md` parser: extract checklist items and progress

### Phase 2: Server + Real-time
- [ ] Express server with REST API (`/api/overview`, `/api/changes`, etc.)
- [ ] SSE endpoint for real-time updates
- [ ] File watcher (chokidar) on `openspec/` directory
- [ ] `--workspace <path>` CLI argument

### Phase 3: CLI Entry Point
- [ ] `bin/cli.js` — parse args, start server, auto-open browser
- [ ] `npx openspec-dashboard` distribution
- [ ] `--host 0.0.0.0` for team sharing (LAN)
- [ ] Network URL display for PM/BA access

### Phase 4: Polish
- [ ] Mobile responsive fine-tuning
- [ ] Search and filter on Kanban
- [ ] Phase-scoped views
- [ ] Static HTML export for CI/CD reports

## Design Decisions

- **Vanilla JS** — no framework overhead, fast iteration
- **Dark mode** — dev-friendly, premium feel
- **Glassmorphism** — subtle `backdrop-filter: blur()` + transparent cards
- **Inter font** — clean typography via Google Fonts
- **SVG progress circle** — animated with `stroke-dashoffset`
- **Compact done cards** — 15 items in Done column without scroll fatigue

## Related

- Workflows: `.agent/workflows/opsx-roadmap.md` — ROADMAP sync with artifact-based detection
- Skill: `.agent/skills/openspec-roadmap-manager/SKILL.md` — v2.0 with 4-status system

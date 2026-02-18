// Mock data modeling antigravity-task-viewer project
// Will be replaced with real filesystem parser later

export const project = {
  name: 'AntiGravity Task Viewer',
  description: 'VS Code extension for OpenSpec workflow visualization',
  schema: 'spec-driven',
  lastUpdate: '2026-02-19T03:00:00+07:00'
};

export const phases = [
  { id: 1, name: 'Foundation (MVP Core)', status: 'complete', emoji: '✅' },
  { id: 2, name: 'Visualization (Kanban + Roadmap)', status: 'complete', emoji: '✅' },
  { id: 3, name: 'Intelligence (Power Features)', status: 'complete', emoji: '✅' },
  { id: 4, name: 'UI Enhancements', status: 'complete', emoji: '✅' },
  { id: 5, name: 'UI Overhaul v2', status: 'active', emoji: '📋' },
  { id: 6, name: 'AI-native', status: 'planned', emoji: '📋' }
];

export const changes = [
  // Phase 1 — Done
  {
    id: 1, name: 'extension-core', phase: 1,
    status: 'done', scope: 'Extension activation, command palette, configuration',
    created: '2026-02-15T08:00:00+07:00', archived: '2026-02-17T09:30:00+07:00',
    tasks: { done: 6, total: 6 },
    artifacts: { proposal: true, specs: true, design: true, tasks: true }
  },
  {
    id: 2, name: 'treeview-sidebar', phase: 1,
    status: 'done', scope: 'TreeView provider showing changes, phases, artifacts',
    created: '2026-02-15T10:00:00+07:00', archived: '2026-02-17T10:15:00+07:00',
    tasks: { done: 5, total: 5 },
    artifacts: { proposal: true, specs: true, design: true, tasks: true }
  },
  {
    id: 3, name: 'statusbar-widget', phase: 1,
    status: 'done', scope: 'Status bar showing active change and progress',
    created: '2026-02-15T11:00:00+07:00', archived: '2026-02-17T10:45:00+07:00',
    tasks: { done: 4, total: 4 },
    artifacts: { proposal: true, specs: true, design: true, tasks: true }
  },
  // Phase 2 — Done
  {
    id: 4, name: 'kanban-webview', phase: 2,
    status: 'done', scope: 'Kanban board webview with drag-and-drop cards',
    created: '2026-02-16T08:00:00+07:00', archived: '2026-02-17T11:30:00+07:00',
    tasks: { done: 8, total: 8 },
    artifacts: { proposal: true, specs: true, design: true, tasks: true }
  },
  {
    id: 5, name: 'roadmap-timeline', phase: 2,
    status: 'done', scope: 'Visual timeline of phases and milestones',
    created: '2026-02-16T09:30:00+07:00', archived: '2026-02-17T12:00:00+07:00',
    tasks: { done: 5, total: 5 },
    artifacts: { proposal: true, specs: true, design: true, tasks: true }
  },
  {
    id: 6, name: 'kanban-interactions', phase: 2,
    status: 'done', scope: 'Card click → detail panel, filters, search',
    created: '2026-02-16T10:30:00+07:00', archived: '2026-02-17T12:30:00+07:00',
    tasks: { done: 6, total: 6 },
    artifacts: { proposal: true, specs: true, design: true, tasks: true }
  },
  // Phase 3 — Done
  {
    id: 7, name: 'ui-polish', phase: 3,
    status: 'done', scope: 'Theme consistency, icon pack, microinteractions',
    created: '2026-02-16T14:00:00+07:00', archived: '2026-02-17T13:00:00+07:00',
    tasks: { done: 7, total: 7 },
    artifacts: { proposal: true, specs: true, design: true, tasks: true }
  },
  {
    id: 8, name: 'dependency-graph-view', phase: 3,
    status: 'done', scope: 'Interactive dependency graph between changes',
    created: '2026-02-16T15:00:00+07:00', archived: '2026-02-17T13:30:00+07:00',
    tasks: { done: 5, total: 5 },
    artifacts: { proposal: true, specs: true, design: true, tasks: true }
  },
  {
    id: 9, name: 'progress-analytics', phase: 3,
    status: 'done', scope: 'Velocity charts, burndown, completion predictions',
    created: '2026-02-16T16:00:00+07:00', archived: '2026-02-17T14:00:00+07:00',
    tasks: { done: 6, total: 6 },
    artifacts: { proposal: true, specs: true, design: true, tasks: true }
  },
  {
    id: 10, name: 'codelens-tasks', phase: 3,
    status: 'done', scope: 'CodeLens annotations on tasks.md for quick actions',
    created: '2026-02-16T17:00:00+07:00', archived: '2026-02-17T14:30:00+07:00',
    tasks: { done: 4, total: 4 },
    artifacts: { proposal: true, specs: true, design: true, tasks: true }
  },
  // Phase 4 — Done
  {
    id: 11, name: 'ui-enhancements', phase: 4,
    status: 'done', scope: 'Card redesign inspiration from claude-task-viewer',
    created: '2026-02-17T08:00:00+07:00', archived: '2026-02-17T15:00:00+07:00',
    tasks: { done: 5, total: 5 },
    artifacts: { proposal: true, specs: true, design: true, tasks: true }
  },
  {
    id: 12, name: 'search-and-shortcuts', phase: 4,
    status: 'done', scope: 'Global search, keyboard shortcuts, command palette',
    created: '2026-02-17T09:00:00+07:00', archived: '2026-02-17T15:30:00+07:00',
    tasks: { done: 6, total: 6 },
    artifacts: { proposal: true, specs: true, design: true, tasks: true }
  },
  {
    id: 13, name: 'gantt-timeline', phase: 4,
    status: 'done', scope: 'Gantt chart view with phase grouping',
    created: '2026-02-17T10:00:00+07:00', archived: '2026-02-17T16:00:00+07:00',
    tasks: { done: 5, total: 5 },
    artifacts: { proposal: true, specs: true, design: true, tasks: true }
  },
  {
    id: 14, name: 'notifications', phase: 4,
    status: 'done', scope: 'Desktop notifications for change events',
    created: '2026-02-17T11:00:00+07:00', archived: '2026-02-17T16:30:00+07:00',
    tasks: { done: 4, total: 4 },
    artifacts: { proposal: true, specs: true, design: true, tasks: true }
  },
  {
    id: 15, name: 'card-redesign', phase: 4,
    status: 'done', scope: 'Modern card UI with hover effects and animations',
    created: '2026-02-17T12:00:00+07:00', archived: '2026-02-17T17:00:00+07:00',
    tasks: { done: 5, total: 5 },
    artifacts: { proposal: true, specs: true, design: true, tasks: true }
  },
  // Phase 5 — Active
  {
    id: 16, name: 'ui-overhaul-v2', phase: 5,
    status: 'backlog', scope: 'Live activity feed, enhanced card design, desktop notifications, improved animations, header redesign',
    created: '2026-02-18T10:00:00+07:00', archived: null,
    tasks: { done: 0, total: 0 },
    artifacts: { proposal: true, specs: false, design: false, tasks: false }
  },
  // Phase 6 — Planned
  {
    id: 17, name: 'ai-context-sync', phase: 6,
    status: 'backlog', scope: 'Extension provides OpenSpec context to AI agent: active change, artifact state, next task',
    created: null, archived: null,
    tasks: { done: 0, total: 0 },
    artifacts: { proposal: false, specs: false, design: false, tasks: false }
  },
  {
    id: 18, name: 'smart-suggestions', phase: 6,
    status: 'backlog', scope: 'AI suggest next task, detect stalled changes, spec gap detection',
    created: null, archived: null,
    tasks: { done: 0, total: 0 },
    artifacts: { proposal: false, specs: false, design: false, tasks: false }
  }
];

// Sample tasks for detailed view
export const sampleTasks = {
  'extension-core': [
    { id: '1.1', text: 'Initialize VS Code extension scaffold', done: true },
    { id: '1.2', text: 'Configure extension activation events', done: true },
    { id: '1.3', text: 'Add command palette commands', done: true },
    { id: '1.4', text: 'Create extension settings schema', done: true },
    { id: '1.5', text: 'Implement OpenSpec CLI integration layer', done: true },
    { id: '1.6', text: 'Write unit tests for core module', done: true }
  ],
  'ui-overhaul-v2': [
    { id: '1.1', text: 'Design new activity feed component', done: false },
    { id: '1.2', text: 'Implement enhanced card layout', done: false },
    { id: '1.3', text: 'Add desktop notification system', done: false },
    { id: '2.1', text: 'Create smooth page transitions', done: false },
    { id: '2.2', text: 'Redesign header with search integration', done: false },
    { id: '2.3', text: 'Performance audit and optimization', done: false }
  ]
};

// Helper functions
export function getStatusEmoji(status) {
  const map = { backlog: '📦', designing: '📝', progress: '🔄', done: '✅' };
  return map[status] || '❓';
}

export function getStatusLabel(status) {
  const map = { backlog: 'Backlog', designing: 'Designing', progress: 'In Progress', done: 'Done' };
  return map[status] || status;
}

export function getStatusColor(status) {
  const map = {
    backlog: '#8b95a5',
    designing: '#a78bfa',
    progress: '#3b82f6',
    done: '#10b981'
  };
  return map[status] || '#666';
}

export function getPhaseById(id) {
  return phases.find(p => p.id === id);
}

export function getChangesByStatus(status) {
  return changes.filter(c => c.status === status);
}

export function getSummary() {
  const done = changes.filter(c => c.status === 'done').length;
  const backlog = changes.filter(c => c.status === 'backlog').length;
  const designing = changes.filter(c => c.status === 'designing').length;
  const progress = changes.filter(c => c.status === 'progress').length;
  return {
    total: changes.length,
    done, backlog, designing, progress,
    overallProgress: Math.round((done / changes.length) * 100),
    phasesComplete: phases.filter(p => p.status === 'complete').length,
    phasesTotal: phases.length
  };
}

import { changes, phases, getStatusEmoji, getStatusLabel, getStatusColor, getPhaseById } from '../data/mock.js';

export function renderKanban() {
    const columns = [
        { status: 'backlog', label: 'Backlog', emoji: '📦' },
        { status: 'designing', label: 'Designing', emoji: '📝' },
        { status: 'progress', label: 'In Progress', emoji: '🔄' },
        { status: 'done', label: 'Done', emoji: '✅' }
    ];

    return `
    <div class="kanban">
      <div class="kanban-header">
        <h1 class="kanban-title">Kanban Board</h1>
      </div>
      <div class="kanban-board">
        ${columns.map(col => renderColumn(col)).join('')}
      </div>
    </div>
  `;
}

function renderColumn(col) {
    const items = changes.filter(c => c.status === col.status);
    const color = getStatusColor(col.status);
    const isDone = col.status === 'done';

    return `
    <div class="kanban-column">
      <div class="kanban-column-header" style="border-top: 2px solid ${color}">
        <div class="kanban-column-title">
          <span>${col.emoji}</span>
          <span>${col.label}</span>
        </div>
        <span class="kanban-column-count">${items.length}</span>
      </div>
      <div class="kanban-column-body">
        ${items.map(item => isDone ? renderCompactCard(item) : renderCard(item)).join('')}
        ${items.length === 0 ? '<div style="padding: 2rem; text-align: center; color: var(--text-muted); font-size: var(--text-xs);">No changes</div>' : ''}
      </div>
    </div>
  `;
}

function renderCard(change) {
    const phase = getPhaseById(change.phase);
    const phaseColor = `var(--phase-${change.phase})`;
    const statusColor = getStatusColor(change.status);
    const progress = change.tasks.total > 0
        ? Math.round((change.tasks.done / change.tasks.total) * 100)
        : 0;

    return `
    <div class="kanban-card" data-change="${change.name}">
      <div class="kanban-card-name">${change.name}</div>
      <div class="kanban-card-scope">${change.scope}</div>
      <div class="kanban-card-footer">
        <span class="kanban-card-phase" style="background: ${phaseColor}22; color: ${phaseColor}">
          Phase ${phase.id}
        </span>
        ${change.tasks.total > 0 ? `
          <div>
            <div class="kanban-card-progress">${change.tasks.done}/${change.tasks.total} tasks</div>
            <div class="kanban-card-progress-bar">
              <div class="kanban-card-progress-fill" style="width: ${progress}%; background: ${statusColor}"></div>
            </div>
          </div>
        ` : `
          <div class="kanban-card-progress">No tasks yet</div>
        `}
      </div>
    </div>
  `;
}

function renderCompactCard(change) {
    return `
    <div class="kanban-card compact" data-change="${change.name}">
      <div class="kanban-card-name">${change.name}</div>
    </div>
  `;
}

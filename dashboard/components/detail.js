import { changes, phases, sampleTasks, getStatusEmoji, getStatusLabel, getStatusColor, getPhaseById } from '../data/mock.js';

export function renderDetail(changeName) {
    const change = changes.find(c => c.name === changeName);
    if (!change) return '<p>Change not found</p>';

    const phase = getPhaseById(change.phase);
    const statusColor = getStatusColor(change.status);
    const tasks = sampleTasks[changeName] || [];
    const tasksDone = tasks.filter(t => t.done).length;
    const progress = tasks.length > 0 ? Math.round((tasksDone / tasks.length) * 100) : 0;

    const artifacts = [
        { key: 'proposal', label: 'Proposal', icon: '📄' },
        { key: 'specs', label: 'Specs', icon: '📋' },
        { key: 'design', label: 'Design', icon: '🎨' },
        { key: 'tasks', label: 'Tasks', icon: '✅' }
    ];

    const formatDate = (iso) => {
        if (!iso) return '—';
        const d = new Date(iso);
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) +
            ' ' + d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    };

    const duration = () => {
        if (!change.created) return '—';
        const start = new Date(change.created);
        const end = change.archived ? new Date(change.archived) : new Date();
        const hours = Math.round((end - start) / (1000 * 60 * 60));
        if (hours < 24) return `${hours}h`;
        return `${Math.round(hours / 24)}d ${hours % 24}h`;
    };

    return `
    <!-- Status -->
    <div class="detail-section">
      <div class="detail-section-title">Status</div>
      <div class="status-badge" style="background: ${statusColor}22; color: ${statusColor}; font-size: var(--text-base);">
        ${getStatusEmoji(change.status)} ${getStatusLabel(change.status)}
      </div>
    </div>

    <!-- Meta -->
    <div class="detail-section">
      <div class="detail-section-title">Details</div>
      <div class="detail-meta">
        <div class="detail-meta-item">
          <div class="detail-meta-label">Phase</div>
          <div class="detail-meta-value" style="color: var(--phase-${change.phase})">
            Phase ${phase.id}: ${phase.name}
          </div>
        </div>
        <div class="detail-meta-item">
          <div class="detail-meta-label">Schema</div>
          <div class="detail-meta-value">spec-driven</div>
        </div>
        <div class="detail-meta-item">
          <div class="detail-meta-label">Created</div>
          <div class="detail-meta-value">${formatDate(change.created)}</div>
        </div>
        <div class="detail-meta-item">
          <div class="detail-meta-label">${change.archived ? 'Archived' : 'Duration'}</div>
          <div class="detail-meta-value">${change.archived ? formatDate(change.archived) : duration()}</div>
        </div>
      </div>
    </div>

    <!-- Scope -->
    <div class="detail-section">
      <div class="detail-section-title">Scope</div>
      <p style="font-size: var(--text-sm); color: var(--text-secondary); line-height: 1.6;">
        ${change.scope}
      </p>
    </div>

    <!-- Lifecycle -->
    <div class="detail-section">
      <div class="detail-section-title">Lifecycle</div>
      <div class="lifecycle">
        ${artifacts.map((a, i) => {
        const has = change.artifacts[a.key];
        const cls = has ? 'complete' : '';
        return `
            ${i > 0 ? '<span class="lifecycle-arrow">→</span>' : ''}
            <div class="lifecycle-step ${cls}">
              ${a.icon} ${a.label}
            </div>
          `;
    }).join('')}
      </div>
    </div>

    <!-- Tasks -->
    ${tasks.length > 0 ? `
      <div class="detail-section">
        <div class="detail-section-title">Tasks (${tasksDone}/${tasks.length})</div>
        ${tasks.length > 0 ? `
          <div class="progress-bar-container" style="margin-bottom: var(--space-4)">
            <div class="progress-bar" style="width: ${progress}%"></div>
          </div>
        ` : ''}
        <div class="task-list">
          ${tasks.map(task => `
            <div class="task-item ${task.done ? 'done' : ''}">
              <div class="task-checkbox ${task.done ? 'checked' : ''}">
                ${task.done ? '✓' : ''}
              </div>
              <span class="task-text">${task.id} ${task.text}</span>
            </div>
          `).join('')}
        </div>
      </div>
    ` : `
      <div class="detail-section">
        <div class="detail-section-title">Tasks</div>
        <p style="font-size: var(--text-sm); color: var(--text-muted);">No tasks defined yet</p>
      </div>
    `}
  `;
}

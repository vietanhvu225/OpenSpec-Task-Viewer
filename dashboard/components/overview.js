import { project, changes, phases, getSummary, getStatusEmoji, getStatusLabel, getStatusColor, getPhaseById, getChangesByStatus } from '../data/mock.js';

export function renderOverview(onCardClick) {
    const summary = getSummary();
    const circumference = 2 * Math.PI * 58;
    const offset = circumference - (summary.overallProgress / 100) * circumference;

    const activeChanges = changes.filter(c => c.status !== 'done');

    return `
    <div class="overview">
      <!-- Progress Hero -->
      <div class="progress-hero">
        <div class="progress-hero-inner">
          <div class="progress-circle">
            <svg viewBox="0 0 140 140">
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#6366f1" />
                  <stop offset="100%" stop-color="#10b981" />
                </linearGradient>
              </defs>
              <circle class="bg" cx="70" cy="70" r="58" />
              <circle class="fill" cx="70" cy="70" r="58"
                stroke-dasharray="${circumference}"
                stroke-dashoffset="${offset}" />
            </svg>
            <div class="progress-value">
              <span class="progress-pct">${summary.overallProgress}%</span>
              <span class="progress-label">Complete</span>
            </div>
          </div>

          <div class="progress-details">
            <div class="progress-stats">
              <div class="progress-stat">
                <span class="progress-stat-value">${summary.total}</span>
                <span class="progress-stat-label">Total Changes</span>
              </div>
              <div class="progress-stat">
                <span class="progress-stat-value">${summary.done}</span>
                <span class="progress-stat-label">Completed</span>
              </div>
              <div class="progress-stat">
                <span class="progress-stat-value">${summary.phasesComplete}/${summary.phasesTotal}</span>
                <span class="progress-stat-label">Phases Done</span>
              </div>
              <div class="progress-stat">
                <span class="progress-stat-value">${summary.total - summary.done}</span>
                <span class="progress-stat-label">Remaining</span>
              </div>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar" style="width: ${summary.overallProgress}%"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Status Cards -->
      <div class="status-cards">
        ${renderStatusCard('📦', summary.backlog, 'Backlog', 'backlog')}
        ${renderStatusCard('📝', summary.designing, 'Designing', 'designing')}
        ${renderStatusCard('🔄', summary.progress, 'In Progress', 'progress')}
        ${renderStatusCard('✅', summary.done, 'Done', 'done')}
      </div>

      <!-- Active Changes -->
      <div class="active-section">
        <div class="section-title">
          <span class="section-title-icon">🔥</span>
          Active Changes
        </div>
        <div class="active-list">
          ${activeChanges.map(change => renderActiveItem(change)).join('')}
        </div>
      </div>

      <!-- Phase Summary -->
      <div class="active-section">
        <div class="section-title">
          <span class="section-title-icon">🗺️</span>
          Phase Overview
        </div>
        <div class="phase-grid">
          ${phases.map(phase => renderPhaseCard(phase)).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderStatusCard(emoji, count, label, status) {
    const color = getStatusColor(status);
    return `
    <div class="status-card" data-status="${status}">
      <div class="status-card-header">
        <span class="status-card-icon">${emoji}</span>
        <span class="status-card-count" style="color: ${color}">${count}</span>
      </div>
      <div class="status-card-label">${label}</div>
      <div class="status-card-bar" style="background: ${color}"></div>
    </div>
  `;
}

function renderActiveItem(change) {
    const phase = getPhaseById(change.phase);
    return `
    <div class="active-item" data-change="${change.name}">
      <span class="active-item-status">${getStatusEmoji(change.status)}</span>
      <div class="active-item-info">
        <div class="active-item-name">${change.name}</div>
        <div class="active-item-scope">${change.scope}</div>
      </div>
      <span class="active-item-phase">Phase ${phase.id}</span>
    </div>
  `;
}

function renderPhaseCard(phase) {
    const phaseChanges = changes.filter(c => c.phase === phase.id);
    const done = phaseChanges.filter(c => c.status === 'done').length;
    const dotColor = phase.status === 'complete' ? 'var(--color-done)' :
        phase.status === 'active' ? 'var(--color-progress)' : 'var(--color-backlog)';
    const phaseColor = `var(--phase-${phase.id})`;

    return `
    <div class="phase-card">
      <div class="phase-card-header">
        <span class="phase-status-dot" style="background: ${dotColor}"></span>
        <span class="phase-num" style="color: ${phaseColor}">Phase ${phase.id}</span>
      </div>
      <div class="phase-name">${phase.name}</div>
      <div class="phase-changes">${done}/${phaseChanges.length} changes done</div>
    </div>
  `;
}

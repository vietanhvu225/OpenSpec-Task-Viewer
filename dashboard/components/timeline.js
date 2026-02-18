import { changes, phases, getPhaseById } from '../data/mock.js';

export function renderTimeline() {
    // Get all changes with timestamps, sorted by created date
    const timedChanges = changes
        .filter(c => c.created)
        .sort((a, b) => new Date(a.created) - new Date(b.created));

    // Calculate time range
    const allDates = timedChanges.flatMap(c => [
        c.created ? new Date(c.created) : null,
        c.archived ? new Date(c.archived) : null
    ]).filter(Boolean);

    const minDate = new Date(Math.min(...allDates));
    const maxDate = new Date(Math.max(...allDates));
    // Add padding
    maxDate.setHours(maxDate.getHours() + 6);
    minDate.setHours(minDate.getHours() - 3);

    const totalMs = maxDate - minDate;

    // Generate date labels
    const dateLabels = generateDateLabels(minDate, maxDate);

    // Group by phase
    const phaseGroups = [];
    const usedPhases = [...new Set(timedChanges.map(c => c.phase))].sort();

    for (const phaseId of usedPhases) {
        const phase = getPhaseById(phaseId);
        const phaseChanges = timedChanges.filter(c => c.phase === phaseId);
        phaseGroups.push({ phase, changes: phaseChanges });
    }

    const phaseColors = {
        1: 'var(--phase-1)',
        2: 'var(--phase-2)',
        3: 'var(--phase-3)',
        4: 'var(--phase-4)',
        5: 'var(--phase-5)',
        6: 'var(--phase-6)'
    };

    return `
    <div class="timeline-view">
      <div class="timeline-header">
        <h1 class="timeline-title">Timeline</h1>
      </div>

      <div class="timeline-container">
        <div class="timeline-legend">
          ${usedPhases.map(id => {
        const phase = getPhaseById(id);
        return `
              <div class="timeline-legend-item">
                <div class="timeline-legend-color" style="background: ${phaseColors[id]}"></div>
                <span>Phase ${id}: ${phase.name}</span>
              </div>
            `;
    }).join('')}
        </div>

        <div class="timeline-chart">
          <!-- Date headers -->
          <div class="timeline-header-row">
            ${dateLabels.map(label => `
              <div class="timeline-date-label">${label}</div>
            `).join('')}
          </div>

          <!-- Bars grouped by phase -->
          ${phaseGroups.map(group => `
            <div class="timeline-phase-divider">
              Phase ${group.phase.id} — ${group.phase.name}
            </div>
            ${group.changes.map(change => {
        const startDate = new Date(change.created);
        const endDate = change.archived ? new Date(change.archived) : new Date();
        const left = ((startDate - minDate) / totalMs) * 100;
        const width = Math.max(((endDate - startDate) / totalMs) * 100, 2);
        const color = phaseColors[change.phase];
        const isDone = change.status === 'done';

        return `
                <div class="timeline-row">
                  <div class="timeline-row-label">${change.name}</div>
                  <div class="timeline-row-bar-container">
                    <div class="timeline-bar" data-change="${change.name}"
                      style="left: ${left}%; width: ${width}%; background: ${color};
                             ${!isDone ? `background: repeating-linear-gradient(90deg, ${color}, ${color} 8px, transparent 8px, transparent 12px); border: 1px solid ${color};` : ''}">
                      ${isDone ? '✓' : ''}
                    </div>
                  </div>
                </div>
              `;
    }).join('')}
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function generateDateLabels(minDate, maxDate) {
    const labels = [];
    const totalHours = (maxDate - minDate) / (1000 * 60 * 60);

    if (totalHours <= 48) {
        // Show every 6 hours
        const d = new Date(minDate);
        d.setHours(Math.floor(d.getHours() / 6) * 6, 0, 0, 0);
        while (d <= maxDate) {
            labels.push(formatDateShort(d));
            d.setHours(d.getHours() + 6);
        }
    } else if (totalHours <= 168) {
        // Show daily
        const d = new Date(minDate);
        d.setHours(0, 0, 0, 0);
        while (d <= maxDate) {
            labels.push(formatDateShort(d));
            d.setDate(d.getDate() + 1);
        }
    } else {
        // Show every 2 days
        const d = new Date(minDate);
        d.setHours(0, 0, 0, 0);
        while (d <= maxDate) {
            labels.push(formatDateShort(d));
            d.setDate(d.getDate() + 2);
        }
    }
    return labels;
}

function formatDateShort(date) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const hours = date.getHours();
    if (hours === 0) {
        return `${months[date.getMonth()]} ${date.getDate()}`;
    }
    return `${date.getDate()} ${String(hours).padStart(2, '0')}:00`;
}

import { project } from './data/mock.js';
import { renderOverview } from './components/overview.js';
import { renderKanban } from './components/kanban.js';
import { renderTimeline } from './components/timeline.js';
import { renderDetail } from './components/detail.js';

// ── State ──
let currentView = 'overview';

// ── DOM refs ──
const viewContainer = document.getElementById('viewContainer');
const projectName = document.getElementById('projectName');
const lastUpdate = document.getElementById('lastUpdate');
const detailPanel = document.getElementById('detailPanel');
const detailOverlay = document.getElementById('detailOverlay');
const detailTitle = document.getElementById('detailTitle');
const detailContent = document.getElementById('detailContent');
const detailClose = document.getElementById('detailClose');

// ── Init ──
function init() {
    projectName.textContent = project.name;
    updateLastUpdate();
    renderView(currentView);
    setupNavigation();
    setupDetailPanel();
}

// ── Navigation ──
function setupNavigation() {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.dataset.view;
            if (view === currentView) return;

            document.querySelector('.nav-btn.active').classList.remove('active');
            btn.classList.add('active');
            currentView = view;
            renderView(view);
        });
    });
}

// ── Views ──
function renderView(view) {
    switch (view) {
        case 'overview':
            viewContainer.innerHTML = renderOverview();
            break;
        case 'kanban':
            viewContainer.innerHTML = renderKanban();
            break;
        case 'timeline':
            viewContainer.innerHTML = renderTimeline();
            break;
    }

    // Bind card clicks
    viewContainer.querySelectorAll('[data-change]').forEach(el => {
        el.addEventListener('click', () => openDetail(el.dataset.change));
    });

    // Animate progress bars
    requestAnimationFrame(() => {
        viewContainer.querySelectorAll('.progress-bar, .kanban-card-progress-fill').forEach(bar => {
            bar.style.transition = 'none';
            const targetWidth = bar.style.width;
            bar.style.width = '0%';
            requestAnimationFrame(() => {
                bar.style.transition = '';
                bar.style.width = targetWidth;
            });
        });

        // Animate progress circle
        const circle = viewContainer.querySelector('.progress-circle .fill');
        if (circle) {
            const targetOffset = circle.getAttribute('stroke-dashoffset');
            const dasharray = circle.getAttribute('stroke-dasharray');
            circle.style.transition = 'none';
            circle.setAttribute('stroke-dashoffset', dasharray);
            requestAnimationFrame(() => {
                circle.style.transition = '';
                circle.setAttribute('stroke-dashoffset', targetOffset);
            });
        }
    });
}

// ── Detail Panel ──
function setupDetailPanel() {
    detailClose.addEventListener('click', closeDetail);
    detailOverlay.addEventListener('click', closeDetail);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeDetail();
    });
}

function openDetail(changeName) {
    detailTitle.textContent = changeName;
    detailContent.innerHTML = renderDetail(changeName);
    detailPanel.classList.add('open');
    detailOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeDetail() {
    detailPanel.classList.remove('open');
    detailOverlay.classList.remove('open');
    document.body.style.overflow = '';
}

// ── Helpers ──
function updateLastUpdate() {
    const d = new Date(project.lastUpdate);
    const now = new Date();
    const diffMin = Math.round((now - d) / (1000 * 60));
    lastUpdate.textContent = diffMin < 1 ? 'Just now' :
        diffMin < 60 ? `${diffMin}m ago` :
            `${Math.round(diffMin / 60)}h ago`;
}

// ── Start ──
init();

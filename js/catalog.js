// ============================================================
// catalog.js – Course Catalog Logic
// ============================================================

let activeFilters = {};
let currentQuery = '';
let sortBy = 'relevant';

document.addEventListener('DOMContentLoaded', () => {
    renderCatalogGrid(COURSES);
    setupFilterListeners();
    setupSearch();
    setupSort();
    checkURLParams();
});

// ── URL Params (from domain links) ───────────────────────────
function checkURLParams() {
    const params = new URLSearchParams(window.location.search);
    const domain = params.get('domain');
    if (domain) {
        const cb = document.querySelector(`input[value="${domain}"]`);
        if (cb) {
            cb.checked = true;
            addFilter('domain', domain);
            applyFilters();
        }
    }
}

// ── Render ────────────────────────────────────────────────────
function renderCatalogGrid(courses) {
    const grid = document.getElementById('catalogGrid');
    if (!grid) return;
    grid.innerHTML = courses.length
        ? courses.map(renderCatalogCard).join('')
        : `<div style="grid-column:1/-1;text-align:center;padding:60px 0;color:var(--text-secondary)">
        <div style="font-size:3rem;margin-bottom:16px">🔍</div>
        <div style="font-size:1.125rem;font-weight:600">No courses match your filters</div>
        <div style="margin-top:8px">Try adjusting or clearing your filters</div>
       </div>`;

    document.getElementById('resultsCount').textContent = `Showing ${courses.length} of 10,000+ courses`;

    // Stagger animation
    grid.querySelectorAll('.course-card').forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(16px)';
        requestAnimationFrame(() => {
            setTimeout(() => {
                card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                card.style.opacity = '1';
                card.style.transform = '';
            }, i * 40);
        });
    });
}

function renderCatalogCard(course) {
    const provider = PROVIDERS[course.provider];
    const priceClass = course.price === 'Free' || course.price === 'Free Audit' ? 'free' : '';
    const tagsHTML = course.tags.slice(0, 3).map((t, i) => `<span class="tag ${course.tagType[i] || ''}">${t}</span>`).join('');
    const projectBadge = course.projects ? `<span class="tag tag-green">Projects</span>` : '';
    const levelColor = { beginner: 'tag-green', intermediate: 'tag-yellow', advanced: 'tag-red' }[course.level] || '';

    return `
    <div class="course-card" onclick="window.location.href='tutorial.html'">
      <div class="course-card-thumb">
        <div class="course-card-thumb-inner" style="background:${course.bg}">
          <span>${course.emoji}</span>
        </div>
      </div>
      <div class="course-card-body">
        <div class="course-card-provider">
          <span>${provider.emoji}</span>
          <span>${provider.name}</span>
        </div>
        <div class="course-card-title">${course.title}</div>
        <div class="course-card-tags">
          <span class="tag ${levelColor}">${capitalize(course.level)}</span>
          ${tagsHTML}
          ${projectBadge}
        </div>
        <div class="course-card-rating">
          <span class="stars" style="color:var(--accent-yellow)">★★★★★</span>
          <span class="rating-num">${course.rating}</span>
          <span class="rating-count">(${course.ratingCount})</span>
        </div>
      </div>
      <div class="course-card-footer">
        <span class="price-tag ${priceClass}">${course.price}</span>
        <span class="duration-tag">⏱ ${course.duration}</span>
      </div>
    </div>
  `;
}

// ── Filter Sidebar ────────────────────────────────────────────
function setupFilterListeners() {
    // Checkboxes
    document.querySelectorAll('.filter-cb').forEach(cb => {
        cb.addEventListener('change', () => {
            const group = cb.dataset.group;
            const value = cb.value;
            if (cb.checked) {
                if (!activeFilters[group]) activeFilters[group] = [];
                activeFilters[group].push(value);
                addFilterPill(group, value, cb.closest('label').querySelector('span:first-of-type').textContent);
            } else {
                activeFilters[group] = activeFilters[group]?.filter(v => v !== value);
                if (!activeFilters[group]?.length) delete activeFilters[group];
                removeFilterPill(value);
            }
            applyFilters();
        });
    });

    // Radio buttons
    document.querySelectorAll('.filter-rb').forEach(rb => {
        rb.addEventListener('change', () => {
            if (rb.value !== 'all') {
                activeFilters['instructor'] = [rb.value];
            } else {
                delete activeFilters['instructor'];
            }
            applyFilters();
        });
    });

    // Clear all
    document.getElementById('clearFilters')?.addEventListener('click', () => {
        activeFilters = {};
        document.querySelectorAll('.filter-cb, .filter-rb').forEach(el => { el.checked = false; });
        document.querySelector('input[name="instructor"][value="all"]').checked = true;
        document.getElementById('activeFilters').innerHTML = '';
        applyFilters();
    });
}

function toggleGroup(header) {
    const body = header.nextElementSibling;
    header.classList.toggle('closed');
    body.classList.toggle('collapsed');
}

// ── Filter Pills ──────────────────────────────────────────────
function addFilter(group, value) {
    if (!activeFilters[group]) activeFilters[group] = [];
    if (!activeFilters[group].includes(value)) activeFilters[group].push(value);
}

function addFilterPill(group, value, label) {
    const container = document.getElementById('activeFilters');
    if (container.querySelector(`[data-filter="${value}"]`)) return;
    const pill = document.createElement('div');
    pill.className = 'active-filter-pill';
    pill.dataset.filter = value;
    pill.innerHTML = `${label} <button onclick="removeFilter('${group}','${value}',this)">×</button>`;
    container.appendChild(pill);
}

function removeFilterPill(value) {
    const pill = document.querySelector(`[data-filter="${value}"]`);
    pill?.remove();
}

function removeFilter(group, value, btn) {
    btn.closest('.active-filter-pill').remove();
    const cb = document.querySelector(`input[value="${value}"]`);
    if (cb) cb.checked = false;
    activeFilters[group] = activeFilters[group]?.filter(v => v !== value);
    if (!activeFilters[group]?.length) delete activeFilters[group];
    applyFilters();
}

// ── Search ────────────────────────────────────────────────────
function setupSearch() {
    const input = document.getElementById('catalogSearch');
    if (!input) return;
    let timer;
    input.addEventListener('input', () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            currentQuery = input.value.toLowerCase().trim();
            applyFilters();
        }, 250);
    });
}

// ── Sort ──────────────────────────────────────────────────────
function setupSort() {
    const select = document.getElementById('sortSelect');
    if (!select) return;
    select.addEventListener('change', () => {
        sortBy = select.value;
        applyFilters();
    });
}

// ── Apply All Filters ─────────────────────────────────────────
function applyFilters() {
    let filtered = [...COURSES];

    // Text search
    if (currentQuery) {
        filtered = filtered.filter(c =>
            c.title.toLowerCase().includes(currentQuery) ||
            PROVIDERS[c.provider].name.toLowerCase().includes(currentQuery) ||
            c.tags.some(t => t.toLowerCase().includes(currentQuery))
        );
    }

    // Checkbox filters
    if (activeFilters.domain?.length) {
        filtered = filtered.filter(c => activeFilters.domain.some(d => c.domains.includes(d)));
    }
    if (activeFilters.level?.length) {
        filtered = filtered.filter(c => activeFilters.level.includes(c.level));
    }
    if (activeFilters.coding?.length) {
        filtered = filtered.filter(c => activeFilters.coding.includes(c.coding));
    }
    if (activeFilters.instructor?.length) {
        filtered = filtered.filter(c => activeFilters.instructor.includes(c.instructor));
    }
    if (activeFilters.projects?.includes('projects')) {
        filtered = filtered.filter(c => c.projects);
    }
    if (activeFilters.cert?.length) {
        filtered = filtered.filter(c => activeFilters.cert.some(cert => c.cert.includes(cert)));
    }
    if (activeFilters.provider?.length) {
        filtered = filtered.filter(c => activeFilters.provider.includes(c.provider));
    }
    if (activeFilters.price?.length) {
        filtered = filtered.filter(c => {
            if (activeFilters.price.includes('free') && (c.price === 'Free' || c.price === 'Free Audit')) return true;
            if (activeFilters.price.includes('paid') && c.price === 'Paid') return true;
            return false;
        });
    }

    // Sort
    if (sortBy === 'rating') filtered.sort((a, b) => b.rating - a.rating);
    else if (sortBy === 'popular') filtered.sort((a, b) => {
        const numA = parseFloat(a.ratingCount.replace(/[KMB]/g, m => ({ K: 1e3, M: 1e6, B: 1e9 }[m])));
        const numB = parseFloat(b.ratingCount.replace(/[KMB]/g, m => ({ K: 1e3, M: 1e6, B: 1e9 }[m])));
        return numB - numA;
    });

    renderCatalogGrid(filtered);
}

// ── SmartMatch Modal ──────────────────────────────────────────
let quizAnswers = {};

document.getElementById('smartMatchBtn')?.addEventListener('click', () => {
    document.getElementById('smartMatchModal').style.display = 'flex';
});

function closeSmartMatch() {
    document.getElementById('smartMatchModal').style.display = 'none';
    quizAnswers = {};
    // Reset quiz
    document.querySelectorAll('.quiz-step').forEach(s => s.classList.remove('active'));
    document.querySelector('.quiz-step[data-step="1"]')?.classList.add('active');
    document.querySelectorAll('.quiz-opt').forEach(o => o.classList.remove('selected'));
    document.getElementById('quizSteps').style.display = '';
    document.getElementById('quizResult').style.display = 'none';
}

function selectQuizOpt(btn, step) {
    // Mark selected
    btn.closest('.quiz-options').querySelectorAll('.quiz-opt').forEach(o => o.classList.remove('selected'));
    btn.classList.add('selected');
    quizAnswers[step] = btn.textContent;

    setTimeout(() => {
        if (step < 3) {
            document.querySelector(`.quiz-step[data-step="${step}"]`)?.classList.remove('active');
            document.querySelector(`.quiz-step[data-step="${step + 1}"]`)?.classList.add('active');
        } else {
            // Show result
            document.getElementById('quizSteps').style.display = 'none';
            document.getElementById('quizResult').style.display = 'block';
            const texts = {
                '🌱 Complete Beginner': 'AI for Everyone pathway — no coding required, perfect for your level.',
                '📊 I know basic ML': 'Machine Learning Specialization — structured progression from fundamentals to advanced.',
                '🧠 I build AI models': 'Deep Learning Specialization + MLOps for production-ready skills.',
                '🚀 Advanced Researcher': 'Cutting-edge courses in RL, NLP Transformers, and research-track content.',
            };
            const level = quizAnswers[1];
            document.getElementById('resultText').innerHTML =
                `Based on your answers, we recommend starting with the <strong>${texts[level] || 'Machine Learning Specialization'}</strong>`;
        }
    }, 400);
}

// ── Overlay click to close ────────────────────────────────────
document.getElementById('smartMatchModal')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) closeSmartMatch();
});

// ── Helpers ───────────────────────────────────────────────────
function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

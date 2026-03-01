// ============================================================
// tutorial.js – Tutorial Hub Logic
// ============================================================

let selectedFormat = 'explain';
let currentQuery = null;

document.addEventListener('DOMContentLoaded', () => {
    setupFormatTabs();
    setupKeyboardShortcut();
});

// ── Format Tabs ───────────────────────────────────────────────
function setupFormatTabs() {
    document.querySelectorAll('.format-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.format-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            selectedFormat = tab.dataset.format;
        });
    });
}

// ── Keyboard shortcut: Ctrl/Cmd+Enter ─────────────────────────
function setupKeyboardShortcut() {
    document.getElementById('solverQuery')?.addEventListener('keydown', e => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            generateTutorial();
        }
    });
}

// ── Set Query from Examples ───────────────────────────────────
function setQuery(btn, key) {
    const textarea = document.getElementById('solverQuery');
    if (!textarea) return;

    const questions = {
        backprop: 'How do I implement backpropagation from scratch in Python?',
        attention: 'Explain attention mechanisms in Transformers like I\'m five.',
        overfit: 'My PyTorch model is overfitting quickly, how can I implement effective regularization?',
        chatbot: 'How do I build a chatbot with Python and LangChain?',
        transformer: 'How do Transformers work, step by step?',
        rag: 'What is RAG (Retrieval-Augmented Generation) and how do I implement it?',
    };

    textarea.value = questions[key] || btn.querySelector('span:last-child').textContent;
    textarea.focus();
    currentQuery = key;

    // Auto-run immediately
    setTimeout(() => generateTutorial(), 300);
}

// ── Main Generation ───────────────────────────────────────────
function generateTutorial() {
    const textarea = document.getElementById('solverQuery');
    if (!textarea) return;

    const query = textarea.value.trim();
    if (!query) {
        textarea.style.borderColor = 'var(--accent-red)';
        setTimeout(() => { textarea.style.borderColor = ''; }, 1200);
        return;
    }

    // Save to recent
    addToRecent(query);

    // Detect which preset key to use
    let key = currentQuery;
    if (!key) {
        const q = query.toLowerCase();
        if (q.includes('backprop')) key = 'backprop';
        else if (q.includes('attention') || q.includes('transformer')) key = 'transformer';
        else if (q.includes('overfit') || q.includes('regulariz')) key = 'overfit';
        else if (q.includes('chatbot') || q.includes('langchain')) key = 'chatbot';
        else if (q.includes('rag') || q.includes('retrieval')) key = 'rag';
        else key = 'backprop'; // default fallback
    }

    showLoading();

    // Simulate async LLM call
    setTimeout(() => {
        const answer = TUTORIAL_ANSWERS[key] || TUTORIAL_ANSWERS['backprop'];
        showAnswer(answer, query);
        currentQuery = null;
    }, 1800);
}

// ── Loading ───────────────────────────────────────────────────
function showLoading() {
    document.getElementById('outputEmpty').style.display = 'none';
    document.getElementById('outputLoading').style.display = 'flex';
    document.getElementById('outputAnswer').style.display = 'none';
}

// ── Show Answer ───────────────────────────────────────────────
function showAnswer(answer, query) {
    document.getElementById('outputLoading').style.display = 'none';
    const answerDiv = document.getElementById('outputAnswer');
    answerDiv.style.display = 'block';

    // Title
    document.getElementById('answerTitle').textContent = answer.title;

    // Explanation
    const explanation = document.getElementById('answerExplanation');
    explanation.innerHTML = answer.explanation;

    // Code
    const codeDiv = document.getElementById('answerCode');
    if (answer.code) {
        codeDiv.innerHTML = `
      <div class="code-block">
        <div class="code-header">
          <span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span>
          <span class="code-lang">python</span>
          <button onclick="copyCode(this)" style="margin-left:auto;font-size:0.7rem;color:var(--text-muted);background:none;border:none;cursor:pointer;padding:2px 6px;border-radius:4px;transition:color 0.2s">Copy</button>
        </div>
        <pre><code>${answer.code}</code></pre>
      </div>`;
    } else {
        codeDiv.innerHTML = '';
    }

    // Course recommendations
    if (answer.courses?.length) {
        const recSection = document.getElementById('courseRecSection');
        const recCourses = document.getElementById('recCourses');
        recCourses.innerHTML = answer.courses.map(c => `
      <a class="rec-course-card" href="catalog.html">
        <div class="rec-course-icon" style="background:${c.bg}">${c.icon}</div>
        <div class="rec-course-info">
          <div class="rec-course-provider">${c.provider}</div>
          <div class="rec-course-title">${c.title}</div>
          <div class="rec-course-meta">${c.meta}</div>
        </div>
        <span class="rec-arrow">→</span>
      </a>
    `).join('');
        recSection.style.display = 'block';

        // Show human verified after delay
        setTimeout(() => {
            document.getElementById('hvSection').style.display = 'block';
            document.getElementById('answerFeedback').style.display = 'flex';
        }, 600);
    }

    // Reset to AI tab
    switchTab(document.querySelector('.answer-tab'), 'ai');

    // Scroll output into view
    answerDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ── Tabs ──────────────────────────────────────────────────────
function switchTab(btn, tab) {
    document.querySelectorAll('.answer-tab').forEach(t => t.classList.remove('active'));
    btn?.classList.add('active');

    if (tab === 'ai') {
        document.getElementById('aiContent').style.display = 'block';
        document.getElementById('communityContent').style.display = 'none';
    } else {
        document.getElementById('aiContent').style.display = 'none';
        document.getElementById('communityContent').style.display = 'block';
    }
}

// ── Recent Queries ────────────────────────────────────────────
function addToRecent(query) {
    const container = document.getElementById('recentList');
    if (!container) return;
    const short = query.length > 50 ? query.slice(0, 50) + '…' : query;

    // Don't duplicate
    if (Array.from(container.querySelectorAll('.recent-item')).some(el => el.textContent.includes(short.slice(0, 20)))) return;

    const item = document.createElement('div');
    item.className = 'recent-item';
    item.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><polyline points="12 6 12 12 16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>${short}`;
    item.onclick = () => {
        document.getElementById('solverQuery').value = query;
        generateTutorial();
    };
    container.insertBefore(item, container.firstChild);

    // Keep max 5
    while (container.children.length > 5) container.removeChild(container.lastChild);
}

// ── Actions ───────────────────────────────────────────────────
function copyAnswer() {
    const text = document.getElementById('answerExplanation').textContent + '\n\n' +
        (document.getElementById('answerCode').textContent || '');
    navigator.clipboard.writeText(text).then(() => {
        const btn = event.target.closest('.action-btn');
        if (btn) {
            const orig = btn.innerHTML;
            btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><polyline points="20 6 9 17 4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> Copied!`;
            setTimeout(() => { btn.innerHTML = orig; }, 1500);
        }
    });
}

function copyCode(btn) {
    const pre = btn.closest('.code-block').querySelector('pre');
    navigator.clipboard.writeText(pre.textContent).then(() => {
        btn.textContent = 'Copied!';
        setTimeout(() => { btn.textContent = 'Copy'; }, 1500);
    });
}

function saveTutorial() {
    const btn = event.target.closest('.action-btn');
    if (btn) {
        const orig = btn.innerHTML;
        btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><polyline points="20 6 9 17 4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> Saved!`;
        setTimeout(() => { btn.innerHTML = orig; }, 1500);
    }
}

function giveFeedback(type, btn) {
    btn.style.background = type === 'up'
        ? 'rgba(52,211,153,0.15)'
        : 'rgba(248,113,113,0.15)';
    btn.style.borderColor = type === 'up' ? 'var(--accent-green)' : 'var(--accent-red)';
}

function reportAnswer() {
    alert('Thank you for your report. Our team will review this answer.');
}

// ── Contribute Modal ──────────────────────────────────────────
function openContribute() {
    document.getElementById('contributeModal').style.display = 'flex';
}

function closeContribute() {
    document.getElementById('contributeModal').style.display = 'none';
}

document.getElementById('contributeModal')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) closeContribute();
});

// ============================================================
// nav.js – Shared Navbar Behaviour + Auth Session
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    const navActions = document.querySelector('.nav-actions');

    // 1. Scroll glass effect
    const handleScroll = () => {
        navbar?.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // 2. Mobile menu toggle
    navToggle?.addEventListener('click', () => {
        const isOpen = navLinks?.classList.toggle('open');
        navActions?.classList.toggle('open', isOpen);
        const spans = navToggle.querySelectorAll('span');
        if (isOpen) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
        }
    });

    // Close mobile menu on nav link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks?.classList.remove('open');
            navActions?.classList.remove('open');
        });
    });

    // 3. Auth session — update navbar
    injectAuthNav();
});

// ── Auth Nav Injection ─────────────────────────────────────────
function injectAuthNav() {
    const session = getAuthSession();
    const navActions = document.querySelector('.nav-actions');
    if (!navActions) return;

    if (session && session.user) {
        const user = session.user;
        navActions.innerHTML = `
      <div class="user-menu-wrap">
        <button class="user-menu-btn" id="userMenuBtn" onclick="toggleUserMenu()">
          <div class="user-avatar-nav">${user.avatar || getInitials(user.firstName || 'U', user.lastName || '')}</div>
          <span class="user-name-nav">${user.firstName || 'User'}</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" class="user-chevron"><polyline points="6 9 12 15 18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <div class="user-dropdown" id="userDropdown">
          <div class="dd-header">
            <div class="dd-avatar">${user.avatar || getInitials(user.firstName || 'U', user.lastName || '')}</div>
            <div>
              <div class="dd-name">${user.firstName} ${user.lastName || ''}</div>
              <div class="dd-email">${user.email || ''}</div>
              <div class="dd-plan plan-${user.plan || 'free'}">${(user.plan || 'Free').charAt(0).toUpperCase() + (user.plan || 'free').slice(1)} Plan</div>
            </div>
          </div>
          <div class="dd-divider"></div>
          <a href="catalog.html" class="dd-item">📚 My Courses</a>
          <a href="tutorial.html" class="dd-item">⚡ Tutorial Hub</a>
          <a href="pro.html" class="dd-item">⭐ Upgrade to Pro</a>
          <div class="dd-divider"></div>
          <button class="dd-item dd-signout" onclick="signOut()">🚪 Sign Out</button>
        </div>
      </div>
    `;

        // Inject dropdown CSS once
        injectDropdownStyles();

        // Close on outside click
        document.addEventListener('click', e => {
            const wrap = document.getElementById('userMenuBtn')?.closest('.user-menu-wrap');
            if (wrap && !wrap.contains(e.target)) closeUserMenu();
        });
    } else {
        // Not logged in — wire up Sign In + Get Pro buttons
        const buttons = navActions.querySelectorAll('button, a');
        buttons.forEach(btn => {
            const text = btn.textContent.trim();
            if (text === 'Sign In') {
                btn.onclick = () => { window.location.href = 'auth.html'; };
            }
            if (text === 'Get Pro') {
                btn.onclick = () => { window.location.href = 'auth.html?mode=signup&next=pro.html'; };
            }
        });
    }
}

// ── Dropdown ──────────────────────────────────────────────────
function toggleUserMenu() {
    const dd = document.getElementById('userDropdown');
    dd?.classList.toggle('open');
}

function closeUserMenu() {
    document.getElementById('userDropdown')?.classList.remove('open');
}

function signOut() {
    localStorage.removeItem('learnai_session');
    window.location.reload();
}

// ── Session Reader ────────────────────────────────────────────
function getAuthSession() {
    try {
        const s = JSON.parse(localStorage.getItem('learnai_session') || 'null');
        if (!s) return null;
        if (s.expires && Date.now() > s.expires) {
            localStorage.removeItem('learnai_session');
            return null;
        }
        return s;
    } catch { return null; }
}

function getInitials(first, last) {
    return ((first[0] || '') + (last[0] || '')).toUpperCase();
}

// ── Inject Dropdown CSS ───────────────────────────────────────
function injectDropdownStyles() {
    if (document.getElementById('__authNavStyles')) return;
    const style = document.createElement('style');
    style.id = '__authNavStyles';
    style.textContent = `
    .user-menu-wrap { position: relative; }

    .user-menu-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(129,140,248,.08);
      border: 1px solid rgba(129,140,248,.2);
      border-radius: 999px;
      padding: 5px 12px 5px 6px;
      cursor: pointer;
      color: var(--text-primary);
      font-size: .875rem;
      font-weight: 500;
      transition: all .2s;
    }
    .user-menu-btn:hover { background: rgba(129,140,248,.14); border-color: rgba(129,140,248,.35); }

    .user-avatar-nav {
      width: 30px; height: 30px;
      border-radius: 50%;
      background: linear-gradient(135deg,#818cf8,#8b5cf6);
      display: flex; align-items: center; justify-content: center;
      font-size: .75rem; font-weight: 800; color: #fff;
      flex-shrink: 0;
    }

    .user-name-nav { max-width: 100px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .user-chevron  { color: var(--text-muted); flex-shrink: 0; }

    .user-dropdown {
      position: absolute;
      top: calc(100% + 8px);
      right: 0;
      width: 240px;
      background: var(--bg-card);
      border: 1px solid var(--border-hover);
      border-radius: 16px;
      padding: 8px;
      box-shadow: 0 20px 60px rgba(0,0,0,.5);
      z-index: 2000;
      display: none;
      animation: fadeUp .2s ease both;
    }
    .user-dropdown.open { display: block; }

    .dd-header {
      display: flex; align-items: center; gap: 12px;
      padding: 12px; border-radius: 10px;
      background: rgba(255,255,255,.03);
      margin-bottom: 4px;
    }

    .dd-avatar {
      width: 40px; height: 40px; border-radius: 50%;
      background: linear-gradient(135deg,#818cf8,#8b5cf6);
      display: flex; align-items: center; justify-content: center;
      font-size: .875rem; font-weight: 800; color: #fff;
      flex-shrink: 0;
    }

    .dd-name  { font-size: .875rem; font-weight: 700; color: var(--text-primary); }
    .dd-email { font-size: .75rem; color: var(--text-muted); margin-top: 1px; word-break: break-all; }

    .dd-plan {
      display: inline-block;
      font-size: .625rem; font-weight: 700;
      text-transform: uppercase; letter-spacing: .05em;
      padding: 2px 7px; border-radius: 999px;
      margin-top: 4px;
    }
    .plan-free { background: rgba(148,163,184,.1); color: var(--text-muted); }
    .plan-pro  { background: rgba(129,140,248,.15); color: var(--accent-indigo); }
    .plan-enterprise { background: rgba(52,211,153,.12); color: var(--accent-green); }

    .dd-divider { height: 1px; background: var(--border); margin: 6px 0; }

    .dd-item {
      display: flex; align-items: center; gap: 10px;
      padding: 10px 12px; border-radius: 10px;
      font-size: .875rem; color: var(--text-secondary);
      text-decoration: none; width: 100%; text-align: left;
      background: none; border: none; cursor: pointer;
      transition: background .15s, color .15s;
      font-family: var(--font-sans);
    }
    .dd-item:hover { background: rgba(255,255,255,.05); color: var(--text-primary); }
    .dd-signout { color: var(--accent-red) !important; }
    .dd-signout:hover { background: rgba(248,113,113,.08) !important; }
  `;
    document.head.appendChild(style);
}

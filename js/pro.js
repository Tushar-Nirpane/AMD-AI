// ============================================================
// pro.js – Pro & Enterprise Page Logic
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    animateDashbars();
    highlightPlanFromURL();
});

// ── Animate Chart Bars ─────────────────────────────────────────
function animateDashbars() {
    const bars = document.querySelectorAll('.chart-bar');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const target = bar.style.height;
                bar.style.height = '0%';
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        bar.style.transition = 'height 0.8s cubic-bezier(0.2,0,0,1)';
                        bar.style.height = target;
                    }, 100);
                });
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.3 });

    bars.forEach(bar => observer.observe(bar));
}

// ── Highlight Plan from URL ────────────────────────────────────
function highlightPlanFromURL() {
    const params = new URLSearchParams(window.location.search);
    const plan = params.get('plan');
    if (plan) {
        const card = document.getElementById(`plan${plan.charAt(0).toUpperCase() + plan.slice(1)}`);
        if (card) {
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            card.style.boxShadow = '0 0 0 2px var(--accent-indigo), var(--shadow-glow)';
        }
    }
}

// ── Checkout Modal ────────────────────────────────────────────
function openCheckout(plan) {
    document.getElementById('checkoutModal').style.display = 'flex';
}

function closeCheckout() {
    document.getElementById('checkoutModal').style.display = 'none';
}

function submitCheckout(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    btn.textContent = 'Processing…';
    btn.disabled = true;
    setTimeout(() => {
        closeCheckout();
        showSuccessToast('Welcome to LearnAI Pro! 🎉');
        btn.textContent = 'Start Free Trial';
        btn.disabled = false;
    }, 1800);
}

// ── Demo Modal ────────────────────────────────────────────────
function openDemo() {
    document.getElementById('demoModal').style.display = 'flex';
}

function closeDemo() {
    document.getElementById('demoModal').style.display = 'none';
}

function submitDemo(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    btn.textContent = 'Scheduling…';
    btn.disabled = true;
    setTimeout(() => {
        closeDemo();
        showSuccessToast('Demo booked! Check your email for confirmation 📧');
        btn.textContent = 'Book Demo';
        btn.disabled = false;
    }, 1500);
}

// ── Close modals on overlay click ─────────────────────────────
document.getElementById('checkoutModal')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) closeCheckout();
});
document.getElementById('demoModal')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) closeDemo();
});

// ── Success Toast ─────────────────────────────────────────────
function showSuccessToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
    position: fixed;
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%) translateY(20px);
    background: linear-gradient(135deg, #818cf8, #8b5cf6);
    color: #fff;
    font-size: 0.9375rem;
    font-weight: 600;
    padding: 14px 24px;
    border-radius: 999px;
    box-shadow: 0 8px 32px rgba(129,140,248,0.4);
    z-index: 9999;
    opacity: 0;
    transition: all 0.3s ease;
    white-space: nowrap;
  `;
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(10px)';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

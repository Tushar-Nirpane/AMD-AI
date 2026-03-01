// ============================================================
// auth.js – Full Authentication Flow (sign‑in / sign‑up / OTP verify)
// Uses localStorage to persist session across pages
// ============================================================

// ── Constants ─────────────────────────────────────────────────
const AUTH_KEY = 'learnai_user';
const SESSION_KEY = 'learnai_session';

// Pending signup data while waiting for OTP
let _pendingUser = null;
let _otpCode = null;
let _countdownTimer = null;

// ── Boot ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    // If already logged in, redirect away from auth page
    if (getSession()) {
        const dest = getRedirectDest();
        window.location.href = dest;
        return;
    }

    // Check URL param: ?mode=signup
    const params = new URLSearchParams(window.location.search);
    if (params.get('mode') === 'signup') goToSignup();

    setupOTPInputs();
});

// ── Session Helpers ───────────────────────────────────────────
function getSession() {
    try {
        const s = localStorage.getItem(SESSION_KEY);
        return s ? JSON.parse(s) : null;
    } catch { return null; }
}

function setSession(user, remember = true) {
    const session = {
        user,
        expires: remember
            ? Date.now() + 30 * 24 * 60 * 60 * 1000   // 30 days
            : Date.now() + 2 * 60 * 60 * 1000           // 2 hours (tab session)
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function clearSession() {
    localStorage.removeItem(SESSION_KEY);
}

function getRedirectDest() {
    const params = new URLSearchParams(window.location.search);
    return params.get('next') || 'index.html';
}

// ── Step Navigation ───────────────────────────────────────────
function showStep(id) {
    document.querySelectorAll('.auth-step').forEach(s => s.classList.remove('active'));
    const el = document.getElementById(id);
    if (el) {
        el.classList.add('active');
        // Reset animation
        el.style.animation = 'none';
        requestAnimationFrame(() => { el.style.animation = ''; });
    }
}

function goToSignin() { clearErrors(); showStep('stepSignin'); }
function goToSignup() { clearErrors(); showStep('stepSignup'); }
function goToForgot() { clearErrors(); showStep('stepForgot'); }

// ── Sign In ───────────────────────────────────────────────────
async function submitSignin(e) {
    e.preventDefault();
    clearErrors();

    const email = document.getElementById('signinEmail').value.trim();
    const password = document.getElementById('signinPassword').value;
    const remember = document.getElementById('rememberMe').checked;

    let valid = true;

    if (!isValidEmail(email)) {
        showError('signinEmailErr', 'Please enter a valid email address.');
        highlightField('signinEmail', 'error');
        valid = false;
    }

    if (password.length < 6) {
        showError('signinPwErr', 'Password must be at least 6 characters.');
        highlightField('signinPassword', 'error');
        valid = false;
    }

    if (!valid) return;

    // Check against stored accounts
    const accounts = getAccounts();
    const match = accounts.find(a => a.email.toLowerCase() === email.toLowerCase());

    if (!match) {
        setLoading('signinBtn', true);
        await delay(900);
        setLoading('signinBtn', false);
        showError('signinEmailErr', 'No account found with this email. Create one?');
        highlightField('signinEmail', 'error');
        return;
    }

    if (match.password !== hashSimple(password)) {
        setLoading('signinBtn', true);
        await delay(800);
        setLoading('signinBtn', false);
        showError('signinPwErr', 'Incorrect password. Please try again.');
        highlightField('signinPassword', 'error');
        return;
    }

    setLoading('signinBtn', true);
    await delay(1000);

    setSession(match, remember);
    showSuccessStep(`Welcome back, ${match.firstName}! 👋`, 'Sign in successful. Redirecting…');
}

// ── Sign Up ───────────────────────────────────────────────────
async function submitSignup(e) {
    e.preventDefault();
    clearErrors();

    const firstName = document.getElementById('signupFirst').value.trim();
    const lastName = document.getElementById('signupLast').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const confirm = document.getElementById('signupConfirm').value;
    const agreed = document.getElementById('agreeTerms').checked;

    let valid = true;

    if (firstName.length < 2) {
        showError('firstErr', 'Please enter your first name.');
        highlightField('signupFirst', 'error');
        valid = false;
    }

    if (!isValidEmail(email)) {
        showError('signupEmailErr', 'Please enter a valid email address.');
        highlightField('signupEmail', 'error');
        valid = false;
    } else {
        // Check if email already registered
        const accounts = getAccounts();
        if (accounts.find(a => a.email.toLowerCase() === email.toLowerCase())) {
            showError('signupEmailErr', 'An account with this email already exists.');
            highlightField('signupEmail', 'error');
            valid = false;
        }
    }

    if (password.length < 8) {
        showError('signupPwErr', 'Password must be at least 8 characters.');
        highlightField('signupPassword', 'error');
        valid = false;
    }

    if (password !== confirm) {
        showError('confirmErr', 'Passwords do not match.');
        highlightField('signupConfirm', 'error');
        valid = false;
    }

    if (!valid) return;

    setLoading('signupBtn', true);
    await delay(1000);
    setLoading('signupBtn', false);

    // Store pending user
    _pendingUser = {
        id: generateId(),
        firstName,
        lastName,
        email,
        password: hashSimple(password),
        avatar: getInitials(firstName, lastName),
        plan: 'free',
        createdAt: new Date().toISOString(),
        verified: false,
    };

    // Generate 6-digit OTP (123456 in demo for visibility)
    _otpCode = generateOTP();

    // Show the OTP hint
    document.getElementById('verifyEmailDisplay').textContent = email;
    document.getElementById('demoCode').textContent = _otpCode;

    // Clear OTP inputs
    document.querySelectorAll('.otp-input').forEach(i => {
        i.value = '';
        i.classList.remove('filled', 'error', 'success');
    });

    startCountdown();
    showStep('stepVerify');
    setTimeout(() => document.querySelector('.otp-input').focus(), 200);
}

// ── OTP Verify ────────────────────────────────────────────────
async function submitVerify(e) {
    e.preventDefault();
    clearErrors();

    const entered = Array.from(document.querySelectorAll('.otp-input'))
        .map(i => i.value).join('');

    if (entered.length < 6) {
        showError('otpErr', 'Please enter the full 6-digit code.');
        document.querySelectorAll('.otp-input').forEach(i => i.classList.add('error'));
        return;
    }

    setLoading('verifyBtn', true);
    await delay(1000);

    if (entered !== _otpCode) {
        setLoading('verifyBtn', false);
        showError('otpErr', 'Incorrect code. Please try again.');
        document.querySelectorAll('.otp-input').forEach(i => {
            i.classList.add('error');
            i.classList.remove('success', 'filled');
        });
        return;
    }

    // Mark verified & save account
    _pendingUser.verified = true;
    saveAccount(_pendingUser);
    setSession(_pendingUser, true);

    // Animate OTP inputs green
    document.querySelectorAll('.otp-input').forEach(i => {
        i.classList.remove('error', 'filled');
        i.classList.add('success');
    });

    await delay(400);
    showSuccessStep(`Account created! Welcome, ${_pendingUser.firstName} 🎉`, 'Your email is verified. Setting up your profile…');
}

// ── Forgot Password ───────────────────────────────────────────
async function submitForgot(e) {
    e.preventDefault();
    clearErrors();

    const email = document.getElementById('forgotEmail').value.trim();

    if (!isValidEmail(email)) {
        showError('forgotErr', 'Please enter a valid email address.');
        highlightField('forgotEmail', 'error');
        return;
    }

    setLoading('forgotBtn', true);
    await delay(1200);
    setLoading('forgotBtn', false);

    // Always show success (don't reveal if email exists)
    showSuccessStep('Reset link sent! 📧', `If an account exists for ${email}, you'll receive a password reset link shortly.`);
}

// ── Social Login (simulated) ──────────────────────────────────
async function socialLogin(provider) {
    showToast(`Connecting to ${provider}…`, 'info');
    await delay(1500);

    // Create a demo social user
    const socialUser = {
        id: generateId(),
        firstName: provider === 'Google' ? 'Google' : 'GitHub',
        lastName: 'User',
        email: `user@${provider.toLowerCase()}.com`,
        avatar: provider === 'Google' ? 'GU' : 'GH',
        plan: 'free',
        provider,
        createdAt: new Date().toISOString(),
        verified: true,
    };

    saveAccount(socialUser);
    setSession(socialUser, true);
    showSuccessStep(`Signed in with ${provider}! 🎉`, 'Welcome to LearnAI. Redirecting…');
}

// ── Success Step ──────────────────────────────────────────────
function showSuccessStep(title, msg) {
    document.getElementById('successTitle').textContent = title;
    document.getElementById('successMsg').textContent = msg;

    const dest = getRedirectDest();
    const destName = dest === 'index.html' ? 'Home' : dest.replace('.html', '');
    document.getElementById('redirectDest').textContent = destName.charAt(0).toUpperCase() + destName.slice(1);

    showStep('stepSuccess');

    // Animate progress bar
    requestAnimationFrame(() => {
        setTimeout(() => {
            document.getElementById('redirectFill').style.width = '100%';
        }, 100);
    });

    // Redirect after 2.8s
    setTimeout(() => {
        window.location.href = dest;
    }, 2800);
}

// ── OTP Input Behaviour ───────────────────────────────────────
function setupOTPInputs() {
    const inputs = document.querySelectorAll('.otp-input');

    inputs.forEach((input, index) => {
        input.addEventListener('input', e => {
            const val = e.target.value.replace(/\D/g, '').slice(-1);
            input.value = val;
            if (val) {
                input.classList.add('filled');
                if (index < inputs.length - 1) inputs[index + 1].focus();
            } else {
                input.classList.remove('filled');
            }
            clearOTPError();
        });

        input.addEventListener('keydown', e => {
            if (e.key === 'Backspace' && !input.value && index > 0) {
                inputs[index - 1].focus();
                inputs[index - 1].value = '';
                inputs[index - 1].classList.remove('filled');
            }
            if (e.key === 'ArrowLeft' && index > 0) inputs[index - 1].focus();
            if (e.key === 'ArrowRight' && index < inputs.length - 1) inputs[index + 1].focus();
        });

        // Paste handler
        input.addEventListener('paste', e => {
            e.preventDefault();
            const pasted = (e.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '').slice(0, 6);
            pasted.split('').forEach((ch, i) => {
                if (inputs[i]) {
                    inputs[i].value = ch;
                    inputs[i].classList.add('filled');
                }
            });
            if (pasted.length > 0) inputs[Math.min(pasted.length, inputs.length - 1)].focus();
        });
    });
}

function clearOTPError() {
    document.querySelectorAll('.otp-input').forEach(i => i.classList.remove('error'));
    document.getElementById('otpErr').textContent = '';
}

// ── Countdown Timer ───────────────────────────────────────────
function startCountdown(seconds = 60) {
    clearInterval(_countdownTimer);
    let remaining = seconds;
    document.getElementById('countdown').textContent = remaining;
    document.getElementById('resendTimer').style.display = '';
    document.getElementById('resendBtn').style.display = 'none';

    _countdownTimer = setInterval(() => {
        remaining--;
        document.getElementById('countdown').textContent = remaining;
        if (remaining <= 0) {
            clearInterval(_countdownTimer);
            document.getElementById('resendTimer').style.display = 'none';
            document.getElementById('resendBtn').style.display = 'inline';
        }
    }, 1000);
}

function resendCode() {
    _otpCode = generateOTP();
    document.getElementById('demoCode').textContent = _otpCode;
    document.querySelectorAll('.otp-input').forEach(i => { i.value = ''; i.classList.remove('filled', 'error', 'success'); });
    document.querySelector('.otp-input').focus();
    clearOTPError();
    startCountdown();
    showToast('New code sent!', 'success');
}

// ── Password Strength ─────────────────────────────────────────
function checkPasswordStrength(pw) {
    const bars = [1, 2, 3, 4].map(i => document.getElementById('pwBar' + i));
    const label = document.getElementById('pwLabel');
    let score = 0;

    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;

    const levels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
    const colors = { 1: 'weak', 2: 'medium', 3: 'medium', 4: 'strong' };

    bars.forEach((b, i) => {
        b.className = 'pw-bar' + (i < score ? ' ' + colors[score] : '');
    });
    label.textContent = pw.length === 0 ? 'Enter password' : (levels[score] || 'Strong');
    label.style.color = score === 4 ? 'var(--accent-green)'
        : score >= 2 ? 'var(--accent-yellow)'
            : score === 1 ? 'var(--accent-red)'
                : 'var(--text-muted)';
}

// ── Toggle Password Visibility ────────────────────────────────
function togglePw(id, btn) {
    const input = document.getElementById(id);
    const show = input.type === 'password';
    input.type = show ? 'text' : 'password';
    btn.style.color = show ? 'var(--accent-indigo)' : 'var(--text-muted)';
}

// ── Accounts Storage ──────────────────────────────────────────
function getAccounts() {
    try {
        return JSON.parse(localStorage.getItem('learnai_accounts') || '[]');
    } catch { return []; }
}

function saveAccount(user) {
    const accounts = getAccounts();
    const idx = accounts.findIndex(a => a.email.toLowerCase() === user.email.toLowerCase());
    if (idx >= 0) accounts[idx] = user;
    else accounts.push(user);
    localStorage.setItem('learnai_accounts', JSON.stringify(accounts));
}

// ── UI Helpers ────────────────────────────────────────────────
function showError(id, msg) {
    const el = document.getElementById(id);
    if (el) el.textContent = msg;
}

function highlightField(id, type) {
    const input = document.getElementById(id);
    if (!input) return;
    input.classList.remove('error', 'success');
    input.classList.add(type);
    if (type === 'error') {
        input.addEventListener('input', () => {
            input.classList.remove('error');
        }, { once: true });
    }
}

function clearErrors() {
    document.querySelectorAll('.field-error').forEach(el => { el.textContent = ''; });
    document.querySelectorAll('.auth-input').forEach(el => el.classList.remove('error', 'success'));
}

function setLoading(btnId, loading) {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    btn.disabled = loading;
    btn.querySelector('.btn-text').style.display = loading ? 'none' : '';
    btn.querySelector('.btn-spinner').style.display = loading ? 'block' : 'none';
}

function showToast(message, type = 'info') {
    const colors = {
        info: 'linear-gradient(135deg,#818cf8,#8b5cf6)',
        success: 'linear-gradient(135deg,var(--accent-green),var(--accent-cyan))',
        error: 'linear-gradient(135deg,var(--accent-red),#f43f5e)',
    };
    const toast = document.createElement('div');
    toast.style.cssText = `
    position:fixed; bottom:28px; left:50%;
    transform:translateX(-50%) translateY(20px);
    background:${colors[type] || colors.info};
    color:#fff; font-size:.9rem; font-weight:600;
    padding:12px 22px; border-radius:999px;
    box-shadow:0 8px 28px rgba(0,0,0,.4);
    z-index:9999; opacity:0;
    transition:all .3s ease; white-space:nowrap;
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
    }, 3000);
}

// ── Utils ─────────────────────────────────────────────────────
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function generateOTP() {
    return String(Math.floor(100000 + Math.random() * 900000));
}

function generateId() {
    return 'u_' + Math.random().toString(36).slice(2, 11);
}

function getInitials(first, last) {
    return ((first[0] || '') + (last[0] || '')).toUpperCase();
}

function hashSimple(str) {
    // Simple deterministic hash (not cryptographically secure — demo only)
    let h = 0;
    for (let i = 0; i < str.length; i++) {
        h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
    }
    return 'h' + Math.abs(h).toString(36);
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

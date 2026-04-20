/**
 * ═══════════════════════════════════════════════
 * auth.js — Registration, Login, Logout
 * ═══════════════════════════════════════════════
 */

const Auth = (() => {

  // ── Switch between Login / Register tabs ──
  function switchTab(tab) {
    document.getElementById('form-login').style.display    = tab === 'login'    ? 'block' : 'none';
    document.getElementById('form-register').style.display = tab === 'register' ? 'block' : 'none';
    document.getElementById('tab-login').className    = 'auth-tab' + (tab === 'login'    ? ' active' : '');
    document.getElementById('tab-register').className = 'auth-tab' + (tab === 'register' ? ' active' : '');
  }

  // ── Register new user ──
  async function register() {
    const name  = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const age   = document.getElementById('reg-age').value;
    const goal  = document.getElementById('reg-goal').value;
    const pass  = document.getElementById('reg-pass').value;
    const err   = document.getElementById('reg-err');

    err.textContent = '';

    // Validation
    if (!name)              { err.textContent = 'Please enter your name.'; return; }
    if (!email || !email.includes('@')) { err.textContent = 'Enter a valid email.'; return; }
    if (!age || age < 10)   { err.textContent = 'Please enter a valid age.'; return; }
    if (!pass || pass.length < 6) { err.textContent = 'Password must be at least 6 characters.'; return; }

    const ok = await DB.createUser({ name, email, age, goal, pass });
    if (!ok) {
      err.textContent = 'Email already registered. Please login.';
      return;
    }

    showToast('Account created! Please sign in.');
    // Pre-fill login email
    document.getElementById('login-email').value = email;
    // Clear register form
    ['reg-name', 'reg-email', 'reg-age', 'reg-pass'].forEach(id => {
      document.getElementById(id).value = '';
    });
    switchTab('login');
  }

  // ── Login existing user ──
  async function login() {
    const email = document.getElementById('login-email').value.trim().toLowerCase();
    const pass  = document.getElementById('login-pass').value;
    const err   = document.getElementById('login-err');

    err.textContent = '';

    if (!email || !pass) {
      err.textContent = 'Please fill in all fields.';
      return;
    }

    const user = await DB.login(email, pass);
    if (!user) {
      err.textContent = 'Incorrect email or password.';
      return;
    }

    Session.set(email);
    // getUser will now fetch fresh and cache
    const freshUser = await Session.getUser(true);
    enterApp(freshUser);
  }

  // ── Logout ──
  function logout() {
    Session.clear();
    // Destroy any charts
    if (window._charts) {
      Object.values(window._charts).forEach(c => { try { c.destroy(); } catch (e) {} });
      window._charts = {};
    }
    // Hide navbar
    document.getElementById('navbar').style.display = 'none';
    // Reset auth form
    document.getElementById('login-email').value = '';
    document.getElementById('login-pass').value  = '';
    document.getElementById('login-err').textContent = '';
    // Show auth page
    App.showPage('auth');
  }

  return { switchTab, register, login, logout };
})();

// ── Enter app after successful login ──
function enterApp(user) {
  console.log('Auth: Entering app for user', user.email);
  // Update navbar
  document.getElementById('nav-avatar').textContent   = getInitials(user.name);
  document.getElementById('nav-username').textContent = user.name;
  document.getElementById('navbar').style.display      = 'flex';

  App.showPage('dashboard');
}

// ── Bind navigation and logout ──
document.addEventListener('DOMContentLoaded', async () => {
  const logoutBtn = document.getElementById('btn-logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', Auth.logout);
  } else {
    console.error('Auth: btn-logout not found');
  }

  // ── Nav link routing ──
  document.querySelectorAll('.nav-link').forEach(btn => {
    btn.addEventListener('click', () => {
      const page = btn.dataset.page;
      if (page) {
        App.showPage(page);
      }
    });
  });

  // ── Auto-login if session exists ──
  console.log('Auth: Checking for existing session');
  const user = await Session.getUser();
  if (user) {
    console.log('Auth: Auto-login session found');
    enterApp(user);
  } else {
    console.log('Auth: No session found, showing auth page');
    App.showPage('auth');
  }
});

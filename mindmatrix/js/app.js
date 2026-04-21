/**
 * ═══════════════════════════════════════════════
 * app.js — Core router & Global state
 * ═══════════════════════════════════════════════
 */

const App = (() => {
  const PAGES = ['auth', 'dashboard', 'timeline', 'quiz', 'progress', 'all-logs', 'profile', 'pillar-detail'];

  async function showPage(name) {
    console.log('App: Navigating to', name);
    
    PAGES.forEach(p => {
      const el = document.getElementById('page-' + p);
      if (el) {
        if (p === name) {
          el.classList.add('active');
          el.style.display = ''; // Let CSS handle display for active page
        } else {
          el.classList.remove('active');
          el.style.display = 'none';
        }
      }
    });

    // Nav Highlighting
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.dataset.page === name);
    });

    // Page-specific Renderers
    try {
      if (name === 'dashboard') await Dashboard.render();
      if (name === 'quiz') await Quiz.showIntro();
      if (name === 'progress') await Progress.render();
      if (name === 'all-logs') await Progress.renderLogs();
      if (name === 'profile') await Profile.render();
      
      // Update global nav elements (avatar/name)
      await updateGlobalNav();
    } catch (e) {
      console.error('App: Page Render Error', e);
    }
  }

  async function updateGlobalNav() {
    const user = await Session.getUser();
    if (!user) return;

    // Update Avatar
    const navAvatar = document.querySelector('.nav-avatar');
    if (navAvatar) {
      const initials = (user.name || 'U').split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase();
      navAvatar.innerHTML = user.avatar 
        ? `<img src="${user.avatar}" style="width:100%; height:100%; object-fit:cover; border-radius:50%" />` 
        : initials;
    }

    // Update Name
    const navName = document.querySelector('.nav-username');
    if (navName) navName.textContent = user.name;
  }

  return { showPage, updateGlobalNav };
})();

// ── Language Toggle Logic ──
const Lang = (() => {
  let current = localStorage.getItem('mm_lang') || 'en';

  function init() {
    updateUI();
  }

  function get() { return current; }

  function toggle() {
    current = (current === 'en' ? 'bn' : 'en');
    localStorage.setItem('mm_lang', current);
    updateUI();
    
    // Refresh current page
    const activePage = ['dashboard', 'quiz', 'progress', 'all-logs', 'profile'].find(p => {
      const el = document.getElementById('page-' + p);
      return el && el.style.display === 'block';
    });
    if (activePage) App.showPage(activePage);
  }

  function updateUI() {
    const t = TRANSLATIONS[current];
    if (!t) return;

    const mapping = {
      'lang-btn': t.langBtn,
      'lang-btn-auth': t.langBtn,
      'nav-brand-text': t.brand,
      'nav-dash-text': t.navDash,
      'nav-quiz-text': t.navQuiz,
      'nav-prog-text': t.navProg,
      'nav-logs-text': t.navLogs,
      'nav-prof-text': t.navProf,
      'auth-tag-text': t.authTag,
      'auth-sub-text': t.authSub,
      'tab-login': t.loginTab,
      'tab-register': t.regTab,
      'login-btn-text': t.signInBtn,
      'reg-btn-text': t.createAccBtn,
      'log-today-btn-text': t.logTodayBtn,
      'dim-label-text': t.dimLabel,
      'score-label-text': t.scoreLabel,
      'trend-label-text': t.trendLabel,
      'radar-label-text': t.radarLabel,
      'activity-label-text': t.activityLabel,
      'prayer-label-text': t.prayerLabel,
      'wellness-label-text': t.wellnessLabel,
      'reflection-label-text': t.reflectionLabel,
      'quiz-title-text': t.quizTitle,
      'quiz-sub-text': t.quizSub,
      'full-quiz-btn-text': t.fullQuizBtn,
      'mh-quiz-btn-text': t.mhQuizBtn,
      'logs-title-text': t.logsTitle,
      'logs-sub-text': t.logsSub,
      'save-log-btn-text': t.saveLogBtn,
      'retake-btn-text': t.retakeBtn
    };

    for (const [id, val] of Object.entries(mapping)) {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    }
  }

  return { init, get, toggle };
})();

// ── Chart Helper ──
window._charts = {};
function makeChart(id, config) {
  if (window._charts[id]) {
    window._charts[id].destroy();
  }
  const canvas = document.getElementById(id);
  if (canvas) {
    window._charts[id] = new Chart(canvas, config);
  }
}

// ── Global Init ──
document.addEventListener('DOMContentLoaded', async () => {
  Lang.init();
  await App.updateGlobalNav();
});

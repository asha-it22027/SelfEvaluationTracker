/**
 * ═══════════════════════════════════════════════
 * db.js — Backend API Layer
 * ═══════════════════════════════════════════════
 */

const API_BASE = window.location.hostname === 'localhost' ? 'http://localhost:5000' : '';

const DB = (() => {
  // ── Get single user by email ──
  async function getUser(email) {
    console.log(`DB: Fetching user ${email}`);
    try {
      const response = await fetch(`${API_BASE}/user/${email}`);
      if (!response.ok) {
        console.warn(`DB: GetUser failed with status ${response.status}`);
        return null;
      }
      const data = await response.json();
      console.log('DB: GetUser success', data);
      return data;
    } catch (e) {
      console.error('DB: API Error in getUser:', e);
      return null;
    }
  }

  // ── Create a new user (Register) ──
  async function createUser({ name, email, age, goal, pass }) {
    console.log(`DB: Creating user ${email}`);
    try {
      const response = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, age, goal, password: pass })
      });
      if (!response.ok) {
        const err = await response.json();
        console.error('DB: CreateUser failed', err);
        return false;
      }
      console.log('DB: CreateUser success');
      return true;
    } catch (e) {
      console.error('DB: API Error in createUser:', e);
      return false;
    }
  }

  // ── Update user fields ──
  async function updateUser(email, fields) {
    try {
      const response = await fetch(`${API_BASE}/user/${email}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields)
      });
      return response.ok;
    } catch (e) {
      console.error('DB: API Error in updateUser:', e);
      return false;
    }
  }

  // ── Add or update today's log entry ──
  async function upsertLog(email, scores, mood, mhScores) {
    try {
      const response = await fetch(`${API_BASE}/log/${email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scores, mood, mhScores })
      });
      return response.ok;
    } catch (e) {
      console.error('DB: API Error in upsertLog:', e);
      return false;
    }
  }

  // ── Get logs for a user ──
  async function getLogs(email) {
    const user = await getUser(email);
    return user ? (user.logs || []) : [];
  }

  // Login helper
  async function login(email, password) {
    console.log(`DB: Logging in ${email}`);
    try {
      const response = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!response.ok) {
        console.warn(`DB: Login failed with status ${response.status}`);
        return null;
      }
      const data = await response.json();
      console.log('DB: Login success');
      return data;
    } catch (e) {
      console.error('DB: API Error in login:', e);
      return null;
    }
  }

  return { getUser, createUser, updateUser, upsertLog, getLogs, login };
})();

// ── Session helpers (who is logged in) ──
const Session = (() => {
  const KEY = 'mm_session_email';
  let _cachedUser = null;

  function get() { return localStorage.getItem(KEY) || null; }
  function set(email) { localStorage.setItem(KEY, email); _cachedUser = null; }
  function clear() { localStorage.removeItem(KEY); _cachedUser = null; }
  
  async function getUser(forceRefresh = false) {
    if (_cachedUser && !forceRefresh) return _cachedUser;
    
    const email = get();
    if (!email) {
      console.log('Session: No email in localStorage');
      return null;
    }
    _cachedUser = await DB.getUser(email);
    return _cachedUser;
  }

  return { get, set, clear, getUser };
})();

// ── Utility: show toast notification ──
function showToast(msg, color = 'var(--success)') {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.style.borderColor = color;
  t.style.color = color;
  t.style.display = 'block';
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => { t.style.display = 'none'; }, 2400);
}

// ── Utility: get initials from name ──
function getInitials(name) {
  return (name || '?').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

// ── Categories config ──
const CATS = {
  names:  ['Study', 'Focus', 'Consistency', 'Logic', 'Health'],
  icons:  ['📚', '🎯', '🔁', '🧠', '💪'],
  colors: ['#6366f1', '#06b6d4', '#f43f5e', '#fbbf24', '#10b981'],
  descs:  [
    'Learning & retention habits',
    'Attention & deep work',
    'Habit-building & routine',
    'Problem-solving & reasoning',
    'Sleep, diet & recovery',
  ],
};

// ── Calculate streak (Advanced: Checks for gaps) ──
function calcStreak(logs) {
  if (!logs || !logs.length) return 0;
  
  const parseDate = d => {
    try {
      const parts = d.split('/');
      if (parts.length < 3) {
        // Maybe it's YYYY-MM-DD
        const d2 = new Date(d);
        d2.setHours(0,0,0,0);
        return d2;
      }
      const [dd, mm, yy] = parts.map(Number);
      const date = new Date(yy, mm - 1, dd);
      date.setHours(0, 0, 0, 0);
      return date;
    } catch(e) {
      return new Date();
    }
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.setHours(0, 0, 0, 0);

  // Sort logs by timestamp to be sure
  const sortedLogs = [...logs].sort((a, b) => (a.ts || 0) - (b.ts || 0));
  let lastLogDate = parseDate(sortedLogs[sortedLogs.length - 1].date);

  // If the last log is older than yesterday, streak is broken
  if (lastLogDate < yesterday) return 0;

  let streak = 1;
  for (let i = sortedLogs.length - 1; i > 0; i--) {
    const current = parseDate(sortedLogs[i].date);
    const previous = parseDate(sortedLogs[i - 1].date);
    
    const diffTime = Math.abs(current - previous);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      streak++;
    } else if (diffDays === 0) {
      continue; // Same day log, ignore
    } else {
      break; // Gap found
    }
  }
  return streak;
}

// ── Get avg score ──
function logAvg(log) {
  if (!log || !log.scores) return 0;
  const scores = log.scores;
  const vals = CATS.names.map(c => scores[c] || 0);
  return Math.round(vals.reduce((s, v) => s + v, 0) / vals.length);
}

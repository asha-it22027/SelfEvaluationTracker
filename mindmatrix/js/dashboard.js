/**
 * ═══════════════════════════════════════════════
 * dashboard.js — Dashboard page renderer
 * ═══════════════════════════════════════════════
 */

const Dashboard = (() => {

  async function render() {
    console.log('Dashboard: Starting Render');
    const user = await Session.getUser();
    const logs = user ? (user.logs || []) : [];
    const latest = logs.length ? logs[logs.length - 1] : null;

    // 1. GREETING & DATE
    _renderHeader(user);

    // 2. STAT CARDS
    _renderStats(logs);

    // 3. MIND DIMENSIONS (Always show)
    _renderPillarCards();

    // 4. TODAY'S SCORES
    _renderTodayBars(latest);

    // 5. CHARTS (Resilient)
    _renderTrendChart(logs);
    _renderRadarChart(latest);

    // 6. ACTIVITY
    _renderActivity(logs);

    // 7. PRAYER TIMELINE (Always show)
    _renderPrayerTimeline();

    // 8. WELLNESS & TIPS (Always show)
    _renderWellness(latest);
  }

  function _renderHeader(user) {
    const hr = new Date().getHours();
    const t = TRANSLATIONS[Lang.get()];
    const greetBase = hr < 12 ? t.greetMorning : hr < 17 ? t.greetAfternoon : t.greetEvening;
    const name = user ? (user.name || 'User') : 'Friend';
    
    const greetEl = document.getElementById('dash-greeting');
    if (greetEl) greetEl.textContent = `${greetBase}, ${name.split(' ')[0]}!`;

    const dateEl = document.getElementById('dash-date-text');
    if (dateEl) {
      const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
      const locale = Lang.get() === 'bn' ? 'bn-BD' : 'en-GB';
      dateEl.textContent = new Date().toLocaleDateString(locale, options);
    }
  }

  function _renderStats(logs) {
    const el = document.getElementById('dash-stats');
    if (!el) return;

    const isBn = (Lang.get() === 'bn');
    const t = TRANSLATIONS[isBn ? 'bn' : 'en'];
    const total = logs.length;
    const avg = total ? Math.round(logs.reduce((s, l) => s + logAvg(l), 0) / total) : 0;
    const streak = calcStreak(logs);

    let best = '—';
    if (total) {
      const avgs = CATS.names.map(c => ({
        c,
        v: Math.round(logs.reduce((s, l) => s + (l.scores[c] || 0), 0) / total),
      }));
      const bestCat = avgs.sort((a, b) => b.v - a.v)[0].c;
      const dimNames = {
        'Study': isBn ? 'পড়াশোনা' : 'Study',
        'Focus': isBn ? 'মনোযোগ' : 'Focus',
        'Consistency': isBn ? 'ধারাবাহিকতা' : 'Consistency',
        'Logic': isBn ? 'যুক্তি' : 'Logic',
        'Health': isBn ? 'স্বাস্থ্য' : 'Health'
      };
      best = dimNames[bestCat] || bestCat;
    }

    el.innerHTML = [
      { label: t.statsTotal, val: total, col: 'var(--accent)' },
      { label: t.statsAvg, val: avg + '%', col: 'var(--accent2)' },
      { label: t.statsBest, val: best, col: 'var(--success)' },
      { label: t.statsStreak, val: streak + (isBn ? ' দিন' : 'd'), col: 'var(--warn)' },
    ].map(s => `
      <div class="stat-card">
        <div class="stat-card-label">${s.label}</div>
        <div class="stat-card-value" style="color:${s.col}">${s.val}</div>
      </div>
    `).join('');
  }

  function _renderPillarCards() {
    const el = document.getElementById('dash-pillar-cards');
    if (!el) return;

    const isBn = (Lang.get() === 'bn');
    const dimNames = {
      'Study': isBn ? 'পড়াশোনা' : 'Study',
      'Focus': isBn ? 'মনোযোগ' : 'Focus',
      'Consistency': isBn ? 'ধারাবাহিকতা' : 'Consistency',
      'Logic': isBn ? 'যুক্তি' : 'Logic',
      'Health': isBn ? 'স্বাস্থ্য' : 'Health'
    };

    el.innerHTML = CATS.names.map((name, i) => `
      <div class="pillar-card" onclick="showPillarDetail('${name}')" style="border-top: 3px solid ${CATS.colors[i]}">
        <div class="pillar-card-icon">${CATS.icons[i]}</div>
        <div class="pillar-card-name">${dimNames[name] || name}</div>
      </div>
    `).join('');
  }

  function _renderTodayBars(latest) {
    const el = document.getElementById('dash-bars');
    if (!el) return;

    const isBn = (Lang.get() === 'bn');
    if (!latest) {
      el.innerHTML = `<p style="color:var(--muted); font-size:13px; padding:10px 0;">${isBn ? "আজ কোনো মূল্যায়ন করা হয়নি।" : "No assessment yet today."}</p>`;
      return;
    }

    const dimNames = {
      'Study': isBn ? 'পড়াশোনা' : 'Study',
      'Focus': isBn ? 'মনোযোগ' : 'Focus',
      'Consistency': isBn ? 'ধারাবাহিকতা' : 'Consistency',
      'Logic': isBn ? 'যুক্তি' : 'Logic',
      'Health': isBn ? 'স্বাস্থ্য' : 'Health'
    };

    el.innerHTML = CATS.names.map((c, i) => {
      const val = latest.scores[c] || 0;
      return `
        <div class="progress-row">
          <div class="progress-cat">${CATS.icons[i]} ${dimNames[c] || c}</div>
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width:${val}%; background:${CATS.colors[i]}"></div>
          </div>
          <div class="progress-val">${val}%</div>
        </div>
      `;
    }).join('');
  }

  function _renderTrendChart(logs) {
    const last7 = logs.slice(-7);
    const labels = last7.map(l => l.date);
    const data = last7.map(l => logAvg(l));
    const isBn = (Lang.get() === 'bn');

    makeChart('trendChart', {
      type: 'line',
      data: {
        labels: labels.length ? labels : [isBn ? 'তথ্য নেই' : 'No data'],
        datasets: [{
          label: isBn ? 'গড় স্কোর' : 'Avg Score',
          data: data.length ? data : [0],
          borderColor: '#6366f1',
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { 
          y: { min: 0, max: 100, grid: { color: 'rgba(255,255,255,0.05)' } },
          x: { grid: { display: false } }
        }
      }
    });
  }

  function _renderRadarChart(latest) {
    const isBn = (Lang.get() === 'bn');
    const dimNames = {
      'Study': isBn ? 'পড়াশোনা' : 'Study',
      'Focus': isBn ? 'মনোযোগ' : 'Focus',
      'Consistency': isBn ? 'ধারাবাহিকতা' : 'Consistency',
      'Logic': isBn ? 'যুক্তি' : 'Logic',
      'Health': isBn ? 'স্বাস্থ্য' : 'Health'
    };
    const data = CATS.names.map(c => latest ? (latest.scores[c] || 0) : 0);
    const color = '#6366f1'; 

    makeChart('radarChart', {
      type: 'radar',
      data: {
        labels: CATS.names.map(n => dimNames[n] || n),
        datasets: [{
          data,
          backgroundColor: color + '44', // Increased opacity for fill
          borderColor: color,
          borderWidth: 3, // Thicker line
          pointBackgroundColor: CATS.colors,
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { 
          r: { 
            min: 0, max: 100, 
            grid: { color: 'rgba(255,255,255,0.05)' }, 
            angleLines: { color: 'rgba(255,255,255,0.05)' },
            pointLabels: { 
              color: '#aaa0cc', 
              font: { size: 11, weight: '600' } 
            },
            ticks: { display: false }
          } 
        }
      }
    });
  }

  function _renderActivity(logs) {
    const el = document.getElementById('dash-activity');
    if (!el) return;

    const isBn = (Lang.get() === 'bn');
    const recent = [...logs].reverse().slice(0, 3);
    if (!recent.length) {
      el.innerHTML = `<p style="color:var(--muted); font-size:13px;">${isBn ? "কোনো সাম্প্রতিক কার্যক্রম নেই।" : "No recent logs."}</p>`;
      return;
    }

    el.innerHTML = recent.map(l => `
      <div class="log-item">
        <div class="log-dot"></div>
        <div class="log-content">
          <div class="log-main">${isBn ? "মূল্যায়ন সম্পন্ন - গড়" : "Logged assessment — Average"}: <strong>${logAvg(l)}%</strong></div>
          <div class="log-time">${l.date}</div>
        </div>
      </div>
    `).join('');
  }

  function _renderPrayerTimeline() {
    const el = document.getElementById('prayer-timeline');
    if (!el) return;

    const isBn = (Lang.get() === 'bn');
    const routinesBn = {
      'Fajr': { p: 'ফজর', f: 'লক্ষ্য নির্ধারণ ও নিয়ত', a: 'দিনের জন্য নিয়ত এবং প্রধান ৩টি কাজ নির্ধারণ।' },
      'Dhuhr': { p: 'যোহর', f: 'কাজের মাঝে বিরতি ও সতেজতা', a: 'সুন্নাহ মুতাবিক কায়লুলা (দুপুরের ঘুম) বা ১০ মিনিটের বিশ্রাম।' },
      'Asr': { p: 'আসর', f: 'শারীরিক স্বাস্থ্য ও মুভমেন্ট', a: 'হালকা স্ট্রেচিং বা দ্রুত হাঁটা যাতে শক্তি বজায় থাকে।' },
      'Maghrib': { p: 'মাগরিব', f: 'কৃতজ্ঞতা (শুকর)', a: 'সারাদিনের নির্দিষ্ট ৩টি নিয়ামতের তালিকা তৈরি করা।' },
      'Isha': { p: 'এশা', f: 'আত্ম-পর্যালোচনা (মুহাসাবাহ)', a: 'নিয়ত বনাম কাজের পর্যালোচনা, ক্ষমা প্রার্থনা।' }
    };

    el.innerHTML = MH_MODULE.prayerRoutine.map(p => `
      <div class="timeline-item">
        <div class="timeline-prayer">${isBn ? (routinesBn[p.prayer]?.p || p.prayer) : p.prayer}</div>
        <div class="timeline-content">
          <div class="timeline-focus">${isBn ? (routinesBn[p.prayer]?.f || p.focus) : p.focus}</div>
          <div class="timeline-activity">${isBn ? (routinesBn[p.prayer]?.a || p.activity) : p.activity}</div>
        </div>
      </div>
    `).join('');
  }

  function _renderWellness(latest) {
    const wellnessEl = document.getElementById('wellness-content');
    const isBn = (Lang.get() === 'bn');

    if (wellnessEl && typeof WellnessData !== 'undefined') {
      const sections = isBn ? {
        'mindset': { title: 'মানসিকতা', perspective: 'সবকিছু আল্লাহর পক্ষ থেকে পরীক্ষা হিসেবে গ্রহণ করুন এবং সবর ও শোকর বজায় রাখুন।' },
        'purpose': { title: 'উদ্দেশ্য', perspective: 'আপনার প্রতিটি কাজ যেন ইবাদত হিসেবে গণ্য হয়, সেই নিয়ত পরিষ্কার রাখুন।' },
        'balance': { title: 'ভারসাম্য', perspective: 'দুনিয়া ও আখিরাতের মাঝে ভারসাম্য বজায় রাখুন; অতি দুশ্চিন্তা পরিহার করুন।' }
      } : WellnessData.sections;

      wellnessEl.innerHTML = Object.values(sections).map(s => `
        <div class="wellness-card">
          <div class="wellness-title">${s.title}</div>
          <div class="wellness-text">${s.perspective}</div>
        </div>
      `).join('');
    }

    const tipsEl = document.getElementById('reflection-tips');
    if (tipsEl && typeof WellnessData !== 'undefined') {
      const tips = isBn ? [
        { name: 'সবর (ধৈর্য)', description: 'কঠিন সময়ে অবিচল থাকুন এবং আল্লাহর সাহায্যের আশা রাখুন।' },
        { name: 'শুকর (কৃতজ্ঞতা)', description: 'ছোট বড় সব নিয়ামতের জন্য আল্লাহর প্রশংসা করুন।' },
        { name: 'তাওয়াক্কুল (ভরসা)', description: 'সর্বোচ্চ চেষ্টা করার পর ফলের জন্য আল্লাহর ওপর নির্ভর করুন।' }
      ] : WellnessData.reflectionTips;

      tipsEl.innerHTML = tips.map(t => `
        <div class="reflection-item">
          <div class="reflection-name">${t.name}</div>
          <div class="reflection-desc">${t.description}</div>
        </div>
      `).join('');
    }
  }

  return { render };
})();

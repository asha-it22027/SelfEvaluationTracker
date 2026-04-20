/**
 * ═══════════════════════════════════════════════
 * progress.js — Progress tracking & analytics
 * ═══════════════════════════════════════════════
 */

const Progress = (() => {

  async function render() {
    const user = await Session.getUser();
    if (!user) return;

    const isBn = (Lang.get() === 'bn');
    
    // Update static text via IDs
    const titleEl = document.getElementById('progress-title-text');
    const subEl = document.getElementById('progress-sub-text');
    const logBtn = document.getElementById('log-today-btn-progress');
    
    if (titleEl) titleEl.textContent = isBn ? "প্রগ্রেস ট্র্যাকার" : "Progress Tracker";
    if (subEl) subEl.textContent = isBn ? "সময়ের সাথে আপনার দৈনন্দিন কর্মক্ষমতা" : "Your daily performance over time";
    if (logBtn) logBtn.textContent = isBn ? "+ আজ লগ করুন" : "+ Log Today";

    const chartLabels = {
      allDim: isBn ? "সব ডাইমেনশন — দৈনিক স্কোর" : "All dimensions — daily scores",
      mhHistory: isBn ? "🌙 মানসিক স্বাস্থ্য ডায়াগনস্টিক ইতিহাস" : "🌙 Mental Health Diagnostic History",
      sevTrend: isBn ? "তীব্রতার প্রবণতা" : "Severity Trend",
      latestRadar: isBn ? "সর্বশেষ ডায়াগনস্টিক রাডার" : "Latest Diagnostic Radar",
      mhNote: isBn ? "দ্রষ্টব্য: মানসিক স্বাস্থ্যের ডাইমেনশনে কম স্কোর (০-৫) ভালো।" : "Note: Lower scores (0-5) are better for mental health dimensions.",
      latestBar: isBn ? "সর্বশেষ স্কোর — বার চার্ট" : "Latest scores — bar chart",
      avgTrend: isBn ? "সামগ্রিক গড় প্রবণতা" : "Overall average trend"
    };

    const labelMap = {
      'all-dim-title': chartLabels.allDim,
      'mh-history-title': chartLabels.mhHistory,
      'sev-trend-title': chartLabels.sevTrend,
      'latest-radar-title': chartLabels.latestRadar,
      'mh-note-text': chartLabels.mhNote,
      'latest-bar-title': chartLabels.latestBar,
      'avg-trend-title': chartLabels.avgTrend
    };

    Object.entries(labelMap).forEach(([id, text]) => {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    });

    const logs = user.logs || [];

    // 1. DIMENSION LEGEND
    const legendEl = document.getElementById('dim-legend');
    if (legendEl) {
      const dimNames = {
        'Study': isBn ? 'পড়াশোনা' : 'Study',
        'Focus': isBn ? 'মনোযোগ' : 'Focus',
        'Consistency': isBn ? 'ধারাবাহিকতা' : 'Consistency',
        'Logic': isBn ? 'যুক্তি' : 'Logic',
        'Health': isBn ? 'স্বাস্থ্য' : 'Health'
      };
      legendEl.innerHTML = CATS.names.map((name, i) => `
        <div class="legend-item">
          <div class="legend-dot" style="background:${CATS.colors[i]}"></div>
          <span style="font-size:12px">${dimNames[name] || name}</span>
        </div>
      `).join('');
    }

    const mhLegendEl = document.getElementById('mh-legend');
    if (mhLegendEl && typeof MH_MODULE !== 'undefined') {
      const mhCats = Object.keys(MH_MODULE.questions);
      const mhNames = {
        'Depression': isBn ? 'বিষণ্ণতা' : 'Depression',
        'Anxiety': isBn ? 'দুশ্চিন্তা' : 'Anxiety',
        'MoodSwings': isBn ? 'মেজাজ পরিবর্তন' : 'Mood Swings'
      };
      const mhColors = ['#f43f5e', '#fbbf24', '#3b82f6'];
      mhLegendEl.innerHTML = mhCats.map((name, i) => `
        <div class="legend-item">
          <div class="legend-dot" style="background:${mhColors[i]}"></div>
          <span style="font-size:12px">${mhNames[name] || name}</span>
        </div>
      `).join('');
    }

    if (logs.length === 0) {
      _renderEmptyState();
      return;
    }

    // 2. CHARTS
    _renderAllDimChart(logs, isBn);
    _renderBarChart(logs, isBn);
    _renderTrendChart(logs, isBn);
    _renderMHProgressChart(logs, isBn);
    _renderMHRadarChart(logs, isBn);

    // 3. LOG HISTORY
    _renderLogList(logs);
  }

  async function renderLogs() {
    const user = await Session.getUser();
    if (!user) return;
    const logs = user.logs || [];
    _renderLogList(logs);
  }

  function _renderEmptyState() {
    const ids = ['allDimChart', 'barChart', 'avgTrendChart', 'mhProgressChart', 'mhRadarChart'];
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.parentElement) {
        el.parentElement.innerHTML = `<div style="text-align:center; padding:40px; color:var(--muted); font-size:13px">No data available yet. Complete an assessment to see your progress!</div>`;
      }
    });
    
    const listEl = document.getElementById('progress-log-list');
    if (listEl) listEl.innerHTML = `<p style="color:var(--muted); font-size:13px; text-align:center; padding:20px;">No assessments logged yet.</p>`;
  }

  function _renderAllDimChart(logs, isBn) {
    const labels = logs.map(l => l.date);
    const dimNames = {
      'Study': isBn ? 'পড়াশোনা' : 'Study',
      'Focus': isBn ? 'মনোযোগ' : 'Focus',
      'Consistency': isBn ? 'ধারাবাহিকতা' : 'Consistency',
      'Logic': isBn ? 'যুক্তি' : 'Logic',
      'Health': isBn ? 'স্বাস্থ্য' : 'Health'
    };
    const datasets = CATS.names.map((name, i) => ({
      label: dimNames[name] || name,
      data: logs.map(l => l.scores[name] || 0),
      borderColor: CATS.colors[i],
      backgroundColor: 'transparent',
      borderWidth: 2,
      tension: 0.3
    }));

    makeChart('allDimChart', {
      type: 'line',
      data: { labels, datasets },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { y: { min: 0, max: 100 } }
      }
    });
  }

  function _renderMHProgressChart(logs, isBn) {
    if (typeof MH_MODULE === 'undefined') return;
    const mhCats = Object.keys(MH_MODULE.questions);
    const mhNames = {
      'Depression': isBn ? 'বিষণ্ণতা' : 'Depression',
      'Anxiety': isBn ? 'দুশ্চিন্তা' : 'Anxiety',
      'MoodSwings': isBn ? 'মেজাজ পরিবর্তন' : 'Mood Swings'
    };
    const mhColors = ['#ff2d78', '#ffcc00', '#00e5ff'];
    
    const labels = logs.map(l => l.date);
    const datasets = mhCats.map((cat, i) => ({
      label: mhNames[cat] || cat,
      data: logs.map(l => (l.mhScores && l.mhScores[cat] !== undefined) ? l.mhScores[cat] : null),
      borderColor: mhColors[i],
      backgroundColor: 'transparent',
      borderWidth: 2,
      tension: 0.3,
      spanGaps: true
    }));

    makeChart('mhProgressChart', {
      type: 'line',
      data: { labels, datasets },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { y: { min: 0, max: 15 } }
      }
    });
  }

  function _renderMHRadarChart(logs, isBn) {
    if (typeof MH_MODULE === 'undefined') return;
    const latest = [...logs].reverse().find(l => l.mhScores && Object.keys(l.mhScores).length > 0);
    if (!latest) return;

    const mhCats = Object.keys(MH_MODULE.questions);
    const mhNames = {
      'Depression': isBn ? 'বিষণ্ণতা' : 'Depression',
      'Anxiety': isBn ? 'দুশ্চিন্তা' : 'Anxiety',
      'MoodSwings': isBn ? 'মেজাজ পরিবর্তন' : 'Mood Swings'
    };
    const data = mhCats.map(cat => latest.mhScores[cat] || 0);
    const color = '#f43f5e';
    const mhColors = ['#f43f5e', '#fbbf24', '#3b82f6'];

    makeChart('mhRadarChart', {
      type: 'radar',
      data: {
        labels: mhCats.map(c => mhNames[c] || c),
        datasets: [{
          data,
          backgroundColor: color + '44',
          borderColor: color,
          borderWidth: 3,
          pointBackgroundColor: mhColors,
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
            min: 0, max: 15, 
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

  function _renderBarChart(logs, isBn) {
    const latest = logs[logs.length - 1];
    const dimNames = {
      'Study': isBn ? 'পড়াশোনা' : 'Study',
      'Focus': isBn ? 'মনোযোগ' : 'Focus',
      'Consistency': isBn ? 'ধারাবাহিকতা' : 'Consistency',
      'Logic': isBn ? 'যুক্তি' : 'Logic',
      'Health': isBn ? 'স্বাস্থ্য' : 'Health'
    };
    
    const data = CATS.names.map(name => latest.scores[name] || 0);
    const labels = CATS.names.map(n => dimNames[n] || n);
    const colors = [...CATS.colors];

    // Calculate Overall Mental Health Stability
    if (latest.mhScores) {
      const mhCats = ['Depression', 'Anxiety', 'MoodSwings'];
      const sum = mhCats.reduce((s, c) => s + (latest.mhScores[c] || 0), 0);
      // Max score is 45 (15 per cat). Lower is better, so we invert it for "Stability"
      const stability = Math.round(100 - (sum / 45) * 100);
      
      labels.push(isBn ? 'মানসিক স্থিরতা' : 'MH Stability');
      data.push(stability);
      colors.push('#f43f5e');
    }

    makeChart('barChart', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          data,
          backgroundColor: colors,
          borderRadius: 4
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { y: { min: 0, max: 100 } }
      }
    });
  }

  function _renderTrendChart(logs) {
    const labels = logs.map(l => l.date);
    const data = logs.map(l => logAvg(l));

    makeChart('avgTrendChart', {
      type: 'line',
      data: {
        labels,
        datasets: [{
          data,
          borderColor: 'var(--accent)',
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
          fill: true
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { y: { min: 0, max: 100 } }
      }
    });
  }

  function _renderLogList(logs) {
    const containers = ['all-logs-list', 'progress-log-list'].map(id => document.getElementById(id)).filter(el => el);
    if (containers.length === 0) return;

    const isBn = (Lang.get() === 'bn');
    const logsRev = [...logs].reverse();

    // Localized labels, names, and advice
    const labels = {
      mhTitle: isBn ? 'মানসিক স্বাস্থ্য বিশ্লেষণ' : 'MENTAL HEALTH ANALYSIS',
      dimTitle: isBn ? 'ডাইমেনশন বিশ্লেষণ ও সমাধান' : 'DIMENSION ANALYSIS & SOLUTIONS',
      avgPerf: isBn ? 'গড় কর্মক্ষমতা' : 'Avg Performance',
      score: isBn ? 'স্কোর' : 'Score',
      prev: isBn ? 'আগের স্কোর' : 'Prev',
      first: isBn ? 'প্রথম লগ' : 'First Log',
      sol: isBn ? 'সমাধান' : 'SOLUTION',
      isl: isBn ? 'ইসলামিক' : 'Islamic',
      sci: isBn ? 'বৈজ্ঞানিক' : 'Scientific',
      cats: {
        'Study': isBn ? 'পড়াশোনা' : 'Study',
        'Focus': isBn ? 'মনোযোগ' : 'Focus',
        'Consistency': isBn ? 'ধারাবাহিকতা' : 'Consistency',
        'Logic': isBn ? 'যুক্তি' : 'Logic',
        'Health': isBn ? 'স্বাস্থ্য' : 'Health',
        'Depression': isBn ? 'বিষণ্ণতা' : 'Depression',
        'Anxiety': isBn ? 'দুশ্চিন্তা' : 'Anxiety',
        'MoodSwings': isBn ? 'মেজাজ পরিবর্তন' : 'Mood Swings'
      },
      sev: {
        'Severe': isBn ? 'তীব্র' : 'Severe',
        'Moderate': isBn ? 'মাঝারি' : 'Moderate',
        'Mild': isBn ? 'সামান্য' : 'Mild'
      },
      advice: {
        'Study': isBn ? [
          "প্যাসিভ রিডিংয়ের চেয়ে 'অ্যাক্টিভ রিকল' পদ্ধতিকে গুরুত্ব দিন।",
          "দীর্ঘমেয়াদী মেমোরির জন্য 'স্পেসড রিপিটিশন' পদ্ধতি ব্যবহার করুন।",
          "৫ বছরের শিশুকে বোঝানোর মতো করে সহজ করে শেখান (ফাইনম্যান পদ্ধতি)।"
        ] : null,
        'Focus': isBn ? [
          "সকালটা সুরক্ষিত রাখুন: প্রথম ২ ঘণ্টা সোশ্যাল মিডিয়া ব্যবহার করবেন না।",
          "একাধিক কাজ একসাথে না করে 'সিঙ্গেল-টাস্কিং' করার অভ্যাস করুন।",
          "মনোযোগ ফিরে পেতে ৫ মিনিট নিরবতা পালন করুন।"
        ] : null,
        'Consistency': isBn ? [
          "কখনো পরপর দুবার নিয়ম ভাঙবেন না; একবার ভুল হলে সাথে সাথে ফিরে আসুন।",
          "কম শক্তির দিনে অন্তত 'মিনিমাম ভায়াবল হ্যাবিট' বা ছোট কোনো অভ্যাস পালন করুন।",
          "পরিবেশ এমনভাবে সাজান যেন ভালো অভ্যাসগুলো সহজ হয় এবং খারাপগুলো কঠিন।"
        ] : null,
        'Logic': isBn ? [
          "প্রতিটি যুক্তির পেছনের অন্তর্নিহিত অনুমানগুলো চিহ্নিত করুন।",
          "যুক্তি বা ধাঁধা সমাধানের মাধ্যমে নিজের মগজকে সচল রাখুন।",
          "জটিল বিষয়গুলোকে ছোট ছোট মৌলিক ধাপে ভাগ করার চেষ্টা করুন।"
        ] : null,
        'Health': isBn ? [
          "পর্যাপ্ত ঘুম হলো সমস্ত মানসিক ও শারীরিক কাজের ভিত্তি।",
          "পর্যাপ্ত পানি পান করুন; ডিহাইড্রেশন মনোযোগ ২০% পর্যন্ত কমিয়ে দেয়।",
          "সকালের সূর্যের আলো গায়ে লাগান, যা আপনার শরীরের স্বাভাবিক ছন্দ বজায় রাখে।"
        ] : null
      }
    };

    const html = logsRev.map((l, idx) => {
      const prevLog = logsRev[idx + 1];
      let mhHtml = '';
      if (l.mhScores && Object.keys(l.mhScores).length > 0 && typeof MH_MODULE !== 'undefined') {
        mhHtml = `
          <div style="margin-top:10px; padding:10px; background:rgba(255,45,120,0.05); border-radius:6px; border-left:2px solid var(--accent3)">
            <div style="font-size:11px; color:var(--accent3); font-weight:700; margin-bottom:5px">${labels.mhTitle}</div>
            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap:10px">
              ${Object.entries(l.mhScores).map(([cat, score]) => {
                const severity = MH_MODULE.getSeverity(score);
                const sol = MH_MODULE.solutions[cat][severity];
                const displayCat = labels.cats[cat] || cat;
                const displaySev = labels.sev[severity] || severity;
                return `
                  <div style="background:rgba(255,255,255,0.03); padding:8px; border-radius:4px">
                    <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:5px">
                      <span><strong>${displayCat}</strong>: ${score}/15</span>
                      <span style="color:${severity==='Severe'?'#ff4d4d':severity==='Moderate'?'#ffcc00':'#00ffaa'}">${displaySev}</span>
                    </div>
                    <div style="font-size:10px; color:#aaa; margin-top:4px"><strong>${isBn ? 'ইসলামিক' : 'Islamic'}:</strong> ${isBn ? (sol.bn_adhkar || sol.adhkar || sol.ayah) : (sol.adhkar || sol.ayah)}</div>
                    <div style="font-size:10px; color:#aaa; margin-top:2px"><strong>${isBn ? 'বৈজ্ঞানিক' : 'Scientific'}:</strong> ${isBn ? (sol.bn_scientific || sol.scientific) : sol.scientific}</div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `;
      }

      const renderDimCard = (name) => {
        const i = CATS.names.indexOf(name);
        const score = l.scores[name] || 0;
        const prevScore = prevLog ? (prevLog.scores[name] || 0) : null;
        const displayName = labels.cats[name] || name;
        
        let status = "";
        let statusColor = "";
        if (score >= 80) { status = isBn ? "চমৎকার" : "Excellent"; statusColor = "#00ffaa"; }
        else if (score >= 60) { status = isBn ? "ভালো" : "Good"; statusColor = "#ffcc00"; }
        else if (score >= 40) { status = isBn ? "মোটামুটি" : "Average"; statusColor = "#ff8800"; }
        else { status = isBn ? "দুর্বল" : "Poor"; statusColor = "#ff4d4d"; }

        let solution = "";
        if (isBn && labels.advice[name]) {
          const advices = labels.advice[name];
          if (score < 40) solution = advices[0];
          else if (score < 70) solution = advices[1];
          else solution = advices[2];
        } else if (typeof PILLAR_DETAILS !== 'undefined' && PILLAR_DETAILS[name]) {
          const lang = Lang.get();
          const pData = PILLAR_DETAILS[name][lang] || PILLAR_DETAILS[name]['en'];
          if (pData && pData.advise) {
            const advices = pData.advise;
            if (score < 40) solution = advices[0];
            else if (score < 70) solution = advices[1];
            else solution = advices[2];
          }
        }

        const historyText = prevScore !== null 
          ? `${labels.prev}: ${prevScore}%`
          : labels.first;

        return `
          <div style="background:rgba(255,255,255,0.03); padding:8px 10px; border-radius:6px; border:1px solid rgba(255,255,255,0.05); margin-bottom:8px">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:3px">
              <span style="font-size:12px; font-weight:700; color:${CATS.colors[i]}">${displayName}</span>
              <span style="font-size:10px; color:${statusColor}; font-weight:700">${status}</span>
            </div>
            <div style="display:flex; justify-content:space-between; font-size:9px; color:#aaa; margin-bottom:4px">
              <span>${labels.score}: ${score}%</span>
              <span>${historyText}</span>
            </div>
            <div style="font-size:10px; color:#ddd; line-height:1.3; background:rgba(0,0,0,0.2); padding:5px; border-radius:4px; border-left:2px solid ${CATS.colors[i]}">
              ${solution}
            </div>
          </div>
        `;
      };

      const dimAnalysisHtml = `
        <div style="margin-top:12px; padding:10px; background:rgba(124,80,255,0.05); border-radius:8px; border:1px solid rgba(124,80,255,0.1)">
          <div style="font-size:11px; color:var(--accent); font-weight:700; margin-bottom:10px; text-transform:uppercase">
             ${labels.dimTitle}
          </div>
          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:12px">
            <div>
              ${['Study', 'Focus', 'Consistency'].map(name => renderDimCard(name)).join('')}
            </div>
            <div>
              ${['Logic', 'Health'].map(name => renderDimCard(name)).join('')}
            </div>
          </div>
        </div>
      `;

      return `
        <div class="log-item" style="margin-bottom:15px; padding:15px; background:rgba(255,255,255,0.03); border-radius:12px; border:1px solid rgba(255,255,255,0.08)">
          <div style="margin-bottom:10px">
            <strong style="font-size:16px; color:#fff; display:block; margin-bottom:6px">${l.date}</strong>
            <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap">
              <span style="color:var(--accent); font-weight:700; background:rgba(124,80,255,0.1); padding:3px 8px; border-radius:20px; font-size:12px">${labels.avgPerf}: ${logAvg(l)}%</span>
              <div style="display:flex; gap:6px; flex-wrap:wrap">
                ${CATS.names.map((name, i) => `
                  <span class="chip" style="font-size:9px; padding:2px 6px; background:${CATS.colors[i]}15; color:${CATS.colors[i]}; border:1px solid ${CATS.colors[i]}30">
                    ${labels.cats[name] || name}: ${l.scores[name] || 0}%
                  </span>
                `).join('')}
              </div>
            </div>
          </div>
          ${dimAnalysisHtml}
          ${mhHtml}
        </div>
      `;
    }).join('');

    containers.forEach(c => c.innerHTML = html);
  }

  return { render, renderLogs };
})();

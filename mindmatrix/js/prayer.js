/**
 * ═══════════════════════════════════════════════
 * prayer.js — Full Timeline Page Renderer
 * ═══════════════════════════════════════════════
 */

const Prayer = (() => {

  async function render() {
    const el = document.getElementById('full-prayer-timeline');
    if (!el) return;

    // Use MH_MODULE.prayerRoutine for base and PRAYER_TIMELINE_DETAILS for more info
    el.innerHTML = MH_MODULE.prayerRoutine.map(p => {
      const details = PRAYER_TIMELINE_DETAILS[p.prayer];
      
      return `
      <div class="timeline-item" style="margin-bottom: 2rem">
        <div class="timeline-prayer" style="background: var(--accent3); color: white; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 600">
          ${p.prayer}
        </div>
        <div class="timeline-content" style="border-left: 2px solid var(--accent3)40">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px">
            <div class="timeline-focus" style="color: var(--accent); font-size: 1.1rem">${p.focus}</div>
            <div class="timeline-activity" style="background: var(--success)15; color: var(--success); padding: 4px 10px; border-radius: 4px; font-size: 12px">
              Recommended: ${p.activity}
            </div>
          </div>
          
          <div class="timeline-details-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-top: 15px">
            <div class="detail-box" style="background: rgba(255,255,255,0.03); padding: 12px; border-radius: 8px">
              <div style="font-size: 11px; color: var(--muted); text-transform: uppercase; margin-bottom: 5px">Spiritual Perspective</div>
              <div style="font-size: 13px; line-height: 1.5">${details.spiritual}</div>
            </div>
            <div class="detail-box" style="background: rgba(255,255,255,0.03); padding: 12px; border-radius: 8px">
              <div style="font-size: 11px; color: var(--muted); text-transform: uppercase; margin-bottom: 5px">Mental/Biological Impact</div>
              <div style="font-size: 13px; line-height: 1.5">${details.mental}</div>
            </div>
            <div class="detail-box" style="background: var(--accent)10; padding: 12px; border-radius: 8px; border: 1px solid var(--accent)20">
              <div style="font-size: 11px; color: var(--accent); text-transform: uppercase; margin-bottom: 5px">Primary Task</div>
              <div style="font-size: 13px; font-weight: 500">${details.task}</div>
            </div>
          </div>
        </div>
      </div>
      `;
    }).join('');
  }

  return { render };
})();

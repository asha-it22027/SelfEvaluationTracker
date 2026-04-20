/**
 * ═══════════════════════════════════════════════
 * pillar_info.js — Detailed pillar data & Prayer Timeline
 * ═══════════════════════════════════════════════
 */

const PILLAR_DETAILS = {
  Study: {
    en: {
      desc: "Focuses on how effectively you acquire and retain new information.",
      benefits: ["Faster learning cycles", "Better long-term memory", "Reduced exam anxiety", "Higher academic performance"],
      advise: [
        "Prioritize Active Recall over passive reading.",
        "Use Spaced Repetition to move info to long-term memory.",
        "Teach the concept to a 5-year old (Feynman Technique).",
        "Interleave different subjects to improve problem-solving.",
        "Eliminate digital distractions during study blocks."
      ],
      perfectRoutine: [
        { time: "08:00", task: "90-min Deep Study (Hardest Subject)" },
        { time: "11:00", task: "30-min Spaced Repetition Review" },
        { time: "15:00", task: "Practice Problems / Application" },
        { time: "20:00", task: "Daily Synthesis & Note Cleanup" }
      ],
      studyTips: [
        "Blurting Method: Write everything you remember on a blank page.",
        "SQ3R: Survey, Question, Read, Recite, Review.",
        "Eat the Frog: Start with the most difficult topic first."
      ]
    },
    bn: {
      desc: "আপনি কত কার্যকরভাবে নতুন তথ্য গ্রহণ এবং ধরে রাখতে পারেন তার ওপর ফোকাস করে।",
      benefits: ["দ্রুত শেখার চক্র", "উন্নত দীর্ঘমেয়াদী স্মৃতি", "পরীক্ষার উদ্বেগ হ্রাস", "উচ্চতর একাডেমিক ফলাফল"],
      advise: [
        "প্যাসিভ রিডিংয়ের চেয়ে 'অ্যাক্টিভ রিকল' পদ্ধতিকে গুরুত্ব দিন।",
        "দীর্ঘমেয়াদী মেমোরির জন্য 'স্পেসড রিপিটিশন' পদ্ধতি ব্যবহার করুন।",
        "৫ বছরের শিশুকে বোঝানোর মতো করে সহজ করে শেখান (ফাইনম্যান পদ্ধতি)।",
        "সমস্যা সমাধানের দক্ষতা বাড়াতে বিভিন্ন বিষয় মিলিয়ে পড়ুন।",
        "পড়ার সময় ডিজিটাল ডিভাইসের মনোযোগ আকর্ষণকারী বিষয়গুলো এড়িয়ে চলুন।"
      ],
      perfectRoutine: [
        { time: "০৮:০০", task: "৯০ মিনিটের গভীর পড়াশোনা (সবচেয়ে কঠিন বিষয়)" },
        { time: "১১:০০", task: "৩০ মিনিটের স্পেসড রিপিটিশন রিভিউ" },
        { time: "১৫:০০", task: "অনুশীলনমূলক সমস্যা সমাধান বা প্রয়োগ" },
        { time: "২০:০০", task: "সারাদিনের পড়ার সংশ্লেষণ ও নোট গুছিয়ে রাখা" }
      ],
      studyTips: [
        "ব্লার্টিং মেথড: একটি সাদা কাগজে যা মনে আছে সব লিখে ফেলুন।",
        "SQ3R পদ্ধতি: সার্ভে, কোয়েশ্চেন, রিড, রিসাইট, রিভিউ।",
        "ইট দ্য ফ্রগ: সবচেয়ে কঠিন বিষয়টি দিয়ে দিন শুরু করুন।"
      ]
    }
  },
  Focus: {
    en: {
      desc: "The ability to direct your attention to a single task without distraction.",
      benefits: ["Increased productivity", "Lower stress levels", "Higher quality of work", "Better time management"],
      advise: [
        "Protect your morning: No social media for the first 2 hours.",
        "Use 'Single-Tasking' as a superpower; avoid multitasking.",
        "Set a 'Clear to Neutral' ritual after every work block.",
        "Practice 5-min mindfulness to reset your attention span.",
        "Optimize your environment for zero friction."
      ],
      perfectRoutine: [
        { time: "09:00", task: "Flow State Session (Notification Blackout)" },
        { time: "12:00", task: "Digital Sunset (Check messages briefly)" },
        { time: "14:00", task: "Pomodoro Sprint (50 min on / 10 min off)" },
        { time: "17:00", task: "Cognitive Recovery (Walk without phone)" }
      ],
      studyTips: [
        "Time Blocking: Schedule your day in specific intent blocks.",
        "The 5-Minute Rule: Commit to just 5 minutes to beat procrastination.",
        "Work-Only Workspace: Train your brain to focus in a specific spot."
      ]
    },
    bn: {
      desc: "বিক্ষেপ ছাড়া একটি নির্দিষ্ট কাজে মনোযোগ নিবদ্ধ করার ক্ষমতা।",
      benefits: ["উৎপাদনশীলতা বৃদ্ধি", "মানসিক চাপ হ্রাস", "কাজের উচ্চ গুণমান", "উন্নত সময় ব্যবস্থাপনা"],
      advise: [
        "সকালটা সুরক্ষিত রাখুন: প্রথম ২ ঘণ্টা সোশ্যাল মিডিয়া ব্যবহার করবেন না।",
        "একাধিক কাজ একসাথে না করে 'সিঙ্গেল-টাস্কিং' করার অভ্যাস করুন।",
        "প্রতিটি কাজের ব্লকের পর কর্মক্ষেত্র গুছিয়ে রাখার নিয়ম তৈরি করুন।",
        "মনোযোগ ফিরে পেতে ৫ মিনিটের মাইন্ডফুলনেস প্র্যাকটিস করুন।",
        "কাজের পরিবেশ এমনভাবে তৈরি করুন যাতে কোনো বাধা না থাকে।"
      ],
      perfectRoutine: [
        { time: "০৯:০০", task: "ফ্লো স্টেট সেশন (সব নোটিফিকেশন বন্ধ)" },
        { time: "১২:০০", task: "ডিজিটাল সানসেট (অল্প সময়ের জন্য মেসেজ চেক করা)" },
        { time: "১৪:০০", task: "পোমোডোরো স্প্রিন্ট (৫০ মিনিট কাজ / ১০ মিনিট বিরতি)" },
        { time: "১৭:০০", task: "মানসিক প্রশান্তি (ফোন ছাড়া হাঁটাচলা)" }
      ],
      studyTips: [
        "টাইম ব্লকিং: নির্দিষ্ট কাজের জন্য দিনের নির্দিষ্ট সময় বরাদ্দ করুন।",
        "৫ মিনিটের নিয়ম: আলস্য কাটাতে যেকোনো কাজ অন্তত ৫ মিনিট করার প্রতিশ্রুতি দিন।",
        "কাজের জন্য নির্দিষ্ট জায়গা: মস্তিষ্ককে একটি নির্দিষ্ট স্থানে মনোযোগ দিতে প্রশিক্ষণ দিন।"
      ]
    }
  },
  Consistency: {
    en: {
      desc: "The power of showing up every day, regardless of motivation.",
      benefits: ["Compound growth", "Builds unstoppable momentum", "Develops iron discipline", "Predictable results"],
      advise: [
        "Never miss twice; recover immediately if you slip.",
        "Focus on the 'Minimum Viable Habit' on low-energy days.",
        "Identity-based habits: Say 'I am a reader,' not 'I want to read.'",
        "Environment Design: Make the good habits easy and bad ones hard.",
        "Track your streak to visualize your progress."
      ],
      perfectRoutine: [
        { time: "06:00", task: "Morning Anchor Habit (e.g., Stretching)" },
        { time: "13:00", task: "Mid-day Consistency Check-in" },
        { time: "21:30", task: "Evening Reflection & Habit Log" },
        { time: "22:00", task: "Fixed Sleep Schedule Initialization" }
      ],
      studyTips: [
        "Habit Stacking: Attach a new habit to an existing one.",
        "Implementation Intentions: 'If X happens, then I will do Y.'",
        "The 2-Minute Rule: Start any habit in under two minutes."
      ]
    },
    bn: {
      desc: "অনুপ্রেরণা থাকুক বা না থাকুক, প্রতিদিন কাজ চালিয়ে যাওয়ার শক্তি।",
      benefits: ["যৌগিক বৃদ্ধি", "অদম্য গতি তৈরি করে", "দৃঢ় শৃঙ্খলা বজায় রাখে", "প্রত্যাশিত ফলাফল"],
      advise: [
        "কখনো পরপর দুবার নিয়ম ভাঙবেন না; একবার ভুল হলে সাথে সাথে ফিরে আসুন।",
        "কম শক্তির দিনে অন্তত 'মিনিমাম ভায়াবল হ্যাবিট' বা ছোট কোনো অভ্যাস পালন করুন।",
        "পরিচয়-ভিত্তিক অভ্যাস: বলুন 'আমি একজন পাঠক', 'আমি পড়তে চাই' নয়।",
        "পরিবেশ এমনভাবে সাজান যেন ভালো অভ্যাসগুলো সহজ হয় এবং খারাপগুলো কঠিন।",
        "আপনার অগ্রগতি দেখার জন্য স্ট্রিক বা ধারাবাহিকতা ট্র্যাক করুন।"
      ],
      perfectRoutine: [
        { time: "০৬:০০", task: "সকালের প্রথম অভ্যাস (যেমন: স্ট্রেচিং)" },
        { time: "১৩:০০", task: "দিনের মাঝামাঝি কাজের ধারাবাহিকতা চেক করা" },
        { time: "২১:৩০", task: "রাতের পর্যালোচনা ও অভ্যাসের লগ রাখা" },
        { time: "২২:০০", task: "নির্দিষ্ট ঘুমানোর সময় শুরু করা" }
      ],
      studyTips: [
        "হ্যাবিট স্ট্যাকিং: একটি বিদ্যমান অভ্যাসের সাথে নতুন অভ্যাস যুক্ত করুন।",
        "ইমপ্লিমেন্টেশন ইনটেনশন: 'যদি X ঘটে, তবে আমি Y করব।'",
        "২ মিনিটের নিয়ম: যেকোনো অভ্যাস ২ মিনিটের কম সময়ে শুরু করুন।"
      ]
    }
  },
  Logic: {
    en: {
      desc: "Sharpening your critical thinking and objective reasoning skills.",
      benefits: ["Better decision making", "Reduced emotional bias", "Clarity in complex situations", "Improved problem-solving"],
      advise: [
        "Identify the underlying assumptions in every argument.",
        "Seek out counter-arguments to your own beliefs.",
        "Practice deduction through puzzles or coding challenges.",
        "Learn to recognize common logical fallacies (e.g., Strawman).",
        "Use First Principles Thinking: Break things down to basic truths."
      ],
      perfectRoutine: [
        { time: "07:30", task: "15-min Logic Puzzle or Chess" },
        { time: "12:00", task: "Analysis: Critical reading of one article" },
        { time: "16:00", task: "Strategic Planning / Decision Journaling" },
        { time: "19:00", task: "Reasoning Practice (Debate or Philosophy)" }
      ],
      studyTips: [
        "Socratic Questioning: Ask 'Why?' and 'How do we know?'",
        "Mental Models: Use frameworks like Occam's Razor or Pareto Principle.",
        "Decision Journal: Record why you made a choice and review it later."
      ]
    },
    bn: {
      desc: "আপনার সমালোচনামূলক চিন্তাভাবনা এবং বস্তুনিষ্ঠ যুক্তির দক্ষতা তীক্ষ্ণ করা।",
      benefits: ["উন্নত সিদ্ধান্ত গ্রহণ", "আবেগজনিত পক্ষপাত হ্রাস", "জটিল পরিস্থিতিতে স্পষ্টতা", "উন্নত সমস্যা সমাধান"],
      advise: [
        "প্রতিটি যুক্তির পেছনের অন্তর্নিহিত অনুমানগুলো চিহ্নিত করুন।",
        "আপনার নিজের বিশ্বাসের বিরুদ্ধে যুক্তিগুলোও খুঁজে দেখুন।",
        "ধাঁধা বা কোডিং চ্যালেঞ্জের মাধ্যমে যুক্তিচর্চা করুন।",
        "সাধারণ লজিক্যাল ফ্যালাসি বা যুক্তির ভুলগুলো চিনতে শিখুন।",
        "ফার্স্ট প্রিন্সিপল থিংকিং: বিষয়গুলোকে মৌলিক সত্যে বিভক্ত করুন।"
      ],
      perfectRoutine: [
        { time: "০৭:৩০", task: "১৫ মিনিটের লজিক পাজল বা দাবা খেলা" },
        { time: "১২:০০", task: "বিশ্লেষণ: একটি প্রবন্ধ গুরুত্ব দিয়ে পড়া" },
        { time: "১৬:০০", task: "কৌশলগত পরিকল্পনা / সিদ্ধান্ত নেওয়ার ডায়েরি লেখা" },
        { time: "১৯:০০", task: "যুক্তিচর্চা (বিতর্ক বা দর্শন আলোচনা)" }
      ],
      studyTips: [
        "সক্রেটিক কোয়েশ্চেনিং: 'কেন?' এবং 'আমরা কীভাবে জানি?' জিজ্ঞাসা করুন।",
        "মেন্টাল মডেল: ওক্যাম’স রেজোর বা প্যারেটো প্রিন্সিপলের মতো ফ্রেমওয়ার্ক ব্যবহার করুন।",
        "ডিসিশন জার্নাল: কোনো সিদ্ধান্ত কেন নিলেন তা লিখে রাখুন এবং পরে পর্যালোচনা করুন।"
      ]
    }
  },
  Health: {
    en: {
      desc: "The physical foundation (sleep, diet, movement) for mental output.",
      benefits: ["Stable energy levels", "Improved neuroplasticity", "Better mood regulation", "Long-term brain health"],
      advise: [
        "Sleep is the foundation of all cognitive performance.",
        "Hydrate consistently; even mild dehydration drops focus by 20%.",
        "Eat 'Brain Foods': Walnuts, berries, and omega-3 sources.",
        "Prioritize sunlight in the morning to regulate circadian rhythm.",
        "Include resistance training to improve neuroplasticity."
      ],
      perfectRoutine: [
        { time: "06:15", task: "Sunlight Exposure + Hydration (500ml)" },
        { time: "13:00", task: "Walk / Movement Block (Post-Lunch)" },
        { time: "18:30", task: "Last Heavy Meal / Wind-down Phase" },
        { time: "22:15", task: "Magnesium/Zinc + Darkness Protocol" }
      ],
      studyTips: [
        "The 20-20-20 Rule: Every 20 mins, look 20 feet away for 20 seconds.",
        "Nasal Breathing: Increases oxygenation and calms the mind.",
        "Cold Exposure: Short cold showers to boost dopamine and alertness."
      ]
    },
    bn: {
      desc: "মানসিক কর্মক্ষমতার জন্য শারীরিক ভিত্তি (ঘুম, খাদ্যতালিকায়, ব্যায়াম)।",
      benefits: ["স্থির শক্তির স্তর", "উন্নত নিউরোপ্লাস্টিসিটি", "উন্নত মেজাজ নিয়ন্ত্রণ", "দীর্ঘমেয়াদী মস্তিষ্কের স্বাস্থ্য"],
      advise: [
        "পর্যাপ্ত ঘুম হলো সমস্ত মানসিক ও শারীরিক কাজের ভিত্তি।",
        "পর্যাপ্ত পানি পান করুন; ডিহাইড্রেশন মনোযোগ ২০% পর্যন্ত কমিয়ে দেয়।",
        "মস্তিষ্কের জন্য উপকারী খাবার খান: আখরোট, বেরি এবং ওমেগা-৩ যুক্ত খাবার।",
        "সকালের সূর্যের আলো গায়ে লাগান, যা আপনার শরীরের স্বাভাবিক ছন্দ বজায় রাখে।",
        "নিউরোপ্লাস্টিসিটি উন্নত করতে শারীরিক ব্যায়াম বা রেজিস্ট্যান্স ট্রেনিং করুন।"
      ],
      perfectRoutine: [
        { time: "০৬:১৫", task: "সূর্যের আলো গায়ে লাগানো + পানি পান (৫০০ মিলি)" },
        { time: "১৩:০০", task: "হাঁটাচলা / মুভমেন্ট ব্লক (দুপুরের খাবারের পর)" },
        { time: "১৮:৩০", task: "দিনের শেষ ভারী খাবার / বিশ্রাম শুরু করা" },
        { time: "২২:১৫", task: "ম্যাগনেসিয়াম/জিঙ্ক গ্রহণ + অন্ধকার পরিবেশ নিশ্চিত করা" }
      ],
      studyTips: [
        "২০-২০-২০ নিয়ম: প্রতি ২০ মিনিট পর ২০ ফুট দূরে ২০ সেকেন্ডের জন্য তাকান।",
        "নাকের মাধ্যমে শ্বাস নেওয়া: অক্সিজেনের মাত্রা বাড়ায় এবং মন শান্ত রাখে।",
        "কোল্ড এক্সপোজার: ডোপামিন ও সতর্কতা বাড়াতে অল্প সময়ের জন্য ঠান্ডা পানিতে গোসল।"
      ]
    }
  }
};

const PRAYER_TIMELINE_DETAILS = {
  Fajr: {
    spiritual: "Establishment of the first covenant of the day with Allah.",
    mental: "Boosts cortisol levels naturally for alertness and resets circadian rhythm.",
    task: "Intentionality: Write your 'Big 3' objectives for the day."
  },
  Dhuhr: {
    spiritual: "A sanctuary in the peak of worldly distraction.",
    mental: "Provides a 'Cognitive Reset' when decision fatigue starts to set in.",
    task: "Brain Dump: Clear all mental open loops onto paper."
  },
  Asr: {
    spiritual: "The 'Middle Prayer' – a test of consistency and priority.",
    mental: "Reduces afternoon anxiety and improves evening focus duration.",
    task: "Physical Check: 5-min stretching or postural correction."
  },
  Maghrib: {
    spiritual: "The transition from action to reflection as the sun sets.",
    mental: "Triggers the production of melatonin and gratitude-based dopamine.",
    task: "Shukr List: Recall 3 specific blessings from the last 12 hours."
  },
  Isha: {
    spiritual: "The final entrustment of the soul before sleep.",
    mental: "Lowers physiological arousal and prepares the brain for deep REM sleep.",
    task: "Muhasabah: 5-min review of your deeds vs your intentions."
  }
};

// ════════════════════════════════
// UI Logic Snippet
// ════════════════════════════════
function showPillarDetail(name) {
  const lang = Lang.get();
  const data = PILLAR_DETAILS[name] ? PILLAR_DETAILS[name][lang] : null;
  if (!data) return;

  const isBn = (lang === 'bn');
  const t = {
    desc: isBn ? "বিবরণ" : "Description",
    benefits: isBn ? "উপকারিতা" : "Benefits",
    rules: isBn ? "৫টি প্রধান নিয়ম" : "The 5 Key Rules",
    routine: isBn ? "আদর্শ রুটিন" : "Perfect Routine",
    tips: isBn ? "পরামর্শ ও টিপস" : "Techniques & Tips",
    close: isBn ? "✕ বন্ধ করুন" : "✕ Close"
  };

  const dimNames = {
    'Study': isBn ? 'পড়াশোনা' : 'Study',
    'Focus': isBn ? 'মনোযোগ' : 'Focus',
    'Consistency': isBn ? 'ধারাবাহিকতা' : 'Consistency',
    'Logic': isBn ? 'যুক্তি' : 'Logic',
    'Health': isBn ? 'স্বাস্থ্য' : 'Health'
  };

  const displayName = dimNames[name] || name;

  const headerHtml = `
    <h2 style="color: var(--accent); margin-bottom: 5px; font-size: 28px;">${displayName}</h2>
    <p style="font-size: 16px; color: var(--muted);">${data.desc}</p>
  `;

  const bodyHtml = `
    <div class="pillar-detail-view" style="color: var(--text)">
      <div style="margin-bottom: 30px;">
        <div class="card-label" style="font-size: 12px; margin-bottom: 12px; color: var(--accent2)">${t.benefits}</div>
        <div style="display: flex; flex-wrap: wrap; gap: 10px;">
          ${data.benefits.map(b => `<span style="background: var(--accent)15; color: var(--accent); padding: 6px 14px; border-radius: 20px; font-size: 13px; border: 1px solid var(--accent)30">${b}</span>`).join('')}
        </div>
      </div>
      
      <div class="pillar-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; margin-bottom: 30px;">
        <div class="pillar-col">
          <div class="card-label" style="font-size: 12px; margin-bottom: 15px; color: var(--success)">${t.rules}</div>
          <ul class="wellness-list" style="padding-left: 20px; font-size: 14px; line-height: 1.8; color: var(--text-dim)">
            ${data.advise.map(r => `<li>${r}</li>`).join('')}
          </ul>
        </div>
        
        <div class="pillar-col">
          <div class="card-label" style="font-size: 12px; margin-bottom: 15px; color: var(--warn)">${t.routine}</div>
          <div class="mini-timeline" style="border-left: 2px solid var(--border); padding-left: 20px;">
            ${data.perfectRoutine.map(r => `
              <div class="mini-timeline-item" style="margin-bottom: 15px; font-size: 14px;">
                <strong style="color: var(--text);">${r.time}</strong> — <span style="color: var(--text-dim)">${r.task}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <div class="card-label" style="margin-top:1.5rem; font-size: 12px; color: var(--accent3)">${t.tips}</div>
      <div class="tips-row" style="display: flex; flex-wrap: wrap; gap: 10px; margin-top: 15px;">
        ${data.studyTips.map(t => `<span class="tip-chip" style="background: var(--surface-hi); padding: 8px 16px; border-radius: 10px; font-size: 13px; border: 1px solid var(--border)">${t}</span>`).join('')}
      </div>
    </div>
  `;

  // Render to the full-page container
  const headerContainer = document.getElementById('pillar-detail-header-content');
  const bodyContainer = document.getElementById('pillar-detail-body');
  
  if (headerContainer && bodyContainer) {
    headerContainer.innerHTML = headerHtml;
    bodyContainer.innerHTML = bodyHtml;
    
    // Update close button text
    const closeBtn = document.querySelector('#page-pillar-detail .btn-outline');
    if (closeBtn) closeBtn.textContent = t.close;

    // Hide other pages and show this one
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    document.getElementById('page-pillar-detail').style.display = 'block';
    // Hide navbar for full page focus
    document.getElementById('navbar').style.display = 'none';
    
    window.scrollTo(0,0);
  }
}

// Override App.showPage to handle navbar restoration
if (typeof App !== 'undefined') {
    const originalShowPage = App.showPage;
    App.showPage = async function(name) {
        if (['dashboard', 'quiz', 'progress', 'all-logs', 'profile'].includes(name)) {
            document.getElementById('navbar').style.display = 'flex';
        }
        return originalShowPage(name);
    };
}

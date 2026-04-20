/**
 * ═══════════════════════════════════════════════
 * mental_health.js — Diagnostic Module & Solutions
 * ═══════════════════════════════════════════════
 */

const MH_MODULE = {
  questions: {
    Depression: [
      { q: "How often have you felt little interest or pleasure in doing things?", o: ["Not at all", "Several days", "More than half the days", "Nearly every day"], s: [0, 1, 2, 3] },
      { q: "How often have you felt down, depressed, or hopeless?", o: ["Not at all", "Several days", "More than half the days", "Nearly every day"], s: [0, 1, 2, 3] },
      { q: "Trouble falling or staying asleep, or sleeping too much?", o: ["Not at all", "Several days", "More than half the days", "Nearly every day"], s: [0, 1, 2, 3] },
      { q: "Feeling tired or having little energy?", o: ["Not at all", "Several days", "More than half the days", "Nearly every day"], s: [0, 1, 2, 3] },
      { q: "Poor appetite or overeating?", o: ["Not at all", "Several days", "More than half the days", "Nearly every day"], s: [0, 1, 2, 3] }
    ],
    Anxiety: [
      { q: "Feeling nervous, anxious, or on edge?", o: ["Not at all", "Several days", "More than half the days", "Nearly every day"], s: [0, 1, 2, 3] },
      { q: "Not being able to stop or control worrying?", o: ["Not at all", "Several days", "More than half the days", "Nearly every day"], s: [0, 1, 2, 3] },
      { q: "Worrying too much about different things?", o: ["Not at all", "Several days", "More than half the days", "Nearly every day"], s: [0, 1, 2, 3] },
      { q: "Trouble relaxing?", o: ["Not at all", "Several days", "More than half the days", "Nearly every day"], s: [0, 1, 2, 3] },
      { q: "Becoming easily annoyed or irritable?", o: ["Not at all", "Several days", "More than half the days", "Nearly every day"], s: [0, 1, 2, 3] }
    ],
    MoodSwings: [
      { q: "Do you experience sudden shifts in mood (e.g., from very high to very low)?", o: ["Never", "Rarely", "Sometimes", "Frequently"], s: [0, 1, 2, 3] },
      { q: "Do these mood shifts affect your relationships or work?", o: ["Not at all", "Slightly", "Moderately", "Severely"], s: [0, 1, 2, 3] },
      { q: "Do you feel extremely energetic or 'on top of the world' for no reason?", o: ["Never", "Rarely", "Sometimes", "Frequently"], s: [0, 1, 2, 3] },
      { q: "Do you experience periods of intense anger or rage followed by guilt?", o: ["Never", "Rarely", "Sometimes", "Frequently"], s: [0, 1, 2, 3] },
      { q: "Do you feel like your thoughts are racing too fast to keep up with?", o: ["Never", "Rarely", "Sometimes", "Frequently"], s: [0, 1, 2, 3] }
    ]
  },

  solutions: {
    Depression: {
      Severe: {
        ayah: "Surah Ash-Sharh (94:5-6): 'For indeed, with hardship [will be] ease. Indeed, with hardship [will be] ease.'",
        sunnah: "Increase 'Amal Salih (good deeds) and seek professional counseling alongside spiritual support.",
        adhkar: "Recite 'Ya Hayyu Ya Qayyum bi rahmatika astagheeth' (O Ever-Living, O Self-Sustaining, by Your mercy I seek help).",
        scientific: "CBT (Cognitive Behavioral Therapy), Behavioral Activation, and consultation with a psychiatrist for potential medication (SSRIs).",
        bn_adhkar: "পাঠ করুন 'ইয়া হাইয়ু ইয়া কাইয়ূম বি রাহমাতিকা আস্তাগীস' (হে চিরঞ্জীব, হে মহাবিশ্বের ধারক, আপনার রহমতের উসিলায় আমি সাহায্য প্রার্থনা করছি)।",
        bn_scientific: "সিবিটি (কগনিটিভ বিহেভিয়ারাল থেরাপি), বিহেভিয়ারাল অ্যাক্টিভেশন এবং প্রয়োজনে মনোরোগ বিশেষজ্ঞের পরামর্শ গ্রহণ।"
      },
      Moderate: {
        ayah: "Surah Ad-Duha (93:3): 'Your Lord has not taken leave of you, [O Muhammad], nor has He detested [you].'",
        sunnah: "Daily walk in nature (Tafakkur) and keeping a 'Small Wins' journal for Allah's sake.",
        adhkar: "Recite 'La hawla wala quwwata illa billah' (There is no power nor might except with Allah).",
        scientific: "Regular aerobic exercise (3-4 times/week), Mindfulness-Based Cognitive Therapy (MBCT), and light therapy.",
        bn_adhkar: "পাঠ করুন 'লা হাওলা ওয়ালা কুওয়াতা ইল্লা বিল্লাহ' (আল্লাহর সাহায্য ছাড়া আর কোনো উপায় নেই, কোনো শক্তি নেই)।",
        bn_scientific: "নিয়মিত অ্যারোবিক ব্যায়াম (সপ্তাহে ৩-৪ বার), মাইন্ডফুলনেস-বেজড কগনিটিভ থেরাপি (MBCT) এবং লাইট থেরাপি।"
      },
      Mild: {
        ayah: "Surah Al-Baqarah (2:155): 'And We will surely test you... but give good tidings to the patient.'",
        sunnah: "Sunnah of Talbinah (barley soup) to soothe the heart.",
        adhkar: "Recite 'Alhamdulillah' 33x daily with focus on specific blessings.",
        scientific: "Gratitude journaling, improving sleep hygiene, and increasing social interaction.",
        bn_adhkar: "প্রতিদিন ৩৩ বার 'আলহামদুলিল্লাহ' পাঠ করুন এবং নির্দিষ্ট নিয়ামতগুলোর কথা স্মরণ করুন।",
        bn_scientific: "কৃতজ্ঞতা জার্নাল রাখা, ঘুমের অভ্যাস উন্নত করা এবং সামাজিক যোগাযোগ বৃদ্ধি করা।"
      }
    },
    Anxiety: {
      Severe: {
        ayah: "Surah Ar-Ra'd (13:28): 'Unquestionably, by the remembrance of Allah hearts are assured.'",
        sunnah: "Consistent Tahajjud for emotional venting and deep connection.",
        adhkar: "Recite 'HasbunAllahu wa ni'mal wakeel' (Allah is sufficient for us, and He is the best Disposer of affairs).",
        scientific: "Exposure Therapy, grounding techniques (5-4-3-2-1 method), and professional therapeutic intervention.",
        bn_adhkar: "পাঠ করুন 'হাসবুনাল্লাহু ওয়া নিমাল ওয়াকিল' (আল্লাহই আমাদের জন্য যথেষ্ট এবং তিনিই শ্রেষ্ঠ কর্মবিধায়ক)।",
        bn_scientific: "এক্সপোজার থেরাপি, গ্রাউন্ডিং টেকনিক (৫-৪-৩-২-১ পদ্ধতি) এবং পেশাদার থেরাপিউটিক সহায়তা।"
      },
      Moderate: {
        ayah: "Surah Al-Imran (3:173): '...They said, \"Sufficient for us is Allah, and [He is] the best Disposer of affairs.\"'",
        sunnah: "Practice 'Wudu' as a sensory grounding technique during panic.",
        adhkar: "Morning and Evening Adhkar (Protective prayers).",
        scientific: "Progressive Muscle Relaxation (PMR), limited caffeine intake, and box breathing (4-4-4-4 technique).",
        bn_adhkar: "সকাল ও সন্ধ্যার আজকার (সুরক্ষামূলক দোয়া) পাঠ করুন।",
        bn_scientific: "প্রগ্রেসিভ মাসল রিলাক্সেশন (PMR), ক্যাফেইন গ্রহণ কমানো এবং বক্স ব্রিদিং (৪-৪-৪-৪ পদ্ধতি)।"
      },
      Mild: {
        ayah: "Surah Al-Baqarah (2:286): 'Allah does not charge a soul except [with that within] its capacity.'",
        sunnah: "Engage in physical 'Amanah' (exercise) to burn off nervous energy.",
        adhkar: "Recite 'Astaghfirullah' to clear mental clutter.",
        scientific: "Daily mindfulness meditation, reducing screen time, and structured worry time (15 mins/day).",
        bn_adhkar: "মানসিক অস্থিরতা কমাতে বেশি বেশি 'আস্তাগফিরুল্লাহ' পাঠ করুন।",
        bn_scientific: "প্রতিদিন মাইন্ডফুলনেস মেডিটেশন, স্ক্রিন টাইম কমানো এবং নির্দিষ্ট সময়ে চিন্তা করার অভ্যাস করা।"
      }
    },
    MoodSwings: {
      Severe: {
        ayah: "Surah Al-A'raf (7:199): 'Show forgiveness, enjoin what is good, and turn away from the ignorant.'",
        sunnah: "Sunnah of remaining silent when angry and changing physical position (sit if standing).",
        adhkar: "Recite 'A'udhu billahi minash-shaytanir-rajim' during emotional spikes.",
        scientific: "Dialectical Behavior Therapy (DBT), mood tracking apps, and stabilized sleep-wake cycles (Social Rhythm Therapy).",
        bn_adhkar: "আবেগপ্রবণ মুহূর্তে 'আউযুবিল্লাহি মিনাশ শাইতানির রাজিম' পাঠ করুন।",
        bn_scientific: "ডায়ালেক্টিক্যাল বিহেভিয়ার থেরাপি (DBT), মুড ট্র্যাকিং অ্যাপ এবং নিয়মিত ঘুমের রুটিন মেনে চলা।"
      },
      Moderate: {
        ayah: "Surah Fussilat (41:34): 'Repel [evil] by that [deed] which is better...'",
        sunnah: "Fasting Mondays and Thursdays to regulate self-discipline and hormones.",
        adhkar: "Recite 'SubhanAllah' during highs and 'Alhamdulillah' during lows to maintain balance.",
        scientific: "Identifying emotional triggers, omega-3 fatty acid supplementation, and stress management techniques.",
        bn_adhkar: "আবেগের উচ্চাবস্থায় 'সুবহানাল্লাহ' এবং নিম্নাবস্থায় 'আলহামদুলিল্লাহ' পাঠ করে ভারসাম্য বজায় রাখুন।",
        bn_scientific: "আবেগের ট্রিগারগুলো চেনা, ওমেগা-৩ ফ্যাটি অ্যাসিড গ্রহণ এবং স্ট্রেস ম্যানেজমেন্ট কৌশল।"
      },
      Mild: {
        ayah: "Surah Ash-Shura (42:37): 'And those who avoid the major sins and immoralities, and when they are angry, they forgive.'",
        sunnah: "Drinking water in three breaths to calm the nervous system.",
        adhkar: "Recite 'Ya Muqallibal-qulub, thabbit qalbi 'ala dinik' (O Turner of hearts, keep my heart firm on Your religion).",
        scientific: "Journaling emotional patterns, regular balanced meals to stabilize blood sugar, and yoga.",
        bn_adhkar: "পাঠ করুন 'ইয়া মুকাল্লিবাল কুলুব সাব্বিত কালবি আলা দীনিক' (হে অন্তরসমূহের পরিবর্তনকারী, আমার অন্তরকে আপনার দ্বীনের ওপর অবিচল রাখুন)।",
        bn_scientific: "আবেগের ধরণগুলো ডায়েরিতে লিখে রাখা, সুষম খাবার গ্রহণ এবং যোগব্যায়াম।"
      }
    }
  },

  prayerRoutine: [
    { prayer: "Fajr", focus: "Goal Setting & Intentions", activity: "Niyyah (Intention) for the day, review top 3 tasks." },
    { prayer: "Dhuhr", focus: "Deep Work Break & Refresh", activity: "Sunnah Nap (Qaylulah) or 10-min mental reset." },
    { prayer: "Asr", focus: "Physical Health & Movement", activity: "Stretching or quick walk to maintain energy." },
    { prayer: "Maghrib", focus: "Gratitude (Shukr)", activity: "List 3 specific blessings from the day." },
    { prayer: "Isha", focus: "Self-Review (Muhasabah)", activity: "Review actions vs intentions, repent and forgive others." }
  ],

  getSeverity: (score) => {
    if (score >= 12) return "Severe";
    if (score >= 7) return "Moderate";
    return "Mild";
  }
};

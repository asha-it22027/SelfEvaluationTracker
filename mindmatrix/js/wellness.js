/**
 * ═══════════════════════════════════════════════
 * wellness.js — Islamic Psychology & CBT Content
 * ═══════════════════════════════════════════════
 */

const WellnessData = {
  // 1. Islamic Wellness Content
  sections: {
    depression: {
      title: "Depression (Istiqamah & Hope)",
      perspective: "Viewed not as a failure, but a period of 'Istiqamah' (steadfastness) through emotional heaviness. It is a trial that purifies the soul and draws one closer to the Creator.",
      symptoms: [
        "Inability to find joy in 'Ibadah (worship)",
        "Social withdrawal from the Ummah",
        "Loss of hope in Allah's Mercy (Ya's)"
      ],
      solutions: [
        "Tahajjud for emotional release and private conversation with Allah.",
        "Recitation of Surah Ad-Duha and Surah Ash-Sharh (The Relief).",
        "Daily Adhkar (Morning/Evening) to ground the heart.",
        "Connecting with a supportive community (Suhbah).",
        "Small, consistent good deeds ('Amal Salih) even when motivation is low."
      ]
    },
    anxiety: {
      title: "Anxiety (Tawakkul & Presence)",
      perspective: "Anxiety often stems from over-attachment to future outcomes. The remedy lies in 'Tawakkul' (Complete Trust) and 'Rida' (Contentment with the Decree).",
      symptoms: [
        "Excessive worry about 'Rizq' (provision/future)",
        "Restlessness during Salah (lack of Khushu)",
        "Fear of people or circumstances more than the Creator"
      ],
      solutions: [
        "Practicing 'Tafakkur' (Reflection) on the attributes of Allah (Al-Wakil, Al-Hafiz).",
        "Focusing on the present moment through 'Muraqabah'.",
        "Dua: 'O Allah, I seek refuge in You from anxiety and grief...'",
        "Physical exercise as a form of 'Amanah' (trust) over the body.",
        "Limiting exposure to 'Fitna' (distracting/negative news/media)."
      ]
    },
    stress: {
      title: "Stress (Sabr & Balance)",
      perspective: "Stress is an imbalance between worldly demands and spiritual recharge. 'Sabr' is the active tool to manage pressure with dignity.",
      symptoms: [
        "Irritability and loss of 'Hilm' (forbearance)",
        "Neglecting the Sunnah of sleep and nutrition",
        "Feeling 'overwhelmed' by the Dunya (worldly life)"
      ],
      solutions: [
        "Using Salah as a mindful 'break' from the world, not just a task.",
        "The Sunnah of 'Qaylulah' (mid-day nap) for mental resetting.",
        "Delegating results to Allah (Tawakkul) after doing one's best.",
        "Deep breathing (Nafas) while reciting 'SubhanAllah'.",
        "Weekly 'Muhasabah' to prioritize what truly matters for the Akhirah."
      ]
    }
  },

  // 2. Mood History (Spiritual Context)
  moodStates: {
    "happy": { state: "Shukr", concept: "Gratefulness", color: "#00ffaa", icon: "😊" },
    "sad": { state: "Sabr", concept: "Patience", color: "#7c50ff", icon: "😔" },
    "anxious": { state: "Tawakkul", concept: "Trust", color: "#ffcc00", icon: "😟" },
    "guilty": { state: "Tawbah", concept: "Repentance", color: "#ff2d78", icon: "😓" },
    "calm": { state: "Sakinah", concept: "Tranquility", color: "#00e5ff", icon: "😌" }
  },

  // 3. Daily Reflection Tips (Islamic Techniques)
  reflectionTips: [
    {
      name: "Muraqabah (Mindfulness)",
      description: "The state of being aware that Allah is always watching you. Practice sitting in silence for 5 minutes, focusing on your breath and the presence of your Creator."
    },
    {
      name: "Muhasabah (Self-Review)",
      description: "Take 5 minutes before sleep to review your day. Ask: 'What did I do for Allah today? Where can I improve tomorrow?'"
    },
    {
      name: "Dhikr & Tasbih",
      description: "Engage in rhythmic remembrance (SubhanAllah, Alhamdulillah, Allahu Akbar). This regulates the nervous system and centers the heart."
    }
  ]
};

// Logic to integrate Mood with Spiritual States
function getSpiritualMood(moodKey) {
  return WellnessData.moodStates[moodKey] || { state: "Balanced", concept: "Moderation", color: "#888", icon: "😐" };
}

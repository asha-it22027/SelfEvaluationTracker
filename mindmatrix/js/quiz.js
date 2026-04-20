/**
 * ═══════════════════════════════════════════════
 * quiz.js — Complete Assessment Engine
 * ═══════════════════════════════════════════════
 */

const QUESTIONS = {
  Study: [
    { 
      q: "How often do you use active recall (testing yourself) while studying?", 
      bn_q: "পড়ার সময় আপনি কতবার 'অ্যাক্টিভ রিকল' (নিজেকে যাচাই করা) পদ্ধতি ব্যবহার করেন?",
      o: ["Never", "Rarely", "Sometimes", "Always"], 
      bn_o: ["কখনোই না", "খুব কম", "মাঝে মাঝে", "সব সময়"],
      s: [0, 1, 2, 3] 
    },
    { 
      q: "Do you plan your study sessions in advance?", 
      bn_q: "আপনি কি আপনার পড়াশোনার সময় আগে থেকে পরিকল্পনা করেন?",
      o: ["Not at all", "Rarely", "Often", "Every time"], 
      bn_o: ["একদম না", "খুব কম", "মাঝে মাঝে", "প্রতিবার"],
      s: [0, 1, 2, 3] 
    },
    { 
      q: "How well can you explain what you learned to someone else?", 
      bn_q: "আপনি যা শিখেছেন তা অন্য কাউকে কতটা ভালোভাবে বোঝাতে পারেন?",
      o: ["Not at all", "With difficulty", "Fairly well", "Perfectly"], 
      bn_o: ["একদম না", "কষ্ট হয়", "মোটামুটি ভালো", "খুব সুন্দরভাবে"],
      s: [0, 1, 2, 3] 
    },
    { 
      q: "Do you review your notes within 24 hours of taking them?", 
      bn_q: "নোট নেওয়ার ২৪ ঘণ্টার মধ্যে কি আপনি তা পুনরায় দেখেন?",
      o: ["Never", "Rarely", "Sometimes", "Always"], 
      bn_o: ["কখনোই না", "খুব কম", "মাঝে মাঝে", "সব সময়"],
      s: [0, 1, 2, 3] 
    },
    { 
      q: "How often do you get distracted by your phone while studying?", 
      bn_q: "পড়ার সময় ফোন দেখে আপনার মনোযোগ কতবার নষ্ট হয়?",
      o: ["Always", "Often", "Rarely", "Never"], 
      bn_o: ["সব সময়", "মাঝে মাঝে", "খুব কম", "কখনোই না"],
      s: [0, 1, 2, 3] 
    },
    { 
      q: "Do you use spaced repetition techniques?", 
      bn_q: "আপনি কি 'স্পেসড রিপিটিশন' (বিরতি দিয়ে পুনরাবৃত্তি) পদ্ধতি ব্যবহার করেন?",
      o: ["What is that?", "No", "Sometimes", "Yes, regularly"], 
      bn_o: ["সেটা কী?", "না", "মাঝে মাঝে", "হ্যাঁ, নিয়মিত"],
      s: [0, 0, 2, 3] 
    },
    { 
      q: "How organized are your study materials?", 
      bn_q: "আপনার পড়ার সামগ্রী কতটা গুছিয়ে রাখেন?",
      o: ["Complete mess", "Somewhat messy", "Fairly organized", "Very organized"], 
      bn_o: ["অগোছালো", "মোটামুটি অগোছালো", "মোটামুটি গোছানো", "খুবই গোছানো"],
      s: [0, 1, 2, 3] 
    },
    { 
      q: "Do you take regular breaks during long study sessions?", 
      bn_q: "দীর্ঘ সময় পড়ার মাঝে আপনি কি নিয়মিত বিরতি নেন?",
      o: ["Never", "Rarely", "Sometimes", "Yes (Pomodoro/similar)"], 
      bn_o: ["কখনোই না", "খুব কম", "মাঝে মাঝে", "হ্যাঁ (পোমোডোরো/অনুরূপ)"],
      s: [0, 1, 2, 3] 
    },
    { 
      q: "How often do you complete your planned study goals for the day?", 
      bn_q: "দিনের নির্ধারিত পড়ার লক্ষ্য আপনি কতবার সফলভাবে শেষ করেন?",
      o: ["0%", "Around 25%", "Around 75%", "100%"], 
      bn_o: ["০%", "প্রায় ২৫%", "মোটামুটি ৭৫%", "১০০%"],
      s: [0, 1, 2, 3] 
    },
    { 
      q: "Do you seek help or research immediately when you don't understand a concept?", 
      bn_q: "কোনো বিষয় না বুঝলে আপনি কি সাথে সাথে কারো সাহায্য নেন বা রিসার্চ করেন?",
      o: ["Never", "Rarely", "Usually", "Always"], 
      bn_o: ["কখনোই না", "খুব কম", "সাধারণত", "সব সময়"],
      s: [0, 1, 2, 3] 
    }
  ],
  Focus: [
    { 
      q: "How long can you work on a single task without any interruption?", 
      bn_q: "বিরতি ছাড়া আপনি এক টানা কতক্ষণ কাজ করতে পারেন?",
      o: ["< 5 mins", "15 mins", "30 mins", "1 hour+"], 
      bn_o: ["৫ মিনিটের কম", "১৫ মিনিট", "৩০ মিনিট", "১ ঘণ্টার বেশি"],
      s: [0, 1, 2, 3] 
    },
    { 
      q: "Do you work in a dedicated, clutter-free space?", 
      bn_q: "আপনি কি পড়ার বা কাজের জন্য একটি নির্দিষ্ট ও পরিষ্কার জায়গা ব্যবহার করেন?",
      o: ["No", "Sometimes", "Usually", "Always"], 
      bn_o: ["না", "মাঝে মাঝে", "সাধারণত", "সব সময়"],
      s: [0, 1, 2, 3] 
    },
    { 
      q: "How often do you multitask?", 
      bn_q: "আপনি একসাথে কতগুলো কাজ করার চেষ্টা করেন?",
      o: ["Always", "Often", "Sometimes", "Rarely"], 
      bn_o: ["সব সময়", "মাঝে মাঝে", "খুব কম", "কদাচিৎ"],
      s: [0, 1, 2, 3] 
    },
    { 
      q: "Do you use 'Deep Work' sessions (no notifications, total focus)?", 
      bn_q: "আপনি কি 'ডিপ ওয়ার্ক' (ফোন বন্ধ করে পূর্ণ মনোযোগ) সেশন করেন?",
      o: ["Never", "Rarely", "Sometimes", "Daily"], 
      bn_o: ["কখনোই না", "খুব কম", "মাঝে মাঝে", "প্রতিদিন"],
      s: [0, 1, 2, 3] 
    },
    { 
      q: "How easy is it for you to get back into 'the zone' after an interruption?", 
      bn_q: "কাজের মাঝে বাধা আসলে পুনরায় পূর্ণ মনোযোগ ফিরে পাওয়া আপনার জন্য কতটা সহজ?",
      o: ["Impossible", "Difficult", "Somewhat easy", "Very easy"], 
      bn_o: ["অসম্ভব", "কঠিন", "মোটামুটি সহজ", "খুবই সহজ"],
      s: [0, 1, 2, 3] 
    },
    { 
      q: "Do you have a clear 'next action' before starting a work block?", 
      bn_q: "কাজ শুরু করার আগে আপনার কি পরবর্তী পদক্ষেপ পরিষ্কার জানা থাকে?",
      o: ["Never", "Rarely", "Usually", "Always"], 
      bn_o: ["কখনোই না", "খুব কম", "সাধারণত", "সব সময়"],
      s: [0, 1, 2, 3] 
    },
    { 
      q: "How often do you check social media during work hours?", 
      bn_q: "কাজের মাঝে কতবার সোশ্যাল মিডিয়া চেক করেন?",
      o: ["Constantly", "Often", "Rarely", "Never"], 
      bn_o: ["অনবরত", "মাঝে মাঝে", "খুব কম", "কখনোই না"],
      s: [0, 1, 2, 3] 
    },
    { 
      q: "Do you use tools to block distracting websites/apps?", 
      bn_q: "মনোযোগ নষ্টকারী অ্যাপ বা ওয়েবসাইট বন্ধ রাখতে আপনি কি কোনো টুল ব্যবহার করেন?",
      o: ["No", "Tried but failed", "Sometimes", "Yes, effectively"], 
      bn_o: ["না", "চেষ্টা করেছি পারিনি", "মাঝে মাঝে", "হ্যাঁ, কার্যকরভাবে"],
      s: [0, 1, 2, 3] 
    },
    { 
      q: "How focused do you feel during your peak energy hours?", 
      bn_q: "দিনের সবচেয়ে সক্রিয় সময়ে আপনি নিজেকে কতটা মনোযোগী মনে করেন?",
      o: ["Brain fog", "Distracted", "Moderately focused", "Laser focused"], 
      bn_o: ["মাথা ঝিমঝিম করে", "মনোযোগহীন", "মোটামুটি মনোযোগী", "প্রচণ্ড মনোযোগী"],
      s: [0, 1, 2, 3] 
    },
    { 
      q: "Do you finish one task before starting another?", 
      bn_q: "একটি কাজ শেষ হওয়ার আগে কি আপনি অন্য কাজ শুরু করেন না?",
      o: ["Never", "Rarely", "Usually", "Always"], 
      bn_o: ["কখনোই না", "খুব কম", "সাধারণত", "সব সময়"],
      s: [0, 1, 2, 3] 
    }
  ],
  Consistency: [
    { 
      q: "Do you follow a daily routine?", 
      bn_q: "আপনি কি একটি দৈনিক রুটিন মেনে চলেন?",
      o: ["No routine", "Very loose", "Fairly consistent", "Strict routine"], 
      bn_o: ["কোনো রুটিন নেই", "খুবই ঢিলেঢালা", "মোটামুটি নিয়মিত", "কঠোর রুটিন"],
      s: [0, 1, 2, 3] 
    },
    { 
      q: "How often do you wake up and go to bed at the same time?", 
      bn_q: "আপনি প্রতিদিন একই সময়ে ঘুমান ও ঘুম থেকে ওঠেন?",
      o: ["Never", "Rarely", "Usually", "Every day"], 
      bn_o: ["কখনোই না", "খুব কম", "সাধারণত", "প্রতিদিন"],
      s: [0, 1, 2, 3] 
    },
    { 
      q: "If you miss a day of a habit, how quickly do you get back on track?", 
      bn_q: "কোনো একদিন নিয়ম ভঙ্গ হলে আপনি কত দ্রুত পুনরায় তা শুরু করেন?",
      o: ["I give up", "After a week", "Within 2 days", "Next day"], 
      bn_o: ["ছেড়ে দেই", "এক সপ্তাহ পর", "২ দিনের মধ্যে", "পরের দিনই"],
      s: [0, 1, 2, 3] 
    },
    { 
      q: "Do you track your habits/progress?", 
      bn_q: "আপনি কি আপনার অভ্যাস বা অগ্রগতি ট্র্যাক করেন?",
      o: ["No", "Rarely", "Sometimes", "Every day"], 
      bn_o: ["না", "খুব কম", "মাঝে মাঝে", "প্রতিদিন"],
      s: [0, 1, 2, 3] 
    },
    { 
      q: "How often do you finish what you start?", 
      bn_q: "আপনি যা শুরু করেন তা কতবার শেষ করতে পারেন?",
      o: ["Never", "Rarely", "Often", "Always"], 
      bn_o: ["কখনোই না", "খুব কম", "মাঝে মাঝে", "সব সময়"],
      s: [0, 1, 2, 3] 
    },
    { 
      q: "Do you have 'anchor habits' (things you do no matter what)?", 
      bn_q: "আপনার কি কোনো নির্দিষ্ট অভ্যাস আছে যা আপনি যাই ঘটুক না কেন পালন করেন?",
      o: ["None", "One", "A few", "Many"], 
      bn_o: ["একটিও না", "একটি", "কয়েকটি", "অনেকগুলো"],
      s: [0, 1, 2, 3] 
    },
    { 
      q: "How much does your mood affect your productivity?", 
      bn_q: "আপনার মেজাজ বা মুড আপনার কাজের ওপর কতটা প্রভাব ফেলে?",
      o: ["Completely", "Significantly", "Slightly", "Not at all"], 
      bn_o: ["পুরোপুরি", "অনেকটা", "সামান্য", "একদমই না"],
      s: [0, 1, 2, 3] 
    },
    { 
      q: "Do you prepare for the next day the night before?", 
      bn_q: "পরের দিনের প্রস্তুতি কি আপনি আগের রাতেই নিয়ে রাখেন?",
      o: ["Never", "Rarely", "Usually", "Always"], 
      bn_o: ["কখনোই না", "খুব কম", "সাধারণত", "সব সময়"],
      s: [0, 1, 2, 3] 
    },
    { 
      q: "How often do you procrastinate on important tasks?", 
      bn_q: "গুরুত্বপূর্ণ কাজ আপনি কতবার পিছিয়ে দেন (অলসতা করেন)?",
      o: ["Daily", "Often", "Sometimes", "Rarely"], 
      bn_o: ["প্রতিদিন", "মাঝে মাঝে", "মাঝে মাঝে", "খুব কম"],
      s: [0, 1, 2, 3] 
    },
    { 
      q: "Do you keep your promises to yourself?", 
      bn_q: "আপনি কি নিজের কাছে করা ওয়াদাগুলো পূরণ করেন?",
      o: ["Never", "Rarely", "Usually", "Always"], 
      bn_o: ["কখনোই না", "খুব কম", "সাধারণত", "সব সময়"],
      s: [0, 1, 2, 3] 
    }
  ],
  Logic: [
    { 
      q: "Do you double-check facts before forming an opinion?", 
      bn_q: "মতামত দেওয়ার আগে আপনি কি তথ্যগুলো পুনরায় যাচাই করেন?",
      o: ["Never", "Rarely", "Usually", "Always"], 
      bn_o: ["কখনোই না", "খুব কম", "সাধারণত", "সব সময়"],
      s: [0, 1, 2, 3] 
    },
    { 
      q: "How often do you play strategy games (Chess, puzzles, etc.)?", 
      bn_q: "আপনি কতবার কৌশলগত গেম (দাবা, পাজল ইত্যাদি) খেলেন?",
      o: ["Never", "Rarely", "Weekly", "Daily"], 
      bn_o: ["কখনোই না", "খুব কম", "সাপ্তাহিক", "প্রতিদিন"],
      s: [0, 1, 2, 3] 
    },
    { 
      q: "Can you identify logical fallacies in arguments?", 
      bn_q: "তর্কের মধ্যে কি আপনি যুক্তির ভুলগুলো ধরতে পারেন?",
      o: ["What are those?", "No", "Some", "Yes, easily"], 
      bn_o: ["সেগুলো কী?", "না", "কিছুটা", "হ্যাঁ, সহজে"],
      s: [0, 0, 2, 3] 
    },
    { 
      q: "Do you enjoy solving complex problems?", 
      bn_q: "জটিল সমস্যা সমাধান করতে আপনি কি পছন্দ করেন?",
      o: ["Hate it", "Avoid it", "It's okay", "Love it"], 
      bn_o: ["ঘৃণা করি", "এড়িয়ে চলি", "ঠিক আছে", "খুব ভালোবাসি"],
      s: [0, 1, 2, 3] 
    },
    { 
      q: "How often do you look for root causes rather than just symptoms?", 
      bn_q: "আপনি কি শুধু সমস্যা না দেখে তার মূল কারণ খোঁজার চেষ্টা করেন?",
      o: ["Never", "Rarely", "Often", "Always"], 
      bn_o: ["কখনোই না", "খুব কম", "মাঝে মাঝে", "সব সময়"],
      s: [0, 1, 2, 3] 
    },
    { 
      q: "Do you make decisions based on data/evidence or just intuition?", 
      bn_q: "সিদ্ধান্ত নেওয়ার সময় কি আপনি তথ্য-প্রমাণ দেখেন নাকি শুধু নিজের ধারণা ব্যবহার করেন?",
      o: ["Pure intuition", "Mostly intuition", "Mostly data", "Balanced"], 
      bn_o: ["শুধু ধারণা", "বেশিভাগ ধারণা", "বেশিভাগ তথ্য", "ভারসাম্যপূর্ণ"],
      s: [0, 1, 2, 3] 
    },
    { 
      q: "How well can you break down a large problem into small steps?", 
      bn_q: "একটি বড় সমস্যাকে ছোট ছোট ধাপে ভাগ করা আপনার জন্য কতটা সহজ?",
      o: ["I get overwhelmed", "With help", "Fairly well", "Systematically"], 
      bn_o: ["ভয় পেয়ে যাই", "সাহায্য নিয়ে", "মোটামুটি ভালো", "সুশৃঙ্খলভাবে"],
      s: [0, 1, 2, 3] 
    },
    { 
      q: "Do you question your own biases regularly?", 
      bn_q: "আপনি কি আপনার নিজের পক্ষপাতিত্ব নিয়ে নিয়মিত চিন্তা করেন?",
      o: ["Never", "Rarely", "Sometimes", "Always"], 
      bn_o: ["কখনোই না", "খুব কম", "মাঝে মাঝে", "সব সময়"],
      s: [0, 1, 2, 3] 
    },
    { 
      q: "How often do you read challenging or technical material?", 
      bn_q: "আপনি কতবার কঠিন বা প্রযুক্তিগত বিষয়গুলো পড়েন?",
      o: ["Never", "Rarely", "Sometimes", "Regularly"], 
      bn_o: ["কখনোই না", "খুব কম", "মাঝে মাঝে", "নিমিত"],
      s: [0, 1, 2, 3] 
    },
    { 
      q: "Do you use mental models (like Pareto Principle, Occam's Razor)?", 
      bn_q: "আপনি কি কোনো 'মেন্টাল মডেল' ব্যবহার করেন?",
      o: ["No", "Heard of them", "Sometimes", "Regularly"], 
      bn_o: ["না", "নাম শুনেছি", "মাঝে মাঝে", "নিমিত"],
      s: [0, 1, 2, 3] 
    }
  ],
  Health: [
    { 
      q: "How many hours of quality sleep do you get on average?", 
      bn_q: "আপনি গড়ে কত ঘণ্টা ভালো মানের ঘুম ঘুমান?",
      o: ["< 5", "5-6", "6-7", "7-9"], 
      bn_o: ["৫ ঘণ্টার কম", "৫-৬ ঘণ্টা", "৬-৭ ঘণ্টা", "৭-৯ ঘণ্টা"],
      s: [0, 1, 2, 3] 
    },
    { 
      q: "How often do you exercise (30+ mins)?", 
      bn_q: "আপনি কতবার ব্যায়াম করেন (৩০+ মিনিট)?",
      o: ["Never", "1-2 days/week", "3-4 days/week", "5+ days/week"], 
      bn_o: ["কখনোই না", "১-২ দিন", "৩-৪ দিন", "৫+ দিন"],
      s: [0, 1, 2, 3] 
    },
    { 
      q: "How much water do you drink daily?", 
      bn_q: "প্রতিদিন আপনি কতটুকু পানি পান করেন?",
      o: ["< 1L", "1-2L", "2-3L", "3L+"], 
      bn_o: ["১ লিটারের কম", "১-২ লিটার", "২-৩ লিটার", "৩ লিটারের বেশি"],
      s: [0, 1, 2, 3] 
    },
    { 
      q: "How often do you eat processed/junk food?", 
      bn_q: "আপনি কতবার জাঙ্ক ফুড বা প্রসেসড খাবার খান?",
      o: ["Every day", "Often", "Rarely", "Never"], 
      bn_o: ["প্রতিদিন", "মাঝে মাঝে", "খুব কম", "কখনোই না"],
      s: [0, 1, 2, 3] 
    },
    { 
      q: "How do you feel physically most mornings?", 
      bn_q: "সকালে ঘুম থেকে ওঠার পর শারীরিক অবস্থা কেমন মনে হয়?",
      o: ["Exhausted", "Tired", "Okay", "Energetic"], 
      bn_o: ["খুবই ক্লান্ত", "ক্লান্ত", "মোটামুটি", "উদ্যমী"],
      s: [0, 1, 2, 3] 
    },
    { 
      q: "Do you practice mindful eating (no screens, chewing well)?", 
      bn_q: "আপনি কি মনোযোগ দিয়ে খাবার খান (স্ক্রিন ছাড়া, ভালো করে চিবিয়ে)?",
      o: ["Never", "Rarely", "Usually", "Always"], 
      bn_o: ["কখনোই না", "খুব কম", "সাধারণত", "সব সময়"],
      s: [0, 1, 2, 3] 
    },
    { 
      q: "How often do you spend time in nature or direct sunlight?", 
      bn_q: "আপনি কতবার প্রকৃতির মাঝে বা সরাসরি সূর্যের আলোতে সময় কাটান?",
      o: ["Never", "Rarely", "Sometimes", "Daily"], 
      bn_o: ["কখনোই না", "খুব কম", "মাঝে মাঝে", "প্রতিদিন"],
      s: [0, 1, 2, 3] 
    },
    { 
      q: "Do you have a wind-down routine before bed (no screens)?", 
      bn_q: "ঘুমানোর আগে কি আপনার কোনো নির্দিষ্ট নিয়ম আছে (স্ক্রিন ছাড়া)?",
      o: ["No", "Sometimes", "Usually", "Always"], 
      bn_o: ["না", "মাঝে মাঝে", "সাধারণত", "সব সময়"],
      s: [0, 1, 2, 3] 
    },
    { 
      q: "How often do you feel physically stressed or tense?", 
      bn_q: "আপনি কতবার শারীরিক চাপ বা টেনশন অনুভব করেন?",
      o: ["Constantly", "Often", "Sometimes", "Rarely"], 
      bn_o: ["সব সময়", "মাঝে মাঝে", "মাঝে মাঝে", "খুব কম"],
      s: [0, 1, 2, 3] 
    },
    { 
      q: "Do you take care of your posture while working/studying?", 
      bn_q: "পড়া বা কাজের সময় আপনি কি আপনার বসার ভঙ্গি বা পজিশন নিয়ে সচেতন?",
      o: ["Slouching", "Bad", "Try to", "Excellent"], 
      bn_o: ["কুঁজো হয়ে", "খারাপ", "চেষ্টা করি", "খুব ভালো"],
      s: [0, 1, 2, 3] 
    }
  ]
};

const PILLAR_SOLUTIONS = {
  Study: {
    Excellent: "You are a master of learning! Keep mentoring others.",
    Good: "Strong habits. Focus on interleaving subjects to reach the next level.",
    Average: "You're getting there. Start using Active Recall more consistently.",
    Poor: "Your learning efficiency is low. Read about the Feynman Technique.",
    islamic: "Seeking knowledge is an obligation upon every Muslim. Make niyyah for Allah's sake.",
    scientific: "Use Spaced Repetition systems (like Anki) to optimize long-term memory retention."
  },
  Focus: {
    Excellent: "Incredible concentration! You are in the top 1%.",
    Good: "Great focus. Try to extend your deep work sessions by 15 mins.",
    Average: "Too many distractions. Try the 'Phone in another room' rule.",
    Poor: "Severe distraction issues. Start with 10-min Pomodoro sprints.",
    islamic: "Focus is akin to Khushu in Salah. Practice presence in the moment.",
    scientific: "Deep Work by Cal Newport suggests that attention is a muscle that needs training."
  },
  Consistency: {
    Excellent: "Unstoppable discipline. You are building a great life.",
    Good: "Consistent but could improve recovery speed after a missed day.",
    Average: "Inconsistent. Use Habit Stacking to attach new habits to old ones.",
    Poor: "No routine. Start with a fixed wake-up time every single day.",
    islamic: "The most beloved deeds to Allah are those done consistently, even if small.",
    scientific: "Identity-based habits: Don't just 'do' a habit, 'become' that person."
  },
  Logic: {
    Excellent: "Sharp analytical mind. You see patterns others miss.",
    Good: "Good reasoning. Be careful of confirmation bias.",
    Average: "You rely too much on intuition. Look for data and evidence.",
    Poor: "Emotional decision-making. Learn about logical fallacies.",
    islamic: "Allah encourages us to reflect (Tafakkur) and use our intellect (Aql).",
    scientific: "Cognitive Behavioral Therapy (CBT) helps identify and correct flawed logic."
  },
  Health: {
    Excellent: "Peak physical condition. Your body is a well-oiled machine.",
    Good: "Healthy. Monitor your sleep hygiene more closely.",
    Average: "Decent, but junk food and lack of sun are affecting you.",
    Poor: "Critical neglect. Your body is an Amanah; you must take care of it.",
    islamic: "Your body has a right over you. Treat it with the respect it deserves.",
    scientific: "Circadian rhythm alignment is key to hormonal balance and energy."
  }
};

const Quiz = (() => {
  let currentCat = 'full';
  let catIdx = 0;
  let qIdx = 0;
  let answers = {};
  let mhAnswers = {};
  let isMH = false;

  function showIntro() {
    const introEl = document.getElementById('quiz-intro');
    const activeEl = document.getElementById('quiz-active');
    const resultEl = document.getElementById('quiz-result');

    if (introEl) introEl.style.display = 'block';
    if (activeEl) activeEl.style.display = 'none';
    if (resultEl) resultEl.style.display = 'none';

    const isBn = (Lang.get() === 'bn');
    
    // Static UI via IDs
    const titleEl = document.getElementById('quiz-title-text');
    const subEl = document.getElementById('quiz-sub-text');
    const sectionsEl = document.getElementById('assessment-sections-label');
    const fullBtn = document.getElementById('full-quiz-btn-text');
    const mhBtn = document.getElementById('mh-quiz-btn-text');

    if (titleEl) titleEl.textContent = isBn ? "মানসিক মূল্যায়ন" : "Mind Assessment";
    if (subEl) subEl.textContent = isBn ? "৫টি ডাইমেনশন জুড়ে ৫০টি প্রশ্ন" : "50 questions across 5 dimensions";
    if (sectionsEl) sectionsEl.textContent = isBn ? "মূল্যায়ন বিভাগসমূহ" : "Assessment Sections";
    if (fullBtn) fullBtn.textContent = isBn ? "সম্পূর্ণ মানসিক মূল্যায়ন →" : "Full Mind Assessment →";
    if (mhBtn) mhBtn.textContent = isBn ? "🌙 শুধুমাত্র মানসিক স্বাস্থ্য" : "🌙 Mental Health Only";

    const grid = document.getElementById('quiz-cat-overview');
    if (grid && typeof CATS !== 'undefined') {
      const dimNames = {
        'Study': isBn ? 'পড়াশোনা' : 'Study',
        'Focus': isBn ? 'মনোযোগ' : 'Focus',
        'Consistency': isBn ? 'ধারাবাহিকতা' : 'Consistency',
        'Logic': isBn ? 'যুক্তি' : 'Logic',
        'Health': isBn ? 'স্বাস্থ্য' : 'Health'
      };
      const dimDescs = isBn ? [
        "শেখার কার্যকারিতা এবং কৌশলসমূহ",
        "গভীর মনোযোগ এবং একাগ্রতা বজায় রাখা",
        "অভ্যাস এবং দৈনন্দিন রুটিন বজায় রাখা",
        "যুক্তি এবং সমস্যা সমাধানের ক্ষমতা",
        "শারীরিক সুস্থতা এবং শক্তির স্তর"
      ] : CATS.descs;

      grid.innerHTML = CATS.names.map((name, i) => `
        <div class="quiz-cat-card" onclick="Quiz.start('${name}')" style="border-top: 3px solid ${CATS.colors[i]}">
          <div class="quiz-cat-icon">${CATS.icons[i]}</div>
          <div class="quiz-cat-name">${dimNames[name] || name}</div>
          <div class="quiz-cat-desc">${dimDescs[i]}</div>
          <button class="btn-outline" style="margin-top:10px; width:100%">${isBn ? 'শুরু করুন' : 'Start Section'}</button>
        </div>
      `).join('') + `
        <div class="quiz-cat-card" style="border-color: var(--accent3)" onclick="Quiz.start('mh')">
          <div class="quiz-cat-icon">🌙</div>
          <div class="quiz-cat-name">${isBn ? 'মানসিক স্বাস্থ্য' : 'Mental Health'}</div>
          <div class="quiz-cat-desc">${isBn ? 'মানসিক অবস্থার মূল্যায়ন' : 'Psychological state assessment'}</div>
          <button class="btn-outline" style="margin-top:10px; width:100%; border-color:var(--accent3); color:var(--accent3)">${isBn ? 'শুরু করুন' : 'Start Section'}</button>
        </div>
      `;
    }
  }

  function start(type = 'full') {
    currentCat = type;
    catIdx = 0;
    qIdx = 0;
    answers = {};
    mhAnswers = {};
    isMH = (type === 'mh');

    if (typeof CATS !== 'undefined' && CATS.names.includes(type)) {
      catIdx = CATS.names.indexOf(type);
      isMH = false;
    }

    if (typeof CATS !== 'undefined') {
      CATS.names.forEach(c => answers[c] = []);
    }
    if (typeof MH_MODULE !== 'undefined') {
      Object.keys(MH_MODULE.questions).forEach(c => mhAnswers[c] = []);
    }

    document.getElementById('quiz-intro').style.display = 'none';
    document.getElementById('quiz-active').style.display = 'block';
    renderQ();
  }

  function renderQ() {
    const isBn = (Lang.get() === 'bn');
    let catName, qdata;

    const dimNames = {
      'Study': isBn ? 'পড়াশোনা' : 'Study',
      'Focus': isBn ? 'মনোযোগ' : 'Focus',
      'Consistency': isBn ? 'ধারাবাহিকতা' : 'Consistency',
      'Logic': isBn ? 'যুক্তি' : 'Logic',
      'Health': isBn ? 'স্বাস্থ্য' : 'Health'
    };
    const mhCats = {
      'Depression': isBn ? 'বিষণ্ণতা' : 'Depression',
      'Anxiety': isBn ? 'দুশ্চিন্তা' : 'Anxiety',
      'MoodSwings': isBn ? 'মেজাজ পরিবর্তন' : 'Mood Swings'
    };

    try {
      if (isMH && typeof MH_MODULE !== 'undefined') {
        const mhCatKeys = Object.keys(MH_MODULE.questions);
        catName = mhCatKeys[catIdx];
        qdata = MH_MODULE.questions[catName][qIdx];
        document.getElementById('q-cat-label').textContent = `🌙 ${mhCats[catName] || catName}`;
      } else {
        catName = (typeof CATS !== 'undefined') ? CATS.names[catIdx] : 'Category';
        qdata = QUESTIONS[catName][qIdx];
        const icon = (typeof CATS !== 'undefined') ? CATS.icons[catIdx] : '❓';
        document.getElementById('q-cat-label').textContent = `${icon} ${dimNames[catName] || catName}`;
      }

      document.getElementById('q-text').textContent = isBn ? (qdata.bn_q || qdata.q) : qdata.q;
      document.getElementById('q-counter').textContent = isBn ? `প্রশ্ন ${qIdx + 1}` : `Question ${qIdx + 1}`;

      const optionsEl = document.getElementById('q-options');
      optionsEl.innerHTML = qdata.o.map((opt, i) => `
        <button class="quiz-opt" onclick="Quiz._pick(${i})">${isBn ? (qdata.bn_o ? qdata.bn_o[i] : opt) : opt}</button>
      `).join('');

      document.getElementById('next-btn-text').disabled = true;
      document.getElementById('back-btn-text').textContent = isBn ? "← ফিরে যান" : "← Back";
      document.getElementById('next-btn-text').textContent = isBn ? "পরবর্তী →" : "Next →";
    } catch (err) {
      console.error('Quiz: Error in renderQ():', err);
    }
  }

  function _pick(i) {
    let catName;
    if (isMH && typeof MH_MODULE !== 'undefined') {
      catName = Object.keys(MH_MODULE.questions)[catIdx];
      mhAnswers[catName][qIdx] = i;
    } else {
      catName = (typeof CATS !== 'undefined') ? CATS.names[catIdx] : 'Category';
      answers[catName][qIdx] = i;
    }

    document.querySelectorAll('.quiz-opt').forEach((btn, idx) => {
      btn.classList.toggle('selected', idx === i);
    });
    document.getElementById('next-btn-text').disabled = false;
  }

  function next() {
    const maxQ = isMH ? 4 : 9;
    const maxCat = isMH ? 2 : 4;

    if (qIdx < maxQ) {
      qIdx++;
      renderQ();
    } else {
      if (currentCat === 'full' && !isMH && catIdx < maxCat) {
        catIdx++;
        qIdx = 0;
        renderQ();
      } else if (currentCat === 'full' && !isMH && catIdx === maxCat) {
        isMH = true;
        catIdx = 0;
        qIdx = 0;
        renderQ();
      } else if ((currentCat === 'mh' || isMH) && catIdx < 2) {
        catIdx++;
        qIdx = 0;
        renderQ();
      } else {
        _showResults();
      }
    }
  }

  function prev() {
    if (qIdx > 0) {
      qIdx--;
      renderQ();
    } else if (catIdx > 0) {
      catIdx--;
      qIdx = isMH ? 4 : 9;
      renderQ();
    }
  }

  function _showResults() {
    document.getElementById('quiz-active').style.display = 'none';
    document.getElementById('quiz-result').style.display = 'block';
    
    const scores = {};
    if (typeof CATS !== 'undefined') {
      CATS.names.forEach(cat => {
        const catAnswers = answers[cat] || [];
        const sum = catAnswers.reduce((total, val, i) => total + QUESTIONS[cat][i].s[val], 0);
        const totalQs = QUESTIONS[cat] ? QUESTIONS[cat].length : 10;
        scores[cat] = Math.round((sum / (totalQs * 3)) * 100);
      });
    }

    const resScoresEl = document.getElementById('result-scores');
    resScoresEl.innerHTML = Object.entries(scores).map(([cat, val]) => `
      <div class="result-score-card">
        <div class="result-score-label">${cat}</div>
        <div class="result-score-val">${val}%</div>
      </div>
    `).join('');

    const mhTotal = {};
    if (typeof MH_MODULE !== 'undefined') {
      Object.keys(mhAnswers).forEach(cat => {
        const catAnswers = mhAnswers[cat] || [];
        if (catAnswers.length === 0) return;
        const sum = catAnswers.reduce((total, val, i) => {
          const q = MH_MODULE.questions[cat][i];
          return total + (q.s ? q.s[val] : val);
        }, 0);
        mhTotal[cat] = sum;
      });
    }

    _renderRadar(scores, mhTotal);
    _renderFeedback(scores, mhTotal);

    window._lastScores = scores;
    window._lastMHScores = mhTotal;
  }

  function _renderRadar(scores, mhScores) {
    if (typeof makeChart === 'undefined') return;
    
    let labels, data, color, pointColors;
    
    if (Object.keys(scores).length > 0) {
      labels = Object.keys(scores);
      data = Object.values(scores);
      color = '#6366f1'; // Brand purple
      pointColors = (typeof CATS !== 'undefined') ? CATS.colors : color;
    } else if (mhScores && Object.keys(mhScores).length > 0) {
      labels = Object.keys(mhScores);
      data = Object.values(mhScores).map(v => Math.round((v / 15) * 100));
      color = '#ff2d78'; // Mental health pink
      pointColors = ['#ff2d78', '#ffcc00', '#00e5ff']; // pink, yellow, cyan
    } else {
      return;
    }
    
    makeChart('quizRadar', {
      type: 'radar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Your Mind Matrix',
          data: data,
          backgroundColor: color + '44', 
          borderColor: color,
          borderWidth: 3,
          pointBackgroundColor: pointColors,
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
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
        },
        plugins: { legend: { display: false } }
      }
    });
  }

  function _renderFeedback(scores, mhScores) {
    const el = document.getElementById('result-feedback');
    if (!el) return;

    const isBn = (typeof Lang !== 'undefined' && Lang.get() === 'bn');
    let html = '';

    // 1. MH Feedback
    if (mhScores && Object.keys(mhScores).length > 0 && typeof MH_MODULE !== 'undefined') {
      const mhCats = {
        'Depression': isBn ? 'বিষণ্ণতা' : 'Depression',
        'Anxiety': isBn ? 'দুশ্চিন্তা' : 'Anxiety',
        'MoodSwings': isBn ? 'মেজাজ পরিবর্তন' : 'Mood Swings'
      };
      const mhSev = {
        'Severe': isBn ? 'তীব্র' : 'Severe',
        'Moderate': isBn ? 'মাঝারি' : 'Moderate',
        'Mild': isBn ? 'সামান্য' : 'Mild'
      };

      Object.entries(mhScores).forEach(([cat, score]) => {
        const severity = MH_MODULE.getSeverity(score);
        const sol = MH_MODULE.solutions[cat][severity];
        const displayCat = mhCats[cat] || cat;
        const displaySev = mhSev[severity] || severity;
        const sevColor = severity === 'Severe' ? '#ff4d4d' : severity === 'Moderate' ? '#ffcc00' : '#00ffaa';

        html += `
          <div class="card" style="margin-top:1rem; border-left: 4px solid var(--accent3)">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px">
              <div class="card-label" style="color:var(--accent3); margin:0">${displayCat} Analysis</div>
              <div style="color:${sevColor}; font-weight:700; font-size:12px; text-transform:uppercase">${displaySev}</div>
            </div>
            
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:15px">
              <div style="background:rgba(0,255,170,0.05); padding:12px; border-radius:8px; border-left:3px solid var(--success)">
                <div style="font-size:11px; font-weight:700; text-transform:uppercase; margin-bottom:5px; color:var(--success)">${isBn ? 'ইসলামিক' : 'Islamic Solution'}</div>
                <div style="font-size:12px">${isBn ? (sol.bn_adhkar || sol.adhkar || sol.ayah) : (sol.adhkar || sol.ayah)}</div>
              </div>
              <div style="background:rgba(0,229,255,0.05); padding:12px; border-radius:8px; border-left:3px solid var(--accent2)">
                <div style="font-size:11px; font-weight:700; text-transform:uppercase; margin-bottom:5px; color:var(--accent2)">${isBn ? 'বৈজ্ঞানিক' : 'Scientific Solution'}</div>
                <div style="font-size:12px">${isBn ? (sol.bn_scientific || sol.scientific) : sol.scientific}</div>
              </div>
            </div>
          </div>
        `;
      });
    }

    // 2. Pillar Feedback
    Object.entries(scores).forEach(([cat, val]) => {
      const interp = val >= 80 ? 'Excellent' : val >= 60 ? 'Good' : val >= 40 ? 'Average' : 'Poor';
      const sol = PILLAR_SOLUTIONS[cat];
      
      html += `
        <div class="card" style="margin-top:1rem">
          <div class="card-label" style="color:var(--accent2)">${cat} Analysis — ${interp}</div>
          <p style="font-size:14px; margin-bottom:15px">${sol[interp]}</p>
          
          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:15px">
            <div style="background:rgba(0,255,170,0.05); padding:12px; border-radius:8px; border-left:3px solid var(--success)">
              <div style="font-size:11px; font-weight:700; text-transform:uppercase; margin-bottom:5px; color:var(--success)">Islamic Solution</div>
              <div style="font-size:12px">${sol.islamic}</div>
            </div>
            <div style="background:rgba(0,229,255,0.05); padding:12px; border-radius:8px; border-left:3px solid var(--accent2)">
              <div style="font-size:11px; font-weight:700; text-transform:uppercase; margin-bottom:5px; color:var(--accent2)">Scientific Solution</div>
              <div style="font-size:12px">${sol.scientific}</div>
            </div>
          </div>
        </div>
      `;
    });
    el.innerHTML = html;
  }

  async function saveAsLog() {
    const user = await Session.getUser();
    if (!user || !window._lastScores) return;
    const ok = await DB.upsertLog(user.email, window._lastScores, '', window._lastMHScores);
    if (ok) {
      showToast('Assessment saved!');
      App.showPage('dashboard');
    }
  }

  function retake() {
    showIntro();
  }

  return { showIntro, start, next, prev, _pick, saveAsLog, retake };
})();

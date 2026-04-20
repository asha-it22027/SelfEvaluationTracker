# Mind Matrix — Neural Assessment System
### Full Project Documentation

---

## What is Mind Matrix?

Mind Matrix is a **fully client-side Single Page Application (SPA)** that helps you assess and track your mental performance across 5 key dimensions:

| Dimension    | What it measures                     |
|--------------|--------------------------------------|
| 📚 Study      | Learning habits & retention          |
| 🎯 Focus      | Attention & deep work capacity       |
| 🔁 Consistency| Habit-building & follow-through      |
| 🧠 Logic      | Problem-solving & reasoning          |
| 💪 Health     | Sleep, diet & physical recovery      |

---

## Features

### Authentication System
- User **Registration** with name, email, age, goal, password
- **Login / Logout** with session persistence
- Passwords stored in localStorage (demo-level — see Security note)
- Auto-login on return visit
- Account deletion with full data wipe

### Profile Dashboard
- Personalized greeting + date
- Stat cards: total logs, average score, best area, day streak
- Editable profile: name, age, goal, bio
- "Needs work" dimension shown automatically

### Quiz System (50 questions)
- 10 questions × 5 categories
- Smart weighted scoring per question (not just position-based)
- Some questions are reverse-scored (e.g. "how often are you distracted?" — lower = better)
- Progress bar shows Q x / 50
- Back/Next navigation
- Results show: score per category, radar chart, text feedback, dynamic daily routine

### Progress Tracker
- **Daily log modal** with sliders (0–100%) for each dimension
- One entry per day — updates if you log again on the same day
- Multi-dimension line chart (all 5 categories over time)
- Bar chart (latest scores)
- Overall average trend chart
- Full log history with color-coded chips

### Charts
All charts use **Chart.js 4.4.1** and include:
- 7-day trend line (Dashboard)
- Radar chart (Dashboard + Quiz results)
- Multi-dimension daily lines (Progress)
- Bar chart per category (Progress)
- Overall average trend (Progress)
- Quiz result radar (Quiz page)

---

## File Structure

```
mindmatrix/
│
├── index.html              ← Single HTML file (all pages)
│
├── css/
│   ├── style.css           ← Global variables, reset, layout, navbar, modals
│   ├── auth.css            ← Auth page (login/register)
│   └── dashboard.css       ← Quiz, profile, feedback, routine styles
│
└── js/
    ├── db.js               ← localStorage database + Session + utilities
    ├── auth.js             ← Registration, login, logout, nav routing
    ├── app.js              ← Page router, modal helpers, chart registry
    ├── quiz.js             ← 50 questions, scoring, feedback, routine generator
    ├── progress.js         ← Log saving, progress charts
    ├── dashboard.js        ← Dashboard renderer (stats, bars, charts, activity)
    └── profile.js          ← Profile card, edit form, delete account
```

---

## How to Run

### Option 1 — Open directly in browser
Just double-click `index.html`. Works in any modern browser with no setup needed.

> ⚠️ Some browsers block localStorage when opening `file://` URLs directly.
> If charts or auth don't work, use Option 2.

### Option 2 — Local dev server (recommended)

**Using Python (no install needed):**
```bash
cd mindmatrix
python -m http.server 8080
# Then open: http://localhost:8080
```

**Using Node.js:**
```bash
npx serve mindmatrix
# Then open the URL it prints
```

**Using VS Code:**
Install the "Live Server" extension → right-click `index.html` → "Open with Live Server"

---

## How to Use

### Step 1 — Register
Click "Register", fill in your details, and submit. Your data is stored locally in the browser.

### Step 2 — Take the Quiz
Go to "Take Quiz" from the navbar. Answer all 50 questions honestly. At the end you'll see:
- Your score per dimension (0–100%)
- A radar chart of your performance
- Specific improvement advice per category
- A dynamic daily routine built from your weakest areas
- A "Save to Progress Log" button to record the result

### Step 3 — Log Daily Progress
Click "+ Log Today" on the Dashboard or Progress page. Use the sliders to rate your day across all 5 dimensions. This builds your progress history over time.

### Step 4 — Track Progress
The "Progress" page shows:
- How each dimension changes day by day
- Your latest scores as a bar chart
- Your overall average trend

### Step 5 — Update Profile
The "Profile" page lets you edit your name, age, goal, and bio. It also shows your best/worst performing areas automatically.

---

## Architecture Decisions

### Why no backend?
This is a **pure frontend demo** using localStorage for persistence. It runs anywhere with zero infrastructure.

### Why separate JS files?
Each file has a single responsibility:
- `db.js` — all data read/write (single source of truth)
- `auth.js` — handles only authentication flow
- `quiz.js` — self-contained quiz state machine
- `progress.js` — only deals with logging and progress charts
- `dashboard.js` — only renders the dashboard
- `profile.js` — only handles profile view/edit

### Module pattern
Each JS module uses the IIFE pattern `const X = (() => { ... return {...}; })()` — no bundler needed, clean namespace separation, works in any browser.

---

## Upgrading to Production

If you want to scale this into a real app:

| Current (demo)                  | Production upgrade                       |
|---------------------------------|------------------------------------------|
| localStorage                    | PostgreSQL / MongoDB / Firebase          |
| Passwords in plain text         | bcrypt hashing + JWT tokens              |
| Single HTML file                | React / Vue / Next.js                    |
| Client-side only                | Express.js / FastAPI backend             |
| No encryption                   | HTTPS + httpOnly cookies                 |
| No email verification           | Nodemailer / SendGrid verification flow  |

---

## Security Note

> This project stores passwords in **plain text** in localStorage. This is intentional for a demo/prototype. **Do not use this for real sensitive data.** In a production app, passwords must be hashed (bcrypt) server-side and never stored client-side.

---

## Tech Stack

| Technology  | Version | Purpose             |
|-------------|---------|---------------------|
| HTML5       | —       | Structure           |
| CSS3        | —       | Styling (no framework) |
| JavaScript  | ES6+    | Logic (no bundler)  |
| Chart.js    | 4.4.1   | All charts          |
| localStorage| Browser | Data persistence    |

---

## Browser Support

Works in all modern browsers:
- Chrome 80+
- Firefox 75+
- Safari 14+
- Edge 80+

---

*Mind Matrix — Built with pure HTML, CSS, JS. No framework. No build step. Just open and run.*

# Codyssey ⚡

**Learn. Play. Build. Level Up.**
*Your Coding Journey, Turned Into A Game.*

Codyssey is a gamified programming-learning platform built for **Front End Engineering-II (25CSE0203) — Project-Based Evaluation-I**. It targets a beginner college student who wants to learn to code but loses motivation with traditional, repetitive learning platforms.

---

## Problem & Solution

**Problem:** Students often begin programming with enthusiasm but struggle because traditional learning platforms feel repetitive and progress is hard to visualize.

**Solution:** Codyssey converts programming learning into a progression-based experience — students learn short concepts, complete quests, answer quizzes, earn XP, level up, maintain streaks, unlock skills, and collect badges. The product loop is:

```
LEARN → PRACTICE → COMPLETE QUEST → EARN XP → LEVEL UP → UNLOCK CONTENT → EARN BADGES → MAINTAIN STREAK → CONTINUE LEARNING
```

Codyssey is **not** a roadmap website with gamification bolted on — it is a gamified learning platform that happens to visualize learning progression through its signature feature, the **Codeverse**.

---

## Beast Mode: Enhanced UI & Gamification Layer

On top of the core Evaluation-I scope, Codyssey layers in a deeper interactive/visual layer — still pure CSS/SVG and React state, no new libraries or backend:

- **Animated XP counter** (`XPCounter.jsx`) — XP odometers smoothly from its old value to the new one with a little pop, instead of just snapping to a new number.
- **Level-Up celebration** (`LevelUpModal.jsx`) — `StudentContext` detects when an XP award crosses a level threshold and fires a full celebration modal with a glowing ring, ray-burst animation, and confetti — mounted globally so it fires from any page.
- **Confetti bursts** (`ConfettiBurst.jsx`) — a lightweight, dependency-free CSS particle burst reused for level-ups, badge unlocks, and perfect quiz runs.
- **Combo meter** — consecutive correct quiz answers build a "🔥 Nx Combo" streak in `AssessmentPage`; a 3+ combo earns a small bonus on top of the base quiz XP, shown separately in the results screen.
- **Circular progress rings** (`CircularProgress.jsx`) — the Dashboard's Level Card and the Codeverse's overall-exploration readout use glowing SVG rings instead of flat numbers.
- **Codeverse energy flow** — the dashed connectors between Codeverse nodes animate like flowing current when a path is active, and the "current" node has an orbiting particle circling it.
- **Glass UI system** — sidebar, navbar stats, auth cards, and the landing nav use a frosted-glass (`backdrop-filter`) treatment over an animated gradient-mesh background, with a shared `--gradient-brand-3` signature gradient reused across buttons, rings, and headings.
- **Redesigned landing page** — floating gradient orbs, a live-looking Codeverse preview card, and an animated stat strip (skills / lessons / quests / badges).

None of this changes the underlying XP economy or data model described below — it's a presentation and feedback layer on top of the same `StudentContext`.

---

## Key Features

- **Codeverse** — a space-themed visualization of learning progress (HTML Planet → CSS Moon → JavaScript Star → React Space Station), built with plain React components, CSS, and state — not a game engine.
- **Quests** — Daily, Learning, Quiz, Challenge, and Streak quests with locked/available/completed states.
- **Interactive micro-lessons** — a Duolingo-style flow per lesson: a short concept card, a tap-to-fill-in-the-blank code exercise, and a quick-check question, each with instant right/wrong feedback, before XP is claimed.
- **Quiz system** — multiple-choice questions (including "what is the output?" style challenges) with instant feedback, explanations, scoring, and XP.
- **XP, Levels & Streaks** — a centralized XP reward table, six-level progression (Rookie → Code Master), and a daily streak counter.
- **Badges & Achievements** — ten badges with an "Achievement Unlocked" celebration modal.
- **Dashboard & Profile** — a game-control-center view of level, XP, streak, today's quests, skill progress, and recent achievements.
- **Demo authentication & onboarding** — client-side-only Sign Up / Sign In, plus a 5-step onboarding wizard (Degree → Branch → College → Year → Career Goal).
- **Full LocalStorage persistence** — refreshing the browser never loses progress.

---

## Technology Stack

- **React 18** (functional components, hooks)
- **Vite** (dev server & build)
- **React Router v6** (routing, protected routes)
- **lucide-react** (icons)
- Plain CSS with CSS custom properties (no Tailwind/Bootstrap/MUI) — kept simple and explainable
- **LocalStorage** for all persistence (no backend, no Redux/Zustand)

---

## Architecture

### Contexts
- **`AuthContext`** — demo, client-side-only authentication (sign up, sign in, log out, onboarding flag). *Not secure production auth* — passwords are stored in localStorage purely so the Evaluation-I demo can run without a backend.
- **`StudentContext`** — the single source of truth for XP, level, streak, completed lessons/quests, quiz history, and unlocked badges. Every page reads from here, so the whole app always reflects the same student state.

### Custom Hooks
- **`useLocalStorage`** — the only place that touches `window.localStorage` directly.
- **`useAuth`** / **`useProgress`** — thin accessor hooks around the two contexts.

### Utils
- **`calculateLevel.js`** — XP thresholds and level lookup.
- **`calculateXP.js`** — the central XP reward table and quiz XP formula.
- **`calculateProgress.js`** — derives skill progress and status (locked/available/current/completed) from completed lesson IDs — never stored as a separate number.
- **`validation.js`** — sign up / sign in form validation.

### Data files (`src/data/`)
Static arrays of objects — `skills.js`, `lessons.js`, `quests.js`, `questions.js`, `badges.js`, `learningPath.js`, `courses.js`, `colleges.js`, `codingProblems.js` — rendered dynamically with `.map()`.

### Data consistency
Completing a lesson updates: `completedLessonIds` → skill progress → Codeverse node state → dashboard → related quest status → badge conditions → profile stats, all through the same `StudentContext`. There are no disconnected, page-local fake states.

---

## Folder Structure

```
codeforge/
├── src/
│   ├── components/
│   │   ├── common/       Button, Input, Modal, ProgressBar, Badge, Card
│   │   ├── layout/        Navbar, Sidebar, PageContainer, ProtectedRoute
│   │   ├── dashboard/      LevelCard, StreakCard, TodayPlan, SkillOverview, AchievementPreview, ProgressCard
│   │   ├── codeverse/      LearningNode, CodeverseConnector, CodeverseBackground, NodeDetails, CodeverseProgress
│   │   ├── skills/         SkillCard, SkillProgress, SkillFilter
│   │   ├── quests/         QuestCard, QuestList, QuestDetails
│   │   ├── learning/       LessonCard, LessonContent, LearningPath
│   │   ├── assessment/     QuestionCard, Option, QuizTimer, QuizResult
│   │   ├── coding/         CodeEditor (simulated, read-only), ProblemStatement, TestCase
│   │   └── rewards/        AchievementModal, XPReward, BadgeGrid
│   ├── pages/
│   │   ├── LandingPage, SignUpPage, SignInPage, SetupPage
│   │   ├── setup/           DegreePage, BranchPage, CollegePage, YearPage, CareerGoalPage
│   │   ├── Dashboard, CodeversePage, LearnPage, QuestPage, AssessmentPage,
│   │   │   SkillsPage, RewardsPage, ProfilePage, SettingsPage, NotFoundPage
│   ├── data/       skills, lessons, quests, questions, badges, learningPath, courses, colleges, codingProblems
│   ├── hooks/      useLocalStorage, useAuth, useProgress
│   ├── context/    AuthContext, StudentContext
│   ├── utils/      calculateLevel, calculateXP, calculateProgress, validation
│   └── styles/     variables.css, global.css, responsive.css
├── package.json
└── vite.config.js
```

**Note on scope simplification:** `SetupPage.jsx` orchestrates the 5 onboarding steps as one wizard (each step still lives in its own file under `pages/setup/`) rather than 5 separately routed pages — this keeps the wizard's shared state in one obvious place for the viva. `LearnPage.jsx` combines lesson listing and lesson content viewing in a single route rather than a second `/lesson` route, for the same reason. The "coding challenge" experience is implemented as read-only, simulated `CodeEditor` output-prediction questions inside the quiz flow — not a real compiler — per the Evaluation-I scope.

---

## How to Run

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

```bash
npm run build      # production build
npm run preview    # preview the production build
```

---

## Demo Flow (Evaluation-I)

1. Open the **Landing Page** → click **Start Your Journey**.
2. **Sign Up** with name, email, password.
3. Complete the 5-step **onboarding** (Degree → Branch → College → Year → Goal).
4. Land on the **Dashboard** — see Level, XP, Streak, today's quests, skill progress, achievements.
5. Open **Codeverse** — HTML is unlocked and available; CSS, JavaScript, React unlock in sequence.
6. Click the **HTML** node → open a lesson from **Learn** → play through the interactive flow (concept card → fill-in-the-blank → quick check) → **Claim XP** → XP updates instantly.
7. Open **Quests** → start a **Quiz Quest** → answer questions → see correct/incorrect feedback → **Quiz Complete** screen with score and XP.
8. If a badge condition is met, an **Achievement Unlocked** modal appears.
9. Return to **Codeverse** — the skill's progress ring has grown; once a skill hits 100%, the next node unlocks.
10. Open **Profile** — XP, level, streak, skills, and achievements are all updated and consistent with the Dashboard.
11. Visit **Settings** → try **Reset Demo Progress** to confirm LocalStorage persistence and reset both work.

---

## Syllabus Alignment (Lectures 1–42)

| Area | Where it's demonstrated |
|---|---|
| Semantic HTML, box model, responsive/mobile-first, media queries | `Landing`, `PageContainer`, `responsive.css`, lesson content |
| CSS variables, Flexbox, Grid, transitions/animations | `variables.css`, `codeverse.css` (pulse-glow, float-star), Sidebar/Grid layouts |
| Forms & controlled components | `SignUpPage`, `SignInPage`, `SettingsPage`, `Input.jsx` |
| JS variables, arrays, objects, functions, destructuring, spread/rest | `StudentContext.jsx`, all `data/*.js` files |
| DOM/events, browser storage, JSON | `useLocalStorage.js` |
| Promises/async-await (conceptually taught) | `lessons.js` (`js-8`), `questions.js` |
| React basics: JSX, components, props, state, lists, conditional rendering | Every component in `components/` |
| useState, useEffect, useRef/useMemo/useCallback (used with real purpose) | `StudentContext.jsx` (`useMemo`/`useCallback`), `QuizTimer.jsx` (`useEffect`) |
| Custom hooks | `useLocalStorage`, `useAuth`, `useProgress` |
| React Router, protected/nested routes | `App.jsx`, `ProtectedRoute.jsx` |

---

## Likely Viva Questions & Answers

**Q: Why Context instead of Redux?**
A: The app only needs two slices of shared state (auth session, student progress). Context + `useLocalStorage` covers this without the boilerplate of an external state library, which is explicitly out of scope for Evaluation-I.

**Q: How is skill progress calculated — is it stored directly?**
A: No. `calculateSkillProgress()` derives a percentage from `completedLessonIds` against each skill's `lessonIds` every render, so the UI can never drift out of sync with what's actually completed.

**Q: How does a Codeverse node unlock?**
A: `StudentContext` computes `unlockedSkillIds`: the first skill is always unlocked, and each subsequent skill unlocks only once the previous skill's derived progress reaches 100%.

**Q: How does XP stay consistent across Dashboard, Codeverse, and Profile?**
A: All three read `student.xp` from the same `StudentContext` — there is one XP number in the whole app, not per-page copies.

**Q: Why is authentication "not secure"?**
A: It's intentionally a Evaluation-I, frontend-only demo — passwords are stored in `localStorage` with no hashing or server verification. Real authentication is called out under Future Scope (Phase III).

**Q: How do badges know when to unlock?**
A: `evaluateBadges()` checks each badge's `condition` object (`skillComplete`, `streak`, `quizzesCompleted`, etc.) against the current student state after every XP-granting action, and unlocks any newly satisfied badge with a celebratory modal.

**Q: Why is the coding challenge multiple-choice instead of a real compiler?**
A: Building or embedding a real execution environment is out of scope for Lectures 1–42. Output-prediction questions test the same JS reasoning skills without that complexity.

---

## Future Scope

**Phase II**
- Real REST APIs, Context/Redux or Zustand for richer global state
- Search/filter across lessons and quests
- Advanced coding challenges, a real leaderboard, richer analytics

**Phase III**
- Backend + database, real authentication
- Real code execution sandbox
- Automated testing (Jest / React Testing Library)
- Performance optimization and production deployment (Vercel/Netlify)

---

*Built with React + Vite for Front End Engineering-II, Project-Based Evaluation-I (25CSE0203).*

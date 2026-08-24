import { useState } from 'react';
import Link from '../components/common/Link';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { useAuth } from '../hooks/useAuth';
import './pages.css';

const LOOP = [
  { step: '01', label: 'Learn',    icon: '📖', color: '#6366f1' },
  { step: '02', label: 'Practice', icon: '💻', color: '#8b5cf6' },
  { step: '03', label: 'Quest',    icon: '⚔️',  color: '#c026d3' },
  { step: '04', label: 'XP',       icon: '⚡', color: '#f59e0b' },
  { step: '05', label: 'Level Up', icon: '🚀', color: '#22d3ee' },
  { step: '06', label: 'Unlock',   icon: '🔓', color: '#10b981' },
  { step: '07', label: 'Badge',    icon: '🏆', color: '#fb923c' },
];

const FEATURES = [
  { icon: '🚀', title: 'Codeverse', body: 'A living galaxy that visualizes what you\'ve unlocked — HTML, CSS, JavaScript, React — one node at a time.' },
  { icon: '⚔️', title: 'Quests', body: 'Daily, learning, quiz, and challenge quests turn each concept into a short, rewarding mission.' },
  { icon: '🔥', title: 'XP, Levels & Streaks', body: 'Every lesson and quiz earns XP, levels you up, and keeps your streak alive.' },
];

const STATS = [
  { value: '4', label: 'Skill Worlds' },
  { value: '24', label: 'Micro Lessons' },
  { value: '14', label: 'Quests' },
  { value: '10', label: 'Badges' },
];

const PREVIEW_NODES = [
  { icon: '🚀', name: 'React', state: 'locked' },
  { icon: '⚡', name: 'JavaScript', state: 'current' },
  { icon: '🌙', name: 'CSS', state: 'completed' },
  { icon: '🌍', name: 'HTML', state: 'completed' },
];

const UNIVERSITIES = [
  { name: 'Chitkara University', sub: 'Punjab & Himachal' },
  { name: 'IIT Delhi', sub: 'New Delhi' },
  { name: 'BITS Pilani', sub: 'Pilani & Goa' },
  { name: 'DTU', sub: 'Delhi' },
  { name: 'VIT Vellore', sub: 'Tamil Nadu' },
  { name: 'Thapar Institute', sub: 'Patiala' },
  { name: 'IIIT Hyderabad', sub: 'Telangana' },
];

const PLATFORM_STATS = [
  { value: '15,000+', label: 'Lessons Completed', variant: 'purple' },
  { value: '45,000+', label: 'Quizzes Solved', variant: 'default' },
  { value: '500+', label: 'Colleges Represented', variant: 'default' },
  { value: '98%', label: 'Student Retention', variant: 'teal' },
];

const OTHER_PLATFORMS_LIMITS = [
  'Passive video lectures with no active hands-on coding practice',
  'No instant mistake feedback or interactive explanations',
  'Monotonous text without gamification, streaks, or levels',
  'Confusing syllabus without clear step-by-step visual progression',
  'No campus leaderboards to compete with college classmates',
  'Generic certificates instead of verifiable skill achievement badges',
];

const COODYSSEY_ADVANTAGES = [
  'Interactive bite-sized coding lessons with instant feedback',
  'Duolingo-style quizzes with XP rewards, levels, and daily streaks',
  'Living Codeverse galaxy that lights up as you master skills',
  'University leaderboards to represent your college and compete',
  'Personalized learning paths tailored to your engineering goals',
];

export default function LandingPage() {
  const { currentUser } = useAuth();

  return (
    <div className="landing">
      <div className="landing-orb landing-orb--1" aria-hidden="true" />
      <div className="landing-orb landing-orb--2" aria-hidden="true" />

      <div className="container">
        <nav className="landing-nav glass">
          <div className="landing-nav__logo">
            <span className="landing-nav__mark">⚡</span> Codyssey
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Link to="signin">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="signup">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </nav>

        <section className="landing-hero">
          <p className="eyebrow landing-hero__eyebrow">Learn. Play. Build. Level Up.</p>
          <h1>
            Turn learning to code into <span className="gradient-text">a game you actually want to play.</span>
          </h1>
          <p>
            Codyssey is a gamified programming platform. Complete quests, earn XP, level up,
            and watch your Codeverse light up as you master HTML, CSS, JavaScript, and React.
          </p>
          <div className="landing-hero__ctas">
            <Link to="signup">
              <Button size="lg">START YOUR ODYSSEY 🚀</Button>
            </Link>
            <Link to="signin">
              <Button size="lg" variant="secondary">I already have an account</Button>
            </Link>
          </div>
        </section>

        <div className="landing-stats">
          {STATS.map((s) => (
            <div className="landing-stat" key={s.label}>
              <div className="landing-stat__value gradient-text">{s.value}</div>
              <div className="landing-stat__label">{s.label}</div>
            </div>
          ))}
        </div>

        <section className="landing-collaborators-section">
          <p className="landing-section-subtitle">Top Colleges & Universities on Codyssey</p>
          <div className="landing-collaborators-row">
            {UNIVERSITIES.map((c) => (
              <div key={c.name} className="collaborator-item">
                <span className="collaborator-name">{c.name}</span>
                {c.sub && <span className="collaborator-sub">{c.sub}</span>}
              </div>
            ))}
          </div>
        </section>

        <div className="landing-loop">
          {LOOP.map((s, i) => (
            <div key={s.step} className="landing-loop__item">
              <div className="landing-loop__card">
                <span className="landing-loop__num">{s.step}</span>
                <span className="landing-loop__icon">{s.icon}</span>
                <span className="landing-loop__label">{s.label}</span>
              </div>
              {i < LOOP.length - 1 && (
                <span className="landing-loop__arrow">›</span>
              )}
            </div>
          ))}
        </div>

        <section className="landing-eco-section">
          <div className="landing-eco-header">
            <span className="landing-badge">⚡ COODYSSEY STATS</span>
            <h2>Gamified Learning in Action</h2>
            <p className="text-secondary">Real-time learning impact across engineering students.</p>
          </div>

          <div className="landing-eco-grid">
            {PLATFORM_STATS.map((st) => (
              <div key={st.label} className={`eco-card eco-card--${st.variant}`}>
                <div className="eco-card__value">{st.value}</div>
                <div className="eco-card__label">{st.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="landing-advantages-section">
          <div className="center-text" style={{ marginBottom: 32 }}>
            <span className="landing-badge">⭐ THE COODYSSEY DIFFERENCE</span>
            <h2 style={{ fontSize: 32, marginTop: 12 }}>Why Choose Codyssey?</h2>
          </div>

          <div className="advantages-grid">
            <div className="advantage-card advantage-card--other glass">
              <h3 className="advantage-card__title">Traditional Coding Sites</h3>
              <ul className="advantage-list">
                {OTHER_PLATFORMS_LIMITS.map((item, idx) => (
                  <li key={idx} className="advantage-item advantage-item--fail">
                    <span className="advantage-icon advantage-icon--fail">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="advantage-card advantage-card--codyssey glass">
              <div className="advantage-card__brand">
                <span className="landing-nav__mark">⚡</span>
                <span style={{ fontWeight: 800, fontSize: 20, letterSpacing: '0.05em' }}>Codyssey</span>
              </div>
              <ul className="advantage-list">
                {COODYSSEY_ADVANTAGES.map((item, idx) => (
                  <li key={idx} className="advantage-item advantage-item--pass">
                    <span className="advantage-icon advantage-icon--pass">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="landing-showcase">
          <div>
            <p className="eyebrow" style={{ marginBottom: 10 }}>The Codeverse</p>
            <h2 style={{ fontSize: 28, marginBottom: 12 }}>Your progress, visualized as a galaxy.</h2>
            <p className="text-secondary" style={{ maxWidth: 420, lineHeight: 1.7 }}>
              Every skill you learn lights up a node in your Codeverse. Finish HTML, and CSS unlocks.
              Finish CSS, and JavaScript comes online. It's not a roadmap you read — it's a universe you build.
            </p>
          </div>
          <div className="landing-preview glass">
            {PREVIEW_NODES.map((n) => (
              <div key={n.name} className={`landing-preview__node landing-preview__node--${n.state}`}>
                <span style={{ fontSize: 22 }}>{n.state === 'locked' ? '🔒' : n.icon}</span>
                <span>{n.name}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="landing-features">
          {FEATURES.map((f) => (
            <Card key={f.title} className="landing-feature" hover>
              <div className="landing-feature__icon">{f.icon}</div>
              <h3 style={{ marginBottom: 8 }}>{f.title}</h3>
              <p className="text-secondary" style={{ fontSize: 14 }}>{f.body}</p>
            </Card>
          ))}
        </section>
      </div>

      <footer className="landing-footer-container">
        <div className="container">
          <div className="landing-footer-grid">
            <div className="footer-brand-col">
              <div className="landing-nav__logo" style={{ marginBottom: 14 }}>
                <span className="landing-nav__mark">⚡</span> Codyssey
              </div>
              <p className="footer-brand-desc">
                The gamified programming platform designed for engineering students to master web development through interactive quests, quizzes, streaks, and skill roadmaps.
              </p>
            </div>

            <div className="footer-links-col">
              <h4 className="footer-col-title">Ecosystem</h4>
              <ul className="footer-links">
                <li><Link to="signup">Codeverse Galaxy</Link></li>
                <li><Link to="signup">Coding Quests</Link></li>
                <li><Link to="signup">Skill Worlds</Link></li>
                <li><Link to="signup">University Leaderboard</Link></li>
              </ul>
            </div>

            <div className="footer-links-col">
              <h4 className="footer-col-title">Learning Paths</h4>
              <ul className="footer-links">
                <li><Link to="signup">HTML & Semantic Web</Link></li>
                <li><Link to="signup">CSS & Modern Design</Link></li>
                <li><Link to="signup">JavaScript Core</Link></li>
                <li><Link to="signup">React & Components</Link></li>
              </ul>
            </div>

            <div className="footer-links-col">
              <h4 className="footer-col-title">Platform</h4>
              <ul className="footer-links">
                <li><Link to="signin">Sign In</Link></li>
                <li><Link to="signup">Create Account</Link></li>
                <li><Link to="setup">Onboarding Setup</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
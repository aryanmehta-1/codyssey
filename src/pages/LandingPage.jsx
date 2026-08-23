import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import './pages.css';

const LOOP = ['LEARN', 'PRACTICE', 'QUEST', 'XP', 'LEVEL UP', 'UNLOCK', 'BADGE'];

const FEATURES = [
  { icon: '🚀', title: 'Codeverse', body: 'A living galaxy that visualizes what you\'ve unlocked — HTML, CSS, JavaScript, React — one node at a time.' },
  { icon: '⚔', title: 'Quests', body: 'Daily, learning, quiz, and challenge quests turn each concept into a short, rewarding mission.' },
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

export default function LandingPage() {
  return (
    <div className="landing">
      <div className="landing-orb landing-orb--1" aria-hidden="true" />
      <div className="landing-orb landing-orb--2" aria-hidden="true" />

      <div className="container">
        <nav className="landing-nav glass">
          <div className="landing-nav__logo">
            <span className="landing-nav__mark">⚡</span> Codyssey
          </div>
          <Link to="/signin">
            <Button variant="ghost">Sign In</Button>
          </Link>
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
            <Link to="/signup">
              <Button size="lg">START YOUR ODYSSEY 🚀</Button>
            </Link>
            <Link to="/signin">
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

        <div className="landing-loop">
          {LOOP.map((step, i) => (
            <span key={step} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span className="landing-loop__step">{step}</span>
              {i < LOOP.length - 1 && <span>→</span>}
            </span>
          ))}
        </div>

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

      <footer className="landing-footer">
        Built for Front End Engineering-II · 25CSE0203 · Codyssey Demo
      </footer>
    </div>
  );
}

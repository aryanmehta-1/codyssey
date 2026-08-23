import { Flame } from 'lucide-react';
import { useProgress } from '../../hooks/useProgress';
import XPCounter from '../common/XPCounter';
import './Navbar.css';

/** Top bar shown inside the authenticated app shell — animated XP/streak/level glance. */
export default function Navbar({ title }) {
  const { student, levelInfo } = useProgress();

  return (
    <header className="navbar">
      <h1 className="navbar-title">{title}</h1>
      <div className="navbar-stats">
        <span className={`navbar-stat navbar-stat--streak ${student.streak.count > 0 ? 'navbar-stat--streak-lit' : ''}`}>
          <Flame size={16} /> {student.streak.count} day streak
        </span>
        <span className="navbar-stat navbar-stat--xp">
          <XPCounter value={student.xp} />
        </span>
        <span className="navbar-stat navbar-stat--level">
          LV {levelInfo.current.level} · {levelInfo.current.title}
        </span>
      </div>
    </header>
  );
}

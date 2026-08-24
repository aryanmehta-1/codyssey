import Card from '../common/Card';
import './dashboard.css';

export default function StreakCard({ streak }) {
  const isLit = streak.count > 0;
  return (
    <Card className={`streak-card ${isLit ? 'streak-card--lit' : ''}`}>
      <div className="streak-card__flame">🔥</div>
      <div className="streak-card__count gradient-text">{streak.count}</div>
      <div className="streak-card__label">Day Streak</div>
    </Card>
  );
}

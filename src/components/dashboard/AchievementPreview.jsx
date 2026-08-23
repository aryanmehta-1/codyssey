import { Link } from 'react-router-dom';
import Card from '../common/Card';
import './dashboard.css';

/** Shows the most recently unlocked badges on the dashboard. */
export default function AchievementPreview({ badges }) {
  const unlocked = badges.filter((b) => b.unlocked).slice(-4).reverse();

  return (
    <Card className="achievement-preview">
      <div className="today-plan__header">
        <h3>Recent Achievements</h3>
        <Link to="/rewards" className="text-secondary" style={{ fontSize: 13 }}>View all</Link>
      </div>
      {unlocked.length === 0 ? (
        <p className="empty-note">Your collection starts here.</p>
      ) : (
        <div className="achievement-preview__grid">
          {unlocked.map((b) => (
            <div className="achievement-preview__item" key={b.id}>
              <div className="achievement-preview__icon">{b.icon}</div>
              <span className="achievement-preview__name">{b.name}</span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

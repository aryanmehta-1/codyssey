import Card from '../common/Card';
import './rewards.css';

export default function BadgeGrid({ badges }) {
  return (
    <div className="badge-grid">
      {badges.map((b) => (
        <Card key={b.id} className={`badge-tile ${!b.unlocked ? 'badge-tile--locked' : ''}`}>
          <span className="badge-tile__icon">{b.unlocked ? b.icon : '🔒'}</span>
          <strong style={{ fontSize: 13 }}>{b.name}</strong>
          <span className="text-secondary" style={{ fontSize: 11 }}>{b.description}</span>
        </Card>
      ))}
    </div>
  );
}

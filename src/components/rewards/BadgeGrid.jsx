import Card from '../common/Card';
import './rewards.css';

/**
 * BadgeGrid — Member 2
 *
 * Renders all badges in a responsive grid.
 * Unlocked badges show their icon, name, XP value, and description.
 * Locked badges are dimmed with a lock icon.
 * Clicking an unlocked badge triggers onSelect (optional).
 *
 * Props:
 *   badges     – array of badge objects with .unlocked boolean
 *   onSelect   – optional callback(badge) when an unlocked badge is clicked
 */
export default function BadgeGrid({ badges, onSelect }) {
  const unlocked = badges.filter((b) => b.unlocked).length;
  const total    = badges.length;

  return (
    <div>
      {/* Grid header */}
      <div className="badge-grid__header">
        <span className="badge-grid__count">
          <span style={{ color: '#6366f1', fontWeight: 700 }}>{unlocked}</span>
          {' '}/ {total} unlocked
        </span>
        <div className="badge-grid__bar-wrap">
          <div
            className="badge-grid__bar-fill"
            style={{ width: `${Math.round((unlocked / (total || 1)) * 100)}%` }}
          />
        </div>
      </div>

      {/* Badge grid */}
      <div className="badge-grid">
        {badges.map((b) => (
          <Card
            key={b.id}
            className={`badge-tile ${!b.unlocked ? 'badge-tile--locked' : 'badge-tile--unlocked'}`}
            onClick={b.unlocked && onSelect ? () => onSelect(b) : undefined}
            style={{ cursor: b.unlocked && onSelect ? 'pointer' : 'default' }}
          >
            <span className="badge-tile__icon" aria-label={b.name}>
              {b.unlocked ? b.icon : '🔒'}
            </span>
            <strong style={{ fontSize: 13 }}>{b.name}</strong>
            <span className="text-secondary" style={{ fontSize: 11, textAlign: 'center' }}>
              {b.description}
            </span>
            {b.unlocked && (
              <span className="badge-tile__xp">+{b.xp} XP</span>
            )}
            {b.unlocked && (
              <span className="badge-tile__unlocked-tag">✓ Earned</span>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

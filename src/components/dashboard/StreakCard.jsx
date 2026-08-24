import Card from '../common/Card';
import './dashboard.css';

/**
 * StreakCard — shows the user's current daily streak with a visual "lit" state.
 * The streak count and date come from StudentContext via useProgress.
 * When the user has a 0-day streak, a motivational message is shown instead.
 */
export default function StreakCard({ streak }) {
  const { count = 0, lastActiveDate } = streak || {};
  const isLit = count > 0;
  const today = new Date().toISOString().slice(0, 10);
  const activeToday = lastActiveDate === today;

  return (
    <Card className={`streak-card ${isLit ? 'streak-card--lit' : ''}`}>
      <div className="streak-card__flame" aria-label="fire">
        {isLit ? '🔥' : '💤'}
      </div>
      <div className="streak-card__count gradient-text">{count}</div>
      <div className="streak-card__label">Day Streak</div>

      {isLit && (
        <div className="streak-card__status">
          {activeToday ? (
            <span className="streak-badge streak-badge--active">Active today ✓</span>
          ) : (
            <span className="streak-badge streak-badge--warning">Complete a lesson to keep it!</span>
          )}
        </div>
      )}

      {!isLit && (
        <p className="streak-card__hint">Start learning to begin your streak!</p>
      )}
    </Card>
  );
}

import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import ProgressBar from '../common/ProgressBar';
import './quests.css';

const TYPE_ICON = {
  daily:     '📅',
  learning:  '📘',
  quiz:      '🧠',
  challenge: '⚔️',
  streak:    '🔥',
};

const TYPE_COLOR = {
  daily:     'linear-gradient(135deg, #f97316, #facc15)',
  learning:  'linear-gradient(135deg, #38bdf8, #6366f1)',
  quiz:      'linear-gradient(135deg, #c026d3, #6366f1)',
  challenge: 'linear-gradient(135deg, #ef4444, #c026d3)',
  streak:    'linear-gradient(135deg, #fb7a3c, #f97316)',
};

/**
 * QuestCard — Member 2
 *
 * Props:
 *   quest      – quest object from questsWithStatus (has .status, .progress fields)
 *   onStart    – callback when user clicks Start / Reattempt
 *   streakCount – current streak count (for streak quests)
 *
 * Derived state displayed:
 *   - Colour-coded type label
 *   - Difficulty stars
 *   - XP reward chip
 *   - Optional progress bar (for streak/multi-lesson quests)
 *   - Status badge (locked / available / completed)
 */
export default function QuestCard({ quest, onStart, streakCount = 0 }) {
  const tone =
    { locked: 'locked', available: 'primary', completed: 'success' }[quest.status] || 'default';

  // ── Streak progress bar ────────────────────────────────────────────────────
  const showStreakBar = quest.type === 'streak' && quest.streakDays;
  const streakPercent = showStreakBar
    ? Math.min(100, Math.round((streakCount / quest.streakDays) * 100))
    : null;

  // ── Button label logic ─────────────────────────────────────────────────────
  const btnLabel =
    quest.status === 'locked'
      ? '🔒 Locked'
      : quest.status === 'completed'
      ? quest.type === 'streak'
        ? '✓ Claimed'
        : '↩ Reattempt'
      : 'Start Quest';

  return (
    <Card className="quest-card">
      {/* Top row: type label + status badge */}
      <div className="quest-card__top">
        <span className="quest-card__type">
          {TYPE_ICON[quest.type]} {quest.type} quest
        </span>
        <Badge tone={tone}>{quest.status}</Badge>
      </div>

      {/* Title + description */}
      <div>
        <h3 className="quest-card__title">{quest.title}</h3>
        <p className="text-secondary" style={{ fontSize: 13 }}>
          {quest.description}
        </p>
      </div>

      {/* Difficulty stars */}
      <div className="quest-card__stars">
        {'★'.repeat(quest.difficulty)}{'☆'.repeat(Math.max(0, 3 - quest.difficulty))}
      </div>

      {/* Streak progress bar */}
      {showStreakBar && (
        <div className="quest-card__streak-progress">
          <div className="quest-card__streak-label">
            <span>Streak</span>
            <span className="mono">{streakCount} / {quest.streakDays} days</span>
          </div>
          <ProgressBar
            percent={streakPercent}
            color={TYPE_COLOR.streak}
            height={7}
          />
        </div>
      )}

      {/* Bottom row: XP chip + action button */}
      <div className="quest-card__footer">
        <span className="mono badge-chip badge-chip--xp">+{quest.xp} XP</span>
        <Button
          size="sm"
          variant={quest.status === 'completed' ? 'secondary' : 'primary'}
          disabled={quest.status === 'locked'}
          onClick={() => onStart(quest)}
        >
          {btnLabel}
        </Button>
      </div>
    </Card>
  );
}

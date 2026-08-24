import Modal from '../common/Modal';
import Button from '../common/Button';
import ProgressBar from '../common/ProgressBar';

/**
 * QuestDetails — Member 2
 *
 * Modal that previews a quest before the user starts it.
 * Shows: title, description, XP reward, difficulty, streak progress (if applicable).
 *
 * Props:
 *   quest        – quest object (with status, xp, type, streakDays, etc.)
 *   onClose      – close handler
 *   onConfirm    – confirm / start quest handler
 *   streakCount  – user's current streak count (for streak quests)
 */
export default function QuestDetails({ quest, onClose, onConfirm, streakCount = 0 }) {
  if (!quest) return null;
  const isCompleted = quest.status === 'completed';

  const showStreakBar = quest.type === 'streak' && quest.streakDays;
  const streakPercent = showStreakBar
    ? Math.min(100, Math.round((streakCount / quest.streakDays) * 100))
    : null;

  return (
    <Modal open={!!quest} onClose={onClose}>
      {/* Quest type chip */}
      <div style={{ marginBottom: 8 }}>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#c026d3',
          }}
        >
          {quest.type} quest
        </span>
      </div>

      <h2 style={{ marginBottom: 8 }}>{quest.title}</h2>
      <p className="text-secondary" style={{ marginBottom: 16 }}>
        {quest.description}
      </p>

      {/* XP reward */}
      <p className="mono" style={{ marginBottom: 16, color: '#ffc23c' }}>
        Reward:{' '}
        {isCompleted
          ? `Earn up to +${quest.xp} XP for correct answers`
          : `+${quest.xp} XP`}
      </p>

      {/* Difficulty */}
      <div style={{ marginBottom: showStreakBar ? 16 : 20, color: '#ffc23c' }}>
        {'★'.repeat(quest.difficulty)}{'☆'.repeat(Math.max(0, 3 - quest.difficulty))}
      </div>

      {/* Streak progress (only for streak quests) */}
      {showStreakBar && (
        <div style={{ marginBottom: 20 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 13,
              marginBottom: 6,
            }}
          >
            <span className="text-secondary">Your Streak</span>
            <span className="mono" style={{ color: '#fb7a3c' }}>
              {streakCount} / {quest.streakDays} days
            </span>
          </div>
          <ProgressBar
            percent={streakPercent}
            color="linear-gradient(135deg, #fb7a3c, #f97316)"
            height={8}
          />
          {streakPercent < 100 && (
            <p
              style={{ fontSize: 12, color: '#656d92', marginTop: 8 }}
            >
              Keep learning daily to reach {quest.streakDays} days and claim this quest!
            </p>
          )}
        </div>
      )}

      <Button fullWidth onClick={() => onConfirm(quest)}>
        {isCompleted ? 'Reattempt Quest' : 'Start Quest'}
      </Button>
    </Modal>
  );
}

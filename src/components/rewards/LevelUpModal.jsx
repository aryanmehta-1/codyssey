import Modal from '../common/Modal';
import Button from '../common/Button';
import ConfettiBurst from '../common/ConfettiBurst';
import ProgressBar from '../common/ProgressBar';
import { xpUntilNextLevel } from '../../utils/calculateLevel';
import './rewards.css';

/**
 * LevelUpModal — Member 2
 *
 * Shown automatically by Dashboard when lastLevelUp is set in StudentContext.
 *
 * State flow:
 *   completeLesson / completeQuest / submitQuizResult
 *     → addXP() in StudentContext
 *     → calculateLevel(newXP).level > calculateLevel(prev.xp).level
 *     → setLastLevelUp(newLevelObj)
 *     → LevelUpModal renders with level
 *     → user clicks Continue → clearLevelUpToast()
 *
 * Props:
 *   level      – level object { level, title, minXP } | null
 *   currentXP  – total XP after level-up (optional, for progress preview)
 *   onClose    – clears the toast state in StudentContext
 */
export default function LevelUpModal({ level, currentXP, onClose }) {
  if (!level) return null;

  // How many XP until the next level (to show preview bar)
  const xpLeft = currentXP != null ? xpUntilNextLevel(currentXP) : null;

  return (
    <Modal open={!!level} onClose={onClose}>
      <div className="level-up" style={{ position: 'relative', overflow: 'hidden' }}>
        <ConfettiBurst pieceCount={36} />

        <div className="level-up__content">
          <span className="achievement-modal__label">Level Up! 🎉</span>

          {/* Level ring */}
          <div className="level-up__ring">
            <span className="level-up__number">{level.level}</span>
          </div>

          <h2
            className="gradient-text"
            style={{ fontSize: 26, margin: '10px 0 4px' }}
          >
            {level.title}
          </h2>

          <p className="text-secondary" style={{ marginBottom: 16 }}>
            You've reached <strong style={{ color: '#f5f6fc' }}>Level {level.level}</strong>.
            Keep the momentum going!
          </p>

          {/* XP to next level hint */}
          {xpLeft != null && xpLeft > 0 && (
            <p
              className="mono"
              style={{ fontSize: 12, color: '#656d92', marginBottom: 20 }}
            >
              {xpLeft} XP to next level
            </p>
          )}

          <Button onClick={onClose} size="lg">
            Continue Your Odyssey
          </Button>
        </div>
      </div>
    </Modal>
  );
}

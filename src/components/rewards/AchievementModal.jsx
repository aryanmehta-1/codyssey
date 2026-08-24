import Modal from '../common/Modal';
import Button from '../common/Button';
import ConfettiBurst from '../common/ConfettiBurst';
import XPReward from './XPReward';
import './rewards.css';

/**
 * AchievementModal — Member 2
 *
 * Shown automatically by Dashboard when lastUnlockedBadge is set in StudentContext.
 * Triggered after: lesson complete, quest complete, or quiz result.
 *
 * State flow:
 *   completeLesson / completeQuest / submitQuizResult
 *     → checkNewBadges() in StudentContext
 *     → setLastUnlockedBadge(badge)
 *     → AchievementModal renders with badge
 *     → user clicks Continue → clearBadgeToast()
 *
 * Props:
 *   badge   – badge object { id, name, icon, xp, description } | null
 *   onClose – clears the toast state in StudentContext
 */
export default function AchievementModal({ badge, onClose }) {
  if (!badge) return null;

  return (
    <Modal open={!!badge} onClose={onClose}>
      <div className="achievement-modal" style={{ position: 'relative' }}>
        <ConfettiBurst pieceCount={22} />

        <span className="achievement-modal__label">Achievement Unlocked</span>

        {/* Trophy + badge icon */}
        <div className="achievement-modal__trophy" aria-label={badge.name}>
          🏆
        </div>
        <div className="achievement-modal__badge-icon">{badge.icon}</div>

        <div className="achievement-modal__name">{badge.name}</div>
        <p className="text-secondary" style={{ fontSize: 13, marginBottom: 8 }}>
          {badge.description}
        </p>

        {/* XP reward pill */}
        <div style={{ marginBottom: 20 }}>
          <XPReward amount={badge.xp} />
        </div>

        <Button onClick={onClose}>Continue</Button>
      </div>
    </Modal>
  );
}

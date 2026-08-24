import Modal from '../common/Modal';
import Button from '../common/Button';
import ConfettiBurst from '../common/ConfettiBurst';
import './rewards.css';

export default function AchievementModal({ badge, onClose }) {
  if (!badge) return null;
  return (
    <Modal open={!!badge} onClose={onClose}>
      <div className="achievement-modal" style={{ position: 'relative' }}>
        <ConfettiBurst pieceCount={22} />
        <span className="achievement-modal__label">Achievement Unlocked</span>
        <div className="achievement-modal__trophy">🏆</div>
        <div className="achievement-modal__name">{badge.name}</div>
        <div className="achievement-modal__xp">+{badge.xp} XP</div>
        <Button onClick={onClose}>Continue</Button>
      </div>
    </Modal>
  );
}

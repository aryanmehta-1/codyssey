import Modal from '../common/Modal';
import Button from '../common/Button';
import ConfettiBurst from '../common/ConfettiBurst';
import './rewards.css';

export default function LevelUpModal({ level, onClose }) {
  if (!level) return null;
  return (
    <Modal open={!!level} onClose={onClose}>
      <div className="level-up" style={{ position: 'relative', overflow: 'hidden' }}>
        <ConfettiBurst pieceCount={36} />
        <div className="level-up__content">
          <span className="achievement-modal__label">Level Up</span>
          <div className="level-up__ring">
            <span className="level-up__number">{level.level}</span>
          </div>
          <h2 className="gradient-text" style={{ fontSize: 26, margin: '10px 0 4px' }}>{level.title}</h2>
          <p className="text-secondary" style={{ marginBottom: 18 }}>You've reached Level {level.level}. Keep the momentum going!</p>
          <Button onClick={onClose} size="lg">Continue Your Odyssey</Button>
        </div>
      </div>
    </Modal>
  );
}

import Modal from '../common/Modal';
import Button from '../common/Button';

/** Confirmation modal before jumping into a quest's quiz/lesson. */
export default function QuestDetails({ quest, onClose, onConfirm }) {
  if (!quest) return null;
  return (
    <Modal open={!!quest} onClose={onClose}>
      <h2 style={{ marginBottom: 8 }}>{quest.title}</h2>
      <p className="text-secondary" style={{ marginBottom: 16 }}>{quest.description}</p>
      <p className="mono" style={{ marginBottom: 20, color: 'var(--xp)' }}>Reward: +{quest.xp} XP</p>
      <Button fullWidth onClick={() => onConfirm(quest)}>Start Quest</Button>
    </Modal>
  );
}

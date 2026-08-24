import Modal from '../common/Modal';
import Button from '../common/Button';

export default function QuestDetails({ quest, onClose, onConfirm }) {
  if (!quest) return null;
  const isCompleted = quest.status === 'completed';
  return (
    <Modal open={!!quest} onClose={onClose}>
      <h2 style={{ marginBottom: 8 }}>{quest.title}</h2>
      <p className="text-secondary" style={{ marginBottom: 16 }}>{quest.description}</p>
      <p className="mono" style={{ marginBottom: 20, color: '#ffc23c' }}>
        Reward: {isCompleted ? `Earn up to +${quest.xp} XP for correct answers` : `+${quest.xp} XP`}
      </p>
      <Button fullWidth onClick={() => onConfirm(quest)}>
        {isCompleted ? 'Reattempt Quest' : 'Start Quest'}
      </Button>
    </Modal>
  );
}

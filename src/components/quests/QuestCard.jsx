import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import './quests.css';

const TYPE_ICON = { daily: '📅', learning: '📘', quiz: '🧠', challenge: '⚔', streak: '🔥' };

export default function QuestCard({ quest, onStart }) {
  const tone = { locked: 'locked', available: 'primary', completed: 'success' }[quest.status] || 'default';
  return (
    <Card className="quest-card">
      <div className="quest-card__top">
        <span className="quest-card__type">{TYPE_ICON[quest.type]} {quest.type} quest</span>
        <Badge tone={tone}>{quest.status}</Badge>
      </div>
      <div>
        <h3 className="quest-card__title">{quest.title}</h3>
        <p className="text-secondary" style={{ fontSize: 13 }}>{quest.description}</p>
      </div>
      <div className="quest-card__stars">{'★'.repeat(quest.difficulty)}{'☆'.repeat(3 - quest.difficulty)}</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="mono badge-chip badge-chip--xp">+{quest.xp} XP</span>
        <Button
          size="sm"
          variant={quest.status === 'completed' ? 'secondary' : 'primary'}
          disabled={quest.status === 'locked'}
          onClick={() => onStart(quest)}
        >
          {quest.status === 'locked'
            ? 'Locked'
            : quest.status === 'completed'
            ? quest.type === 'streak'
              ? 'Claimed ✓'
              : 'Reattempt'
            : 'Start Quest'}
        </Button>
      </div>
    </Card>
  );
}

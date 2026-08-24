import Link from '../common/Link';
import Card from '../common/Card';
import Button from '../common/Button';
import './dashboard.css';

export default function TodayPlan({ quests }) {
  const todaysQuests = quests.filter((q) => q.status === 'available').slice(0, 3);

  return (
    <Card className="today-plan">
      <div className="today-plan__header">
        <h3>Today's Quests</h3>
        <Link to="/quests" className="text-secondary" style={{ fontSize: 13 }}>View all</Link>
      </div>
      {todaysQuests.length === 0 && (
        <p className="empty-note">All quests complete. Amazing work! Check Codeverse for what unlocks next.</p>
      )}
      {todaysQuests.map((quest) => (
        <div className="quest-row" key={quest.id}>
          <div className="quest-row__info">
            <span className="quest-row__title">⚔ {quest.title}</span>
            <span className="quest-row__meta mono">+{quest.xp} XP · {quest.type}</span>
          </div>
          <Link to={`/quests`}>
            <Button size="sm" variant="secondary">Start</Button>
          </Link>
        </div>
      ))}
    </Card>
  );
}

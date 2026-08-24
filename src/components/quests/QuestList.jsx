import QuestCard from './QuestCard';
import './quests.css';

export default function QuestList({ quests, onStart }) {
  if (quests.length === 0) {
    return <p className="empty-note">No quests here yet — check back after unlocking more skills.</p>;
  }
  return (
    <div className="quest-list">
      {quests.map((quest) => (
        <QuestCard key={quest.id} quest={quest} onStart={onStart} />
      ))}
    </div>
  );
}

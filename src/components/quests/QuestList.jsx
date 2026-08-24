import QuestCard from './QuestCard';
import './quests.css';

/**
 * QuestList — Member 2
 *
 * Renders a grid of QuestCard components.
 * Passes streakCount down to each card so streak quests can render their progress bar.
 *
 * Props:
 *   quests       – filtered array of quests with status
 *   onStart      – handler when a quest is started
 *   streakCount  – user's current streak (from StudentContext)
 */
export default function QuestList({ quests, onStart, streakCount = 0 }) {
  if (quests.length === 0) {
    return (
      <p className="empty-note">
        No quests here yet — check back after unlocking more skills.
      </p>
    );
  }

  return (
    <div className="quest-list">
      {quests.map((quest) => (
        <QuestCard
          key={quest.id}
          quest={quest}
          onStart={onStart}
          streakCount={streakCount}
        />
      ))}
    </div>
  );
}

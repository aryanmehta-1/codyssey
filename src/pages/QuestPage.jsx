import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer';
import QuestList from '../components/quests/QuestList';
import QuestDetails from '../components/quests/QuestDetails';
import { useProgress } from '../hooks/useProgress';

const TYPE_FILTERS = ['all', 'daily', 'learning', 'quiz', 'challenge', 'streak'];

export default function QuestPage() {
  const { questsWithStatus, student, completeQuest } = useProgress();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [pendingQuest, setPendingQuest] = useState(null);
  const [notice, setNotice] = useState('');

  const filtered = questsWithStatus.filter((q) => filter === 'all' || q.type === filter);

  const handleStart = (quest) => {
    if (quest.status !== 'available') return;
    setNotice('');
    if (quest.type === 'learning') {
      navigate('/learn', { state: { skillId: quest.skillId } });
      return;
    }
    if (quest.type === 'quiz' || quest.type === 'challenge' || quest.type === 'daily') {
      setPendingQuest(quest);
      return;
    }
    if (quest.type === 'streak') {
      if (student.streak.count >= quest.streakDays) {
        completeQuest(quest.id);
      } else {
        setNotice(`Keep learning! You're at a ${student.streak.count}-day streak — reach ${quest.streakDays} days to claim this quest.`);
      }
    }
  };

  const confirmQuest = (quest) => {
    setPendingQuest(null);
    navigate('/quiz', { state: { skillId: quest.skillId, questId: quest.id, questTitle: quest.title } });
  };

  return (
    <PageContainer title="Quests">
      <div className="skill-filter">
        {TYPE_FILTERS.map((t) => (
          <button
            key={t}
            className={`skill-filter__btn ${filter === t ? 'skill-filter__btn--active' : ''}`}
            onClick={() => setFilter(t)}
          >
            {t[0].toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {notice && (
        <div className="quiz-feedback quiz-feedback--incorrect" style={{ marginBottom: 16 }}>{notice}</div>
      )}

      <QuestList quests={filtered} onStart={handleStart} />
      <QuestDetails quest={pendingQuest} onClose={() => setPendingQuest(null)} onConfirm={confirmQuest} />
    </PageContainer>
  );
}

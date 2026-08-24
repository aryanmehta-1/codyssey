import { useState } from 'react';
import { useNavigation } from '../hooks/useNavigation';
import PageContainer from '../components/layout/PageContainer';
import QuestList from '../components/quests/QuestList';
import QuestDetails from '../components/quests/QuestDetails';
import { useProgress } from '../hooks/useProgress';
import { useStudentStats } from '../hooks/useStudentStats';
import './pages.css';

const TYPE_FILTERS = ['all', 'daily', 'learning', 'quiz', 'challenge', 'streak'];

/**
 * QuestPage — Member 2
 *
 * Renders:
 *   - Quest summary stats bar (total, available, completed)
 *   - Type filter pills
 *   - QuestList with live streakCount passed down
 *   - QuestDetails confirmation modal
 *   - XP notification when a streak quest is claimed
 *
 * State flow:
 *   User selects filter → filtered quests re-render
 *   User clicks "Start Quest" → handleStart() dispatches:
 *       learning  → navigate to learn page
 *       quiz/challenge/daily → open QuestDetails modal
 *       streak → auto-claim if eligible, else show notice
 *   User confirms in QuestDetails → navigate to quiz assessment
 */
export default function QuestPage() {
  const { questsWithStatus, student, completeQuest } = useProgress();
  const { streakCount } = useStudentStats();
  const { navigate } = useNavigation();

  const [filter, setFilter]           = useState('all');
  const [pendingQuest, setPendingQuest] = useState(null);
  const [notice, setNotice]           = useState('');
  const [noticeType, setNoticeType]   = useState('info'); // 'info' | 'success' | 'error'

  // ── Derived stats ──────────────────────────────────────────────────────────
  const totalQuests     = questsWithStatus.length;
  const availableQuests = questsWithStatus.filter((q) => q.status === 'available').length;
  const completedQuests = questsWithStatus.filter((q) => q.status === 'completed').length;

  const filtered = questsWithStatus.filter(
    (q) => filter === 'all' || q.type === filter
  );

  // ── Quest start handler ────────────────────────────────────────────────────
  function handleStart(quest) {
    if (quest.status === 'locked') return;
    setNotice('');

    if (quest.type === 'learning') {
      navigate('learn', { skillId: quest.skillId });
      return;
    }

    if (['quiz', 'challenge', 'daily'].includes(quest.type)) {
      setPendingQuest(quest);
      return;
    }

    if (quest.type === 'streak') {
      if (quest.status === 'completed') {
        setNotice(`✅ Milestone already claimed! You're on a ${streakCount}-day streak.`);
        setNoticeType('success');
      } else if (streakCount >= quest.streakDays) {
        completeQuest(quest.id);
        setNotice(`🔥 Streak quest claimed! +${quest.xp} XP earned.`);
        setNoticeType('success');
      } else {
        setNotice(
          `Keep learning! You're at ${streakCount} days — reach ${quest.streakDays} days to claim this.`
        );
        setNoticeType('info');
      }
    }
  }

  // ── Quest confirm (navigate to quiz) ──────────────────────────────────────
  function confirmQuest(quest) {
    setPendingQuest(null);
    navigate('quiz', {
      skillId:       quest.skillId,
      questId:       quest.id,
      questTitle:    quest.title,
      questionCount: quest.questionCount || (quest.type === 'daily' ? 3 : 5),
    });
  }

  // ── Notice class ──────────────────────────────────────────────────────────
  const noticeClass =
    noticeType === 'success'
      ? 'quiz-feedback quiz-feedback--correct'
      : 'quiz-feedback quiz-feedback--incorrect';

  return (
    <PageContainer title="Quests">
      {/* ── Quest summary stats ──────────────────────────────────────────── */}
      <div className="quest-stats-bar">
        <div className="quest-stat">
          <span className="quest-stat__value">{totalQuests}</span>
          <span className="quest-stat__label">Total</span>
        </div>
        <div className="quest-stat">
          <span className="quest-stat__value" style={{ color: '#6366f1' }}>
            {availableQuests}
          </span>
          <span className="quest-stat__label">Available</span>
        </div>
        <div className="quest-stat">
          <span className="quest-stat__value" style={{ color: '#2dd4a7' }}>
            {completedQuests}
          </span>
          <span className="quest-stat__label">Completed</span>
        </div>
        <div className="quest-stat">
          <span className="quest-stat__value" style={{ color: '#fb7a3c' }}>
            {streakCount}
          </span>
          <span className="quest-stat__label">🔥 Streak</span>
        </div>
      </div>

      {/* ── Type filter pills ────────────────────────────────────────────── */}
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

      {/* ── Notice banner ───────────────────────────────────────────────── */}
      {notice && (
        <div className={noticeClass} style={{ marginBottom: 16 }}>
          {notice}
        </div>
      )}

      {/* ── Quest grid ──────────────────────────────────────────────────── */}
      <QuestList
        quests={filtered}
        onStart={handleStart}
        streakCount={streakCount}
      />

      {/* ── Quest confirmation modal ─────────────────────────────────────── */}
      <QuestDetails
        quest={pendingQuest}
        onClose={() => setPendingQuest(null)}
        onConfirm={confirmQuest}
        streakCount={streakCount}
      />
    </PageContainer>
  );
}

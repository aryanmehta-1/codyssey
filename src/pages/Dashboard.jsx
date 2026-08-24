import PageContainer from '../components/layout/PageContainer';
import LevelCard from '../components/dashboard/LevelCard';
import StreakCard from '../components/dashboard/StreakCard';
import ProgressCard from '../components/dashboard/ProgressCard';
import TodayPlan from '../components/dashboard/TodayPlan';
import SkillOverview from '../components/dashboard/SkillOverview';
import AchievementPreview from '../components/dashboard/AchievementPreview';
import UniversityLeaderboard from '../components/dashboard/UniversityLeaderboard';
import LevelUpModal from '../components/rewards/LevelUpModal';
import AchievementModal from '../components/rewards/AchievementModal';
import { useAuth } from '../hooks/useAuth';
import { useProgress } from '../hooks/useProgress';
import { useStudentStats } from '../hooks/useStudentStats';
import './pages.css';

/**
 * Dashboard — Member 2
 *
 * Consumes StudentContext through useProgress/useStudentStats to render:
 *   - Greeting + live level & streak cards
 *   - 4 ProgressCards: overall, daily, quests, badges
 *   - Today's quests, skill overview
 *   - Recent achievements preview
 *   - University leaderboard
 *   - LevelUpModal and AchievementModal pop-ups driven by context state
 */
export default function Dashboard() {
  const { currentUser } = useAuth();
  const {
    student,
    levelInfo,
    skillsWithProgress,
    questsWithStatus,
    badges,
    lastUnlockedBadge,
    lastLevelUp,
    clearBadgeToast,
    clearLevelUpToast,
  } = useProgress();

  const {
    overallProgress,
    dailyProgress,
    questProgress,
    unlockedBadgesCount,
    totalBadgesCount,
    completedLessonsCount,
    totalLessonsCount,
    xpToday,
  } = useStudentStats();

  const firstName = currentUser?.name?.split(' ')[0] || 'Coder';
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';

  const college = student.onboarding?.college || currentUser?.profile?.college || '';

  return (
    <PageContainer title="Dashboard">
      {/* ── Greeting ──────────────────────────────────────────────────────── */}
      <p className="text-secondary" style={{ marginBottom: 24, fontSize: 15 }}>
        {greeting}, <strong style={{ color: '#f5f6fc' }}>{firstName}</strong> 👋 — Ready for
        today's quest?
      </p>

      {/* ── Row 1: Level + Streak ─────────────────────────────────────────── */}
      <div className="dash-grid" style={{ marginBottom: 20 }}>
        <LevelCard levelInfo={levelInfo} />
        <StreakCard streak={student.streak} />
      </div>

      {/* ── Row 2: Progress stat cards ────────────────────────────────────── */}
      <div className="dash-grid-4" style={{ marginBottom: 20 }}>
        <ProgressCard
          icon="📚"
          label="Overall Progress"
          value={`${overallProgress}%`}
          percent={overallProgress}
          color="linear-gradient(135deg, #6366f1, #c026d3)"
        />
        <ProgressCard
          icon="☀️"
          label="Daily Goal"
          value={`${dailyProgress}%`}
          percent={dailyProgress}
          color="linear-gradient(135deg, #f97316, #facc15)"
        />
        <ProgressCard
          icon="⚔️"
          label="Quests Done"
          value={`${questProgress}%`}
          percent={questProgress}
          color="linear-gradient(135deg, #c026d3, #6366f1)"
        />
        <ProgressCard
          icon="🏅"
          label="Badges"
          value={`${unlockedBadgesCount} / ${totalBadgesCount}`}
          percent={Math.round((unlockedBadgesCount / (totalBadgesCount || 1)) * 100)}
          color="linear-gradient(135deg, #22d3ee, #6366f1)"
        />
      </div>

      {/* ── Row 3: Lessons count + XP today ──────────────────────────────── */}
      <div className="dash-grid" style={{ marginBottom: 20 }}>
        <ProgressCard
          icon="🎓"
          label={`Lessons Completed (${totalLessonsCount} total)`}
          value={completedLessonsCount}
          percent={Math.round((completedLessonsCount / (totalLessonsCount || 1)) * 100)}
          color="linear-gradient(135deg, #2dd4a7, #22d3ee)"
        />
        <ProgressCard
          icon="✨"
          label="XP Earned Today"
          value={`+${xpToday} XP`}
        />
      </div>

      {/* ── Row 4: Today's quests + Skill overview ──────────────────────── */}
      <div className="dash-grid" style={{ marginBottom: 20 }}>
        <TodayPlan quests={questsWithStatus} />
        <SkillOverview skills={skillsWithProgress} />
      </div>

      {/* ── Row 5: Achievements ──────────────────────────────────────────── */}
      <AchievementPreview badges={badges} />

      {/* ── Row 6: University leaderboard ───────────────────────────────── */}
      <div style={{ marginTop: 20 }}>
        <UniversityLeaderboard userCollege={college} />
      </div>

      {/* ── Modals driven by context state ───────────────────────────────── */}
      <LevelUpModal level={lastLevelUp} onClose={clearLevelUpToast} />
      <AchievementModal badge={lastUnlockedBadge} onClose={clearBadgeToast} />
    </PageContainer>
  );
}

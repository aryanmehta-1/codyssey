import PageContainer from '../components/layout/PageContainer';
import Card from '../components/common/Card';
import SkillProgress from '../components/skills/SkillProgress';
import { useAuth } from '../hooks/useAuth';
import { useProgress } from '../hooks/useProgress';
import './pages.css';

export default function ProfilePage() {
  const { currentUser } = useAuth();
  const { student, levelInfo, skillsWithProgress, badges } = useProgress();

  const unlockedBadges = badges.filter((b) => b.unlocked);
  const challengesCompleted = student.completedQuestIds.length;

  return (
    <PageContainer title="Profile">
      <div className="dash-grid">
        <Card>
          <div className="profile-header">
            <div className="profile-avatar">{currentUser?.name?.[0]?.toUpperCase() || 'C'}</div>
            <div>
              <h2>{currentUser?.name || 'Coder'}</h2>
              <p className="text-secondary" style={{ fontSize: 13 }}>
                Level {levelInfo.current.level} — {levelInfo.current.title} · <span className="mono">{student.xp} XP</span> · 🔥 {student.streak.count} Day Streak
              </p>
            </div>
          </div>

          <div className="stat-row"><span>Lessons completed</span><strong>{student.completedLessonIds.length}</strong></div>
          <div className="stat-row"><span>Quizzes completed</span><strong>{student.quizHistory.length}</strong></div>
          <div className="stat-row"><span>Quests completed</span><strong>{challengesCompleted}</strong></div>
          <div className="stat-row"><span>Achievements</span><strong>{unlockedBadges.length}</strong></div>
        </Card>

        <Card>
          <h3 style={{ marginBottom: 14 }}>Skills</h3>
          {skillsWithProgress.map((skill) => (
            <SkillProgress key={skill.id} skill={skill} />
          ))}
        </Card>
      </div>

      <Card>
        <h3 style={{ marginBottom: 14 }}>Achievements</h3>
        {unlockedBadges.length === 0 ? (
          <p className="empty-note">Your collection starts here.</p>
        ) : (
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {unlockedBadges.map((b) => (
              <span key={b.id} className="badge-chip badge-chip--success">{b.icon} {b.name}</span>
            ))}
          </div>
        )}
      </Card>
    </PageContainer>
  );
}

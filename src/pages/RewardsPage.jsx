import { useState } from 'react';
import PageContainer from '../components/layout/PageContainer';
import BadgeGrid from '../components/rewards/BadgeGrid';
import AchievementModal from '../components/rewards/AchievementModal';
import XPReward from '../components/rewards/XPReward';
import Card from '../components/common/Card';
import ProgressBar from '../components/common/ProgressBar';
import { useProgress } from '../hooks/useProgress';
import { useStudentStats } from '../hooks/useStudentStats';
import { xpSourceLabel } from '../utils/calculateXP';
import './pages.css';

/**
 * RewardsPage — Member 2
 *
 * Renders:
 *   1. Reward summary stats: total XP, badges, quests, level
 *   2. BadgeGrid — all badges with unlock status; click to view detail
 *   3. XP History feed — last 10 quiz/activity entries from quizHistory
 *   4. AchievementModal — triggered when user clicks an unlocked badge
 *
 * Data flow:
 *   StudentContext → useProgress() → badges[], quizHistory[]
 *   useStudentStats() → totalXP, unlockedBadgesCount, levelInfo, etc.
 */
export default function RewardsPage() {
  const {
    badges,
    student,
    levelInfo,
    lastUnlockedBadge,
    clearBadgeToast,
  } = useProgress();

  const {
    totalXP,
    unlockedBadgesCount,
    totalBadgesCount,
    completedQuestsCount,
    recentXPHistory,
  } = useStudentStats();

  // ── Local state for badge detail modal ─────────────────────────────────────
  const [selectedBadge, setSelectedBadge] = useState(null);

  const badgeXPTotal = badges
    .filter((b) => b.unlocked)
    .reduce((sum, b) => sum + b.xp, 0);

  return (
    <PageContainer title="Rewards">
      {/* ── Summary stat row ─────────────────────────────────────────────── */}
      <div className="rewards-stats-bar">
        <div className="rewards-stat">
          <span className="rewards-stat__value gradient-text">{totalXP}</span>
          <span className="rewards-stat__label">Total XP</span>
        </div>
        <div className="rewards-stat">
          <span className="rewards-stat__value" style={{ color: '#ffc23c' }}>
            {unlockedBadgesCount}
          </span>
          <span className="rewards-stat__label">Badges Earned</span>
        </div>
        <div className="rewards-stat">
          <span className="rewards-stat__value" style={{ color: '#c026d3' }}>
            {completedQuestsCount}
          </span>
          <span className="rewards-stat__label">Quests Done</span>
        </div>
        <div className="rewards-stat">
          <span className="rewards-stat__value" style={{ color: '#6366f1' }}>
            {levelInfo.current.level}
          </span>
          <span className="rewards-stat__label">Level — {levelInfo.current.title}</span>
        </div>
      </div>

      {/* ── Level progress bar ───────────────────────────────────────────── */}
      <Card style={{ marginBottom: 24 }}>
        <div className="rewards-level-header">
          <span style={{ fontWeight: 700 }}>
            Lv.{levelInfo.current.level} — {levelInfo.current.title}
          </span>
          <span className="mono text-secondary" style={{ fontSize: 13 }}>
            {levelInfo.xpIntoLevel} / {levelInfo.next ? levelInfo.xpForNextLevel : '—'} XP
          </span>
        </div>
        <ProgressBar
          percent={levelInfo.percent}
          color="linear-gradient(135deg, #6366f1, #c026d3 55%, #22d3ee)"
          height={12}
          label={
            <>
              <span className="mono" style={{ fontSize: 12, color: '#656d92' }}>
                {levelInfo.next
                  ? `${levelInfo.xpForNextLevel - levelInfo.xpIntoLevel} XP to next level`
                  : '🏆 Max Level Reached'}
              </span>
              <span className="mono" style={{ fontSize: 12, color: '#656d92' }}>
                Next: {levelInfo.next?.title || '—'}
              </span>
            </>
          }
        />
      </Card>

      {/* ── Badge grid ───────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 32 }}>
        <h2 className="rewards-section-title">🏅 Badges</h2>
        <p className="text-secondary" style={{ fontSize: 13, marginBottom: 16 }}>
          {badgeXPTotal > 0
            ? `You've earned ${badgeXPTotal} XP from badges alone!`
            : 'Complete lessons, quizzes and quests to unlock badges.'}
        </p>
        <BadgeGrid
          badges={badges}
          onSelect={(badge) => setSelectedBadge(badge)}
        />
      </section>

      {/* ── XP History feed ──────────────────────────────────────────────── */}
      <section style={{ marginBottom: 32 }}>
        <h2 className="rewards-section-title">📈 Recent XP Activity</h2>
        {recentXPHistory.length === 0 ? (
          <p className="text-secondary" style={{ fontSize: 13 }}>
            No XP activity yet. Complete your first quiz or lesson to start!
          </p>
        ) : (
          <div className="xp-history-feed">
            {recentXPHistory.map((entry, i) => (
              <div className="xp-history-row" key={entry.id || i}>
                {/* Left: source label */}
                <div className="xp-history-row__info">
                  <span className="xp-history-row__label">
                    {xpSourceLabel(
                      entry.xpAwarded === 50 ? 'perfect' : 'quiz'
                    )}
                  </span>
                  <span className="xp-history-row__meta mono">
                    {entry.skillId
                      ? entry.skillId.charAt(0).toUpperCase() + entry.skillId.slice(1)
                      : 'Activity'}{' '}
                    · {entry.correct}/{entry.total} correct · {entry.date}
                  </span>
                </div>

                {/* Right: XP pill */}
                <XPReward amount={entry.xpAwarded} size="sm" />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Badge detail modal (triggered by clicking a badge in BadgeGrid) ── */}
      {selectedBadge && (
        <AchievementModal
          badge={selectedBadge}
          onClose={() => setSelectedBadge(null)}
        />
      )}

      {/* ── Context-driven achievement modal (auto badge unlock) ─────────── */}
      <AchievementModal badge={lastUnlockedBadge} onClose={clearBadgeToast} />
    </PageContainer>
  );
}

/**
 * useStudentStats — Custom hook (Member 2)
 *
 * Derives all dashboard-level statistics from StudentContext:
 *   - overall progress, learning progress, quest progress, daily progress
 *   - XP history / today's activity
 *   - badge unlocked count
 *   - streak info
 *
 * Usage:
 *   const stats = useStudentStats();
 *   // stats.overallProgress → 0–100
 *   // stats.xpToday        → XP earned today
 */

import { useMemo } from 'react';
import { useProgress } from './useProgress';
import {
  calculateOverallProgress,
  calculateQuestProgress,
  calculateDailyProgress,
} from '../utils/calculateProgress';

export function useStudentStats() {
  const {
    student,
    skillsWithProgress,
    questsWithStatus,
    badges,
    levelInfo,
  } = useProgress();

  return useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);

    // ── Overall learning progress across all skills ──────────────────────────
    const overallProgress = calculateOverallProgress(
      skillsWithProgress,
      student.completedLessonIds
    );

    // ── Learning progress (same as overall for now) ──────────────────────────
    const learningProgress = overallProgress;

    // ── Quest completion rate ─────────────────────────────────────────────────
    const questProgress = calculateQuestProgress(questsWithStatus);

    // ── Daily progress ────────────────────────────────────────────────────────
    const dailyProgress = calculateDailyProgress(
      student.quizHistory,
      student.completedLessonIds,
      student.settings?.dailyGoalMinutes || 20
    );

    // ── XP earned today ───────────────────────────────────────────────────────
    const xpToday = (student.quizHistory || [])
      .filter((h) => h.date === today)
      .reduce((sum, h) => sum + (h.xpAwarded || 0), 0);

    // ── Activity count today (quizzes taken) ──────────────────────────────────
    const activityToday = (student.quizHistory || []).filter(
      (h) => h.date === today
    ).length;

    // ── Badge counts ──────────────────────────────────────────────────────────
    const unlockedBadgesCount = badges.filter((b) => b.unlocked).length;
    const totalBadgesCount = badges.length;

    // ── Completed quests count ────────────────────────────────────────────────
    const completedQuestsCount = (student.completedQuestIds || []).length;

    // ── Completed lessons count ───────────────────────────────────────────────
    const completedLessonsCount = (student.completedLessonIds || []).length;

    // ── Total lessons count ───────────────────────────────────────────────────
    const totalLessonsCount = skillsWithProgress.reduce(
      (sum, s) => sum + (s.lessonIds?.length || 0),
      0
    );

    // ── Streak ────────────────────────────────────────────────────────────────
    const streakCount = student.streak?.count || 0;
    const streakActive = student.streak?.lastActiveDate === today;

    // ── Recent XP history (last 10 quiz entries) ──────────────────────────────
    const recentXPHistory = [...(student.quizHistory || [])]
      .reverse()
      .slice(0, 10);

    return {
      overallProgress,
      learningProgress,
      questProgress,
      dailyProgress,
      xpToday,
      activityToday,
      unlockedBadgesCount,
      totalBadgesCount,
      completedQuestsCount,
      completedLessonsCount,
      totalLessonsCount,
      streakCount,
      streakActive,
      recentXPHistory,
      levelInfo,
      totalXP: student.xp || 0,
    };
  }, [student, skillsWithProgress, questsWithStatus, badges, levelInfo]);
}

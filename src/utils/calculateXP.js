// ─── XP reward table ──────────────────────────────────────────────────────────
export const XP_REWARDS = {
  LESSON_COMPLETE:     20,
  QUIZ_NORMAL:         30,
  QUIZ_PERFECT:        50,
  QUEST_COMPLETE:      40,
  QUEST_COMPLETE_HARD: 50,
  CHALLENGE_COMPLETE:  75,
  BADGE_UNLOCK:        25,
  STREAK_7DAY:        100,
  STREAK_3DAY:         25,
  FIRST_LESSON:        10, // bonus for very first lesson
};

// ─── Difficulty multipliers ───────────────────────────────────────────────────
export const DIFFICULTY_MULTIPLIER = { 1: 1.0, 2: 1.25, 3: 1.5 };

/**
 * Calculate XP earned from a quiz result.
 * Scales by accuracy and grants a perfect-score bonus.
 */
export function calculateQuizXP(correctCount, totalCount) {
  if (totalCount === 0 || correctCount === 0) return 0;
  const accuracy = correctCount / totalCount;
  if (accuracy === 1) return XP_REWARDS.QUIZ_PERFECT;
  return Math.round(XP_REWARDS.QUIZ_NORMAL * accuracy) + correctCount * 2;
}

/**
 * Calculate XP for completing a quest, applying difficulty multiplier.
 */
export function calculateQuestXP(baseXP, difficulty = 1) {
  const multiplier = DIFFICULTY_MULTIPLIER[difficulty] ?? 1;
  return Math.round(baseXP * multiplier);
}

/**
 * Safe XP addition — always returns a non-negative integer.
 */
export function addXP(currentXP, amount) {
  return Math.max(0, (currentXP || 0) + Math.round(amount));
}

/**
 * Return a human-readable label for an XP event source.
 */
export function xpSourceLabel(source) {
  const labels = {
    lesson:    '📘 Lesson Completed',
    quiz:      '🧠 Quiz Passed',
    quest:     '⚔️ Quest Finished',
    badge:     '🏅 Badge Unlocked',
    streak:    '🔥 Streak Bonus',
    challenge: '💪 Challenge Cleared',
    perfect:   '⭐ Perfect Score',
  };
  return labels[source] || '✨ XP Earned';
}

/**
 * Compute overall progress percentage across all skills.
 * completedLessons: number of completed lesson IDs
 * totalLessons: total lesson count across all skills
 */
export function calculateOverallProgress(completedLessons, totalLessons) {
  if (!totalLessons) return 0;
  return Math.round((completedLessons / totalLessons) * 100);
}

/**
 * Compute daily progress percentage towards a daily goal.
 * dailyGoalMinutes: minutes the user wants to study per day
 * minutesToday: estimated minutes (approx 5 min per lesson/quiz)
 */
export function calculateDailyProgress(activityCountToday, dailyGoalMinutes) {
  const minutesPerActivity = 5;
  const earned = activityCountToday * minutesPerActivity;
  return Math.min(100, Math.round((earned / (dailyGoalMinutes || 20)) * 100));
}

export const XP_REWARDS = {
  LESSON_COMPLETE: 20,
  QUIZ_NORMAL: 30,
  QUIZ_PERFECT: 50,
  QUEST_COMPLETE: 40,
  QUEST_COMPLETE_HARD: 50,
  CHALLENGE_COMPLETE: 75,
  BADGE_UNLOCK: 25,
  STREAK_7DAY: 100,
};

export function calculateQuizXP(correctCount, totalCount) {
  if (totalCount === 0 || correctCount === 0) return 0;
  const accuracy = correctCount / totalCount;
  if (accuracy === 1) return XP_REWARDS.QUIZ_PERFECT;
  return Math.round(XP_REWARDS.QUIZ_NORMAL * accuracy) + correctCount * 2;
}

export function addXP(currentXP, amount) {
  return Math.max(0, currentXP + amount);
}

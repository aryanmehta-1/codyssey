
export function calculateSkillProgress(skill, completedLessonIds = []) {
  if (!skill || !skill.lessonIds || skill.lessonIds.length === 0) return 0;
  const done = skill.lessonIds.filter((id) => completedLessonIds.includes(id)).length;
  return Math.round((done / skill.lessonIds.length) * 100);
}

export function completedLessonsCountForSkill(skill, completedLessonIds = []) {
  if (!skill || !skill.lessonIds) return 0;
  return skill.lessonIds.filter((id) => completedLessonIds.includes(id)).length;
}

export function getSkillStatus(skill, completedLessonIds, unlockedSkillIds) {
  const progress = calculateSkillProgress(skill, completedLessonIds);
  if (progress === 100) return 'completed';
  if (!unlockedSkillIds.includes(skill.id)) return 'locked';
  if (progress > 0) return 'current';
  return 'available';
}

/**
 * Overall progress across ALL skills combined (0–100).
 */
export function calculateOverallProgress(skills, completedLessonIds) {
  const totalLessons = skills.reduce((sum, s) => sum + (s.lessonIds?.length || 0), 0);
  if (!totalLessons) return 0;
  const done = completedLessonIds.length;
  return Math.min(100, Math.round((done / totalLessons) * 100));
}

/**
 * Daily progress: activities completed today vs daily goal (minutes / 5 min each).
 */
export function calculateDailyProgress(quizHistory, completedLessonIds, dailyGoalMinutes = 20) {
  const today = new Date().toISOString().slice(0, 10);
  const todayQuizzes = (quizHistory || []).filter((h) => h.date === today).length;
  // Heuristic: each quiz/lesson ≈ 5 min
  const minutesEarned = todayQuizzes * 5;
  return Math.min(100, Math.round((minutesEarned / dailyGoalMinutes) * 100));
}

/**
 * Learning progress: % of lessons completed.
 */
export function calculateLearningProgress(skills, completedLessonIds) {
  return calculateOverallProgress(skills, completedLessonIds);
}

/**
 * Quest completion rate (0–100).
 */
export function calculateQuestProgress(questsWithStatus) {
  if (!questsWithStatus || questsWithStatus.length === 0) return 0;
  const done = questsWithStatus.filter((q) => q.status === 'completed').length;
  return Math.round((done / questsWithStatus.length) * 100);
}

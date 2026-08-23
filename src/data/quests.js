/**
 * Quests are the primary gameplay loop: Learning, Quiz, Challenge, Daily, Streak.
 * status is derived at runtime (locked/available/active/completed) based on
 * the student's completedLessonIds / completedQuestIds — never hardcoded.
 */
export const quests = [
  { id: 'q-html-basics', title: 'Foundations of HTML', type: 'learning', skillId: 'html', xp: 20, difficulty: 1, requiresLessonIds: ['html-1'], description: 'Complete the "Structure & Semantic Tags" lesson.' },
  { id: 'q-html-quiz', title: 'HTML Knowledge Check', type: 'quiz', skillId: 'html', xp: 30, difficulty: 1, description: 'Answer 5 questions on HTML fundamentals.' },
  { id: 'q-css-basics', title: 'Style It Up', type: 'learning', skillId: 'css', xp: 20, difficulty: 1, requiresLessonIds: ['css-1'], description: 'Complete the "Selectors & Specificity" lesson.' },
  { id: 'q-css-flexbox', title: 'CSS Flexbox', type: 'challenge', skillId: 'css', xp: 40, difficulty: 2, description: 'Prove you can lay out a navbar with Flexbox.' },
  { id: 'q-css-quiz', title: 'CSS Knowledge Check', type: 'quiz', skillId: 'css', xp: 30, difficulty: 1, description: 'Answer 5 questions on CSS fundamentals.' },
  { id: 'q-js-arrays', title: 'Array Master', type: 'challenge', skillId: 'javascript', xp: 50, difficulty: 2, description: 'Complete 5 questions on arrays and array methods.' },
  { id: 'q-js-async', title: 'Async Explorer', type: 'learning', skillId: 'javascript', xp: 20, difficulty: 2, requiresLessonIds: ['js-8'], description: 'Complete the "Promises & Async/Await" lesson.' },
  { id: 'q-js-quiz', title: 'JavaScript Arrays', type: 'quiz', skillId: 'javascript', xp: 50, difficulty: 2, description: 'Complete 5 questions.' },
  { id: 'q-js-daily', title: 'Daily Warm-Up', type: 'daily', skillId: 'javascript', xp: 20, difficulty: 1, description: 'Answer 3 quick JavaScript questions to start your day.' },
  { id: 'q-react-components', title: 'Component Builder', type: 'learning', skillId: 'react', xp: 25, difficulty: 2, requiresLessonIds: ['react-1', 'react-2'], description: 'Complete "Components & JSX" and "Props & Composition".' },
  { id: 'q-react-state', title: 'State Master', type: 'challenge', skillId: 'react', xp: 50, difficulty: 3, description: 'Prove you understand useState and useEffect.' },
  { id: 'q-react-quiz', title: 'React Fundamentals Quiz', type: 'quiz', skillId: 'react', xp: 50, difficulty: 3, description: 'Answer 5 questions on React fundamentals.' },
  { id: 'q-streak-3', title: 'Streak Starter', type: 'streak', skillId: null, xp: 25, difficulty: 1, streakDays: 3, description: 'Maintain a 3-day learning streak.' },
  { id: 'q-streak-7', title: 'Streak Master', type: 'streak', skillId: null, xp: 100, difficulty: 2, streakDays: 7, description: 'Maintain a 7-day learning streak.' },
];

export function getQuestsForSkill(skillId) {
  return quests.filter((q) => q.skillId === skillId);
}

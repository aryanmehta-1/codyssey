
export const badges = [
  { id: 'html-hero', name: 'HTML Hero', icon: '🏅', xp: 25, description: 'Complete HTML basics.', condition: { type: 'skillComplete', skillId: 'html' } },
  { id: 'css-creator', name: 'CSS Creator', icon: '🎨', xp: 25, description: 'Complete CSS fundamentals.', condition: { type: 'skillComplete', skillId: 'css' } },
  { id: 'js-rookie', name: 'JavaScript Rookie', icon: '⚡', xp: 25, description: 'Complete JavaScript fundamentals.', condition: { type: 'skillComplete', skillId: 'javascript' } },
  { id: 'react-builder', name: 'React Builder', icon: '🚀', xp: 25, description: 'Complete the React module.', condition: { type: 'skillComplete', skillId: 'react' } },
  { id: 'quiz-warrior', name: 'Quiz Warrior', icon: '🧠', xp: 50, description: 'Complete 10 quizzes.', condition: { type: 'quizzesCompleted', count: 10 } },
  { id: 'streak-starter', name: 'Streak Starter', icon: '🔥', xp: 25, description: 'Maintain a 3-day streak.', condition: { type: 'streak', days: 3 } },
  { id: 'streak-master', name: 'Streak Master', icon: '🔥', xp: 100, description: 'Maintain a 7-day streak.', condition: { type: 'streak', days: 7 } },
  { id: 'first-builder', name: 'First Builder', icon: '🛠️', xp: 25, description: 'Complete your first challenge quest.', condition: { type: 'questsCompletedByType', questType: 'challenge', count: 1 } },
  { id: 'quest-champion', name: 'Quest Champion', icon: '⚔️', xp: 50, description: 'Complete 8 quests of any type.', condition: { type: 'questsCompleted', count: 8 } },
  { id: 'level-5', name: 'Rising Developer', icon: '🌟', xp: 25, description: 'Reach Level 5.', condition: { type: 'level', level: 5 } },
];

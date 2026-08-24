
export const fillBlankExercises = {
  'html-1': { template: '<____>\n  <h1>Codyssey</h1>\n</header>', answer: 'header', options: ['header', 'div', 'span', 'body'] },
  'html-2': { template: '<____ for="email">Email</label>', answer: 'label', options: ['label', 'input', 'span', 'legend'] },
  'html-3': { template: '.card {\n  box-sizing: ____;\n  padding: 16px;\n}', answer: 'border-box', options: ['border-box', 'content-box', 'inherit', 'auto'] },
  'html-4': { template: '@____ (max-width: 640px) {\n  .grid { grid-template-columns: 1fr; }\n}', answer: 'media', options: ['media', 'supports', 'keyframes', 'import'] },
  'html-5': { template: '.row { display: ____; gap: 12px; }', answer: 'flex', options: ['flex', 'grid', 'block', 'inline'] },

  'css-1': { template: '____card { color: red; } /* selects by class */', answer: '.', options: ['.', '#', '*', '&'] },
  'css-2': { template: ':root { ____primary: #5b6ef5; }', answer: '--', options: ['--', '$', '@', '%'] },
  'css-3': { template: '.node { ____: transform 0.2s ease; }', answer: 'transition', options: ['transition', 'animation', 'transform', 'display'] },
  'css-4': { template: '.nav { display: flex; justify-content: ____; }', answer: 'space-between', options: ['space-between', 'center', 'flex-start', 'stretch'] },
  'css-5': { template: '.grid-3 { display: grid;\n  grid-template-columns: repeat(auto-fit, ____(220px, 1fr)); }', answer: 'minmax', options: ['minmax', 'calc', 'clamp', 'var'] },

  'js-1': { template: '____ xp = 820; // cannot be reassigned', answer: 'const', options: ['const', 'let', 'var', 'function'] },
  'js-2': { template: 'const addXP = (current, amount) ____ current + amount;', answer: '=>', options: ['=>', '->', '::', '=='] },
  'js-3': { template: 'const upper = skills.____(s => s.toUpperCase());', answer: 'map', options: ['map', 'filter', 'reduce', 'push'] },
  'js-4': { template: 'const { title, xp } ____ quest;', answer: '=', options: ['=', '==', '=>', ':'] },
  'js-5': { template: 'const updated = { ____quest, status: "completed" };', answer: '...', options: ['...', '**', '::', '&&'] },
  'js-6': { template: 'button.____("click", () => console.log("Quest started"));', answer: 'addEventListener', options: ['addEventListener', 'onClick', 'addListener', 'click'] },
  'js-7': { template: 'localStorage.____("xp", JSON.stringify(870));', answer: 'setItem', options: ['setItem', 'set', 'save', 'put'] },
  'js-8': { template: 'async function loadQuests() {\n  const data = ____ fetchQuests();\n  return data;\n}', answer: 'await', options: ['await', 'async', 'then', 'yield'] },

  'react-1': { template: 'function QuestCard({ title }) {\n  ____ <div className="card">{title}</div>;\n}', answer: 'return', options: ['return', 'render', 'output', 'export'] },
  'react-2': { template: '<QuestCard title="Array Master" ____={50} />', answer: 'xp', options: ['xp', 'XP', 'points', 'reward'] },
  'react-3': { template: 'const [xp, setXP] = ____(820);', answer: 'useState', options: ['useState', 'useEffect', 'useRef', 'useReducer'] },
  'react-4': { template: '____(() => {\n  localStorage.setItem("xp", JSON.stringify(xp));\n}, [xp]);', answer: 'useEffect', options: ['useEffect', 'useState', 'useMemo', 'useCallback'] },
  'react-5': { template: '{quests.____(q => <QuestCard key={q.id} {...q} />)}', answer: 'map', options: ['map', 'filter', 'find', 'reduce'] },
  'react-6': { template: '<____ path="/dashboard" element={<Dashboard />} />', answer: 'Route', options: ['Route', 'Routes', 'Link', 'Navigate'] },
};

export function getFillBlankForLesson(lessonId) {
  return fillBlankExercises[lessonId] || null;
}

export function getQuickCheckForLesson(lesson, allLessonsForSkill, allQuestionsForSkill) {
  if (!allQuestionsForSkill || allQuestionsForSkill.length === 0) return null;
  const lessonIndex = allLessonsForSkill.findIndex((l) => l.id === lesson.id);
  const question = allQuestionsForSkill[lessonIndex % allQuestionsForSkill.length];
  return question;
}

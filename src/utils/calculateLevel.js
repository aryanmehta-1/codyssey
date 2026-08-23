/**
 * Level system for Codyssey.
 * Simple, deterministic XP thresholds — easy to explain in a viva.
 */
export const LEVELS = [
  { level: 1, title: 'Rookie', minXP: 0 },
  { level: 2, title: 'Explorer', minXP: 200 },
  { level: 3, title: 'Coder', minXP: 500 },
  { level: 4, title: 'Builder', minXP: 900 },
  { level: 5, title: 'Developer', minXP: 1400 },
  { level: 6, title: 'Code Master', minXP: 2000 },
];

/** Returns the full level object { level, title, minXP } for a given XP total. */
export function calculateLevel(xp) {
  let current = LEVELS[0];
  for (const lvl of LEVELS) {
    if (xp >= lvl.minXP) current = lvl;
  }
  return current;
}

/** Returns { current, next, xpIntoLevel, xpForNextLevel, percent } for progress bars. */
export function calculateLevelProgress(xp) {
  const current = calculateLevel(xp);
  const idx = LEVELS.findIndex((l) => l.level === current.level);
  const next = LEVELS[idx + 1] || null;

  if (!next) {
    return { current, next: null, xpIntoLevel: xp - current.minXP, xpForNextLevel: 0, percent: 100 };
  }

  const xpIntoLevel = xp - current.minXP;
  const xpForNextLevel = next.minXP - current.minXP;
  const percent = Math.min(100, Math.round((xpIntoLevel / xpForNextLevel) * 100));

  return { current, next, xpIntoLevel, xpForNextLevel, percent };
}


// ─── Level table ──────────────────────────────────────────────────────────────
// Each level requires progressively more XP to keep progression exciting.
export const LEVELS = [
  { level: 1, title: 'Rookie',        minXP: 0    },
  { level: 2, title: 'Explorer',      minXP: 200  },
  { level: 3, title: 'Coder',         minXP: 500  },
  { level: 4, title: 'Builder',       minXP: 900  },
  { level: 5, title: 'Developer',     minXP: 1400 },
  { level: 6, title: 'Code Master',   minXP: 2000 },
];

/**
 * Return the level object that corresponds to the given XP value.
 */
export function calculateLevel(xp) {
  let current = LEVELS[0];
  for (const lvl of LEVELS) {
    if ((xp || 0) >= lvl.minXP) current = lvl;
  }
  return current;
}

/**
 * Return a rich level-progress object for displaying XP bars.
 * Includes: current level, next level, XP into current level,
 * XP needed for next level, and progress percentage.
 */
export function calculateLevelProgress(xp) {
  const safeXP = xp || 0;
  const current = calculateLevel(safeXP);
  const idx = LEVELS.findIndex((l) => l.level === current.level);
  const next = LEVELS[idx + 1] || null;

  if (!next) {
    return {
      current,
      next: null,
      xpIntoLevel: safeXP - current.minXP,
      xpForNextLevel: 0,
      percent: 100,
      totalXP: safeXP,
    };
  }

  const xpIntoLevel = safeXP - current.minXP;
  const xpForNextLevel = next.minXP - current.minXP;
  const percent = Math.min(100, Math.round((xpIntoLevel / xpForNextLevel) * 100));

  return { current, next, xpIntoLevel, xpForNextLevel, percent, totalXP: safeXP };
}

/**
 * Given two XP values (before and after an event), return the new level
 * if a level-up occurred, otherwise null.
 */
export function detectLevelUp(xpBefore, xpAfter) {
  const before = calculateLevel(xpBefore);
  const after = calculateLevel(xpAfter);
  return after.level > before.level ? after : null;
}

/**
 * How many XP remain until the next level.
 */
export function xpUntilNextLevel(xp) {
  const info = calculateLevelProgress(xp);
  if (!info.next) return 0;
  return info.xpForNextLevel - info.xpIntoLevel;
}

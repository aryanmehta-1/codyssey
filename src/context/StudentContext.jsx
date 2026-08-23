import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { skills, skillOrder } from '../data/skills';
import { badges as badgeData } from '../data/badges';
import { quests as questData } from '../data/quests';
import { XP_REWARDS, calculateQuizXP, addXP } from '../utils/calculateXP';
import { calculateLevel, calculateLevelProgress } from '../utils/calculateLevel';
import { calculateSkillProgress, getSkillStatus } from '../utils/calculateProgress';

export const StudentContext = createContext(null);

const DEFAULT_STATE = {
  xp: 0,
  completedLessonIds: [],
  completedQuestIds: [],
  unlockedBadgeIds: [],
  quizHistory: [], // { id, skillId, correct, total, xpAwarded, date }
  streak: { count: 0, lastActiveDate: null },
  settings: {
    displayName: 'Coder',
    learningPreference: 'Web Development',
    dailyGoalMinutes: 20,
    theme: 'dark',
  },
  onboarding: null,
  // Transient markers, consumed and cleared by the effects below —
  // kept in state (not local component state) because they're set
  // from inside a setState updater, which must stay a pure function.
  pendingBadgeUnlock: null,
  pendingLevelUp: null,
};

function todayString() {
  return new Date().toISOString().slice(0, 10);
}

function daysBetween(a, b) {
  const d1 = new Date(a);
  const d2 = new Date(b);
  return Math.round((d2 - d1) / (1000 * 60 * 60 * 24));
}

export function StudentProvider({ children }) {
  const [student, setStudent] = useLocalStorage('codyssey_student', DEFAULT_STATE);
  const [lastUnlockedBadge, setLastUnlockedBadge] = useState(null);
  const [lastLevelUp, setLastLevelUp] = useState(null);
  const [lastComboBonus, setLastComboBonus] = useState(null);

  /** Pure helper — no side effects. Returns the new level object only if XP crossed a level threshold. */
  const getLevelUpIfAny = useCallback((prevXP, nextXP) => {
    const before = calculateLevel(prevXP).level;
    const after = calculateLevel(nextXP).level;
    return after > before ? calculateLevel(nextXP) : null;
  }, []);

  // ---- Derived: unlocked skills (first skill always unlocked; each next
  // skill unlocks once the previous is 100% complete) ----
  const unlockedSkillIds = useMemo(() => {
    const unlocked = [];
    for (let i = 0; i < skillOrder.length; i++) {
      const skillId = skillOrder[i];
      if (i === 0) {
        unlocked.push(skillId);
        continue;
      }
      const prevSkill = skills.find((s) => s.id === skillOrder[i - 1]);
      const prevProgress = calculateSkillProgress(prevSkill, student.completedLessonIds);
      if (prevProgress === 100) unlocked.push(skillId);
    }
    return unlocked;
  }, [student.completedLessonIds]);

  const levelInfo = useMemo(() => calculateLevelProgress(student.xp), [student.xp]);

  const skillsWithProgress = useMemo(
    () =>
      skills.map((skill) => ({
        ...skill,
        progress: calculateSkillProgress(skill, student.completedLessonIds),
        status: getSkillStatus(skill, student.completedLessonIds, unlockedSkillIds),
      })),
    [student.completedLessonIds, unlockedSkillIds]
  );

  const questsWithStatus = useMemo(
    () =>
      questData.map((quest) => {
        const completed = student.completedQuestIds.includes(quest.id);
        let status = 'available';
        if (completed) status = 'completed';
        else if (quest.skillId && !unlockedSkillIds.includes(quest.skillId)) status = 'locked';
        else if (quest.requiresLessonIds) {
          const done = quest.requiresLessonIds.every((id) => student.completedLessonIds.includes(id));
          status = done ? 'completed' : 'available';
        }
        return { ...quest, status };
      }),
    [student.completedQuestIds, student.completedLessonIds, unlockedSkillIds]
  );

  // ---- Badge evaluation ----
  const evaluateBadges = useCallback(
    (draftStudent) => {
      const newlyUnlocked = [];
      for (const badge of badgeData) {
        if (draftStudent.unlockedBadgeIds.includes(badge.id)) continue;
        let met = false;
        const c = badge.condition;
        if (c.type === 'skillComplete') {
          const skill = skills.find((s) => s.id === c.skillId);
          met = calculateSkillProgress(skill, draftStudent.completedLessonIds) === 100;
        } else if (c.type === 'quizzesCompleted') {
          met = draftStudent.quizHistory.length >= c.count;
        } else if (c.type === 'streak') {
          met = draftStudent.streak.count >= c.days;
        } else if (c.type === 'questsCompleted') {
          met = draftStudent.completedQuestIds.length >= c.count;
        } else if (c.type === 'questsCompletedByType') {
          const count = draftStudent.completedQuestIds.filter((id) => {
            const q = questData.find((qq) => qq.id === id);
            return q && q.type === c.questType;
          }).length;
          met = count >= c.count;
        } else if (c.type === 'level') {
          met = calculateLevel(draftStudent.xp).level >= c.level;
        }
        if (met) newlyUnlocked.push(badge);
      }
      return newlyUnlocked;
    },
    []
  );

  /** Pure — returns draft with any newly-unlocked badges applied and recorded as a pending marker. */
  const applyBadgeUnlocks = useCallback(
    (draftStudent) => {
      const newBadges = evaluateBadges(draftStudent);
      if (newBadges.length === 0) return draftStudent;
      return {
        ...draftStudent,
        unlockedBadgeIds: [...draftStudent.unlockedBadgeIds, ...newBadges.map((b) => b.id)],
        xp: addXP(draftStudent.xp, newBadges.reduce((sum, b) => sum + b.xp, 0)),
        pendingBadgeUnlock: newBadges[newBadges.length - 1],
      };
    },
    [evaluateBadges]
  );

  // ---- Streak update: called whenever a meaningful learning action happens ----
  const bumpStreak = useCallback((draftStudent) => {
    const today = todayString();
    const { lastActiveDate, count } = draftStudent.streak;
    if (lastActiveDate === today) return draftStudent; // already counted today
    let newCount = 1;
    if (lastActiveDate) {
      const diff = daysBetween(lastActiveDate, today);
      newCount = diff === 1 ? count + 1 : 1;
    }
    return { ...draftStudent, streak: { count: newCount, lastActiveDate: today } };
  }, []);

  // ---- Public actions ----
  const completeLesson = useCallback(
    (lessonId, xpAmount = XP_REWARDS.LESSON_COMPLETE) => {
      setStudent((prev) => {
        if (prev.completedLessonIds.includes(lessonId)) return prev;
        let next = {
          ...prev,
          completedLessonIds: [...prev.completedLessonIds, lessonId],
          xp: addXP(prev.xp, xpAmount),
        };
        next = bumpStreak(next);
        next = applyBadgeUnlocks(next);
        const leveledUp = getLevelUpIfAny(prev.xp, next.xp);
        if (leveledUp) next.pendingLevelUp = leveledUp;
        return next;
      });
    },
    [setStudent, bumpStreak, applyBadgeUnlocks, getLevelUpIfAny]
  );

  const completeQuest = useCallback(
    (questId) => {
      setStudent((prev) => {
        if (prev.completedQuestIds.includes(questId)) return prev;
        const quest = questData.find((q) => q.id === questId);
        const xpAmount = quest ? quest.xp : XP_REWARDS.QUEST_COMPLETE;
        let next = {
          ...prev,
          completedQuestIds: [...prev.completedQuestIds, questId],
          xp: addXP(prev.xp, xpAmount),
        };
        next = bumpStreak(next);
        next = applyBadgeUnlocks(next);
        const leveledUp = getLevelUpIfAny(prev.xp, next.xp);
        if (leveledUp) next.pendingLevelUp = leveledUp;
        return next;
      });
    },
    [setStudent, bumpStreak, applyBadgeUnlocks, getLevelUpIfAny]
  );

  const submitQuizResult = useCallback(
    ({ skillId, correct, total, questId, comboBonus = 0 }) => {
      const baseXP = calculateQuizXP(correct, total);
      const xpAmount = baseXP + comboBonus;
      setStudent((prev) => {
        let next = {
          ...prev,
          xp: addXP(prev.xp, xpAmount),
          quizHistory: [
            ...prev.quizHistory,
            { id: `quiz-${Date.now()}`, skillId, correct, total, xpAwarded: xpAmount, date: todayString() },
          ],
        };
        if (questId && !next.completedQuestIds.includes(questId)) {
          next.completedQuestIds = [...next.completedQuestIds, questId];
        }
        next = bumpStreak(next);
        next = applyBadgeUnlocks(next);
        const leveledUp = getLevelUpIfAny(prev.xp, next.xp);
        if (leveledUp) next.pendingLevelUp = leveledUp;
        return next;
      });
      if (comboBonus > 0) setLastComboBonus(comboBonus);
      return xpAmount;
    },
    [setStudent, bumpStreak, applyBadgeUnlocks, getLevelUpIfAny]
  );

  const updateSettings = useCallback(
    (partialSettings) => {
      setStudent((prev) => ({ ...prev, settings: { ...prev.settings, ...partialSettings } }));
    },
    [setStudent]
  );

  const setOnboarding = useCallback(
    (onboardingData) => {
      setStudent((prev) => ({ ...prev, onboarding: onboardingData }));
    },
    [setStudent]
  );

  const resetProgress = useCallback(() => {
    setStudent(DEFAULT_STATE);
  }, [setStudent]);

  const clearBadgeToast = useCallback(() => setLastUnlockedBadge(null), []);
  const clearLevelUpToast = useCallback(() => setLastLevelUp(null), []);
  const clearComboBonus = useCallback(() => setLastComboBonus(null), []);

  // ---- Consume transient markers as real effects (not inside the setState
  // updater above, which must stay pure — see getLevelUpIfAny/applyBadgeUnlocks). ----
  useEffect(() => {
    if (student.pendingBadgeUnlock) {
      setLastUnlockedBadge(student.pendingBadgeUnlock);
      setStudent((prev) => ({ ...prev, pendingBadgeUnlock: null }));
    }
  }, [student.pendingBadgeUnlock, setStudent]);

  useEffect(() => {
    if (student.pendingLevelUp) {
      setLastLevelUp(student.pendingLevelUp);
      setStudent((prev) => ({ ...prev, pendingLevelUp: null }));
    }
  }, [student.pendingLevelUp, setStudent]);

  const value = useMemo(
    () => ({
      student,
      levelInfo,
      skillsWithProgress,
      questsWithStatus,
      unlockedSkillIds,
      badges: badgeData.map((b) => ({ ...b, unlocked: student.unlockedBadgeIds.includes(b.id) })),
      lastUnlockedBadge,
      lastLevelUp,
      lastComboBonus,
      completeLesson,
      completeQuest,
      submitQuizResult,
      updateSettings,
      setOnboarding,
      resetProgress,
      clearBadgeToast,
      clearLevelUpToast,
      clearComboBonus,
    }),
    [
      student,
      levelInfo,
      skillsWithProgress,
      questsWithStatus,
      unlockedSkillIds,
      lastUnlockedBadge,
      lastLevelUp,
      lastComboBonus,
      completeLesson,
      completeQuest,
      submitQuizResult,
      updateSettings,
      setOnboarding,
      resetProgress,
      clearBadgeToast,
      clearLevelUpToast,
      clearComboBonus,
    ]
  );

  return <StudentContext.Provider value={value}>{children}</StudentContext.Provider>;
}

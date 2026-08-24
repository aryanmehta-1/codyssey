import { createContext, useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useAuth } from '../hooks/useAuth';
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
  completedQuizIds: [],
  unlockedBadgeIds: [],
  quizHistory: [],
  streak: { count: 0, lastActiveDate: null },
  settings: {
    displayName: 'Coder',
    learningPreference: 'Web Development',
    dailyGoalMinutes: 20,
  },
  onboarding: null,
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
  const { currentUser } = useAuth();

  const storageKey = currentUser?.id ? `codyssey_student_${currentUser.id}` : 'codyssey_student_guest';

  const [student, setStudent] = useLocalStorage(storageKey, DEFAULT_STATE);
  const [lastUnlockedBadge, setLastUnlockedBadge] = useState(null);
  const [lastLevelUp, setLastLevelUp] = useState(null);

  function bumpStreak(draftStudent) {
    const today = todayString();
    const { lastActiveDate, count = 0 } = draftStudent.streak || {};
    if (lastActiveDate === today) return draftStudent;

    let newCount = 1;
    if (lastActiveDate) {
      const diff = daysBetween(lastActiveDate, today);
      newCount = diff === 1 ? count + 1 : 1;
    }
    return { ...draftStudent, streak: { count: newCount, lastActiveDate: today } };
  }

  function checkNewBadges(draftStudent) {
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
      } else if (c.type === 'level') {
        met = calculateLevel(draftStudent.xp).level >= c.level;
      }
      if (met) newlyUnlocked.push(badge);
    }
    return newlyUnlocked;
  }

  function completeLesson(lessonId, xpAmount = XP_REWARDS.LESSON_COMPLETE) {
    setStudent((prev) => {
      const isNew = !prev.completedLessonIds.includes(lessonId);
      const updatedLessons = isNew ? [...prev.completedLessonIds, lessonId] : prev.completedLessonIds;

      const newQuests = [];
      questData.forEach((q) => {
        if (q.requiresLessonIds && q.requiresLessonIds.length > 0) {
          const done = q.requiresLessonIds.every((id) => updatedLessons.includes(id));
          if (done && !prev.completedQuestIds.includes(q.id)) {
            newQuests.push(q.id);
          }
        }
      });

      const updatedQuests = newQuests.length > 0 ? [...prev.completedQuestIds, ...newQuests] : prev.completedQuestIds;
      const newXP = isNew ? addXP(prev.xp, xpAmount) : prev.xp;

      const oldLevel = calculateLevel(prev.xp).level;
      const newLevelObj = calculateLevel(newXP);
      if (newLevelObj.level > oldLevel) {
        setLastLevelUp(newLevelObj);
      }

      let updated = {
        ...prev,
        completedLessonIds: updatedLessons,
        completedQuestIds: updatedQuests,
        xp: newXP,
      };

      updated = bumpStreak(updated);

      const newBadges = checkNewBadges(updated);
      if (newBadges.length > 0) {
        setLastUnlockedBadge(newBadges[newBadges.length - 1]);
        updated.unlockedBadgeIds = [...updated.unlockedBadgeIds, ...newBadges.map((b) => b.id)];
      }

      return updated;
    });
  }

  function completeQuest(questId) {
    setStudent((prev) => {
      if (prev.completedQuestIds.includes(questId)) return prev;
      const quest = questData.find((q) => q.id === questId);
      const reward = quest ? quest.xp : XP_REWARDS.QUEST_COMPLETE;
      const newXP = addXP(prev.xp, reward);

      const oldLevel = calculateLevel(prev.xp).level;
      const newLevelObj = calculateLevel(newXP);
      if (newLevelObj.level > oldLevel) setLastLevelUp(newLevelObj);

      let updated = {
        ...prev,
        completedQuestIds: [...prev.completedQuestIds, questId],
        xp: newXP,
      };

      updated = bumpStreak(updated);

      const newBadges = checkNewBadges(updated);
      if (newBadges.length > 0) {
        setLastUnlockedBadge(newBadges[newBadges.length - 1]);
        updated.unlockedBadgeIds = [...updated.unlockedBadgeIds, ...newBadges.map((b) => b.id)];
      }

      return updated;
    });
  }

  function submitQuizResult({ skillId, correct, total, questId }) {
    const quizId = questId || `quiz-${skillId}`;
    let awardedXP = 0;

    setStudent((prev) => {
      const alreadyDone =
        (questId && prev.completedQuestIds.includes(questId)) ||
        prev.completedQuizIds.includes(quizId) ||
        prev.quizHistory.some((h) => (h.quizId === quizId || h.questId === questId) && h.xpAwarded > 0);

      const earnedXP = alreadyDone ? 0 : calculateQuizXP(correct, total);
      awardedXP = earnedXP;

      const newXP = addXP(prev.xp, earnedXP);
      const oldLevel = calculateLevel(prev.xp).level;
      const newLevelObj = calculateLevel(newXP);
      if (newLevelObj.level > oldLevel && earnedXP > 0) setLastLevelUp(newLevelObj);

      const updatedQuests = questId && !prev.completedQuestIds.includes(questId)
        ? [...prev.completedQuestIds, questId]
        : prev.completedQuestIds;

      const updatedQuizzes = !prev.completedQuizIds.includes(quizId)
        ? [...prev.completedQuizIds, quizId]
        : prev.completedQuizIds;

      let updated = {
        ...prev,
        completedQuestIds: updatedQuests,
        completedQuizIds: updatedQuizzes,
        xp: newXP,
        quizHistory: [
          ...prev.quizHistory,
          {
            id: `quiz-${Date.now()}`,
            quizId,
            questId: questId || null,
            skillId,
            correct,
            total,
            xpAwarded: earnedXP,
            date: todayString(),
          },
        ],
      };

      updated = bumpStreak(updated);

      const newBadges = checkNewBadges(updated);
      if (newBadges.length > 0) {
        setLastUnlockedBadge(newBadges[newBadges.length - 1]);
        updated.unlockedBadgeIds = [...updated.unlockedBadgeIds, ...newBadges.map((b) => b.id)];
      }

      return updated;
    });

    return awardedXP;
  }

  function updateSettings(partialSettings) {
    setStudent((prev) => ({ ...prev, settings: { ...prev.settings, ...partialSettings } }));
  }

  function setOnboarding(onboardingData) {
    setStudent((prev) => ({ ...prev, onboarding: onboardingData }));
  }

  function resetProgress() {
    setStudent(DEFAULT_STATE);
  }

  const unlockedSkillIds = [];
  for (let i = 0; i < skillOrder.length; i++) {
    const skillId = skillOrder[i];
    if (i === 0) {
      unlockedSkillIds.push(skillId);
      continue;
    }
    const prevSkill = skills.find((s) => s.id === skillOrder[i - 1]);
    const prevProgress = calculateSkillProgress(prevSkill, student.completedLessonIds);
    if (prevProgress === 100) unlockedSkillIds.push(skillId);
  }

  const levelInfo = calculateLevelProgress(student.xp);

  const skillsWithProgress = skills.map((skill) => ({
    ...skill,
    progress: calculateSkillProgress(skill, student.completedLessonIds),
    status: getSkillStatus(skill, student.completedLessonIds, unlockedSkillIds),
  }));

  const questsWithStatus = questData.map((quest) => {
    const completed = student.completedQuestIds.includes(quest.id);
    let status = 'available';
    if (completed) status = 'completed';
    else if (quest.type === 'daily') status = 'available';
    else if (quest.skillId && !unlockedSkillIds.includes(quest.skillId)) status = 'locked';
    else if (quest.requiresLessonIds) {
      const done = quest.requiresLessonIds.every((id) => student.completedLessonIds.includes(id));
      status = done ? 'completed' : 'available';
    }
    return { ...quest, status };
  });

  const value = {
    student,
    levelInfo,
    skillsWithProgress,
    questsWithStatus,
    unlockedSkillIds,
    badges: badgeData.map((b) => ({ ...b, unlocked: student.unlockedBadgeIds.includes(b.id) })),
    lastUnlockedBadge,
    lastLevelUp,
    completeLesson,
    completeQuest,
    submitQuizResult,
    updateSettings,
    setOnboarding,
    resetProgress,
    clearBadgeToast: () => setLastUnlockedBadge(null),
    clearLevelUpToast: () => setLastLevelUp(null),
  };

  return <StudentContext.Provider value={value}>{children}</StudentContext.Provider>;
}

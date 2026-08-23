import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer';
import Card from '../components/common/Card';
import LessonCard from '../components/learning/LessonCard';
import InteractiveLesson from '../components/learning/InteractiveLesson';
import { getLessonsForSkill } from '../data/lessons';
import { useProgress } from '../hooks/useProgress';

/**
 * Combines the "Learn" listing and the interactive lesson player in one
 * route (/learn). Selecting a lesson swaps in <InteractiveLesson>, a
 * short Duolingo-style flow (concept -> fill-blank -> quick check -> XP),
 * rather than a static reading pane with a single "mark complete" button.
 */
export default function LearnPage() {
  const location = useLocation();
  const { student, skillsWithProgress, completeLesson } = useProgress();
  const [activeSkillId, setActiveSkillId] = useState(location.state?.skillId || 'html');
  const [activeLesson, setActiveLesson] = useState(null);

  useEffect(() => {
    if (location.state?.skillId) setActiveSkillId(location.state.skillId);
  }, [location.state]);

  const activeSkill = skillsWithProgress.find((s) => s.id === activeSkillId);
  const lessons = getLessonsForSkill(activeSkillId);

  const isCompleted = (id) => student.completedLessonIds.includes(id);

  const handleFinishLesson = () => {
    if (!isCompleted(activeLesson.id)) {
      completeLesson(activeLesson.id, activeLesson.xp);
    }
    setActiveLesson(null);
  };

  return (
    <PageContainer title="Learn">
      <div className="skill-filter">
        {skillsWithProgress.map((skill) => (
          <button
            key={skill.id}
            className={`skill-filter__btn ${activeSkillId === skill.id ? 'skill-filter__btn--active' : ''}`}
            disabled={skill.status === 'locked'}
            onClick={() => {
              setActiveSkillId(skill.id);
              setActiveLesson(null);
            }}
          >
            {skill.icon} {skill.name}
          </button>
        ))}
      </div>

      {activeSkill?.status === 'locked' ? (
        <Card>
          <p>🔒 Complete the previous skill to unlock {activeSkill.name}.</p>
        </Card>
      ) : activeLesson ? (
        <InteractiveLesson
          lesson={activeLesson}
          alreadyCompleted={isCompleted(activeLesson.id)}
          onFinish={handleFinishLesson}
          onExit={() => setActiveLesson(null)}
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {lessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              completed={isCompleted(lesson.id)}
              onClick={() => setActiveLesson(lesson)}
            />
          ))}
        </div>
      )}
    </PageContainer>
  );
}

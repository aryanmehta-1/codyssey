import { useEffect, useState } from 'react';
import { useNavigation } from '../hooks/useNavigation';
import PageContainer from '../components/layout/PageContainer';
import Card from '../components/common/Card';
import LessonCard from '../components/learning/LessonCard';
import InteractiveLesson from '../components/learning/InteractiveLesson';
import { getLessonsForSkill } from '../data/lessons';
import { useProgress } from '../hooks/useProgress';

export default function LearnPage() {
  const { pageParams } = useNavigation();
  const { student, skillsWithProgress, completeLesson } = useProgress();
  const [activeSkillId, setActiveSkillId] = useState(pageParams?.skillId || 'html');
  const [activeLesson, setActiveLesson] = useState(null);

  useEffect(() => {
    if (pageParams?.skillId) setActiveSkillId(pageParams.skillId);
  }, [pageParams]);

  const activeSkill = skillsWithProgress.find((s) => s.id === activeSkillId);
  const lessons = getLessonsForSkill(activeSkillId);

  const isCompleted = (id) => student.completedLessonIds.includes(id);

  const handleFinishLesson = (rewardXP) => {
    completeLesson(activeLesson.id, rewardXP);
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

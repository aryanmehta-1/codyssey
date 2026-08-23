import { useMemo, useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import ConfettiBurst from '../common/ConfettiBurst';
import FillBlankExercise from './FillBlankExercise';
import QuickCheckStep from './QuickCheckStep';
import LessonProgressBar from './LessonProgressBar';
import { getFillBlankForLesson, getQuickCheckForLesson } from '../../data/lessonExercises';
import { getQuestionsForSkill } from '../../data/questions';
import { getLessonsForSkill } from '../../data/lessons';
import './learning.css';

/**
 * Duolingo-style interactive lesson flow: short concept card → fill-in-the-blank
 * code exercise → quick-check question → celebratory completion screen.
 * Each step gives instant feedback; the full lesson.xp is awarded once, on
 * completion, via onFinish — this component never touches XP math directly.
 */
export default function InteractiveLesson({ lesson, alreadyCompleted, onFinish, onExit }) {
  const fillBlank = useMemo(() => getFillBlankForLesson(lesson.id), [lesson.id]);
  const quickCheck = useMemo(() => {
    const skillLessons = getLessonsForSkill(lesson.skillId);
    const skillQuestions = getQuestionsForSkill(lesson.skillId, 8);
    return getQuickCheckForLesson(lesson, skillLessons, skillQuestions);
  }, [lesson.id, lesson.skillId]);

  const steps = useMemo(() => {
    const s = ['learn'];
    if (fillBlank) s.push('fillBlank');
    if (quickCheck) s.push('quickCheck');
    s.push('complete');
    return s;
  }, [fillBlank, quickCheck]);

  const [stepIndex, setStepIndex] = useState(0);
  const [correctStreak, setCorrectStreak] = useState(0);

  const advance = (wasCorrect) => {
    if (wasCorrect) setCorrectStreak((c) => c + 1);
    setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  };

  const currentStep = steps[stepIndex];

  return (
    <Card>
      <LessonProgressBar stepIndex={stepIndex} totalSteps={steps.length} onExit={onExit} />

      {currentStep === 'learn' && (
        <div className="lesson-content">
          <div>
            <p className="eyebrow">{lesson.xp} XP Reward</p>
            <h2>{lesson.title}</h2>
          </div>
          {lesson.content.map((para, i) => (
            <p key={i} className="text-secondary" style={{ lineHeight: 1.7 }}>{para}</p>
          ))}
          {lesson.code && <pre className="lesson-content__code">{lesson.code}</pre>}
          <Button fullWidth onClick={() => advance(true)}>Let's Practice →</Button>
        </div>
      )}

      {currentStep === 'fillBlank' && fillBlank && (
        <FillBlankExercise exercise={fillBlank} onComplete={advance} />
      )}

      {currentStep === 'quickCheck' && quickCheck && (
        <QuickCheckStep question={quickCheck} onComplete={advance} />
      )}

      {currentStep === 'complete' && (
        <div className="lesson-complete" style={{ position: 'relative' }}>
          {correctStreak === steps.length - 2 && steps.length > 2 && <ConfettiBurst pieceCount={30} />}
          <div className="lesson-complete__burst">🎉</div>
          <h2>Lesson Complete!</h2>
          <p className="text-secondary" style={{ marginBottom: 6 }}>
            {correctStreak === steps.length - 2 && steps.length > 2
              ? 'Perfect run — you nailed every step!'
              : 'Nice work — keep the momentum going.'}
          </p>
          <p className="badge-chip badge-chip--xp" style={{ fontSize: 15, padding: '10px 18px', margin: '14px 0' }}>
            {alreadyCompleted ? 'Already earned' : `+${lesson.xp} XP`}
          </p>
          <Button size="lg" fullWidth onClick={onFinish} disabled={alreadyCompleted}>
            {alreadyCompleted ? '✓ Lesson Already Completed' : 'Claim XP & Continue'}
          </Button>
        </div>
      )}
    </Card>
  );
}

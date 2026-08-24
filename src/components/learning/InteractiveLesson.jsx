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

export default function InteractiveLesson({
  lesson,
  alreadyCompleted,
  onFinish,
  onExit,
}) {
  const fillBlank = useMemo(
    () => getFillBlankForLesson(lesson.id),
    [lesson.id]
  );

  const quickCheck = useMemo(() => {
    const skillLessons = getLessonsForSkill(lesson.skillId);
    const skillQuestions = getQuestionsForSkill(lesson.skillId, 8);

    return getQuickCheckForLesson(
      lesson,
      skillLessons,
      skillQuestions
    );
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
  const [mistakes, setMistakes] = useState(0);
  const [attemptKey, setAttemptKey] = useState(0);

  const getRewardXP = () => {
    if (correctStreak === 0 && mistakes > 0) {
      return 0;
    }
    if (mistakes === 0) {
      return lesson.xp;
    }
    if (mistakes === 1) {
      return Math.max(0, Math.round(lesson.xp * 0.50));
    }
    return 0;
  };

  const rewardXP = getRewardXP();

  const advance = (wasCorrect) => {
    if (wasCorrect) {
      setCorrectStreak((c) => c + 1);
    } else {
      setMistakes((m) => m + 1);
    }

    setStepIndex((i) =>
      Math.min(i + 1, steps.length - 1)
    );
  };

  const handleAttemptAgain = () => {
    setAttemptKey((k) => k + 1);
    setStepIndex(0);
    setCorrectStreak(0);
    setMistakes(0);
  };

  const currentStep = steps[stepIndex];

  return (
    <Card>
      <LessonProgressBar
        stepIndex={stepIndex}
        totalSteps={steps.length}
        onExit={onExit}
      />

      {currentStep === 'learn' && (
        <div className="lesson-content">
          <div>
            <p className="eyebrow">
              {lesson.xp} XP Reward
            </p>

            <h2>{lesson.title}</h2>
          </div>

          {lesson.content.map((para, i) => (
            <p
              key={i}
              className="text-secondary"
              style={{ lineHeight: 1.7 }}
            >
              {para}
            </p>
          ))}

          {lesson.code && (
            <pre className="lesson-content__code">
              {lesson.code}
            </pre>
          )}

          <Button
            fullWidth
            onClick={() => advance(true)}
          >
            Let's Practice →
          </Button>
        </div>
      )}

      {currentStep === 'fillBlank' && fillBlank && (
        <FillBlankExercise
          key={`fillBlank-${attemptKey}`}
          exercise={fillBlank}
          onComplete={advance}
        />
      )}

      {currentStep === 'quickCheck' && quickCheck && (
        <QuickCheckStep
          key={`quickCheck-${attemptKey}`}
          question={quickCheck}
          onComplete={advance}
        />
      )}

      {currentStep === 'complete' && (
        <div
          className="lesson-complete"
          style={{ position: 'relative' }}
        >
          {mistakes === 0 && steps.length > 2 && (
            <ConfettiBurst pieceCount={30} />
          )}

          <div className="lesson-complete__burst">
            {mistakes === 0 ? '🎉' : '👍'}
          </div>

          <h2>Lesson Complete!</h2>

          {mistakes === 0 ? (
            <p
              className="text-secondary"
              style={{ marginBottom: 6 }}
            >
              Perfect run — you nailed every step!
            </p>
          ) : (
            <p
              className="text-secondary"
              style={{ marginBottom: 6 }}
            >
              You made {mistakes}{' '}
              {mistakes === 1 ? 'mistake' : 'mistakes'}.
              Try again to get the full XP!
            </p>
          )}

          <p
            className="badge-chip badge-chip--xp"
            style={{
              fontSize: 15,
              padding: '10px 18px',
              margin: '14px 0',
            }}
          >
            +{rewardXP} XP
          </p>

          {mistakes > 0 && (
            <p
              className="text-secondary"
              style={{
                fontSize: 13,
                marginBottom: 16,
              }}
            >
              Full reward: {lesson.xp} XP
            </p>
          )}

          {mistakes > 0 && (
            <Button
              size="lg"
              fullWidth
              variant="secondary"
              onClick={handleAttemptAgain}
              style={{ marginBottom: 22 }}
            >
              🔄 Attempt Again
            </Button>
          )}

          <Button
            size="lg"
            fullWidth
            onClick={() => onFinish(rewardXP)}
            style={{ marginBottom: 16 }}
          >
            {alreadyCompleted
              ? `⚡ Claim +${rewardXP} Practice XP`
              : `⚡ Claim +${rewardXP} XP`}
          </Button>
        </div>
      )}
    </Card>
  );
}
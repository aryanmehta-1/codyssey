import { useState } from 'react';
import { useNavigation } from '../hooks/useNavigation';
import PageContainer from '../components/layout/PageContainer';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import ConfettiBurst from '../components/common/ConfettiBurst';
import QuestionCard from '../components/assessment/QuestionCard';
import QuizResult from '../components/assessment/QuizResult';
import { getQuestionsForSkill } from '../data/questions';
import { useProgress } from '../hooks/useProgress';

export default function AssessmentPage() {
  const { pageParams, navigate } = useNavigation();
  const { submitQuizResult } = useProgress();

  
  const skillId = pageParams?.skillId || 'html';
  const questId = pageParams?.questId || null;
  const questTitle = pageParams?.questTitle || 'Practice Quiz';
  const questionCount = pageParams?.questionCount || (questId?.includes('daily') ? 3 : 5);

  
  const [questions, setQuestions] = useState(() => getQuestionsForSkill(skillId, questionCount));
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [xpAwarded, setXpAwarded] = useState(0);

  
  const handleReattempt = () => {
    setQuestions(getQuestionsForSkill(skillId, questionCount));
    setIndex(0);
    setSelected(null);
    setRevealed(false);
    setCorrectCount(0);
    setFinished(false);
    setIsSubmitting(false);
    setXpAwarded(0);
  };

  
  if (!questions || questions.length === 0) {
    return (
      <PageContainer title="Quiz">
        <Card><p>No questions available for this skill yet.</p></Card>
      </PageContainer>
    );
  }

  const current = questions[index];
  const isPerfect = finished && correctCount === questions.length;

  
  const handleSelect = (optionIndex) => {
    setSelected(optionIndex);
    setRevealed(true);
    if (optionIndex === current.correctIndex) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  
  const handleNext = () => {
    if (isSubmitting) return;

    
    if (index < questions.length - 1) {
      setIndex((prev) => prev + 1);
      setSelected(null);
      setRevealed(false);
      return;
    }

    
    setIsSubmitting(true);
    const awarded = submitQuizResult({
      skillId,
      correct: correctCount,
      total: questions.length,
      questId,
    });

    setXpAwarded(awarded);
    setFinished(true);
  };

  
  if (finished) {
    return (
      <PageContainer title={questTitle}>
        <Card style={{ position: 'relative', overflow: 'hidden' }}>
          {isPerfect && <ConfettiBurst pieceCount={40} />}
          <QuizResult
            correct={correctCount}
            total={questions.length}
            xpAwarded={xpAwarded}
            perfect={isPerfect}
            onContinue={() => navigate('quests')}
            onReattempt={handleReattempt}
          />
        </Card>
      </PageContainer>
    );
  }

  
  return (
    <PageContainer title={questTitle}>
      <Card>
        <QuestionCard
          question={current}
          index={index}
          total={questions.length}
          selectedIndex={selected}
          revealed={revealed}
          onSelect={handleSelect}
        />

        {revealed && (
          <div
            className={`quiz-feedback ${selected === current.correctIndex ? 'quiz-feedback--correct' : 'quiz-feedback--incorrect'}`}
            style={{ marginTop: 16 }}
          >
            {selected === current.correctIndex ? '🎉 Correct! ' : '❌ Not quite. '}
            {current.explanation}
          </div>
        )}

        <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={handleNext} disabled={!revealed || isSubmitting}>
            {index < questions.length - 1 ? 'Next Question' : isSubmitting ? 'Submitting...' : 'See Results'}
          </Button>
        </div>
      </Card>
    </PageContainer>
  );
}

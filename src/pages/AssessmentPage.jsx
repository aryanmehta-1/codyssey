import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import ConfettiBurst from '../components/common/ConfettiBurst';
import QuestionCard from '../components/assessment/QuestionCard';
import QuizResult from '../components/assessment/QuizResult';
import { getQuestionsForSkill } from '../data/questions';
import { useProgress } from '../hooks/useProgress';

const COMBO_BONUS_PER_STEP = 4; // small XP bonus per combo tier, on top of base quiz XP

export default function AssessmentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { submitQuizResult } = useProgress();

  const skillId = location.state?.skillId || 'html';
  const questId = location.state?.questId || null;
  const questTitle = location.state?.questTitle || 'Practice Quiz';

  const questions = useMemo(() => getQuestionsForSkill(skillId, 5), [skillId]);

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [finished, setFinished] = useState(false);
  const [xpAwarded, setXpAwarded] = useState(0);
  const [comboBonusEarned, setComboBonusEarned] = useState(0);

  if (questions.length === 0) {
    return (
      <PageContainer title="Quiz">
        <Card><p>No questions available for this skill yet.</p></Card>
      </PageContainer>
    );
  }

  const current = questions[index];
  const isPerfect = finished && correctCount === questions.length;

  const handleSelect = (i) => {
    setSelected(i);
    setRevealed(true);
    if (i === current.correctIndex) {
      setCorrectCount((c) => c + 1);
      setCombo((c) => {
        const next = c + 1;
        setMaxCombo((m) => Math.max(m, next));
        return next;
      });
    } else {
      setCombo(0);
    }
  };

  const handleNext = () => {
    if (index < questions.length - 1) {
      setIndex((i) => i + 1);
      setSelected(null);
      setRevealed(false);
      return;
    }
    const finalComboBonus = maxCombo >= 3 ? (maxCombo - 2) * COMBO_BONUS_PER_STEP : 0;
    const awarded = submitQuizResult({
      skillId,
      correct: correctCount,
      total: questions.length,
      questId,
      comboBonus: finalComboBonus,
    });
    setComboBonusEarned(finalComboBonus);
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
            comboBonus={comboBonusEarned}
            perfect={isPerfect}
            onContinue={() => navigate('/quests')}
          />
        </Card>
      </PageContainer>
    );
  }

  return (
    <PageContainer title={questTitle}>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
          {combo >= 2 && (
            <span className="combo-meter combo-pop" key={combo}>
              🔥 {combo}x Combo
            </span>
          )}
        </div>

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
          <Button onClick={handleNext} disabled={!revealed}>
            {index < questions.length - 1 ? 'Next Question' : 'See Results'}
          </Button>
        </div>
      </Card>
    </PageContainer>
  );
}

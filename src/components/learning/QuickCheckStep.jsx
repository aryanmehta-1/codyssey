import { useState } from 'react';
import QuestionCard from '../assessment/QuestionCard';
import Button from '../common/Button';

/** Single-question "quick check" step inside the interactive lesson flow. */
export default function QuickCheckStep({ question, onComplete }) {
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);

  const handleSelect = (i) => {
    setSelected(i);
    setRevealed(true);
  };

  const isCorrect = selected === question.correctIndex;

  return (
    <div>
      <p className="eyebrow" style={{ marginBottom: 10 }}>Quick check</p>
      <QuestionCard
        question={question}
        index={0}
        total={1}
        selectedIndex={selected}
        revealed={revealed}
        onSelect={handleSelect}
      />
      {revealed && (
        <div className={`quiz-feedback ${isCorrect ? 'quiz-feedback--correct' : 'quiz-feedback--incorrect'}`} style={{ marginTop: 16 }}>
          {isCorrect ? '🎉 Correct! ' : '❌ Not quite. '}
          {question.explanation}
        </div>
      )}
      <Button fullWidth disabled={!revealed} onClick={() => onComplete(isCorrect)} style={{ marginTop: 18 }}>
        Continue
      </Button>
    </div>
  );
}

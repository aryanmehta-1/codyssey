import { useState } from 'react';
import QuestionCard from '../assessment/QuestionCard';
import Button from '../common/Button';

export default function QuickCheckStep({ question, onComplete }) {
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);

  const handleSelect = (i) => {
    setSelected(i);
    setRevealed(true);
  };

  const isCorrect = selected === question.correctIndex;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <p className="eyebrow">Quick check</p>
      <QuestionCard
        question={question}
        index={0}
        total={1}
        selectedIndex={selected}
        revealed={revealed}
        onSelect={handleSelect}
      />
      {revealed && (
        <div className={`quiz-feedback ${isCorrect ? 'quiz-feedback--correct' : 'quiz-feedback--incorrect'}`}>
          {isCorrect ? '🎉 Correct! ' : '❌ Not quite. '}
          {question.explanation}
        </div>
      )}
      <Button fullWidth disabled={!revealed} onClick={() => onComplete(isCorrect)}>
        Continue
      </Button>
    </div>
  );
}

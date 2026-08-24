import { useState } from 'react';
import './learning.css';

export default function FillBlankExercise({ exercise, onComplete }) {
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);

  const [before, after] = exercise.template.split('____');
  const isCorrect = selected === exercise.answer;

  const handlePick = (option) => {
    if (revealed) return;
    setSelected(option);
    setRevealed(true);
  };

  return (
    <div className="fill-blank">
      <p className="eyebrow" style={{ marginBottom: 10 }}>Complete the code</p>
      <pre className="lesson-content__code fill-blank__code">
        {before}
        <span
          className={`fill-blank__slot ${
            revealed ? (isCorrect ? 'fill-blank__slot--correct' : 'fill-blank__slot--incorrect') : ''
          }`}
        >
          {selected || '____'}
        </span>
        {after}
      </pre>

      <div className="fill-blank__options">
        {exercise.options.map((opt) => {
          let cls = 'fill-blank__chip';
          if (revealed && opt === exercise.answer) cls += ' fill-blank__chip--correct';
          else if (revealed && opt === selected) cls += ' fill-blank__chip--incorrect';
          return (
            <button key={opt} className={cls} onClick={() => handlePick(opt)} disabled={revealed}>
              {opt}
            </button>
          );
        })}
      </div>

      {revealed && (
        <div className={`quiz-feedback ${isCorrect ? 'quiz-feedback--correct' : 'quiz-feedback--incorrect'}`} style={{ marginTop: 14 }}>
          {isCorrect ? '🎉 Nice! That\'s correct.' : `Not quite — the correct answer is "${exercise.answer}".`}
        </div>
      )}

      <button
        className="btn btn--primary btn--md"
        style={{ marginTop: 18, width: '100%' }}
        disabled={!revealed}
        onClick={() => onComplete(isCorrect)}
      >
        Continue
      </button>
    </div>
  );
}

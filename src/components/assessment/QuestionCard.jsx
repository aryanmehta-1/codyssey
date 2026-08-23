import Option from './Option';
import './assessment.css';

/** Renders one question with its options; "concept" and "output" types share this UI. */
export default function QuestionCard({ question, index, total, selectedIndex, revealed, onSelect }) {
  return (
    <div className="question-card">
      <span className="question-card__counter">QUESTION {index + 1} / {total}</span>
      <div className="question-card__prompt">{question.prompt}</div>
      <div className="option-list">
        {question.options.map((opt, i) => (
          <Option
            key={i}
            text={opt}
            selected={selectedIndex === i}
            revealed={revealed}
            isCorrect={i === question.correctIndex}
            onSelect={() => !revealed && onSelect(i)}
          />
        ))}
      </div>
    </div>
  );
}

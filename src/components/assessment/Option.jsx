import './assessment.css';

export default function Option({ text, selected, revealed, isCorrect, onSelect }) {
  let className = 'option-btn';
  if (revealed && isCorrect) className += ' option-btn--correct';
  else if (revealed && selected && !isCorrect) className += ' option-btn--incorrect';
  else if (selected) className += ' option-btn--selected';

  return (
    <button className={className} onClick={onSelect} disabled={revealed}>
      {text}
    </button>
  );
}

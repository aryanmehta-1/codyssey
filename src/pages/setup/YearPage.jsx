import { years } from '../../data/courses';

export default function YearPage({ value, onSelect }) {
  return (
    <>
      <h2>What year are you in?</h2>
      <div className="setup-options">
        {years.map((y) => (
          <button key={y} className={`setup-option ${value === y ? 'setup-option--selected' : ''}`} onClick={() => onSelect(y)}>
            {y}
          </button>
        ))}
      </div>
    </>
  );
}

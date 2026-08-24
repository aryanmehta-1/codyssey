import { degrees } from '../../data/courses';

export default function DegreePage({ value, onSelect }) {
  return (
    <>
      <h2>What's your degree?</h2>
      <p className="text-secondary" style={{ fontSize: 13 }}>This helps us tailor the pace of your quests.</p>
      <div className="setup-options">
        {degrees.map((d) => (
          <button key={d} className={`setup-option ${value === d ? 'setup-option--selected' : ''}`} onClick={() => onSelect(d)}>
            {d}
          </button>
        ))}
      </div>
    </>
  );
}

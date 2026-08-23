import { colleges } from '../../data/colleges';

/** Step 3 of onboarding — college selection. */
export default function CollegePage({ value, onSelect }) {
  return (
    <>
      <h2>Which college are you at?</h2>
      <div className="setup-options">
        {colleges.map((c) => (
          <button key={c} className={`setup-option ${value === c ? 'setup-option--selected' : ''}`} onClick={() => onSelect(c)}>
            {c}
          </button>
        ))}
      </div>
    </>
  );
}

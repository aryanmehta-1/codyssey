import { branches } from '../../data/courses';

/** Step 2 of onboarding — branch selection. */
export default function BranchPage({ value, onSelect }) {
  return (
    <>
      <h2>What's your branch?</h2>
      <p className="text-secondary" style={{ fontSize: 13 }}>We'll surface quests relevant to your track.</p>
      <div className="setup-options">
        {branches.map((b) => (
          <button key={b} className={`setup-option ${value === b ? 'setup-option--selected' : ''}`} onClick={() => onSelect(b)}>
            {b}
          </button>
        ))}
      </div>
    </>
  );
}

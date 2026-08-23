import { careerGoals } from '../../data/courses';

/** Step 5 of onboarding — career goal selection, final step. */
export default function CareerGoalPage({ value, onSelect }) {
  return (
    <>
      <h2>What's your goal?</h2>
      <p className="text-secondary" style={{ fontSize: 13 }}>We'll shape your first quests around this.</p>
      <div className="setup-options">
        {careerGoals.map((g) => (
          <button key={g} className={`setup-option ${value === g ? 'setup-option--selected' : ''}`} onClick={() => onSelect(g)}>
            {g}
          </button>
        ))}
      </div>
    </>
  );
}

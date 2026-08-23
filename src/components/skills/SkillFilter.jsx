import './skills.css';

/** Status filter pills for the Skills page (all / current / completed / locked). */
export default function SkillFilter({ value, onChange }) {
  const options = ['all', 'current', 'completed', 'locked'];
  return (
    <div className="skill-filter">
      {options.map((opt) => (
        <button
          key={opt}
          className={`skill-filter__btn ${value === opt ? 'skill-filter__btn--active' : ''}`}
          onClick={() => onChange(opt)}
        >
          {opt[0].toUpperCase() + opt.slice(1)}
        </button>
      ))}
    </div>
  );
}

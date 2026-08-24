import './codeverse.css';

export default function LearningNode({ skill, onClick }) {
  const isLocked = skill.status === 'locked';
  const isCurrent = skill.status === 'current';

  return (
    <div className="codeverse-node-wrap">
      <div
        className={`node node--${skill.status}`}
        onClick={() => !isLocked && onClick(skill)}
        role="button"
        tabIndex={isLocked ? -1 : 0}
      >
        {isCurrent && <span className="node-orbit-dot" aria-hidden="true" />}
        <span className="node__icon">{isLocked ? '🔒' : skill.icon}</span>
        <div className="node__label">{skill.codeverseLabel}</div>
        <div className={`node__status node__status--${skill.status}`}>
          {skill.status === 'locked' && 'Locked'}
          {skill.status === 'available' && 'Available'}
          {skill.status === 'current' && `${skill.progress}% · Current`}
          {skill.status === 'completed' && `${skill.progress}% · Completed`}
        </div>
      </div>
    </div>
  );
}

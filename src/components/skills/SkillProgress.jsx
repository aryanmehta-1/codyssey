import ProgressBar from '../common/ProgressBar';

export default function SkillProgress({ skill }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
        <span>{skill.icon} {skill.name}</span>
        <span className="mono text-secondary">{skill.progress}%</span>
      </div>
      <ProgressBar percent={skill.progress} color={skill.color} height={7} />
    </div>
  );
}

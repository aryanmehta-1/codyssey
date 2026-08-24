import Link from '../common/Link';
import Card from '../common/Card';
import ProgressBar from '../common/ProgressBar';
import './dashboard.css';

export default function SkillOverview({ skills }) {
  return (
    <Card className="skill-overview">
      <div className="today-plan__header">
        <h3>Skill Progress</h3>
        <Link to="learn" className="text-secondary" style={{ fontSize: 13 }}>View all</Link>
      </div>
      {skills.map((skill) => (
        <div className="skill-overview__row" key={skill.id}>
          <div className="skill-overview__row-top">
            <span className="skill-overview__name">
              {skill.icon} {skill.name}
            </span>
            <span className="mono text-secondary">{skill.progress}%</span>
          </div>
          <ProgressBar percent={skill.progress} color={skill.color} height={8} />
        </div>
      ))}
    </Card>
  );
}

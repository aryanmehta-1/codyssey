import { Link } from 'react-router-dom';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import ProgressBar from '../common/ProgressBar';
import { completedLessonsCountForSkill } from '../../utils/calculateProgress';
import './skills.css';

/** Skill overview card with progress, lesson count, and status-aware CTA. */
export default function SkillCard({ skill, completedLessonIds }) {
  const doneCount = completedLessonsCountForSkill(skill, completedLessonIds);
  const total = skill.lessonIds.length;
  const isLocked = skill.status === 'locked';

  const statusTone = { locked: 'locked', available: 'default', current: 'primary', completed: 'success' }[skill.status];

  return (
    <Card className="skill-card" hover={!isLocked}>
      <div className="skill-card__top">
        <div className="skill-card__title">
          <div className="skill-card__icon-wrap" style={{ color: skill.color }}>{isLocked ? '🔒' : skill.icon}</div>
          <div>
            <h3>{skill.name}</h3>
            <span className="text-secondary" style={{ fontSize: 12 }}>{skill.description}</span>
          </div>
        </div>
        <Badge tone={statusTone}>{skill.status}</Badge>
      </div>

      <ProgressBar percent={skill.progress} color={skill.color} />
      <div className="skill-card__meta">
        <span className="mono">{doneCount} / {total} lessons</span>
        <span className="mono">{skill.progress}%</span>
      </div>

      {isLocked ? (
        <p className="text-muted" style={{ fontSize: 13 }}>🔒 Complete the previous skill to unlock.</p>
      ) : (
        <Link to="/learn" state={{ skillId: skill.id }}>
          <Button fullWidth variant="secondary">
            {skill.progress === 100 ? 'Review' : skill.progress > 0 ? 'Continue' : 'Start Skill'}
          </Button>
        </Link>
      )}
    </Card>
  );
}

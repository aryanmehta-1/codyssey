import Card from '../common/Card';
import Badge from '../common/Badge';
import './learning.css';

/** Compact lesson list-item used inside the Learn page. */
export default function LessonCard({ lesson, completed, onClick }) {
  return (
    <Card className="lesson-card" hover onClick={onClick}>
      <div className="lesson-card__top">
        <h3 style={{ fontSize: 15 }}>{lesson.title}</h3>
        <Badge tone={completed ? 'success' : 'default'}>{completed ? 'Done' : `+${lesson.xp} XP`}</Badge>
      </div>
      <p className="text-secondary" style={{ fontSize: 13 }}>{lesson.summary}</p>
    </Card>
  );
}

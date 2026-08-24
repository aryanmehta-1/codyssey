import Badge from '../common/Badge';
import Button from '../common/Button';
import './learning.css';

export default function LessonContent({ lesson, completed, onComplete }) {
  return (
    <div className="lesson-content">
      <div>
        <p className="eyebrow">{lesson.xp} XP Reward</p>
        <h2>{lesson.title}</h2>
      </div>

      {lesson.content.map((para, i) => (
        <p key={i} className="text-secondary" style={{ lineHeight: 1.7 }}>{para}</p>
      ))}

      {lesson.code && <pre className="lesson-content__code">{lesson.code}</pre>}

      <div className="lesson-content__topics">
        {lesson.topics.map((t) => (
          <Badge key={t} tone="primary">{t}</Badge>
        ))}
      </div>

      <Button onClick={onComplete} disabled={completed} variant={completed ? 'secondary' : 'success'}>
        {completed ? '✓ Lesson Completed' : 'Mark Lesson Complete'}
      </Button>
    </div>
  );
}

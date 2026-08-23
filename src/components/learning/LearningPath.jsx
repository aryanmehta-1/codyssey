import './learning.css';

/** Horizontal strip of lesson pips for a skill, showing completion at a glance. */
export default function LearningPath({ lessons, completedLessonIds, activeLessonId, onSelect }) {
  return (
    <div className="learning-path-track">
      {lessons.map((lesson, i) => {
        const done = completedLessonIds.includes(lesson.id);
        const active = lesson.id === activeLessonId;
        return (
          <button
            key={lesson.id}
            onClick={() => onSelect(lesson)}
            className="skill-filter__btn"
            style={{
              borderColor: active ? 'var(--primary)' : undefined,
              color: done ? 'var(--success)' : active ? 'var(--primary)' : undefined,
              flexShrink: 0,
            }}
          >
            {done ? '✓' : i + 1}. {lesson.title}
          </button>
        );
      })}
    </div>
  );
}

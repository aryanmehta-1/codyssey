import './learning.css';

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
              borderColor: active ? '#6366f1' : undefined,
              color: done ? '#2dd4a7' : active ? '#6366f1' : undefined,
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

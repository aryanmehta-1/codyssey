import './learning.css';

export default function LessonProgressBar({ stepIndex, totalSteps, onExit }) {
  return (
    <div className="lesson-progress">
      <button className="lesson-progress__exit" onClick={onExit} aria-label="Exit lesson">✕</button>
      <div className="lesson-progress__track">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`lesson-progress__seg ${i <= stepIndex ? 'lesson-progress__seg--active' : ''}`}
          />
        ))}
      </div>
    </div>
  );
}

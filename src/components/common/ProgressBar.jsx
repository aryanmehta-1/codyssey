import './ProgressBar.css';

export default function ProgressBar({ percent = 0, color = '#6366f1', height = 10, label = null }) {
  const clamped = Math.max(0, Math.min(100, percent));
  return (
    <div className="progress-bar-wrap">
      {label && <div className="progress-bar-label">{label}</div>}
      <div className="progress-bar-track" style={{ height }}>
        <div
          className="progress-bar-fill"
          style={{ width: `${clamped}%`, background: color }}
        />
      </div>
    </div>
  );
}

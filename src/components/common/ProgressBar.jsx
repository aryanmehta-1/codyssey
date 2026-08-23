import './ProgressBar.css';

/**
 * Animated progress bar. color accepts a CSS variable name or hex value.
 */
export default function ProgressBar({ percent = 0, color = 'var(--primary)', height = 10, label = null }) {
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

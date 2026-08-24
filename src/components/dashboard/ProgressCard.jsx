import Card from '../common/Card';
import ProgressBar from '../common/ProgressBar';
import './dashboard.css';

/**
 * ProgressCard — displays a single named stat with an optional progress bar.
 *
 * Props:
 *   label   – description text shown below the value
 *   value   – primary display value (string or number)
 *   icon    – emoji or JSX icon shown to the left
 *   percent – (optional) 0–100 number to show a progress bar
 *   color   – bar gradient / colour (CSS string)
 */
export default function ProgressCard({ label, value, icon, percent, color }) {
  return (
    <Card className="progress-card">
      <div className="progress-card__top">
        <div className="progress-card__icon-wrap">{icon}</div>
        <div>
          <div className="progress-card__value">{value}</div>
          <div className="progress-card__label">{label}</div>
        </div>
      </div>
      {typeof percent === 'number' && (
        <ProgressBar
          percent={percent}
          color={color || 'linear-gradient(135deg, #6366f1, #c026d3)'}
          height={7}
        />
      )}
    </Card>
  );
}

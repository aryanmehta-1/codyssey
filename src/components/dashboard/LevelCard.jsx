import Card from '../common/Card';
import ProgressBar from '../common/ProgressBar';
import CircularProgress from '../common/CircularProgress';
import XPCounter from '../common/XPCounter';
import './dashboard.css';

export default function LevelCard({ levelInfo }) {
  const { current, next, xpIntoLevel, xpForNextLevel, percent } = levelInfo;
  return (
    <Card className="level-card glow-ring">
      <div className="level-card__top">
        <CircularProgress percent={percent} size={72} stroke={7} color="#6366f1">
          <span style={{ fontFamily: "'Space Grotesk', 'Segoe UI', sans-serif", fontWeight: 700, fontSize: 18 }}>{current.level}</span>
        </CircularProgress>
        <div>
          <div className="level-card__title">Current Level</div>
          <div className="level-card__badge">{current.title}</div>
        </div>
      </div>
      <ProgressBar
        percent={percent}
        color="linear-gradient(135deg, #6366f1, #c026d3 55%, #22d3ee)"
        height={12}
        label={
          <>
            <span className="mono"><XPCounter value={xpIntoLevel} suffix="" /> / {next ? xpForNextLevel : '—'} XP</span>
            <span>{next ? `Next: ${next.title}` : '🏆 Max Level'}</span>
          </>
        }
      />
    </Card>
  );
}

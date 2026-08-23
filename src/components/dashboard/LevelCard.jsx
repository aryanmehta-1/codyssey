import Card from '../common/Card';
import ProgressBar from '../common/ProgressBar';
import CircularProgress from '../common/CircularProgress';
import XPCounter from '../common/XPCounter';
import './dashboard.css';

/** Shows current level as a glowing ring plus a bar toward the next level. */
export default function LevelCard({ levelInfo }) {
  const { current, next, xpIntoLevel, xpForNextLevel, percent } = levelInfo;
  return (
    <Card className="level-card glow-ring">
      <div className="level-card__top">
        <CircularProgress percent={percent} size={72} stroke={7} color="var(--primary)">
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18 }}>{current.level}</span>
        </CircularProgress>
        <div>
          <div className="level-card__title">Current Level</div>
          <div className="level-card__badge">{current.title}</div>
        </div>
      </div>
      <ProgressBar
        percent={percent}
        color="var(--gradient-brand-3)"
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

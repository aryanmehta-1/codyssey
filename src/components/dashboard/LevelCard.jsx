import Card from '../common/Card';
import ProgressBar from '../common/ProgressBar';
import CircularProgress from '../common/CircularProgress';
import XPCounter from '../common/XPCounter';
import './dashboard.css';

/**
 * LevelCard — shows the user's current level, XP progress bar, and next level title.
 * Uses live data from StudentContext via useStudentStats → passed in as levelInfo.
 */
export default function LevelCard({ levelInfo }) {
  const { current, next, xpIntoLevel, xpForNextLevel, percent, totalXP } = levelInfo;

  return (
    <Card className="level-card glow-ring">
      <div className="level-card__top">
        <CircularProgress percent={percent} size={72} stroke={7} color="#6366f1">
          <span
            style={{
              fontFamily: "'Space Grotesk', 'Segoe UI', sans-serif",
              fontWeight: 700,
              fontSize: 18,
            }}
          >
            {current.level}
          </span>
        </CircularProgress>

        <div style={{ flex: 1, paddingLeft: 16 }}>
          <div className="level-card__title">Current Level</div>
          <div className="level-card__badge">{current.title}</div>
          <div className="level-card__total-xp">
            <XPCounter value={totalXP} suffix=" XP total" />
          </div>
        </div>
      </div>

      <ProgressBar
        percent={percent}
        color="linear-gradient(135deg, #6366f1, #c026d3 55%, #22d3ee)"
        height={12}
        label={
          <>
            <span className="mono">
              <XPCounter value={xpIntoLevel} suffix="" /> / {next ? xpForNextLevel : '—'} XP
            </span>
            <span>{next ? `Next: ${next.title}` : '🏆 Max Level'}</span>
          </>
        }
      />
    </Card>
  );
}

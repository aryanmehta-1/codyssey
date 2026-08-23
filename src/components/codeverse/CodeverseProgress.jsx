import CircularProgress from '../common/CircularProgress';
import './codeverse.css';

/** Overall-progress readout shown above the Codeverse chain, with a glowing ring. */
export default function CodeverseProgress({ skills }) {
  const totalPercent = Math.round(
    skills.reduce((sum, s) => sum + s.progress, 0) / skills.length
  );
  return (
    <div style={{ textAlign: 'center', marginBottom: 28, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
      <p className="eyebrow">Your Codeverse</p>
      <CircularProgress percent={totalPercent} size={92} stroke={8} color="var(--accent)">
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20 }}>{totalPercent}%</span>
      </CircularProgress>
      <p className="text-secondary" style={{ fontSize: 14, maxWidth: 380 }}>
        Codeverse visualizes what you've unlocked through your learning activity — not a fixed roadmap.
      </p>
    </div>
  );
}

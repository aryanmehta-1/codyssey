import Card from '../common/Card';

/** Generic small-stat card used to summarize a single number, e.g. lessons completed. */
export default function ProgressCard({ label, value, icon }) {
  return (
    <Card>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ fontSize: 26 }}>{icon}</div>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 22 }}>{value}</div>
          <div className="text-secondary" style={{ fontSize: 12 }}>{label}</div>
        </div>
      </div>
    </Card>
  );
}

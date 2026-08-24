import Card from '../common/Card';

export default function ProgressCard({ label, value, icon }) {
  return (
    <Card>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ fontSize: 26 }}>{icon}</div>
        <div>
          <div style={{ fontFamily: "'Space Grotesk', 'Segoe UI', sans-serif", fontSize: 22 }}>{value}</div>
          <div className="text-secondary" style={{ fontSize: 12 }}>{label}</div>
        </div>
      </div>
    </Card>
  );
}

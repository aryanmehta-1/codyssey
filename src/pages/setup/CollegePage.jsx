import { collegeDetails } from '../../data/colleges';

export default function CollegePage({ value, onSelect }) {
  return (
    <>
      <h2 style={{ marginBottom: 6 }}>Which university are you at?</h2>
      <p className="text-secondary" style={{ fontSize: 13, marginBottom: 20 }}>
        Join your campus leaderboards & represent your university in Codyssey!
      </p>
      <div
        className="setup-options"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 12,
          maxHeight: 'min(420px, 50vh)',
          overflowY: 'auto',
          paddingRight: 4,
        }}
      >
        {collegeDetails.map((c) => (
          <button
            key={c.id}
            type="button"
            className={`setup-option ${value === c.name ? 'setup-option--selected' : ''}`}
            onClick={() => onSelect(c.name)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '14px 16px',
              textAlign: 'left',
              gap: 4,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}>
              <span style={{ fontSize: 20 }}>{c.badge}</span>
              <strong style={{ fontSize: 13, flex: 1 }}>{c.shortName}</strong>
            </div>
            <span className="text-muted" style={{ fontSize: 11 }}>{c.location}</span>
          </button>
        ))}
      </div>
    </>
  );
}

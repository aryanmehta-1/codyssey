/** Displays a single expected-output line for a challenge (illustrative only). */
export default function TestCase({ input, expected }) {
  return (
    <div className="mono" style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
      Input: {input} → Expected: {expected}
    </div>
  );
}

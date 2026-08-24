
export default function TestCase({ input, expected }) {
  return (
    <div className="mono" style={{ fontSize: 13, color: '#9ea6c9' }}>
      Input: {input} → Expected: {expected}
    </div>
  );
}
